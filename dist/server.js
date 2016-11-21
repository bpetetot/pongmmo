/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _socket = __webpack_require__(1);\n\nvar _socket2 = _interopRequireDefault(_socket);\n\nvar _player = __webpack_require__(2);\n\nvar _player2 = _interopRequireDefault(_player);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar io = (0, _socket2.default)(9000);\n\nvar WIDTH = 800;\nvar HEIGHT = 600;\nvar NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie'];\n\nvar rand = function rand(min, max) {\n  return Math.floor(Math.random() * max + min);\n};\n\nvar players = [];\n\nio.on('connection', function (socket) {\n  // Give players\n  socket.emit(_player2.default.actions.SET_PLAYERS, players);\n\n  // Generate a new player\n  var newPlayer = {\n    name: NAMES[rand(0, NAMES.length - 1)],\n    x: rand(0, WIDTH),\n    y: rand(0, HEIGHT)\n  };\n  players.push(newPlayer);\n  console.log('New player: ' + newPlayer.name);\n\n  // Send it to socket and to everybody\n  socket.emit(_player2.default.actions.SET_PLAYER, newPlayer);\n  io.emit(_player2.default.actions.ADD_PLAYER, newPlayer);\n\n  // Connect events\n  socket.on(_player2.default.actions.UPDATE_PLAYER, function (player) {\n    return _player2.default.cb.update(io, socket, player);\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./src/server.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require('socket.io');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('socket.io')\"\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///external_%22require('socket.io')%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar UPDATE_PLAYER = 'UPDATE_PLAYER';\nvar SET_PLAYERS = 'SET_PLAYERS';\nvar SET_PLAYER = 'SET_PLAYER';\nvar ADD_PLAYER = 'ADD_PLAYER';\n\nvar update = function update(io, socket, player) {\n  console.log('Update ' + JSON.stringify(player));\n  io.emit(UPDATE_PLAYER, player);\n};\n\nexports.default = {\n  actions: {\n    UPDATE_PLAYER: UPDATE_PLAYER,\n    SET_PLAYERS: SET_PLAYERS,\n    SET_PLAYER: SET_PLAYER,\n    ADD_PLAYER: ADD_PLAYER\n  },\n  cb: {\n    update: update\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/player.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./src/player.js?");

/***/ }
/******/ ]);