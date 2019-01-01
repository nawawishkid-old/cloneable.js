class OptionController {
  constructor(defaultData = {}) {
    this._data = defaultData;
  }

  get options() {
    return this._data;
  }

  get(key, fallback) {
    const data = this._dotNotationResolver(key);

    return typeof data === "undefined" ? fallback : data;
  }

  set(key, value) {
    this._data[key] = value;

    return this;
  }

  _dotNotationResolver(dotNotationString) {
    return dotNotationString.split(".").reduce((d, key) => d[key], this._data);
  }
}

export default OptionController;
