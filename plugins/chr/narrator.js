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
    'Pediu pra parar, parou!'];

  let message = `${messages[Math.floor(Math.random() * messages.length)].toUpperCase()}`;

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
}

function sendPossessionTeamsPhrase () {
  const percentage = stats.getPossessionPerTeam();
  let message = `\n\nPosse de Bola\n\n`.toUpperCase();

  teams = gameInfo.getTeams();
  message += `   ${teams[1].icon}  ${percentage[1]}%\n   ${teams[2].icon}  ${percentage[2]}%`;

  room.sendAnnouncement(message, null, 0xEBEBEB, 'small-italic');
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

room.onGameTick = () => {
  if (!gameRunning) {
    if ((room.getBallPosition().x !== 0 || room.getBallPosition().y !== 0) && !goalScored) {
      gameRunning = true;
      sendKickOffPhrase();
    } else {
      return;
    }
  }
};

room.onGameStop = () => {
  gameRunning = false;
  goalScored = false;
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

room.onCron45GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  sendPossessionTeamsPhrase();
};

room.onCron120GameSeconds = () => {
  if (gamePaused || !gameRunning) return;

  room.sendAnnouncement(news.getOneTransfer(), null, 0xEBEBEB, 'small-italic');
};