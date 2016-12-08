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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(29);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  window.console && (console.firebug || console.exception && console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    return exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (typeof process !== 'undefined' && 'env' in process) {
    return process.env.DEBUG;
  }
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(36);
var hasBinary = __webpack_require__(37);
var sliceBuffer = __webpack_require__(25);
var after = __webpack_require__(24);
var utf8 = __webpack_require__(52);

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(27);
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
  open: 0 // non-ws
  , close: 1 // non-ws
  , ping: 2,
  pong: 3,
  message: 4,
  upgrade: 5,
  noop: 6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(28);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if ('function' == typeof supportsBinary) {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if ('function' == typeof utf8encode) {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
  }

  return callback('' + encoded);
};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i + 1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function () {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function (packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function () {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data == 'string') {
    if (data.charAt(0) == 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data);
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function (msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary == 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function (message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function eachWithIndex(i, el, cb) {
    each(el, function (error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data != 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data == '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '',
      n,
      msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (':' != chr) {
      length += chr;
    } else {
      if ('' == length || length != (n = Number(length))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, true);

        if (err.type == packet.type && err.data == packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var ret = callback(packet, i + n, l);
        if (false === ret) return;
      }

      // advance cursor
      i += n;
      length = '';
    }
  }

  if (length != '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }
};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function (packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function (data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function (err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function (acc, p) {
      var len;
      if (typeof p === 'string') {
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function (p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) {
        // not true binary
        resultArray[bufferIndex++] = 0;
      } else {
        // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function (packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function (encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  var numberTooLong = false;
  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1;; i++) {
      if (tailArray[i] == 255) break;

      if (msgLength.length > 310) {
        numberTooLong = true;
        break;
      }

      msgLength += tailArray[i];
    }

    if (numberTooLong) return callback(err, 0, 1);

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function (buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ },
/* 4 */
/***/ function(module, exports) {


module.exports = function (a, b) {
  var fn = function fn() {};
  fn.prototype = b.prototype;
  a.prototype = new fn();
  a.prototype.constructor = a;
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(2);
var Emitter = __webpack_require__(3);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport(opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(39);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) {}
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ },
/* 8 */
/***/ function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function (qs) {
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(48)('socket.io-parser');
var json = __webpack_require__(40);
var Emitter = __webpack_require__(47);
var binary = __webpack_require__(46);
var isBuf = __webpack_require__(20);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function (obj, callback) {
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {
  var str = '';
  var nsp = false;

  // first is type
  str += obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
    str += obj.attachments;
    str += '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' != obj.nsp) {
    nsp = true;
    str += obj.nsp;
  }

  // immediately followed by the id
  if (null != obj.id) {
    if (nsp) {
      str += ',';
      nsp = false;
    }
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    if (nsp) str += ',';
    str += json.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function (obj) {
  var packet;
  if ('string' == typeof obj) {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
      // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else {
      // non-binary full packet
      this.emit('decoded', packet);
    }
  } else if (isBuf(obj) || obj.base64) {
    // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) {
        // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  } else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var p = {};
  var i = 0;

  // look up type
  p.type = Number(str.charAt(0));
  if (null == exports.types[p.type]) return error();

  // look up attachments if type binary
  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
    var buf = '';
    while (str.charAt(++i) != '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) != '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' == str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' == c) break;
      p.nsp += c;
      if (i == str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i == str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    p = tryParse(p, str.substr(i));
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(p, str) {
  try {
    p.data = json.parse(str);
  } catch (e) {
    return error();
  }
  return p;
};

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function () {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function (binData) {
  this.buffers.push(binData);
  if (this.buffers.length == this.reconPack.attachments) {
    // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function () {
  this.reconPack = null;
  this.buffers = [];
};

function error(data) {
  return {
    type: exports.ERROR,
    data: 'parser error'
  };
}

/***/ },
/* 10 */
/***/ function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 11 */
/***/ function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function (obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(6);
var XHR = __webpack_require__(34);
var JSONP = __webpack_require__(33);
var websocket = __webpack_require__(35);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(5);
var parseqs = __webpack_require__(8);
var parser = __webpack_require__(2);
var inherit = __webpack_require__(4);
var yeast = __webpack_require__(22);
var debug = __webpack_require__(1)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = __webpack_require__(6);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
}();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause() {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function callback(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close() {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function callbackfn() {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/***/ },
/* 14 */
/***/ function(module, exports) {


var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ },
/* 15 */
/***/ function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

/***/ },
/* 16 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var eio = __webpack_require__(30);
var Socket = __webpack_require__(19);
var Emitter = __webpack_require__(3);
var parser = __webpack_require__(9);
var on = __webpack_require__(18);
var bind = __webpack_require__(11);
var debug = __webpack_require__(1)('socket.io-client:manager');
var indexOf = __webpack_require__(14);
var Backoff = __webpack_require__(26);

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new parser.Encoder();
  this.decoder = new parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.engine.id;
    }
  }
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.engine.id;
    });

    if (this.autoConnect) {
      // manually call here since connecting evnet is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else {
    // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close = Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

/***/ },
/* 18 */
/***/ function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function destroy() {
      obj.removeListener(ev, fn);
    }
  };
}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(9);
var Emitter = __webpack_require__(3);
var toArray = __webpack_require__(51);
var on = __webpack_require__(18);
var bind = __webpack_require__(11);
var debug = __webpack_require__(1)('socket.io-client:socket');
var hasBin = __webpack_require__(38);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open = Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var parserType = parser.EVENT; // default
  if (hasBin(args)) {
    parserType = parser.BINARY_EVENT;
  } // binary
  var packet = { type: parserType, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      this.packet({ type: parser.CONNECT, query: this.query });
    } else {
      this.packet({ type: parser.CONNECT });
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  if (packet.nsp !== this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
    self.packet({
      type: type,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close = Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) {
  map[alphabet[i]] = i;
} //
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__physic__ = __webpack_require__(60);




var socket = __WEBPACK_IMPORTED_MODULE_0_socket_io_client___default()();

var players = {};
var currentPlayerId = void 0;

var physics = new __WEBPACK_IMPORTED_MODULE_2__physic__["a" /* PhysicEngine */]({
  render: 'main'
});

physics.init();

socket.on(__WEBPACK_IMPORTED_MODULE_1__events__["a" /* SET_PLAYERS */], function (data) {
  data.forEach(function (p) {
    currentPlayerId = p.id;
    if (!players[p.id]) {
      var player = {
        id: p.id,
        body: physics.createPlayer(p.id, p.x, p.y)
      };
      players[p.id] = player;
    }
  });
});

socket.on(__WEBPACK_IMPORTED_MODULE_1__events__["b" /* UPDATE_PLAYER */], function (data) {
  console.log(data);
  // scene.onSetPlayer(data.id, data.x, data.y)
});

document.addEventListener('keydown', function (event) {
  if (currentPlayerId) {
    var keyName = event.key;
    var player = players[currentPlayerId];
    if (keyName === 'ArrowLeft') {
      physics.move('left', player.id);
      // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
    } else if (keyName === 'ArrowRight') {
      physics.move('right', player.id);
      // socket.emit(UPDATE_PLAYER, { ...player, x: player.x, y: player.y })
    }
  }
}, false);

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = after;

function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop;
    proxy.count = count;

    return count === 0 ? callback() : proxy;

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times');
        }
        --proxy.count;

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true;
            callback(err);
            // future error callbacks will go to error handler
            callback = err_cb;
        } else if (proxy.count === 0 && !bail) {
            callback(null, result);
        }
    }
}

function noop() {}

/***/ },
/* 25 */
/***/ function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function (arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) {
    return arraybuffer.slice(start, end);
  }

  if (start < 0) {
    start += bytes;
  }
  if (end < 0) {
    end += bytes;
  }
  if (end > bytes) {
    end = bytes;
  }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

/***/ },
/* 26 */
/***/ function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function () {
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function (min) {
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function (max) {
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/***/ },
/* 27 */
/***/ function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function () {
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = "";

    for (i = 0; i < len; i += 3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64 += chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode = function (base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];

      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
  };
})();

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = function () {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && function () {
  try {
    var b = new Blob([new Uint8Array([1, 2])]);
    return b.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return options.type ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = function () {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug.debug = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(42);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {}
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting
    args = exports.formatArgs.apply(self, args);

    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(32);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(2);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var transports = __webpack_require__(12);
var Emitter = __webpack_require__(3);
var debug = __webpack_require__(1)('engine.io-client:socket');
var index = __webpack_require__(14);
var parser = __webpack_require__(2);
var parseuri = __webpack_require__(15);
var parsejson = __webpack_require__(43);
var parseqs = __webpack_require__(8);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure : global.location && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(5);
Socket.transports = __webpack_require__(12);
Socket.parser = __webpack_require__(2);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders,
    forceNode: this.forceNode,
    localAddress: this.localAddress
  });

  return transport;
};

function clone(obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose() {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade(to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup() {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || self.pingInterval + self.pingTimeout);
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(13);
var inherit = __webpack_require__(4);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty() {}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling(opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(6);
var Polling = __webpack_require__(13);
var Emitter = __webpack_require__(3);
var inherit = __webpack_require__(4);
var debug = __webpack_require__(1)('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty() {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname || port !== opts.port;
    this.xs = opts.secure !== isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(5);
var parser = __webpack_require__(2);
var parseqs = __webpack_require__(8);
var inherit = __webpack_require__(4);
var yeast = __webpack_require__(22);
var debug = __webpack_require__(1)('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(61);
  } catch (e) {}
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = void 0;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done() {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 36 */
/***/ function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys(obj) {
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Module requirements.
 */

var isArray = __webpack_require__(7);

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (_hasBinary(obj[i])) {
          return true;
        }
      }
    } else if (obj && 'object' == (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
      if (obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Module requirements.
 */

var isArray = __webpack_require__(7);

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
      return true;
    }

    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (_hasBinary(obj[i])) {
          return true;
        }
      }
    } else if (obj && 'object' == (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
      // see: https://github.com/Automattic/has-binary/pull/4
      if (obj.toJSON && 'function' == typeof obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 39 */
/***/ function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = "function" === "function" && __webpack_require__(10);

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[ false ? "undefined" : _typeof(exports)] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window === "undefined" ? "undefined" : _typeof(window)] && window || this,
      freeGlobal = freeExports && objectTypes[ false ? "undefined" : _typeof(module)] && module && !module.nodeType && (typeof global === "undefined" ? "undefined" : _typeof(global)) == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if ((typeof nativeJSON === "undefined" ? "undefined" : _typeof(nativeJSON)) == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        _isProperty,
        _forEach,
        undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value,
            serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify,
              stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function value() {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              stringify(new Number()) === "0" && stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              stringify(value) === "1" && stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
              // elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function getDay(year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(_isProperty = objectProto.hasOwnProperty)) {
        _isProperty = function isProperty(property) {
          var members = {},
              constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            _isProperty = function isProperty(property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__,
                  result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            _isProperty = function isProperty(property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return _isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      _forEach = function forEach(object, callback) {
        var size = 0,
            Properties,
            members,
            property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function Properties() {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (_isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          _forEach = function forEach(object, callback) {
            var isFunction = getClass.call(object) == functionClass,
                property,
                length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[_typeof(object.hasOwnProperty)] && object.hasOwnProperty || _isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {}
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          _forEach = function forEach(object, callback) {
            // Create a set of iterated properties.
            var members = {},
                isFunction = getClass.call(object) == functionClass,
                property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          _forEach = function forEach(object, callback) {
            var isFunction = getClass.call(object) == functionClass,
                property,
                isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || _isProperty.call(object, property = "constructor")) {
              callback(property);
            }
          };
        }
        return _forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function toPaddedString(width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function quote(value) {
          var result = '"',
              index = 0,
              length = value.length,
              useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8:case 9:case 10:case 12:case 13:case 34:case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !_isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {}
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {}
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              _forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter === "undefined" ? "undefined" : _typeof(filter)] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {}
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {}
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function abort() {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function lex() {
          var source = Source,
              length = source.length,
              value,
              begin,
              position,
              isSigned,
              charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9:case 10:case 13:case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123:case 125:case 91:case 93:case 58:case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {}
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function get(value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function update(source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function walk(source, property, callback) {
          var value = source[property],
              length;
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              _forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function noConflict() {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    });

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return JSON3;
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module), __webpack_require__(0)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/**
* matter-js 0.11.1 by @liabru 2016-11-09
* http://brm.io/matter-js/
* License MIT
*//**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Liam Brummitt
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(function(f){if(( false?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.Matter=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(_dereq_,module,exports){/**
* The `Matter.Body` module contains methods for creating and manipulating body models.
* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).

* @class Body
*/var Body={};module.exports=Body;var Vertices=_dereq_('../geometry/Vertices');var Vector=_dereq_('../geometry/Vector');var Sleeping=_dereq_('../core/Sleeping');var Render=_dereq_('../render/Render');var Common=_dereq_('../core/Common');var Bounds=_dereq_('../geometry/Bounds');var Axes=_dereq_('../geometry/Axes');(function(){Body._inertiaScale=4;Body._nextCollidingGroupId=1;Body._nextNonCollidingGroupId=-1;Body._nextCategory=0x0001;/**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * Vertices must be specified in clockwise order.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */Body.create=function(options){var defaults={id:Common.nextId(),type:'body',label:'Body',parts:[],angle:0,vertices:Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:false,isStatic:false,isSleeping:false,motion:0,sleepThreshold:60,density:0.001,restitution:0,friction:0.1,frictionStatic:0.5,frictionAir:0.01,collisionFilter:{category:0x0001,mask:0xFFFFFFFF,group:0},slop:0.05,timeScale:1,render:{visible:true,opacity:1,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0},lineWidth:1.5}};var body=Common.extend(defaults,options);_initProperties(body,options);return body;};/**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */Body.nextGroup=function(isNonColliding){if(isNonColliding)return Body._nextNonCollidingGroupId--;return Body._nextCollidingGroupId++;};/**
     * Returns the next unique category bitfield (starting after the initial default category `0x0001`).
     * There are 32 available. See `body.collisionFilter` for more information.
     * @method nextCategory
     * @return {Number} Unique category bitfield
     */Body.nextCategory=function(){Body._nextCategory=Body._nextCategory<<1;return Body._nextCategory;};/**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} [options]
     */var _initProperties=function _initProperties(body,options){options=options||{};// init required properties (order is important)
Body.set(body,{bounds:body.bounds||Bounds.create(body.vertices),positionPrev:body.positionPrev||Vector.clone(body.position),anglePrev:body.anglePrev||body.angle,vertices:body.vertices,parts:body.parts||[body],isStatic:body.isStatic,isSleeping:body.isSleeping,parent:body.parent||body});Vertices.rotate(body.vertices,body.angle,body.position);Axes.rotate(body.axes,body.angle);Bounds.update(body.bounds,body.vertices,body.velocity);// allow options to override the automatically calculated properties
Body.set(body,{axes:options.axes||body.axes,area:options.area||body.area,mass:options.mass||body.mass,inertia:options.inertia||body.inertia});// render properties
var defaultFillStyle=body.isStatic?'#eeeeee':Common.choose(['#556270','#4ECDC4','#C7F464','#FF6B6B','#C44D58']),defaultStrokeStyle=Common.shadeColor(defaultFillStyle,-20);body.render.fillStyle=body.render.fillStyle||defaultFillStyle;body.render.strokeStyle=body.render.strokeStyle||defaultStrokeStyle;body.render.sprite.xOffset+=-(body.bounds.min.x-body.position.x)/(body.bounds.max.x-body.bounds.min.x);body.render.sprite.yOffset+=-(body.bounds.min.y-body.position.y)/(body.bounds.max.y-body.bounds.min.y);};/**
     * Given a property and a value (or map of), sets the property(s) on the body, using the appropriate setter functions if they exist.
     * Prefer to use the actual setter functions in performance critical situations.
     * @method set
     * @param {body} body
     * @param {} settings A property name (or map of properties and values) to set on the body.
     * @param {} value The value to set if `settings` is a single property name.
     */Body.set=function(body,settings,value){var property;if(typeof settings==='string'){property=settings;settings={};settings[property]=value;}for(property in settings){value=settings[property];if(!settings.hasOwnProperty(property))continue;switch(property){case'isStatic':Body.setStatic(body,value);break;case'isSleeping':Sleeping.set(body,value);break;case'mass':Body.setMass(body,value);break;case'density':Body.setDensity(body,value);break;case'inertia':Body.setInertia(body,value);break;case'vertices':Body.setVertices(body,value);break;case'position':Body.setPosition(body,value);break;case'angle':Body.setAngle(body,value);break;case'velocity':Body.setVelocity(body,value);break;case'angularVelocity':Body.setAngularVelocity(body,value);break;case'parts':Body.setParts(body,value);break;default:body[property]=value;}}};/**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */Body.setStatic=function(body,isStatic){for(var i=0;i<body.parts.length;i++){var part=body.parts[i];part.isStatic=isStatic;if(isStatic){part.restitution=0;part.friction=1;part.mass=part.inertia=part.density=Infinity;part.inverseMass=part.inverseInertia=0;part.positionPrev.x=part.position.x;part.positionPrev.y=part.position.y;part.anglePrev=part.angle;part.angularVelocity=0;part.speed=0;part.angularSpeed=0;part.motion=0;}}};/**
     * Sets the mass of the body. Inverse mass and density are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */Body.setMass=function(body,mass){body.mass=mass;body.inverseMass=1/body.mass;body.density=body.mass/body.area;};/**
     * Sets the density of the body. Mass is automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */Body.setDensity=function(body,density){Body.setMass(body,density*body.area);body.density=density;};/**
     * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */Body.setInertia=function(body,inertia){body.inertia=inertia;body.inverseInertia=1/body.inertia;};/**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */Body.setVertices=function(body,vertices){// change vertices
if(vertices[0].body===body){body.vertices=vertices;}else{body.vertices=Vertices.create(vertices,body);}// update properties
body.axes=Axes.fromVertices(body.vertices);body.area=Vertices.area(body.vertices);Body.setMass(body,body.density*body.area);// orient vertices around the centre of mass at origin (0, 0)
var centre=Vertices.centre(body.vertices);Vertices.translate(body.vertices,centre,-1);// update inertia while vertices are at origin (0, 0)
Body.setInertia(body,Body._inertiaScale*Vertices.inertia(body.vertices,body.mass));// update geometry
Vertices.translate(body.vertices,body.position);Bounds.update(body.bounds,body.vertices,body.velocity);};/**
     * Sets the parts of the `body` and updates mass, inertia and centroid.
     * Each part will have its parent set to `body`.
     * By default the convex hull will be automatically computed and set on `body`, unless `autoHull` is set to `false.`
     * Note that this method will ensure that the first part in `body.parts` will always be the `body`.
     * @method setParts
     * @param {body} body
     * @param [body] parts
     * @param {bool} [autoHull=true]
     */Body.setParts=function(body,parts,autoHull){var i;// add all the parts, ensuring that the first part is always the parent body
parts=parts.slice(0);body.parts.length=0;body.parts.push(body);body.parent=body;for(i=0;i<parts.length;i++){var part=parts[i];if(part!==body){part.parent=body;body.parts.push(part);}}if(body.parts.length===1)return;autoHull=typeof autoHull!=='undefined'?autoHull:true;// find the convex hull of all parts to set on the parent body
if(autoHull){var vertices=[];for(i=0;i<parts.length;i++){vertices=vertices.concat(parts[i].vertices);}Vertices.clockwiseSort(vertices);var hull=Vertices.hull(vertices),hullCentre=Vertices.centre(hull);Body.setVertices(body,hull);Vertices.translate(body.vertices,hullCentre);}// sum the properties of all compound parts of the parent body
var total=_totalProperties(body);body.area=total.area;body.parent=body;body.position.x=total.centre.x;body.position.y=total.centre.y;body.positionPrev.x=total.centre.x;body.positionPrev.y=total.centre.y;Body.setMass(body,total.mass);Body.setInertia(body,total.inertia);Body.setPosition(body,total.centre);};/**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */Body.setPosition=function(body,position){var delta=Vector.sub(position,body.position);body.positionPrev.x+=delta.x;body.positionPrev.y+=delta.y;for(var i=0;i<body.parts.length;i++){var part=body.parts[i];part.position.x+=delta.x;part.position.y+=delta.y;Vertices.translate(part.vertices,delta);Bounds.update(part.bounds,part.vertices,body.velocity);}};/**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */Body.setAngle=function(body,angle){var delta=angle-body.angle;body.anglePrev+=delta;for(var i=0;i<body.parts.length;i++){var part=body.parts[i];part.angle+=delta;Vertices.rotate(part.vertices,delta,body.position);Axes.rotate(part.axes,delta);Bounds.update(part.bounds,part.vertices,body.velocity);if(i>0){Vector.rotateAbout(part.position,delta,body.position,part.position);}}};/**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */Body.setVelocity=function(body,velocity){body.positionPrev.x=body.position.x-velocity.x;body.positionPrev.y=body.position.y-velocity.y;body.velocity.x=velocity.x;body.velocity.y=velocity.y;body.speed=Vector.magnitude(body.velocity);};/**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */Body.setAngularVelocity=function(body,velocity){body.anglePrev=body.angle-velocity;body.angularVelocity=velocity;body.angularSpeed=Math.abs(body.angularVelocity);};/**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */Body.translate=function(body,translation){Body.setPosition(body,Vector.add(body.position,translation));};/**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     */Body.rotate=function(body,rotation){Body.setAngle(body,body.angle+rotation);};/**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */Body.scale=function(body,scaleX,scaleY,point){for(var i=0;i<body.parts.length;i++){var part=body.parts[i];// scale vertices
Vertices.scale(part.vertices,scaleX,scaleY,body.position);// update properties
part.axes=Axes.fromVertices(part.vertices);if(!body.isStatic){part.area=Vertices.area(part.vertices);Body.setMass(part,body.density*part.area);// update inertia (requires vertices to be at origin)
Vertices.translate(part.vertices,{x:-part.position.x,y:-part.position.y});Body.setInertia(part,Vertices.inertia(part.vertices,part.mass));Vertices.translate(part.vertices,{x:part.position.x,y:part.position.y});}// update bounds
Bounds.update(part.bounds,part.vertices,body.velocity);}// handle circles
if(body.circleRadius){if(scaleX===scaleY){body.circleRadius*=scaleX;}else{// body is no longer a circle
body.circleRadius=null;}}if(!body.isStatic){var total=_totalProperties(body);body.area=total.area;Body.setMass(body,total.mass);Body.setInertia(body,total.inertia);}};/**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */Body.update=function(body,deltaTime,timeScale,correction){var deltaTimeSquared=Math.pow(deltaTime*timeScale*body.timeScale,2);// from the previous step
var frictionAir=1-body.frictionAir*timeScale*body.timeScale,velocityPrevX=body.position.x-body.positionPrev.x,velocityPrevY=body.position.y-body.positionPrev.y;// update velocity with Verlet integration
body.velocity.x=velocityPrevX*frictionAir*correction+body.force.x/body.mass*deltaTimeSquared;body.velocity.y=velocityPrevY*frictionAir*correction+body.force.y/body.mass*deltaTimeSquared;body.positionPrev.x=body.position.x;body.positionPrev.y=body.position.y;body.position.x+=body.velocity.x;body.position.y+=body.velocity.y;// update angular velocity with Verlet integration
body.angularVelocity=(body.angle-body.anglePrev)*frictionAir*correction+body.torque/body.inertia*deltaTimeSquared;body.anglePrev=body.angle;body.angle+=body.angularVelocity;// track speed and acceleration
body.speed=Vector.magnitude(body.velocity);body.angularSpeed=Math.abs(body.angularVelocity);// transform the body geometry
for(var i=0;i<body.parts.length;i++){var part=body.parts[i];Vertices.translate(part.vertices,body.velocity);if(i>0){part.position.x+=body.velocity.x;part.position.y+=body.velocity.y;}if(body.angularVelocity!==0){Vertices.rotate(part.vertices,body.angularVelocity,body.position);Axes.rotate(part.axes,body.angularVelocity);if(i>0){Vector.rotateAbout(part.position,body.angularVelocity,body.position,part.position);}}Bounds.update(part.bounds,part.vertices,body.velocity);}};/**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */Body.applyForce=function(body,position,force){body.force.x+=force.x;body.force.y+=force.y;var offset={x:position.x-body.position.x,y:position.y-body.position.y};body.torque+=offset.x*force.y-offset.y*force.x;};/**
     * Returns the sums of the properties of all compound parts of the parent body.
     * @method _totalProperties
     * @private
     * @param {body} body
     * @return {}
     */var _totalProperties=function _totalProperties(body){// https://ecourses.ou.edu/cgi-bin/ebook.cgi?doc=&topic=st&chap_sec=07.2&page=theory
// http://output.to/sideway/default.asp?qno=121100087
var properties={mass:0,area:0,inertia:0,centre:{x:0,y:0}};// sum the properties of all compound parts of the parent body
for(var i=body.parts.length===1?0:1;i<body.parts.length;i++){var part=body.parts[i];properties.mass+=part.mass;properties.area+=part.area;properties.inertia+=part.inertia;properties.centre=Vector.add(properties.centre,Vector.mult(part.position,part.mass!==Infinity?part.mass:1));}properties.centre=Vector.div(properties.centre,properties.mass!==Infinity?properties.mass:body.parts.length);return properties;};/*
    *
    *  Events Documentation
    *
    *//**
    * Fired when a body starts sleeping (where `this` is the body).
    *
    * @event sleepStart
    * @this {body} The body that has started sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when a body ends sleeping (where `this` is the body).
    *
    * @event sleepEnd
    * @this {body} The body that has ended sleeping
    * @param {} event An event object
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     *//**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     * @readOnly
     *//**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     *//**
     * An array of bodies that make up this body. 
     * The first body in the array must always be a self reference to the current body instance.
     * All bodies in the `parts` array together form a single rigid compound body.
     * Parts are allowed to overlap, have gaps or holes or even form concave bodies.
     * Parts themselves should never be added to a `World`, only the parent body should be.
     * Use `Body.setParts` when setting parts to ensure correct updates of all properties.
     *
     * @property parts
     * @type body[]
     *//**
     * A self reference if the body is _not_ a part of another body.
     * Otherwise this is a reference to the body that this is a part of.
     * See `body.parts`.
     *
     * @property parent
     * @type body
     *//**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     *//**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the vertices are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     *//**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     *//**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     *//**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     *//**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * @readOnly
     * @property speed
     * @type number
     * @default 0
     *//**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * @readOnly
     * @property angularSpeed
     * @type number
     * @default 0
     *//**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     *//**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * @readOnly
     * @property angularVelocity
     * @type number
     * @default 0
     *//**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     *//**
     * A flag that indicates whether a body is a sensor. Sensor triggers collision events, but doesn't react with colliding body physically.
     *
     * @property isSensor
     * @type boolean
     * @default false
     *//**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     *//**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * @readOnly
     * @property motion
     * @type number
     * @default 0
     *//**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     *//**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     *//**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     *//**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     *//**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     *//**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     *//**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     *//**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     *//**
     * A `Number` that defines the static friction of the body (in the Coulomb friction model). 
     * A value of `0` means the body will never 'stick' when it is nearly stationary and only dynamic `friction` is used.
     * The higher the value (e.g. `10`), the more force it will take to initially get the body moving when nearly stationary.
     * This value is multiplied with the `friction` property to make it easier to change `friction` and maintain an appropriate amount of static friction.
     *
     * @property frictionStatic
     * @type number
     * @default 0.5
     *//**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     *//**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     *//**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     *//**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     *//**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     *//**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     *//**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     *//**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     *//**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     *//**
     * Sets the opacity to use when rendering.
     *
     * @property render.opacity
     * @type number
     * @default 1
    *//**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     *//**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     *//**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     *//**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     *//**
      * A `Number` that defines the offset in the x-axis for the sprite (normalised by texture width).
      *
      * @property render.sprite.xOffset
      * @type number
      * @default 0
      *//**
      * A `Number` that defines the offset in the y-axis for the sprite (normalised by texture height).
      *
      * @property render.sprite.yOffset
      * @type number
      * @default 0
      *//**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 1.5
     *//**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     *//**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     *//**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     *//**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     *//**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */})();},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31}],2:[function(_dereq_,module,exports){/**
* The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
* A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
* It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
* Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composite
*/var Composite={};module.exports=Composite;var Events=_dereq_('../core/Events');var Common=_dereq_('../core/Common');var Body=_dereq_('./Body');(function(){/**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */Composite.create=function(options){return Common.extend({id:Common.nextId(),type:'composite',parent:null,isModified:false,bodies:[],constraints:[],composites:[],label:'Composite'},options);};/**
     * Sets the composite's `isModified` flag. 
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */Composite.setModified=function(composite,isModified,updateParents,updateChildren){composite.isModified=isModified;if(updateParents&&composite.parent){Composite.setModified(composite.parent,isModified,updateParents,updateChildren);}if(updateChildren){for(var i=0;i<composite.composites.length;i++){var childComposite=composite.composites[i];Composite.setModified(childComposite,isModified,updateParents,updateChildren);}}};/**
     * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {} object
     * @return {composite} The original composite with the objects added
     */Composite.add=function(composite,object){var objects=[].concat(object);Events.trigger(composite,'beforeAdd',{object:object});for(var i=0;i<objects.length;i++){var obj=objects[i];switch(obj.type){case'body':// skip adding compound parts
if(obj.parent!==obj){Common.warn('Composite.add: skipped adding a compound body part (you must add its parent instead)');break;}Composite.addBody(composite,obj);break;case'constraint':Composite.addConstraint(composite,obj);break;case'composite':Composite.addComposite(composite,obj);break;case'mouseConstraint':Composite.addConstraint(composite,obj.constraint);break;}}Events.trigger(composite,'afterAdd',{object:object});return composite;};/**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */Composite.remove=function(composite,object,deep){var objects=[].concat(object);Events.trigger(composite,'beforeRemove',{object:object});for(var i=0;i<objects.length;i++){var obj=objects[i];switch(obj.type){case'body':Composite.removeBody(composite,obj,deep);break;case'constraint':Composite.removeConstraint(composite,obj,deep);break;case'composite':Composite.removeComposite(composite,obj,deep);break;case'mouseConstraint':Composite.removeConstraint(composite,obj.constraint);break;}}Events.trigger(composite,'afterRemove',{object:object});return composite;};/**
     * Adds a composite to the given composite.
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */Composite.addComposite=function(compositeA,compositeB){compositeA.composites.push(compositeB);compositeB.parent=compositeA;Composite.setModified(compositeA,true,true,false);return compositeA;};/**
     * Removes a composite from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */Composite.removeComposite=function(compositeA,compositeB,deep){var position=Common.indexOf(compositeA.composites,compositeB);if(position!==-1){Composite.removeCompositeAt(compositeA,position);Composite.setModified(compositeA,true,true,false);}if(deep){for(var i=0;i<compositeA.composites.length;i++){Composite.removeComposite(compositeA.composites[i],compositeB,true);}}return compositeA;};/**
     * Removes a composite from the given composite.
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */Composite.removeCompositeAt=function(composite,position){composite.composites.splice(position,1);Composite.setModified(composite,true,true,false);return composite;};/**
     * Adds a body to the given composite.
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */Composite.addBody=function(composite,body){composite.bodies.push(body);Composite.setModified(composite,true,true,false);return composite;};/**
     * Removes a body from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */Composite.removeBody=function(composite,body,deep){var position=Common.indexOf(composite.bodies,body);if(position!==-1){Composite.removeBodyAt(composite,position);Composite.setModified(composite,true,true,false);}if(deep){for(var i=0;i<composite.composites.length;i++){Composite.removeBody(composite.composites[i],body,true);}}return composite;};/**
     * Removes a body from the given composite.
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */Composite.removeBodyAt=function(composite,position){composite.bodies.splice(position,1);Composite.setModified(composite,true,true,false);return composite;};/**
     * Adds a constraint to the given composite.
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */Composite.addConstraint=function(composite,constraint){composite.constraints.push(constraint);Composite.setModified(composite,true,true,false);return composite;};/**
     * Removes a constraint from the given composite, and optionally searching its children recursively.
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */Composite.removeConstraint=function(composite,constraint,deep){var position=Common.indexOf(composite.constraints,constraint);if(position!==-1){Composite.removeConstraintAt(composite,position);}if(deep){for(var i=0;i<composite.composites.length;i++){Composite.removeConstraint(composite.composites[i],constraint,true);}}return composite;};/**
     * Removes a body from the given composite.
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */Composite.removeConstraintAt=function(composite,position){composite.constraints.splice(position,1);Composite.setModified(composite,true,true,false);return composite;};/**
     * Removes all bodies, constraints and composites from the given composite.
     * Optionally clearing its children recursively.
     * @method clear
     * @param {composite} composite
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */Composite.clear=function(composite,keepStatic,deep){if(deep){for(var i=0;i<composite.composites.length;i++){Composite.clear(composite.composites[i],keepStatic,true);}}if(keepStatic){composite.bodies=composite.bodies.filter(function(body){return body.isStatic;});}else{composite.bodies.length=0;}composite.constraints.length=0;composite.composites.length=0;Composite.setModified(composite,true,true,false);return composite;};/**
     * Returns all bodies in the given composite, including all bodies in its children, recursively.
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */Composite.allBodies=function(composite){var bodies=[].concat(composite.bodies);for(var i=0;i<composite.composites.length;i++){bodies=bodies.concat(Composite.allBodies(composite.composites[i]));}return bodies;};/**
     * Returns all constraints in the given composite, including all constraints in its children, recursively.
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */Composite.allConstraints=function(composite){var constraints=[].concat(composite.constraints);for(var i=0;i<composite.composites.length;i++){constraints=constraints.concat(Composite.allConstraints(composite.composites[i]));}return constraints;};/**
     * Returns all composites in the given composite, including all composites in its children, recursively.
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */Composite.allComposites=function(composite){var composites=[].concat(composite.composites);for(var i=0;i<composite.composites.length;i++){composites=composites.concat(Composite.allComposites(composite.composites[i]));}return composites;};/**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found.
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */Composite.get=function(composite,id,type){var objects,object;switch(type){case'body':objects=Composite.allBodies(composite);break;case'constraint':objects=Composite.allConstraints(composite);break;case'composite':objects=Composite.allComposites(composite).concat(composite);break;}if(!objects)return null;object=objects.filter(function(object){return object.id.toString()===id.toString();});return object.length===0?null:object[0];};/**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add).
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */Composite.move=function(compositeA,objects,compositeB){Composite.remove(compositeA,objects);Composite.add(compositeB,objects);return compositeA;};/**
     * Assigns new ids for all objects in the composite, recursively.
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */Composite.rebase=function(composite){var objects=Composite.allBodies(composite).concat(Composite.allConstraints(composite)).concat(Composite.allComposites(composite));for(var i=0;i<objects.length;i++){objects[i].id=Common.nextId();}Composite.setModified(composite,true,true,false);return composite;};/**
     * Translates all children in the composite by a given vector relative to their current positions, 
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */Composite.translate=function(composite,translation,recursive){var bodies=recursive?Composite.allBodies(composite):composite.bodies;for(var i=0;i<bodies.length;i++){Body.translate(bodies[i],translation);}Composite.setModified(composite,true,true,false);return composite;};/**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */Composite.rotate=function(composite,rotation,point,recursive){var cos=Math.cos(rotation),sin=Math.sin(rotation),bodies=recursive?Composite.allBodies(composite):composite.bodies;for(var i=0;i<bodies.length;i++){var body=bodies[i],dx=body.position.x-point.x,dy=body.position.y-point.y;Body.setPosition(body,{x:point.x+(dx*cos-dy*sin),y:point.y+(dx*sin+dy*cos)});Body.rotate(body,rotation);}Composite.setModified(composite,true,true,false);return composite;};/**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */Composite.scale=function(composite,scaleX,scaleY,point,recursive){var bodies=recursive?Composite.allBodies(composite):composite.bodies;for(var i=0;i<bodies.length;i++){var body=bodies[i],dx=body.position.x-point.x,dy=body.position.y-point.y;Body.setPosition(body,{x:point.x+dx*scaleX,y:point.y+dy*scaleY});Body.scale(body,scaleX,scaleY);}Composite.setModified(composite,true,true,false);return composite;};/*
    *
    *  Events Documentation
    *
    *//**
    * Fired when a call to `Composite.add` is made, before objects have been added.
    *
    * @event beforeAdd
    * @param {} event An event object
    * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when a call to `Composite.add` is made, after objects have been added.
    *
    * @event afterAdd
    * @param {} event An event object
    * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when a call to `Composite.remove` is made, before objects have been removed.
    *
    * @event beforeRemove
    * @param {} event An event object
    * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when a call to `Composite.remove` is made, after objects have been removed.
    *
    * @event afterRemove
    * @param {} event An event object
    * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     *//**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "composite"
     * @readOnly
     *//**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     *//**
     * A flag that specifies whether the composite has been modified during the current step.
     * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
     * If you need to change it manually, you should use the `Composite.setModified` method.
     *
     * @property isModified
     * @type boolean
     * @default false
     *//**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     *//**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     *//**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     *//**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */})();},{"../core/Common":14,"../core/Events":16,"./Body":1}],3:[function(_dereq_,module,exports){/**
* The `Matter.World` module contains methods for creating and manipulating the world composite.
* A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
* A `Matter.World` has a few additional properties including `gravity` and `bounds`.
* It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
* There are also a few methods here that alias those in `Matter.Composite` for easier readability.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class World
* @extends Composite
*/var World={};module.exports=World;var Composite=_dereq_('./Composite');var Constraint=_dereq_('../constraint/Constraint');var Common=_dereq_('../core/Common');(function(){/**
     * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @constructor
     * @param {} options
     * @return {world} A new world
     */World.create=function(options){var composite=Composite.create();var defaults={label:'World',gravity:{x:0,y:1,scale:0.001},bounds:{min:{x:-Infinity,y:-Infinity},max:{x:Infinity,y:Infinity}}};return Common.extend(composite,defaults,options);};/*
    *
    *  Properties Documentation
    *
    *//**
     * The gravity to apply on the world.
     *
     * @property gravity
     * @type object
     *//**
     * The gravity x component.
     *
     * @property gravity.x
     * @type object
     * @default 0
     *//**
     * The gravity y component.
     *
     * @property gravity.y
     * @type object
     * @default 1
     *//**
     * The gravity scale factor.
     *
     * @property gravity.scale
     * @type object
     * @default 0.001
     *//**
     * A `Bounds` object that defines the world bounds for collision detection.
     *
     * @property bounds
     * @type bounds
     * @default { min: { x: -Infinity, y: -Infinity }, max: { x: Infinity, y: Infinity } }
     */// World is a Composite body
// see src/module/Outro.js for these aliases:
/**
     * An alias for Composite.clear
     * @method clear
     * @param {world} world
     * @param {boolean} keepStatic
     *//**
     * An alias for Composite.add
     * @method addComposite
     * @param {world} world
     * @param {composite} composite
     * @return {world} The original world with the objects from composite added
     *//**
      * An alias for Composite.addBody
      * @method addBody
      * @param {world} world
      * @param {body} body
      * @return {world} The original world with the body added
      *//**
      * An alias for Composite.addConstraint
      * @method addConstraint
      * @param {world} world
      * @param {constraint} constraint
      * @return {world} The original world with the constraint added
      */})();},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(_dereq_,module,exports){/**
* The `Matter.Contact` module contains methods for creating and manipulating collision contacts.
*
* @class Contact
*/var Contact={};module.exports=Contact;(function(){/**
     * Creates a new contact.
     * @method create
     * @param {vertex} vertex
     * @return {contact} A new contact
     */Contact.create=function(vertex){return{id:Contact.id(vertex),vertex:vertex,normalImpulse:0,tangentImpulse:0};};/**
     * Generates a contact id.
     * @method id
     * @param {vertex} vertex
     * @return {string} Unique contactID
     */Contact.id=function(vertex){return vertex.body.id+'_'+vertex.index;};})();},{}],5:[function(_dereq_,module,exports){/**
* The `Matter.Detector` module contains methods for detecting collisions given a set of pairs.
*
* @class Detector
*/// TODO: speculative contacts
var Detector={};module.exports=Detector;var SAT=_dereq_('./SAT');var Pair=_dereq_('./Pair');var Bounds=_dereq_('../geometry/Bounds');(function(){/**
     * Finds all collisions given a list of pairs.
     * @method collisions
     * @param {pair[]} broadphasePairs
     * @param {engine} engine
     * @return {array} collisions
     */Detector.collisions=function(broadphasePairs,engine){var collisions=[],pairsTable=engine.pairs.table;for(var i=0;i<broadphasePairs.length;i++){var bodyA=broadphasePairs[i][0],bodyB=broadphasePairs[i][1];if((bodyA.isStatic||bodyA.isSleeping)&&(bodyB.isStatic||bodyB.isSleeping))continue;if(!Detector.canCollide(bodyA.collisionFilter,bodyB.collisionFilter))continue;// mid phase
if(Bounds.overlaps(bodyA.bounds,bodyB.bounds)){for(var j=bodyA.parts.length>1?1:0;j<bodyA.parts.length;j++){var partA=bodyA.parts[j];for(var k=bodyB.parts.length>1?1:0;k<bodyB.parts.length;k++){var partB=bodyB.parts[k];if(partA===bodyA&&partB===bodyB||Bounds.overlaps(partA.bounds,partB.bounds)){// find a previous collision we could reuse
var pairId=Pair.id(partA,partB),pair=pairsTable[pairId],previousCollision;if(pair&&pair.isActive){previousCollision=pair.collision;}else{previousCollision=null;}// narrow phase
var collision=SAT.collides(partA,partB,previousCollision);if(collision.collided){collisions.push(collision);}}}}}}return collisions;};/**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */Detector.canCollide=function(filterA,filterB){if(filterA.group===filterB.group&&filterA.group!==0)return filterA.group>0;return(filterA.mask&filterB.category)!==0&&(filterB.mask&filterA.category)!==0;};})();},{"../geometry/Bounds":26,"./Pair":7,"./SAT":11}],6:[function(_dereq_,module,exports){/**
* The `Matter.Grid` module contains methods for creating and manipulating collision broadphase grid structures.
*
* @class Grid
*/var Grid={};module.exports=Grid;var Pair=_dereq_('./Pair');var Detector=_dereq_('./Detector');var Common=_dereq_('../core/Common');(function(){/**
     * Creates a new grid.
     * @method create
     * @param {} options
     * @return {grid} A new grid
     */Grid.create=function(options){var defaults={controller:Grid,detector:Detector.collisions,buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return Common.extend(defaults,options);};/**
     * The width of a single grid bucket.
     *
     * @property bucketWidth
     * @type number
     * @default 48
     *//**
     * The height of a single grid bucket.
     *
     * @property bucketHeight
     * @type number
     * @default 48
     *//**
     * Updates the grid.
     * @method update
     * @param {grid} grid
     * @param {body[]} bodies
     * @param {engine} engine
     * @param {boolean} forceUpdate
     */Grid.update=function(grid,bodies,engine,forceUpdate){var i,col,row,world=engine.world,buckets=grid.buckets,bucket,bucketId,gridChanged=false;for(i=0;i<bodies.length;i++){var body=bodies[i];if(body.isSleeping&&!forceUpdate)continue;// don't update out of world bodies
if(body.bounds.max.x<world.bounds.min.x||body.bounds.min.x>world.bounds.max.x||body.bounds.max.y<world.bounds.min.y||body.bounds.min.y>world.bounds.max.y)continue;var newRegion=_getRegion(grid,body);// if the body has changed grid region
if(!body.region||newRegion.id!==body.region.id||forceUpdate){if(!body.region||forceUpdate)body.region=newRegion;var union=_regionUnion(newRegion,body.region);// update grid buckets affected by region change
// iterate over the union of both regions
for(col=union.startCol;col<=union.endCol;col++){for(row=union.startRow;row<=union.endRow;row++){bucketId=_getBucketId(col,row);bucket=buckets[bucketId];var isInsideNewRegion=col>=newRegion.startCol&&col<=newRegion.endCol&&row>=newRegion.startRow&&row<=newRegion.endRow;var isInsideOldRegion=col>=body.region.startCol&&col<=body.region.endCol&&row>=body.region.startRow&&row<=body.region.endRow;// remove from old region buckets
if(!isInsideNewRegion&&isInsideOldRegion){if(isInsideOldRegion){if(bucket)_bucketRemoveBody(grid,bucket,body);}}// add to new region buckets
if(body.region===newRegion||isInsideNewRegion&&!isInsideOldRegion||forceUpdate){if(!bucket)bucket=_createBucket(buckets,bucketId);_bucketAddBody(grid,bucket,body);}}}// set the new region
body.region=newRegion;// flag changes so we can update pairs
gridChanged=true;}}// update pairs list only if pairs changed (i.e. a body changed region)
if(gridChanged)grid.pairsList=_createActivePairsList(grid);};/**
     * Clears the grid.
     * @method clear
     * @param {grid} grid
     */Grid.clear=function(grid){grid.buckets={};grid.pairs={};grid.pairsList=[];};/**
     * Finds the union of two regions.
     * @method _regionUnion
     * @private
     * @param {} regionA
     * @param {} regionB
     * @return {} region
     */var _regionUnion=function _regionUnion(regionA,regionB){var startCol=Math.min(regionA.startCol,regionB.startCol),endCol=Math.max(regionA.endCol,regionB.endCol),startRow=Math.min(regionA.startRow,regionB.startRow),endRow=Math.max(regionA.endRow,regionB.endRow);return _createRegion(startCol,endCol,startRow,endRow);};/**
     * Gets the region a given body falls in for a given grid.
     * @method _getRegion
     * @private
     * @param {} grid
     * @param {} body
     * @return {} region
     */var _getRegion=function _getRegion(grid,body){var bounds=body.bounds,startCol=Math.floor(bounds.min.x/grid.bucketWidth),endCol=Math.floor(bounds.max.x/grid.bucketWidth),startRow=Math.floor(bounds.min.y/grid.bucketHeight),endRow=Math.floor(bounds.max.y/grid.bucketHeight);return _createRegion(startCol,endCol,startRow,endRow);};/**
     * Creates a region.
     * @method _createRegion
     * @private
     * @param {} startCol
     * @param {} endCol
     * @param {} startRow
     * @param {} endRow
     * @return {} region
     */var _createRegion=function _createRegion(startCol,endCol,startRow,endRow){return{id:startCol+','+endCol+','+startRow+','+endRow,startCol:startCol,endCol:endCol,startRow:startRow,endRow:endRow};};/**
     * Gets the bucket id at the given position.
     * @method _getBucketId
     * @private
     * @param {} column
     * @param {} row
     * @return {string} bucket id
     */var _getBucketId=function _getBucketId(column,row){return column+','+row;};/**
     * Creates a bucket.
     * @method _createBucket
     * @private
     * @param {} buckets
     * @param {} bucketId
     * @return {} bucket
     */var _createBucket=function _createBucket(buckets,bucketId){var bucket=buckets[bucketId]=[];return bucket;};/**
     * Adds a body to a bucket.
     * @method _bucketAddBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */var _bucketAddBody=function _bucketAddBody(grid,bucket,body){// add new pairs
for(var i=0;i<bucket.length;i++){var bodyB=bucket[i];if(body.id===bodyB.id||body.isStatic&&bodyB.isStatic)continue;// keep track of the number of buckets the pair exists in
// important for Grid.update to work
var pairId=Pair.id(body,bodyB),pair=grid.pairs[pairId];if(pair){pair[2]+=1;}else{grid.pairs[pairId]=[body,bodyB,1];}}// add to bodies (after pairs, otherwise pairs with self)
bucket.push(body);};/**
     * Removes a body from a bucket.
     * @method _bucketRemoveBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */var _bucketRemoveBody=function _bucketRemoveBody(grid,bucket,body){// remove from bucket
bucket.splice(Common.indexOf(bucket,body),1);// update pair counts
for(var i=0;i<bucket.length;i++){// keep track of the number of buckets the pair exists in
// important for _createActivePairsList to work
var bodyB=bucket[i],pairId=Pair.id(body,bodyB),pair=grid.pairs[pairId];if(pair)pair[2]-=1;}};/**
     * Generates a list of the active pairs in the grid.
     * @method _createActivePairsList
     * @private
     * @param {} grid
     * @return [] pairs
     */var _createActivePairsList=function _createActivePairsList(grid){var pairKeys,pair,pairs=[];// grid.pairs is used as a hashmap
pairKeys=Common.keys(grid.pairs);// iterate over grid.pairs
for(var k=0;k<pairKeys.length;k++){pair=grid.pairs[pairKeys[k]];// if pair exists in at least one bucket
// it is a pair that needs further collision testing so push it
if(pair[2]>0){pairs.push(pair);}else{delete grid.pairs[pairKeys[k]];}}return pairs;};})();},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(_dereq_,module,exports){/**
* The `Matter.Pair` module contains methods for creating and manipulating collision pairs.
*
* @class Pair
*/var Pair={};module.exports=Pair;var Contact=_dereq_('./Contact');(function(){/**
     * Creates a pair.
     * @method create
     * @param {collision} collision
     * @param {number} timestamp
     * @return {pair} A new pair
     */Pair.create=function(collision,timestamp){var bodyA=collision.bodyA,bodyB=collision.bodyB,parentA=collision.parentA,parentB=collision.parentB;var pair={id:Pair.id(bodyA,bodyB),bodyA:bodyA,bodyB:bodyB,contacts:{},activeContacts:[],separation:0,isActive:true,isSensor:bodyA.isSensor||bodyB.isSensor,timeCreated:timestamp,timeUpdated:timestamp,inverseMass:parentA.inverseMass+parentB.inverseMass,friction:Math.min(parentA.friction,parentB.friction),frictionStatic:Math.max(parentA.frictionStatic,parentB.frictionStatic),restitution:Math.max(parentA.restitution,parentB.restitution),slop:Math.max(parentA.slop,parentB.slop)};Pair.update(pair,collision,timestamp);return pair;};/**
     * Updates a pair given a collision.
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     * @param {number} timestamp
     */Pair.update=function(pair,collision,timestamp){var contacts=pair.contacts,supports=collision.supports,activeContacts=pair.activeContacts,parentA=collision.parentA,parentB=collision.parentB;pair.collision=collision;pair.inverseMass=parentA.inverseMass+parentB.inverseMass;pair.friction=Math.min(parentA.friction,parentB.friction);pair.frictionStatic=Math.max(parentA.frictionStatic,parentB.frictionStatic);pair.restitution=Math.max(parentA.restitution,parentB.restitution);pair.slop=Math.max(parentA.slop,parentB.slop);activeContacts.length=0;if(collision.collided){for(var i=0;i<supports.length;i++){var support=supports[i],contactId=Contact.id(support),contact=contacts[contactId];if(contact){activeContacts.push(contact);}else{activeContacts.push(contacts[contactId]=Contact.create(support));}}pair.separation=collision.depth;Pair.setActive(pair,true,timestamp);}else{if(pair.isActive===true)Pair.setActive(pair,false,timestamp);}};/**
     * Set a pair as active or inactive.
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     * @param {number} timestamp
     */Pair.setActive=function(pair,isActive,timestamp){if(isActive){pair.isActive=true;pair.timeUpdated=timestamp;}else{pair.isActive=false;pair.activeContacts.length=0;}};/**
     * Get the id for the given pair.
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {string} Unique pairId
     */Pair.id=function(bodyA,bodyB){if(bodyA.id<bodyB.id){return bodyA.id+'_'+bodyB.id;}else{return bodyB.id+'_'+bodyA.id;}};})();},{"./Contact":4}],8:[function(_dereq_,module,exports){/**
* The `Matter.Pairs` module contains methods for creating and manipulating collision pair sets.
*
* @class Pairs
*/var Pairs={};module.exports=Pairs;var Pair=_dereq_('./Pair');var Common=_dereq_('../core/Common');(function(){var _pairMaxIdleLife=1000;/**
     * Creates a new pairs structure.
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */Pairs.create=function(options){return Common.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},options);};/**
     * Updates pairs given a list of collisions.
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     * @param {number} timestamp
     */Pairs.update=function(pairs,collisions,timestamp){var pairsList=pairs.list,pairsTable=pairs.table,collisionStart=pairs.collisionStart,collisionEnd=pairs.collisionEnd,collisionActive=pairs.collisionActive,activePairIds=[],collision,pairId,pair,i;// clear collision state arrays, but maintain old reference
collisionStart.length=0;collisionEnd.length=0;collisionActive.length=0;for(i=0;i<collisions.length;i++){collision=collisions[i];if(collision.collided){pairId=Pair.id(collision.bodyA,collision.bodyB);activePairIds.push(pairId);pair=pairsTable[pairId];if(pair){// pair already exists (but may or may not be active)
if(pair.isActive){// pair exists and is active
collisionActive.push(pair);}else{// pair exists but was inactive, so a collision has just started again
collisionStart.push(pair);}// update the pair
Pair.update(pair,collision,timestamp);}else{// pair did not exist, create a new pair
pair=Pair.create(collision,timestamp);pairsTable[pairId]=pair;// push the new pair
collisionStart.push(pair);pairsList.push(pair);}}}// deactivate previously active pairs that are now inactive
for(i=0;i<pairsList.length;i++){pair=pairsList[i];if(pair.isActive&&Common.indexOf(activePairIds,pair.id)===-1){Pair.setActive(pair,false,timestamp);collisionEnd.push(pair);}}};/**
     * Finds and removes pairs that have been inactive for a set amount of time.
     * @method removeOld
     * @param {object} pairs
     * @param {number} timestamp
     */Pairs.removeOld=function(pairs,timestamp){var pairsList=pairs.list,pairsTable=pairs.table,indexesToRemove=[],pair,collision,pairIndex,i;for(i=0;i<pairsList.length;i++){pair=pairsList[i];collision=pair.collision;// never remove sleeping pairs
if(collision.bodyA.isSleeping||collision.bodyB.isSleeping){pair.timeUpdated=timestamp;continue;}// if pair is inactive for too long, mark it to be removed
if(timestamp-pair.timeUpdated>_pairMaxIdleLife){indexesToRemove.push(i);}}// remove marked pairs
for(i=0;i<indexesToRemove.length;i++){pairIndex=indexesToRemove[i]-i;pair=pairsList[pairIndex];delete pairsTable[pair.id];pairsList.splice(pairIndex,1);}};/**
     * Clears the given pairs structure.
     * @method clear
     * @param {pairs} pairs
     * @return {pairs} pairs
     */Pairs.clear=function(pairs){pairs.table={};pairs.list.length=0;pairs.collisionStart.length=0;pairs.collisionActive.length=0;pairs.collisionEnd.length=0;return pairs;};})();},{"../core/Common":14,"./Pair":7}],9:[function(_dereq_,module,exports){/**
* The `Matter.Query` module contains methods for performing collision queries.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Query
*/var Query={};module.exports=Query;var Vector=_dereq_('../geometry/Vector');var SAT=_dereq_('./SAT');var Bounds=_dereq_('../geometry/Bounds');var Bodies=_dereq_('../factory/Bodies');var Vertices=_dereq_('../geometry/Vertices');(function(){/**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {object[]} Collisions
     */Query.ray=function(bodies,startPoint,endPoint,rayWidth){rayWidth=rayWidth||1e-100;var rayAngle=Vector.angle(startPoint,endPoint),rayLength=Vector.magnitude(Vector.sub(startPoint,endPoint)),rayX=(endPoint.x+startPoint.x)*0.5,rayY=(endPoint.y+startPoint.y)*0.5,ray=Bodies.rectangle(rayX,rayY,rayLength,rayWidth,{angle:rayAngle}),collisions=[];for(var i=0;i<bodies.length;i++){var bodyA=bodies[i];if(Bounds.overlaps(bodyA.bounds,ray.bounds)){for(var j=bodyA.parts.length===1?0:1;j<bodyA.parts.length;j++){var part=bodyA.parts[j];if(Bounds.overlaps(part.bounds,ray.bounds)){var collision=SAT.collides(part,ray);if(collision.collided){collision.body=collision.bodyA=collision.bodyB=bodyA;collisions.push(collision);break;}}}}}return collisions;};/**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */Query.region=function(bodies,bounds,outside){var result=[];for(var i=0;i<bodies.length;i++){var body=bodies[i],overlaps=Bounds.overlaps(body.bounds,bounds);if(overlaps&&!outside||!overlaps&&outside)result.push(body);}return result;};/**
     * Returns all bodies whose vertices contain the given point, from the given set of bodies.
     * @method point
     * @param {body[]} bodies
     * @param {vector} point
     * @return {body[]} The bodies matching the query
     */Query.point=function(bodies,point){var result=[];for(var i=0;i<bodies.length;i++){var body=bodies[i];if(Bounds.contains(body.bounds,point)){for(var j=body.parts.length===1?0:1;j<body.parts.length;j++){var part=body.parts[j];if(Bounds.contains(part.bounds,point)&&Vertices.contains(part.vertices,point)){result.push(body);break;}}}}return result;};})();},{"../factory/Bodies":23,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"./SAT":11}],10:[function(_dereq_,module,exports){/**
* The `Matter.Resolver` module contains methods for resolving collision pairs.
*
* @class Resolver
*/var Resolver={};module.exports=Resolver;var Vertices=_dereq_('../geometry/Vertices');var Vector=_dereq_('../geometry/Vector');var Common=_dereq_('../core/Common');var Bounds=_dereq_('../geometry/Bounds');(function(){Resolver._restingThresh=4;Resolver._restingThreshTangent=6;Resolver._positionDampen=0.9;Resolver._positionWarming=0.8;Resolver._frictionNormalMultiplier=5;/**
     * Prepare pairs for position solving.
     * @method preSolvePosition
     * @param {pair[]} pairs
     */Resolver.preSolvePosition=function(pairs){var i,pair,activeCount;// find total contacts on each body
for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive)continue;activeCount=pair.activeContacts.length;pair.collision.parentA.totalContacts+=activeCount;pair.collision.parentB.totalContacts+=activeCount;}};/**
     * Find a solution for pair positions.
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} timeScale
     */Resolver.solvePosition=function(pairs,timeScale){var i,pair,collision,bodyA,bodyB,normal,bodyBtoA,contactShare,positionImpulse,contactCount={},tempA=Vector._temp[0],tempB=Vector._temp[1],tempC=Vector._temp[2],tempD=Vector._temp[3];// find impulses required to resolve penetration
for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive||pair.isSensor)continue;collision=pair.collision;bodyA=collision.parentA;bodyB=collision.parentB;normal=collision.normal;// get current separation between body edges involved in collision
bodyBtoA=Vector.sub(Vector.add(bodyB.positionImpulse,bodyB.position,tempA),Vector.add(bodyA.positionImpulse,Vector.sub(bodyB.position,collision.penetration,tempB),tempC),tempD);pair.separation=Vector.dot(normal,bodyBtoA);}for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive||pair.isSensor||pair.separation<0)continue;collision=pair.collision;bodyA=collision.parentA;bodyB=collision.parentB;normal=collision.normal;positionImpulse=(pair.separation-pair.slop)*timeScale;if(bodyA.isStatic||bodyB.isStatic)positionImpulse*=2;if(!(bodyA.isStatic||bodyA.isSleeping)){contactShare=Resolver._positionDampen/bodyA.totalContacts;bodyA.positionImpulse.x+=normal.x*positionImpulse*contactShare;bodyA.positionImpulse.y+=normal.y*positionImpulse*contactShare;}if(!(bodyB.isStatic||bodyB.isSleeping)){contactShare=Resolver._positionDampen/bodyB.totalContacts;bodyB.positionImpulse.x-=normal.x*positionImpulse*contactShare;bodyB.positionImpulse.y-=normal.y*positionImpulse*contactShare;}}};/**
     * Apply position resolution.
     * @method postSolvePosition
     * @param {body[]} bodies
     */Resolver.postSolvePosition=function(bodies){for(var i=0;i<bodies.length;i++){var body=bodies[i];// reset contact count
body.totalContacts=0;if(body.positionImpulse.x!==0||body.positionImpulse.y!==0){// update body geometry
for(var j=0;j<body.parts.length;j++){var part=body.parts[j];Vertices.translate(part.vertices,body.positionImpulse);Bounds.update(part.bounds,part.vertices,body.velocity);part.position.x+=body.positionImpulse.x;part.position.y+=body.positionImpulse.y;}// move the body without changing velocity
body.positionPrev.x+=body.positionImpulse.x;body.positionPrev.y+=body.positionImpulse.y;if(Vector.dot(body.positionImpulse,body.velocity)<0){// reset cached impulse if the body has velocity along it
body.positionImpulse.x=0;body.positionImpulse.y=0;}else{// warm the next iteration
body.positionImpulse.x*=Resolver._positionWarming;body.positionImpulse.y*=Resolver._positionWarming;}}}};/**
     * Prepare pairs for velocity solving.
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */Resolver.preSolveVelocity=function(pairs){var i,j,pair,contacts,collision,bodyA,bodyB,normal,tangent,contact,contactVertex,normalImpulse,tangentImpulse,offset,impulse=Vector._temp[0],tempA=Vector._temp[1];for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive||pair.isSensor)continue;contacts=pair.activeContacts;collision=pair.collision;bodyA=collision.parentA;bodyB=collision.parentB;normal=collision.normal;tangent=collision.tangent;// resolve each contact
for(j=0;j<contacts.length;j++){contact=contacts[j];contactVertex=contact.vertex;normalImpulse=contact.normalImpulse;tangentImpulse=contact.tangentImpulse;if(normalImpulse!==0||tangentImpulse!==0){// total impulse from contact
impulse.x=normal.x*normalImpulse+tangent.x*tangentImpulse;impulse.y=normal.y*normalImpulse+tangent.y*tangentImpulse;// apply impulse from contact
if(!(bodyA.isStatic||bodyA.isSleeping)){offset=Vector.sub(contactVertex,bodyA.position,tempA);bodyA.positionPrev.x+=impulse.x*bodyA.inverseMass;bodyA.positionPrev.y+=impulse.y*bodyA.inverseMass;bodyA.anglePrev+=Vector.cross(offset,impulse)*bodyA.inverseInertia;}if(!(bodyB.isStatic||bodyB.isSleeping)){offset=Vector.sub(contactVertex,bodyB.position,tempA);bodyB.positionPrev.x-=impulse.x*bodyB.inverseMass;bodyB.positionPrev.y-=impulse.y*bodyB.inverseMass;bodyB.anglePrev-=Vector.cross(offset,impulse)*bodyB.inverseInertia;}}}}};/**
     * Find a solution for pair velocities.
     * @method solveVelocity
     * @param {pair[]} pairs
     * @param {number} timeScale
     */Resolver.solveVelocity=function(pairs,timeScale){var timeScaleSquared=timeScale*timeScale,impulse=Vector._temp[0],tempA=Vector._temp[1],tempB=Vector._temp[2],tempC=Vector._temp[3],tempD=Vector._temp[4],tempE=Vector._temp[5];for(var i=0;i<pairs.length;i++){var pair=pairs[i];if(!pair.isActive||pair.isSensor)continue;var collision=pair.collision,bodyA=collision.parentA,bodyB=collision.parentB,normal=collision.normal,tangent=collision.tangent,contacts=pair.activeContacts,contactShare=1/contacts.length;// update body velocities
bodyA.velocity.x=bodyA.position.x-bodyA.positionPrev.x;bodyA.velocity.y=bodyA.position.y-bodyA.positionPrev.y;bodyB.velocity.x=bodyB.position.x-bodyB.positionPrev.x;bodyB.velocity.y=bodyB.position.y-bodyB.positionPrev.y;bodyA.angularVelocity=bodyA.angle-bodyA.anglePrev;bodyB.angularVelocity=bodyB.angle-bodyB.anglePrev;// resolve each contact
for(var j=0;j<contacts.length;j++){var contact=contacts[j],contactVertex=contact.vertex,offsetA=Vector.sub(contactVertex,bodyA.position,tempA),offsetB=Vector.sub(contactVertex,bodyB.position,tempB),velocityPointA=Vector.add(bodyA.velocity,Vector.mult(Vector.perp(offsetA),bodyA.angularVelocity),tempC),velocityPointB=Vector.add(bodyB.velocity,Vector.mult(Vector.perp(offsetB),bodyB.angularVelocity),tempD),relativeVelocity=Vector.sub(velocityPointA,velocityPointB,tempE),normalVelocity=Vector.dot(normal,relativeVelocity);var tangentVelocity=Vector.dot(tangent,relativeVelocity),tangentSpeed=Math.abs(tangentVelocity),tangentVelocityDirection=Common.sign(tangentVelocity);// raw impulses
var normalImpulse=(1+pair.restitution)*normalVelocity,normalForce=Common.clamp(pair.separation+normalVelocity,0,1)*Resolver._frictionNormalMultiplier;// coulomb friction
var tangentImpulse=tangentVelocity,maxFriction=Infinity;if(tangentSpeed>pair.friction*pair.frictionStatic*normalForce*timeScaleSquared){maxFriction=tangentSpeed;tangentImpulse=Common.clamp(pair.friction*tangentVelocityDirection*timeScaleSquared,-maxFriction,maxFriction);}// modify impulses accounting for mass, inertia and offset
var oAcN=Vector.cross(offsetA,normal),oBcN=Vector.cross(offsetB,normal),share=contactShare/(bodyA.inverseMass+bodyB.inverseMass+bodyA.inverseInertia*oAcN*oAcN+bodyB.inverseInertia*oBcN*oBcN);normalImpulse*=share;tangentImpulse*=share;// handle high velocity and resting collisions separately
if(normalVelocity<0&&normalVelocity*normalVelocity>Resolver._restingThresh*timeScaleSquared){// high normal velocity so clear cached contact normal impulse
contact.normalImpulse=0;}else{// solve resting collision constraints using Erin Catto's method (GDC08)
// impulse constraint tends to 0
var contactNormalImpulse=contact.normalImpulse;contact.normalImpulse=Math.min(contact.normalImpulse+normalImpulse,0);normalImpulse=contact.normalImpulse-contactNormalImpulse;}// handle high velocity and resting collisions separately
if(tangentVelocity*tangentVelocity>Resolver._restingThreshTangent*timeScaleSquared){// high tangent velocity so clear cached contact tangent impulse
contact.tangentImpulse=0;}else{// solve resting collision constraints using Erin Catto's method (GDC08)
// tangent impulse tends to -tangentSpeed or +tangentSpeed
var contactTangentImpulse=contact.tangentImpulse;contact.tangentImpulse=Common.clamp(contact.tangentImpulse+tangentImpulse,-maxFriction,maxFriction);tangentImpulse=contact.tangentImpulse-contactTangentImpulse;}// total impulse from contact
impulse.x=normal.x*normalImpulse+tangent.x*tangentImpulse;impulse.y=normal.y*normalImpulse+tangent.y*tangentImpulse;// apply impulse from contact
if(!(bodyA.isStatic||bodyA.isSleeping)){bodyA.positionPrev.x+=impulse.x*bodyA.inverseMass;bodyA.positionPrev.y+=impulse.y*bodyA.inverseMass;bodyA.anglePrev+=Vector.cross(offsetA,impulse)*bodyA.inverseInertia;}if(!(bodyB.isStatic||bodyB.isSleeping)){bodyB.positionPrev.x-=impulse.x*bodyB.inverseMass;bodyB.positionPrev.y-=impulse.y*bodyB.inverseMass;bodyB.anglePrev-=Vector.cross(offsetB,impulse)*bodyB.inverseInertia;}}}};})();},{"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],11:[function(_dereq_,module,exports){/**
* The `Matter.SAT` module contains methods for detecting collisions using the Separating Axis Theorem.
*
* @class SAT
*/// TODO: true circles and curves
var SAT={};module.exports=SAT;var Vertices=_dereq_('../geometry/Vertices');var Vector=_dereq_('../geometry/Vector');(function(){/**
     * Detect collision between two bodies using the Separating Axis Theorem.
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {collision} previousCollision
     * @return {collision} collision
     */SAT.collides=function(bodyA,bodyB,previousCollision){var overlapAB,overlapBA,minOverlap,collision,prevCol=previousCollision,canReusePrevCol=false;if(prevCol){// estimate total motion
var parentA=bodyA.parent,parentB=bodyB.parent,motion=parentA.speed*parentA.speed+parentA.angularSpeed*parentA.angularSpeed+parentB.speed*parentB.speed+parentB.angularSpeed*parentB.angularSpeed;// we may be able to (partially) reuse collision result 
// but only safe if collision was resting
canReusePrevCol=prevCol&&prevCol.collided&&motion<0.2;// reuse collision object
collision=prevCol;}else{collision={collided:false,bodyA:bodyA,bodyB:bodyB};}if(prevCol&&canReusePrevCol){// if we can reuse the collision result
// we only need to test the previously found axis
var axisBodyA=collision.axisBody,axisBodyB=axisBodyA===bodyA?bodyB:bodyA,axes=[axisBodyA.axes[prevCol.axisNumber]];minOverlap=_overlapAxes(axisBodyA.vertices,axisBodyB.vertices,axes);collision.reused=true;if(minOverlap.overlap<=0){collision.collided=false;return collision;}}else{// if we can't reuse a result, perform a full SAT test
overlapAB=_overlapAxes(bodyA.vertices,bodyB.vertices,bodyA.axes);if(overlapAB.overlap<=0){collision.collided=false;return collision;}overlapBA=_overlapAxes(bodyB.vertices,bodyA.vertices,bodyB.axes);if(overlapBA.overlap<=0){collision.collided=false;return collision;}if(overlapAB.overlap<overlapBA.overlap){minOverlap=overlapAB;collision.axisBody=bodyA;}else{minOverlap=overlapBA;collision.axisBody=bodyB;}// important for reuse later
collision.axisNumber=minOverlap.axisNumber;}collision.bodyA=bodyA.id<bodyB.id?bodyA:bodyB;collision.bodyB=bodyA.id<bodyB.id?bodyB:bodyA;collision.collided=true;collision.normal=minOverlap.axis;collision.depth=minOverlap.overlap;collision.parentA=collision.bodyA.parent;collision.parentB=collision.bodyB.parent;bodyA=collision.bodyA;bodyB=collision.bodyB;// ensure normal is facing away from bodyA
if(Vector.dot(collision.normal,Vector.sub(bodyB.position,bodyA.position))>0)collision.normal=Vector.neg(collision.normal);collision.tangent=Vector.perp(collision.normal);collision.penetration={x:collision.normal.x*collision.depth,y:collision.normal.y*collision.depth};// find support points, there is always either exactly one or two
var verticesB=_findSupports(bodyA,bodyB,collision.normal),supports=collision.supports||[];supports.length=0;// find the supports from bodyB that are inside bodyA
if(Vertices.contains(bodyA.vertices,verticesB[0]))supports.push(verticesB[0]);if(Vertices.contains(bodyA.vertices,verticesB[1]))supports.push(verticesB[1]);// find the supports from bodyA that are inside bodyB
if(supports.length<2){var verticesA=_findSupports(bodyB,bodyA,Vector.neg(collision.normal));if(Vertices.contains(bodyB.vertices,verticesA[0]))supports.push(verticesA[0]);if(supports.length<2&&Vertices.contains(bodyB.vertices,verticesA[1]))supports.push(verticesA[1]);}// account for the edge case of overlapping but no vertex containment
if(supports.length<1)supports=[verticesB[0]];collision.supports=supports;return collision;};/**
     * Find the overlap between two sets of vertices.
     * @method _overlapAxes
     * @private
     * @param {} verticesA
     * @param {} verticesB
     * @param {} axes
     * @return result
     */var _overlapAxes=function _overlapAxes(verticesA,verticesB,axes){var projectionA=Vector._temp[0],projectionB=Vector._temp[1],result={overlap:Number.MAX_VALUE},overlap,axis;for(var i=0;i<axes.length;i++){axis=axes[i];_projectToAxis(projectionA,verticesA,axis);_projectToAxis(projectionB,verticesB,axis);overlap=Math.min(projectionA.max-projectionB.min,projectionB.max-projectionA.min);if(overlap<=0){result.overlap=overlap;return result;}if(overlap<result.overlap){result.overlap=overlap;result.axis=axis;result.axisNumber=i;}}return result;};/**
     * Projects vertices on an axis and returns an interval.
     * @method _projectToAxis
     * @private
     * @param {} projection
     * @param {} vertices
     * @param {} axis
     */var _projectToAxis=function _projectToAxis(projection,vertices,axis){var min=Vector.dot(vertices[0],axis),max=min;for(var i=1;i<vertices.length;i+=1){var dot=Vector.dot(vertices[i],axis);if(dot>max){max=dot;}else if(dot<min){min=dot;}}projection.min=min;projection.max=max;};/**
     * Finds supporting vertices given two bodies along a given direction using hill-climbing.
     * @method _findSupports
     * @private
     * @param {} bodyA
     * @param {} bodyB
     * @param {} normal
     * @return [vector]
     */var _findSupports=function _findSupports(bodyA,bodyB,normal){var nearestDistance=Number.MAX_VALUE,vertexToBody=Vector._temp[0],vertices=bodyB.vertices,bodyAPosition=bodyA.position,distance,vertex,vertexA,vertexB;// find closest vertex on bodyB
for(var i=0;i<vertices.length;i++){vertex=vertices[i];vertexToBody.x=vertex.x-bodyAPosition.x;vertexToBody.y=vertex.y-bodyAPosition.y;distance=-Vector.dot(normal,vertexToBody);if(distance<nearestDistance){nearestDistance=distance;vertexA=vertex;}}// find next closest vertex using the two connected to it
var prevIndex=vertexA.index-1>=0?vertexA.index-1:vertices.length-1;vertex=vertices[prevIndex];vertexToBody.x=vertex.x-bodyAPosition.x;vertexToBody.y=vertex.y-bodyAPosition.y;nearestDistance=-Vector.dot(normal,vertexToBody);vertexB=vertex;var nextIndex=(vertexA.index+1)%vertices.length;vertex=vertices[nextIndex];vertexToBody.x=vertex.x-bodyAPosition.x;vertexToBody.y=vertex.y-bodyAPosition.y;distance=-Vector.dot(normal,vertexToBody);if(distance<nearestDistance){vertexB=vertex;}return[vertexA,vertexB];};})();},{"../geometry/Vector":28,"../geometry/Vertices":29}],12:[function(_dereq_,module,exports){/**
* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
* The stiffness of constraints can be modified to create springs or elastic.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Constraint
*/// TODO: fix instability issues with torque
// TODO: linked constraints
// TODO: breakable constraints
// TODO: collision constraints
// TODO: allow constrained bodies to sleep
// TODO: handle 0 length constraints properly
// TODO: impulse caching and warming
var Constraint={};module.exports=Constraint;var Vertices=_dereq_('../geometry/Vertices');var Vector=_dereq_('../geometry/Vector');var Sleeping=_dereq_('../core/Sleeping');var Bounds=_dereq_('../geometry/Bounds');var Axes=_dereq_('../geometry/Axes');var Common=_dereq_('../core/Common');(function(){var _minLength=0.000001,_minDifference=0.001;/**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */Constraint.create=function(options){var constraint=options;// if bodies defined but no points, use body centre
if(constraint.bodyA&&!constraint.pointA)constraint.pointA={x:0,y:0};if(constraint.bodyB&&!constraint.pointB)constraint.pointB={x:0,y:0};// calculate static length using initial world space points
var initialPointA=constraint.bodyA?Vector.add(constraint.bodyA.position,constraint.pointA):constraint.pointA,initialPointB=constraint.bodyB?Vector.add(constraint.bodyB.position,constraint.pointB):constraint.pointB,length=Vector.magnitude(Vector.sub(initialPointA,initialPointB));constraint.length=constraint.length||length||_minLength;// render
var render={visible:true,lineWidth:2,strokeStyle:'#666'};constraint.render=Common.extend(render,constraint.render);// option defaults
constraint.id=constraint.id||Common.nextId();constraint.label=constraint.label||'Constraint';constraint.type='constraint';constraint.stiffness=constraint.stiffness||1;constraint.angularStiffness=constraint.angularStiffness||0;constraint.angleA=constraint.bodyA?constraint.bodyA.angle:constraint.angleA;constraint.angleB=constraint.bodyB?constraint.bodyB.angle:constraint.angleB;return constraint;};/**
     * Solves all constraints in a list of collisions.
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} timeScale
     */Constraint.solveAll=function(constraints,timeScale){for(var i=0;i<constraints.length;i++){Constraint.solve(constraints[i],timeScale);}};/**
     * Solves a distance constraint with Gauss-Siedel method.
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */Constraint.solve=function(constraint,timeScale){var bodyA=constraint.bodyA,bodyB=constraint.bodyB,pointA=constraint.pointA,pointB=constraint.pointB;// update reference angle
if(bodyA&&!bodyA.isStatic){constraint.pointA=Vector.rotate(pointA,bodyA.angle-constraint.angleA);constraint.angleA=bodyA.angle;}// update reference angle
if(bodyB&&!bodyB.isStatic){constraint.pointB=Vector.rotate(pointB,bodyB.angle-constraint.angleB);constraint.angleB=bodyB.angle;}var pointAWorld=pointA,pointBWorld=pointB;if(bodyA)pointAWorld=Vector.add(bodyA.position,pointA);if(bodyB)pointBWorld=Vector.add(bodyB.position,pointB);if(!pointAWorld||!pointBWorld)return;var delta=Vector.sub(pointAWorld,pointBWorld),currentLength=Vector.magnitude(delta);// prevent singularity
if(currentLength===0)currentLength=_minLength;// solve distance constraint with Gauss-Siedel method
var difference=(currentLength-constraint.length)/currentLength,normal=Vector.div(delta,currentLength),force=Vector.mult(delta,difference*0.5*constraint.stiffness*timeScale*timeScale);// if difference is very small, we can skip
if(Math.abs(1-currentLength/constraint.length)<_minDifference*timeScale)return;var velocityPointA,velocityPointB,offsetA,offsetB,oAn,oBn,bodyADenom,bodyBDenom;if(bodyA&&!bodyA.isStatic){// point body offset
offsetA={x:pointAWorld.x-bodyA.position.x+force.x,y:pointAWorld.y-bodyA.position.y+force.y};// update velocity
bodyA.velocity.x=bodyA.position.x-bodyA.positionPrev.x;bodyA.velocity.y=bodyA.position.y-bodyA.positionPrev.y;bodyA.angularVelocity=bodyA.angle-bodyA.anglePrev;// find point velocity and body mass
velocityPointA=Vector.add(bodyA.velocity,Vector.mult(Vector.perp(offsetA),bodyA.angularVelocity));oAn=Vector.dot(offsetA,normal);bodyADenom=bodyA.inverseMass+bodyA.inverseInertia*oAn*oAn;}else{velocityPointA={x:0,y:0};bodyADenom=bodyA?bodyA.inverseMass:0;}if(bodyB&&!bodyB.isStatic){// point body offset
offsetB={x:pointBWorld.x-bodyB.position.x-force.x,y:pointBWorld.y-bodyB.position.y-force.y};// update velocity
bodyB.velocity.x=bodyB.position.x-bodyB.positionPrev.x;bodyB.velocity.y=bodyB.position.y-bodyB.positionPrev.y;bodyB.angularVelocity=bodyB.angle-bodyB.anglePrev;// find point velocity and body mass
velocityPointB=Vector.add(bodyB.velocity,Vector.mult(Vector.perp(offsetB),bodyB.angularVelocity));oBn=Vector.dot(offsetB,normal);bodyBDenom=bodyB.inverseMass+bodyB.inverseInertia*oBn*oBn;}else{velocityPointB={x:0,y:0};bodyBDenom=bodyB?bodyB.inverseMass:0;}var relativeVelocity=Vector.sub(velocityPointB,velocityPointA),normalImpulse=Vector.dot(normal,relativeVelocity)/(bodyADenom+bodyBDenom);if(normalImpulse>0)normalImpulse=0;var normalVelocity={x:normal.x*normalImpulse,y:normal.y*normalImpulse};var torque;if(bodyA&&!bodyA.isStatic){torque=Vector.cross(offsetA,normalVelocity)*bodyA.inverseInertia*(1-constraint.angularStiffness);// keep track of applied impulses for post solving
bodyA.constraintImpulse.x-=force.x;bodyA.constraintImpulse.y-=force.y;bodyA.constraintImpulse.angle+=torque;// apply forces
bodyA.position.x-=force.x;bodyA.position.y-=force.y;bodyA.angle+=torque;}if(bodyB&&!bodyB.isStatic){torque=Vector.cross(offsetB,normalVelocity)*bodyB.inverseInertia*(1-constraint.angularStiffness);// keep track of applied impulses for post solving
bodyB.constraintImpulse.x+=force.x;bodyB.constraintImpulse.y+=force.y;bodyB.constraintImpulse.angle-=torque;// apply forces
bodyB.position.x+=force.x;bodyB.position.y+=force.y;bodyB.angle-=torque;}};/**
     * Performs body updates required after solving constraints.
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */Constraint.postSolveAll=function(bodies){for(var i=0;i<bodies.length;i++){var body=bodies[i],impulse=body.constraintImpulse;if(impulse.x===0&&impulse.y===0&&impulse.angle===0){continue;}Sleeping.set(body,false);// update geometry and reset
for(var j=0;j<body.parts.length;j++){var part=body.parts[j];Vertices.translate(part.vertices,impulse);if(j>0){part.position.x+=impulse.x;part.position.y+=impulse.y;}if(impulse.angle!==0){Vertices.rotate(part.vertices,impulse.angle,body.position);Axes.rotate(part.axes,impulse.angle);if(j>0){Vector.rotateAbout(part.position,impulse.angle,body.position,part.position);}}Bounds.update(part.bounds,part.vertices,body.velocity);}impulse.angle=0;impulse.x=0;impulse.y=0;}};/*
    *
    *  Properties Documentation
    *
    *//**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     *//**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     *//**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     *//**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     *//**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     *//**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     *//**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     *//**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     *//**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     *//**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     *//**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     *//**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     *//**
     * A `Number` that specifies the target resting length of the constraint. 
     * It is calculated automatically in `Constraint.create` from initial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */})();},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],13:[function(_dereq_,module,exports){/**
* The `Matter.MouseConstraint` module contains methods for creating mouse constraints.
* Mouse constraints are used for allowing user interaction, providing the ability to move bodies via the mouse or touch.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class MouseConstraint
*/var MouseConstraint={};module.exports=MouseConstraint;var Vertices=_dereq_('../geometry/Vertices');var Sleeping=_dereq_('../core/Sleeping');var Mouse=_dereq_('../core/Mouse');var Events=_dereq_('../core/Events');var Detector=_dereq_('../collision/Detector');var Constraint=_dereq_('./Constraint');var Composite=_dereq_('../body/Composite');var Common=_dereq_('../core/Common');var Bounds=_dereq_('../geometry/Bounds');(function(){/**
     * Creates a new mouse constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {engine} engine
     * @param {} options
     * @return {MouseConstraint} A new MouseConstraint
     */MouseConstraint.create=function(engine,options){var mouse=(engine?engine.mouse:null)||(options?options.mouse:null);if(!mouse){if(engine&&engine.render&&engine.render.canvas){mouse=Mouse.create(engine.render.canvas);}else if(options&&options.element){mouse=Mouse.create(options.element);}else{mouse=Mouse.create();Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');}}var constraint=Constraint.create({label:'Mouse Constraint',pointA:mouse.position,pointB:{x:0,y:0},length:0.01,stiffness:0.1,angularStiffness:1,render:{strokeStyle:'#90EE90',lineWidth:3}});var defaults={type:'mouseConstraint',mouse:mouse,element:null,body:null,constraint:constraint,collisionFilter:{category:0x0001,mask:0xFFFFFFFF,group:0}};var mouseConstraint=Common.extend(defaults,options);Events.on(engine,'tick',function(){var allBodies=Composite.allBodies(engine.world);MouseConstraint.update(mouseConstraint,allBodies);_triggerEvents(mouseConstraint);});return mouseConstraint;};/**
     * Updates the given mouse constraint.
     * @private
     * @method update
     * @param {MouseConstraint} mouseConstraint
     * @param {body[]} bodies
     */MouseConstraint.update=function(mouseConstraint,bodies){var mouse=mouseConstraint.mouse,constraint=mouseConstraint.constraint,body=mouseConstraint.body;if(mouse.button===0){if(!constraint.bodyB){for(var i=0;i<bodies.length;i++){body=bodies[i];if(Bounds.contains(body.bounds,mouse.position)&&Detector.canCollide(body.collisionFilter,mouseConstraint.collisionFilter)){for(var j=body.parts.length>1?1:0;j<body.parts.length;j++){var part=body.parts[j];if(Vertices.contains(part.vertices,mouse.position)){constraint.pointA=mouse.position;constraint.bodyB=mouseConstraint.body=body;constraint.pointB={x:mouse.position.x-body.position.x,y:mouse.position.y-body.position.y};constraint.angleB=body.angle;Sleeping.set(body,false);Events.trigger(mouseConstraint,'startdrag',{mouse:mouse,body:body});break;}}}}}else{Sleeping.set(constraint.bodyB,false);constraint.pointA=mouse.position;}}else{constraint.bodyB=mouseConstraint.body=null;constraint.pointB=null;if(body)Events.trigger(mouseConstraint,'enddrag',{mouse:mouse,body:body});}};/**
     * Triggers mouse constraint events.
     * @method _triggerEvents
     * @private
     * @param {mouse} mouseConstraint
     */var _triggerEvents=function _triggerEvents(mouseConstraint){var mouse=mouseConstraint.mouse,mouseEvents=mouse.sourceEvents;if(mouseEvents.mousemove)Events.trigger(mouseConstraint,'mousemove',{mouse:mouse});if(mouseEvents.mousedown)Events.trigger(mouseConstraint,'mousedown',{mouse:mouse});if(mouseEvents.mouseup)Events.trigger(mouseConstraint,'mouseup',{mouse:mouse});// reset the mouse state ready for the next step
Mouse.clearSourceEvents(mouse);};/*
    *
    *  Events Documentation
    *
    *//**
    * Fired when the mouse has moved (or a touch moves) during the last step
    *
    * @event mousemove
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when the mouse is down (or a touch has started) during the last step
    *
    * @event mousedown
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when the mouse is up (or a touch has ended) during the last step
    *
    * @event mouseup
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when the user starts dragging a body
    *
    * @event startdrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired when the user ends dragging a body
    *
    * @event enddrag
    * @param {} event An event object
    * @param {mouse} event.mouse The engine's mouse instance
    * @param {body} event.body The body that has stopped being dragged
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     * @readOnly
     *//**
     * The `Mouse` instance in use. If not supplied in `MouseConstraint.create`, one will be created.
     *
     * @property mouse
     * @type mouse
     * @default mouse
     *//**
     * The `Body` that is currently being moved by the user, or `null` if no body.
     *
     * @property body
     * @type body
     * @default null
     *//**
     * The `Constraint` object that is used to move the body during interaction.
     *
     * @property constraint
     * @type constraint
     *//**
     * An `Object` that specifies the collision filter properties.
     * The collision filter allows the user to define which types of body this mouse constraint can interact with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter
     * @type object
     */})();},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../core/Sleeping":22,"../geometry/Bounds":26,"../geometry/Vertices":29,"./Constraint":12}],14:[function(_dereq_,module,exports){/**
* The `Matter.Common` module contains utility functions that are common to all modules.
*
* @class Common
*/var Common={};module.exports=Common;(function(){Common._nextId=0;Common._seed=0;/**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */Common.extend=function(obj,deep){var argsStart,args,deepClone;if(typeof deep==='boolean'){argsStart=2;deepClone=deep;}else{argsStart=1;deepClone=true;}args=Array.prototype.slice.call(arguments,argsStart);for(var i=0;i<args.length;i++){var source=args[i];if(source){for(var prop in source){if(deepClone&&source[prop]&&source[prop].constructor===Object){if(!obj[prop]||obj[prop].constructor===Object){obj[prop]=obj[prop]||{};Common.extend(obj[prop],deepClone,source[prop]);}else{obj[prop]=source[prop];}}else{obj[prop]=source[prop];}}}}return obj;};/**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */Common.clone=function(obj,deep){return Common.extend({},deep,obj);};/**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */Common.keys=function(obj){if(Object.keys)return Object.keys(obj);// avoid hasOwnProperty for performance
var keys=[];for(var key in obj){keys.push(key);}return keys;};/**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */Common.values=function(obj){var values=[];if(Object.keys){var keys=Object.keys(obj);for(var i=0;i<keys.length;i++){values.push(obj[keys[i]]);}return values;}// avoid hasOwnProperty for performance
for(var key in obj){values.push(obj[key]);}return values;};/**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */Common.get=function(obj,path,begin,end){path=path.split('.').slice(begin,end);for(var i=0;i<path.length;i+=1){obj=obj[path[i]];}return obj;};/**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */Common.set=function(obj,path,val,begin,end){var parts=path.split('.').slice(begin,end);Common.get(obj,path,0,-1)[parts[parts.length-1]]=val;return val;};/**
     * Returns a hex colour string made by lightening or darkening color by percent.
     * @method shadeColor
     * @param {string} color
     * @param {number} percent
     * @return {string} A hex colour
     */Common.shadeColor=function(color,percent){// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color
var colorInteger=parseInt(color.slice(1),16),amount=Math.round(2.55*percent),R=(colorInteger>>16)+amount,B=(colorInteger>>8&0x00FF)+amount,G=(colorInteger&0x0000FF)+amount;return"#"+(0x1000000+(R<255?R<1?0:R:255)*0x10000+(B<255?B<1?0:B:255)*0x100+(G<255?G<1?0:G:255)).toString(16).slice(1);};/**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */Common.shuffle=function(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Common.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp;}return array;};/**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */Common.choose=function(choices){return choices[Math.floor(Common.random()*choices.length)];};/**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */Common.isElement=function(obj){// http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
try{return obj instanceof HTMLElement;}catch(e){return(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"&&obj.nodeType===1&&_typeof(obj.style)==="object"&&_typeof(obj.ownerDocument)==="object";}};/**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */Common.isArray=function(obj){return Object.prototype.toString.call(obj)==='[object Array]';};/**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */Common.isFunction=function(obj){return typeof obj==="function";};/**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */Common.isPlainObject=function(obj){return(typeof obj==="undefined"?"undefined":_typeof(obj))==='object'&&obj.constructor===Object;};/**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */Common.isString=function(obj){return toString.call(obj)==='[object String]';};/**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */Common.clamp=function(value,min,max){if(value<min)return min;if(value>max)return max;return value;};/**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */Common.sign=function(value){return value<0?-1:1;};/**
     * Returns the current timestamp (high-res if available).
     * @method now
     * @return {number} the current timestamp (high-res if available)
     */Common.now=function(){// http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
// https://gist.github.com/davidwaterston/2982531
var performance=window.performance||{};performance.now=function(){return performance.now||performance.webkitNow||performance.msNow||performance.oNow||performance.mozNow||function(){return+new Date();};}();return performance.now();};/**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */Common.random=function(min,max){min=typeof min!=="undefined"?min:0;max=typeof max!=="undefined"?max:1;return min+_seededRandom()*(max-min);};var _seededRandom=function _seededRandom(){// https://gist.github.com/ngryman/3830489
Common._seed=(Common._seed*9301+49297)%233280;return Common._seed/233280;};/**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */Common.colorToNumber=function(colorString){colorString=colorString.replace('#','');if(colorString.length==3){colorString=colorString.charAt(0)+colorString.charAt(0)+colorString.charAt(1)+colorString.charAt(1)+colorString.charAt(2)+colorString.charAt(2);}return parseInt(colorString,16);};/**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @property Common.logLevel
     * @type {Number}
     * @default 1
     */Common.logLevel=1;/**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */Common.log=function(){if(console&&Common.logLevel>0&&Common.logLevel<=3){console.log.apply(console,['matter-js:'].concat(Array.prototype.slice.call(arguments)));}};/**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */Common.info=function(){if(console&&Common.logLevel>0&&Common.logLevel<=2){console.info.apply(console,['matter-js:'].concat(Array.prototype.slice.call(arguments)));}};/**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */Common.warn=function(){if(console&&Common.logLevel>0&&Common.logLevel<=3){console.warn.apply(console,['matter-js:'].concat(Array.prototype.slice.call(arguments)));}};/**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */Common.nextId=function(){return Common._nextId++;};/**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */Common.indexOf=function(haystack,needle){if(haystack.indexOf)return haystack.indexOf(needle);for(var i=0;i<haystack.length;i++){if(haystack[i]===needle)return i;}return-1;};/**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */Common.map=function(list,func){if(list.map){return list.map(func);}var mapped=[];for(var i=0;i<list.length;i+=1){mapped.push(func(list[i]));}return mapped;};/**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */Common.topologicalSort=function(graph){// https://mgechev.github.io/javascript-algorithms/graphs_others_topological-sort.js.html
var result=[],visited=[],temp=[];for(var node in graph){if(!visited[node]&&!temp[node]){_topologicalSort(node,visited,temp,graph,result);}}return result;};var _topologicalSort=function _topologicalSort(node,visited,temp,graph,result){var neighbors=graph[node]||[];temp[node]=true;for(var i=0;i<neighbors.length;i+=1){var neighbor=neighbors[i];if(temp[neighbor]){// skip circular dependencies
continue;}if(!visited[neighbor]){_topologicalSort(neighbor,visited,temp,graph,result);}}temp[node]=false;visited[node]=true;result.push(node);};/**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */Common.chain=function(){var args=Array.prototype.slice.call(arguments),funcs=[];for(var i=0;i<args.length;i+=1){var func=args[i];if(func._chained){// flatten already chained functions
funcs.push.apply(funcs,func._chained);}else{funcs.push(func);}}var chain=function chain(){var lastResult;for(var i=0;i<funcs.length;i+=1){var result=funcs[i].apply(lastResult,arguments);if(typeof result!=='undefined'){lastResult=result;}}return lastResult;};chain._chained=funcs;return chain;};/**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */Common.chainPathBefore=function(base,path,func){return Common.set(base,path,Common.chain(func,Common.get(base,path)));};/**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */Common.chainPathAfter=function(base,path,func){return Common.set(base,path,Common.chain(Common.get(base,path),func));};})();},{}],15:[function(_dereq_,module,exports){/**
* The `Matter.Engine` module contains methods for creating and manipulating engines.
* An engine is a controller that manages updating the simulation of the world.
* See `Matter.Runner` for an optional game loop utility.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Engine
*/var Engine={};module.exports=Engine;var World=_dereq_('../body/World');var Sleeping=_dereq_('./Sleeping');var Resolver=_dereq_('../collision/Resolver');var Render=_dereq_('../render/Render');var Pairs=_dereq_('../collision/Pairs');var Metrics=_dereq_('./Metrics');var Grid=_dereq_('../collision/Grid');var Events=_dereq_('./Events');var Composite=_dereq_('../body/Composite');var Constraint=_dereq_('../constraint/Constraint');var Common=_dereq_('./Common');var Body=_dereq_('../body/Body');(function(){/**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {engine} engine
     */Engine.create=function(element,options){// options may be passed as the first (and only) argument
options=Common.isElement(element)?options:element;element=Common.isElement(element)?element:null;options=options||{};if(element||options.render){Common.warn('Engine.create: engine.render is deprecated (see docs)');}var defaults={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:false,events:[],timing:{timestamp:0,timeScale:1},broadphase:{controller:Grid}};var engine=Common.extend(defaults,options);// @deprecated
if(element||engine.render){var renderDefaults={element:element,controller:Render};engine.render=Common.extend(renderDefaults,engine.render);}// @deprecated
if(engine.render&&engine.render.controller){engine.render=engine.render.controller.create(engine.render);}// @deprecated
if(engine.render){engine.render.engine=engine;}engine.world=options.world||World.create(engine.world);engine.pairs=Pairs.create();engine.broadphase=engine.broadphase.controller.create(engine.broadphase);engine.metrics=engine.metrics||{extended:false};return engine;};/**
     * Moves the simulation forward in time by `delta` ms.
     * The `correction` argument is an optional `Number` that specifies the time correction factor to apply to the update.
     * This can help improve the accuracy of the simulation in cases where `delta` is changing between updates.
     * The value of `correction` is defined as `delta / lastDelta`, i.e. the percentage change of `delta` over the last step.
     * Therefore the value is always `1` (no correction) when `delta` constant (or when no correction is desired, which is the default).
     * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
     *
     * Triggers `beforeUpdate` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} [delta=16.666]
     * @param {number} [correction=1]
     */Engine.update=function(engine,delta,correction){delta=delta||1000/60;correction=correction||1;var world=engine.world,timing=engine.timing,broadphase=engine.broadphase,broadphasePairs=[],i;// increment timestamp
timing.timestamp+=delta*timing.timeScale;// create an event object
var event={timestamp:timing.timestamp};Events.trigger(engine,'beforeUpdate',event);// get lists of all bodies and constraints, no matter what composites they are in
var allBodies=Composite.allBodies(world),allConstraints=Composite.allConstraints(world);// if sleeping enabled, call the sleeping controller
if(engine.enableSleeping)Sleeping.update(allBodies,timing.timeScale);// applies gravity to all bodies
_bodiesApplyGravity(allBodies,world.gravity);// update all body position and rotation by integration
_bodiesUpdate(allBodies,delta,timing.timeScale,correction,world.bounds);// update all constraints
for(i=0;i<engine.constraintIterations;i++){Constraint.solveAll(allConstraints,timing.timeScale);}Constraint.postSolveAll(allBodies);// broadphase pass: find potential collision pairs
if(broadphase.controller){// if world is dirty, we must flush the whole grid
if(world.isModified)broadphase.controller.clear(broadphase);// update the grid buckets based on current bodies
broadphase.controller.update(broadphase,allBodies,engine,world.isModified);broadphasePairs=broadphase.pairsList;}else{// if no broadphase set, we just pass all bodies
broadphasePairs=allBodies;}// clear all composite modified flags
if(world.isModified){Composite.setModified(world,false,false,true);}// narrowphase pass: find actual collisions, then create or update collision pairs
var collisions=broadphase.detector(broadphasePairs,engine);// update collision pairs
var pairs=engine.pairs,timestamp=timing.timestamp;Pairs.update(pairs,collisions,timestamp);Pairs.removeOld(pairs,timestamp);// wake up bodies involved in collisions
if(engine.enableSleeping)Sleeping.afterCollisions(pairs.list,timing.timeScale);// trigger collision events
if(pairs.collisionStart.length>0)Events.trigger(engine,'collisionStart',{pairs:pairs.collisionStart});// iteratively resolve position between collisions
Resolver.preSolvePosition(pairs.list);for(i=0;i<engine.positionIterations;i++){Resolver.solvePosition(pairs.list,timing.timeScale);}Resolver.postSolvePosition(allBodies);// iteratively resolve velocity between collisions
Resolver.preSolveVelocity(pairs.list);for(i=0;i<engine.velocityIterations;i++){Resolver.solveVelocity(pairs.list,timing.timeScale);}// trigger collision events
if(pairs.collisionActive.length>0)Events.trigger(engine,'collisionActive',{pairs:pairs.collisionActive});if(pairs.collisionEnd.length>0)Events.trigger(engine,'collisionEnd',{pairs:pairs.collisionEnd});// clear force buffers
_bodiesClearForces(allBodies);Events.trigger(engine,'afterUpdate',event);return engine;};/**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */Engine.merge=function(engineA,engineB){Common.extend(engineA,engineB);if(engineB.world){engineA.world=engineB.world;Engine.clear(engineA);var bodies=Composite.allBodies(engineA.world);for(var i=0;i<bodies.length;i++){var body=bodies[i];Sleeping.set(body,false);body.id=Common.nextId();}}};/**
     * Clears the engine including the world, pairs and broadphase.
     * @method clear
     * @param {engine} engine
     */Engine.clear=function(engine){var world=engine.world;Pairs.clear(engine.pairs);var broadphase=engine.broadphase;if(broadphase.controller){var bodies=Composite.allBodies(world);broadphase.controller.clear(broadphase);broadphase.controller.update(broadphase,bodies,engine,true);}};/**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method bodiesClearForces
     * @private
     * @param {body[]} bodies
     */var _bodiesClearForces=function _bodiesClearForces(bodies){for(var i=0;i<bodies.length;i++){var body=bodies[i];// reset force buffers
body.force.x=0;body.force.y=0;body.torque=0;}};/**
     * Applys a mass dependant force to all given bodies.
     * @method bodiesApplyGravity
     * @private
     * @param {body[]} bodies
     * @param {vector} gravity
     */var _bodiesApplyGravity=function _bodiesApplyGravity(bodies,gravity){var gravityScale=typeof gravity.scale!=='undefined'?gravity.scale:0.001;if(gravity.x===0&&gravity.y===0||gravityScale===0){return;}for(var i=0;i<bodies.length;i++){var body=bodies[i];if(body.isStatic||body.isSleeping)continue;// apply gravity
body.force.y+=body.mass*gravity.y*gravityScale;body.force.x+=body.mass*gravity.x*gravityScale;}};/**
     * Applys `Body.update` to all given `bodies`.
     * @method updateAll
     * @private
     * @param {body[]} bodies
     * @param {number} deltaTime 
     * The amount of time elapsed between updates
     * @param {number} timeScale
     * @param {number} correction 
     * The Verlet correction factor (deltaTime / lastDeltaTime)
     * @param {bounds} worldBounds
     */var _bodiesUpdate=function _bodiesUpdate(bodies,deltaTime,timeScale,correction,worldBounds){for(var i=0;i<bodies.length;i++){var body=bodies[i];if(body.isStatic||body.isSleeping)continue;Body.update(body,deltaTime,timeScale,correction);}};/**
     * An alias for `Runner.run`, see `Matter.Runner` for more information.
     * @method run
     * @param {engine} engine
     *//**
    * Fired just before an update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after engine update and all collision events
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
    *
    * @event collisionStart
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
    *
    * @event collisionActive
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
    *
    * @event collisionEnd
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     *//**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     *//**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     *//**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     *//**
     * An `Object` containing properties regarding the timing systems of the engine. 
     *
     * @property timing
     * @type object
     *//**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     *//**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
     * It is incremented on every `Engine.update` by the given `delta` argument. 
     *
     * @property timing.timestamp
     * @type number
     * @default 0
     *//**
     * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
     * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
     *
     * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
     * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
     *
     * @property render
     * @type render
     * @deprecated see Demo.js for an example of creating a renderer
     * @default a Matter.Render instance
     *//**
     * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
     *
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     *//**
     * A `World` composite object that will contain all simulated bodies and constraints.
     *
     * @property world
     * @type world
     * @default a Matter.World instance
     */})();},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":31,"./Common":14,"./Events":16,"./Metrics":18,"./Sleeping":22}],16:[function(_dereq_,module,exports){/**
* The `Matter.Events` module contains methods to fire and listen to events on other objects.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Events
*/var Events={};module.exports=Events;var Common=_dereq_('./Common');(function(){/**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */Events.on=function(object,eventNames,callback){var names=eventNames.split(' '),name;for(var i=0;i<names.length;i++){name=names[i];object.events=object.events||{};object.events[name]=object.events[name]||[];object.events[name].push(callback);}return callback;};/**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */Events.off=function(object,eventNames,callback){if(!eventNames){object.events={};return;}// handle Events.off(object, callback)
if(typeof eventNames==='function'){callback=eventNames;eventNames=Common.keys(object.events).join(' ');}var names=eventNames.split(' ');for(var i=0;i<names.length;i++){var callbacks=object.events[names[i]],newCallbacks=[];if(callback&&callbacks){for(var j=0;j<callbacks.length;j++){if(callbacks[j]!==callback)newCallbacks.push(callbacks[j]);}}object.events[names[i]]=newCallbacks;}};/**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */Events.trigger=function(object,eventNames,event){var names,name,callbacks,eventClone;if(object.events){if(!event)event={};names=eventNames.split(' ');for(var i=0;i<names.length;i++){name=names[i];callbacks=object.events[name];if(callbacks){eventClone=Common.clone(event,false);eventClone.name=name;eventClone.source=object;for(var j=0;j<callbacks.length;j++){callbacks[j].apply(object,[eventClone]);}}}}};})();},{"./Common":14}],17:[function(_dereq_,module,exports){/**
* The `Matter` module is the top level namespace. It also includes a function for installing plugins on top of the library.
*
* @class Matter
*/var Matter={};module.exports=Matter;var Plugin=_dereq_('./Plugin');var Common=_dereq_('./Common');(function(){/**
     * The library name.
     * @property name
     * @readOnly
     * @type {String}
     */Matter.name='matter-js';/**
     * The library version.
     * @property version
     * @readOnly
     * @type {String}
     */Matter.version='0.11.1';/**
     * A list of plugin dependencies to be installed. These are normally set and installed through `Matter.use`.
     * Alternatively you may set `Matter.uses` manually and install them by calling `Plugin.use(Matter)`.
     * @property uses
     * @type {Array}
     */Matter.uses=[];/**
     * The plugins that have been installed through `Matter.Plugin.install`. Read only.
     * @property used
     * @readOnly
     * @type {Array}
     */Matter.used=[];/**
     * Installs the given plugins on the `Matter` namespace.
     * This is a short-hand for `Plugin.use`, see it for more information.
     * Call this function once at the start of your code, with all of the plugins you wish to install as arguments.
     * Avoid calling this function multiple times unless you intend to manually control installation order.
     * @method use
     * @param ...plugin {Function} The plugin(s) to install on `base` (multi-argument).
     */Matter.use=function(){Plugin.use(Matter,Array.prototype.slice.call(arguments));};/**
     * Chains a function to excute before the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method before
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */Matter.before=function(path,func){path=path.replace(/^Matter./,'');return Common.chainPathBefore(Matter,path,func);};/**
     * Chains a function to excute after the original function on the given `path` relative to `Matter`.
     * See also docs for `Common.chain`.
     * @method after
     * @param {string} path The path relative to `Matter`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */Matter.after=function(path,func){path=path.replace(/^Matter./,'');return Common.chainPathAfter(Matter,path,func);};})();},{"./Common":14,"./Plugin":20}],18:[function(_dereq_,module,exports){},{"../body/Composite":2,"./Common":14}],19:[function(_dereq_,module,exports){/**
* The `Matter.Mouse` module contains methods for creating and manipulating mouse inputs.
*
* @class Mouse
*/var Mouse={};module.exports=Mouse;var Common=_dereq_('../core/Common');(function(){/**
     * Creates a mouse input.
     * @method create
     * @param {HTMLElement} element
     * @return {mouse} A new mouse
     */Mouse.create=function(element){var mouse={};if(!element){Common.log('Mouse.create: element was undefined, defaulting to document.body','warn');}mouse.element=element||document.body;mouse.absolute={x:0,y:0};mouse.position={x:0,y:0};mouse.mousedownPosition={x:0,y:0};mouse.mouseupPosition={x:0,y:0};mouse.offset={x:0,y:0};mouse.scale={x:1,y:1};mouse.wheelDelta=0;mouse.button=-1;mouse.pixelRatio=mouse.element.getAttribute('data-pixel-ratio')||1;mouse.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null};mouse.mousemove=function(event){var position=_getRelativeMousePosition(event,mouse.element,mouse.pixelRatio),touches=event.changedTouches;if(touches){mouse.button=0;event.preventDefault();}mouse.absolute.x=position.x;mouse.absolute.y=position.y;mouse.position.x=mouse.absolute.x*mouse.scale.x+mouse.offset.x;mouse.position.y=mouse.absolute.y*mouse.scale.y+mouse.offset.y;mouse.sourceEvents.mousemove=event;};mouse.mousedown=function(event){var position=_getRelativeMousePosition(event,mouse.element,mouse.pixelRatio),touches=event.changedTouches;if(touches){mouse.button=0;event.preventDefault();}else{mouse.button=event.button;}mouse.absolute.x=position.x;mouse.absolute.y=position.y;mouse.position.x=mouse.absolute.x*mouse.scale.x+mouse.offset.x;mouse.position.y=mouse.absolute.y*mouse.scale.y+mouse.offset.y;mouse.mousedownPosition.x=mouse.position.x;mouse.mousedownPosition.y=mouse.position.y;mouse.sourceEvents.mousedown=event;};mouse.mouseup=function(event){var position=_getRelativeMousePosition(event,mouse.element,mouse.pixelRatio),touches=event.changedTouches;if(touches){event.preventDefault();}mouse.button=-1;mouse.absolute.x=position.x;mouse.absolute.y=position.y;mouse.position.x=mouse.absolute.x*mouse.scale.x+mouse.offset.x;mouse.position.y=mouse.absolute.y*mouse.scale.y+mouse.offset.y;mouse.mouseupPosition.x=mouse.position.x;mouse.mouseupPosition.y=mouse.position.y;mouse.sourceEvents.mouseup=event;};mouse.mousewheel=function(event){mouse.wheelDelta=Math.max(-1,Math.min(1,event.wheelDelta||-event.detail));event.preventDefault();};Mouse.setElement(mouse,mouse.element);return mouse;};/**
     * Sets the element the mouse is bound to (and relative to).
     * @method setElement
     * @param {mouse} mouse
     * @param {HTMLElement} element
     */Mouse.setElement=function(mouse,element){mouse.element=element;element.addEventListener('mousemove',mouse.mousemove);element.addEventListener('mousedown',mouse.mousedown);element.addEventListener('mouseup',mouse.mouseup);element.addEventListener('mousewheel',mouse.mousewheel);element.addEventListener('DOMMouseScroll',mouse.mousewheel);element.addEventListener('touchmove',mouse.mousemove);element.addEventListener('touchstart',mouse.mousedown);element.addEventListener('touchend',mouse.mouseup);};/**
     * Clears all captured source events.
     * @method clearSourceEvents
     * @param {mouse} mouse
     */Mouse.clearSourceEvents=function(mouse){mouse.sourceEvents.mousemove=null;mouse.sourceEvents.mousedown=null;mouse.sourceEvents.mouseup=null;mouse.sourceEvents.mousewheel=null;mouse.wheelDelta=0;};/**
     * Sets the mouse position offset.
     * @method setOffset
     * @param {mouse} mouse
     * @param {vector} offset
     */Mouse.setOffset=function(mouse,offset){mouse.offset.x=offset.x;mouse.offset.y=offset.y;mouse.position.x=mouse.absolute.x*mouse.scale.x+mouse.offset.x;mouse.position.y=mouse.absolute.y*mouse.scale.y+mouse.offset.y;};/**
     * Sets the mouse position scale.
     * @method setScale
     * @param {mouse} mouse
     * @param {vector} scale
     */Mouse.setScale=function(mouse,scale){mouse.scale.x=scale.x;mouse.scale.y=scale.y;mouse.position.x=mouse.absolute.x*mouse.scale.x+mouse.offset.x;mouse.position.y=mouse.absolute.y*mouse.scale.y+mouse.offset.y;};/**
     * Gets the mouse position relative to an element given a screen pixel ratio.
     * @method _getRelativeMousePosition
     * @private
     * @param {} event
     * @param {} element
     * @param {number} pixelRatio
     * @return {}
     */var _getRelativeMousePosition=function _getRelativeMousePosition(event,element,pixelRatio){var elementBounds=element.getBoundingClientRect(),rootNode=document.documentElement||document.body.parentNode||document.body,scrollX=window.pageXOffset!==undefined?window.pageXOffset:rootNode.scrollLeft,scrollY=window.pageYOffset!==undefined?window.pageYOffset:rootNode.scrollTop,touches=event.changedTouches,x,y;if(touches){x=touches[0].pageX-elementBounds.left-scrollX;y=touches[0].pageY-elementBounds.top-scrollY;}else{x=event.pageX-elementBounds.left-scrollX;y=event.pageY-elementBounds.top-scrollY;}return{x:x/(element.clientWidth/(element.width||element.clientWidth)*pixelRatio),y:y/(element.clientHeight/(element.height||element.clientHeight)*pixelRatio)};};})();},{"../core/Common":14}],20:[function(_dereq_,module,exports){/**
* The `Matter.Plugin` module contains functions for registering and installing plugins on modules.
*
* @class Plugin
*/var Plugin={};module.exports=Plugin;var Common=_dereq_('./Common');(function(){Plugin._registry={};/**
     * Registers a plugin object so it can be resolved later by name.
     * @method register
     * @param plugin {} The plugin to register.
     * @return {object} The plugin.
     */Plugin.register=function(plugin){if(!Plugin.isPlugin(plugin)){Common.warn('Plugin.register:',Plugin.toString(plugin),'does not implement all required fields.');}if(plugin.name in Plugin._registry){var registered=Plugin._registry[plugin.name],pluginVersion=Plugin.versionParse(plugin.version).number,registeredVersion=Plugin.versionParse(registered.version).number;if(pluginVersion>registeredVersion){Common.warn('Plugin.register:',Plugin.toString(registered),'was upgraded to',Plugin.toString(plugin));Plugin._registry[plugin.name]=plugin;}else if(pluginVersion<registeredVersion){Common.warn('Plugin.register:',Plugin.toString(registered),'can not be downgraded to',Plugin.toString(plugin));}else if(plugin!==registered){Common.warn('Plugin.register:',Plugin.toString(plugin),'is already registered to different plugin object');}}else{Plugin._registry[plugin.name]=plugin;}return plugin;};/**
     * Resolves a dependency to a plugin object from the registry if it exists. 
     * The `dependency` may contain a version, but only the name matters when resolving.
     * @method resolve
     * @param dependency {string} The dependency.
     * @return {object} The plugin if resolved, otherwise `undefined`.
     */Plugin.resolve=function(dependency){return Plugin._registry[Plugin.dependencyParse(dependency).name];};/**
     * Returns a pretty printed plugin name and version.
     * @method toString
     * @param plugin {} The plugin.
     * @return {string} Pretty printed plugin name and version.
     */Plugin.toString=function(plugin){return typeof plugin==='string'?plugin:(plugin.name||'anonymous')+'@'+(plugin.version||plugin.range||'0.0.0');};/**
     * Returns `true` if the object meets the minimum standard to be considered a plugin.
     * This means it must define the following properties:
     * - `name`
     * - `version`
     * - `install`
     * @method isPlugin
     * @param obj {} The obj to test.
     * @return {boolean} `true` if the object can be considered a plugin otherwise `false`.
     */Plugin.isPlugin=function(obj){return obj&&obj.name&&obj.version&&obj.install;};/**
     * Returns `true` if a plugin with the given `name` been installed on `module`.
     * @method isUsed
     * @param module {} The module.
     * @param name {string} The plugin name.
     * @return {boolean} `true` if a plugin with the given `name` been installed on `module`, otherwise `false`.
     */Plugin.isUsed=function(module,name){return module.used.indexOf(name)>-1;};/**
     * Returns `true` if `plugin.for` is applicable to `module` by comparing against `module.name` and `module.version`.
     * If `plugin.for` is not specified then it is assumed to be applicable.
     * The value of `plugin.for` is a string of the format `'module-name'` or `'module-name@version'`.
     * @method isFor
     * @param plugin {} The plugin.
     * @param module {} The module.
     * @return {boolean} `true` if `plugin.for` is applicable to `module`, otherwise `false`.
     */Plugin.isFor=function(plugin,module){var parsed=plugin.for&&Plugin.dependencyParse(plugin.for);return!plugin.for||module.name===parsed.name&&Plugin.versionSatisfies(module.version,parsed.range);};/**
     * Installs the plugins by calling `plugin.install` on each plugin specified in `plugins` if passed, otherwise `module.uses`.
     * For installing plugins on `Matter` see the convenience function `Matter.use`.
     * Plugins may be specified either by their name or a reference to the plugin object.
     * Plugins themselves may specify further dependencies, but each plugin is installed only once.
     * Order is important, a topological sort is performed to find the best resulting order of installation.
     * This sorting attempts to satisfy every dependency's requested ordering, but may not be exact in all cases.
     * This function logs the resulting status of each dependency in the console, along with any warnings.
     * - A green tick ✅ indicates a dependency was resolved and installed.
     * - An orange diamond 🔶 indicates a dependency was resolved but a warning was thrown for it or one if its dependencies.
     * - A red cross ❌ indicates a dependency could not be resolved.
     * Avoid calling this function multiple times on the same module unless you intend to manually control installation order.
     * @method use
     * @param module {} The module install plugins on.
     * @param [plugins=module.uses] {} The plugins to install on module (optional, defaults to `module.uses`).
     */Plugin.use=function(module,plugins){module.uses=(module.uses||[]).concat(plugins||[]);if(module.uses.length===0){Common.warn('Plugin.use:',Plugin.toString(module),'does not specify any dependencies to install.');return;}var dependencies=Plugin.dependencies(module),sortedDependencies=Common.topologicalSort(dependencies),status=[];for(var i=0;i<sortedDependencies.length;i+=1){if(sortedDependencies[i]===module.name){continue;}var plugin=Plugin.resolve(sortedDependencies[i]);if(!plugin){status.push('❌ '+sortedDependencies[i]);continue;}if(Plugin.isUsed(module,plugin.name)){continue;}if(!Plugin.isFor(plugin,module)){Common.warn('Plugin.use:',Plugin.toString(plugin),'is for',plugin.for,'but installed on',Plugin.toString(module)+'.');plugin._warned=true;}if(plugin.install){plugin.install(module);}else{Common.warn('Plugin.use:',Plugin.toString(plugin),'does not specify an install function.');plugin._warned=true;}if(plugin._warned){status.push('🔶 '+Plugin.toString(plugin));delete plugin._warned;}else{status.push('✅ '+Plugin.toString(plugin));}module.used.push(plugin.name);}if(status.length>0){Common.info(status.join('  '));}};/**
     * Recursively finds all of a module's dependencies and returns a flat dependency graph.
     * @method dependencies
     * @param module {} The module.
     * @return {object} A dependency graph.
     */Plugin.dependencies=function(module,tracked){var parsedBase=Plugin.dependencyParse(module),name=parsedBase.name;tracked=tracked||{};if(name in tracked){return;}module=Plugin.resolve(module)||module;tracked[name]=Common.map(module.uses||[],function(dependency){if(Plugin.isPlugin(dependency)){Plugin.register(dependency);}var parsed=Plugin.dependencyParse(dependency),resolved=Plugin.resolve(dependency);if(resolved&&!Plugin.versionSatisfies(resolved.version,parsed.range)){Common.warn('Plugin.dependencies:',Plugin.toString(resolved),'does not satisfy',Plugin.toString(parsed),'used by',Plugin.toString(parsedBase)+'.');resolved._warned=true;module._warned=true;}else if(!resolved){Common.warn('Plugin.dependencies:',Plugin.toString(dependency),'used by',Plugin.toString(parsedBase),'could not be resolved.');module._warned=true;}return parsed.name;});for(var i=0;i<tracked[name].length;i+=1){Plugin.dependencies(tracked[name][i],tracked);}return tracked;};/**
     * Parses a dependency string into its components.
     * The `dependency` is a string of the format `'module-name'` or `'module-name@version'`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * This function can also handle dependencies that are already resolved (e.g. a module object).
     * @method dependencyParse
     * @param dependency {string} The dependency of the format `'module-name'` or `'module-name@version'`.
     * @return {object} The dependency parsed into its components.
     */Plugin.dependencyParse=function(dependency){if(Common.isString(dependency)){var pattern=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;if(!pattern.test(dependency)){Common.warn('Plugin.dependencyParse:',dependency,'is not a valid dependency string.');}return{name:dependency.split('@')[0],range:dependency.split('@')[1]||'*'};}return{name:dependency.name,range:dependency.range||dependency.version};};/**
     * Parses a version string into its components.  
     * Versions are strictly of the format `x.y.z` (as in [semver](http://semver.org/)).
     * Versions may optionally have a prerelease tag in the format `x.y.z-alpha`.
     * Ranges are a strict subset of [npm ranges](https://docs.npmjs.com/misc/semver#advanced-range-syntax).
     * Only the following range types are supported:
     * - Tilde ranges e.g. `~1.2.3`
     * - Caret ranges e.g. `^1.2.3`
     * - Exact version e.g. `1.2.3`
     * - Any version `*`
     * @method versionParse
     * @param range {string} The version string.
     * @return {object} The version range parsed into its components.
     */Plugin.versionParse=function(range){var pattern=/^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;if(!pattern.test(range)){Common.warn('Plugin.versionParse:',range,'is not a valid version or range.');}var identifiers=range.split('-');range=identifiers[0];var isRange=isNaN(Number(range[0])),version=isRange?range.substr(1):range,parts=Common.map(version.split('.'),function(part){return Number(part);});return{isRange:isRange,version:version,range:range,operator:isRange?range[0]:'',parts:parts,prerelease:identifiers[1],number:parts[0]*1e8+parts[1]*1e4+parts[2]};};/**
     * Returns `true` if `version` satisfies the given `range`.
     * See documentation for `Plugin.versionParse` for a description of the format.
     * If a version or range is not specified, then any version (`*`) is assumed to satisfy.
     * @method versionSatisfies
     * @param version {string} The version string.
     * @param range {string} The range string.
     * @return {boolean} `true` if `version` satisfies `range`, otherwise `false`.
     */Plugin.versionSatisfies=function(version,range){range=range||'*';var rangeParsed=Plugin.versionParse(range),rangeParts=rangeParsed.parts,versionParsed=Plugin.versionParse(version),versionParts=versionParsed.parts;if(rangeParsed.isRange){if(rangeParsed.operator==='*'||version==='*'){return true;}if(rangeParsed.operator==='~'){return versionParts[0]===rangeParts[0]&&versionParts[1]===rangeParts[1]&&versionParts[2]>=rangeParts[2];}if(rangeParsed.operator==='^'){if(rangeParts[0]>0){return versionParts[0]===rangeParts[0]&&versionParsed.number>=rangeParsed.number;}if(rangeParts[1]>0){return versionParts[1]===rangeParts[1]&&versionParts[2]>=rangeParts[2];}return versionParts[2]===rangeParts[2];}}return version===range||version==='*';};})();},{"./Common":14}],21:[function(_dereq_,module,exports){/**
* The `Matter.Runner` module is an optional utility which provides a game loop, 
* that handles continuously updating a `Matter.Engine` for you within a browser.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* If you are using your own game loop instead, then you do not need the `Matter.Runner` module.
* Instead just call `Engine.update(engine, delta)` in your own loop.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Runner
*/var Runner={};module.exports=Runner;var Events=_dereq_('./Events');var Engine=_dereq_('./Engine');var Common=_dereq_('./Common');(function(){var _requestAnimationFrame,_cancelAnimationFrame;if(typeof window!=='undefined'){_requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;_cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;}if(!_requestAnimationFrame){var _frameTimeout;_requestAnimationFrame=function _requestAnimationFrame(callback){_frameTimeout=setTimeout(function(){callback(Common.now());},1000/60);};_cancelAnimationFrame=function _cancelAnimationFrame(){clearTimeout(_frameTimeout);};}/**
     * Creates a new Runner. The options parameter is an object that specifies any properties you wish to override the defaults.
     * @method create
     * @param {} options
     */Runner.create=function(options){var defaults={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:false,enabled:true};var runner=Common.extend(defaults,options);runner.delta=runner.delta||1000/runner.fps;runner.deltaMin=runner.deltaMin||1000/runner.fps;runner.deltaMax=runner.deltaMax||1000/(runner.fps*0.5);runner.fps=1000/runner.delta;return runner;};/**
     * Continuously ticks a `Matter.Engine` by calling `Runner.tick` on the `requestAnimationFrame` event.
     * @method run
     * @param {engine} engine
     */Runner.run=function(runner,engine){// create runner if engine is first argument
if(typeof runner.positionIterations!=='undefined'){engine=runner;runner=Runner.create();}(function render(time){runner.frameRequestId=_requestAnimationFrame(render);if(time&&runner.enabled){Runner.tick(runner,engine,time);}})();return runner;};/**
     * A game loop utility that updates the engine and renderer by one step (a 'tick').
     * Features delta smoothing, time correction and fixed or dynamic timing.
     * Triggers `beforeTick`, `tick` and `afterTick` events on the engine.
     * Consider just `Engine.update(engine, delta)` if you're using your own loop.
     * @method tick
     * @param {runner} runner
     * @param {engine} engine
     * @param {number} time
     */Runner.tick=function(runner,engine,time){var timing=engine.timing,correction=1,delta;// create an event object
var event={timestamp:timing.timestamp};Events.trigger(runner,'beforeTick',event);Events.trigger(engine,'beforeTick',event);// @deprecated
if(runner.isFixed){// fixed timestep
delta=runner.delta;}else{// dynamic timestep based on wall clock between calls
delta=time-runner.timePrev||runner.delta;runner.timePrev=time;// optimistically filter delta over a few frames, to improve stability
runner.deltaHistory.push(delta);runner.deltaHistory=runner.deltaHistory.slice(-runner.deltaSampleSize);delta=Math.min.apply(null,runner.deltaHistory);// limit delta
delta=delta<runner.deltaMin?runner.deltaMin:delta;delta=delta>runner.deltaMax?runner.deltaMax:delta;// correction for delta
correction=delta/runner.delta;// update engine timing object
runner.delta=delta;}// time correction for time scaling
if(runner.timeScalePrev!==0)correction*=timing.timeScale/runner.timeScalePrev;if(timing.timeScale===0)correction=0;runner.timeScalePrev=timing.timeScale;runner.correction=correction;// fps counter
runner.frameCounter+=1;if(time-runner.counterTimestamp>=1000){runner.fps=runner.frameCounter*((time-runner.counterTimestamp)/1000);runner.counterTimestamp=time;runner.frameCounter=0;}Events.trigger(runner,'tick',event);Events.trigger(engine,'tick',event);// @deprecated
// if world has been modified, clear the render scene graph
if(engine.world.isModified&&engine.render&&engine.render.controller&&engine.render.controller.clear){engine.render.controller.clear(engine.render);// @deprecated
}// update
Events.trigger(runner,'beforeUpdate',event);Engine.update(engine,delta,correction);Events.trigger(runner,'afterUpdate',event);// render
// @deprecated
if(engine.render&&engine.render.controller){Events.trigger(runner,'beforeRender',event);Events.trigger(engine,'beforeRender',event);// @deprecated
engine.render.controller.world(engine.render);Events.trigger(runner,'afterRender',event);Events.trigger(engine,'afterRender',event);// @deprecated
}Events.trigger(runner,'afterTick',event);Events.trigger(engine,'afterTick',event);// @deprecated
};/**
     * Ends execution of `Runner.run` on the given `runner`, by canceling the animation frame request event loop.
     * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
     * @method stop
     * @param {runner} runner
     */Runner.stop=function(runner){_cancelAnimationFrame(runner.frameRequestId);};/**
     * Alias for `Runner.run`.
     * @method start
     * @param {runner} runner
     * @param {engine} engine
     */Runner.start=function(runner,engine){Runner.run(runner,engine);};/*
    *
    *  Events Documentation
    *
    *//**
    * Fired at the start of a tick, before any updates to the engine or timing
    *
    * @event beforeTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after engine timing updated, but just before update
    *
    * @event tick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired at the end of a tick, after engine update and after rendering
    *
    * @event afterTick
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired before update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after update
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    *//**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    * @deprecated
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * A flag that specifies whether the runner is running or not.
     *
     * @property enabled
     * @type boolean
     * @default true
     *//**
     * A `Boolean` that specifies if the runner should use a fixed timestep (otherwise it is variable).
     * If timing is fixed, then the apparent simulation speed will change depending on the frame rate (but behaviour will be deterministic).
     * If the timing is variable, then the apparent simulation speed will be constant (approximately, but at the cost of determininism).
     *
     * @property isFixed
     * @type boolean
     * @default false
     *//**
     * A `Number` that specifies the time step between updates in milliseconds.
     * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
     * If it is `false`, then `delta` can dynamically change to maintain the correct apparent simulation speed.
     *
     * @property delta
     * @type number
     * @default 1000 / 60
     */})();},{"./Common":14,"./Engine":15,"./Events":16}],22:[function(_dereq_,module,exports){/**
* The `Matter.Sleeping` module contains methods to manage the sleeping state of bodies.
*
* @class Sleeping
*/var Sleeping={};module.exports=Sleeping;var Events=_dereq_('./Events');(function(){Sleeping._motionWakeThreshold=0.18;Sleeping._motionSleepThreshold=0.08;Sleeping._minBias=0.9;/**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} timeScale
     */Sleeping.update=function(bodies,timeScale){var timeFactor=timeScale*timeScale*timeScale;// update bodies sleeping status
for(var i=0;i<bodies.length;i++){var body=bodies[i],motion=body.speed*body.speed+body.angularSpeed*body.angularSpeed;// wake up bodies if they have a force applied
if(body.force.x!==0||body.force.y!==0){Sleeping.set(body,false);continue;}var minMotion=Math.min(body.motion,motion),maxMotion=Math.max(body.motion,motion);// biased average motion estimation between frames
body.motion=Sleeping._minBias*minMotion+(1-Sleeping._minBias)*maxMotion;if(body.sleepThreshold>0&&body.motion<Sleeping._motionSleepThreshold*timeFactor){body.sleepCounter+=1;if(body.sleepCounter>=body.sleepThreshold)Sleeping.set(body,true);}else if(body.sleepCounter>0){body.sleepCounter-=1;}}};/**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     * @param {number} timeScale
     */Sleeping.afterCollisions=function(pairs,timeScale){var timeFactor=timeScale*timeScale*timeScale;// wake up bodies involved in collisions
for(var i=0;i<pairs.length;i++){var pair=pairs[i];// don't wake inactive pairs
if(!pair.isActive)continue;var collision=pair.collision,bodyA=collision.bodyA.parent,bodyB=collision.bodyB.parent;// don't wake if at least one body is static
if(bodyA.isSleeping&&bodyB.isSleeping||bodyA.isStatic||bodyB.isStatic)continue;if(bodyA.isSleeping||bodyB.isSleeping){var sleepingBody=bodyA.isSleeping&&!bodyA.isStatic?bodyA:bodyB,movingBody=sleepingBody===bodyA?bodyB:bodyA;if(!sleepingBody.isStatic&&movingBody.motion>Sleeping._motionWakeThreshold*timeFactor){Sleeping.set(sleepingBody,false);}}}};/**
     * Set a body as sleeping or awake.
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */Sleeping.set=function(body,isSleeping){var wasSleeping=body.isSleeping;if(isSleeping){body.isSleeping=true;body.sleepCounter=body.sleepThreshold;body.positionImpulse.x=0;body.positionImpulse.y=0;body.positionPrev.x=body.position.x;body.positionPrev.y=body.position.y;body.anglePrev=body.angle;body.speed=0;body.angularSpeed=0;body.motion=0;if(!wasSleeping){Events.trigger(body,'sleepStart');}}else{body.isSleeping=false;body.sleepCounter=0;if(wasSleeping){Events.trigger(body,'sleepEnd');}}};})();},{"./Events":16}],23:[function(_dereq_,module,exports){/**
* The `Matter.Bodies` module contains factory methods for creating rigid body models 
* with commonly used body configurations (such as rectangles, circles and other polygons).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Bodies
*/// TODO: true circle bodies
var Bodies={};module.exports=Bodies;var Vertices=_dereq_('../geometry/Vertices');var Common=_dereq_('../core/Common');var Body=_dereq_('../body/Body');var Bounds=_dereq_('../geometry/Bounds');var Vector=_dereq_('../geometry/Vector');(function(){/**
     * Creates a new rigid body model with a rectangle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {object} [options]
     * @return {body} A new rectangle body
     */Bodies.rectangle=function(x,y,width,height,options){options=options||{};var rectangle={label:'Rectangle Body',position:{x:x,y:y},vertices:Vertices.fromPath('L 0 0 L '+width+' 0 L '+width+' '+height+' L 0 '+height)};if(options.chamfer){var chamfer=options.chamfer;rectangle.vertices=Vertices.chamfer(rectangle.vertices,chamfer.radius,chamfer.quality,chamfer.qualityMin,chamfer.qualityMax);delete options.chamfer;}return Body.create(Common.extend({},rectangle,options));};/**
     * Creates a new rigid body model with a trapezoid hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method trapezoid
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} slope
     * @param {object} [options]
     * @return {body} A new trapezoid body
     */Bodies.trapezoid=function(x,y,width,height,slope,options){options=options||{};slope*=0.5;var roof=(1-slope*2)*width;var x1=width*slope,x2=x1+roof,x3=x2+x1,verticesPath;if(slope<0.5){verticesPath='L 0 0 L '+x1+' '+-height+' L '+x2+' '+-height+' L '+x3+' 0';}else{verticesPath='L 0 0 L '+x2+' '+-height+' L '+x3+' 0';}var trapezoid={label:'Trapezoid Body',position:{x:x,y:y},vertices:Vertices.fromPath(verticesPath)};if(options.chamfer){var chamfer=options.chamfer;trapezoid.vertices=Vertices.chamfer(trapezoid.vertices,chamfer.radius,chamfer.quality,chamfer.qualityMin,chamfer.qualityMax);delete options.chamfer;}return Body.create(Common.extend({},trapezoid,options));};/**
     * Creates a new rigid body model with a circle hull. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {object} [options]
     * @param {number} [maxSides]
     * @return {body} A new circle body
     */Bodies.circle=function(x,y,radius,options,maxSides){options=options||{};var circle={label:'Circle Body',circleRadius:radius};// approximate circles with polygons until true circles implemented in SAT
maxSides=maxSides||25;var sides=Math.ceil(Math.max(10,Math.min(maxSides,radius)));// optimisation: always use even number of sides (half the number of unique axes)
if(sides%2===1)sides+=1;return Bodies.polygon(x,y,sides,radius,Common.extend({},circle,options));};/**
     * Creates a new rigid body model with a regular polygon hull with the given number of sides. 
     * The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method polygon
     * @param {number} x
     * @param {number} y
     * @param {number} sides
     * @param {number} radius
     * @param {object} [options]
     * @return {body} A new regular polygon body
     */Bodies.polygon=function(x,y,sides,radius,options){options=options||{};if(sides<3)return Bodies.circle(x,y,radius,options);var theta=2*Math.PI/sides,path='',offset=theta*0.5;for(var i=0;i<sides;i+=1){var angle=offset+i*theta,xx=Math.cos(angle)*radius,yy=Math.sin(angle)*radius;path+='L '+xx.toFixed(3)+' '+yy.toFixed(3)+' ';}var polygon={label:'Polygon Body',position:{x:x,y:y},vertices:Vertices.fromPath(path)};if(options.chamfer){var chamfer=options.chamfer;polygon.vertices=Vertices.chamfer(polygon.vertices,chamfer.radius,chamfer.quality,chamfer.qualityMin,chamfer.qualityMax);delete options.chamfer;}return Body.create(Common.extend({},polygon,options));};/**
     * Creates a body using the supplied vertices (or an array containing multiple sets of vertices).
     * If the vertices are convex, they will pass through as supplied.
     * Otherwise if the vertices are concave, they will be decomposed if [poly-decomp.js](https://github.com/schteppe/poly-decomp.js) is available.
     * Note that this process is not guaranteed to support complex sets of vertices (e.g. those with holes may fail).
     * By default the decomposition will discard collinear edges (to improve performance).
     * It can also optionally discard any parts that have an area less than `minimumArea`.
     * If the vertices can not be decomposed, the result will fall back to using the convex hull.
     * The options parameter is an object that specifies any `Matter.Body` properties you wish to override the defaults.
     * See the properties section of the `Matter.Body` module for detailed information on what you can pass via the `options` object.
     * @method fromVertices
     * @param {number} x
     * @param {number} y
     * @param [[vector]] vertexSets
     * @param {object} [options]
     * @param {bool} [flagInternal=false]
     * @param {number} [removeCollinear=0.01]
     * @param {number} [minimumArea=10]
     * @return {body}
     */Bodies.fromVertices=function(x,y,vertexSets,options,flagInternal,removeCollinear,minimumArea){var body,parts,isConvex,vertices,i,j,k,v,z;options=options||{};parts=[];flagInternal=typeof flagInternal!=='undefined'?flagInternal:false;removeCollinear=typeof removeCollinear!=='undefined'?removeCollinear:0.01;minimumArea=typeof minimumArea!=='undefined'?minimumArea:10;if(!window.decomp){Common.warn('Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.');}// ensure vertexSets is an array of arrays
if(!Common.isArray(vertexSets[0])){vertexSets=[vertexSets];}for(v=0;v<vertexSets.length;v+=1){vertices=vertexSets[v];isConvex=Vertices.isConvex(vertices);if(isConvex||!window.decomp){if(isConvex){vertices=Vertices.clockwiseSort(vertices);}else{// fallback to convex hull when decomposition is not possible
vertices=Vertices.hull(vertices);}parts.push({position:{x:x,y:y},vertices:vertices});}else{// initialise a decomposition
var concave=new decomp.Polygon();for(i=0;i<vertices.length;i++){concave.vertices.push([vertices[i].x,vertices[i].y]);}// vertices are concave and simple, we can decompose into parts
concave.makeCCW();if(removeCollinear!==false)concave.removeCollinearPoints(removeCollinear);// use the quick decomposition algorithm (Bayazit)
var decomposed=concave.quickDecomp();// for each decomposed chunk
for(i=0;i<decomposed.length;i++){var chunk=decomposed[i],chunkVertices=[];// convert vertices into the correct structure
for(j=0;j<chunk.vertices.length;j++){chunkVertices.push({x:chunk.vertices[j][0],y:chunk.vertices[j][1]});}// skip small chunks
if(minimumArea>0&&Vertices.area(chunkVertices)<minimumArea)continue;// create a compound part
parts.push({position:Vertices.centre(chunkVertices),vertices:chunkVertices});}}}// create body parts
for(i=0;i<parts.length;i++){parts[i]=Body.create(Common.extend(parts[i],options));}// flag internal edges (coincident part edges)
if(flagInternal){var coincident_max_dist=5;for(i=0;i<parts.length;i++){var partA=parts[i];for(j=i+1;j<parts.length;j++){var partB=parts[j];if(Bounds.overlaps(partA.bounds,partB.bounds)){var pav=partA.vertices,pbv=partB.vertices;// iterate vertices of both parts
for(k=0;k<partA.vertices.length;k++){for(z=0;z<partB.vertices.length;z++){// find distances between the vertices
var da=Vector.magnitudeSquared(Vector.sub(pav[(k+1)%pav.length],pbv[z])),db=Vector.magnitudeSquared(Vector.sub(pav[k],pbv[(z+1)%pbv.length]));// if both vertices are very close, consider the edge concident (internal)
if(da<coincident_max_dist&&db<coincident_max_dist){pav[k].isInternal=true;pbv[z].isInternal=true;}}}}}}}if(parts.length>1){// create the parent body to be returned, that contains generated compound parts
body=Body.create(Common.extend({parts:parts.slice(0)},options));Body.setPosition(body,{x:x,y:y});return body;}else{return parts[0];}};})();},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],24:[function(_dereq_,module,exports){/**
* The `Matter.Composites` module contains factory methods for creating composite bodies
* with commonly used configurations (such as stacks and chains).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Composites
*/var Composites={};module.exports=Composites;var Composite=_dereq_('../body/Composite');var Constraint=_dereq_('../constraint/Constraint');var Common=_dereq_('../core/Common');var Body=_dereq_('../body/Body');var Bodies=_dereq_('./Bodies');(function(){/**
     * Create a new composite containing bodies created in the callback in a grid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method stack
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */Composites.stack=function(xx,yy,columns,rows,columnGap,rowGap,callback){var stack=Composite.create({label:'Stack'}),x=xx,y=yy,lastBody,i=0;for(var row=0;row<rows;row++){var maxHeight=0;for(var column=0;column<columns;column++){var body=callback(x,y,column,row,lastBody,i);if(body){var bodyHeight=body.bounds.max.y-body.bounds.min.y,bodyWidth=body.bounds.max.x-body.bounds.min.x;if(bodyHeight>maxHeight)maxHeight=bodyHeight;Body.translate(body,{x:bodyWidth*0.5,y:bodyHeight*0.5});x=body.bounds.max.x+columnGap;Composite.addBody(stack,body);lastBody=body;i+=1;}else{x+=columnGap;}}y+=maxHeight+rowGap;x=xx;}return stack;};/**
     * Chains all bodies in the given composite together using constraints.
     * @method chain
     * @param {composite} composite
     * @param {number} xOffsetA
     * @param {number} yOffsetA
     * @param {number} xOffsetB
     * @param {number} yOffsetB
     * @param {object} options
     * @return {composite} A new composite containing objects chained together with constraints
     */Composites.chain=function(composite,xOffsetA,yOffsetA,xOffsetB,yOffsetB,options){var bodies=composite.bodies;for(var i=1;i<bodies.length;i++){var bodyA=bodies[i-1],bodyB=bodies[i],bodyAHeight=bodyA.bounds.max.y-bodyA.bounds.min.y,bodyAWidth=bodyA.bounds.max.x-bodyA.bounds.min.x,bodyBHeight=bodyB.bounds.max.y-bodyB.bounds.min.y,bodyBWidth=bodyB.bounds.max.x-bodyB.bounds.min.x;var defaults={bodyA:bodyA,pointA:{x:bodyAWidth*xOffsetA,y:bodyAHeight*yOffsetA},bodyB:bodyB,pointB:{x:bodyBWidth*xOffsetB,y:bodyBHeight*yOffsetB}};var constraint=Common.extend(defaults,options);Composite.addConstraint(composite,Constraint.create(constraint));}composite.label+=' Chain';return composite;};/**
     * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
     * @method mesh
     * @param {composite} composite
     * @param {number} columns
     * @param {number} rows
     * @param {boolean} crossBrace
     * @param {object} options
     * @return {composite} The composite containing objects meshed together with constraints
     */Composites.mesh=function(composite,columns,rows,crossBrace,options){var bodies=composite.bodies,row,col,bodyA,bodyB,bodyC;for(row=0;row<rows;row++){for(col=1;col<columns;col++){bodyA=bodies[col-1+row*columns];bodyB=bodies[col+row*columns];Composite.addConstraint(composite,Constraint.create(Common.extend({bodyA:bodyA,bodyB:bodyB},options)));}if(row>0){for(col=0;col<columns;col++){bodyA=bodies[col+(row-1)*columns];bodyB=bodies[col+row*columns];Composite.addConstraint(composite,Constraint.create(Common.extend({bodyA:bodyA,bodyB:bodyB},options)));if(crossBrace&&col>0){bodyC=bodies[col-1+(row-1)*columns];Composite.addConstraint(composite,Constraint.create(Common.extend({bodyA:bodyC,bodyB:bodyB},options)));}if(crossBrace&&col<columns-1){bodyC=bodies[col+1+(row-1)*columns];Composite.addConstraint(composite,Constraint.create(Common.extend({bodyA:bodyC,bodyB:bodyB},options)));}}}}composite.label+=' Mesh';return composite;};/**
     * Create a new composite containing bodies created in the callback in a pyramid arrangement.
     * This function uses the body's bounds to prevent overlaps.
     * @method pyramid
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {function} callback
     * @return {composite} A new composite containing objects created in the callback
     */Composites.pyramid=function(xx,yy,columns,rows,columnGap,rowGap,callback){return Composites.stack(xx,yy,columns,rows,columnGap,rowGap,function(x,y,column,row,lastBody,i){var actualRows=Math.min(rows,Math.ceil(columns/2)),lastBodyWidth=lastBody?lastBody.bounds.max.x-lastBody.bounds.min.x:0;if(row>actualRows)return;// reverse row order
row=actualRows-row;var start=row,end=columns-1-row;if(column<start||column>end)return;// retroactively fix the first body's position, since width was unknown
if(i===1){Body.translate(lastBody,{x:(column+(columns%2===1?1:-1))*lastBodyWidth,y:0});}var xOffset=lastBody?column*lastBodyWidth:0;return callback(xx+xOffset+column*columnGap,y,column,row,lastBody,i);});};/**
     * Creates a composite with a Newton's Cradle setup of bodies and constraints.
     * @method newtonsCradle
     * @param {number} xx
     * @param {number} yy
     * @param {number} number
     * @param {number} size
     * @param {number} length
     * @return {composite} A new composite newtonsCradle body
     */Composites.newtonsCradle=function(xx,yy,number,size,length){var newtonsCradle=Composite.create({label:'Newtons Cradle'});for(var i=0;i<number;i++){var separation=1.9,circle=Bodies.circle(xx+i*(size*separation),yy+length,size,{inertia:Infinity,restitution:1,friction:0,frictionAir:0.0001,slop:1}),constraint=Constraint.create({pointA:{x:xx+i*(size*separation),y:yy},bodyB:circle});Composite.addBody(newtonsCradle,circle);Composite.addConstraint(newtonsCradle,constraint);}return newtonsCradle;};/**
     * Creates a composite with simple car setup of bodies and constraints.
     * @method car
     * @param {number} xx
     * @param {number} yy
     * @param {number} width
     * @param {number} height
     * @param {number} wheelSize
     * @return {composite} A new composite car body
     */Composites.car=function(xx,yy,width,height,wheelSize){var group=Body.nextGroup(true),wheelBase=-20,wheelAOffset=-width*0.5+wheelBase,wheelBOffset=width*0.5-wheelBase,wheelYOffset=0;var car=Composite.create({label:'Car'}),body=Bodies.trapezoid(xx,yy,width,height,0.3,{collisionFilter:{group:group},friction:0.01,chamfer:{radius:10}});var wheelA=Bodies.circle(xx+wheelAOffset,yy+wheelYOffset,wheelSize,{collisionFilter:{group:group},friction:0.8,density:0.01});var wheelB=Bodies.circle(xx+wheelBOffset,yy+wheelYOffset,wheelSize,{collisionFilter:{group:group},friction:0.8,density:0.01});var axelA=Constraint.create({bodyA:body,pointA:{x:wheelAOffset,y:wheelYOffset},bodyB:wheelA,stiffness:0.2});var axelB=Constraint.create({bodyA:body,pointA:{x:wheelBOffset,y:wheelYOffset},bodyB:wheelB,stiffness:0.2});Composite.addBody(car,body);Composite.addBody(car,wheelA);Composite.addBody(car,wheelB);Composite.addConstraint(car,axelA);Composite.addConstraint(car,axelB);return car;};/**
     * Creates a simple soft body like object.
     * @method softBody
     * @param {number} xx
     * @param {number} yy
     * @param {number} columns
     * @param {number} rows
     * @param {number} columnGap
     * @param {number} rowGap
     * @param {boolean} crossBrace
     * @param {number} particleRadius
     * @param {} particleOptions
     * @param {} constraintOptions
     * @return {composite} A new composite softBody
     */Composites.softBody=function(xx,yy,columns,rows,columnGap,rowGap,crossBrace,particleRadius,particleOptions,constraintOptions){particleOptions=Common.extend({inertia:Infinity},particleOptions);constraintOptions=Common.extend({stiffness:0.4},constraintOptions);var softBody=Composites.stack(xx,yy,columns,rows,columnGap,rowGap,function(x,y){return Bodies.circle(x,y,particleRadius,particleOptions);});Composites.mesh(softBody,columns,rows,crossBrace,constraintOptions);softBody.label='Soft Body';return softBody;};})();},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":23}],25:[function(_dereq_,module,exports){/**
* The `Matter.Axes` module contains methods for creating and manipulating sets of axes.
*
* @class Axes
*/var Axes={};module.exports=Axes;var Vector=_dereq_('../geometry/Vector');var Common=_dereq_('../core/Common');(function(){/**
     * Creates a new set of axes from the given vertices.
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */Axes.fromVertices=function(vertices){var axes={};// find the unique axes, using edge normal gradients
for(var i=0;i<vertices.length;i++){var j=(i+1)%vertices.length,normal=Vector.normalise({x:vertices[j].y-vertices[i].y,y:vertices[i].x-vertices[j].x}),gradient=normal.y===0?Infinity:normal.x/normal.y;// limit precision
gradient=gradient.toFixed(3).toString();axes[gradient]=normal;}return Common.values(axes);};/**
     * Rotates a set of axes by the given angle.
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */Axes.rotate=function(axes,angle){if(angle===0)return;var cos=Math.cos(angle),sin=Math.sin(angle);for(var i=0;i<axes.length;i++){var axis=axes[i],xx;xx=axis.x*cos-axis.y*sin;axis.y=axis.x*sin+axis.y*cos;axis.x=xx;}};})();},{"../core/Common":14,"../geometry/Vector":28}],26:[function(_dereq_,module,exports){/**
* The `Matter.Bounds` module contains methods for creating and manipulating axis-aligned bounding boxes (AABB).
*
* @class Bounds
*/var Bounds={};module.exports=Bounds;(function(){/**
     * Creates a new axis-aligned bounding box (AABB) for the given vertices.
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */Bounds.create=function(vertices){var bounds={min:{x:0,y:0},max:{x:0,y:0}};if(vertices)Bounds.update(bounds,vertices);return bounds;};/**
     * Updates bounds using the given vertices and extends the bounds given a velocity.
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */Bounds.update=function(bounds,vertices,velocity){bounds.min.x=Infinity;bounds.max.x=-Infinity;bounds.min.y=Infinity;bounds.max.y=-Infinity;for(var i=0;i<vertices.length;i++){var vertex=vertices[i];if(vertex.x>bounds.max.x)bounds.max.x=vertex.x;if(vertex.x<bounds.min.x)bounds.min.x=vertex.x;if(vertex.y>bounds.max.y)bounds.max.y=vertex.y;if(vertex.y<bounds.min.y)bounds.min.y=vertex.y;}if(velocity){if(velocity.x>0){bounds.max.x+=velocity.x;}else{bounds.min.x+=velocity.x;}if(velocity.y>0){bounds.max.y+=velocity.y;}else{bounds.min.y+=velocity.y;}}};/**
     * Returns true if the bounds contains the given point.
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */Bounds.contains=function(bounds,point){return point.x>=bounds.min.x&&point.x<=bounds.max.x&&point.y>=bounds.min.y&&point.y<=bounds.max.y;};/**
     * Returns true if the two bounds intersect.
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */Bounds.overlaps=function(boundsA,boundsB){return boundsA.min.x<=boundsB.max.x&&boundsA.max.x>=boundsB.min.x&&boundsA.max.y>=boundsB.min.y&&boundsA.min.y<=boundsB.max.y;};/**
     * Translates the bounds by the given vector.
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */Bounds.translate=function(bounds,vector){bounds.min.x+=vector.x;bounds.max.x+=vector.x;bounds.min.y+=vector.y;bounds.max.y+=vector.y;};/**
     * Shifts the bounds to the given position.
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */Bounds.shift=function(bounds,position){var deltaX=bounds.max.x-bounds.min.x,deltaY=bounds.max.y-bounds.min.y;bounds.min.x=position.x;bounds.max.x=position.x+deltaX;bounds.min.y=position.y;bounds.max.y=position.y+deltaY;};})();},{}],27:[function(_dereq_,module,exports){/**
* The `Matter.Svg` module contains methods for converting SVG images into an array of vector points.
*
* To use this module you also need the SVGPathSeg polyfill: https://github.com/progers/pathseg
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Svg
*/var Svg={};module.exports=Svg;var Bounds=_dereq_('../geometry/Bounds');(function(){/**
     * Converts an SVG path into an array of vector points.
     * If the input path forms a concave shape, you must decompose the result into convex parts before use.
     * See `Bodies.fromVertices` which provides support for this.
     * Note that this function is not guaranteed to support complex paths (such as those with holes).
     * @method pathToVertices
     * @param {SVGPathElement} path
     * @param {Number} [sampleLength=15]
     * @return {Vector[]} points
     */Svg.pathToVertices=function(path,sampleLength){// https://github.com/wout/svg.topoly.js/blob/master/svg.topoly.js
var i,il,total,point,segment,segments,segmentsQueue,lastSegment,lastPoint,segmentIndex,points=[],lx,ly,length=0,x=0,y=0;sampleLength=sampleLength||15;var addPoint=function addPoint(px,py,pathSegType){// all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
var isRelative=pathSegType%2===1&&pathSegType>1;// when the last point doesn't equal the current point add the current point
if(!lastPoint||px!=lastPoint.x||py!=lastPoint.y){if(lastPoint&&isRelative){lx=lastPoint.x;ly=lastPoint.y;}else{lx=0;ly=0;}var point={x:lx+px,y:ly+py};// set last point
if(isRelative||!lastPoint){lastPoint=point;}points.push(point);x=lx+px;y=ly+py;}};var addSegmentPoint=function addSegmentPoint(segment){var segType=segment.pathSegTypeAsLetter.toUpperCase();// skip path ends
if(segType==='Z')return;// map segment to x and y
switch(segType){case'M':case'L':case'T':case'C':case'S':case'Q':x=segment.x;y=segment.y;break;case'H':x=segment.x;break;case'V':y=segment.y;break;}addPoint(x,y,segment.pathSegType);};// ensure path is absolute
_svgPathToAbsolute(path);// get total length
total=path.getTotalLength();// queue segments
segments=[];for(i=0;i<path.pathSegList.numberOfItems;i+=1){segments.push(path.pathSegList.getItem(i));}segmentsQueue=segments.concat();// sample through path
while(length<total){// get segment at position
segmentIndex=path.getPathSegAtLength(length);segment=segments[segmentIndex];// new segment
if(segment!=lastSegment){while(segmentsQueue.length&&segmentsQueue[0]!=segment){addSegmentPoint(segmentsQueue.shift());}lastSegment=segment;}// add points in between when curving
// TODO: adaptive sampling
switch(segment.pathSegTypeAsLetter.toUpperCase()){case'C':case'T':case'S':case'Q':case'A':point=path.getPointAtLength(length);addPoint(point.x,point.y,0);break;}// increment by sample value
length+=sampleLength;}// add remaining segments not passed by sampling
for(i=0,il=segmentsQueue.length;i<il;++i){addSegmentPoint(segmentsQueue[i]);}return points;};var _svgPathToAbsolute=function _svgPathToAbsolute(path){// http://phrogz.net/convert-svg-path-to-all-absolute-commands
var x0,y0,x1,y1,x2,y2,segs=path.pathSegList,x=0,y=0,len=segs.numberOfItems;for(var i=0;i<len;++i){var seg=segs.getItem(i),segType=seg.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(segType)){if('x'in seg)x=seg.x;if('y'in seg)y=seg.y;}else{if('x1'in seg)x1=x+seg.x1;if('x2'in seg)x2=x+seg.x2;if('y1'in seg)y1=y+seg.y1;if('y2'in seg)y2=y+seg.y2;if('x'in seg)x+=seg.x;if('y'in seg)y+=seg.y;switch(segType){case'm':segs.replaceItem(path.createSVGPathSegMovetoAbs(x,y),i);break;case'l':segs.replaceItem(path.createSVGPathSegLinetoAbs(x,y),i);break;case'h':segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x),i);break;case'v':segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y),i);break;case'c':segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x,y,x1,y1,x2,y2),i);break;case's':segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x,y,x2,y2),i);break;case'q':segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x,y,x1,y1),i);break;case't':segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x,y),i);break;case'a':segs.replaceItem(path.createSVGPathSegArcAbs(x,y,seg.r1,seg.r2,seg.angle,seg.largeArcFlag,seg.sweepFlag),i);break;case'z':case'Z':x=x0;y=y0;break;}}if(segType=='M'||segType=='m'){x0=x;y0=y;}}};})();},{"../geometry/Bounds":26}],28:[function(_dereq_,module,exports){/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vector
*/// TODO: consider params for reusing vector objects
var Vector={};module.exports=Vector;(function(){/**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */Vector.create=function(x,y){return{x:x||0,y:y||0};};/**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */Vector.clone=function(vector){return{x:vector.x,y:vector.y};};/**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */Vector.magnitude=function(vector){return Math.sqrt(vector.x*vector.x+vector.y*vector.y);};/**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */Vector.magnitudeSquared=function(vector){return vector.x*vector.x+vector.y*vector.y;};/**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @return {vector} A new vector rotated about (0, 0)
     */Vector.rotate=function(vector,angle){var cos=Math.cos(angle),sin=Math.sin(angle);return{x:vector.x*cos-vector.y*sin,y:vector.x*sin+vector.y*cos};};/**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */Vector.rotateAbout=function(vector,angle,point,output){var cos=Math.cos(angle),sin=Math.sin(angle);if(!output)output={};var x=point.x+((vector.x-point.x)*cos-(vector.y-point.y)*sin);output.y=point.y+((vector.x-point.x)*sin+(vector.y-point.y)*cos);output.x=x;return output;};/**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */Vector.normalise=function(vector){var magnitude=Vector.magnitude(vector);if(magnitude===0)return{x:0,y:0};return{x:vector.x/magnitude,y:vector.y/magnitude};};/**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */Vector.dot=function(vectorA,vectorB){return vectorA.x*vectorB.x+vectorA.y*vectorB.y;};/**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */Vector.cross=function(vectorA,vectorB){return vectorA.x*vectorB.y-vectorA.y*vectorB.x;};/**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */Vector.cross3=function(vectorA,vectorB,vectorC){return(vectorB.x-vectorA.x)*(vectorC.y-vectorA.y)-(vectorB.y-vectorA.y)*(vectorC.x-vectorA.x);};/**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */Vector.add=function(vectorA,vectorB,output){if(!output)output={};output.x=vectorA.x+vectorB.x;output.y=vectorA.y+vectorB.y;return output;};/**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */Vector.sub=function(vectorA,vectorB,output){if(!output)output={};output.x=vectorA.x-vectorB.x;output.y=vectorA.y-vectorB.y;return output;};/**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */Vector.mult=function(vector,scalar){return{x:vector.x*scalar,y:vector.y*scalar};};/**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */Vector.div=function(vector,scalar){return{x:vector.x/scalar,y:vector.y/scalar};};/**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */Vector.perp=function(vector,negate){negate=negate===true?-1:1;return{x:negate*-vector.y,y:negate*vector.x};};/**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */Vector.neg=function(vector){return{x:-vector.x,y:-vector.y};};/**
     * Returns the angle in radians between the two vectors relative to the x-axis.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */Vector.angle=function(vectorA,vectorB){return Math.atan2(vectorB.y-vectorA.y,vectorB.x-vectorA.x);};/**
     * Temporary vector pool (not thread-safe).
     * @property _temp
     * @type {vector[]}
     * @private
     */Vector._temp=[Vector.create(),Vector.create(),Vector.create(),Vector.create(),Vector.create(),Vector.create()];})();},{}],29:[function(_dereq_,module,exports){/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See the included usage [examples](https://github.com/liabru/matter-js/tree/master/examples).
*
* @class Vertices
*/var Vertices={};module.exports=Vertices;var Vector=_dereq_('../geometry/Vector');var Common=_dereq_('../core/Common');(function(){/**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Vertices must be specified in clockwise order.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */Vertices.create=function(points,body){var vertices=[];for(var i=0;i<points.length;i++){var point=points[i],vertex={x:point.x,y:point.y,index:i,body:body,isInternal:false};vertices.push(vertex);}return vertices;};/**
     * Parses a string containing ordered x y pairs separated by spaces (and optionally commas), 
     * into a `Matter.Vertices` object for the given `Matter.Body`.
     * For parsing SVG paths, see `Svg.pathToVertices`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */Vertices.fromPath=function(path,body){var pathPattern=/L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/ig,points=[];path.replace(pathPattern,function(match,x,y){points.push({x:parseFloat(x),y:parseFloat(y)});});return Vertices.create(points,body);};/**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */Vertices.centre=function(vertices){var area=Vertices.area(vertices,true),centre={x:0,y:0},cross,temp,j;for(var i=0;i<vertices.length;i++){j=(i+1)%vertices.length;cross=Vector.cross(vertices[i],vertices[j]);temp=Vector.mult(Vector.add(vertices[i],vertices[j]),cross);centre=Vector.add(centre,temp);}return Vector.div(centre,6*area);};/**
     * Returns the average (mean) of the set of vertices.
     * @method mean
     * @param {vertices} vertices
     * @return {vector} The average point
     */Vertices.mean=function(vertices){var average={x:0,y:0};for(var i=0;i<vertices.length;i++){average.x+=vertices[i].x;average.y+=vertices[i].y;}return Vector.div(average,vertices.length);};/**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */Vertices.area=function(vertices,signed){var area=0,j=vertices.length-1;for(var i=0;i<vertices.length;i++){area+=(vertices[j].x-vertices[i].x)*(vertices[j].y+vertices[i].y);j=i;}if(signed)return area/2;return Math.abs(area)/2;};/**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */Vertices.inertia=function(vertices,mass){var numerator=0,denominator=0,v=vertices,cross,j;// find the polygon's moment of inertia, using second moment of area
// http://www.physicsforums.com/showthread.php?t=25293
for(var n=0;n<v.length;n++){j=(n+1)%v.length;cross=Math.abs(Vector.cross(v[j],v[n]));numerator+=cross*(Vector.dot(v[j],v[j])+Vector.dot(v[j],v[n])+Vector.dot(v[n],v[n]));denominator+=cross;}return mass/6*(numerator/denominator);};/**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */Vertices.translate=function(vertices,vector,scalar){var i;if(scalar){for(i=0;i<vertices.length;i++){vertices[i].x+=vector.x*scalar;vertices[i].y+=vector.y*scalar;}}else{for(i=0;i<vertices.length;i++){vertices[i].x+=vector.x;vertices[i].y+=vector.y;}}return vertices;};/**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */Vertices.rotate=function(vertices,angle,point){if(angle===0)return;var cos=Math.cos(angle),sin=Math.sin(angle);for(var i=0;i<vertices.length;i++){var vertice=vertices[i],dx=vertice.x-point.x,dy=vertice.y-point.y;vertice.x=point.x+(dx*cos-dy*sin);vertice.y=point.y+(dx*sin+dy*cos);}return vertices;};/**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */Vertices.contains=function(vertices,point){for(var i=0;i<vertices.length;i++){var vertice=vertices[i],nextVertice=vertices[(i+1)%vertices.length];if((point.x-vertice.x)*(nextVertice.y-vertice.y)+(point.y-vertice.y)*(vertice.x-nextVertice.x)>0){return false;}}return true;};/**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */Vertices.scale=function(vertices,scaleX,scaleY,point){if(scaleX===1&&scaleY===1)return vertices;point=point||Vertices.centre(vertices);var vertex,delta;for(var i=0;i<vertices.length;i++){vertex=vertices[i];delta=Vector.sub(vertex,point);vertices[i].x=point.x+delta.x*scaleX;vertices[i].y=point.y+delta.y*scaleY;}return vertices;};/**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */Vertices.chamfer=function(vertices,radius,quality,qualityMin,qualityMax){radius=radius||[8];if(!radius.length)radius=[radius];// quality defaults to -1, which is auto
quality=typeof quality!=='undefined'?quality:-1;qualityMin=qualityMin||2;qualityMax=qualityMax||14;var newVertices=[];for(var i=0;i<vertices.length;i++){var prevVertex=vertices[i-1>=0?i-1:vertices.length-1],vertex=vertices[i],nextVertex=vertices[(i+1)%vertices.length],currentRadius=radius[i<radius.length?i:radius.length-1];if(currentRadius===0){newVertices.push(vertex);continue;}var prevNormal=Vector.normalise({x:vertex.y-prevVertex.y,y:prevVertex.x-vertex.x});var nextNormal=Vector.normalise({x:nextVertex.y-vertex.y,y:vertex.x-nextVertex.x});var diagonalRadius=Math.sqrt(2*Math.pow(currentRadius,2)),radiusVector=Vector.mult(Common.clone(prevNormal),currentRadius),midNormal=Vector.normalise(Vector.mult(Vector.add(prevNormal,nextNormal),0.5)),scaledVertex=Vector.sub(vertex,Vector.mult(midNormal,diagonalRadius));var precision=quality;if(quality===-1){// automatically decide precision
precision=Math.pow(currentRadius,0.32)*1.75;}precision=Common.clamp(precision,qualityMin,qualityMax);// use an even value for precision, more likely to reduce axes by using symmetry
if(precision%2===1)precision+=1;var alpha=Math.acos(Vector.dot(prevNormal,nextNormal)),theta=alpha/precision;for(var j=0;j<precision;j++){newVertices.push(Vector.add(Vector.rotate(radiusVector,theta*j),scaledVertex));}}return newVertices;};/**
     * Sorts the input vertices into clockwise order in place.
     * @method clockwiseSort
     * @param {vertices} vertices
     * @return {vertices} vertices
     */Vertices.clockwiseSort=function(vertices){var centre=Vertices.mean(vertices);vertices.sort(function(vertexA,vertexB){return Vector.angle(centre,vertexA)-Vector.angle(centre,vertexB);});return vertices;};/**
     * Returns true if the vertices form a convex shape (vertices must be in clockwise order).
     * @method isConvex
     * @param {vertices} vertices
     * @return {bool} `true` if the `vertices` are convex, `false` if not (or `null` if not computable).
     */Vertices.isConvex=function(vertices){// http://paulbourke.net/geometry/polygonmesh/
var flag=0,n=vertices.length,i,j,k,z;if(n<3)return null;for(i=0;i<n;i++){j=(i+1)%n;k=(i+2)%n;z=(vertices[j].x-vertices[i].x)*(vertices[k].y-vertices[j].y);z-=(vertices[j].y-vertices[i].y)*(vertices[k].x-vertices[j].x);if(z<0){flag|=1;}else if(z>0){flag|=2;}if(flag===3){return false;}}if(flag!==0){return true;}else{return null;}};/**
     * Returns the convex hull of the input vertices as a new array of points.
     * @method hull
     * @param {vertices} vertices
     * @return [vertex] vertices
     */Vertices.hull=function(vertices){// http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
var upper=[],lower=[],vertex,i;// sort vertices on x-axis (y-axis for ties)
vertices=vertices.slice(0);vertices.sort(function(vertexA,vertexB){var dx=vertexA.x-vertexB.x;return dx!==0?dx:vertexA.y-vertexB.y;});// build lower hull
for(i=0;i<vertices.length;i++){vertex=vertices[i];while(lower.length>=2&&Vector.cross3(lower[lower.length-2],lower[lower.length-1],vertex)<=0){lower.pop();}lower.push(vertex);}// build upper hull
for(i=vertices.length-1;i>=0;i--){vertex=vertices[i];while(upper.length>=2&&Vector.cross3(upper[upper.length-2],upper[upper.length-1],vertex)<=0){upper.pop();}upper.push(vertex);}// concatenation of the lower and upper hulls gives the convex hull
// omit last points because they are repeated at the beginning of the other list
upper.pop();lower.pop();return upper.concat(lower);};})();},{"../core/Common":14,"../geometry/Vector":28}],30:[function(_dereq_,module,exports){var Matter=module.exports=_dereq_('../core/Matter');Matter.Body=_dereq_('../body/Body');Matter.Composite=_dereq_('../body/Composite');Matter.World=_dereq_('../body/World');Matter.Contact=_dereq_('../collision/Contact');Matter.Detector=_dereq_('../collision/Detector');Matter.Grid=_dereq_('../collision/Grid');Matter.Pairs=_dereq_('../collision/Pairs');Matter.Pair=_dereq_('../collision/Pair');Matter.Query=_dereq_('../collision/Query');Matter.Resolver=_dereq_('../collision/Resolver');Matter.SAT=_dereq_('../collision/SAT');Matter.Constraint=_dereq_('../constraint/Constraint');Matter.MouseConstraint=_dereq_('../constraint/MouseConstraint');Matter.Common=_dereq_('../core/Common');Matter.Engine=_dereq_('../core/Engine');Matter.Events=_dereq_('../core/Events');Matter.Mouse=_dereq_('../core/Mouse');Matter.Runner=_dereq_('../core/Runner');Matter.Sleeping=_dereq_('../core/Sleeping');Matter.Plugin=_dereq_('../core/Plugin');Matter.Bodies=_dereq_('../factory/Bodies');Matter.Composites=_dereq_('../factory/Composites');Matter.Axes=_dereq_('../geometry/Axes');Matter.Bounds=_dereq_('../geometry/Bounds');Matter.Svg=_dereq_('../geometry/Svg');Matter.Vector=_dereq_('../geometry/Vector');Matter.Vertices=_dereq_('../geometry/Vertices');Matter.Render=_dereq_('../render/Render');Matter.RenderPixi=_dereq_('../render/RenderPixi');// aliases
Matter.World.add=Matter.Composite.add;Matter.World.remove=Matter.Composite.remove;Matter.World.addComposite=Matter.Composite.addComposite;Matter.World.addBody=Matter.Composite.addBody;Matter.World.addConstraint=Matter.Composite.addConstraint;Matter.World.clear=Matter.Composite.clear;Matter.Engine.run=Matter.Runner.run;},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Matter":17,"../core/Metrics":18,"../core/Mouse":19,"../core/Plugin":20,"../core/Runner":21,"../core/Sleeping":22,"../factory/Bodies":23,"../factory/Composites":24,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Svg":27,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31,"../render/RenderPixi":32}],31:[function(_dereq_,module,exports){/**
* The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
* It is intended for development and debugging purposes, but may also be suitable for simple games.
* It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
*
* @class Render
*/var Render={};module.exports=Render;var Common=_dereq_('../core/Common');var Composite=_dereq_('../body/Composite');var Bounds=_dereq_('../geometry/Bounds');var Events=_dereq_('../core/Events');var Grid=_dereq_('../collision/Grid');var Vector=_dereq_('../geometry/Vector');(function(){var _requestAnimationFrame,_cancelAnimationFrame;if(typeof window!=='undefined'){_requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(function(){callback(Common.now());},1000/60);};_cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;}/**
     * Creates a new renderer. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properties section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {object} [options]
     * @return {render} A new renderer
     */Render.create=function(options){var defaults={controller:Render,engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,options:{width:800,height:600,pixelRatio:1,background:'#fafafa',wireframeBackground:'#222',hasBounds:!!options.bounds,enabled:true,wireframes:true,showSleeping:true,showDebug:false,showBroadphase:false,showBounds:false,showVelocity:false,showCollisions:false,showSeparations:false,showAxes:false,showPositions:false,showAngleIndicator:false,showIds:false,showShadows:false,showVertexNumbers:false,showConvexHulls:false,showInternalEdges:false,showMousePosition:false}};var render=Common.extend(defaults,options);if(render.canvas){render.canvas.width=render.options.width||render.canvas.width;render.canvas.height=render.options.height||render.canvas.height;}render.mouse=options.mouse;render.engine=options.engine;render.canvas=render.canvas||_createCanvas(render.options.width,render.options.height);render.context=render.canvas.getContext('2d');render.textures={};render.bounds=render.bounds||{min:{x:0,y:0},max:{x:render.canvas.width,y:render.canvas.height}};if(render.options.pixelRatio!==1){Render.setPixelRatio(render,render.options.pixelRatio);}if(Common.isElement(render.element)){render.element.appendChild(render.canvas);}else{Common.log('Render.create: options.element was undefined, render.canvas was created but not appended','warn');}return render;};/**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     */Render.run=function(render){(function loop(time){render.frameRequestId=_requestAnimationFrame(loop);Render.world(render);})();};/**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     */Render.stop=function(render){_cancelAnimationFrame(render.frameRequestId);};/**
     * Sets the pixel ratio of the renderer and updates the canvas.
     * To automatically detect the correct ratio, pass the string `'auto'` for `pixelRatio`.
     * @method setPixelRatio
     * @param {render} render
     * @param {number} pixelRatio
     */Render.setPixelRatio=function(render,pixelRatio){var options=render.options,canvas=render.canvas;if(pixelRatio==='auto'){pixelRatio=_getPixelRatio(canvas);}options.pixelRatio=pixelRatio;canvas.setAttribute('data-pixel-ratio',pixelRatio);canvas.width=options.width*pixelRatio;canvas.height=options.height*pixelRatio;canvas.style.width=options.width+'px';canvas.style.height=options.height+'px';render.context.scale(pixelRatio,pixelRatio);};/**
     * Renders the given `engine`'s `Matter.World` object.
     * This is the entry point for all rendering and should be called every time the scene changes.
     * @method world
     * @param {render} render
     */Render.world=function(render){var engine=render.engine,world=engine.world,canvas=render.canvas,context=render.context,options=render.options,allBodies=Composite.allBodies(world),allConstraints=Composite.allConstraints(world),background=options.wireframes?options.wireframeBackground:options.background,bodies=[],constraints=[],i;var event={timestamp:engine.timing.timestamp};Events.trigger(render,'beforeRender',event);// apply background if it has changed
if(render.currentBackground!==background)_applyBackground(render,background);// clear the canvas with a transparent fill, to allow the canvas background to show
context.globalCompositeOperation='source-in';context.fillStyle="transparent";context.fillRect(0,0,canvas.width,canvas.height);context.globalCompositeOperation='source-over';// handle bounds
if(options.hasBounds){var boundsWidth=render.bounds.max.x-render.bounds.min.x,boundsHeight=render.bounds.max.y-render.bounds.min.y,boundsScaleX=boundsWidth/options.width,boundsScaleY=boundsHeight/options.height;// filter out bodies that are not in view
for(i=0;i<allBodies.length;i++){var body=allBodies[i];if(Bounds.overlaps(body.bounds,render.bounds))bodies.push(body);}// filter out constraints that are not in view
for(i=0;i<allConstraints.length;i++){var constraint=allConstraints[i],bodyA=constraint.bodyA,bodyB=constraint.bodyB,pointAWorld=constraint.pointA,pointBWorld=constraint.pointB;if(bodyA)pointAWorld=Vector.add(bodyA.position,constraint.pointA);if(bodyB)pointBWorld=Vector.add(bodyB.position,constraint.pointB);if(!pointAWorld||!pointBWorld)continue;if(Bounds.contains(render.bounds,pointAWorld)||Bounds.contains(render.bounds,pointBWorld))constraints.push(constraint);}// transform the view
context.scale(1/boundsScaleX,1/boundsScaleY);context.translate(-render.bounds.min.x,-render.bounds.min.y);}else{constraints=allConstraints;bodies=allBodies;}if(!options.wireframes||engine.enableSleeping&&options.showSleeping){// fully featured rendering of bodies
Render.bodies(render,bodies,context);}else{if(options.showConvexHulls)Render.bodyConvexHulls(render,bodies,context);// optimised method for wireframes only
Render.bodyWireframes(render,bodies,context);}if(options.showBounds)Render.bodyBounds(render,bodies,context);if(options.showAxes||options.showAngleIndicator)Render.bodyAxes(render,bodies,context);if(options.showPositions)Render.bodyPositions(render,bodies,context);if(options.showVelocity)Render.bodyVelocity(render,bodies,context);if(options.showIds)Render.bodyIds(render,bodies,context);if(options.showSeparations)Render.separations(render,engine.pairs.list,context);if(options.showCollisions)Render.collisions(render,engine.pairs.list,context);if(options.showVertexNumbers)Render.vertexNumbers(render,bodies,context);if(options.showMousePosition)Render.mousePosition(render,render.mouse,context);Render.constraints(constraints,context);if(options.showBroadphase&&engine.broadphase.controller===Grid)Render.grid(render,engine.broadphase,context);if(options.showDebug)Render.debug(render,context);if(options.hasBounds){// revert view transforms
context.setTransform(options.pixelRatio,0,0,options.pixelRatio,0,0);}Events.trigger(render,'afterRender',event);};/**
     * Description
     * @private
     * @method debug
     * @param {render} render
     * @param {RenderingContext} context
     */Render.debug=function(render,context){var c=context,engine=render.engine,world=engine.world,metrics=engine.metrics,options=render.options,bodies=Composite.allBodies(world),space="    ";if(engine.timing.timestamp-(render.debugTimestamp||0)>=500){var text="";if(metrics.timing){text+="fps: "+Math.round(metrics.timing.fps)+space;}render.debugString=text;render.debugTimestamp=engine.timing.timestamp;}if(render.debugString){c.font="12px Arial";if(options.wireframes){c.fillStyle='rgba(255,255,255,0.5)';}else{c.fillStyle='rgba(0,0,0,0.5)';}var split=render.debugString.split('\n');for(var i=0;i<split.length;i++){c.fillText(split[i],50,50+i*18);}}};/**
     * Description
     * @private
     * @method constraints
     * @param {constraint[]} constraints
     * @param {RenderingContext} context
     */Render.constraints=function(constraints,context){var c=context;for(var i=0;i<constraints.length;i++){var constraint=constraints[i];if(!constraint.render.visible||!constraint.pointA||!constraint.pointB)continue;var bodyA=constraint.bodyA,bodyB=constraint.bodyB;if(bodyA){c.beginPath();c.moveTo(bodyA.position.x+constraint.pointA.x,bodyA.position.y+constraint.pointA.y);}else{c.beginPath();c.moveTo(constraint.pointA.x,constraint.pointA.y);}if(bodyB){c.lineTo(bodyB.position.x+constraint.pointB.x,bodyB.position.y+constraint.pointB.y);}else{c.lineTo(constraint.pointB.x,constraint.pointB.y);}c.lineWidth=constraint.render.lineWidth;c.strokeStyle=constraint.render.strokeStyle;c.stroke();}};/**
     * Description
     * @private
     * @method bodyShadows
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyShadows=function(render,bodies,context){var c=context,engine=render.engine;for(var i=0;i<bodies.length;i++){var body=bodies[i];if(!body.render.visible)continue;if(body.circleRadius){c.beginPath();c.arc(body.position.x,body.position.y,body.circleRadius,0,2*Math.PI);c.closePath();}else{c.beginPath();c.moveTo(body.vertices[0].x,body.vertices[0].y);for(var j=1;j<body.vertices.length;j++){c.lineTo(body.vertices[j].x,body.vertices[j].y);}c.closePath();}var distanceX=body.position.x-render.options.width*0.5,distanceY=body.position.y-render.options.height*0.2,distance=Math.abs(distanceX)+Math.abs(distanceY);c.shadowColor='rgba(0,0,0,0.15)';c.shadowOffsetX=0.05*distanceX;c.shadowOffsetY=0.05*distanceY;c.shadowBlur=1+12*Math.min(1,distance/1000);c.fill();c.shadowColor=null;c.shadowOffsetX=null;c.shadowOffsetY=null;c.shadowBlur=null;}};/**
     * Description
     * @private
     * @method bodies
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodies=function(render,bodies,context){var c=context,engine=render.engine,options=render.options,showInternalEdges=options.showInternalEdges||!options.wireframes,body,part,i,k;for(i=0;i<bodies.length;i++){body=bodies[i];if(!body.render.visible)continue;// handle compound parts
for(k=body.parts.length>1?1:0;k<body.parts.length;k++){part=body.parts[k];if(!part.render.visible)continue;if(options.showSleeping&&body.isSleeping){c.globalAlpha=0.5*part.render.opacity;}else if(part.render.opacity!==1){c.globalAlpha=part.render.opacity;}if(part.render.sprite&&part.render.sprite.texture&&!options.wireframes){// part sprite
var sprite=part.render.sprite,texture=_getTexture(render,sprite.texture);c.translate(part.position.x,part.position.y);c.rotate(part.angle);c.drawImage(texture,texture.width*-sprite.xOffset*sprite.xScale,texture.height*-sprite.yOffset*sprite.yScale,texture.width*sprite.xScale,texture.height*sprite.yScale);// revert translation, hopefully faster than save / restore
c.rotate(-part.angle);c.translate(-part.position.x,-part.position.y);}else{// part polygon
if(part.circleRadius){c.beginPath();c.arc(part.position.x,part.position.y,part.circleRadius,0,2*Math.PI);}else{c.beginPath();c.moveTo(part.vertices[0].x,part.vertices[0].y);for(var j=1;j<part.vertices.length;j++){if(!part.vertices[j-1].isInternal||showInternalEdges){c.lineTo(part.vertices[j].x,part.vertices[j].y);}else{c.moveTo(part.vertices[j].x,part.vertices[j].y);}if(part.vertices[j].isInternal&&!showInternalEdges){c.moveTo(part.vertices[(j+1)%part.vertices.length].x,part.vertices[(j+1)%part.vertices.length].y);}}c.lineTo(part.vertices[0].x,part.vertices[0].y);c.closePath();}if(!options.wireframes){c.fillStyle=part.render.fillStyle;c.lineWidth=part.render.lineWidth;c.strokeStyle=part.render.strokeStyle;c.fill();}else{c.lineWidth=1;c.strokeStyle='#bbb';}c.stroke();}c.globalAlpha=1;}}};/**
     * Optimised method for drawing body wireframes in one pass
     * @private
     * @method bodyWireframes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyWireframes=function(render,bodies,context){var c=context,showInternalEdges=render.options.showInternalEdges,body,part,i,j,k;c.beginPath();// render all bodies
for(i=0;i<bodies.length;i++){body=bodies[i];if(!body.render.visible)continue;// handle compound parts
for(k=body.parts.length>1?1:0;k<body.parts.length;k++){part=body.parts[k];c.moveTo(part.vertices[0].x,part.vertices[0].y);for(j=1;j<part.vertices.length;j++){if(!part.vertices[j-1].isInternal||showInternalEdges){c.lineTo(part.vertices[j].x,part.vertices[j].y);}else{c.moveTo(part.vertices[j].x,part.vertices[j].y);}if(part.vertices[j].isInternal&&!showInternalEdges){c.moveTo(part.vertices[(j+1)%part.vertices.length].x,part.vertices[(j+1)%part.vertices.length].y);}}c.lineTo(part.vertices[0].x,part.vertices[0].y);}}c.lineWidth=1;c.strokeStyle='#bbb';c.stroke();};/**
     * Optimised method for drawing body convex hull wireframes in one pass
     * @private
     * @method bodyConvexHulls
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyConvexHulls=function(render,bodies,context){var c=context,body,part,i,j,k;c.beginPath();// render convex hulls
for(i=0;i<bodies.length;i++){body=bodies[i];if(!body.render.visible||body.parts.length===1)continue;c.moveTo(body.vertices[0].x,body.vertices[0].y);for(j=1;j<body.vertices.length;j++){c.lineTo(body.vertices[j].x,body.vertices[j].y);}c.lineTo(body.vertices[0].x,body.vertices[0].y);}c.lineWidth=1;c.strokeStyle='rgba(255,255,255,0.2)';c.stroke();};/**
     * Renders body vertex numbers.
     * @private
     * @method vertexNumbers
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.vertexNumbers=function(render,bodies,context){var c=context,i,j,k;for(i=0;i<bodies.length;i++){var parts=bodies[i].parts;for(k=parts.length>1?1:0;k<parts.length;k++){var part=parts[k];for(j=0;j<part.vertices.length;j++){c.fillStyle='rgba(255,255,255,0.2)';c.fillText(i+'_'+j,part.position.x+(part.vertices[j].x-part.position.x)*0.8,part.position.y+(part.vertices[j].y-part.position.y)*0.8);}}}};/**
     * Renders mouse position.
     * @private
     * @method mousePosition
     * @param {render} render
     * @param {mouse} mouse
     * @param {RenderingContext} context
     */Render.mousePosition=function(render,mouse,context){var c=context;c.fillStyle='rgba(255,255,255,0.8)';c.fillText(mouse.position.x+'  '+mouse.position.y,mouse.position.x+5,mouse.position.y-5);};/**
     * Draws body bounds
     * @private
     * @method bodyBounds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyBounds=function(render,bodies,context){var c=context,engine=render.engine,options=render.options;c.beginPath();for(var i=0;i<bodies.length;i++){var body=bodies[i];if(body.render.visible){var parts=bodies[i].parts;for(var j=parts.length>1?1:0;j<parts.length;j++){var part=parts[j];c.rect(part.bounds.min.x,part.bounds.min.y,part.bounds.max.x-part.bounds.min.x,part.bounds.max.y-part.bounds.min.y);}}}if(options.wireframes){c.strokeStyle='rgba(255,255,255,0.08)';}else{c.strokeStyle='rgba(0,0,0,0.1)';}c.lineWidth=1;c.stroke();};/**
     * Draws body angle indicators and axes
     * @private
     * @method bodyAxes
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyAxes=function(render,bodies,context){var c=context,engine=render.engine,options=render.options,part,i,j,k;c.beginPath();for(i=0;i<bodies.length;i++){var body=bodies[i],parts=body.parts;if(!body.render.visible)continue;if(options.showAxes){// render all axes
for(j=parts.length>1?1:0;j<parts.length;j++){part=parts[j];for(k=0;k<part.axes.length;k++){var axis=part.axes[k];c.moveTo(part.position.x,part.position.y);c.lineTo(part.position.x+axis.x*20,part.position.y+axis.y*20);}}}else{for(j=parts.length>1?1:0;j<parts.length;j++){part=parts[j];for(k=0;k<part.axes.length;k++){// render a single axis indicator
c.moveTo(part.position.x,part.position.y);c.lineTo((part.vertices[0].x+part.vertices[part.vertices.length-1].x)/2,(part.vertices[0].y+part.vertices[part.vertices.length-1].y)/2);}}}}if(options.wireframes){c.strokeStyle='indianred';}else{c.strokeStyle='rgba(0,0,0,0.8)';c.globalCompositeOperation='overlay';}c.lineWidth=1;c.stroke();c.globalCompositeOperation='source-over';};/**
     * Draws body positions
     * @private
     * @method bodyPositions
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyPositions=function(render,bodies,context){var c=context,engine=render.engine,options=render.options,body,part,i,k;c.beginPath();// render current positions
for(i=0;i<bodies.length;i++){body=bodies[i];if(!body.render.visible)continue;// handle compound parts
for(k=0;k<body.parts.length;k++){part=body.parts[k];c.arc(part.position.x,part.position.y,3,0,2*Math.PI,false);c.closePath();}}if(options.wireframes){c.fillStyle='indianred';}else{c.fillStyle='rgba(0,0,0,0.5)';}c.fill();c.beginPath();// render previous positions
for(i=0;i<bodies.length;i++){body=bodies[i];if(body.render.visible){c.arc(body.positionPrev.x,body.positionPrev.y,2,0,2*Math.PI,false);c.closePath();}}c.fillStyle='rgba(255,165,0,0.8)';c.fill();};/**
     * Draws body velocity
     * @private
     * @method bodyVelocity
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyVelocity=function(render,bodies,context){var c=context;c.beginPath();for(var i=0;i<bodies.length;i++){var body=bodies[i];if(!body.render.visible)continue;c.moveTo(body.position.x,body.position.y);c.lineTo(body.position.x+(body.position.x-body.positionPrev.x)*2,body.position.y+(body.position.y-body.positionPrev.y)*2);}c.lineWidth=3;c.strokeStyle='cornflowerblue';c.stroke();};/**
     * Draws body ids
     * @private
     * @method bodyIds
     * @param {render} render
     * @param {body[]} bodies
     * @param {RenderingContext} context
     */Render.bodyIds=function(render,bodies,context){var c=context,i,j;for(i=0;i<bodies.length;i++){if(!bodies[i].render.visible)continue;var parts=bodies[i].parts;for(j=parts.length>1?1:0;j<parts.length;j++){var part=parts[j];c.font="12px Arial";c.fillStyle='rgba(255,255,255,0.5)';c.fillText(part.id,part.position.x+10,part.position.y-10);}}};/**
     * Description
     * @private
     * @method collisions
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */Render.collisions=function(render,pairs,context){var c=context,options=render.options,pair,collision,corrected,bodyA,bodyB,i,j;c.beginPath();// render collision positions
for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive)continue;collision=pair.collision;for(j=0;j<pair.activeContacts.length;j++){var contact=pair.activeContacts[j],vertex=contact.vertex;c.rect(vertex.x-1.5,vertex.y-1.5,3.5,3.5);}}if(options.wireframes){c.fillStyle='rgba(255,255,255,0.7)';}else{c.fillStyle='orange';}c.fill();c.beginPath();// render collision normals
for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive)continue;collision=pair.collision;if(pair.activeContacts.length>0){var normalPosX=pair.activeContacts[0].vertex.x,normalPosY=pair.activeContacts[0].vertex.y;if(pair.activeContacts.length===2){normalPosX=(pair.activeContacts[0].vertex.x+pair.activeContacts[1].vertex.x)/2;normalPosY=(pair.activeContacts[0].vertex.y+pair.activeContacts[1].vertex.y)/2;}if(collision.bodyB===collision.supports[0].body||collision.bodyA.isStatic===true){c.moveTo(normalPosX-collision.normal.x*8,normalPosY-collision.normal.y*8);}else{c.moveTo(normalPosX+collision.normal.x*8,normalPosY+collision.normal.y*8);}c.lineTo(normalPosX,normalPosY);}}if(options.wireframes){c.strokeStyle='rgba(255,165,0,0.7)';}else{c.strokeStyle='orange';}c.lineWidth=1;c.stroke();};/**
     * Description
     * @private
     * @method separations
     * @param {render} render
     * @param {pair[]} pairs
     * @param {RenderingContext} context
     */Render.separations=function(render,pairs,context){var c=context,options=render.options,pair,collision,corrected,bodyA,bodyB,i,j;c.beginPath();// render separations
for(i=0;i<pairs.length;i++){pair=pairs[i];if(!pair.isActive)continue;collision=pair.collision;bodyA=collision.bodyA;bodyB=collision.bodyB;var k=1;if(!bodyB.isStatic&&!bodyA.isStatic)k=0.5;if(bodyB.isStatic)k=0;c.moveTo(bodyB.position.x,bodyB.position.y);c.lineTo(bodyB.position.x-collision.penetration.x*k,bodyB.position.y-collision.penetration.y*k);k=1;if(!bodyB.isStatic&&!bodyA.isStatic)k=0.5;if(bodyA.isStatic)k=0;c.moveTo(bodyA.position.x,bodyA.position.y);c.lineTo(bodyA.position.x+collision.penetration.x*k,bodyA.position.y+collision.penetration.y*k);}if(options.wireframes){c.strokeStyle='rgba(255,165,0,0.5)';}else{c.strokeStyle='orange';}c.stroke();};/**
     * Description
     * @private
     * @method grid
     * @param {render} render
     * @param {grid} grid
     * @param {RenderingContext} context
     */Render.grid=function(render,grid,context){var c=context,options=render.options;if(options.wireframes){c.strokeStyle='rgba(255,180,0,0.1)';}else{c.strokeStyle='rgba(255,180,0,0.5)';}c.beginPath();var bucketKeys=Common.keys(grid.buckets);for(var i=0;i<bucketKeys.length;i++){var bucketId=bucketKeys[i];if(grid.buckets[bucketId].length<2)continue;var region=bucketId.split(',');c.rect(0.5+parseInt(region[0],10)*grid.bucketWidth,0.5+parseInt(region[1],10)*grid.bucketHeight,grid.bucketWidth,grid.bucketHeight);}c.lineWidth=1;c.stroke();};/**
     * Description
     * @private
     * @method inspector
     * @param {inspector} inspector
     * @param {RenderingContext} context
     */Render.inspector=function(inspector,context){var engine=inspector.engine,selected=inspector.selected,render=inspector.render,options=render.options,bounds;if(options.hasBounds){var boundsWidth=render.bounds.max.x-render.bounds.min.x,boundsHeight=render.bounds.max.y-render.bounds.min.y,boundsScaleX=boundsWidth/render.options.width,boundsScaleY=boundsHeight/render.options.height;context.scale(1/boundsScaleX,1/boundsScaleY);context.translate(-render.bounds.min.x,-render.bounds.min.y);}for(var i=0;i<selected.length;i++){var item=selected[i].data;context.translate(0.5,0.5);context.lineWidth=1;context.strokeStyle='rgba(255,165,0,0.9)';context.setLineDash([1,2]);switch(item.type){case'body':// render body selections
bounds=item.bounds;context.beginPath();context.rect(Math.floor(bounds.min.x-3),Math.floor(bounds.min.y-3),Math.floor(bounds.max.x-bounds.min.x+6),Math.floor(bounds.max.y-bounds.min.y+6));context.closePath();context.stroke();break;case'constraint':// render constraint selections
var point=item.pointA;if(item.bodyA)point=item.pointB;context.beginPath();context.arc(point.x,point.y,10,0,2*Math.PI);context.closePath();context.stroke();break;}context.setLineDash([]);context.translate(-0.5,-0.5);}// render selection region
if(inspector.selectStart!==null){context.translate(0.5,0.5);context.lineWidth=1;context.strokeStyle='rgba(255,165,0,0.6)';context.fillStyle='rgba(255,165,0,0.1)';bounds=inspector.selectBounds;context.beginPath();context.rect(Math.floor(bounds.min.x),Math.floor(bounds.min.y),Math.floor(bounds.max.x-bounds.min.x),Math.floor(bounds.max.y-bounds.min.y));context.closePath();context.stroke();context.fill();context.translate(-0.5,-0.5);}if(options.hasBounds)context.setTransform(1,0,0,1,0,0);};/**
     * Description
     * @method _createCanvas
     * @private
     * @param {} width
     * @param {} height
     * @return canvas
     */var _createCanvas=function _createCanvas(width,height){var canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;canvas.oncontextmenu=function(){return false;};canvas.onselectstart=function(){return false;};return canvas;};/**
     * Gets the pixel ratio of the canvas.
     * @method _getPixelRatio
     * @private
     * @param {HTMLElement} canvas
     * @return {Number} pixel ratio
     */var _getPixelRatio=function _getPixelRatio(canvas){var context=canvas.getContext('2d'),devicePixelRatio=window.devicePixelRatio||1,backingStorePixelRatio=context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||context.backingStorePixelRatio||1;return devicePixelRatio/backingStorePixelRatio;};/**
     * Gets the requested texture (an Image) via its path
     * @method _getTexture
     * @private
     * @param {render} render
     * @param {string} imagePath
     * @return {Image} texture
     */var _getTexture=function _getTexture(render,imagePath){var image=render.textures[imagePath];if(image)return image;image=render.textures[imagePath]=new Image();image.src=imagePath;return image;};/**
     * Applies the background to the canvas using CSS.
     * @method applyBackground
     * @private
     * @param {render} render
     * @param {string} background
     */var _applyBackground=function _applyBackground(render,background){var cssBackground=background;if(/(jpg|gif|png)$/.test(background))cssBackground='url('+background+')';render.canvas.style.background=cssBackground;render.canvas.style.backgroundSize="contain";render.currentBackground=background;};/*
    *
    *  Events Documentation
    *
    *//**
    * Fired before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {number} event.timestamp The engine.timing.timestamp of the event
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    *//*
    *
    *  Properties Documentation
    *
    *//**
     * A back-reference to the `Matter.Render` module.
     *
     * @property controller
     * @type render
     *//**
     * A reference to the `Matter.Engine` instance to be used.
     *
     * @property engine
     * @type engine
     *//**
     * A reference to the element where the canvas is to be inserted (if `render.canvas` has not been specified)
     *
     * @property element
     * @type HTMLElement
     * @default null
     *//**
     * The canvas element to render to. If not specified, one will be created if `render.element` has been specified.
     *
     * @property canvas
     * @type HTMLCanvasElement
     * @default null
     *//**
     * The configuration options of the renderer.
     *
     * @property options
     * @type {}
     *//**
     * The target width in pixels of the `render.canvas` to be created.
     *
     * @property options.width
     * @type number
     * @default 800
     *//**
     * The target height in pixels of the `render.canvas` to be created.
     *
     * @property options.height
     * @type number
     * @default 600
     *//**
     * A flag that specifies if `render.bounds` should be used when rendering.
     *
     * @property options.hasBounds
     * @type boolean
     * @default false
     *//**
     * A `Bounds` object that specifies the drawing view region. 
     * Rendering will be automatically transformed and scaled to fit within the canvas size (`render.options.width` and `render.options.height`).
     * This allows for creating views that can pan or zoom around the scene.
     * You must also set `render.options.hasBounds` to `true` to enable bounded rendering.
     *
     * @property bounds
     * @type bounds
     *//**
     * The 2d rendering context from the `render.canvas` element.
     *
     * @property context
     * @type CanvasRenderingContext2D
     *//**
     * The sprite texture cache.
     *
     * @property textures
     * @type {}
     */})();},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}],32:[function(_dereq_,module,exports){/**
* The `Matter.RenderPixi` module is an example renderer using pixi.js.
* See also `Matter.Render` for a canvas based renderer.
*
* @class RenderPixi
* @deprecated the Matter.RenderPixi module will soon be removed from the Matter.js core.
* It will likely be moved to its own repository (but maintenance will be limited).
*/var RenderPixi={};module.exports=RenderPixi;var Bounds=_dereq_('../geometry/Bounds');var Composite=_dereq_('../body/Composite');var Common=_dereq_('../core/Common');var Events=_dereq_('../core/Events');var Vector=_dereq_('../geometry/Vector');(function(){var _requestAnimationFrame,_cancelAnimationFrame;if(typeof window!=='undefined'){_requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(function(){callback(Common.now());},1000/60);};_cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame;}/**
     * Creates a new Pixi.js WebGL renderer
     * @method create
     * @param {object} options
     * @return {RenderPixi} A new renderer
     * @deprecated
     */RenderPixi.create=function(options){Common.warn('RenderPixi.create: Matter.RenderPixi is deprecated (see docs)');var defaults={controller:RenderPixi,engine:null,element:null,frameRequestId:null,canvas:null,renderer:null,container:null,spriteContainer:null,pixiOptions:null,options:{width:800,height:600,background:'#fafafa',wireframeBackground:'#222',hasBounds:false,enabled:true,wireframes:true,showSleeping:true,showDebug:false,showBroadphase:false,showBounds:false,showVelocity:false,showCollisions:false,showAxes:false,showPositions:false,showAngleIndicator:false,showIds:false,showShadows:false}};var render=Common.extend(defaults,options),transparent=!render.options.wireframes&&render.options.background==='transparent';// init pixi
render.pixiOptions=render.pixiOptions||{view:render.canvas,transparent:transparent,antialias:true,backgroundColor:options.background};render.mouse=options.mouse;render.engine=options.engine;render.renderer=render.renderer||new PIXI.WebGLRenderer(render.options.width,render.options.height,render.pixiOptions);render.container=render.container||new PIXI.Container();render.spriteContainer=render.spriteContainer||new PIXI.Container();render.canvas=render.canvas||render.renderer.view;render.bounds=render.bounds||{min:{x:0,y:0},max:{x:render.options.width,y:render.options.height}};// event listeners
Events.on(render.engine,'beforeUpdate',function(){RenderPixi.clear(render);});// caches
render.textures={};render.sprites={};render.primitives={};// use a sprite batch for performance
render.container.addChild(render.spriteContainer);// insert canvas
if(Common.isElement(render.element)){render.element.appendChild(render.canvas);}else{Common.warn('No "render.element" passed, "render.canvas" was not inserted into document.');}// prevent menus on canvas
render.canvas.oncontextmenu=function(){return false;};render.canvas.onselectstart=function(){return false;};return render;};/**
     * Continuously updates the render canvas on the `requestAnimationFrame` event.
     * @method run
     * @param {render} render
     * @deprecated
     */RenderPixi.run=function(render){(function loop(time){render.frameRequestId=_requestAnimationFrame(loop);RenderPixi.world(render);})();};/**
     * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
     * @method stop
     * @param {render} render
     * @deprecated
     */RenderPixi.stop=function(render){_cancelAnimationFrame(render.frameRequestId);};/**
     * Clears the scene graph
     * @method clear
     * @param {RenderPixi} render
     * @deprecated
     */RenderPixi.clear=function(render){var container=render.container,spriteContainer=render.spriteContainer;// clear stage container
while(container.children[0]){container.removeChild(container.children[0]);}// clear sprite batch
while(spriteContainer.children[0]){spriteContainer.removeChild(spriteContainer.children[0]);}var bgSprite=render.sprites['bg-0'];// clear caches
render.textures={};render.sprites={};render.primitives={};// set background sprite
render.sprites['bg-0']=bgSprite;if(bgSprite)container.addChildAt(bgSprite,0);// add sprite batch back into container
render.container.addChild(render.spriteContainer);// reset background state
render.currentBackground=null;// reset bounds transforms
container.scale.set(1,1);container.position.set(0,0);};/**
     * Sets the background of the canvas 
     * @method setBackground
     * @param {RenderPixi} render
     * @param {string} background
     * @deprecated
     */RenderPixi.setBackground=function(render,background){if(render.currentBackground!==background){var isColor=background.indexOf&&background.indexOf('#')!==-1,bgSprite=render.sprites['bg-0'];if(isColor){// if solid background color
var color=Common.colorToNumber(background);render.renderer.backgroundColor=color;// remove background sprite if existing
if(bgSprite)render.container.removeChild(bgSprite);}else{// initialise background sprite if needed
if(!bgSprite){var texture=_getTexture(render,background);bgSprite=render.sprites['bg-0']=new PIXI.Sprite(texture);bgSprite.position.x=0;bgSprite.position.y=0;render.container.addChildAt(bgSprite,0);}}render.currentBackground=background;}};/**
     * Description
     * @method world
     * @param {engine} engine
     * @deprecated
     */RenderPixi.world=function(render){var engine=render.engine,world=engine.world,renderer=render.renderer,container=render.container,options=render.options,bodies=Composite.allBodies(world),allConstraints=Composite.allConstraints(world),constraints=[],i;if(options.wireframes){RenderPixi.setBackground(render,options.wireframeBackground);}else{RenderPixi.setBackground(render,options.background);}// handle bounds
var boundsWidth=render.bounds.max.x-render.bounds.min.x,boundsHeight=render.bounds.max.y-render.bounds.min.y,boundsScaleX=boundsWidth/render.options.width,boundsScaleY=boundsHeight/render.options.height;if(options.hasBounds){// Hide bodies that are not in view
for(i=0;i<bodies.length;i++){var body=bodies[i];body.render.sprite.visible=Bounds.overlaps(body.bounds,render.bounds);}// filter out constraints that are not in view
for(i=0;i<allConstraints.length;i++){var constraint=allConstraints[i],bodyA=constraint.bodyA,bodyB=constraint.bodyB,pointAWorld=constraint.pointA,pointBWorld=constraint.pointB;if(bodyA)pointAWorld=Vector.add(bodyA.position,constraint.pointA);if(bodyB)pointBWorld=Vector.add(bodyB.position,constraint.pointB);if(!pointAWorld||!pointBWorld)continue;if(Bounds.contains(render.bounds,pointAWorld)||Bounds.contains(render.bounds,pointBWorld))constraints.push(constraint);}// transform the view
container.scale.set(1/boundsScaleX,1/boundsScaleY);container.position.set(-render.bounds.min.x*(1/boundsScaleX),-render.bounds.min.y*(1/boundsScaleY));}else{constraints=allConstraints;}for(i=0;i<bodies.length;i++){RenderPixi.body(render,bodies[i]);}for(i=0;i<constraints.length;i++){RenderPixi.constraint(render,constraints[i]);}renderer.render(container);};/**
     * Description
     * @method constraint
     * @param {engine} engine
     * @param {constraint} constraint
     * @deprecated
     */RenderPixi.constraint=function(render,constraint){var engine=render.engine,bodyA=constraint.bodyA,bodyB=constraint.bodyB,pointA=constraint.pointA,pointB=constraint.pointB,container=render.container,constraintRender=constraint.render,primitiveId='c-'+constraint.id,primitive=render.primitives[primitiveId];// initialise constraint primitive if not existing
if(!primitive)primitive=render.primitives[primitiveId]=new PIXI.Graphics();// don't render if constraint does not have two end points
if(!constraintRender.visible||!constraint.pointA||!constraint.pointB){primitive.clear();return;}// add to scene graph if not already there
if(Common.indexOf(container.children,primitive)===-1)container.addChild(primitive);// render the constraint on every update, since they can change dynamically
primitive.clear();primitive.beginFill(0,0);primitive.lineStyle(constraintRender.lineWidth,Common.colorToNumber(constraintRender.strokeStyle),1);if(bodyA){primitive.moveTo(bodyA.position.x+pointA.x,bodyA.position.y+pointA.y);}else{primitive.moveTo(pointA.x,pointA.y);}if(bodyB){primitive.lineTo(bodyB.position.x+pointB.x,bodyB.position.y+pointB.y);}else{primitive.lineTo(pointB.x,pointB.y);}primitive.endFill();};/**
     * Description
     * @method body
     * @param {engine} engine
     * @param {body} body
     * @deprecated
     */RenderPixi.body=function(render,body){var engine=render.engine,bodyRender=body.render;if(!bodyRender.visible)return;if(bodyRender.sprite&&bodyRender.sprite.texture){var spriteId='b-'+body.id,sprite=render.sprites[spriteId],spriteContainer=render.spriteContainer;// initialise body sprite if not existing
if(!sprite)sprite=render.sprites[spriteId]=_createBodySprite(render,body);// add to scene graph if not already there
if(Common.indexOf(spriteContainer.children,sprite)===-1)spriteContainer.addChild(sprite);// update body sprite
sprite.position.x=body.position.x;sprite.position.y=body.position.y;sprite.rotation=body.angle;sprite.scale.x=bodyRender.sprite.xScale||1;sprite.scale.y=bodyRender.sprite.yScale||1;}else{var primitiveId='b-'+body.id,primitive=render.primitives[primitiveId],container=render.container;// initialise body primitive if not existing
if(!primitive){primitive=render.primitives[primitiveId]=_createBodyPrimitive(render,body);primitive.initialAngle=body.angle;}// add to scene graph if not already there
if(Common.indexOf(container.children,primitive)===-1)container.addChild(primitive);// update body primitive
primitive.position.x=body.position.x;primitive.position.y=body.position.y;primitive.rotation=body.angle-primitive.initialAngle;}};/**
     * Creates a body sprite
     * @method _createBodySprite
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Sprite} sprite
     * @deprecated
     */var _createBodySprite=function _createBodySprite(render,body){var bodyRender=body.render,texturePath=bodyRender.sprite.texture,texture=_getTexture(render,texturePath),sprite=new PIXI.Sprite(texture);sprite.anchor.x=body.render.sprite.xOffset;sprite.anchor.y=body.render.sprite.yOffset;return sprite;};/**
     * Creates a body primitive
     * @method _createBodyPrimitive
     * @private
     * @param {RenderPixi} render
     * @param {body} body
     * @return {PIXI.Graphics} graphics
     * @deprecated
     */var _createBodyPrimitive=function _createBodyPrimitive(render,body){var bodyRender=body.render,options=render.options,primitive=new PIXI.Graphics(),fillStyle=Common.colorToNumber(bodyRender.fillStyle),strokeStyle=Common.colorToNumber(bodyRender.strokeStyle),strokeStyleIndicator=Common.colorToNumber(bodyRender.strokeStyle),strokeStyleWireframe=Common.colorToNumber('#bbb'),strokeStyleWireframeIndicator=Common.colorToNumber('#CD5C5C'),part;primitive.clear();// handle compound parts
for(var k=body.parts.length>1?1:0;k<body.parts.length;k++){part=body.parts[k];if(!options.wireframes){primitive.beginFill(fillStyle,1);primitive.lineStyle(bodyRender.lineWidth,strokeStyle,1);}else{primitive.beginFill(0,0);primitive.lineStyle(1,strokeStyleWireframe,1);}primitive.moveTo(part.vertices[0].x-body.position.x,part.vertices[0].y-body.position.y);for(var j=1;j<part.vertices.length;j++){primitive.lineTo(part.vertices[j].x-body.position.x,part.vertices[j].y-body.position.y);}primitive.lineTo(part.vertices[0].x-body.position.x,part.vertices[0].y-body.position.y);primitive.endFill();// angle indicator
if(options.showAngleIndicator||options.showAxes){primitive.beginFill(0,0);if(options.wireframes){primitive.lineStyle(1,strokeStyleWireframeIndicator,1);}else{primitive.lineStyle(1,strokeStyleIndicator);}primitive.moveTo(part.position.x-body.position.x,part.position.y-body.position.y);primitive.lineTo((part.vertices[0].x+part.vertices[part.vertices.length-1].x)/2-body.position.x,(part.vertices[0].y+part.vertices[part.vertices.length-1].y)/2-body.position.y);primitive.endFill();}}return primitive;};/**
     * Gets the requested texture (a PIXI.Texture) via its path
     * @method _getTexture
     * @private
     * @param {RenderPixi} render
     * @param {string} imagePath
     * @return {PIXI.Texture} texture
     * @deprecated
     */var _getTexture=function _getTexture(render,imagePath){var texture=render.textures[imagePath];if(!texture)texture=render.textures[imagePath]=PIXI.Texture.fromImage(imagePath);return texture;};})();},{"../body/Composite":2,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}]},{},[30])(30);});

/***/ },
/* 42 */
/***/ function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 10000) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

