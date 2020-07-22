/**
 * Colors plugin, admins can choose specific colors (or kits) to the teams.
 */
const room = HBInit();

room.pluginSpec = {
  name: 'chr/colors',
  author: 'garboso',
  version: '1.0.0',
  dependencies: [
    'sav/core',
    'sav/commands'
  ]
};

const colorsList = [
  {
    name: 'Lion Heart',
    type: 1,
    code: 'LH1',
    options: {
      angle: 115,
      textColor: 0xFFFFFF,
      colors: [0x000000, 0xFF54D7, 0xFF54D7]
    }
  },
  {
    name: 'Lion Heart',
    type: 2,
    code: 'LH2',
    options: {
      angle: 90,
      textColor: 0xFFFFFF,
      colors: [0x333333, 0x333333, 0xFF54D7]
    }
  },
  {
    name: 'Mistos',
    type: 1,
    code: 'MI1',
    options: {
      angle: 0,
      textColor: 0x309111,
      colors: [0xDE0000, 0xDE0000, 0xFFFFFF]
    }
  },
  {
    name: 'Mistos',
    type: 2,
    code: 'MI2',
    options: {
      angle: 0,
      textColor: 0xDE0000,
      colors: [0xFFFFFF, 0x309111, 0x309111]
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
    name: 'Barba Flu',
    type: 1,
    code: 'BF1',
    options: {
      angle: 65,
      textColor: 0xFFFFFF,
      colors: [0xFF8000, 0xFF8000, 0x000000]
    }
  },
  {
    name: 'Barba Flu',
    type: 2,
    code: 'BF2',
    options: {
      angle: 0,
      textColor: 0xFFFFFF,
      colors: [0x107500, 0x940000, 0x107500]
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
      angle: -60,
      textColor: 0x000000,
      colors: [0xFFFFFF, 0xFF00AA, 0xFFFFFF]
    }
  },
  {
    name: 'Pó Pó Pó',
    type: 2,
    code: 'PO2',
    options: {
      angle: -60,
      textColor: 0xFFFFFF,
      colors: [0x0E0C00, 0x0E0C00, 0xFF00AA]
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
      angle: 1,
      textColor: 0xFFFFFF,
      colors: [0x00A60B, 0x6B93FF, 0xE00000]
    }
  },
  {
    name: 'Vendo Monza',
    type: 1,
    code: 'VM1',
    options: {
      angle: 120,
      textColor: 0x001E30,
      colors: [0x660000, 0x7D0000, 0x7D0000]
    }
  },
  {
    name: 'Vendo Monza',
    type: 2,
    code: 'VM2',
    options: {
      angle: 60,
      textColor: 0x002033,
      colors: [0xFFFFFF, 0xFF3030, 0xFFFFFF]
    }
  },
  {
    name: 'Bomba de Savvoya',
    type: 1,
    code: 'BS1',
    options: {
      angle: 0,
      textColor: 0x1100FF,
      colors: [0x0E8700, 0xFFFFFF, 0xE80F00]
    }
  }
];

const RED_ID = 1,
  BLUE_ID = 2;

function getColorsList() {
  return colorsList.map((color) => `${color.name} #${color.type} (${color.code})`);
}

function resetColors(player) {
  if (!isAdmin(player)) return;

  room.setTeamColors(RED_ID, 0, 0xFFFFFF, [0xE56E56]);
  room.setTeamColors(BLUE_ID, 0, 0xFFFFFF, [0x5689E5]);

  room.sendAnnouncement('Default colors selected.', player.id);
}

function listAllColors(player) {
  const colorsListMessage = getColorsList().sort().join(', ');
  room.sendAnnouncement(colorsListMessage, player.id);
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

function isAdmin(player) {
  if (!player.admin) {
    room.sendAnnouncement('You have to be admin to use this command!', player.id, 0xff0000);
    return false;
  }
  return true;
}

function setColorsCommand(teamId, player, args) {
  if (!isAdmin(player)) return;

  const fullName = args.join(' ').split(' - '),
    colorName = fullName[0],
    colorType = fullName[1];

  if (!setColors(teamId, colorName, parseInt(colorType))) {
    room.sendAnnouncement('Color not found.', player.id);
  } else {
    room.sendAnnouncement('Nice kit.', player.id);
  }
}

room.onCommand_listColors = {
  function: (player) => {
    listAllColors(player);
  }
};

room.onCommand_setColorsRed = {
  function: (player, args) => {
    setColorsCommand(RED_ID, player, args);
  }
};

room.onCommand_setColorsBlue = {
  function: (player, args) => {
    setColorsCommand(BLUE_ID, player, args);
  }
};

room.onCommand_resetColors = {
  function: (player) => {
    resetColors(player);
  }
};

room.onRoomLink = () => {
  room.listColors = listAllColors;
};