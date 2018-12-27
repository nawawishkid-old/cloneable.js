import EventEmitter from "./EventEmitter";

class StateController {
  constructor(initialState = {}) {
    this.eventEmitter = new EventEmitter();
    this.initialState = initialState;
    this.state = initialState;
  }

  on(...args) {
    this.eventEmitter.on(...args);

    return this;
  }

  setState(newState) {
    this.eventEmitter.emit("beforeStateChange");
    this.state = { ...this.state, ...newState };
    this.eventEmitter.emit("afterStateChange");

    return this;
  }

  reset() {
    this.state = this.initialState;

    return this;
  }
}

export default StateController;
