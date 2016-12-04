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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return TABLES; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return DEFAULT_OPTIONS; });\nvar TABLES = {\n  PLAYERS: 'players'\n};\n\nvar DEFAULT_OPTIONS = {\n  DB: {\n    HOST: 'localhost',\n    PORT: 28015,\n    DATABASE: 'pongmmo'\n  }\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/db/constants.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/db/constants.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rethinkdb__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rethinkdb__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);\nvar _this = this;\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n\n\n\nvar DB_OPTIONS = {\n  host: process.env.DB_HOST || __WEBPACK_IMPORTED_MODULE_1__constants__[\"a\" /* DEFAULT_OPTIONS */].DB.HOST,\n  port: process.env.DB_PORT || __WEBPACK_IMPORTED_MODULE_1__constants__[\"a\" /* DEFAULT_OPTIONS */].DB.PORT,\n  database: process.env.DB_DATABASE || __WEBPACK_IMPORTED_MODULE_1__constants__[\"a\" /* DEFAULT_OPTIONS */].DB.DATABASE\n};\n\nconsole.log('\"options\":', JSON.stringify({ db: DB_OPTIONS }, null, 2));\n\nvar initiated = void 0;\nvar conn = void 0;\n\n/* harmony default export */ exports[\"a\"] = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {\n  return regeneratorRuntime.wrap(function _callee2$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          if (!initiated) {\n            initiated = new Promise(function () {\n              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve) {\n                var dbs, promises, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, table;\n\n                return regeneratorRuntime.wrap(function _callee$(_context) {\n                  while (1) {\n                    switch (_context.prev = _context.next) {\n                      case 0:\n                        _context.next = 2;\n                        return __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.connect(DB_OPTIONS);\n\n                      case 2:\n                        conn = _context.sent;\n                        _context.next = 5;\n                        return __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.dbList().run(conn);\n\n                      case 5:\n                        dbs = _context.sent;\n\n\n                        console.log('[DB] Creating and connection to database ' + DB_OPTIONS.database);\n\n                        if (!dbs.includes(DB_OPTIONS.database)) {\n                          _context.next = 10;\n                          break;\n                        }\n\n                        _context.next = 10;\n                        return __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.dbDrop(DB_OPTIONS.database).run(conn);\n\n                      case 10:\n                        _context.next = 12;\n                        return __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.dbCreate(DB_OPTIONS.database).run(conn);\n\n                      case 12:\n                        _context.next = 14;\n                        return conn.use(DB_OPTIONS.database);\n\n                      case 14:\n                        promises = [];\n\n                        console.log('[DB] Creating tables :');\n                        _iteratorNormalCompletion = true;\n                        _didIteratorError = false;\n                        _iteratorError = undefined;\n                        _context.prev = 19;\n                        for (_iterator = Object.values(__WEBPACK_IMPORTED_MODULE_1__constants__[\"b\" /* TABLES */])[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n                          table = _step.value;\n\n                          console.log('[DB] \\t- ' + table);\n                          promises.push(__WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.tableCreate(table).run(conn));\n                        }\n\n                        _context.next = 27;\n                        break;\n\n                      case 23:\n                        _context.prev = 23;\n                        _context.t0 = _context['catch'](19);\n                        _didIteratorError = true;\n                        _iteratorError = _context.t0;\n\n                      case 27:\n                        _context.prev = 27;\n                        _context.prev = 28;\n\n                        if (!_iteratorNormalCompletion && _iterator.return) {\n                          _iterator.return();\n                        }\n\n                      case 30:\n                        _context.prev = 30;\n\n                        if (!_didIteratorError) {\n                          _context.next = 33;\n                          break;\n                        }\n\n                        throw _iteratorError;\n\n                      case 33:\n                        return _context.finish(30);\n\n                      case 34:\n                        return _context.finish(27);\n\n                      case 35:\n                        _context.next = 37;\n                        return Promise.all(promises);\n\n                      case 37:\n                        resolve();\n\n                      case 38:\n                      case 'end':\n                        return _context.stop();\n                    }\n                  }\n                }, _callee, _this, [[19, 23, 27, 35], [28,, 30, 34]]);\n              }));\n\n              return function (_x) {\n                return _ref2.apply(this, arguments);\n              };\n            }());\n          }\n\n          _context2.next = 3;\n          return initiated;\n\n        case 3:\n          return _context2.abrupt('return', conn);\n\n        case 4:\n        case 'end':\n          return _context2.stop();\n      }\n    }\n  }, _callee2, _this);\n}));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/db/init.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/db/init.js?");

/***/ },
/* 2 */
/***/ function(module, exports) {

eval("module.exports = require('rethinkdb');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('rethinkdb')\"\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('rethinkdb')%22?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scene__ = __webpack_require__(8);\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_0__scene__[\"a\"]; });\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"b\", function() { return __WEBPACK_IMPORTED_MODULE_0__scene__[\"b\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/index.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/config/index.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__init__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(9);\n\n/* unused harmony reexport default */\n\n\n/* harmony reexport (binding) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_1__player__[\"a\"]; });\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/db/index.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/db/index.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(10);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socketio__ = __webpack_require__(11);\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"b\", function() { return __WEBPACK_IMPORTED_MODULE_0__player__[\"a\"]; });\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"c\", function() { return __WEBPACK_IMPORTED_MODULE_0__player__[\"b\"]; });\n/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, \"a\", function() { return __WEBPACK_IMPORTED_MODULE_1__socketio__[\"a\"]; });\n\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/events/index.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/events/index.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

eval("module.exports = require('babel-polyfill');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('babel-polyfill')\"\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('babel-polyfill')%22?");

/***/ },
/* 7 */
/***/ function(module, exports) {

eval("module.exports = require('socket.io');\n\n//////////////////\n// WEBPACK FOOTER\n// external \"require('socket.io')\"\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22require('socket.io')%22?");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return HEIGHT; });\nvar WIDTH = 800;\nvar HEIGHT = 600;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/config/scene.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/config/scene.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rethinkdb__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rethinkdb__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__init__ = __webpack_require__(1);\nvar _this = this;\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n\n\n\n\nvar table = __WEBPACK_IMPORTED_MODULE_0_rethinkdb___default.a.table(__WEBPACK_IMPORTED_MODULE_1__constants__[\"b\" /* TABLES */].PLAYERS);\n\n/* harmony default export */ exports[\"a\"] = {\n  getAll: function () {\n    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {\n      var cursor;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.t0 = table;\n              _context.next = 3;\n              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__init__[\"a\" /* default */])();\n\n            case 3:\n              _context.t1 = _context.sent;\n              _context.next = 6;\n              return _context.t0.run.call(_context.t0, _context.t1);\n\n            case 6:\n              cursor = _context.sent;\n              _context.next = 9;\n              return cursor.toArray();\n\n            case 9:\n              return _context.abrupt('return', _context.sent);\n\n            case 10:\n            case 'end':\n              return _context.stop();\n          }\n        }\n      }, _callee, _this);\n    }));\n\n    return function getAll() {\n      return _ref.apply(this, arguments);\n    };\n  }(),\n\n  update: function () {\n    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(player) {\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.t0 = table.update(player);\n              _context2.next = 3;\n              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__init__[\"a\" /* default */])();\n\n            case 3:\n              _context2.t1 = _context2.sent;\n              _context2.next = 6;\n              return _context2.t0.run.call(_context2.t0, _context2.t1);\n\n            case 6:\n              return _context2.abrupt('return', _context2.sent);\n\n            case 7:\n            case 'end':\n              return _context2.stop();\n          }\n        }\n      }, _callee2, _this);\n    }));\n\n    return function update(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }(),\n\n  onChange: function () {\n    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(cb) {\n      var cursor;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              _context3.t0 = table.changes();\n              _context3.next = 3;\n              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__init__[\"a\" /* default */])();\n\n            case 3:\n              _context3.t1 = _context3.sent;\n              _context3.next = 6;\n              return _context3.t0.run.call(_context3.t0, _context3.t1);\n\n            case 6:\n              cursor = _context3.sent;\n              _context3.next = 9;\n              return cursor.eachAsync(function (p) {\n                cb(p.new_val);\n              });\n\n            case 9:\n              return _context3.abrupt('return', _context3.sent);\n\n            case 10:\n            case 'end':\n              return _context3.stop();\n          }\n        }\n      }, _callee3, _this);\n    }));\n\n    return function onChange(_x2) {\n      return _ref3.apply(this, arguments);\n    };\n  }(),\n\n  insert: function () {\n    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(player) {\n      return regeneratorRuntime.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              _context4.t0 = table.insert(player);\n              _context4.next = 3;\n              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__init__[\"a\" /* default */])();\n\n            case 3:\n              _context4.t1 = _context4.sent;\n              _context4.next = 6;\n              return _context4.t0.run.call(_context4.t0, _context4.t1);\n\n            case 6:\n              return _context4.abrupt('return', _context4.sent);\n\n            case 7:\n            case 'end':\n              return _context4.stop();\n          }\n        }\n      }, _callee4, _this);\n    }));\n\n    return function insert(_x3) {\n      return _ref4.apply(this, arguments);\n    };\n  }()\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/db/player.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/db/player.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"b\", function() { return UPDATE_PLAYER; });\n/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return SET_PLAYERS; });\nvar UPDATE_PLAYER = 'UPDATE_PLAYER';\nvar SET_PLAYERS = 'SET_PLAYERS';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/events/player.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/events/player.js?");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return CONNECTION; });\nvar CONNECTION = 'connection';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/events/socketio.js\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/events/socketio.js?");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(3);\nvar _this = this;\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n\n\n\n\n\n\nvar io = __WEBPACK_IMPORTED_MODULE_1_socket_io___default()(9000);\nvar NAMES = ['Pierre', 'Charles', 'Yvonne', 'Jules', 'Maxime', 'Florent', 'Angéline', 'Julie'];\nvar rand = function rand(min, max) {\n  return Math.floor(Math.random() * max + min);\n};\n\nvar run = function run() {\n  io.on(__WEBPACK_IMPORTED_MODULE_3__events__[\"a\" /* CONNECTION */], function () {\n    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(socket) {\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              __WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* player */].insert({\n                name: NAMES[rand(0, NAMES.length - 1)],\n                x: rand(0, __WEBPACK_IMPORTED_MODULE_4__config__[\"a\" /* WIDTH */]),\n                y: rand(0, __WEBPACK_IMPORTED_MODULE_4__config__[\"b\" /* HEIGHT */])\n              });\n\n              // Connect events\n              _context.t0 = socket;\n              _context.t1 = __WEBPACK_IMPORTED_MODULE_3__events__[\"b\" /* SET_PLAYERS */];\n              _context.next = 5;\n              return __WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* player */].getAll();\n\n            case 5:\n              _context.t2 = _context.sent;\n\n              _context.t0.emit.call(_context.t0, _context.t1, _context.t2);\n\n              __WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* player */].onChange(function (p) {\n                return io.emit(__WEBPACK_IMPORTED_MODULE_3__events__[\"c\" /* UPDATE_PLAYER */], p);\n              });\n              socket.on(__WEBPACK_IMPORTED_MODULE_3__events__[\"c\" /* UPDATE_PLAYER */], __WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* player */].update); // Should be checked (for cheating player)\n\n            case 9:\n            case 'end':\n              return _context.stop();\n          }\n        }\n      }, _callee, _this);\n    }));\n\n    return function (_x) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n};\n\nrun();\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/server.js\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }
/******/ ]);