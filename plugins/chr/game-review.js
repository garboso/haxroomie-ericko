/* Writes a game's statistics and timestamps into a text file. */
const room = HBInit();

room.pluginSpec = {
  name: `chr/game-review`,
  author: `garboso`,
  version: `1.0.0`,
  dependencies: [
    `sav/core`,
    `chr/stats`
  ],
  config: {
    endOnTimeLimit: false
  }
};

let gameEnded = true;
const RED_ID = 1,
  BLUE_ID = 2,
  ICONS = { '1': '🔴',
    '2': '🔵'};

function createReview() {
  const xhttp = new XMLHttpRequest(),
    url = room.getConfig().url,
    stats = room.getPlugin(`chr/stats`);

  let data = {};

  if (!gameEnded) {
    gameEnded = true;
  } else {
    return;
  }

  data.username = 'Milton Bolotti';
  data.avatar_url = 'https://i.imgur.com/wVh6C4h.png';
  data.content = `${getScoreMessage(stats.getScore())}\n`;
  if (stats.getGoals().length > 0) data.content += `${getGoalsListMessage(stats.getGoals())}\n`;
  data.content += `${getPossessionPerTeamMessage(stats.getPossessionPerTeam())}\n`;
  data.content += ` ${getPlayersPossessionMessage(stats.getPlayersPossessionStats())}\n`;

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(xhttp.response);
    }
  };

  xhttp.send(JSON.stringify(data));
}

function getScoreMessage(score) {
  const message = (score.red === score.blue ? `Empate!\n` : `Vitória do **${(score.red > score.blue ? 'vermelho' : 'azul')}**!\n`);

  return message.toUpperCase() +
  `\n🔴 ${score.red} - ${score.blue} 🔵\n`;
}

function getGoalsListMessage(goals) {
  let message = `⚽️ **GOLS**\`\`\``;

  goals.forEach((goal) => {
    message += `${getFormattedGoalTime(goal.time)} ${getTeamScoredIcon(goal)} ${goal.scorer.name} ${goal.isOwnGoal === true ? '(contra)' : ''} ${goal.assist != null ? `(${goal.assist.name})` : ''}\n`;
  });

  return `${message.slice(0, -1)} \`\`\``;
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
  if (goal.scorer.team === RED_ID) {
    if (!goal.isOwnGoal)
      return `🔴`;
    else
      return `🔵`;
  }
  else if (goal.scorer.team === BLUE_ID) {
    if (!goal.isOwnGoal)
      return `🔵`;
    else
      return `🔴`;
  }
}

function getPossessionPerTeamMessage(percentage) {
  return `**Posse de Bola**\n\`\`\``.toUpperCase() +
    `🔴 ${percentage[`1`]}% - ${percentage[`2`]} 🔵\`\`\``;
}

function getPlayersPassingMessage(stats) {
  let message = `**Passes**\n\`\`\``.toUpperCase();

  stats.forEach((stat) => {
    message += `${ICONS[stat.player.team]} ${stat.player.name}: ${stat.overallPassing} tentativas de passe,
    ${stat.successPassing} passes certos, ${stat.successPercentage}% de acerto\n`;
  });

  return `${message.slice(0, -1)}\`\`\``;
}

function getPlayersPossessionMessage(stats) {
  let message = `**Posse de bola individual**\n\`\`\``.toUpperCase();

  stats.forEach((stat) => {
    message += `${ICONS[stat.player.team]} ${stat.player.name}: ${stat.percentage}%\n`;
  });

  return `${message.slice(0, -1)}\`\`\``;
}

room.onGameStart = () => {
  gameEnded = false;
};

room.onGamePause = () => {
  const score = room.getScores();

  if (score.time >= score.timeLimit) {
    createReview();
  }
};

room.onRoomLink = () => {

};