module.exports = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (global.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
    return new Function('return ' + data)();
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var url = __webpack_require__(45);
var parser = __webpack_require__(9);
var Manager = __webpack_require__(17);
var debug = __webpack_require__(1)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  } else if (opts && 'object' === _typeof(opts.query)) {
    opts.query = encodeQueryString(opts.query);
  }
  return io.socket(parsed.path, opts);
}
/**
 *  Helper method to parse query objects to string.
 * @param {object} query
 * @returns {string}
 */
function encodeQueryString(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
}
/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(17);
exports.Socket = __webpack_require__(19);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(15);
var debug = __webpack_require__(1)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

  return obj;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(7);
var isBuf = __webpack_require__(20);

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function (packet) {
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == (typeof data === 'undefined' ? 'undefined' : _typeof(data)) && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return { packet: pack, buffers: buffers };
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function (packet, buffers) {
  var curPlaceHolder = 0;

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == (typeof data === 'undefined' ? 'undefined' : _typeof(data))) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function (data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function () {
        // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        } else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if (! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) {
      // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) && !isBuf(obj)) {
      // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ },
/* 47 */
/***/ function(module, exports) {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(49);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return 'WebkitAppearance' in document.documentElement.style ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  window.console && (console.firebug || console.exception && console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  return JSON.stringify(v);
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(50);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {}
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ },
/* 50 */
/***/ function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long ? long(val) : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ },
/* 51 */
/***/ function(module, exports) {

module.exports = toArray;

function toArray(list, index) {
    var array = [];

    index = index || 0;

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i];
    }

    return array;
}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! https://mths.be/wtf8 v1.0.0 by @mathias */
;(function (root) {

	// Detect free variables `exports`
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports;

	// Detect free variable `module`
	var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) {
			// 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) {
			// 2-byte sequence
			symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
		} else if ((codePoint & 0xFFFF0000) == 0) {
			// 3-byte sequence
			symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
			symbol += createByte(codePoint, 6);
		} else if ((codePoint & 0xFFE00000) == 0) {
			// 4-byte sequence
			symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
		return symbol;
	}

	function wtf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte.
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read the first byte.
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			var byte2 = readContinuationByte();
			codePoint = (byte1 & 0x1F) << 6 | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
			if (codePoint >= 0x0800) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid WTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function wtf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var wtf8 = {
		'version': '1.0.0',
		'encode': wtf8encode,
		'decode': wtf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if ("function" == 'function' && _typeof(__webpack_require__(10)) == 'object' && __webpack_require__(10)) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return wtf8;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) {
			// in Node.js or RingoJS v0.8.0+
			freeModule.exports = wtf8;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in wtf8) {
				hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.wtf8 = wtf8;
	}
})(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21)(module), __webpack_require__(0)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scene__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(54);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__scene__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__scene__["b"]; });
/* unused harmony namespace reexport */



