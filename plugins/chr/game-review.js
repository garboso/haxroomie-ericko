/* Writes a game's statistics and timestamps into a text file. */
const room = HBInit();

room.pluginSpec = {
  name: `chr/game-review`,
  author: `garboso`,
  version: `1.1.0`,
  dependencies: [
    `sav/core`,
    `chr/stats`
  ],
  config: {
    endOnTimeLimit: false
  }
};

const RED_ID = 1,
  BLUE_ID = 2;

let gameEnded = true,
  teams,
  gameInfo,
  ICONS;

function createReview() {
  const stats = room.getPlugin(`chr/stats`);

  gameInfo = room.getPlugin(`chr/game-info`);

  teams = gameInfo.getTeams();
  ICONS = getIcons();

  if (!gameEnded) {
    gameEnded = true;
  } else {
    return;
  }

  if (room.pluginSpec.config.discord.enabled) {
    sendDiscordReview(stats, room.pluginSpec.config.discord.url);
  }
}

function sendDiscordReview(stats, url) {
  const xhttp = new XMLHttpRequest();

  let data = {};

  data.username = 'Milton Bolotti';
  data.avatar_url = 'https://i.imgur.com/wVh6C4h.png';
  data.content = `${getFixtureMessage(gameInfo.getMatchInfo().fixture)}\n`;
  data.content += `${getScoreMessage(stats.getScore())}\n`;
  if (stats.getGoals().length > 0) data.content += `${getGoalsListMessage(stats.getGoals())}\n`;
  data.content += `${getPossessionPerTeamMessage(stats.getPossessionPerTeam())}\n`;
  data.content += `${getPossessionAreaMessage(stats.getDistributionAreaPercentages())}\n`;
  data.content += `${getPlayersPossessionMessage(stats.getPlayersPossessionStats())}\n`;

  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(xhttp.response);
    }
  };

  xhttp.send(JSON.stringify(data));
}

function getIcons() {
  return { 1: teams[RED_ID].icon, 2: teams[BLUE_ID].icon };
}

function getFixtureMessage(fixture) {
  if (fixture !== null) {
    if (fixture === 0) return `Amistoso`;
    else return `${fixture}ª rodada`;
  } else {
    return ``;
  }
}

function getScoreMessage(score) {
  const message = (score.red === score.blue ? `Empate!\n` : `Vitória do **${(score.red > score.blue ? teams[RED_ID].name : teams[BLUE_ID].name)}**!\n`);

  return message.toUpperCase() +
  `\n${teams[RED_ID].icon} ${teams[RED_ID].name} ${score.red} - ${score.blue} ${teams[BLUE_ID].name} ${teams[BLUE_ID].icon}\n`;
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
      return teams[RED_ID].icon;
    else
      return teams[BLUE_ID].icon;
  }
  else if (goal.scorer.team === BLUE_ID) {
    if (!goal.isOwnGoal)
      return teams[BLUE_ID].icon;
    else
      return teams[RED_ID].icon;
  }
}

function getPossessionPerTeamMessage(percentage) {
  return `**Posse de Bola**\n\`\`\``.toUpperCase() +
    `${teams[RED_ID].icon} ${percentage[`1`]}% - ${percentage[`2`]} ${teams[BLUE_ID].icon}\`\`\``;
}

function getPlayersPossessionMessage(stats) {
  let message = `**Posse de bola individual**\n\`\`\``.toUpperCase();

  stats.forEach((stat) => {
    message += `${ICONS[stat.player.team]} ${stat.player.name}: ${stat.percentage}%\n`;
  });

  return `${message.slice(0, -1)}\`\`\``;
}

function getPossessionAreaMessage(percentages) {
  let message = `**Distribuição de posse pelo campo**\n\`\`\`${ICONS[RED_ID]} `.toUpperCase();

  for (let key in percentages) {
    message += `${percentages[key]}% | `;
  }

  return `${message.slice(0, -3)} ${ICONS[BLUE_ID]}\`\`\``;
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

room.onTeamVictory = () => {
  createReview();
};

room.onRoomLink = () => {

};