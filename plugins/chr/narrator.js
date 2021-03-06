/**
 * Plugin that generate phrases during the game.
 */
const room = HBInit();

room.pluginSpec = {
  name: `chr/narrator`,
  author: `christopher`,
  version: `1.0.0`,
  dependencies: [
    `sav/core`,
    `sav/cron`,
    `chr/game-info`,
    `chr/fake-soccer-news`,
    `chr/stats`,
    `chr/draw`
  ]
};

let gameRunning = false,
  gameEnded = false,
  goalScored = false,
  gamePaused = false,
  matchInfo,
  isDrawEnabled;

const gameInfo = room.getPlugin(`chr/game-info`),
  news = room.getPlugin(`chr/fake-soccer-news`),
  stats = room.getPlugin(`chr/stats`);

function sendKickOffPhrase () {
  const messages = ['Rolou o melão!',
    'Acerta o seu daí que eu arredondo o meu daqui, eeeessstá valendo!',
    'Bola em jogo pra você ligado no Hax!',
    `Autoriza o árbitro, mexe na bola o ${matchInfo.teams[1].name}!`,
    'Bola rolando!'];

  let message = `${messages[Math.floor(Math.random() * messages.length)].toUpperCase()}`;

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
}

function sendOpeningPhrase () {
  let message = `Os times já estão alinhados em campo e prontos para o início da partida.\n`,
    teams = matchInfo.teams;

  message += `${(matchInfo.fixture !== null ? (matchInfo.fixture === 0 ? `Amistoso` : `${matchInfo.fixture}ª rodada`) : ``)} \n`;
  message += `\t\t\t\t\t\t${teams[1].icon} ${teams[1].name} - ${teams[2].name} ${teams[2].icon} \n\n`;

  for (let id in teams) {
    message += `${teams[id].icon} ${teams[id].name}: `;

    if (teams[id].players !== undefined) {
      teams[id].players.forEach(player => message += `${player.name}, `);
    }

    message = message.slice(0, -2);
    message += `\n`;
  }

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
}

function sendGoalPhrase() {
  const goals = stats.getGoals(),
    goal = goals[goals.length - 1],
    team = getGoalTeam(goal);

  const messages = [`Éééééééééé do ${team.icon} ${team.name}, ${goal.isOwnGoal ? `${goal.scorer.name} jogou contra a própria meta!` : `${goal.scorer.name}!!!` }\nEram jogados ${getFormattedGoalTime(goal.time)} e foi lá, balançou o capim no fundo do gol!`,
    `Gooooooooooooool do ${team.icon} ${team.name}! ${goal.isOwnGoal ? `${goal.scorer.name} fez contra!` : `Professor, anota o nome aí: ${goal.scorer.name}!!!`}`];

  let message = `⚽ ${messages[Math.floor(Math.random() * messages.length)].toUpperCase()}`;

  room.sendAnnouncement(message, null, team.color, 'small-bold');
}

function getGoalTeam(goal) {
  if (goal.isOwnGoal) {
    if (goal.scorer.team === 1) return matchInfo.teams[2];
    if (goal.scorer.team === 2) return matchInfo.teams[1];
  } else {
    return matchInfo.teams[goal.scorer.team];
  }
}

function sendPausePhrase() {
  const messages = ['Pare!',
      'Tá lá o corpo estendido no chão!',
      'Pediu pra parar, parou!'],
    score = room.getScores();

  if (score.time >= score.timeLimit) {
    return;
  } else {
    let message = `${messages[Math.floor(Math.random() * messages.length)].toUpperCase()}`;
    room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
  }
}

function sendEndingPhrase(isDrawEnabled) {
  const score = room.getScores(),
    goals = stats.getGoals(),
    percentagePerTeam = stats.getPossessionPerTeam(),
    areaPercentage = stats.getDistributionAreaPercentages();

  let message, statsMessage;

  message = `Apita o árbitro, final de jogo! `.toUpperCase();

  message += getResultPhrase(score, isDrawEnabled).toUpperCase();
  statsMessage = `${getCurrentScorePhrase(score)}\n`;

  if (goals.length > 0) {
    statsMessage += `Gols: `;
    goals.forEach((goal) => {
      statsMessage += `${getFormattedGoalTime(goal.time)} ${getTeamScoredIcon(goal)} ${goal.scorer.name}${goal.isOwnGoal === true ? ' (contra)' : ''}${goal.assist != null ? ` (${goal.assist.name})` : ''}, `;
    });
    statsMessage = `${statsMessage.slice(0, -2)}`;
  }

  if (matchInfo.fixture !== 0) {
    statsMessage += `\n${getTeamsPossessionPhrase(matchInfo.teams, percentagePerTeam)}\n`;
    statsMessage += `${getDistributionAreaPhrase(matchInfo.teams, areaPercentage)}`;
  }

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-bold');
  room.sendAnnouncement(statsMessage, null, 0xEBEBEB, 'small-italic');
}

