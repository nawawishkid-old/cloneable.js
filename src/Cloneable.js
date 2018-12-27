import EventEmitter from "./EventEmitter";
import StateController from "./StateController";
import OptionController from "./OptionController";

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

class Cloneable {
  /**
   * @param {HTMLElement} container Container element.
   * @param {CloneableOptions} option Cloneable's option.
   */
  constructor(container, options = {}) {
    if (typeof container === "undefined") {
      throw new Error("Cloneable container must be defined");
    }

    if (container === null) {
      throw new Error("Cloneable container must not be null");
    }

    const type = container.constructor.name.slice(0, 3);

    if (type !== "SVG" && type !== "HTM") {
      throw new TypeError(
        "Cloneable container must be a direct or inherited instance of HTMLElement or SVGElement class"
      );
    }

    if (options === null || options.constructor !== Object) {
      const receivedType = options === null ? "null" : typeof options;

      throw new TypeError(
        "Options parameter must be object, " + receivedType + " given."
      );
    }

    this.container = container;
    this._iniOptionController(options);
    this._initStateController();
    this.eventEmitter = new EventEmitter();
    this.middlewares = this.optionController.get("middlewares");

    // Init event listeners
    const events = this.optionController.get("events");

    Object.keys(events).forEach(eventName =>
      this.on(eventName, ...events[eventName])
    );
  }

  /**
   * Middleware function to manipulate the cloned element before add to document.
   *
   * @public
   * @param {...function} callback Callback function.
   * @return {Cloneable} This
   */
  middleware(...callback) {
    this.middlewares.push(...callback);

    return this;
  }

  /**
   * @see EventEmitter.on()
   * @return {Cloneable}
   */
  on(...args) {
    this.eventEmitter.on(...args);

    return this;
  }

  /**
   * Initialize DOM
   */
  init() {
    this.cloneButton = this._getCloneButton();
    this._handleCustomRemoveButton();
    this._initControllersElement();
    this._initTrayElement();
    this._initContainerElement();

    // Enable/disable clone button on clonedAmount change.
    this.stateController.on("afterStateChange", () => {
      this.eventEmitter.emit("afterStateChange", this);

      this.cloneButton.disabled =
        this._getState().clonedAmount === this._getState().maxCloneable;
    });
    this.stateController.on("beforeStateChange", () => {
      this.eventEmitter.emit("beforeStateChange", this);
    });

    this.eventEmitter.emit("load", this);

    return this;
  }

  /**
   * Check if the element still cloneable
   *
   * @return {bool}
   */
  isCloneable() {
    return this._getState().clonedAmount < this._getState().maxCloneable;
  }

  _iniOptionController(options) {
    const { max, append } = this.container.dataset;
    // Default options
    this.optionController = new OptionController({
      maxCloneable: parseInt(max) || Infinity,
      isAppend: append !== "false",
      cloneButton: null,
      removeButton: null,
      middlewares: [],
      events: {},
      ...options
    });
  }

  _initStateController() {
    const maxCloneable = this.optionController.get("maxCloneable");

    this.stateController = new StateController({
      maxCloneable,
      cloneableAmount: maxCloneable,
      clonedAmount: 0,
      clonedElements: [],
      isAppend: this.optionController.get("isAppend")
    });
  }

  /**
   * Initialize Cloneable's .controllers element
   */
  _initControllersElement() {
    this.controllers = this._createElement("div", {
      className: this._getConstant("CONTROLLERS_ELEMENT_CLASSNAME")
    });
    this.controllers.appendChild(this.cloneButton);
  }

  /**
   * Initialize Cloneable's .tray element
   */
  _initTrayElement() {
    const tray = this._createElement("div", {
      className: this._getConstant("TRAY_ELEMENT_CLASSNAME")
    });

    tray.style.marginBottom = "1em";

    this.tray = tray;
  }

  /**
   * Initialize Cloneable's container element.
   */
  _initContainerElement() {
    // this.container.style.padding = "1em";
    this.target = this.container.firstElementChild;

    // Add to document
    this.tray.appendChild(this.target);
    this.container.appendChild(this.tray);
    this.container.appendChild(this.controllers);
  }

  /**
   * Listener for cloneButton
   */
  clone() {
    if (!this.isCloneable()) {
      this.eventEmitter.emit("uncloneable", this);

      return;
    }

    this.eventEmitter.emit("beforeClone", this);

    const clonedElemWrapper = this._createClonedElementWrapper();
    const cloned = this.target.cloneNode(true);
    const removeButton = this._getRemoveButton();
    const insertMethod = this._getState().isAppend
      ? "appendChild"
      : "insertBefore";

    // Append cloned element before apply middleware
    // so the middleware can access clonedElemWrapper via clonedElem.parentElement
    clonedElemWrapper.appendChild(cloned);
    clonedElemWrapper.appendChild(removeButton);
    // Could not use Node.insertAdjacentElement.
    // Not-a-function error is thrown.
    this.tray[insertMethod](clonedElemWrapper, this.tray.firstElementChild);

    const alteredCloned = this._applyMiddlewares(cloned);
    const { clonedAmount, cloneableAmount, clonedElements } = this._getState();

    this.stateController.setState({
      clonedAmount: clonedAmount + 1,
      cloneableAmount: cloneableAmount - 1,
      clonedElements: [...clonedElements, alteredCloned]
    });

    this.eventEmitter.emit("afterClone", this);

    return this;
  }

