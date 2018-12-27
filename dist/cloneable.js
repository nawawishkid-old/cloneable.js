// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"xYyu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName) {
      var _this$events$eventNam;

      if (!this.eventExists(eventName)) {
        this.events[eventName] = [];
      }

      for (var _len = arguments.length, callback = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        callback[_key - 1] = arguments[_key];
      }

      (_this$events$eventNam = this.events[eventName]).push.apply(_this$events$eventNam, callback);

      return this;
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      if (this.eventExists(eventName)) {
        this.events[eventName].forEach(function (callback) {
          return callback.call.apply(callback, [context].concat(args));
        });
      }

      return this;
    }
  }, {
    key: "eventExists",
    value: function eventExists(eventName) {
      return typeof this.events[eventName] !== "undefined";
    }
  }]);

  return EventEmitter;
}();

var _default = EventEmitter;
exports.default = _default;
},{}],"7LJ9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StateController =
/*#__PURE__*/
function () {
  function StateController() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StateController);

    this.eventEmitter = new _EventEmitter.default();
    this.initialState = initialState;
    this.state = initialState;
  }

  _createClass(StateController, [{
    key: "on",
    value: function on() {
      var _this$eventEmitter;

      (_this$eventEmitter = this.eventEmitter).on.apply(_this$eventEmitter, arguments);

      return this;
    }
  }, {
    key: "setState",
    value: function setState(newState) {
      this.eventEmitter.emit("beforeStateChange");
      this.state = _objectSpread({}, this.state, newState);
      this.eventEmitter.emit("afterStateChange");
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.state = this.initialState;
      return this;
    }
  }]);

  return StateController;
}();

var _default = StateController;
exports.default = _default;
},{"./EventEmitter":"xYyu"}],"l1Jr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OptionController =
/*#__PURE__*/
function () {
  function OptionController() {
    var defaultData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OptionController);

    this._data = defaultData;
  }

  _createClass(OptionController, [{
    key: "get",
    value: function get(key, fallback) {
      var data = this._dotNotationResolver(key);

      return typeof data === "undefined" ? fallback : data;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._data[key] = value;
      return this;
    }
  }, {
    key: "_dotNotationResolver",
    value: function _dotNotationResolver(dotNotationString) {
      return dotNotationString.split(".").reduce(function (d, key) {
        return d[key];
      }, this._data);
    }
  }]);

  return OptionController;
}();

var _default = OptionController;
exports.default = _default;
},{}],"rNwc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _StateController = _interopRequireDefault(require("./StateController"));

