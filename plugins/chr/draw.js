const room = HBInit();

room.pluginSpec = {
  name: 'chr/draw',
  author: 'garboso',
  version: '1.0.0',
  dependencies: [
    'sav/core',
    'sav/commands'
  ],
  config: {
    enabled: false
  }
};

let drawEnabled = room.pluginSpec.config.enabled;

function enableDraw(player) {
  drawEnabled = true;
  room.sendAnnouncement('Draw is enabled. Game will stop at time limit.', player.id);
}

function disableDraw(player) {
  drawEnabled = false;
  room.sendAnnouncement('Draw is disabled.', player.id);
}

function isAdmin(player) {
  if (!player.admin) {
    room.sendAnnouncement('You have to be admin to use this command!', player.id, 0xff0000);
    return false;
  }
  return true;
}

room.onCommand_enableDraw = (player) => {
  if (!isAdmin(player)) return;
  enableDraw(player);
};

room.onCommand_disableDraw = (player) => {
  if (!isAdmin(player)) return;
  disableDraw(player);
};

room.onGameTick = () => {
  const scores = room.getScores();
  if (scores.time >= scores.timeLimit && scores.timeLimit != 0 && scores.red === scores.blue) {
    room.stopGame();
  }
};