  /**
   * Listener for removeButton
   */
  removeClonedElement(id) {
    const target = this.tray.querySelector(`[data-cloned-id="${id}"]`);

    this.tray.removeChild(target);

    this.stateController.setState({
      clonedAmount: this._getState().clonedAmount - 1,
      cloneableAmount: this._getState().cloneableAmount + 1,
      clonedElements: [...this.tray.querySelectorAll("[data-cloned-id]")]
    });
  }

  get clonedElements() {
    return this._getState().clonedElements;
  }

  /**
   * Get clone button.
   * If no custom button found, create a new one.
   *
   * @return {HTMLButtonElement} Button.
   */
  _getCloneButton() {
    const customBtn =
      this.optionController.get("cloneButton") ||
      this._findCustomButton("clone");
    const btn = customBtn
      ? customBtn
      : this._createElement("button", {
          className: this._getConstant("CLONE_BUTTON_CLASSNAME"),
          textContent: "Clone"
        });

    btn.addEventListener("click", () => {
      this.eventEmitter.emit("cloneButtonClick", this);
      this.clone();
    });

    return btn;
  }

  /**
   * Get remove button.
   * If no custom button found, create a new one.
   *
   * @return {HTMLButtonElement} Button.
   */
  _getRemoveButton() {
    const btn = this.removeButtonTemplate
      ? this.removeButtonTemplate.cloneNode(true)
      : this._createElement("button", {
          className: this._getConstant("REMOVE_BUTTON_CLASSNAME"),
          textContent: "Remove"
        });

    // btn.style.position = "absolute";
    // btn.style.top = "5px";
    // btn.style.right = "5px";

    btn.addEventListener("click", e => {
      this.eventEmitter.emit("removeButtonClick", this);
      this.removeClonedElement(e.target.parentElement.dataset.clonedId);
    });

    return btn;
  }

  /**
   * Apply all registered middlewares to cloned element.
   *
   * @param {HTMLElement} cloned Cloned element.
   * @return {HTMLElement} Modified cloned element.
   */
  _applyMiddlewares(cloned) {
    const { constructor } = cloned;

    return this.middlewares.reduce((cln, mdlw) => {
      const alteredCloned = mdlw.call(
        this,
        cln,
        this._getState().clonedAmount + 1
      );

      if (
        typeof alteredCloned === "undefined" ||
        alteredCloned.constructor !== constructor
      ) {
        throw new TypeError("Middleware must return the cloned element");
      }

      return alteredCloned;
    }, cloned);
  }

  /**
   * Clone and remove custome remove button element.
   */
  _handleCustomRemoveButton() {
    const customBtn =
      this.optionController.get("removeButton") ||
      this._findCustomButton("remove");

    if (!customBtn) {
      return;
    }

    this.removeButtonTemplate = customBtn.cloneNode(true);

    // If it has parent, remove it.
    if (customBtn.parentElement) {
      customBtn.parentElement.removeChild(customBtn);
    }
  }

  /**
   * Create element to hold cloned element.
   *
   * @return {HTMLDivElement} ClonedElementWrapper.
   */
  _createClonedElementWrapper() {
    const clonedElemWrapper = this._createElement(
      "div",
      this._getConstant("CLONED_ELEMENT_CLASSNAME")
    );

    clonedElemWrapper.dataset.clonedId = this._getState().clonedAmount + 1;
    // clonedElemWrapper.style.position = "relative";

    return clonedElemWrapper;
  }

  /**
   * Find custom clone/remove button.
   *
   * @return {HTMLElement|null} Found element or null.
   */
  _findCustomButton(buttonType) {
    return this.container.querySelector(`[data-cloneable-${buttonType}-btn]`);
  }

  /**
   * A decorator function for document.createElement()
   *
   * @param {string} tagName Element's tag name
   * @param {object} attributes Object of the element's attributes
   * @return {HTMLElement} Created HTMLElement.
   */
  _createElement(tagName, attributes) {
    const elem = document.createElement(tagName);

    Object.keys(attributes).forEach(key => (elem[key] = attributes[key]));

    return elem;
  }

  _getState() {
    return this.stateController.state;
  }

  /**
   * Get Cloneable class' constants
   *
   * @param {string} key Constant key.
   * @return {string} Constant value.
   */
  _getConstant(key) {
    return this.constructor.constants[key];
  }
}

Cloneable.constants = Object.freeze({
  CLONE_BUTTON_CLASSNAME: "clone-btn",
  REMOVE_BUTTON_CLASSNAME: "remove-btn",
  TRAY_ELEMENT_CLASSNAME: "tray",
  CLONED_ELEMENT_CLASSNAME: "cloned",
  CONTROLLERS_ELEMENT_CLASSNAME: "controllers"
});

export default Cloneable;
