/**
 * Colors plugin, admins can choose specific colors (or kits) to the teams.
 */
const room = HBInit();

room.pluginSpec = {
  name: 'chr/colors',
  author: 'garboso',
  version: '1.1.0',
  dependencies: [
    'sav/core',
    'sav/commands'
  ],
  config: {
    colorsStreak: false
  }
};

let colorsStreakEnabled = room.pluginSpec.config.colorsStreak,
  lastWinnerId,
  winStreak = 0;

const colorsList = [
  {
    name: 'Lion Heart',
    type: 1,
    code: 'LH1',
    options: {
      angle: 90,
      textColor: 0x40353D,
      colors: [0xF582D8, 0xE87BCC, 0xF582D8]
    }
  },
  {
    name: 'Lion Heart',
    type: 2,
    code: 'LH2',
    options: {
      angle: 0,
      textColor: 0xFDE311,
      colors: [0x212121, 0x333333, 0x212121]
    }
  },
  {
    name: 'Mistos',
    type: 1,
    code: 'MI1',
    options: {
      angle: 90,
      textColor: 0x000000,
      colors: [0xFECE85, 0xFD8087, 0xFECE85]
    }
  },
  {
    name: 'Mistos',
    type: 2,
    code: 'MI2',
    options: {
      angle: 90,
      textColor: 0xFECE85,
      colors: [0x2AA4C9, 0xFF0000, 0x2AA4C9]
    }
  },
  {
    name: 'Armandinho',
    type: 1,
    code: 'AR1',
    options: {
      angle: 34,
      textColor: 0xFFF7FD,
      colors: [0x0080FF, 0xCCC8CA, 0x0F8C24]
    }
  },
  {
    name: 'Armandinho',
    type: 2,
    code: 'AR2',
    options: {
      angle: 90,
      textColor: 0x30F1FF,
      colors: [0xA86A19, 0xE0B95E]
    }
  },
  {
    name: 'Afogados',
    type: 1,
    code: 'AF1',
    options: {
      angle: 45,
      textColor: 0xD4D6D6,
      colors: [0xD4D6D6, 0x004077, 0xD4D6D6]
    }
  },
  {
    name: 'Afogados',
    type: 2,
    code: 'AF2',
    options: {
      angle: 180,
      textColor: 0x004077,
      colors: [0xD4D6D6, 0xD4D6D6, 0xD4D6D6]
    }
  },
  {
    name: 'Barba de Itaboraí',
    type: 1,
    code: 'BA1',
    options: {
      angle: 60,
      textColor: 0xFFFFFF,
      colors: [0xFF8C00, 0xFF8C00, 0x000080]
    }
  },
  {
    name: 'Barba de Itaboraí',
    type: 2,
    code: 'BA2',
    options: {
      angle: 0,
      textColor: 0xFFFFFF,
      colors: [0x993399]
    }
  },
  {
    name: 'Dribles Sacanas',
    type: 1,
    code: 'DS1',
    options: {
      angle: 231,
      textColor: 0xFFFFFF,
      colors: [0x000000, 0x9E1313, 0x000000]
    }
  },
  {
    name: 'Marra Pura',
    type: 1,
    code: 'MP1',
    options: {
      angle: 90,
      textColor: 0xD1BE17,
      colors: [0xFCE400, 0xFFFFFF, 0xFFFFFF]
    }
  },
  {
    name: 'Marra Pura',
    type: 2,
    code: 'MP2',
    options: {
      angle: 90,
      textColor: 0xD1BE17,
      colors: [0xFCE400, 0x000000, 0x000000]
    }
  },
  {
    name: 'Pó Pó Pó',
    type: 1,
    code: 'PO1',
    options: {
      angle: 0,
      textColor: 0xF2C37D,
      colors: [0xF2C37D]
    }
  },
  {
    name: 'Pó Pó Pó',
    type: 2,
    code: 'PO2',
    options: {
      angle: 45,
      textColor: 0x000000,
      colors: [0x000000, 0xEF0D98, 0x000000]
    }
  },
  {
    name: 'Vitória do Bahia',
    type: 1,
    code: 'VB1',
    options: {
      angle: 60,
      textColor: 0xFFFFFF,
      colors: [0x000000, 0xFF0000, 0x0016E0]
    }
  },
  {
    name: 'Vitória do Bahia',
    type: 2,
    code: 'VB2',
    options: {
      angle: 60,
      textColor: 0xFFFFFF,
      colors: [0x00A60B, 0x6B93FF, 0xE00000]
    }
  },
  {
    name: 'Loukos',
    type: 1,
    code: 'LO1',
    options: {
      angle: 0,
      textColor: 0xFFFFFF,
      colors: [0xFFFFFF, 0xC40A1C, 0xFFFFFF]
    }
  },
  {
    name: 'Loukos',
    type: 2,
    code: 'LO2',
    options: {
      angle: 60,
      textColor: 0xD1B43F,
      colors: [0x151269]
    }
  },
  {
    name: 'Vendo Monza',
    type: 1,
    code: 'VM1',
    options: {
      angle: 0,
      textColor: 0xFCBF49,
      colors: [0x75AADB]
    }
  },
  {
    name: 'Vendo Monza',
    type: 2,
    code: 'VM2',
    options: {
      angle: 0,
      textColor: 0xFCBF49,
      colors: [0x75AADB]
    }
  },
  {
    name: 'Bomba de Savvoya',
    type: 1,
    code: 'BS1',
    options: {
      angle: 90,
      textColor: 0xDE0000,
      colors: [0xCFA930, 0xFFFFFF, 0xFFFFFF]
    }
  }
];

