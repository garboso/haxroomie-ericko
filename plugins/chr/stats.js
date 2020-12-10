/**
 * Plugin that calculates stats of the match.
 */
const room = HBInit();

room.pluginSpec = {
  name: `chr/stats`,
  author: `christopher`,
  version: `1.0.0`,
  dependencies: [
    `sav/core`,
  ]
};

let distributionBall = {
    0: 0,
    1: 0,
    2: 0,
  },
  possession = {},
  possessionPerTeam = {
    1: 0,
    2: 0,
  },
  passes = {},
  pass = null,
  possBuffer = 0,
  gameRunning = false,
  goalScored = false,
  lastTouch = {
    scorer: null,
    assister: null,
  },
  goals = [],
  score = { red: 0, blue: 0 };


function updateDistribution() {
  updateBallDistribution();
}

function updateBallDistribution() {
  const ball = room.getBallPosition();
  if ((ball.x === 0) && (ball.y === 0)) return;

  distributionBall[getArea(ball.x)] += 1;
}

function getArea(positionX) {
  if (positionX > 90) {
    return 2;
  } else if (positionX < -90) {
    return 1;
  } else return 0;
}

/**
 * returns the distance between two points.
 */
function calculateDistance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * returns the distance between the center of a player and the ball.
 */
function calculateDistancePlayerBall(player) {
  return calculateDistance(player.position, room.getBallPosition());
}

function hasPossession(player) {
  const distanceToBall = calculateDistancePlayerBall(player),
    distanceBallTouch = room.getDiscProperties(0) + room.getPlayerList()[0].id + 0.1;

  if (distanceToBall < distanceBallTouch) {
    return true;
  }

  return false;
}

function updateLastTouch(player) {
  if (lastTouch.scorer !== null && player.id !== lastTouch.scorer.id) {
    if (player.team === lastTouch.scorer.team) {
      lastTouch.assister = lastTouch.scorer;
    } else {
      lastTouch.assister = null;
    }
  }

  lastTouch.scorer = player;
}

function updatePossession() {
  possBuffer += 1;
  let possPlayers = [];
  for (let player of room.getPlayerList().filter(p => p.team !== 0)) {
    if (hasPossession(player)) {
      possPlayers.push(player.id);
      checkPass(player);
      updateLastTouch(player);
    }
  }

  if (possPlayers.length > 0) {
    for (let i = 0; i < possPlayers.length; i++) {
      addPossession(possPlayers[i]);
    }
  }
}

function addPossession(playerId) {
  possessionPerTeam[room.getPlayer(playerId).team] += possBuffer;
  if (possession[playerId] === undefined) {
    possession[playerId] = possBuffer;
  } else {
    possession[playerId] += possBuffer;
  }
}

function checkPass(player) {
  if (pass !== null && pass.id !== player.id) {
    if (passes[pass.id] === undefined) {
      passes[pass.id] = {
        overall: 1,
        succ: 0,
      };
    } else {
      passes[pass.id].overall += 1;
    }

    if (player.team === pass.team) {
      passes[pass.id].succ += 1;
    }

    pass = null;
  }
}

function addGoal(teamId) {
  const score = room.getScores();

  goals.push({ scorer: lastTouch.scorer,
    assist: (lastTouch.assister !== null ? lastTouch.assister : null),
    isOwnGoal: lastTouch.scorer.team !== teamId,
    time: Math.floor(score.time) });
}

/**
 * takes a map of names and counters and returns map of names and percentage.
 */
function calculatePercentage(object) {
  let objectPerc = {};
  let sum = 0;
  for (let key in object) {
    sum = sum + object[key];
  }

  for (let key in object) {
    let perc = 100 / sum * object[key];
    objectPerc[key] = perc.toFixed(2);
  }

  return objectPerc;
}

room.onGameStart = () => {
  pass = null;
  lastTouch = {
    scorer: null,
    assister: null,
  };
  goals = [];
  passes = {};
  goalScored = false;
  gameRunning = false;
  possBuffer = 0;
  possession = {};
  possessionPerTeam = {
    1: 0,
    2: 0,
  };
  for (let area in distributionBall) {
    distributionBall[area] = 0;
  }
};

room.onPlayerBallKick = (player) => {
  if (!goalScored) {
    pass = player;
    checkPass(player);
    addPossession(player.id);
    updateLastTouch(player);
    possBuffer = 0;
  }
};

room.onGameTick = () => {
  if (!gameRunning) {
    if ((room.getBallPosition().x !== 0 || room.getBallPosition().y !== 0) && !goalScored) {
      gameRunning = true;
    } else {
      return;
    }
  }

  updateDistribution();
  updatePossession();
};

room.onTeamGoal = (teamId) => {
  gameRunning = false;
  goalScored = true;
  pass = null;
  score.red = room.getScores().red;
  score.blue = room.getScores().blue;
  addGoal(teamId);
};

room.onPositionsReset = () => {
  goalScored = false;
  lastTouch = {
    scorer: null,
    assister: null,
  };
};

room.getGoals = () => {
  return goals;
};

room.getScore = () => {
  return score;
};

room.getDistributionAreaPercentages = () => {
  return calculatePercentage(distributionBall);
};

room.getPlayersPossessionStats = () => {
  let playersPossession = [];

  Object.entries(calculatePercentage(possession)).forEach((element) => {
    playersPossession.push({ player: room.getPlayer(element[0]), percentage: element[1] });
  });

  return playersPossession.sort((a, b) => { return b.percentage - a.percentage; });
};

room.getPlayersPassingStats = () => {
  let stats = [];

  for (let playerId in passes) {
    let percentage = ((100 / passes[playerId].overall) * passes[playerId].succ).toFixed(2);

    stats.push({ player: room.getPlayer(playerId),
      overallPassing: passes[playerId].overall,
      successPassing: passes[playerId].succ,
      successPercentage: percentage });
  }

  return stats;
};

room.getPossessionPerTeam = () => {
  return calculatePercentage(possessionPerTeam);
};