/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export LOG_LEVEL */
var LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return HEIGHT; });
var WIDTH = 800;
var HEIGHT = 600;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socketio__ = __webpack_require__(58);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__player__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__player__["b"]; });
/* unused harmony namespace reexport */



/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return UPDATE_PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SET_PLAYERS; });
var UPDATE_PLAYER = 'UPDATE_PLAYER';
var SET_PLAYERS = 'SET_PLAYERS';

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export CONNECTION */
var CONNECTION = 'connection';

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_matter_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_matter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_matter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(53);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PhysicEngine; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var PhysicEngine = function () {
  function PhysicEngine(options) {
    _classCallCheck(this, PhysicEngine);

    this.options = options;
    this.engine = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Engine"].create();
    this.engine.world.gravity.y = 0;
    this.engine.world.gravity.scale = 0;
  }

  _createClass(PhysicEngine, [{
    key: 'init',
    value: function init() {
      // render by default for debugging
      if (this.options.render) {
        var render = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Render"].create({
          element: document.getElementById(this.options.render),
          engine: this.engine,
          options: {
            showVelocity: true
          }
        });
        __WEBPACK_IMPORTED_MODULE_0_matter_js__["Render"].run(render);
      }
      // Add ground
      this.createGround();

      // Execute engine
      __WEBPACK_IMPORTED_MODULE_0_matter_js__["Engine"].run(this.engine);

      var ball = this.createBall();
      __WEBPACK_IMPORTED_MODULE_0_matter_js__["Body"].setVelocity(ball, { x: -4, y: 10 });
    }
  }, {
    key: 'createGround',
    value: function createGround() {
      var options = {
        isStatic: true,
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0
      };
      var bottom = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */] / 2, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */] - 10, __WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */], 5, options);
      var top = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */] / 2, 10, __WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */], 5, options);
      var left = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(10, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */] / 2, 5, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */], options);
      var right = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */] - 10, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */] / 2, 5, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */], options);
      __WEBPACK_IMPORTED_MODULE_0_matter_js__["World"].add(this.engine.world, [bottom, top, left, right]);
    }
  }, {
    key: 'createBall',
    value: function createBall() {
      var options = {
        inertia: Infinity, // avoid rotation
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        frictionStatic: 0
      };
      var ball = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].circle(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* WIDTH */] / 2, __WEBPACK_IMPORTED_MODULE_1__config__["b" /* HEIGHT */] / 2, 10, options);
      __WEBPACK_IMPORTED_MODULE_0_matter_js__["World"].add(this.engine.world, ball);
      return ball;
    }
  }, {
    key: 'createPlayer',
    value: function createPlayer(id, x, y) {
      var options = {
        id: id,
        restitution: 1,
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0
      };
      var body = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Bodies"].rectangle(x, y, 50, 5, options);
      __WEBPACK_IMPORTED_MODULE_0_matter_js__["World"].add(this.engine.world, body);
      return body;
    }
  }, {
    key: 'move',
    value: function move(direction, id) {
      var racket = __WEBPACK_IMPORTED_MODULE_0_matter_js__["Composite"].get(this.engine.world, id, 'body');
      switch (direction) {
        case 'left':
          __WEBPACK_IMPORTED_MODULE_0_matter_js__["Body"].setVelocity(racket, { x: -5, y: 0 });
          break;
        case 'right':
          __WEBPACK_IMPORTED_MODULE_0_matter_js__["Body"].setVelocity(racket, { x: 5, y: 0 });
          break;
        default:
      }
    }
  }]);

  return PhysicEngine;
}();

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__engine__["a"]; });


/***/ },
/* 61 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }
/******/ ]);