var _OptionController = _interopRequireDefault(require("./OptionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {object} CloneableEvents
 *
 * @prop {function[]} load - Array of listeners for 'load' event.
 * @prop {function[]} beforeStateChange - Array of listeners for 'beforeStateChange' event.
 * @prop {function[]} afterStateChange - Array of listeners for 'afterStateChange' event.
 * @prop {function[]} cloneButtonClick - Array of listeners for 'cloneButtonClick' event.
 * @prop {function[]} removeButtonClick - Array of listeners for 'removeButtonClick' event.
 * @prop {function[]} uncloneable - Array of listeners for 'uncloneable' event.
 */

/**
 * @typedef {object} CloneableOptions
 *
 * @property {number} maxCloneable - Maximum number of cloned elements allowed.
 * @property {bool} isAppend - Whether to append the cloned element or prepend it.
 * @property {HTMLElement} cloneButton - Element to be used as clone button.
 * @property {HTMLElement} removeButton - Element to be used as remove button.
 * @property {function[]} middlewares - Array of middleware functions.
 * @property {CloneableEvents} events - Object of Cloneable's event listeners.
 */
var Cloneable =
/*#__PURE__*/
function () {
  /**
   * @param {HTMLElement} container Container element.
   * @param {CloneableOptions} option Cloneable's option.
   */
  function Cloneable(container) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Cloneable);

    if (typeof container === "undefined") {
      throw new Error("Cloneable container must be defined");
    }

    if (container === null) {
      throw new Error("Cloneable container must not be null");
    }

    var type = container.constructor.name.slice(0, 3);

    if (type !== "SVG" && type !== "HTM") {
      throw new TypeError("Cloneable container must be a direct or inherited instance of HTMLElement or SVGElement class");
    }

    if (options === null || options.constructor !== Object) {
      var receivedType = options === null ? "null" : _typeof(options);
      throw new TypeError("Options parameter must be object, " + receivedType + " given.");
    }

    this.container = container;

    this._iniOptionController(options);

    this._initStateController();

    this.eventEmitter = new _EventEmitter.default();
    this.middlewares = this.optionController.get("middlewares"); // Init event listeners

    var events = this.optionController.get("events");
    Object.keys(events).forEach(function (eventName) {
      return _this.on.apply(_this, [eventName].concat(_toConsumableArray(events[eventName])));
    });
  }
  /**
   * Middleware function to manipulate the cloned element before add to document.
   *
   * @public
   * @param {...function} callback Callback function.
   * @return {Cloneable} This
   */


  _createClass(Cloneable, [{
    key: "middleware",
    value: function middleware() {
      var _this$middlewares;

      (_this$middlewares = this.middlewares).push.apply(_this$middlewares, arguments);

      return this;
    }
    /**
     * @see EventEmitter.on()
     * @return {Cloneable}
     */

  }, {
    key: "on",
    value: function on() {
      var _this$eventEmitter;

      (_this$eventEmitter = this.eventEmitter).on.apply(_this$eventEmitter, arguments);

      return this;
    }
    /**
     * Initialize DOM
     */

  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.cloneButton = this._getCloneButton();

      this._handleCustomRemoveButton();

      this._initControllersElement();

      this._initTrayElement();

      this._initContainerElement(); // Enable/disable clone button on clonedAmount change.


      this.stateController.on("afterStateChange", function () {
        _this2.eventEmitter.emit("afterStateChange", _this2);

        _this2.cloneButton.disabled = _this2._getState().clonedAmount === _this2._getState().maxCloneable;
      });
      this.stateController.on("beforeStateChange", function () {
        _this2.eventEmitter.emit("beforeStateChange", _this2);
      });
      this.eventEmitter.emit("load", this);
      return this;
    }
    /**
     * Check if the element still cloneable
     *
     * @return {bool}
     */

  }, {
    key: "isCloneable",
    value: function isCloneable() {
      return this._getState().clonedAmount < this._getState().maxCloneable;
    }
  }, {
    key: "_iniOptionController",
    value: function _iniOptionController(options) {
      var _this$container$datas = this.container.dataset,
          max = _this$container$datas.max,
          append = _this$container$datas.append; // Default options

      this.optionController = new _OptionController.default(_objectSpread({
        maxCloneable: parseInt(max) || Infinity,
        isAppend: append !== "false",
        cloneButton: null,
        removeButton: null,
        middlewares: [],
        events: {}
      }, options));
    }
  }, {
    key: "_initStateController",
    value: function _initStateController() {
      var maxCloneable = this.optionController.get("maxCloneable");
      this.stateController = new _StateController.default({
        maxCloneable: maxCloneable,
        cloneableAmount: maxCloneable,
        clonedAmount: 0,
        clonedElements: [],
        isAppend: this.optionController.get("isAppend")
      });
    }
    /**
     * Initialize Cloneable's .controllers element
     */

  }, {
    key: "_initControllersElement",
    value: function _initControllersElement() {
      this.controllers = this._createElement("div", {
        className: this._getConstant("CONTROLLERS_ELEMENT_CLASSNAME")
      });
      this.controllers.appendChild(this.cloneButton);
    }
    /**
     * Initialize Cloneable's .tray element
     */

  }, {
    key: "_initTrayElement",
    value: function _initTrayElement() {
      var tray = this._createElement("div", {
        className: this._getConstant("TRAY_ELEMENT_CLASSNAME")
      });

      tray.style.marginBottom = "1em";
      this.tray = tray;
    }
    /**
     * Initialize Cloneable's container element.
     */

  }, {
    key: "_initContainerElement",
    value: function _initContainerElement() {
      // this.container.style.padding = "1em";
      this.target = this.container.firstElementChild; // Add to document

      this.tray.appendChild(this.target);
      this.container.appendChild(this.tray);
      this.container.appendChild(this.controllers);
    }
    /**
     * Listener for cloneButton
     */

  }, {
    key: "clone",
    value: function clone() {
      if (!this.isCloneable()) {
        this.eventEmitter.emit("uncloneable", this);
        return;
      }

      this.eventEmitter.emit("beforeClone", this);

      var clonedElemWrapper = this._createClonedElementWrapper();

      var cloned = this.target.cloneNode(true);

      var removeButton = this._getRemoveButton();

      var insertMethod = this._getState().isAppend ? "appendChild" : "insertBefore"; // Append cloned element before apply middleware
      // so the middleware can access clonedElemWrapper via clonedElem.parentElement

      clonedElemWrapper.appendChild(cloned);
      clonedElemWrapper.appendChild(removeButton); // Could not use Node.insertAdjacentElement.
      // Not-a-function error is thrown.

      this.tray[insertMethod](clonedElemWrapper, this.tray.firstElementChild);

      var alteredCloned = this._applyMiddlewares(cloned);

      var _this$_getState = this._getState(),
          clonedAmount = _this$_getState.clonedAmount,
          cloneableAmount = _this$_getState.cloneableAmount,
          clonedElements = _this$_getState.clonedElements;

      this.stateController.setState({
        clonedAmount: clonedAmount + 1,
        cloneableAmount: cloneableAmount - 1,
        clonedElements: [].concat(_toConsumableArray(clonedElements), [alteredCloned])
      });
      this.eventEmitter.emit("afterClone", this);
      return this;
    }
    /**
     * Listener for removeButton
     */

  }, {
    key: "removeClonedElement",
    value: function removeClonedElement(id) {
      var target = this.tray.querySelector("[data-cloned-id=\"".concat(id, "\"]"));
      this.tray.removeChild(target);
      this.stateController.setState({
        clonedAmount: this._getState().clonedAmount - 1,
        cloneableAmount: this._getState().cloneableAmount + 1,
        clonedElements: _toConsumableArray(this.tray.querySelectorAll("[data-cloned-id]"))
      });
    }
  }, {
    key: "_getCloneButton",

    /**
     * Get clone button.
     * If no custom button found, create a new one.
     *
     * @return {HTMLButtonElement} Button.
     */
    value: function _getCloneButton() {
      var _this3 = this;

      var customBtn = this.optionController.get("cloneButton") || this._findCustomButton("clone");

      var btn = customBtn ? customBtn : this._createElement("button", {
        className: this._getConstant("CLONE_BUTTON_CLASSNAME"),
        textContent: "Clone"
      });
      btn.addEventListener("click", function () {
        _this3.eventEmitter.emit("cloneButtonClick", _this3);

        _this3.clone();
      });
      return btn;
    }
    /**
     * Get remove button.
     * If no custom button found, create a new one.
     *
     * @return {HTMLButtonElement} Button.
     */

  }, {
    key: "_getRemoveButton",
    value: function _getRemoveButton() {
      var _this4 = this;

      var btn = this.removeButtonTemplate ? this.removeButtonTemplate.cloneNode(true) : this._createElement("button", {
        className: this._getConstant("REMOVE_BUTTON_CLASSNAME"),
        textContent: "Remove"
      }); // btn.style.position = "absolute";
      // btn.style.top = "5px";
      // btn.style.right = "5px";

      btn.addEventListener("click", function (e) {
        _this4.eventEmitter.emit("removeButtonClick", _this4);

        _this4.removeClonedElement(e.target.parentElement.dataset.clonedId);
      });
      return btn;
    }
    /**
     * Apply all registered middlewares to cloned element.
     *
     * @param {HTMLElement} cloned Cloned element.
     * @return {HTMLElement} Modified cloned element.
     */

  }, {
    key: "_applyMiddlewares",
    value: function _applyMiddlewares(cloned) {
      var _this5 = this;

      var constructor = cloned.constructor;
      return this.middlewares.reduce(function (cln, mdlw) {
        var alteredCloned = mdlw.call(_this5, cln, _this5._getState().clonedAmount + 1);

        if (typeof alteredCloned === "undefined" || alteredCloned.constructor !== constructor) {
          throw new TypeError("Middleware must return the cloned element");
        }

        return alteredCloned;
      }, cloned);
    }
    /**
     * Clone and remove custome remove button element.
     */

  }, {
    key: "_handleCustomRemoveButton",
    value: function _handleCustomRemoveButton() {
      var customBtn = this.optionController.get("removeButton") || this._findCustomButton("remove");

      if (!customBtn) {
        return;
      }

      this.removeButtonTemplate = customBtn.cloneNode(true); // If it has parent, remove it.

      if (customBtn.parentElement) {
        customBtn.parentElement.removeChild(customBtn);
      }
    }
    /**
     * Create element to hold cloned element.
     *
     * @return {HTMLDivElement} ClonedElementWrapper.
     */

  }, {
    key: "_createClonedElementWrapper",
    value: function _createClonedElementWrapper() {
      var clonedElemWrapper = this._createElement("div", this._getConstant("CLONED_ELEMENT_CLASSNAME"));

      clonedElemWrapper.dataset.clonedId = this._getState().clonedAmount + 1; // clonedElemWrapper.style.position = "relative";

      return clonedElemWrapper;
    }
    /**
     * Find custom clone/remove button.
     *
     * @return {HTMLElement|null} Found element or null.
     */

  }, {
    key: "_findCustomButton",
    value: function _findCustomButton(buttonType) {
      return this.container.querySelector("[data-cloneable-".concat(buttonType, "-btn]"));
    }
    /**
     * A decorator function for document.createElement()
     *
     * @param {string} tagName Element's tag name
     * @param {object} attributes Object of the element's attributes
     * @return {HTMLElement} Created HTMLElement.
     */

  }, {
    key: "_createElement",
    value: function _createElement(tagName, attributes) {
      var elem = document.createElement(tagName);
      Object.keys(attributes).forEach(function (key) {
        return elem[key] = attributes[key];
      });
      return elem;
    }
  }, {
    key: "_getState",
    value: function _getState() {
      return this.stateController.state;
    }
    /**
     * Get Cloneable class' constants
     *
     * @param {string} key Constant key.
     * @return {string} Constant value.
     */

  }, {
    key: "_getConstant",
    value: function _getConstant(key) {
      return this.constructor.constants[key];
    }
  }, {
    key: "clonedElements",
    get: function get() {
      return this._getState().clonedElements;
    }
  }]);

  return Cloneable;
}();

Cloneable.constants = Object.freeze({
  CLONE_BUTTON_CLASSNAME: "clone-btn",
  REMOVE_BUTTON_CLASSNAME: "remove-btn",
  TRAY_ELEMENT_CLASSNAME: "tray",
  CLONED_ELEMENT_CLASSNAME: "cloned",
  CONTROLLERS_ELEMENT_CLASSNAME: "controllers"
});
var _default = Cloneable;
exports.default = _default;
},{"./EventEmitter":"xYyu","./StateController":"7LJ9","./OptionController":"l1Jr"}],"79Wc":[function(require,module,exports) {
"use strict";

var _Cloneable = _interopRequireDefault(require("./Cloneable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Cloneable = _Cloneable.default;
},{"./Cloneable":"rNwc"}]},{},["79Wc"], null)
//# sourceMappingURL=/cloneable.map