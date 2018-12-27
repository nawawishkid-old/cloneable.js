class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, ...callback) {
    if (!this.eventExists(eventName)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(...callback);

    return this;
  }

  emit(eventName, context = null, ...args) {
    if (this.eventExists(eventName)) {
      this.events[eventName].forEach(callback =>
        callback.call(context, ...args)
      );
    }

    return this;
  }

  eventExists(eventName) {
    return typeof this.events[eventName] !== "undefined";
  }
}

export default EventEmitter;
