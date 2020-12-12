const room = HBInit();

room.pluginSpec = {
  name: `chr/game-info`,
  author: `christopher`,
  version: `1.0.0`,
  dependencies: [
    `sav/core`
  ],
  config: {
    championshipMode: false
  }
};

const RED_ID = 1,
  BLUE_ID = 2,
  ERICKO_TEAMS = [
    { name: 'Afogados', acronym: 'AFO', icon: '🏊', custom: true, color: 0x8AACEA },
    { name: 'Barba de Itaboraí', acronym: 'BAR', icon: '🧔', custom: true, color: 0xFF8C00 },
    { name: 'Bomba de Savvoya', acronym: 'BDS', icon: '💣', custom: true, color: 0xCFA930 },
    { name: 'Dribles Sacanas', acronym: 'DRI', icon: '✍️', custom: true, color: 0xF19292 },
    { name: 'Lion Heart', acronym: 'LIO', icon: '🔥', custom: true, color: 0xF582D8 },
    { name: 'Loukos', acronym: 'LOU',  icon: '🏆', custom: true, color: 0xF19292 },
    { name: 'Mistos', acronym: 'MIS', icon: '🐊', custom: true, color: 0xFECE85 },
    { name: 'Pó Pó Pó', acronym: 'POP', icon: '👃', custom: true, color: 0xF2C37D  },
    { name: 'Vendo Monza', acronym: 'VEM', icon: '🚗', custom: true, color: 0x7BB0E1 },
    { name: 'Vitória do Bahia', acronym: 'VIT', icon: '🏖️', custom: true, color: 0xF19292 }];

let fixture = null,
  teamsInfos = {
    1: { name: 'Vermelho', acronym: 'VER', icon: '🔴', custom: false, color: 0xF19292 },
    2: { name: 'Azul', acronym: 'AZU', icon: '🔵', custom: false, color: 0x8AACEA } };

function setFixture(player, args) {
  if (/^[0-9]*$/.test(args[0]) && parseInt(args[0]) >= 0) {
    fixture = parseInt(args[0]);

    if (fixture === 0) {
      room.sendAnnouncement(`👍 O jogo será registrado como amistoso.`, player.id, 0x69C969, 'small-bold');
    } else {
      room.sendAnnouncement(`👍 O jogo será registrado como pertencente a ${fixture}ª rodada.`, player.id, 0x69C969, 'small-bold');
    }
  } else {
    room.sendAnnouncement(`⚠️ O valor inserido não foi aceito. Por favor, insira um número correspondente a rodada, 0 para partida amistosa.`, player.id, 0xffbf00, 'small-bold');
  }
}

function listAllTeams(player) {
  let message = '';

  ERICKO_TEAMS.forEach(team => message += `${team.name} (${team.acronym}), ` );

  room.sendAnnouncement(message.slice(0, -2), player.id, 0x69C969, 'small-bold');
}

function showMatchInfo(player) {
  let message = '\n';

  message += `${(fixture != null ? (fixture === 0 ? `Amistoso` : `Válido pela ${fixture}ª rodada:\n`) : `⚠️ Rodada não definida.`)}\n`;
  message += `${getTeamInfo(RED_ID)} - ${getTeamInfo(BLUE_ID)}`;

  room.sendAnnouncement(message, player.id, 0x4094FF, 'small-bold');
}

function getMatchInfo() {
  return { fixture: fixture, teams: getTeams() };
}

function getTeamInfo(teamId) {
  return `${teamsInfos[teamId].icon} ${teamsInfos[teamId].name} (${teamsInfos[teamId].acronym})`;
}

function getTeamNames() {
  return { 1: teamsInfos[RED_ID].name, 2: teamsInfos[BLUE_ID].name };
}

function checkTeamNames() {
  for (let key in teamsInfos) {
    if (!teamsInfos[key].custom) return false;
  }

  return true;
}

function setTeam(player, args, teamId) {
  if (/^[A-Z]{3}$/.test(args[0])) {
    const team = ERICKO_TEAMS.find(team => team.acronym === args[0]);

    if (team !== undefined) {
      teamsInfos[teamId] = team;
      room.sendAnnouncement(`👍 ${team.name} escolhido com sucesso.`, player.id, 0x69C969, 'small-bold');
      getMatchInfo(player);
    } else {
      room.sendAnnouncement('⚠️ Time não encontrado. Veja novamente a lista de times disponíveis abaixo:', player.id, 0xffbf00, 'small-bold');
      listAllTeams(player);
    }
  } else {
    room.sendAnnouncement('⚠️ O valor inserido não foi aceito. Por favor, insira a sigla com três letras referente ao time escolhido.', player.id, 0xffbf00, 'small-bold');
    listAllTeams(player);
  }
}

function resetTeamsInfos() {
  teamsInfos = {
    1: { name: 'Vermelho', acronym: 'VER', icon: '🔴', custom: false },
    2: { name: 'Azul', acronym: 'AZU', icon: '🔵', custom: false } };
  fixture = null;
}

function getTeams() {
  const players = room.getPlayerList().filter(p => p.team !== 0);
  let red, blue;

  red = teamsInfos[RED_ID];
  red.players = players.filter(p => p.team === RED_ID);
  blue = teamsInfos[BLUE_ID];
  blue.players = players.filter(p => p.team === BLUE_ID);

  return {
    [RED_ID]: red,
    [BLUE_ID]: blue };
}

function isAdmin(player) {
  if (!player.admin) {
    room.sendAnnouncement('❌ Você não possui privilégios para usar esse comando.', player.id, 0xCF3838, 'small-bold');
    return false;
  }
  return true;
}

room.getTeamNames = getTeamNames;
room.getTeams = getTeams;
room.getMatchInfo = getMatchInfo;

room.onGameStart = (player) => {
  if (room.pluginSpec.config.championshipMode) {
    if (fixture === null) {
      room.stopGame();
      room.sendAnnouncement(`Para iniciar o jogo, informe por qual rodada será disputado o jogo através do comando '!definir rodada <número da rodada>'.`, player.id, 0xffbf00, 'small-bold');
    } else if (!checkTeamNames()) {
      room.stopGame();
      room.sendAnnouncement(`Para iniciar o jogo, selecione os times que irão jogar utilizando o comando !definir time vermelho <sigla> ou !definir time azul <sigla>`, player.id, 0xffbf00, 'small-bold');
      listAllTeams(player);
    }
  }
};

room.onTeamVictory = () => {
  if (room.pluginSpec.config.championshipMode) {
    fixture = null;
  }
};

room.onGameStop = () => {
  resetTeamsInfos();
};

room.onCommand_definir_rodada = {
  function: (player, args) => {
    if (!isAdmin(player)) return;
    setFixture(player, args);
  }
};

room.onCommand_definir_time_vermelho = {
  function: (player, args) => {
    if (!isAdmin(player)) return;
    setTeam(player, args, RED_ID);
  }
};

room.onCommand_definir_time_azul = {
  function: (player, args) => {
    if (!isAdmin(player)) return;
    setTeam(player, args, BLUE_ID);
  }
};

room.onCommand_listar_times = {
  function: (player) => {
    if (!isAdmin(player)) return;
    listAllTeams(player);
  }
};

room.onCommand_ver_informações_jogo = {
  function: (player) => {
    showMatchInfo(player);
  }
};