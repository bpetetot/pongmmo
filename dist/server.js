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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(11);\n\n/* harmony reexport (binding) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__logger__[\"a\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(8);\n/* unused harmony export MODE_DEV */\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__logger__[\"a\"]; });\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"b\", function() { return __WEBPACK_IMPORTED_MODULE_1__server__[\"a\"]; });\n\n\n\nvar MODE_DEV = process.env.NODE_ENV === 'development';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/index.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__config__[\"b\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/index.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/index.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_global__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_lobby_LobbyServer__ = __webpack_require__(4);\n/* harmony export (binding) */ __webpack_require__.d(exports, \"io\", function() { return io; });\n\n\n\n\n\n\n\n\nvar io = __WEBPACK_IMPORTED_MODULE_0_socket_io___default()(__WEBPACK_IMPORTED_MODULE_2_global__[\"a\" /* SERVER_PORT */]);\nvar sockets = [];\n\nvar state = void 0;\n\nvar loop = function loop() {\n  return setInterval(function () {\n    if (state) state.loop();\n  }, 1 / 60 * 1000);\n};\n\nvar run = function run() {\n  __WEBPACK_IMPORTED_MODULE_3_utils__[\"a\" /* log */].debug('Start server...');\n\n  state = new __WEBPACK_IMPORTED_MODULE_4__states_lobby_LobbyServer__[\"a\" /* default */](sockets);\n  state.create();\n\n  // when a client is connected\n  io.on('connection', function (socket) {\n    __WEBPACK_IMPORTED_MODULE_3_utils__[\"a\" /* log */].debug('Client connected : ' + socket.id);\n    sockets.push(socket);\n    if (state) state.connect(socket);\n\n    // when a client is disconnected\n    socket.on('disconnect', function () {\n      __WEBPACK_IMPORTED_MODULE_3_utils__[\"a\" /* log */].debug('Client disconnected : ' + socket.id);\n      if (state) state.disconnect(socket);\n      __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.remove(sockets, function (s) {\n        return s.id === socket.id;\n      });\n    });\n  });\n\n  loop();\n\n  __WEBPACK_IMPORTED_MODULE_3_utils__[\"a\" /* log */].debug('Server started');\n};\n\nrun();\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_server__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_states_state__ = __webpack_require__(10);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(9);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n\n\n\n\n\n\nvar LobbyServer = function (_State) {\n  _inherits(LobbyServer, _State);\n\n  function LobbyServer(sockets) {\n    _classCallCheck(this, LobbyServer);\n\n    var _this = _possibleConstructorReturn(this, (LobbyServer.__proto__ || Object.getPrototypeOf(LobbyServer)).call(this, LobbyServer.NAME));\n\n    _this.sockets = sockets;\n    return _this;\n  }\n\n  _createClass(LobbyServer, [{\n    key: 'create',\n    value: function create() {\n      var _this2 = this;\n\n      this.sockets.forEach(function (socket) {\n        return _this2.connect(socket);\n      });\n      setInterval(function () {\n        return __WEBPACK_IMPORTED_MODULE_0_server__[\"io\"].emit(__WEBPACK_IMPORTED_MODULE_3__events__[\"a\" /* SERVER_PING */], new Date().getTime());\n      }, LobbyServer.PING_TIME);\n    }\n  }, {\n    key: 'connect',\n    value: function connect(socket) {\n      socket.on(__WEBPACK_IMPORTED_MODULE_3__events__[\"b\" /* CLIENT_PONG */], this.onPong);\n    }\n  }, {\n    key: 'disconnect',\n    value: function disconnect(socket) {\n      socket.removeListener(__WEBPACK_IMPORTED_MODULE_3__events__[\"b\" /* CLIENT_PONG */], this.onPong);\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      var _this3 = this;\n\n      this.sockets.forEach(function (socket) {\n        return _this3.disconnect(socket);\n      });\n    }\n  }, {\n    key: 'onPong',\n    value: function onPong(_ref) {\n      var id = _ref.id,\n          time = _ref.time;\n\n      var latency = Math.floor((new Date().getTime() - time) / 2);\n      __WEBPACK_IMPORTED_MODULE_1_utils__[\"a\" /* log */].info('Pong from client \\'' + id + '\\' : ' + latency);\n    }\n  }]);\n\n  return LobbyServer;\n}(__WEBPACK_IMPORTED_MODULE_2_states_state__[\"a\" /* default */]);\n\nLobbyServer.NAME = 'LOBBY_SERVER';\nLobbyServer.PING_TIME = 1000;\n\n\n/* harmony default export */ exports[\"a\"] = LobbyServer;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/lobby/LobbyServer.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/lobby/LobbyServer.js?");

/***/ },
/* 5 */
/***/ function(module, exports) {

eval("module.exports = require('lodash');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('lodash')\"\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('lodash')%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

eval("module.exports = require('socket.io');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('socket.io')\"\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('socket.io')%22?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return LOG_LEVEL; });\nvar LOG_LEVEL = process.env.LOG_LEVEL || 'debug';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/logger.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/logger.js?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SERVER_PORT; });\nvar SERVER_PORT = 9000;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/server.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/server.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SERVER_PING; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return CLIENT_PONG; });\nvar SERVER_PING = 'SERVER_PING';\nvar CLIENT_PONG = 'CLIENT_PONG';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/lobby/events.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/lobby/events.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils__ = __webpack_require__(0);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\nvar State = function () {\n  function State(name) {\n    _classCallCheck(this, State);\n\n    this.name = name;\n  }\n\n  _createClass(State, [{\n    key: 'create',\n    value: function create() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - create');\n    }\n  }, {\n    key: 'loop',\n    value: function loop() {\n      // log.debug(`State '${this.name}' - loop`)\n    }\n  }, {\n    key: 'pause',\n    value: function pause() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - pause');\n    }\n  }, {\n    key: 'resume',\n    value: function resume() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - resume');\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - destroy');\n    }\n  }]);\n\n  return State;\n}();\n\n/* harmony default export */ exports[\"a\"] = State;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/state.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/state.js?");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_loglevel__ = __webpack_require__(12);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_loglevel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_loglevel__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_config__ = __webpack_require__(1);\n\n\n\n__WEBPACK_IMPORTED_MODULE_0_loglevel___default.a.setLevel(__WEBPACK_IMPORTED_MODULE_1__global_config__[\"a\" /* LOG_LEVEL */]);\n\n/* harmony default export */ exports[\"a\"] = __WEBPACK_IMPORTED_MODULE_0_loglevel___default.a;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/logger.js\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils/logger.js?");

/***/ },
/* 12 */
/***/ function(module, exports) {

eval("module.exports = require('loglevel');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('loglevel')\"\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('loglevel')%22?");

/***/ }
/******/ ]);