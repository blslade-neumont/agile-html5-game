/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(18));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var merge = __webpack_require__(4);
exports.TILE_SIZE = 48;
;
exports.tiles = {
    'enemy-base': {
        sprite: {
            src: 'images/enemy-base.png',
            tileset: { width: exports.TILE_SIZE, height: exports.TILE_SIZE, tilex: 0, tiley: 0 }
        },
        isSolid: true
    }
};
function addDecorationTiles(name, count, def) {
    for (var q = 0; q < count; q++) {
        var indName = "" + name + ((q && q + 1) || '');
        exports.tiles[indName] = merge({}, def, {
            sprite: {
                tileset: { tilex: q }
            }
        });
    }
}
addDecorationTiles('rock', 7, {
    sprite: {
        src: 'images/cave_floor.png',
        tileset: { width: exports.TILE_SIZE, height: exports.TILE_SIZE, tilex: 0, tiley: 0 }
    },
    isSolid: false
});
addDecorationTiles('water', 4, {
    sprite: {
        src: 'images/water_tiles.png',
        tileset: { width: exports.TILE_SIZE, height: exports.TILE_SIZE, tilex: 0, tiley: 0 }
    },
    isSolid: true
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function degToRad(deg) {
    return (deg / 180) * Math.PI;
}
exports.degToRad = degToRad;
function radToDeg(rad) {
    return (rad / Math.PI) * 180;
}
exports.radToDeg = radToDeg;
function clamp(value, lowerBound, upperBound) {
    if (lowerBound > upperBound) {
        throw new Error("Attempting to clamp with a lower bound greater than the upper bound");
    }
    if (value < lowerBound)
        value = lowerBound;
    else if (value > upperBound)
        value = upperBound;
    return value;
}
exports.clamp = clamp;
function fmod(a, b) {
    return +(a - (Math.floor(a / b) * b)).toPrecision(8);
}
exports.fmod = fmod;
function pointDirection(x1, y1, x2, y2) {
    var xdiff = x2 - x1, ydiff = y2 - y1;
    return fmod(radToDeg(Math.atan2(-ydiff, xdiff)), 360);
}
exports.pointDirection = pointDirection;
//# sourceMappingURL=math.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
exports.alives = {
    'player-south': {
        sprite: {
            src: 'images/player.png',
            tileset: { width: 32, height: 32 },
            frames: [
                { tilex: 0, tiley: 0 },
                { tilex: 1, tiley: 0 },
                { tilex: 2, tiley: 0 },
                { tilex: 1, tiley: 0 }
            ]
        }
    },
    'player-west': {
        sprite: {
            src: 'images/player.png',
            tileset: { width: 32, height: 32 },
            frames: [
                { tilex: 0, tiley: 1 },
                { tilex: 1, tiley: 1 },
                { tilex: 2, tiley: 1 },
                { tilex: 1, tiley: 1 }
            ]
        }
    },
    'player-east': {
        sprite: {
            src: 'images/player.png',
            tileset: { width: 32, height: 32 },
            frames: [
                { tilex: 0, tiley: 2 },
                { tilex: 1, tiley: 2 },
                { tilex: 2, tiley: 2 },
                { tilex: 1, tiley: 2 }
            ]
        }
    },
    'player-north': {
        sprite: {
            src: 'images/player.png',
            tileset: { width: 32, height: 32 },
            frames: [
                { tilex: 0, tiley: 3 },
                { tilex: 1, tiley: 3 },
                { tilex: 2, tiley: 3 },
                { tilex: 1, tiley: 3 }
            ]
        }
    },
    bat: {
        sprite: {
            src: 'images/bat.png',
            pivot: { x: 5, y: 1.5 },
            tileset: { width: 10, height: 3 },
            frames: [
                { tilex: 0, tiley: 0 },
                { tilex: 0, tiley: 1 }
            ],
            framesPerSecond: 4
        }
    },
    enemy: {
        sprite: {
            src: 'images/enemy.png',
            pivot: { x: 12, y: 12 }
        }
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43), __webpack_require__(44)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(2);
var Camera = (function () {
    function Camera(_scene) {
        this._scene = _scene;
        this._clearColor = null;
        this._center = [0, 0];
        this._zoomScale = 1;
        this._maxZoomScale = 4;
        this._minZoomScale = .25;
        this._smoothing = true;
        if (!this._scene)
            throw new Error("You must pass in a valid Scene when you create a Camera.");
    }
    Object.defineProperty(Camera.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "game", {
        get: function () {
            return this.scene.game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "clearColor", {
        get: function () {
            return this._clearColor;
        },
        set: function (val) {
            this._clearColor = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "center", {
        get: function () {
            return [this._center[0], this._center[1]];
        },
        set: function (_a) {
            var x = _a[0], y = _a[1];
            this._center = [x, y];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "zoomScale", {
        get: function () {
            return this._zoomScale;
        },
        set: function (val) {
            if (val <= 0)
                throw new Error("The zoom scale must be positive");
            this._zoomScale = math_1.clamp(val, this.minZoomScale, this.maxZoomScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "maxZoomScale", {
        get: function () {
            return this._maxZoomScale;
        },
        set: function (val) {
            if (val <= 0)
                throw new Error("The max zoom scale must be positive");
            if (val < this._minZoomScale)
                throw new Error("The min zoom scale is greater than the max zoom scale.");
            this._maxZoomScale = val;
            this.zoomScale = this.zoomScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "minZoomScale", {
        get: function () {
            return this._minZoomScale;
        },
        set: function (val) {
            if (val <= 0)
                throw new Error("The min zoom scale must be positive");
            if (val > this._maxZoomScale)
                throw new Error("The max zoom scale is less than the min zoom scale.");
            this._minZoomScale = val;
            this.zoomScale = this.zoomScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "enableSmoothing", {
        get: function () {
            return this._smoothing;
        },
        set: function (val) {
            this._smoothing = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "bounds", {
        get: function () {
            var _a = this.game.canvasSize, cvWidth = _a[0], cvHeight = _a[1];
            var _b = [(cvWidth / 2) / this._zoomScale, (cvHeight / 2) / this._zoomScale], hoff = _b[0], voff = _b[1];
            return {
                left: this._center[0] - hoff,
                right: this._center[0] + hoff,
                top: this._center[1] + voff,
                bottom: this._center[1] - voff
            };
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.tick = function (delta) {
    };
    Camera.prototype.push = function (context) {
        var _a = this.game.canvasSize, cvWidth = _a[0], cvHeight = _a[1];
        context.save();
        if (this._clearColor) {
            context.fillStyle = this._clearColor;
            context.fillRect(0, 0, cvWidth, cvHeight);
        }
        context.imageSmoothingEnabled = context.mozImageSmoothingEnabled = context.oImageSmoothingEnabled = context.webkitImageSmoothingEnabled = this._smoothing;
        context.translate(Math.floor(cvWidth / 2), Math.floor(cvHeight / 2));
        context.scale(this._zoomScale, this._zoomScale);
        context.translate(-Math.floor(this._center[0]), -Math.floor(this._center[1]));
    };
    Camera.prototype.pop = function (context) {
        context.restore();
    };
    return Camera;
}());
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sprite_1 = __webpack_require__(12);
var math_1 = __webpack_require__(2);
var LINE_HEIGHT = 12;
function fillText(context, text, x, y) {
    var lines = text.split('\n');
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        context.fillText(line, x, y);
        y += LINE_HEIGHT;
    }
}
exports.fillText = fillText;
function drawSprite(context, loader, sprite, x, y, imageIndex, defaultFps) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (imageIndex === void 0) { imageIndex = 0; }
    if (defaultFps === void 0) { defaultFps = 30; }
    if (!loader || !loader.loadImage)
        throw new Error("You must pass in a valid ResourceLoader to draw a sprite.");
    if (!sprite || !sprite.src)
        throw new Error("Invalid sprite. Cannot render " + sprite + ".");
    var img = loader.loadImage(sprite.src);
    var pivot = sprite.pivot || { x: 0, y: 0 };
    if (sprite_1.isAnimationSprite(sprite)) {
        var tileset = sprite.tileset;
        var frames_1 = sprite.frames;
        var fps = sprite.framesPerSecond;
        if (typeof fps === 'undefined')
            fps = defaultFps;
        var frameIdx = math_1.fmod(Math.floor(imageIndex * fps), frames_1.length);
        var frame = frames_1[frameIdx];
        context.drawImage(img, frame.tilex * tileset.width, frame.tiley * tileset.height, tileset.width, tileset.height, x - pivot.x, y - pivot.y, tileset.width, tileset.height);
    }
    else if (sprite_1.isSingleTileSprite(sprite)) {
        var tileset = sprite.tileset;
        context.drawImage(img, tileset.tilex * tileset.width, tileset.tiley * tileset.height, tileset.width, tileset.height, x - pivot.x, y - pivot.y, tileset.width, tileset.height);
    }
    else {
        context.drawImage(img, x - pivot.x, y - pivot.y);
    }
}
exports.drawSprite = drawSprite;
function measureSprite(loader, sprite) {
    if (!sprite || !sprite.src)
        throw new Error("Invalid sprite. Cannot measure " + sprite + ".");
    var img = loader && loader.loadImage(sprite.src);
    if (sprite_1.isAnimationSprite(sprite) || sprite_1.isSingleTileSprite(sprite)) {
        var _a = sprite.tileset, width = _a.width, height = _a.height;
        return { width: width, height: height };
    }
    else {
        return { width: img.width || 0, height: img.height || 0 };
    }
}
exports.measureSprite = measureSprite;
//# sourceMappingURL=render.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function pointDistance2(x1, y1, x2, y2) {
    return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
exports.pointDistance2 = pointDistance2;
function pointDistance(x1, y1, x2, y2) {
    return Math.sqrt(pointDistance2(x1, y1, x2, y2));
}
exports.pointDistance = pointDistance;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventQueue = (function () {
    function EventQueue() {
        this.DEBUG_KEYS = false;
        this.DEBUG_MOUSE = false;
        this._events = [];
        this._keys = new Map();
        this._mouseButtons = new Map();
        this._pageX = 0;
        this._pageY = 0;
        this.init();
    }
    EventQueue.prototype.init = function () {
        var body = document.getElementsByTagName('body')[0];
        this.initKeyboard(body);
        this.initMouse(body);
    };
    EventQueue.prototype.initKeyboard = function (body) {
        var _this = this;
        body.onkeydown = function (e) {
            if (_this.DEBUG_KEYS)
                console.log("Key Pressed: " + e.key + "; " + e.code);
            if (!_this.isKeyDown(e.code)) {
                _this.enqueue({
                    type: 'keyPressed',
                    code: e.code,
                    altPressed: !!e.altKey,
                    ctrlPressed: !!e.ctrlKey,
                    shiftPressed: !!e.shiftKey
                });
                _this._keys.set(e.code, true);
            }
            _this.enqueue({
                type: 'keyTyped',
                key: e.key,
                code: e.code,
                altPressed: !!e.altKey,
                ctrlPressed: !!e.ctrlKey,
                shiftPressed: !!e.shiftKey
            });
        };
        body.onkeyup = function (e) {
            if (_this.DEBUG_KEYS)
                console.log("Key Released: " + e.key + "; " + e.code);
            if (_this.isKeyDown(e.code)) {
                _this.enqueue({
                    type: 'keyReleased',
                    code: e.code,
                    altPressed: !!e.altKey,
                    ctrlPressed: !!e.ctrlKey,
                    shiftPressed: !!e.shiftKey
                });
                _this._keys.set(e.code, false);
            }
        };
    };
    EventQueue.prototype.initMouse = function (body) {
        var _this = this;
        body.onmousemove = function (e) {
            if (_this.DEBUG_MOUSE)
                console.log("Mouse moved. Movement: " + e.movementX + ", " + e.movementY + "; Position: " + e.pageX + ", " + e.pageY);
            if (typeof e.pageX !== 'undefined')
                _this._pageX = e.pageX;
            else
                _this._pageX += e.movementX;
            if (typeof e.pageY !== 'undefined')
                _this._pageY = e.pageY;
            else
                _this._pageY += e.movementY;
            _this.enqueue({
                type: 'mouseMoved',
                movementX: e.movementX,
                movementY: e.movementY,
                pageX: _this._pageX,
                pageY: _this._pageY
            });
        };
        body.onmousedown = function (e) {
            if (_this.DEBUG_MOUSE)
                console.log("Mouse button pressed. Button: " + e.button + "; Position: " + e.pageX + ", " + e.pageY);
            if (!_this.isMouseButtonDown(e.button)) {
                if (typeof e.pageX !== 'undefined')
                    _this._pageX = e.pageX;
                if (typeof e.pageY !== 'undefined')
                    _this._pageY = e.pageY;
                _this.enqueue({
                    type: 'mouseButtonPressed',
                    button: e.button,
                    pageX: _this._pageX,
                    pageY: _this._pageY
                });
                _this._mouseButtons.set(e.button, true);
            }
        };
        body.onmouseup = function (e) {
            if (_this.DEBUG_MOUSE)
                console.log("Mouse button released. Button: " + e.button + "; Position: " + e.pageX + ", " + e.pageY);
            if (_this.isMouseButtonDown(e.button)) {
                if (typeof e.pageX !== 'undefined')
                    _this._pageX = e.pageX;
                if (typeof e.pageY !== 'undefined')
                    _this._pageY = e.pageY;
                _this.enqueue({
                    type: 'mouseButtonReleased',
                    button: e.button,
                    pageX: _this._pageX,
                    pageY: _this._pageY
                });
                _this._mouseButtons.set(e.button, false);
            }
        };
        body.onwheel = function (e) {
            if (_this.DEBUG_MOUSE)
                console.log("Mouse wheel. delta: " + e.deltaY + "; Position: " + e.pageX + ", " + e.pageY);
            if (typeof e.pageX !== 'undefined')
                _this._pageX = e.pageX;
            if (typeof e.pageY !== 'undefined')
                _this._pageY = e.pageY;
            _this.enqueue({
                type: 'mouseWheel',
                delta: e.deltaY,
                pageX: _this._pageX,
                pageY: _this._pageY
            });
        };
    };
    EventQueue.prototype.isKeyDown = function (code) {
        if (!this._keys.has(code))
            return false;
        return this._keys.get(code);
    };
    EventQueue.prototype.isMouseButtonDown = function (button) {
        if (!this._mouseButtons.has(button))
            return false;
        return this._mouseButtons.get(button);
    };
    Object.defineProperty(EventQueue.prototype, "mousePosition", {
        get: function () {
            return { x: this._pageX, y: this._pageY };
        },
        enumerable: true,
        configurable: true
    });
    EventQueue.prototype.enqueue = function (e) {
        var lastEvent = this._events[this._events.length - 1];
        if (lastEvent && lastEvent.type == e.type) {
            switch (e.type) {
                case 'mouseMoved':
                    lastEvent.movementX += e.movementX;
                    lastEvent.movementY += e.movementY;
                    lastEvent.pageX = e.pageX;
                    lastEvent.pageY = e.pageY;
                    return;
                case 'mouseWheel':
                    lastEvent.delta += e.delta;
                    return;
                case 'canvasResize':
                    lastEvent.size = e.size;
                    return;
            }
        }
        this._events.push(e);
    };
    EventQueue.prototype.clearQueue = function () {
        return this._events.splice(0);
    };
    return EventQueue;
}());
exports.EventQueue = EventQueue;
//# sourceMappingURL=event-queue.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(2);
var rect_1 = __webpack_require__(11);
var render_1 = __webpack_require__(6);
;
var GameObject = (function () {
    function GameObject(name, opts) {
        if (opts === void 0) { opts = {}; }
        this.DEBUG_MOVEMENT = false;
        this._x = 0;
        this._y = 0;
        this._shouldTick = true;
        this._dir = 0;
        this._speed = 0;
        this._hspeed = 0;
        this._vspeed = 0;
        this._shouldRender = true;
        this._renderCamera = 'default';
        this._sprite = null;
        this._animationAge = 0;
        this._animationSpeed = 1;
        this._imageAngle = 0;
        this._name = name;
        if (typeof opts.x != 'undefined')
            this.x = opts.x;
        if (typeof opts.y != 'undefined')
            this.y = opts.y;
        if (typeof opts.collisionBounds != 'undefined')
            this.collisionBounds = opts.collisionBounds;
        if (typeof opts.shouldTick != 'undefined')
            this.shouldTick = opts.shouldTick;
        if (typeof opts.direction != 'undefined')
            this.direction = opts.direction;
        if (typeof opts.speed != 'undefined')
            this.speed = opts.speed;
        if (typeof opts.hspeed != 'undefined')
            this.hspeed = opts.hspeed;
        if (typeof opts.vspeed != 'undefined')
            this.vspeed = opts.vspeed;
        if (typeof opts.shouldRender != 'undefined')
            this.shouldRender = opts.shouldRender;
        if (typeof opts.renderCamera != 'undefined')
            this.renderCamera = opts.renderCamera;
        if (typeof opts.sprite != 'undefined')
            this.sprite = opts.sprite;
        if (typeof opts.animationAge != 'undefined')
            this.animationAge = opts.animationAge;
        if (typeof opts.animationSpeed != 'undefined')
            this.animationSpeed = opts.animationSpeed;
        if (typeof opts.imageAngle != 'undefined')
            this.imageAngle = opts.imageAngle;
    }
    Object.defineProperty(GameObject.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (val) {
            this._x = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (val) {
            this._y = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "collisionBounds", {
        get: function () {
            if (!this._collisionBounds) {
                if (!this.sprite)
                    return rect_1.Rect.zero;
                var pivot = this.sprite.pivot || { x: 0, y: 0 };
                var spriteSize = render_1.measureSprite(this.resources, this.sprite);
                return new rect_1.Rect(-pivot.x, spriteSize.width - pivot.x, -pivot.y, spriteSize.height - pivot.y);
            }
            return this._collisionBounds;
        },
        set: function (val) {
            this._collisionBounds = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "shouldTick", {
        get: function () {
            return this._shouldTick;
        },
        set: function (val) {
            this._shouldTick = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "direction", {
        get: function () {
            return this._dir;
        },
        set: function (val) {
            if (this.DEBUG_MOVEMENT)
                console.log("setting direction: " + val);
            val = math_1.fmod(val, 360);
            if (this._dir == val)
                return;
            this._dir = val;
            this.updateHVSpeed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (val) {
            if (this.DEBUG_MOVEMENT)
                console.log("setting speed: " + val);
            if (val < 0)
                throw new Error("Invalid speed: " + val + ". Must be >= 0");
            if (this._speed == val)
                return;
            this._speed = val;
            this.updateHVSpeed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "hspeed", {
        get: function () {
            return this._hspeed;
        },
        set: function (val) {
            if (this.DEBUG_MOVEMENT)
                console.log("setting hspeed: " + val);
            if (this._hspeed == val)
                return;
            this._hspeed = val;
            this.updateDirectionAndSpeed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "vspeed", {
        get: function () {
            return this._vspeed;
        },
        set: function (val) {
            if (this.DEBUG_MOVEMENT)
                console.log("setting vspeed: " + val);
            if (this._vspeed == val)
                return;
            this._vspeed = val;
            this.updateDirectionAndSpeed();
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.updateHVSpeed = function () {
        var radians = math_1.degToRad(this._dir);
        this._vspeed = -Math.sin(radians) * this._speed;
        this._hspeed = Math.cos(radians) * this._speed;
        if (this.DEBUG_MOVEMENT)
            console.log("  hspeed: " + this._hspeed + "; vspeed: " + this._vspeed);
    };
    GameObject.prototype.updateDirectionAndSpeed = function () {
        this._speed = Math.sqrt(this._hspeed * this._hspeed + this._vspeed * this._vspeed);
        if (this._speed == 0)
            return;
        this._dir = math_1.pointDirection(0, 0, this._hspeed, this._vspeed);
        if (this._dir < 0)
            this._dir += 360;
        if (this.DEBUG_MOVEMENT)
            console.log("  speed: " + this._speed + "; direction: " + this._dir);
    };
    Object.defineProperty(GameObject.prototype, "shouldRender", {
        get: function () {
            return this._shouldRender;
        },
        set: function (val) {
            this._shouldRender = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "renderCamera", {
        get: function () {
            return this._renderCamera;
        },
        set: function (val) {
            this._renderCamera = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        set: function (val) {
            this._sprite = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "animationAge", {
        get: function () {
            return this._animationAge;
        },
        set: function (val) {
            this._animationAge = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "animationSpeed", {
        get: function () {
            return this._animationSpeed;
        },
        set: function (val) {
            this._animationSpeed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "imageAngle", {
        get: function () {
            return this._imageAngle;
        },
        set: function (val) {
            this._imageAngle = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "scene", {
        get: function () {
            if (!this._scene)
                return null;
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "game", {
        get: function () {
            if (!this.scene)
                return null;
            return this.scene.game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "resources", {
        get: function () {
            if (!this.game)
                return null;
            return this.game.resourceLoader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "events", {
        get: function () {
            if (!this.game)
                return null;
            return this.game.eventQueue;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.addToScene = function (scene) {
        if (this._scene)
            throw new Error('This game object is already added to a scene!');
        this._scene = scene;
    };
    GameObject.prototype.removeFromScene = function () {
        this._scene = null;
    };
    GameObject.prototype.onSceneEnter = function () { };
    GameObject.prototype.onSceneExit = function () { };
    GameObject.prototype.handleEvent = function (evt) {
    };
    GameObject.prototype.tick = function (delta) {
        if (!this.shouldTick)
            return;
        this.x += this.hspeed * delta;
        this.y += this.vspeed * delta;
        this.animationAge += this.animationSpeed * delta;
    };
    GameObject.prototype.render = function (context) {
        if (!this.shouldRender)
            return;
        context.save();
        try {
            context.translate(this.x, this.y);
            context.rotate(-math_1.degToRad(this.imageAngle));
            this.renderImpl(context);
        }
        finally {
            context.restore();
        }
    };
    GameObject.prototype.renderImpl = function (context) {
        if (this.sprite) {
            render_1.drawSprite(context, this.resources, this.sprite, 0, 0, this.animationAge);
        }
        else {
            context.fillStyle = 'red';
            context.fillRect(0, 0, 16, 16);
            context.fillStyle = 'white';
            context.font = '16px Consolas';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('?', 0 + 8, 0 + 8);
        }
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=game-object.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __webpack_require__(6);
var ResourceLoader = (function () {
    function ResourceLoader() {
        this.DEBUG_RESOURCES = false;
        this._resourcesLoaded = 0;
        this._resourcesLoading = 0;
        this._errors = [];
        this._images = new Map();
        this._audio = new Map();
        var pathParts = window.location.pathname.split('/');
        this._baseUrl = window.location.origin + (pathParts[pathParts.length - 1] == 'index.html' ? pathParts.slice(0, pathParts.length - 1) : pathParts).join('/');
        if (this._baseUrl.startsWith('null/'))
            this._baseUrl = 'file:///' + this._baseUrl.slice(5);
    }
    ResourceLoader.prototype.addPreloadStrategy = function (strategy) {
        strategy.preload(this);
    };
    Object.defineProperty(ResourceLoader.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceLoader.prototype, "resourcesLoaded", {
        get: function () {
            return this._resourcesLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceLoader.prototype, "totalResources", {
        get: function () {
            return this._resourcesLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceLoader.prototype, "error", {
        get: function () {
            return this._errors.join('\n');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResourceLoader.prototype, "isDone", {
        get: function () {
            return this.totalResources == this.resourcesLoaded && !this.error;
        },
        enumerable: true,
        configurable: true
    });
    ResourceLoader.prototype.loadImage = function (src) {
        var _this = this;
        src = this.resolvePath(src);
        if (this._images.has(src))
            return this._images.get(src);
        this._resourcesLoading++;
        if (this.DEBUG_RESOURCES)
            console.log("Loading image: '" + src + "'");
        var img = document.createElement('img');
        this._images.set(src, img);
        img.onload = function () {
            _this._resourcesLoaded++;
        };
        img.onerror = function (e) {
            _this._errors.push("ERROR: Could not load " + src);
        };
        img.src = src;
        return img;
    };
    ResourceLoader.prototype.loadAudio = function (src) {
        var _this = this;
        src = this.resolvePath(src);
        if (this._audio.has(src))
            return this._audio.get(src);
        this._resourcesLoading++;
        if (this.DEBUG_RESOURCES)
            console.log("Loading audio: '" + src + "'");
        var aud = document.createElement('audio');
        this._audio.set(src, aud);
        aud.onloadeddata = function () {
            _this._resourcesLoaded++;
        };
        aud.onerror = function (e) {
            _this._errors.push("ERROR: Could not load " + src);
        };
        aud.src = src;
        return aud;
    };
    ResourceLoader.prototype.resolvePath = function (src) {
        if (src.match(/^[a-z]:\/\//i))
            return src;
        if (src.startsWith('/'))
            return "" + this.baseUrl + src;
        else
            return this.baseUrl + "/" + src;
    };
    ResourceLoader.prototype.render = function (context) {
        context.fillStyle = 'grey';
        context.fillRect(0, 0, context.canvas.scrollWidth, context.canvas.scrollHeight);
        if (this.totalResources > 0) {
            context.fillStyle = 'white';
            context.fillRect(4, 4, 100, 4);
            context.fillStyle = 'black';
            context.fillRect(4, 4, 100 * (this.resourcesLoaded / this.totalResources), 4);
        }
        var msg = this.resourcesLoaded + "/" + this.totalResources;
        if (this._errors.length)
            msg += '\n' + this.error;
        context.textBaseline = 'top';
        context.textAlign = 'left';
        context.fillStyle = 'black';
        render_1.fillText(context, msg, 4, 12);
    };
    return ResourceLoader;
}());
exports.ResourceLoader = ResourceLoader;
//# sourceMappingURL=resource-loader.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect = (function () {
    function Rect(left, right, bottom, top) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }
    Object.defineProperty(Rect.prototype, "width", {
        get: function () {
            return this.right - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "height", {
        get: function () {
            return this.top - this.bottom;
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
}());
Rect.zero = new Rect(0, 0, 0, 0);
exports.Rect = Rect;
;
//# sourceMappingURL=rect.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isSingleTileSprite(sprite) {
    return !!sprite.tileset && !sprite.frames;
}
exports.isSingleTileSprite = isSingleTileSprite;
function isAnimationSprite(sprite) {
    return !!sprite.frames;
}
exports.isAnimationSprite = isAnimationSprite;
//# sourceMappingURL=sprite.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var tile_preload_strategy_1 = __webpack_require__(38);
var alive_preload_strategy_1 = __webpack_require__(37);
var flocking_scene_1 = __webpack_require__(39);
var RtsGame = (function (_super) {
    __extends(RtsGame, _super);
    function RtsGame(framesPerSecond) {
        if (framesPerSecond === void 0) { framesPerSecond = 30; }
        var _this = _super.call(this, framesPerSecond) || this;
        _this.resourceLoader.addPreloadStrategy(new tile_preload_strategy_1.TilePreloadStrategy());
        _this.resourceLoader.addPreloadStrategy(new alive_preload_strategy_1.AlivePreloadStrategy());
        return _this;
    }
    RtsGame.prototype.start = function () {
        _super.prototype.start.call(this);
        this.changeScene(new flocking_scene_1.FlockingScene());
    };
    return RtsGame;
}(engine_1.Game));
exports.RtsGame = RtsGame;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_object_1 = __webpack_require__(9);
var merge = __webpack_require__(4);
var AudioSourceObject = (function (_super) {
    __extends(AudioSourceObject, _super);
    function AudioSourceObject(name, audio, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, name, merge({
            shouldRender: false
        }, opts)) || this;
        _this.audio = audio;
        _this._shouldLoop = false;
        if (typeof opts.shouldLoop !== 'undefined')
            _this._shouldLoop = opts.shouldLoop;
        return _this;
    }
    Object.defineProperty(AudioSourceObject.prototype, "shouldLoop", {
        get: function () {
            return this._shouldLoop;
        },
        enumerable: true,
        configurable: true
    });
    AudioSourceObject.prototype.addToScene = function (scene) {
        var _this = this;
        _super.prototype.addToScene.call(this, scene);
        var theirAudio = this.resources.loadAudio(this.audio.src);
        this._myAudio = document.createElement('audio');
        this._myAudio.src = theirAudio.src;
        this._myAudio.onended = function () {
            if (_this._shouldLoop)
                _this._myAudio.play();
            else
                _this.scene.removeObject(_this);
        };
        if (this.game.scene == scene)
            this._myAudio.play();
    };
    Object.defineProperty(AudioSourceObject.prototype, "myAudio", {
        get: function () {
            return this._myAudio;
        },
        enumerable: true,
        configurable: true
    });
    AudioSourceObject.prototype.onSceneEnter = function () {
        if (this.myAudio.paused)
            this._myAudio.play();
    };
    AudioSourceObject.prototype.onSceneExit = function () {
        if (!this.myAudio.paused)
            this._myAudio.pause();
    };
    return AudioSourceObject;
}(game_object_1.GameObject));
exports.AudioSourceObject = AudioSourceObject;
//# sourceMappingURL=audio-source-object.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var camera_1 = __webpack_require__(5);
var FollowCamera = (function (_super) {
    __extends(FollowCamera, _super);
    function FollowCamera(scene) {
        var _this = _super.call(this, scene) || this;
        _this._follow = null;
        _this._offset = [0, 0];
        return _this;
    }
    Object.defineProperty(FollowCamera.prototype, "follow", {
        get: function () {
            return this._follow;
        },
        set: function (val) {
            this._follow = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FollowCamera.prototype, "followOffset", {
        get: function () {
            return [this._offset[0], this._offset[1]];
        },
        set: function (_a) {
            var offsetx = _a[0], offsety = _a[1];
            this._offset = [offsetx, offsety];
        },
        enumerable: true,
        configurable: true
    });
    FollowCamera.prototype.tick = function (delta) {
        if (this.follow) {
            var target = [this._follow.x + this._offset[0], this._follow.y + this._offset[1]];
            this.center = target;
        }
        _super.prototype.tick.call(this, delta);
    };
    return FollowCamera;
}(camera_1.Camera));
exports.FollowCamera = FollowCamera;
//# sourceMappingURL=follow-camera.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var camera_1 = __webpack_require__(5);
var GameScene = (function () {
    function GameScene(_game) {
        if (_game === void 0) { _game = null; }
        this._game = _game;
        this._objects = [];
        this._camera = null;
    }
    Object.defineProperty(GameScene.prototype, "game", {
        get: function () {
            return this._game;
        },
        set: function (val) {
            this._game = val;
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype.onEnter = function () {
        this.start();
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.onSceneEnter();
        }
    };
    GameScene.prototype.onExit = function () {
        this.stop();
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.onSceneExit();
        }
    };
    GameScene.prototype.start = function () {
        if (!this.camera)
            this.initCamera();
    };
    GameScene.prototype.stop = function () {
    };
    GameScene.prototype.handleEvent = function (evt) {
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.shouldTick && obj.handleEvent(evt))
                break;
        }
    };
    GameScene.prototype.tick = function (delta) {
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.shouldTick)
                obj.tick(delta);
        }
        if (this.camera)
            this.camera.tick(delta);
    };
    GameScene.prototype.render = function (context) {
        var defaultCamera = this.camera;
        var lastRenderCamera = null;
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.shouldRender) {
                var renderCamera = obj.renderCamera === 'default' ? defaultCamera :
                    obj.renderCamera !== 'none' ? obj.renderCamera :
                        null;
                if (lastRenderCamera != renderCamera) {
                    if (lastRenderCamera)
                        lastRenderCamera.pop(context);
                    lastRenderCamera = renderCamera;
                    if (lastRenderCamera)
                        lastRenderCamera.push(context);
                }
                obj.render(context);
            }
        }
        if (lastRenderCamera)
            lastRenderCamera.pop(context);
    };
    GameScene.prototype.addObject = function (obj) {
        this._objects.push(obj);
        obj.addToScene(this);
    };
    GameScene.prototype.removeObject = function (obj) {
        var idx = this._objects.indexOf(obj);
        if (idx == -1)
            throw new Error("Cannot remove game object '" + obj.name + "': it has not been added.");
        this._objects.splice(idx, 1);
        obj.removeFromScene();
    };
    GameScene.prototype.findObject = function (predicate) {
        if (typeof predicate == 'string') {
            var name_1 = predicate;
            predicate = function (obj) { return obj.name == name_1; };
        }
        else if (!predicate)
            throw new Error("Invalid predicate: " + predicate);
        for (var _i = 0, _a = this._objects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (predicate(obj))
                return obj;
        }
        return null;
    };
    GameScene.prototype.findObjects = function (predicate) {
        if (!predicate)
            return this._objects.slice();
        if (typeof predicate !== 'function')
            throw new Error("Invalid predicate: " + predicate);
        return this._objects.filter(predicate);
    };
    GameScene.prototype.initCamera = function () {
        this.camera = new camera_1.Camera(this);
    };
    Object.defineProperty(GameScene.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        set: function (val) {
            this._camera = val;
        },
        enumerable: true,
        configurable: true
    });
    return GameScene;
}());
exports.GameScene = GameScene;
;
//# sourceMappingURL=game-scene.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var resource_loader_1 = __webpack_require__(10);
var event_queue_1 = __webpack_require__(8);
var Game = (function () {
    function Game(framesPerSecond) {
        if (framesPerSecond === void 0) { framesPerSecond = 30; }
        this.framesPerSecond = framesPerSecond;
        this._scene = null;
        this._nextScene = null;
        this.LOGIC_TICKS_PER_RENDER_TICK = 3;
        this.canvas = null;
        this.context = null;
        this.previousTick = null;
        this._resourceLoader = null;
        this._eventQueue = null;
        this._isRunning = false;
        this._size = [640, 480];
        this.init();
    }
    Object.defineProperty(Game.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.changeScene = function (newScene) {
        if (!newScene) {
            throw new Error("Tried to changeScene to a bad scene!");
        }
        if (this._nextScene) {
            throw new Error("Scene cannot be set more than once per tick!");
        }
        this._nextScene = newScene;
        if (!this._scene) {
            this.handleSceneChange();
        }
    };
    Game.prototype.handleSceneChange = function () {
        if (this._nextScene) {
            if (this._scene)
                this._scene.onExit();
            this._scene = this._nextScene;
            this._scene.game = this;
            this._scene.onEnter();
            this._nextScene = null;
        }
    };
    Game.prototype.init = function () {
        this._resourceLoader = new resource_loader_1.ResourceLoader();
        this._eventQueue = new event_queue_1.EventQueue();
        var body = document.getElementsByTagName('body')[0];
        this.initResize(body);
    };
    Game.prototype.initResize = function (body) {
        var _this = this;
        body.onresize = function (e) { return _this.refreshCanvasSize(); };
    };
    Game.prototype.refreshCanvasSize = function () {
        if (this.canvas) {
            _a = this.canvasSize = [this.canvas.scrollWidth, this.canvas.scrollHeight], this.canvas.width = _a[0], this.canvas.height = _a[1];
        }
        var _a;
    };
    Object.defineProperty(Game.prototype, "resourceLoader", {
        get: function () {
            return this._resourceLoader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "eventQueue", {
        get: function () {
            return this._eventQueue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "isRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.start = function () {
        var _this = this;
        if (this.isRunning)
            throw new Error("This game is already running. You can't run it again.");
        this._isRunning = true;
        if (!this.canvas)
            this.canvas = document.getElementById('gameCanvas');
        this.refreshCanvasSize();
        this.context = this.canvas.getContext("2d");
        this._intervalHandle = setInterval(function () { return _this.onTick(); }, 1000 / this.framesPerSecond);
    };
    Game.prototype.stop = function () {
        if (this.isRunning)
            clearInterval(this._intervalHandle);
        this._isRunning = false;
    };
    Object.defineProperty(Game.prototype, "canvasSize", {
        get: function () {
            return [this._size[0], this._size[1]];
        },
        set: function (_a) {
            var newWidth = _a[0], newHeight = _a[1];
            if (newWidth == this._size[0] && newHeight == this._size[1])
                return;
            var prevSize = this._size;
            this._size = [newWidth, newHeight];
            this.eventQueue.enqueue({
                type: 'canvasResize',
                previousSize: prevSize,
                size: [newWidth, newHeight]
            });
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.onTick = function () {
        if (!this.isRunning)
            throw new Error("An error occurred. Game.onTick was invoked although the game is not running.");
        if (this.resourceLoader.isDone) {
            var currentTime = new Date();
            var delta = (this.previousTick == null) ? 0 : (currentTime.valueOf() - this.previousTick.valueOf()) / 1000;
            this.previousTick = currentTime;
            this.sendEvents();
            for (var q = 0; q < this.LOGIC_TICKS_PER_RENDER_TICK; q++) {
                this.tick(delta / this.LOGIC_TICKS_PER_RENDER_TICK);
            }
            this.render(this.context);
        }
        else {
            this.resourceLoader.render(this.context);
        }
    };
    Game.prototype.sendEvents = function () {
        var events = this._eventQueue.clearQueue();
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var evt = events_1[_i];
            if (this._scene) {
                this._scene.handleEvent(evt);
            }
        }
    };
    Game.prototype.tick = function (delta) {
        if (this._scene) {
            this._scene.tick(delta);
            this.handleSceneChange();
        }
    };
    Game.prototype.render = function (context) {
        if (!context)
            throw new Error("What the heck just happened? There is no rendering context!");
        if (this._scene) {
            this._scene.render(context);
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));
__export(__webpack_require__(10));
__export(__webpack_require__(5));
__export(__webpack_require__(15));
__export(__webpack_require__(17));
__export(__webpack_require__(9));
__export(__webpack_require__(14));
__export(__webpack_require__(16));
__export(__webpack_require__(22));
//# sourceMappingURL=index.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function delay(millis) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(); }, millis);
    });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this._listeners = [];
        this._isEmitting = false;
    }
    EventEmitter.prototype.addListener = function (listener) {
        if (!listener || typeof listener !== 'function')
            throw new Error("Listener is not a function: " + listener);
        this._listeners.push(listener);
    };
    EventEmitter.prototype.emit = function (val) {
        if (this._isEmitting)
            throw new Error("EventEmitter.emit was recursively invoked. New value: " + val);
        this._isEmitting = true;
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(val);
        }
        this._isEmitting = false;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event-emitter.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Left"] = 0] = "Left";
    MouseButton[MouseButton["Middle"] = 1] = "Middle";
    MouseButton[MouseButton["Right"] = 2] = "Right";
    MouseButton[MouseButton["BrowserBack"] = 3] = "BrowserBack";
    MouseButton[MouseButton["BrowserForward"] = 5] = "BrowserForward";
})(MouseButton = exports.MouseButton || (exports.MouseButton = {}));
//# sourceMappingURL=events.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(19));
__export(__webpack_require__(20));
__export(__webpack_require__(21));
__export(__webpack_require__(2));
__export(__webpack_require__(11));
__export(__webpack_require__(6));
__export(__webpack_require__(12));
//# sourceMappingURL=index.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var DebugControls = (function (_super) {
    __extends(DebugControls, _super);
    function DebugControls() {
        return _super.call(this, 'DebugControls', { renderCamera: 'none' }) || this;
    }
    DebugControls.prototype.addToScene = function (scene) {
        _super.prototype.addToScene.call(this, scene);
        var objsWithControls = scene.findObjects(function (obj) { return obj.debugControls; });
        this.controls = function () {
            return [].concat.apply([], objsWithControls.map(function (obj) { return obj.debugControls; }));
        };
    };
    DebugControls.prototype.renderImpl = function (context) {
        var controlsStr = this.controls()
            .map(function (c) {
            var state = typeof c.state === 'undefined' || c.state == null ? '' :
                typeof c.state !== 'boolean' ? "" + c.state :
                    c.state ? 'on' :
                        'off';
            return ((c.key && c.key + " - ") || '') + c.name + ((state && ": " + state) || '');
        })
            .join('\n');
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.fillStyle = 'white';
        engine_1.fillText(context, controlsStr, 4, 4);
    };
    return DebugControls;
}(engine_1.GameObject));
exports.DebugControls = DebugControls;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var enemy_1 = __webpack_require__(25);
var tile_db_1 = __webpack_require__(1);
var node_1 = __webpack_require__(26);
var path_1 = __webpack_require__(27);
var math_1 = __webpack_require__(7);
var FOW_BUCKET_SIZE = 8;
var EnemyController = (function (_super) {
    __extends(EnemyController, _super);
    function EnemyController(world) {
        var _this = _super.call(this, 'EnemyController') || this;
        _this.world = world;
        _this._baseCoords = [0, 0];
        _this._enemies = [];
        _this.renderMode = 'all';
        _this.renderFogOfWar = true;
        _this._fowBuckets = new Map();
        _this.nodeMap = new Map();
        _this.init();
        return _this;
    }
    EnemyController.prototype.init = function () {
        this.initBase();
    };
    EnemyController.prototype.initBase = function () {
        while (true) {
            var distance = 5 + Math.random() * 10;
            var angle = 2 * Math.PI * Math.random();
            var xpos = Math.floor(Math.cos(angle) * distance);
            var ypos = Math.floor(Math.sin(angle) * distance);
            if (!this.world.getTileAt(xpos, ypos).isSolid && !this.world.getTileAt(xpos + 1, ypos).isSolid && !this.world.getTileAt(xpos, ypos + 1).isSolid && !this.world.getTileAt(xpos + 1, ypos + 1).isSolid) {
                this._baseCoords = [xpos, ypos];
                this.world.setTileAt(xpos, ypos, tile_db_1.tiles['enemy-base']);
                break;
            }
        }
    };
    EnemyController.prototype.addToScene = function (scene) {
        _super.prototype.addToScene.call(this, scene);
        this.addEnemies(10);
    };
    Object.defineProperty(EnemyController.prototype, "debugControls", {
        get: function () {
            return [
                { key: 'E', name: 'enemy render mode', state: this.renderMode },
                { key: 'G', name: 'fog of war', state: this.renderFogOfWar }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyController.prototype, "baseCoords", {
        get: function () {
            return [this._baseCoords[0], this._baseCoords[1]];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyController.prototype, "enemies", {
        get: function () {
            return this._enemies;
        },
        enumerable: true,
        configurable: true
    });
    EnemyController.prototype.addEnemies = function (count) {
        for (var q = 0; q < count; q++)
            this.addEnemy();
        this.updateRenderDebugInfo();
    };
    EnemyController.prototype.addEnemy = function () {
        var enemy = new enemy_1.Enemy(this, {
            x: (this._baseCoords[0] + 1.5) * tile_db_1.TILE_SIZE,
            y: (this._baseCoords[1] + 1.5) * tile_db_1.TILE_SIZE
        });
        this.enemies.push(enemy);
        this.scene.addObject(enemy);
        return enemy;
    };
    EnemyController.prototype.handleEvent = function (evt) {
        if (evt.type == 'keyPressed') {
            if (evt.code == 'KeyE') {
                this.renderMode = (this.renderMode == 'none') ? 'single' :
                    (this.renderMode == 'single') ? 'all' :
                        'none';
                this.updateRenderDebugInfo();
            }
            else if (evt.code == 'KeyG') {
                this.renderFogOfWar = !this.renderFogOfWar;
            }
        }
    };
    EnemyController.prototype.updateRenderDebugInfo = function () {
        for (var _i = 0, _a = this._enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            enemy.renderDebugInfo = this.renderMode == 'all';
        }
        if (this.renderMode == 'single' && this._enemies.length)
            this._enemies[0].renderDebugInfo = true;
    };
    EnemyController.prototype.isInFOW = function (x, y) {
        var _a = [Math.floor(x / FOW_BUCKET_SIZE), Math.floor(y / FOW_BUCKET_SIZE)], bucketx = _a[0], buckety = _a[1];
        var key = bucketx + "_" + buckety;
        if (!this._fowBuckets.has(key))
            return true;
        var bucket = this._fowBuckets.get(key);
        var _b = [engine_1.fmod(x, FOW_BUCKET_SIZE), engine_1.fmod(y, FOW_BUCKET_SIZE)], offsetx = _b[0], offsety = _b[1];
        return bucket[offsetx][offsety];
    };
    EnemyController.prototype.setFOW = function (x, y, val) {
        var _a = [Math.floor(x / FOW_BUCKET_SIZE), Math.floor(y / FOW_BUCKET_SIZE)], bucketx = _a[0], buckety = _a[1];
        var key = bucketx + "_" + buckety;
        if (!this._fowBuckets.has(key)) {
            if (val)
                return;
            var row_1 = [];
            for (var q = 0; q < FOW_BUCKET_SIZE; q++)
                row_1.push(true);
            this._fowBuckets.set(key, row_1.map(function (col) { return row_1.slice(); }));
        }
        var bucket = this._fowBuckets.get(key);
        var _b = [engine_1.fmod(x, FOW_BUCKET_SIZE), engine_1.fmod(y, FOW_BUCKET_SIZE)], offsetx = _b[0], offsety = _b[1];
        bucket[offsetx][offsety] = val;
    };
    EnemyController.prototype.clearFOW = function (x, y, radius, newVal) {
        if (newVal === void 0) { newVal = false; }
        var dist = Math.ceil(radius);
        var radius2 = radius * radius;
        for (var q = x - dist; q <= x + dist; q++) {
            for (var w = y - dist; w <= y + dist; w++) {
                if (math_1.pointDistance2(x, y, q, w) <= radius2)
                    this.setFOW(q, w, newVal);
            }
        }
    };
    EnemyController.prototype.getNode = function (x, y) {
        var key = node_1.keyFromCoords(x, y);
        if (!this.nodeMap.has(key)) {
            var newNode = this.world.getTileAt(x, y).isSolid ? null : new node_1.Node(this, x, y);
            this.nodeMap.set(key, newNode);
            return newNode;
        }
        else
            return this.nodeMap.get(key);
    };
    EnemyController.prototype.getPath = function (xfrom, yfrom, xto, yto) {
        var from = this.getNode(xfrom, yfrom);
        var to = this.getNode(xto, yto);
        if (!from || !to)
            return null;
        return path_1.Path.pathfind(from, to);
    };
    EnemyController.prototype.render = function (context) {
        if (!this.renderFogOfWar)
            return;
        if (!this.shouldRender)
            return;
        var bounds = this.scene.camera.bounds;
        var startx = Math.floor(bounds.left / tile_db_1.TILE_SIZE / FOW_BUCKET_SIZE);
        var starty = Math.floor(bounds.bottom / tile_db_1.TILE_SIZE / FOW_BUCKET_SIZE);
        var endx = Math.floor(bounds.right / tile_db_1.TILE_SIZE / FOW_BUCKET_SIZE) + 1;
        var endy = Math.floor(bounds.top / tile_db_1.TILE_SIZE / FOW_BUCKET_SIZE) + 1;
        context.fillStyle = 'rgba(0, 0, 0, .8)';
        for (var bucketx = startx; bucketx < endx; bucketx++) {
            for (var buckety = starty; buckety < endy; buckety++) {
                var bucketPx = bucketx * tile_db_1.TILE_SIZE * FOW_BUCKET_SIZE;
                var bucketPy = buckety * tile_db_1.TILE_SIZE * FOW_BUCKET_SIZE;
                var key = bucketx + "_" + buckety;
                if (!this._fowBuckets.has(key)) {
                    context.fillRect(bucketPx, bucketPy, tile_db_1.TILE_SIZE * FOW_BUCKET_SIZE, tile_db_1.TILE_SIZE * FOW_BUCKET_SIZE);
                    continue;
                }
                var bucket = this._fowBuckets.get(key);
                for (var q = 0; q < FOW_BUCKET_SIZE; q++) {
                    for (var w = 0; w < FOW_BUCKET_SIZE; w++) {
                        if (bucket[q][w])
                            context.fillRect(bucketPx + q * tile_db_1.TILE_SIZE, bucketPy + w * tile_db_1.TILE_SIZE, tile_db_1.TILE_SIZE, tile_db_1.TILE_SIZE);
                    }
                }
            }
        }
    };
    return EnemyController;
}(engine_1.GameObject));
exports.EnemyController = EnemyController;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var state_machine_1 = __webpack_require__(30);
var explore_state_1 = __webpack_require__(28);
var alive_db_1 = __webpack_require__(3);
var tile_db_1 = __webpack_require__(1);
var merge = __webpack_require__(4);
var FOW_CLEAR_RESET_TIME = .5;
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(controller, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, 'EnemyController', merge({
            sprite: alive_db_1.alives['enemy'].sprite,
            direction: Math.random() * 360
        }, opts)) || this;
        _this.controller = controller;
        _this.renderDebugInfo = false;
        _this._fowClearTime = Math.random() * FOW_CLEAR_RESET_TIME;
        _this.fowClearDistance = 4;
        _this._states = new state_machine_1.StateMachine(new explore_state_1.ExploreState(_this));
        return _this;
    }
    Enemy.prototype.tick = function (delta) {
        this._fowClearTime -= delta;
        if (this._fowClearTime <= 0) {
            this.controller.clearFOW(Math.floor(this.x / tile_db_1.TILE_SIZE), Math.floor(this.y / tile_db_1.TILE_SIZE), this.fowClearDistance);
            this._fowClearTime += FOW_CLEAR_RESET_TIME;
        }
        this._states.tick(delta);
        _super.prototype.tick.call(this, delta);
        this.imageAngle = this.direction;
    };
    Enemy.prototype.render = function (context) {
        this._states.render(context);
        _super.prototype.render.call(this, context);
    };
    return Enemy;
}(engine_1.GameObject));
exports.Enemy = Enemy;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function keyFromCoords(x, y) {
    return x + "_" + y;
}
exports.keyFromCoords = keyFromCoords;
var Node = (function () {
    function Node(controller, x, y) {
        this.controller = controller;
        this.x = x;
        this.y = y;
        this._neighbors = null;
    }
    Object.defineProperty(Node.prototype, "neighbors", {
        get: function () {
            var _this = this;
            if (!this._neighbors) {
                var temp_1 = Node.neighborOffsets.map(function (_a) {
                    var offx = _a[0], offy = _a[1];
                    return _this.controller.getNode(_this.x + offx, _this.y + offy);
                });
                this._neighbors = temp_1.concat(Node.dependentNeighborOffsets.map(function (dep) {
                    for (var q = 0; q < dep[0].length; q++)
                        if (!temp_1[dep[0][q]])
                            return null;
                    var _a = dep[1], offx = _a[0], offy = _a[1];
                    return _this.controller.getNode(_this.x + offx, _this.y + offy);
                })).filter(Boolean);
            }
            return this._neighbors;
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
Node.neighborOffsets = [
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1]
];
Node.dependentNeighborOffsets = [
    [[0, 1], [-1, -1]],
    [[0, 2], [1, -1]],
    [[3, 1], [-1, 1]],
    [[3, 2], [1, 1]]
];
exports.Node = Node;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Path = (function () {
    function Path(nodes, cost) {
        this.nodes = nodes;
        this.cost = cost;
    }
    Path.heuristicDistance = function (fromNode, toNode) {
        return this.actualDistance(fromNode, toNode);
    };
    Path.actualDistance = function (fromNode, toNode) {
        var xdiff = fromNode.x - toNode.x;
        var ydiff = fromNode.y - toNode.y;
        return Math.sqrt(xdiff * xdiff + ydiff * ydiff);
    };
    Path.pathfind = function (fromNode, toNode) {
        var checkedNodes = new Set();
        var toCheck = new Set();
        toCheck.add(fromNode);
        var cameFrom = new Map();
        var gScores = new Map();
        gScores.set(fromNode, 0);
        var fScores = new Map();
        fScores.set(fromNode, Path.heuristicDistance(fromNode, toNode));
        var _loop_1 = function () {
            var currentFScore = Infinity;
            var current = null;
            toCheck.forEach(function (node) {
                var fScore;
                if (!fScores.has(node))
                    fScore = Infinity;
                else
                    fScore = fScores.get(node);
                if (fScore < currentFScore) {
                    currentFScore = fScore;
                    current = node;
                }
            });
            if (current == toNode)
                return { value: new Path(Path.reconstructPath(cameFrom, current), gScores.get(current)) };
            toCheck.delete(current);
            checkedNodes.add(current);
            for (var _i = 0, _a = current.neighbors; _i < _a.length; _i++) {
                var conn = _a[_i];
                if (checkedNodes.has(conn))
                    continue;
                tentativeGScore = gScores.get(current) + Path.actualDistance(current, conn);
                if (!toCheck.has(conn))
                    toCheck.add(conn);
                else if (gScores.has(conn) && tentativeGScore >= gScores.get(conn))
                    continue;
                cameFrom.set(conn, current);
                gScores.set(conn, tentativeGScore);
                fScores.set(conn, tentativeGScore + Path.heuristicDistance(conn, toNode));
            }
        };
        var tentativeGScore;
        while (toCheck.size != 0) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return null;
    };
    Path.reconstructPath = function (cameFrom, current) {
        var completePath = [current];
        while (cameFrom.has(current) && (current = cameFrom.get(current)) != null)
            completePath.unshift(current);
        return completePath;
    };
    return Path;
}());
exports.Path = Path;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pathfind_state_1 = __webpack_require__(29);
var tile_db_1 = __webpack_require__(1);
var ExploreState = (function (_super) {
    __extends(ExploreState, _super);
    function ExploreState(self) {
        return _super.call(this, self) || this;
    }
    Object.defineProperty(ExploreState.prototype, "stateName", {
        get: function () {
            return 'exploring';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExploreState.prototype, "stateStatus", {
        get: function () {
            return 'ok';
        },
        enumerable: true,
        configurable: true
    });
    ExploreState.prototype.onEnter = function (machine, prevState) {
        _super.prototype.onEnter.call(this, machine, prevState);
        this.self.speed = 30 * (2 + Math.random() * 1);
    };
    ExploreState.prototype.tick = function (machine, delta) {
        if (!this.path) {
            var targetx = Math.floor((this.self.x + (Math.random() * 3000) - 1500) / tile_db_1.TILE_SIZE);
            var targety = Math.floor((this.self.y + (Math.random() * 3000) - 1500) / tile_db_1.TILE_SIZE);
            this.path = this.self.controller.getPath(Math.floor(this.self.x / tile_db_1.TILE_SIZE), Math.floor(this.self.y / tile_db_1.TILE_SIZE), targetx, targety);
        }
        _super.prototype.tick.call(this, machine, delta);
    };
    return ExploreState;
}(pathfind_state_1.PathfindState));
exports.ExploreState = ExploreState;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var state_1 = __webpack_require__(31);
var tile_db_1 = __webpack_require__(1);
var math_1 = __webpack_require__(7);
var PathfindState = (function (_super) {
    __extends(PathfindState, _super);
    function PathfindState(self) {
        var _this = _super.call(this, self) || this;
        _this.currentIdx = 0;
        _this.turnRadius = 24;
        _this.directionChangeSpeed = 180;
        _this.directionTolerance = 15;
        return _this;
    }
    Object.defineProperty(PathfindState.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (val) {
            this._path = val;
            this.currentIdx = 0;
        },
        enumerable: true,
        configurable: true
    });
    PathfindState.prototype.tick = function (machine, delta) {
        if (this.path && this.currentIdx >= this.path.nodes.length)
            this.path = null;
        if (!this.path)
            return;
        var nodes = this.path.nodes;
        var targeting = null;
        while (true) {
            if (this.currentIdx >= nodes.length)
                return;
            targeting = nodes[this.currentIdx];
            var dist2 = math_1.pointDistance2(this.self.x, this.self.y, (targeting.x + .5) * tile_db_1.TILE_SIZE, (targeting.y + .5) * tile_db_1.TILE_SIZE);
            if (dist2 > this.turnRadius * this.turnRadius)
                break;
            this.currentIdx++;
        }
        var dir = engine_1.pointDirection(this.self.x, this.self.y, (targeting.x + .5) * tile_db_1.TILE_SIZE, (targeting.y + .5) * tile_db_1.TILE_SIZE);
        if (dir > this.self.direction + 180)
            dir -= 360;
        else if (dir < this.self.direction - 180)
            dir += 360;
        var dirChange = 0;
        if (dir > this.self.direction + this.directionTolerance) {
            dirChange = Math.min(dir - this.self.direction, this.directionChangeSpeed * delta);
        }
        else if (dir < this.self.direction - this.directionTolerance) {
            dirChange = Math.max(dir - this.self.direction, -this.directionChangeSpeed * delta);
        }
        this.self.direction += dirChange;
    };
    PathfindState.prototype.render = function (machine, context) {
        _super.prototype.render.call(this, machine, context);
        if (this.path && this.self.renderDebugInfo) {
            context.strokeStyle = 'red';
            context.beginPath();
            var nodes = this.path.nodes;
            context.moveTo((nodes[0].x + .5) * tile_db_1.TILE_SIZE, (nodes[0].y + .5) * tile_db_1.TILE_SIZE);
            for (var q = 1; q < nodes.length; q++) {
                context.lineTo((nodes[q].x + .5) * tile_db_1.TILE_SIZE, (nodes[q].y + .5) * tile_db_1.TILE_SIZE);
            }
            context.stroke();
            for (var q = 0; q < nodes.length; q++) {
                context.fillStyle = q == this.currentIdx ? 'white' : 'red';
                context.fillRect((nodes[q].x + .5) * tile_db_1.TILE_SIZE - 2, (nodes[q].y + .5) * tile_db_1.TILE_SIZE - 2, 4, 4);
            }
            context.strokeStyle = 'blue';
            context.beginPath();
            context.ellipse(this.self.x, this.self.y, this.turnRadius, this.turnRadius, 0, 0, 2 * Math.PI);
            context.stroke();
        }
    };
    return PathfindState;
}(state_1.State));
exports.PathfindState = PathfindState;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = (function () {
    function StateMachine(currentState) {
        this._currentState = null;
        this._changingState = false;
        this.currentState = currentState;
    }
    Object.defineProperty(StateMachine.prototype, "currentState", {
        get: function () {
            return this._currentState;
        },
        set: function (val) {
            if (val == null)
                throw new Error("Cannot set currentState to null");
            if (val == this._currentState)
                return;
            if (this._changingState)
                throw new Error("Already changing states! Don't change state from within onEnter or onExit lifecycle hooks!");
            this._changingState = true;
            var prev = this._currentState;
            try {
                if (this._currentState)
                    this._currentState.onExit(this, val);
                this._currentState = val;
                if (this._currentState)
                    this._currentState.onEnter(this, prev);
            }
            finally {
                this._changingState = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    StateMachine.prototype.tick = function (delta) {
        this.currentState.tick(this, delta);
    };
    StateMachine.prototype.render = function (context) {
        this.currentState.render(this, context);
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var State = (function () {
    function State(self) {
        this.self = self;
    }
    Object.defineProperty(State.prototype, "renderDebugInfo", {
        get: function () {
            return this.self.renderDebugInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "stateStatus", {
        get: function () {
            return 'ok';
        },
        enumerable: true,
        configurable: true
    });
    State.prototype.onEnter = function (machine, previousState) {
    };
    State.prototype.onExit = function (machine, nextState) {
    };
    State.prototype.tick = function (machine, delta) {
    };
    State.prototype.render = function (machine, context) {
        if (!this.renderDebugInfo)
            return;
        context.fillStyle = this.stateStatus == 'ok' ? 'white' :
            this.stateStatus == 'error' ? 'red' :
                this.stateStatus == 'alert' ? 'orange' :
                    this.stateStatus == 'confused' ? 'yellow' :
                        'purple';
        var text = this.stateStatus == 'ok' ? 'OK' :
            this.stateStatus == 'error' ? 'ERR' :
                this.stateStatus == 'alert' ? '!' :
                    this.stateStatus == 'confused' ? '?' :
                        this.stateStatus;
        context.textAlign = 'right';
        context.textBaseline = 'bottom';
        context.fillText(text, this.self.x - 4, this.self.y - 24);
        context.fillStyle = 'white';
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillText('- ' + this.stateName, this.self.x, this.self.y - 24);
    };
    return State;
}());
exports.State = State;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var bat_1 = __webpack_require__(33);
var BatController = (function (_super) {
    __extends(BatController, _super);
    function BatController() {
        var _this = _super.call(this, "BirdController", { shouldRender: false }) || this;
        _this._bats = [];
        _this.renderMode = 'none';
        return _this;
    }
    Object.defineProperty(BatController.prototype, "debugControls", {
        get: function () {
            return [
                { key: 'f', name: 'flocking render mode', state: this.renderMode }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatController.prototype, "bats", {
        get: function () {
            return this._bats;
        },
        enumerable: true,
        configurable: true
    });
    BatController.prototype.addBats = function (count) {
        for (var q = 0; q < count; q++)
            this.addBat();
        this.updateRenderDebugInfo();
    };
    BatController.prototype.addBat = function () {
        var opts = {
            direction: Math.random() * 360,
            speed: (2 + Math.random() * 4) * 30,
            x: (-.5 + Math.random()) * 3000,
            y: (-.5 + Math.random()) * 3000
        };
        var bird = new bat_1.Bat(this, opts);
        this._bats.push(bird);
        this.game.scene.addObject(bird);
    };
    BatController.prototype.handleEvent = function (evt) {
        if (evt.type == 'keyPressed' && evt.code == 'KeyF') {
            this.renderMode = (this.renderMode == 'none') ? 'single' :
                (this.renderMode == 'single') ? 'all' :
                    'none';
            this.updateRenderDebugInfo();
        }
    };
    BatController.prototype.updateRenderDebugInfo = function () {
        for (var _i = 0, _a = this._bats; _i < _a.length; _i++) {
            var bat = _a[_i];
            bat.renderDebugInfo = this.renderMode == 'all';
        }
        if (this.renderMode == 'single' && this._bats.length)
            this._bats[0].renderDebugInfo = true;
    };
    return BatController;
}(engine_1.GameObject));
exports.BatController = BatController;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var alive_db_1 = __webpack_require__(3);
var math_1 = __webpack_require__(7);
var merge = __webpack_require__(4);
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(controller, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, "Bat", merge(opts, {
            sprite: alive_db_1.alives['bat'].sprite,
            animationAge: Math.random() * 1000
        })) || this;
        _this.controller = controller;
        _this.originGravitation = 1 / (1000 + Math.random() * 5000);
        _this.originGravitationDistance = 1000 + Math.random() * 2000;
        _this.renderDebugInfo = false;
        _this.neighborDistance = 100 + Math.random() * 100;
        _this.attentionSpan = 3 + Math.floor(Math.random() * 5);
        _this.independence = .2 + Math.random() * 4;
        _this.rotatingDirection = Math.random() * 360;
        _this.angleVariation = 20 + Math.random() * 50;
        _this.minSpeed = (.5 + Math.random() * 2) * 30;
        _this.maxSpeed = _this.minSpeed + (.5 + Math.random() * 2) * 30;
        _this.repulsionDistance = 20 + Math.random() * 30;
        _this.repulsionForce = 30 * (5 + Math.random() * 20);
        _this.alignmentDistance = 1 + Math.random() * 3;
        _this.alignmentForce = (2 + Math.random() * 5) * .2;
        _this.cohesionForce = (2 + Math.random() * 5) * .2;
        _this.env = [];
        _this.timeSinceLastEnv = Infinity;
        _this.envCalcThreshold = .25 + Math.random() * .5;
        return _this;
    }
    Bat.prototype.tick = function (delta) {
        var _this = this;
        _super.prototype.tick.call(this, delta);
        if (this.x > this.originGravitationDistance || this.x < -this.originGravitationDistance) {
            this.hspeed -= this.x * this.originGravitation;
        }
        if (this.y > this.originGravitationDistance || this.y < -this.originGravitationDistance) {
            this.vspeed -= this.y * this.originGravitation;
        }
        this.rotatingDirection += 90 * (Math.random() - .5);
        this.rotatingDirection = engine_1.fmod(this.rotatingDirection, 360);
        var rotAdd = this.angleVariation * Math.cos(engine_1.degToRad(this.rotatingDirection));
        this.direction += rotAdd * delta;
        if (this.timeSinceLastEnv > this.envCalcThreshold) {
            var nbdist2_1 = this.neighborDistance * this.neighborDistance;
            this.env = this.controller.bats
                .map(function (bird) { return ({ bird: bird, dist: math_1.pointDistance2(_this.x, _this.y, bird.x, bird.y) }); })
                .filter(function (bird) { return bird.bird != _this && bird.dist < nbdist2_1; })
                .sort(function (lhs, rhs) { return lhs.dist - rhs.dist; })
                .slice(0, this.attentionSpan)
                .map(function (bird) { return bird.bird; });
            this.timeSinceLastEnv = 0;
        }
        this.timeSinceLastEnv += delta;
        var env = this.env;
        var gravHVSpeed = env.reduce(function (prev, current) {
            var dist = math_1.pointDistance(_this.x, _this.y, current.x, current.y);
            var addx = 0, addy = 0;
            if (dist < _this.repulsionDistance) {
                addx += (_this.x - current.x) * _this.repulsionForce * (_this.repulsionDistance - dist) / _this.repulsionDistance;
                addy += (_this.y - current.y) * _this.repulsionForce * (_this.repulsionDistance - dist) / _this.repulsionDistance;
            }
            else {
                addx += ((current.x - _this.x) + current.hspeed * _this.alignmentDistance) * _this.alignmentForce;
                addy += ((current.y - _this.y) + current.vspeed * _this.alignmentDistance) * _this.alignmentForce;
                addx += (current.x - _this.x) * _this.cohesionForce;
                addy += (current.y - _this.y) * _this.cohesionForce;
            }
            return [prev[0] + addx, prev[1] + addy];
        }, [0, 0]);
        if (env.length > 0) {
            gravHVSpeed = [gravHVSpeed[0] / env.length, gravHVSpeed[1] / env.length];
            this.hspeed = (this.hspeed * this.independence + gravHVSpeed[0] * delta) / (delta + this.independence);
            this.vspeed = (this.vspeed * this.independence + gravHVSpeed[1] * delta) / (delta + this.independence);
        }
        this.speed = engine_1.clamp(this.speed, this.minSpeed, this.maxSpeed);
        this.animationSpeed = .5 + (1 * (this.maxSpeed - this.minSpeed) / (this.maxSpeed - this.minSpeed));
        this.imageAngle = this.direction + 90;
    };
    Bat.prototype.render = function (context) {
        _super.prototype.render.call(this, context);
        if (!this.renderDebugInfo)
            return;
        context.strokeStyle = 'rgba(0, 0, 0, .2)';
        context.beginPath();
        context.ellipse(this.x, this.y, this.neighborDistance, this.neighborDistance, 0, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.beginPath();
        for (var _i = 0, _a = this.env; _i < _a.length; _i++) {
            var bird = _a[_i];
            context.moveTo(this.x, this.y);
            context.lineTo(bird.x, bird.y);
        }
        context.closePath();
        context.stroke();
        context.strokeStyle = 'rgba(255, 0, 0, .4)';
        context.beginPath();
        context.ellipse(this.x, this.y, this.repulsionDistance, this.repulsionDistance, 0, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    };
    return Bat;
}(engine_1.GameObject));
exports.Bat = Bat;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var tile_db_1 = __webpack_require__(1);
var GridRenderer = (function (_super) {
    __extends(GridRenderer, _super);
    function GridRenderer(world) {
        var _this = _super.call(this, 'GridRenderer') || this;
        _this.world = world;
        return _this;
    }
    GridRenderer.prototype.render = function (context) {
        if (!this.world) {
            throw new Error("World not set! Cannot render grid!");
        }
        if (!this.resources) {
            throw new Error("Loader not set! Cannot render grid!");
        }
        if (!this.shouldRender)
            return;
        var bounds = this.scene.camera.bounds;
        var startx = Math.floor(bounds.left / tile_db_1.TILE_SIZE);
        var starty = Math.floor(bounds.bottom / tile_db_1.TILE_SIZE);
        var endx = Math.floor(bounds.right / tile_db_1.TILE_SIZE) + 1;
        var endy = Math.floor(bounds.top / tile_db_1.TILE_SIZE) + 1;
        for (var x = startx; x < endx; x++) {
            for (var y = starty; y < endy; y++) {
                var tile = this.world.getTileAt(x, y);
                engine_1.drawSprite(context, this.resources, tile.sprite, x * tile_db_1.TILE_SIZE, y * tile_db_1.TILE_SIZE, this.animationSpeed);
            }
        }
    };
    return GridRenderer;
}(engine_1.GameObject));
exports.GridRenderer = GridRenderer;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rts_game_1 = __webpack_require__(13);
var game = new rts_game_1.RtsGame();
game.start();


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var tile_db_1 = __webpack_require__(1);
var alive_db_1 = __webpack_require__(3);
var MOVE_SPEED = 4 * 30;
var SIZE = 32;
var OFFSET = (tile_db_1.TILE_SIZE - SIZE) / 2.0;
var CLOSE_ENOUGH = 3.0;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, "Player", opts) || this;
        if (!_this.sprite)
            _this.sprite = alive_db_1.alives['player-south'].sprite;
        return _this;
    }
    Object.defineProperty(Player.prototype, "debugControls", {
        get: function () {
            return [
                { key: 'WASD', name: 'move' },
                { key: 'Mouse Wheel', name: 'zoom in/out' }
            ];
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.handleEvent = function (evt) {
        if (evt.type == 'mouseWheel') {
            var scale = Math.pow(2, -engine_1.clamp(evt.delta, -1, 1) / 7);
            this.scene.camera.zoomScale *= scale;
        }
    };
    Player.prototype.tick = function (delta) {
        var h = 0.0;
        if (this.events.isKeyDown('ArrowLeft') || this.events.isKeyDown('KeyA')) {
            h -= MOVE_SPEED;
        }
        if (this.events.isKeyDown('ArrowRight') || this.events.isKeyDown('KeyD')) {
            h += MOVE_SPEED;
        }
        var v = 0.0;
        if (this.events.isKeyDown('ArrowUp') || this.events.isKeyDown('KeyW')) {
            v -= MOVE_SPEED;
        }
        if (this.events.isKeyDown('ArrowDown') || this.events.isKeyDown('KeyS')) {
            v += MOVE_SPEED;
        }
        var thisTileX = engine_1.fmod(this.x, tile_db_1.TILE_SIZE);
        var thisTileY = engine_1.fmod(this.y, tile_db_1.TILE_SIZE);
        if (Math.abs(h) < CLOSE_ENOUGH) {
            this.hspeed = 0.0;
        }
        else {
            this.hspeed = ((Math.abs(h) < CLOSE_ENOUGH) ? this.hspeed : h);
            ;
        }
        if (Math.abs(v) < CLOSE_ENOUGH) {
            this.vspeed = 0.0;
        }
        else {
            this.vspeed = ((Math.abs(v) < CLOSE_ENOUGH) ? this.vspeed : v);
        }
        this.animationSpeed = this.speed > 0 ? .2 : 0;
        if (this.hspeed > 0)
            this.sprite = alive_db_1.alives['player-east'].sprite;
        else if (this.hspeed < 0)
            this.sprite = alive_db_1.alives['player-west'].sprite;
        else if (this.vspeed > 0)
            this.sprite = alive_db_1.alives['player-south'].sprite;
        else if (this.vspeed < 0)
            this.sprite = alive_db_1.alives['player-north'].sprite;
        var nextX = this.x + delta * this.hspeed;
        var nextY = this.y + delta * this.vspeed;
        var nextMinX = nextX;
        var nextMinY = nextY;
        var nextMaxX = (nextX + SIZE - 1);
        var nextMaxY = (nextY + SIZE - 1);
        var minTX = Math.floor(nextMinX / tile_db_1.TILE_SIZE) * tile_db_1.TILE_SIZE;
        var maxTX = Math.floor(nextMaxX / tile_db_1.TILE_SIZE) * tile_db_1.TILE_SIZE;
        var minTY = Math.floor(nextMinY / tile_db_1.TILE_SIZE) * tile_db_1.TILE_SIZE;
        var maxTY = Math.floor(nextMaxY / tile_db_1.TILE_SIZE) * tile_db_1.TILE_SIZE;
        var world = this.scene.world;
        if (this.hspeed > 0.0) {
            if ((nextMaxX > maxTX) && (world.getTileAt(maxTX / tile_db_1.TILE_SIZE, minTY / tile_db_1.TILE_SIZE).isSolid || world.getTileAt(maxTX / tile_db_1.TILE_SIZE, maxTY / tile_db_1.TILE_SIZE).isSolid)) {
                this.x = OFFSET + minTX;
                this.hspeed = 0.0;
            }
        }
        else if (this.hspeed < 0.0) {
            if ((nextMinX < maxTX) && (world.getTileAt(minTX / tile_db_1.TILE_SIZE, minTY / tile_db_1.TILE_SIZE).isSolid || world.getTileAt(minTX / tile_db_1.TILE_SIZE, maxTY / tile_db_1.TILE_SIZE).isSolid)) {
                this.x = OFFSET + maxTX;
                this.hspeed = 0.0;
            }
        }
        if (this.vspeed > 0.0) {
            if ((nextMaxY > maxTY) && (world.getTileAt(minTX / tile_db_1.TILE_SIZE, maxTY / tile_db_1.TILE_SIZE).isSolid || world.getTileAt(maxTX / tile_db_1.TILE_SIZE, maxTY / tile_db_1.TILE_SIZE).isSolid)) {
                this.y = OFFSET + minTY;
                this.vspeed = 0.0;
            }
        }
        else if (this.vspeed < 0.0) {
            if ((nextMinY < maxTY) && (world.getTileAt(minTX / tile_db_1.TILE_SIZE, minTY / tile_db_1.TILE_SIZE).isSolid || world.getTileAt(maxTX / tile_db_1.TILE_SIZE, minTY / tile_db_1.TILE_SIZE).isSolid)) {
                this.y = OFFSET + maxTY;
                this.vspeed = 0.0;
            }
        }
        _super.prototype.tick.call(this, delta);
    };
    return Player;
}(engine_1.GameObject));
exports.Player = Player;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var alive_db_1 = __webpack_require__(3);
var AlivePreloadStrategy = (function () {
    function AlivePreloadStrategy() {
    }
    AlivePreloadStrategy.prototype.preload = function (loader) {
        for (var alive in alive_db_1.alives) {
            loader.loadImage(alive_db_1.alives[alive].sprite.src);
        }
    };
    return AlivePreloadStrategy;
}());
exports.AlivePreloadStrategy = AlivePreloadStrategy;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tile_db_1 = __webpack_require__(1);
var TilePreloadStrategy = (function () {
    function TilePreloadStrategy() {
    }
    TilePreloadStrategy.prototype.preload = function (loader) {
        for (var tile in tile_db_1.tiles) {
            loader.loadImage(tile_db_1.tiles[tile].sprite.src);
        }
    };
    return TilePreloadStrategy;
}());
exports.TilePreloadStrategy = TilePreloadStrategy;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var world_1 = __webpack_require__(41);
var grid_renderer_1 = __webpack_require__(34);
var player_1 = __webpack_require__(36);
var bat_controller_1 = __webpack_require__(32);
var enemy_controller_1 = __webpack_require__(24);
var debug_controls_1 = __webpack_require__(23);
var FlockingScene = (function (_super) {
    __extends(FlockingScene, _super);
    function FlockingScene() {
        var _this = _super.call(this) || this;
        _this._world = null;
        _this._initialized = false;
        return _this;
    }
    Object.defineProperty(FlockingScene.prototype, "world", {
        get: function () {
            return this._world;
        },
        enumerable: true,
        configurable: true
    });
    FlockingScene.prototype.start = function () {
        _super.prototype.start.call(this);
        if (this._initialized)
            return;
        this._initialized = true;
        this._world = new world_1.World();
        this.addObject(this.world);
        this.addObject(new grid_renderer_1.GridRenderer(this.world));
        var player = new player_1.Player();
        this.addObject(player);
        var batController = new bat_controller_1.BatController();
        this.addObject(batController);
        batController.addBats(1000);
        var enemyController = new enemy_controller_1.EnemyController(this._world);
        this.addObject(enemyController);
        var debugControls = new debug_controls_1.DebugControls();
        this.addObject(debugControls);
        var camera = this.camera = new engine_1.FollowCamera(this);
        camera.follow = player;
        camera.enableSmoothing = false;
        camera.followOffset = [16, 16];
    };
    return FlockingScene;
}(engine_1.GameScene));
exports.FlockingScene = FlockingScene;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nnn = __webpack_require__(42);
var Noise = nnn.Noise;
var cache = new Map();
function generateNoise(seed, chunkx, chunky) {
    !cache.has(seed) && cache.set(seed, new Noise(seed));
    var noise = cache.get(seed);
    var columns = [];
    for (var q = 0; q < 64; q++) {
        var column = [];
        for (var w = 0; w < 64; w++) {
            column.push(noise.perlin2((chunkx * 64 + q) / 12, (chunky * 64 + w) / 12));
        }
        columns.push(column);
    }
    return columns;
}
exports.generateNoise = generateNoise;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(0);
var tile_db_1 = __webpack_require__(1);
var noise_1 = __webpack_require__(40);
var TIME_SCALE = 1 / (60 * 5);
var World = (function (_super) {
    __extends(World, _super);
    function World(seed) {
        if (seed === void 0) { seed = Math.random(); }
        var _this = _super.call(this, "World") || this;
        _this.seed = seed;
        _this._gameTime = 8 / 24;
        _this._chunks = new Map();
        return _this;
    }
    Object.defineProperty(World.prototype, "gameTime", {
        get: function () {
            return this._gameTime;
        },
        set: function (val) {
            this._gameTime = val;
        },
        enumerable: true,
        configurable: true
    });
    World.prototype.tick = function (delta) {
        this._gameTime += delta * TIME_SCALE;
    };
    World.prototype.getTileAt = function (x, y) {
        var chunk = this.getChunk(Math.floor(x / 64), Math.floor(y / 64));
        var _a = [engine_1.fmod(x, 64), engine_1.fmod(y, 64)], relativex = _a[0], relativey = _a[1];
        return chunk[relativex][relativey];
    };
    World.prototype.setTileAt = function (x, y, tile) {
        var chunk = this.getChunk(Math.floor(x / 64), Math.floor(y / 64));
        var _a = [engine_1.fmod(x, 64), engine_1.fmod(y, 64)], relativex = _a[0], relativey = _a[1];
        chunk[relativex][relativey] = tile;
        return this;
    };
    World.prototype.getChunk = function (x, y) {
        var key = x + ", " + y;
        !this._chunks.has(key) && this._chunks.set(key, this.generateChunk(x, y));
        return this._chunks.get(key);
    };
    World.prototype.generateChunk = function (x, y) {
        var noise = noise_1.generateNoise(this.seed, x, y);
        var chunk = [];
        for (var q = 0; q < 64; q++) {
            var column = [];
            for (var w = 0; w < 64; w++) {
                var num = noise[q][w];
                var name_1 = num < .2 ? "rock" + this.decorateNum(q, w, 7) :
                    "water" + this.decorateNum(w, q, 4);
                column.push(tile_db_1.tiles[name_1]);
            }
            chunk.push(column);
        }
        return chunk;
    };
    World.prototype.decorateNum = function (x, y, num) {
        for (var q = num; q > 1; q--) {
            var n = Math.random() * Math.pow(q, 6 - (num / 3));
            if (n < 1)
                return "" + q;
        }
        return '';
    };
    return World;
}(engine_1.GameObject));
exports.World = World;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

(function(global){

  // Passing in seed will seed this Noise instance
  function Noise(seed) {
    function Grad(x, y, z) {
      this.x = x; this.y = y; this.z = z;
    }

    Grad.prototype.dot2 = function(x, y) {
      return this.x*x + this.y*y;
    };

    Grad.prototype.dot3 = function(x, y, z) {
      return this.x*x + this.y*y + this.z*z;
    };

    this.grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

    this.p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    // To remove the need for index wrapping, double the permutation table length
    this.perm = new Array(512);
    this.gradP = new Array(512);

    this.seed(seed || 0);
  }

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  Noise.prototype.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    var p = this.p;
    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      var perm = this.perm;
      var gradP = this.gradP;
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = this.grad3[v % 12];
    }
  };

  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions
  var F2 = 0.5*(Math.sqrt(3)-1);
  var G2 = (3-Math.sqrt(3))/6;

  var F3 = 1/3;
  var G3 = 1/6;

  // 2D simplex noise
  Noise.prototype.simplex2 = function(xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin)*F2; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var t = (i+j)*G2;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
    var y2 = y0 - 1 + 2 * G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;

    var perm = this.perm;
    var gradP = this.gradP;
    var gi0 = gradP[i+perm[j]];
    var gi1 = gradP[i+i1+perm[j+j1]];
    var gi2 = gradP[i+1+perm[j+1]];
    // Calculate the contribution from the three corners
    var t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    var t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  Noise.prototype.simplex3 = function(xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    var s = (xin+yin+zin)*F3; // Hairy factor for 2D
    var i = Math.floor(xin+s);
    var j = Math.floor(yin+s);
    var k = Math.floor(zin+s);

    var t = (i+j+k)*G3;
    var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    var y0 = yin-j+t;
    var z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if(x0 >= y0) {
      if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    var x1 = x0 - i1 + G3; // Offsets for second corner
    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;

    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;

    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 255;
    j &= 255;
    k &= 255;

    var perm = this.perm;
    var gradP = this.gradP;
    var gi0 = gradP[i+   perm[j+   perm[k   ]]];
    var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
    var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
    var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

    // Calculate the contribution from the four corners
    var t0 = 0.5 - x0*x0-y0*y0-z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    var t1 = 0.5 - x1*x1-y1*y1-z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    var t2 = 0.5 - x2*x2-y2*y2-z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    var t3 = 0.5 - x3*x3-y3*y3-z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };

  // ##### Perlin noise stuff

  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  Noise.prototype.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var perm = this.perm;
    var gradP = this.gradP;
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
       fade(y));
  };

  // 3D Perlin Noise
  Noise.prototype.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255; Z = Z & 255;

    // Calculate noise contributions from each of the eight corners
    var perm = this.perm;
    var gradP = this.gradP;
    var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
    var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
    var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
    var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
    var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
    var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
    var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
    var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    var u = fade(x);
    var v = fade(y);
    var w = fade(z);

    // Interpolate
    return lerp(
        lerp(
          lerp(n000, n100, u),
          lerp(n001, n101, u), w),
        lerp(
          lerp(n010, n110, u),
          lerp(n011, n111, u), w),
       v);
  };

  global.Noise = Noise;

})( false ? this : module.exports);


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.map