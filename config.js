const path = require('path');
const config = {
  amigavel:
  {
    autoStart: true,
    roomName: 'Ericko - Amigável',
    noPlayer: true,
    maxPlayers: 20,
    public: false,
    token: process.env.HAXBALL_TOKEN,
    repositories: [
      {
        type: 'github',
        repository: 'morko/hhm-sala-plugins',
      },
      {
        type: 'github',
        repository: 'rubebeben/hhm-plugins'
      },
      {
        type: 'local',
        path: path.join(__dirname, 'plugins'),
        subpath: 'chr'
      }
    ],
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: process.env.AMIGAVEL_ADMIN_PASS
        }
      },
      'sav/players': {},
      'hr/always-one-admin': {},
      'hr/pause': {
        maxPauseTimes: 0,
      },
      'hr/maps': {
        maps: {
          'Futsal x3': `{"name":"Futsal x3","width":648,"height":270,"spawnDistance":350,"bg":{"type":"hockey","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":-550,"y":80,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":240,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":-80,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,-80]},{"x":-550,"y":-240,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":80,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","pos":[700,80]},{"x":550,"y":240,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":550,"y":-80,"bCoef":1.25,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[700,-80]},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":-550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":0,"y":-240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":-557.5,"y":80,"bCoef":0.1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[-700,80]},{"x":-557.5,"y":240,"bCoef":2,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":-557.5,"y":-240,"bCoef":2,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":-557.5,"y":-80,"bCoef":0.1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[-700,-80]},{"x":557.5,"y":-240,"bCoef":2,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":557.5,"y":-80,"bCoef":0.1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[700,-80]},{"x":557.5,"y":80,"bCoef":0.1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[700,80]},{"x":557.5,"y":240,"bCoef":2,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":0,"y":-80,"bCoef":0.1,"trait":"line"},{"x":0,"y":80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":80,"bCoef":0.1,"trait":"line"},{"x":550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":550,"y":80,"bCoef":0.1,"trait":"line"},{"x":-240,"y":224,"bCoef":0.1,"trait":"line"},{"x":-240,"y":256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":224,"bCoef":0.1,"trait":"line"},{"x":-120,"y":256,"bCoef":0.1,"trait":"line"},{"x":240,"y":224,"bCoef":0.1,"trait":"line"},{"x":240,"y":256,"bCoef":0.1,"trait":"line"},{"x":120,"y":224,"bCoef":0.1,"trait":"line"},{"x":120,"y":256,"bCoef":0.1,"trait":"line"},{"x":-381,"y":240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":256,"bCoef":0.1,"trait":"line"},{"x":-550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":226,"bCoef":0.1,"trait":"line","curve":-90},{"x":-536,"y":240,"bCoef":0.1,"trait":"line","curve":-90},{"x":-550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":-226,"bCoef":0.1,"trait":"line","curve":90},{"x":-536,"y":-240,"bCoef":0.1,"trait":"line","curve":90},{"x":-556,"y":123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":123,"bCoef":0.1,"trait":"line"},{"x":556,"y":123,"bCoef":0.1,"trait":"line"},{"x":575,"y":123,"bCoef":0.1,"trait":"line"},{"x":-556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":381,"y":240,"bCoef":0.1,"trait":"line"},{"x":381,"y":256,"bCoef":0.1,"trait":"line"},{"x":381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":550,"y":-226,"bCoef":0.1,"trait":"line","curve":-90},{"x":536,"y":-240,"bCoef":0.1,"trait":"line","curve":-90},{"x":550,"y":226,"bCoef":0.1,"trait":"line","curve":90},{"x":536,"y":240,"bCoef":0.1,"trait":"line","curve":90},{"x":550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180}],"segments":[{"v0":6,"v1":7,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":7,"v1":8,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":8,"v1":9,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":10,"v1":11,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,-80],"y":-80},{"v0":11,"v1":12,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":590},{"v0":12,"v1":13,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,80],"y":80},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":180,"vis":true,"color":"F8F8F8","cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":-180,"vis":true,"color":"F8F8F8","cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":4,"v1":5,"trait":"kickOffBarrier"},{"v0":14,"v1":15,"vis":true,"color":"F8F8F8","bCoef":1.25,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":16,"v1":17,"vis":true,"color":"F8F8F8","bCoef":1.25,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":18,"v1":19,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":240},{"v0":20,"v1":21,"vis":true,"color":"F8F8F8","bCoef":1.25,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":22,"v1":23,"vis":true,"color":"F8F8F8","bCoef":1.25,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":24,"v1":25,"vis":true,"color":"F8F8F8","bCoef":0,"cMask":["ball"],"trait":"ballArea","x":550,"y":-240},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":-240},{"v0":28,"v1":29,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":30,"v1":31,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":38,"v1":39,"curve":0,"vis":false,"color":"F8F8F8","bCoef":2,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":40,"v1":41,"curve":0,"vis":false,"color":"F8F8F8","bCoef":2,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":42,"v1":43,"curve":0,"vis":false,"color":"F8F8F8","bCoef":2,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":44,"v1":45,"curve":0,"vis":false,"color":"F8F8F8","bCoef":2,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":0},{"v0":48,"v1":49,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-550},{"v0":50,"v1":51,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":550},{"v0":52,"v1":53,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240},{"v0":54,"v1":55,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-120},{"v0":56,"v1":57,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":240},{"v0":58,"v1":59,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":120},{"v0":60,"v1":61,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":62,"v1":63,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":65,"v1":64,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":66,"v1":67,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":63,"v1":67,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":69,"v1":68,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":70,"v1":71,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":72,"v1":73,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":85,"v1":84,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":87,"v1":86,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":88,"v1":89,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":90,"v1":91,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":92,"v1":93,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":95,"v1":94,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":94,"v1":95,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":97,"v1":96,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":96,"v1":97,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":99,"v1":98,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":98,"v1":99,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":101,"v1":100,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":100,"v1":101,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":103,"v1":102,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":102,"v1":103,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":105,"v1":104,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":104,"v1":105,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":107,"v1":106,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":106,"v1":107,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":109,"v1":108,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":108,"v1":109,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":111,"v1":110,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":110,"v1":111,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":113,"v1":112,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":112,"v1":113,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":115,"v1":114,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":114,"v1":115,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":117,"v1":116,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":116,"v1":117,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":119,"v1":118,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":118,"v1":119,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":121,"v1":120,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":120,"v1":121,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":123,"v1":122,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":122,"v1":123,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":125,"v1":124,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":124,"v1":125,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5}],"goals":[{"p0":[-556.3,-80],"p1":[-556.3,80],"team":"red"},{"p0":[556.3,80],"p1":[556.3,-80],"team":"blue"}],"discs":[{"radius":5,"pos":[-550,80],"color":"6666CC","trait":"goalPost","y":80},{"radius":5,"pos":[-550,-80],"color":"6666CC","trait":"goalPost","y":-80,"x":-560},{"radius":5,"pos":[550,80],"color":"6666CC","trait":"goalPost","y":80},{"radius":5,"pos":[550,-80],"color":"6666CC","trait":"goalPost","y":-80},{"radius":3,"invMass":0,"pos":[-550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-240,"bCoef":1,"trait":"ballArea","vis":false,"curve":0},{"normal":[0,-1],"dist":-240,"bCoef":1,"trait":"ballArea"},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-642,"bCoef":0.1},{"normal":[-1,0],"dist":-644,"bCoef":0.1},{"normal":[1,0],"dist":-642,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0},{"normal":[-1,0],"dist":-643,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"line":{"vis":true,"bCoef":0.1,"cMask":[""]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.5},"ballPhysics":{"radius":6.3,"bCoef":0.4,"invMass":1.5,"damping":0.99,"color":"FFCC00"}}`,
          'Shootout': `{"name":"Shootout","width":420,"height":200,"spawnDistance":300,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10,"cornerRadius":0},"vertexes":[{"x":420,"y":600,"trait":"ballArea"},{"x":420,"y":-600,"trait":"ballArea"},{"x":283,"y":500,"trait":"gkArea"},{"x":283,"y":-500,"trait":"gkArea"},{"x":335,"y":500,"trait":"gkArea"},{"x":335,"y":-500,"trait":"gkArea"},{"x":-475,"y":-200,"trait":"penArea"},{"x":-10,"y":-190,"trait":"penArea"},{"x":-10,"y":190,"trait":"penArea"},{"x":-475,"y":200,"trait":"penArea"},{"x":300,"y":-250,"trait":"line"},{"x":300,"y":250,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":175,"y":-175,"trait":"line"},{"x":300,"y":-175,"trait":"line"},{"x":175,"y":175,"trait":"line"},{"x":300,"y":175,"trait":"line"},{"x":-120,"y":-250,"trait":"line"},{"x":-120,"y":250,"trait":"line"},{"x":-120,"y":-190,"trait":"line"},{"x":-120,"y":190,"trait":"line"},{"x":300,"y":-100,"trait":"line"},{"x":350,"y":-98,"trait":"line"},{"x":350,"y":98,"trait":"line"},{"x":300,"y":100,"trait":"line"},{"x":0,"y":-15,"trait":"powerboost"},{"x":0,"y":15,"trait":"powerboost"},{"x":400,"y":-135,"trait":"line"},{"x":400,"y":135,"trait":"line"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"gkArea"},{"v0":4,"v1":5,"trait":"gkArea"},{"v0":6,"v1":7,"trait":"penArea"},{"v0":7,"v1":8,"trait":"penArea","curve":50},{"v0":8,"v1":9,"trait":"penArea"},{"v0":9,"v1":6,"trait":"penArea"},{"v0":10,"v1":11,"trait":"line"},{"v0":12,"v1":13,"trait":"line","curve":-180},{"v0":14,"v1":15,"trait":"line","curve":180},{"v0":16,"v1":17,"trait":"line"},{"v0":16,"v1":18,"trait":"line"},{"v0":18,"v1":19,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":22,"v1":23,"trait":"line","curve":-140},{"v0":24,"v1":25,"trait":"goalnet","curve":10},{"v0":25,"v1":26,"trait":"goalnet","curve":10},{"v0":26,"v1":27,"trait":"goalnet","curve":10},{"v0":28,"v1":29,"trait":"powerboost","curve":180},{"v0":25,"v1":30,"trait":"line"},{"v0":26,"v1":31,"trait":"line"}],"goals":[{"p0":[310,100],"p1":[310,-100],"team":"blue"},{"p0":[300,100],"p1":[-400,100],"team":"red"},{"p0":[300,-100],"p1":[-400,-100],"team":"red"},{"p0":[-10,250],"p1":[-10,-250],"team":"red"}],"discs":[{"pos":[300,100],"trait":"goalPost"},{"pos":[300,-100],"trait":"goalPost"},{"pos":[400,-135],"trait":"stanchion"},{"pos":[400,135],"trait":"stanchion"}],"planes":[{"normal":[0,1],"dist":-200,"trait":"ballArea"},{"normal":[0,-1],"dist":-200,"trait":"ballArea"},{"normal":[0,1],"dist":-250,"bCoef":0.1},{"normal":[0,-1],"dist":-250,"bCoef":0.1},{"normal":[1,0],"dist":-400,"bCoef":0.1},{"normal":[-1,0],"dist":-400,"bCoef":0.1}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"gkArea":{"vis":false,"bCoef":0,"cMask":["blue"]},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]},"line":{"vis":true,"color":"C7E6BD","cMask":[]},"goalnet":{"vis":true,"bCoef":0.1,"color":"C7E6BD","cMask":["ball","red","blue"]},"powerboost":{"vis":false,"bCoef":-2.4,"cMask":["ball"],"color":"C7E6BD"},"goalPost":{"radius":5,"invMass":0,"bCoef":1.3,"color":"FFFFFF"},"stanchion":{"radius":3,"invMass":0,"bCoef":1,"color":"FFFFFF"}}}`
        }
      },
      'hr/win-streak': {},
      'chr/colors': {},
      'chr/draw': {
        enabled: false
      },
      'chr/game-review': {
        discord: { enabled: process.env.AMIGAVEL_DISCORD_IS_ENABLED, url: process.env.AMIGAVEL_DISCORD_WEBHOOK },
        ericko: { enabled: process.env.AMIGAVEL_ERICKO_IS_ENABLED, token: process.env.AMIGAVEL_ERICKO_TOKEN }
      },
      'chr/game-info': {}
    }
  },
  campeonato:
  {
    autoStart: true,
    roomName: '🏟️ Ratamero Sports Arena',
    noPlayer: true,
    maxPlayers: 20,
    public: false,
    token: process.env.CAMPEONATO_TOKEN,
    repositories: [
      {
        type: 'github',
        repository: 'morko/hhm-sala-plugins',
      },
      {
        type: 'github',
        repository: 'rubebeben/hhm-plugins'
      },
      {
        type: 'github',
        repository: 'sav/hhm-plugins'
      },
      {
        type: 'local',
        path: path.join(__dirname, 'plugins'),
        subpath: 'chr'
      }
    ],
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: process.env.CAMPEONATO_ADMIN_PASS
        }
      },
      'sav/players': {},
      'hr/always-one-admin': {},
      'hr/pause': {
        maxPauseTimes: 0,
      },
      'hr/game-mode': {
        defaultMap: 'Big',
        enabledMaps: ['Big', 'Shootout']
      },
      'hr/maps': {
        maps: {
          'Shootout': `{"name":"Shootout","width":420,"height":200,"spawnDistance":300,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10,"cornerRadius":0},"vertexes":[{"x":420,"y":600,"trait":"ballArea"},{"x":420,"y":-600,"trait":"ballArea"},{"x":283,"y":500,"trait":"gkArea"},{"x":283,"y":-500,"trait":"gkArea"},{"x":335,"y":500,"trait":"gkArea"},{"x":335,"y":-500,"trait":"gkArea"},{"x":-475,"y":-200,"trait":"penArea"},{"x":-10,"y":-190,"trait":"penArea"},{"x":-10,"y":190,"trait":"penArea"},{"x":-475,"y":200,"trait":"penArea"},{"x":300,"y":-250,"trait":"line"},{"x":300,"y":250,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":175,"y":-175,"trait":"line"},{"x":300,"y":-175,"trait":"line"},{"x":175,"y":175,"trait":"line"},{"x":300,"y":175,"trait":"line"},{"x":-120,"y":-250,"trait":"line"},{"x":-120,"y":250,"trait":"line"},{"x":-120,"y":-190,"trait":"line"},{"x":-120,"y":190,"trait":"line"},{"x":300,"y":-100,"trait":"line"},{"x":350,"y":-98,"trait":"line"},{"x":350,"y":98,"trait":"line"},{"x":300,"y":100,"trait":"line"},{"x":0,"y":-15,"trait":"powerboost"},{"x":0,"y":15,"trait":"powerboost"},{"x":400,"y":-135,"trait":"line"},{"x":400,"y":135,"trait":"line"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"gkArea"},{"v0":4,"v1":5,"trait":"gkArea"},{"v0":6,"v1":7,"trait":"penArea"},{"v0":7,"v1":8,"trait":"penArea","curve":50},{"v0":8,"v1":9,"trait":"penArea"},{"v0":9,"v1":6,"trait":"penArea"},{"v0":10,"v1":11,"trait":"line"},{"v0":12,"v1":13,"trait":"line","curve":-180},{"v0":14,"v1":15,"trait":"line","curve":180},{"v0":16,"v1":17,"trait":"line"},{"v0":16,"v1":18,"trait":"line"},{"v0":18,"v1":19,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":22,"v1":23,"trait":"line","curve":-140},{"v0":24,"v1":25,"trait":"goalnet","curve":10},{"v0":25,"v1":26,"trait":"goalnet","curve":10},{"v0":26,"v1":27,"trait":"goalnet","curve":10},{"v0":28,"v1":29,"trait":"powerboost","curve":180},{"v0":25,"v1":30,"trait":"line"},{"v0":26,"v1":31,"trait":"line"}],"goals":[{"p0":[310,100],"p1":[310,-100],"team":"blue"},{"p0":[300,100],"p1":[-400,100],"team":"red"},{"p0":[300,-100],"p1":[-400,-100],"team":"red"},{"p0":[-10,250],"p1":[-10,-250],"team":"red"}],"discs":[{"pos":[300,100],"trait":"goalPost"},{"pos":[300,-100],"trait":"goalPost"},{"pos":[400,-135],"trait":"stanchion"},{"pos":[400,135],"trait":"stanchion"}],"planes":[{"normal":[0,1],"dist":-200,"trait":"ballArea"},{"normal":[0,-1],"dist":-200,"trait":"ballArea"},{"normal":[0,1],"dist":-250,"bCoef":0.1},{"normal":[0,-1],"dist":-250,"bCoef":0.1},{"normal":[1,0],"dist":-400,"bCoef":0.1},{"normal":[-1,0],"dist":-400,"bCoef":0.1}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"gkArea":{"vis":false,"bCoef":0,"cMask":["blue"]},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]},"line":{"vis":true,"color":"C7E6BD","cMask":[]},"goalnet":{"vis":true,"bCoef":0.1,"color":"C7E6BD","cMask":["ball","red","blue"]},"powerboost":{"vis":false,"bCoef":-2.4,"cMask":["ball"],"color":"C7E6BD"},"goalPost":{"radius":5,"invMass":0,"bCoef":1.3,"color":"FFFFFF"},"stanchion":{"radius":3,"invMass":0,"bCoef":1,"color":"FFFFFF"}}}`
        }
      },
      'chr/colors': {},
      'chr/draw': {
        enabled: true
      },
      'chr/fake-soccer-news': {},
      'chr/game-review': {
        discord: { enabled: process.env.CAMPEONATO_DISCORD_IS_ENABLED, url: process.env.CAMPEONATO_DISCORD_WEBHOOK },
        ericko: { enabled: process.env.CAMPEONATO_ERICKO_IS_ENABLED, token: process.env.CAMPEONATO_ERICKO_TOKEN }
      },
      'chr/game-info': {
        championshipMode: true
      },
    }
  },
  campeonato2:
  {
    autoStart: true,
    roomName: '🏟️ Estádio Municipal Vinicius Limongi',
    noPlayer: true,
    maxPlayers: 20,
    public: false,
    token: process.env.CAMPEONATO2_TOKEN,
    repositories: [
      {
        type: 'github',
        repository: 'morko/hhm-sala-plugins',
      },
      {
        type: 'github',
        repository: 'rubebeben/hhm-plugins'
      },
      {
        type: 'github',
        repository: 'sav/hhm-plugins'
      },
      {
        type: 'local',
        path: path.join(__dirname, 'plugins'),
        subpath: 'chr'
      }
    ],
    pluginConfig: {
      'sav/roles': {
        roles: {
          admin: process.env.CAMPEONATO_ADMIN_PASS
        }
      },
      'sav/players': {},
      'hr/always-one-admin': {},
      'hr/pause': {
        maxPauseTimes: 0,
      },
      'hr/game-mode': {
        defaultMap: 'Big',
        enabledMaps: ['Big', 'Shootout']
      },
      'hr/maps': {
        maps: {
          'Shootout': `{"name":"Shootout","width":420,"height":200,"spawnDistance":300,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10,"cornerRadius":0},"vertexes":[{"x":420,"y":600,"trait":"ballArea"},{"x":420,"y":-600,"trait":"ballArea"},{"x":283,"y":500,"trait":"gkArea"},{"x":283,"y":-500,"trait":"gkArea"},{"x":335,"y":500,"trait":"gkArea"},{"x":335,"y":-500,"trait":"gkArea"},{"x":-475,"y":-200,"trait":"penArea"},{"x":-10,"y":-190,"trait":"penArea"},{"x":-10,"y":190,"trait":"penArea"},{"x":-475,"y":200,"trait":"penArea"},{"x":300,"y":-250,"trait":"line"},{"x":300,"y":250,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":175,"y":-175,"trait":"line"},{"x":300,"y":-175,"trait":"line"},{"x":175,"y":175,"trait":"line"},{"x":300,"y":175,"trait":"line"},{"x":-120,"y":-250,"trait":"line"},{"x":-120,"y":250,"trait":"line"},{"x":-120,"y":-190,"trait":"line"},{"x":-120,"y":190,"trait":"line"},{"x":300,"y":-100,"trait":"line"},{"x":350,"y":-98,"trait":"line"},{"x":350,"y":98,"trait":"line"},{"x":300,"y":100,"trait":"line"},{"x":0,"y":-15,"trait":"powerboost"},{"x":0,"y":15,"trait":"powerboost"},{"x":400,"y":-135,"trait":"line"},{"x":400,"y":135,"trait":"line"}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"gkArea"},{"v0":4,"v1":5,"trait":"gkArea"},{"v0":6,"v1":7,"trait":"penArea"},{"v0":7,"v1":8,"trait":"penArea","curve":50},{"v0":8,"v1":9,"trait":"penArea"},{"v0":9,"v1":6,"trait":"penArea"},{"v0":10,"v1":11,"trait":"line"},{"v0":12,"v1":13,"trait":"line","curve":-180},{"v0":14,"v1":15,"trait":"line","curve":180},{"v0":16,"v1":17,"trait":"line"},{"v0":16,"v1":18,"trait":"line"},{"v0":18,"v1":19,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":22,"v1":23,"trait":"line","curve":-140},{"v0":24,"v1":25,"trait":"goalnet","curve":10},{"v0":25,"v1":26,"trait":"goalnet","curve":10},{"v0":26,"v1":27,"trait":"goalnet","curve":10},{"v0":28,"v1":29,"trait":"powerboost","curve":180},{"v0":25,"v1":30,"trait":"line"},{"v0":26,"v1":31,"trait":"line"}],"goals":[{"p0":[310,100],"p1":[310,-100],"team":"blue"},{"p0":[300,100],"p1":[-400,100],"team":"red"},{"p0":[300,-100],"p1":[-400,-100],"team":"red"},{"p0":[-10,250],"p1":[-10,-250],"team":"red"}],"discs":[{"pos":[300,100],"trait":"goalPost"},{"pos":[300,-100],"trait":"goalPost"},{"pos":[400,-135],"trait":"stanchion"},{"pos":[400,135],"trait":"stanchion"}],"planes":[{"normal":[0,1],"dist":-200,"trait":"ballArea"},{"normal":[0,-1],"dist":-200,"trait":"ballArea"},{"normal":[0,1],"dist":-250,"bCoef":0.1},{"normal":[0,-1],"dist":-250,"bCoef":0.1},{"normal":[1,0],"dist":-400,"bCoef":0.1},{"normal":[-1,0],"dist":-400,"bCoef":0.1}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"gkArea":{"vis":false,"bCoef":0,"cMask":["blue"]},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]},"line":{"vis":true,"color":"C7E6BD","cMask":[]},"goalnet":{"vis":true,"bCoef":0.1,"color":"C7E6BD","cMask":["ball","red","blue"]},"powerboost":{"vis":false,"bCoef":-2.4,"cMask":["ball"],"color":"C7E6BD"},"goalPost":{"radius":5,"invMass":0,"bCoef":1.3,"color":"FFFFFF"},"stanchion":{"radius":3,"invMass":0,"bCoef":1,"color":"FFFFFF"}}}`
        }
      },
      'chr/colors': {},
      'chr/draw': {
        enabled: true
      },
      'chr/game-review': {
        discord: { enabled: process.env.CAMPEONATO_DISCORD_IS_ENABLED, url: process.env.CAMPEONATO_DISCORD_WEBHOOK },
        ericko: { enabled: process.env.CAMPEONATO_ERICKO_IS_ENABLED, token: process.env.CAMPEONATO_ERICKO_TOKEN }
      },
      'chr/game-info': {
        championshipMode: true
      },
    }
  }
};

module.exports = config;