function getResultPhrase(score, isDrawEnabled) {
  if (isDrawEnabled && score.red === score.blue) {
    return `O jogo terminou em empate!`;
  } else {
    return `Vitória do ${(score.red > score.blue ? matchInfo.teams[1].name : matchInfo.teams[2].name)}!`;
  }
}

function getCurrentScorePhrase(score) {
  return `${matchInfo.teams[1].icon} ${score.red} - ${score.blue} ${matchInfo.teams[2].icon}`;
}

function sendPossessionTeamsPhrase() {
  const percentages = stats.getPossessionPerTeam(),
    teams = matchInfo.teams;

  if (room.getScores().time <= 30) {
    return;
  }
  else {
    room.sendAnnouncement(getTeamsPossessionPhrase(teams, percentages), null, 0xEBEBEB, 'small-italic');
  }
}

function sendPossessionAreaPhrase() {
  const percentages = stats.getDistributionAreaPercentages(),
    teams = matchInfo.teams;

  if (room.getScores().time <= 30) {
    return;
  }
  else {
    room.sendAnnouncement(getDistributionAreaPhrase(teams, percentages), null, 0xEBEBEB, 'small-italic');
  }
}

function sendMediaPhrase() {
  let message,
    color,
    style,
    dice = Math.round(Math.random() * 3);

  if (dice === 0) {
    message = news.getOneTransfer();
    color = 0x81D981;
    style = 'small-italic';
  } else if (dice > 0 && dice < 2) {
    message = news.getOneFakeNews();
    color = 0x81D981;
    style = 'small-italic';
  } else {
    message = news.getOneAd();
    color = 0xDCDCDC;
    style = 'bold';
  }

  if (message === null || color === null || style === null) return;
  else room.sendAnnouncement(message, null, color, style);
}

function getTeamsPossessionPhrase(teams, percentagePerTeam) {
  return `Posse de Bola: ${teams[1].icon} ${percentagePerTeam[1]}% - ${teams[2].icon} ${percentagePerTeam[2]}%`;
}

function getDistributionAreaPhrase(teams, percentages) {
  let message = `Distribuição de posse pelo campo: ${teams[1].icon} `;

  for (let key in percentages) {
    message += `${percentages[key]}% | `;
  }

  return `${message.slice(0, -3)} ${teams[2].icon}`;
}

function getFormattedGoalTime(time) {
  const minutes = Math.floor(time / 60),
    seconds = time % 60;

  return `${addPadZeroIfNecessary(minutes)}:${addPadZeroIfNecessary(seconds)}`;
}

function addPadZeroIfNecessary(unit) {
  if (unit === 0 || unit <= 9) {
    return `0${unit}`;
  }

  return unit;
}

function getTeamScoredIcon(goal) {
  if (goal.scorer.team === 1) {
    if (!goal.isOwnGoal)
      return matchInfo.teams[1].icon;
    else
      return matchInfo.teams[2].icon;
  }
  else if (goal.scorer.team === 2) {
    if (!goal.isOwnGoal)
      return matchInfo.teams[2].icon;
    else
      return matchInfo.teams[1].icon;
  }
}

function checkIfGameEnded(isDrawEnabled, scores) {
  if (scores.scoreLimit === 0 && scores.timeLimit === 0) {
    return false;
  }
  else if (scores.scoreLimit === 0) {
    return (isDrawEnabled && scores.time >= scores.timeLimit) || (scores.time >= scores.timeLimit && scores.red != scores.blue);
  }
  else if (scores.timeLimit === 0) {
    return (scores.red === scores.scoreLimit || scores.blue === scores.scoreLimit);
  }
  else {
    return (isDrawEnabled && scores.time >= scores.timeLimit) ||
    (scores.scoreLimit === scores.red || scores.scoreLimit === scores.blue);
  }
}

room.onGameTick = () => {
  const scores = room.getScores();

  if (!gameRunning && !gameEnded) {
    if ((room.getBallPosition().x !== 0 || room.getBallPosition().y !== 0) && !goalScored) {
      gameRunning = true;
      sendKickOffPhrase();
    } else {
      return;
    }
  }

  if (gameRunning && checkIfGameEnded(isDrawEnabled, scores) && !gameEnded) {
    sendEndingPhrase(isDrawEnabled);
    gameEnded = true;

    setTimeout(() => {
      room.stopGame();
    }, 5000);
  }
};

room.onGameStop = () => {
  gameRunning = false;
  goalScored = false;

  if (!gameEnded) {
    sendEndingPhrase(isDrawEnabled);
    gameEnded = true;
  }
};

room.onGamePause = () => {
  gamePaused = true;
  sendPausePhrase();
};

room.onGameUnpause = () => {
  gamePaused = false;
};

room.onGameStart = () => {
  matchInfo = gameInfo.getMatchInfo();
  gameEnded = false;
  sendOpeningPhrase();
  isDrawEnabled = room.getPlugin(`chr/draw`).isDrawEnabled();
};

room.onTeamGoal = () => {
  goalScored = true;
  sendGoalPhrase();
};

room.onCron145GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendPossessionTeamsPhrase();
};

room.onCron250GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendPossessionAreaPhrase();
};

room.onCron120GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendMediaPhrase();
};