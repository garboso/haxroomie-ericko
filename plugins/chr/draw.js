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
  room.sendAnnouncement('Empate está habilitado. O jogo encerrará sem prorrogação.', player.id, 0x69C969, 'small-bold');
}

function disableDraw(player) {
  drawEnabled = false;
  room.sendAnnouncement('Empate está desabilitado.', player.id, 0x69C969, 'small-bold');
}

function isAdmin(player) {
  if (!player.admin) {
    room.sendAnnouncement('Você não possui privilégios para usar esse comando.', player.id, 0xCF3838, 'small-bold');
    return false;
  }
  return true;
}

room.onCommand_habilitar_empate = (player) => {
  if (!isAdmin(player)) return;
  enableDraw(player);
};

room.onCommand_desabilitar_empate = (player) => {
  if (!isAdmin(player)) return;
  disableDraw(player);
};

room.onGameTick = () => {
  const scores = room.getScores();
  if (scores.time >= scores.timeLimit && scores.timeLimit != 0 && scores.red === scores.blue && drawEnabled) {
    room.stopGame();
  }
};