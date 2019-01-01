class EventEmitter {
  constructor() {
    this._events = {};
  }

  get events() {
    return this._events;
  }

  on(eventName, ...callback) {
    if (!this.eventExists(eventName)) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(...callback);

    return this;
  }

  emit(eventName, context = null, ...args) {
    if (this.eventExists(eventName)) {
      this._events[eventName].forEach(callback =>
        callback.call(context, ...args)
      );
    }

    return this;
  }

  eventExists(eventName) {
    return typeof this._events[eventName] !== "undefined";
  }
}

export default EventEmitter;
