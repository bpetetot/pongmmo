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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(14);\n\n/* harmony reexport (binding) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__logger__[\"a\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(9);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(10);\n/* unused harmony export MODE_DEV */\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__logger__[\"a\"]; });\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"b\", function() { return __WEBPACK_IMPORTED_MODULE_1__server__[\"a\"]; });\n\n\n\nvar MODE_DEV = process.env.NODE_ENV === 'development';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/index.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/index.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils__ = __webpack_require__(0);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\nvar State = function () {\n  function State(name) {\n    _classCallCheck(this, State);\n\n    this.name = name;\n  }\n\n  _createClass(State, [{\n    key: 'connect',\n    value: function connect() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - connect');\n    }\n  }, {\n    key: 'disconnect',\n    value: function disconnect() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - disconnect');\n    }\n  }, {\n    key: 'create',\n    value: function create() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - create');\n    }\n  }, {\n    key: 'loop',\n    value: function loop() {\n      // log.debug(`State '${this.name}' - loop`)\n    }\n  }, {\n    key: 'pause',\n    value: function pause() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - pause');\n    }\n  }, {\n    key: 'resume',\n    value: function resume() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - resume');\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy() {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].debug('State \\'' + this.name + '\\' - destroy');\n    }\n  }]);\n\n  return State;\n}();\n\n/* harmony default export */ exports[\"a\"] = State;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/state.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/state.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(1);\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__config__[\"b\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/index.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/index.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Factory = function () {\n  function Factory() {\n    _classCallCheck(this, Factory);\n\n    this.states = {};\n    this.sockets = [];\n  }\n\n  _createClass(Factory, [{\n    key: 'loop',\n    value: function loop() {\n      this.loopImplem(this.loop);\n      if (this.state) {\n        var newState = this.state.loop();\n        if (newState) this.changeTo(newState);\n      }\n    }\n  }, {\n    key: 'connect',\n    value: function connect() {\n      var _this = this;\n\n      this.sockets.forEach(function (s) {\n        _this.state.connect(s);\n      });\n    }\n  }, {\n    key: 'disconnect',\n    value: function disconnect() {\n      var _this2 = this;\n\n      this.sockets.forEach(function (s) {\n        _this2.state.disconnect(s);\n      });\n    }\n  }, {\n    key: 'changeTo',\n    value: function changeTo(name) {\n      if (this.state) {\n        this.disconnect();\n        this.state.pause();\n        if (this.state.name === 'lobby' && name === 'ingame' || this.state.name === 'ingame' && name === 'lobby') {\n          this.state.destroy();\n          this.state = null;\n        }\n      }\n\n      var curName = this.state && this.state.name || '';\n      var newState = this.states[curName];\n      if (newState) {\n        this.state = newState;\n      } else {\n        newState = new this.statesFactories[name]();\n        this.state = newState;\n        this.state.name = name;\n        this.state.factory = this;\n        this.state.broadcast = this.broadcast;\n        this.state.create();\n      }\n\n      this.state.resume();\n      this.connect();\n    }\n  }, {\n    key: 'run',\n    value: function run(init) {\n      init(this);\n      this.loop();\n      this.changeTo('lobby');\n    }\n  }]);\n\n  return Factory;\n}();\n\n/* harmony default export */ exports[\"a\"] = new Factory();\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/factory.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/factory.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_states_state__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(12);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n\n\n\n\nvar IngameServer = function (_State) {\n  _inherits(IngameServer, _State);\n\n  function IngameServer() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, IngameServer);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IngameServer.__proto__ || Object.getPrototypeOf(IngameServer)).call.apply(_ref, [this].concat(args))), _this), _this.onEndGame = function () {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].info('Game over');\n      _this.broadcast(__WEBPACK_IMPORTED_MODULE_2__events__[\"a\" /* SERVER_END_GAME */]);\n      _this.factory.changeTo('lobby');\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(IngameServer, [{\n    key: 'connect',\n    value: function connect(socket) {\n      socket.on(__WEBPACK_IMPORTED_MODULE_2__events__[\"b\" /* CLIENT_END_GAME */], this.onEndGame);\n    }\n\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: 'disconnect',\n    value: function disconnect(socket) {\n      socket.removeAllListeners();\n    }\n  }]);\n\n  return IngameServer;\n}(__WEBPACK_IMPORTED_MODULE_1_states_state__[\"a\" /* default */]);\n\n/* harmony default export */ exports[\"a\"] = IngameServer;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/ingame/IngameServer.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/ingame/IngameServer.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_states_state__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(13);\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n\n\n\n\nvar PING_TIME = 1000;\n\nvar LobbyServer = function (_State) {\n  _inherits(LobbyServer, _State);\n\n  function LobbyServer() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, LobbyServer);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LobbyServer.__proto__ || Object.getPrototypeOf(LobbyServer)).call.apply(_ref, [this].concat(args))), _this), _this.onPong = function (_ref2) {\n      var id = _ref2.id,\n          time = _ref2.time;\n\n      var latency = Math.floor((new Date().getTime() - time) / 2);\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].info('Pong from client \\'' + id + '\\' : ' + latency);\n    }, _this.onJoinGame = function (id) {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].info('Client \\'' + id + '\\' joins the game');\n    }, _this.onStartGame = function () {\n      __WEBPACK_IMPORTED_MODULE_0_utils__[\"a\" /* log */].info('Game starts');\n      _this.broadcast(__WEBPACK_IMPORTED_MODULE_2__events__[\"a\" /* SERVER_START_GAME */]);\n      _this.factory.changeTo('ingame');\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(LobbyServer, [{\n    key: 'resume',\n    value: function resume() {\n      var _this2 = this;\n\n      this.itv = setInterval(function () {\n        _this2.broadcast(__WEBPACK_IMPORTED_MODULE_2__events__[\"b\" /* SERVER_PING */], new Date().getTime());\n      }, PING_TIME);\n    }\n  }, {\n    key: 'pause',\n    value: function pause() {\n      if (this.itv) clearInterval(this.itv);\n    }\n  }, {\n    key: 'connect',\n    value: function connect(socket) {\n      socket.on(__WEBPACK_IMPORTED_MODULE_2__events__[\"c\" /* CLIENT_PONG */], this.onPong);\n      socket.on(__WEBPACK_IMPORTED_MODULE_2__events__[\"d\" /* CLIENT_JOIN_GAME */], this.onJoinGame);\n      socket.on(__WEBPACK_IMPORTED_MODULE_2__events__[\"e\" /* CLIENT_START_GAME */], this.onStartGame);\n    }\n\n    // eslint-disable-next-line class-methods-use-this\n\n  }, {\n    key: 'disconnect',\n    value: function disconnect(socket) {\n      socket.removeAllListeners();\n    }\n  }]);\n\n  return LobbyServer;\n}(__WEBPACK_IMPORTED_MODULE_1_states_state__[\"a\" /* default */]);\n\n/* harmony default export */ exports[\"a\"] = LobbyServer;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/lobby/LobbyServer.js\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/lobby/LobbyServer.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

eval("module.exports = require('lodash');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('lodash')\"\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('lodash')%22?");

/***/ },
/* 8 */
/***/ function(module, exports) {

eval("module.exports = require('socket.io');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('socket.io')\"\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('socket.io')%22?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return LOG_LEVEL; });\nvar LOG_LEVEL = process.env.LOG_LEVEL || 'debug';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/logger.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/logger.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SERVER_PORT; });\nvar SERVER_PORT = 9000;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/global/config/server.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/global/config/server.js?");

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SERVER_END_GAME; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return CLIENT_END_GAME; });\n/* unused harmony export USER_END_GAME */\n// socket events\nvar SERVER_END_GAME = 'SERVER_END_GAME';\nvar CLIENT_END_GAME = 'CLIENT_END_GAME';\n\n// user events\nvar USER_END_GAME = 'USER_END_GAME';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/ingame/events.js\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/ingame/events.js?");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return SERVER_PING; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"c\", function() { return CLIENT_PONG; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"d\", function() { return CLIENT_JOIN_GAME; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SERVER_START_GAME; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"e\", function() { return CLIENT_START_GAME; });\n/* unused harmony export USER_JOIN_GAME */\n/* unused harmony export USER_START_GAME */\n// socket events\nvar SERVER_PING = 'SERVER_PING';\nvar CLIENT_PONG = 'CLIENT_PONG';\nvar CLIENT_JOIN_GAME = 'CLIENT_JOIN_GAME';\nvar SERVER_START_GAME = 'SERVER_START_GAME';\nvar CLIENT_START_GAME = 'CLIENT_START_GAME';\n\n// user events\nvar USER_JOIN_GAME = 'USER_JOIN_GAME';\nvar USER_START_GAME = 'USER_START_GAME';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/states/lobby/events.js\n// module id = 13\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/states/lobby/events.js?");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_loglevel__ = __webpack_require__(16);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_loglevel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_loglevel__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_config__ = __webpack_require__(1);\n\n\n\n__WEBPACK_IMPORTED_MODULE_0_loglevel___default.a.setLevel(__WEBPACK_IMPORTED_MODULE_1__global_config__[\"a\" /* LOG_LEVEL */]);\n\n/* harmony default export */ exports[\"a\"] = __WEBPACK_IMPORTED_MODULE_0_loglevel___default.a;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils/logger.js\n// module id = 14\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils/logger.js?");

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports) {

eval("module.exports = require('loglevel');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('loglevel')\"\n// module id = 16\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('loglevel')%22?");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_global__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io__ = __webpack_require__(8);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__states_factory__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_lobby_LobbyServer__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__states_ingame_IngameServer__ = __webpack_require__(5);\n\n\n\n\n\n\n\nvar io = __WEBPACK_IMPORTED_MODULE_2_socket_io___default()(__WEBPACK_IMPORTED_MODULE_0_global__[\"a\" /* SERVER_PORT */]);\n\nvar loop = function loop(step) {\n  return function () {\n    return setInterval(step, 1 / 60 * 1000);\n  };\n};\n\nvar statesFactories = {\n  lobby: __WEBPACK_IMPORTED_MODULE_4__states_lobby_LobbyServer__[\"a\" /* default */],\n  ingame: __WEBPACK_IMPORTED_MODULE_5__states_ingame_IngameServer__[\"a\" /* default */]\n};\n\nvar init = function init(f) {\n  // when a client is connected\n  io.on('connection', function (socket) {\n    f.sockets.push(socket);\n    f.state.connect(socket);\n    console.log('connected ' + socket.id);\n\n    // when a client is disconnected\n    socket.on('disconnect', function () {\n      __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.remove(f.sockets, function (s) {\n        return s.id === socket.id;\n      });\n      f.state.disconnect(socket);\n      console.log('disconnect ' + socket.id);\n    });\n  });\n};\n\n__WEBPACK_IMPORTED_MODULE_3__states_factory__[\"a\" /* default */].loopImplem = loop;\n__WEBPACK_IMPORTED_MODULE_3__states_factory__[\"a\" /* default */].statesFactories = statesFactories;\n__WEBPACK_IMPORTED_MODULE_3__states_factory__[\"a\" /* default */].broadcast = function (name, data) {\n  return io.emit(name, data);\n};\n__WEBPACK_IMPORTED_MODULE_3__states_factory__[\"a\" /* default */].run(init);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server.js\n// module id = 17\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }
/******/ ]);