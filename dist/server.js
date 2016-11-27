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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("var UPDATE_PLAYER = 'UPDATE_PLAYER';\nvar SET_PLAYERS = 'SET_PLAYERS';\nvar SET_PLAYER = 'SET_PLAYER';\nvar ADD_PLAYER = 'ADD_PLAYER';\n\nvar update = function update(io, socket, player) {\n  console.log('Update ' + JSON.stringify(player));\n  io.emit(UPDATE_PLAYER, player);\n};\n\n/* harmony default export */ exports[\"a\"] = {\n  actions: {\n    UPDATE_PLAYER: UPDATE_PLAYER,\n    SET_PLAYERS: SET_PLAYERS,\n    SET_PLAYER: SET_PLAYER,\n    ADD_PLAYER: ADD_PLAYER\n  },\n  cb: {\n    update: update\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/player.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

eval("module.exports = require('socket.io');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('socket.io')\"\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('socket.io')%22?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(0);\n\n\n\nvar io = __WEBPACK_IMPORTED_MODULE_0_socket_io___default()(9000);\n\nvar WIDTH = 800;\nvar HEIGHT = 600;\nvar NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie'];\n\nvar rand = function rand(min, max) {\n  return Math.floor(Math.random() * max + min);\n};\n\nvar players = [];\n\nio.on('connection', function (socket) {\n  // Give players\n  socket.emit(__WEBPACK_IMPORTED_MODULE_1__player__[\"a\" /* default */].actions.SET_PLAYERS, players);\n\n  // Generate a new player\n  var newPlayer = {\n    name: NAMES[rand(0, NAMES.length - 1)],\n    x: rand(0, WIDTH),\n    y: rand(0, HEIGHT)\n  };\n  players.push(newPlayer);\n  console.log('New player: ' + newPlayer.name);\n\n  // Send it to socket and to everybody\n  socket.emit(__WEBPACK_IMPORTED_MODULE_1__player__[\"a\" /* default */].actions.SET_PLAYER, newPlayer);\n  io.emit(__WEBPACK_IMPORTED_MODULE_1__player__[\"a\" /* default */].actions.ADD_PLAYER, newPlayer);\n\n  // Connect events\n  socket.on(__WEBPACK_IMPORTED_MODULE_1__player__[\"a\" /* default */].actions.UPDATE_PLAYER, function (player) {\n    return __WEBPACK_IMPORTED_MODULE_1__player__[\"a\" /* default */].cb.update(io, socket, player);\n  });\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }
/******/ ]);