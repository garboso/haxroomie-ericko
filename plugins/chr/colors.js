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
    { name: 'Lion Heart',
        type: 1,
        options: {
            angle: 115,
            textColor: 0xFFFFFF,
            colors: [0x000000, 0xFF54D7, 0xFF54D7]
        }
    },
    { name: 'Lion Heart',
        type: 2,
        options: {
            angle: 90,
            textColor: 0xFFFFFF,
            colors: [0x000000, 0x000000, 0xFF54D7]
        }
    }
];

const RED_ID = 1,
    BLUE_ID = 2;

function getColorsList() {
    return colorsList.map((color) => `${color.name} - ${color.type}`);
}

function listAllColors(player) {
    const colorsListMessage = getColorsList().sort().join('\n');
    room.sendAnnouncement(colorsListMessage, player.id);
}

function setColor(teamId, colorName, colorType) {
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

function setColorCommand(teamId, player, args) {
    if (!isAdmin(player)) return;

    const fullName = args.join(' ').split(' - ');

    const colorName = fullName[0],
          colorType = fullName[1];

    console.warn(`args: ${args}`);
    if (!setColor(teamId, colorName, parseInt(colorType))) {
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

room.onCommand_setColorRed = {
    function: (player, args) => {
        setColorCommand(RED_ID, player, args);
    }
};

room.onCommand_setColorBlue = {
    function: (player, args) => {
        setColorCommand(BLUE_ID, player, args);
    }
};

room.onRoomLink = () => {
    room.listAllColors = listAllColors;
};