const RED_ID = 1,
  RED_COLOR = [0xE56E56, 229, 110, 86],
  BLUE_ID = 2,
  BLUE_COLOR = [0x5689E5, 89, 137, 229];

function getColorsList() {
  return colorsList.map((color) => `${color.name} #${color.type} (${color.code})`);
}

function resetColors(player) {
  if (!isAdmin(player)) return;

  setDefaultColors();

  room.sendAnnouncement('Uniformes padrão selecionados.', player.id, 0x69C969, 'small-bold');
}

function listAllColors(player) {
  const colorsListMessage = getColorsList().sort().join(', ');
  room.sendAnnouncement(colorsListMessage, player.id, 0x69C969, 'small-bold');
}

function setColors(teamId, colorCode) {
  const colorSelected = colorsList.filter((color) => color.code === colorCode)[0];

  if (colorSelected != null) {
    room.setTeamColors(teamId,
      colorSelected.options.angle,
      colorSelected.options.textColor,
      colorSelected.options.colors);
    return true;
  } else {
    return false;
  }
}

function setDefaultColors() {
  room.setTeamColors(RED_ID, 0, 0xFFFFFF, [RED_COLOR[0]]);
  room.setTeamColors(BLUE_ID, 0, 0xFFFFFF, [BLUE_COLOR[0]]);
}

function isAdmin(player) {
  if (!player.admin) {
    room.sendAnnouncement('Você não possui privilégios para usar esse comando.', player.id, 0xCF3838, 'small-bold');
    return false;
  }
  return true;
}

function setColorsCommand(teamId, player, args) {
  if (!setColors(teamId, args[0])) {
    room.sendAnnouncement('Uniforme não encontrado.', player.id, 0xCF3838, 'small-bold');
  } else {
    room.sendAnnouncement(`Bonita camisa, ${teamId === RED_ID ? 'vermelhinho' : 'azulzinho'}.`, player.id, 0x69C969, 'small-bold');
  }
}

function changeWinnerColor(scores) {
  let winnerColor,
    currentWinnerId,
    darkerPercent,
    darkerRatio;

  if (scores.red > scores.blue) {
    winnerColor = RED_COLOR;
    currentWinnerId = RED_ID;
  } else {
    winnerColor = BLUE_COLOR;
    currentWinnerId = BLUE_ID;
  }

  if (lastWinnerId === currentWinnerId) {
    winStreak++;
  } else {
    winStreak = 0;
  }

  lastWinnerId = currentWinnerId;

  if (winStreak === 0) {
    setDefaultColors();
    return;
  } else {
    darkerPercent = (winStreak <= 4 ? 5 : 2.5);
    darkerRatio = 1 - ((winStreak * darkerPercent) / 100);

    room.setTeamColors(currentWinnerId, 0, 0xFFFFFF, [getDarkerColor(winnerColor, darkerRatio)]);
  }
}

function getDarkerColor(color, ratio) {
  const currentHSL = RGBToHSL(color[1], color[2], color[3]),
    darkerLuminance = currentHSL[2] * ratio,
    newColorRGB = HSLToRGB(currentHSL[0], currentHSL[1], darkerLuminance);

  console.log(`currentHSL: ${currentHSL},\n darkerLuminance: ${darkerLuminance},\n newColorRGB: ${newColorRGB}`);

  return parseInt(RGBToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2]).substr(1), 16);
}

function RGBToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) {
    h = 0;
  }
  else if (cmax == r) {
    h = ((g - b) / delta) % 6;
  }
  else if (cmax == g) {
    h = (b - r) / delta + 2;
  }
  else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = '0' + r;
  if (g.length == 1)
    g = '0' + g;
  if (b.length == 1)
    b = '0' + b;

  return '#' + r + g + b;
}

room.onCommand_listar_uniformes = {
  function: (player) => {
    listAllColors(player);
  }
};

room.onCommand_habilitar_uniformes_invencibilidade = {
  function: (player) => {
    if (!isAdmin(player)) return;

    colorsStreakEnabled = true;
    room.sendAnnouncement('🔥 As cores do uniforme ficarão mais quentes quando um time estiver em uma sequência de vitórias.', 0x69C969, 'small-bold');
  }
};

room.onCommand_desabilitar_uniformes_invencibilidade = {
  function: (player) => {
    if (!isAdmin(player)) return;

    colorsStreakEnabled = false;
    setDefaultColors();
    room.sendAnnouncement('Mudança de uniforme em sequência de vitórias desabilitada.', 0x69C969, 'small-bold');
  }
};

room.onCommand_definir_uniforme_vermelho = {
  function: (player, args) => {
    setColorsCommand(RED_ID, player, args);
  }
};

room.onCommand_definir_uniforme_azul = {
  function: (player, args) => {
    setColorsCommand(BLUE_ID, player, args);
  }
};

room.onCommand_reiniciar_uniformes = {
  function: (player) => {
    resetColors(player);
  }
};

room.onTeamVictory = (scores) => {
  if (colorsStreakEnabled) {
    changeWinnerColor(scores);
  }
};

room.onRoomLink = () => {
  room.listColors = listAllColors;
};