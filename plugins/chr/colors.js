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
    options: {
      angle: 115,
      textColor: 0xFFFFFF,
      colors: [0x000000, 0xFF54D7, 0xFF54D7]
    }
  },
  {
    name: 'Lion Heart',
    type: 2,
    options: {
      angle: 90,
      textColor: 0xFFFFFF,
      colors: [0x333333, 0x333333, 0xFF54D7]
    }
  },
  {
    name: 'Boca Juniors',
    type: 1,
    options: {
      angle: 90,
      textColor: 0xFFFFFF,
      colors: [0x000482, 0xFFE70D, 0x230085]
    }
  },
  {
    name: 'River Plate',
    type: 1,
    options: {
      angle: 55,
      textColor: 0x0A0A0A,
      colors: [0xFFFDFC, 0xFF0A0A, 0xFAF7F7]
    }
  },
  {
    name: 'River Plate',
    type: 2,
    options: {
      angle: 145,
      textColor: 0xFFFFFF,
      colors: [0x000000, 0xFF1900, 0x000000]
    }
  }
];

const RED_ID = 1,
  BLUE_ID = 2;

function getColorsList() {
  return colorsList.map((color) => `${color.name} - ${color.type}`);
}

function resetColors(player) {
  if (!isAdmin(player)) return;

  room.setTeamColors(RED_ID, 0, 0xFFFFFF, [0xE56E56]);
  room.setTeamColors(BLUE_ID, 0, 0xFFFFFF, [0x5689E5]);

  room.sendAnnouncement('Default colors selected.', player.id);
}

function listAllColors(player) {
  const colorsListMessage = getColorsList().sort().join('\n');
  room.sendAnnouncement(colorsListMessage, player.id);
}

function setColors(teamId, colorName, colorType) {
  const colorSelected = colorsList.filter((color) => color.name === colorName && color.type === colorType)[0];

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

  const fullName = args.join(' ').split(' - ');

  const colorName = fullName[0],
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