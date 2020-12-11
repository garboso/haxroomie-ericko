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

  message += `${(matchInfo.fixture !== null ? (matchInfo.fixture === 0 ? `Amistoso` : `${matchInfo.fixture}ª rodada`) : ``)} \n\n`;
  message += `${teams[1].icon} ${teams[1].name} - ${teams[2].name} ${teams[2].icon} \n\n`;

  for (let id in teams) {
    message += `${teams[id].name} ${teams[id].icon}\n    `;

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
    goal = goals[goals.length - 1];

  const messages = [`Éééééééééé do ${getGoalTeam(goal).name}, ${goal.isOwnGoal ? `${goal.scorer.name} jogou contra a própria meta!` : `${goal.scorer.name}!!!` }\nEram jogados ${getFormattedGoalTime(goal.time)} e foi lá, balançou o capim no fundo do gol!`];

  let message = `⚽ ${messages[Math.floor(Math.random() * messages.length)].toUpperCase()}`;

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
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

  let message;

  message = `Apita o árbitro, final de jogo! `.toUpperCase();

  message += getResultPhrase(score, isDrawEnabled).toUpperCase();
  message += `\n${getCurrentScorePhrase(score)}\n`;

  if (goals.length > 0) {
    message += `Gols: `;
    goals.forEach((goal) => {
      message += `${getFormattedGoalTime(goal.time)} ${getTeamScoredIcon(goal)} ${goal.scorer.name}${goal.isOwnGoal === true ? ' (contra)' : ''}${goal.assist != null ? ` (${goal.assist.name})` : ''}, `;
    });
    message = `${message.slice(0, -2)}\n`;
  }

  message += `${getTeamsPossessionPhrase(matchInfo.teams, percentagePerTeam)}\n`;
  message += `${getDistributionAreaPhrase(matchInfo.teams, areaPercentage)}`;

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
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

  if (room.getScores() <= 30) {
    return;
  }
  else {
    room.sendAnnouncement(getTeamsPossessionPhrase(teams, percentages), null, 0xEBEBEB, 'small-italic');
  }
}

function sendPossessionAreaPhrase() {
  const percentages = stats.getPossessionPerTeam(),
    teams = matchInfo.teams;

  if (room.getScores() <= 30) {
    return;
  }
  else {
    room.sendAnnouncement(getDistributionAreaPhrase(teams, percentages), null, 0xEBEBEB, 'small-italic');
  }
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
  return (isDrawEnabled && scores.time >= scores.timeLimit) ||
  (scores.scoreLimit === scores.red || scores.scoreLimit === scores.blue);
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
  gameEnded = true;
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

room.onCron60GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendPossessionTeamsPhrase();
};

room.onCron120GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendPossessionAreaPhrase();
};

room.onCron175GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  let message = (Math.round(Math.random() * 1) === 0 ? news.getOneTransfer() : news.getOneFakeNews());

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
};