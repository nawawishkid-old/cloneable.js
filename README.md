# Cloneable.js

Make specific HTMLElement cloneable.

# TODO:

- [ ] event listener registration test

# Installation

## NPM

```shell
npm i @nawawishkid/cloneable
```

## Remote URL

On npm: [https://cdn.jsdelivr.net/npm/@nawawishkid/cloneable@1.0.1/dist/cloneable.min.js](https://cdn.jsdelivr.net/npm/@nawawishkid/cloneable@1.0.1/dist/cloneable.min.js)  
On GitHub: [https://cdn.jsdelivr.net/gh/nawawishkid/cloneable.js@1.0.1/dist/cloneable.min.js](https://cdn.jsdelivr.net/gh/nawawishkid/cloneable.js@1.0.1/dist/cloneable.min.js)

# NPM Scripts

- `build` -- Build (bundle) this library.
- `try` -- Serve example usage website locally using Parcel.js.
- `test` -- Run test suite.

# Quick start

In your `index.html`:

```html
<div id="cloneable-container"><p>Clone me!</p></div>

<script src="src/index.js"></script>
```

In your `src/index.js`:

```javascript
// For NPM only
// import Cloneable from "@nawawishkid/cloneable.js"

const container = document.getElementById("cloneable-container");
const cloneable = new Cloneable(container);

cloneable.init();
```

Now the `#cloneable-container` will be like:

```html
<div id="cloneable-container">
  <div class="tray">
    <p>Clone me!</p>
    <div class="cloned" data-cloned-id="1">
      <p>Clone me!</p>
      <button class="remove-btn">Remove</button>
    </div>
  </div>
  <div class="controllers"><button class="clone-btn">Clone</button></div>
</div>
```

Now, you can click `.clone-btn` button to clone `<p>Clone me!</p>` or clicking `.remove-btn` button to remove cloned element.

# API

## Types

### `CloneableEvents`

Object of events that `Cloneable` accepts.

| name                | type         | default          | isRequired | explanation                                                                 |
| ------------------- | ------------ | ---------------- | ---------- | --------------------------------------------------------------------------- |
| `load`              | `function[]` | `[]` Empty array | `false`    | Array of event listeners (callback function) for `load` event               |
| `beforeStateChange` | `function[]` | `[]` Empty array | `false`    | Array of event listernes (callback functions) for `beforeStateChange` event |

### `CloneableOptions`

Object of options for `Cloneable` instance.

| name           | type              | default           | isRequired | explanation                                                                       |
| -------------- | ----------------- | ----------------- | ---------- | --------------------------------------------------------------------------------- |
| `maxCloneable` | `number`          | `Infinity`        | `false`    | Maximum number of cloned element                                                  |
| `isAppend`     | `bool`            | `true`            | `false`    | Whether the cloned element will be append or prepend to the source element        |
| `cloneButton`  | `HTMLElement`     | `null`            | `false`    | `HTMLElement` to be used as clone button                                          |
| `removeButton` | `HTMLElement`     | `null`            | `false`    | `HTMLElement` to be cloned and then used as remove button for each cloned element |
| `middlewares`  | `function[]`      | `[]` Empty array  | `false`    | Array of callback functions to be called with cloned element as an argument       |
| `events`       | `CloneableEvents` | `{}` Empty object | `false`    | `CloneableEvents` object                                                          |

## Instantiation

### `Cloneable(HTMLElement container, CloneableOptions options = {})`

Instantiate cloneable object.

#### Parameters

| name        | type               | default           | isRequired | explanation                                                    |
| ----------- | ------------------ | ----------------- | ---------- | -------------------------------------------------------------- |
| `container` | `HTMLElement`      | `undefined`       | `true`     | Any `HTMLElement` that its `firstElementChild` will be cloned. |
| `options`   | `CloneableOptions` | `{}` Empty object | `false`    | `CloneableOptions` object                                      |

#### Example

```javascript
const options = {
  maxCloneable: 10,
  isAppend: false,
  cloneButton: document.querySelector(".my-clone-button"),
  removeButton: document.querySelector(".my-remove-button")
};
const container = document.getElementById("cloneable-container");
const cloneable = new Cloneable(container, options);
```

## Methods

### `Cloneable.init()`

Initialize manipulation of given container element. You can't clone element without calling this method first.

This method will:

1. Create `.tray` element.
2. Move `firstElementChild` of the given container (the source element to be cloned) to the `.tray` element.
3. Create `.controllers` element.
4. Get/create `.clone-btn` button then append to the `.controllers` element.
5. Append the `.tray` and `.controllers` elements to the given container.

#### Return

`this`

#### Example

```javascript
// Nothing in document changes at this point
const cloneable = new Cloneable(container);

// DOM manipulated! Ready to clone element.
cloneable.init();
```

### `Cloneable.clone()`

Clone the element programmatically.

Clone the element, wrap it with wrapper element, then inject them into the given container element. The wrapper element has been assigned `data-cloned-id` attribute so that it can be refered to later e.g. used by `Cloneable.removeClonedElement()` method.

#### Return

`this`

### `Cloneable.removeClonedElement(Number id)`

Remove the cloned element programmatically.

Remove cloned element with specified ID. Cloned element ID is a sequential number of cloning order. The first cloned element's ID is 1, the second is 2, and so on.

This method will find element using `Cloneable.tray.querySelector('[data-cloned-id="${id}"]')` then remove it.

#### Parameters

| name | type     | default     | isRequired | explanation                        |
| ---- | -------- | ----------- | ---------- | ---------------------------------- |
| `id` | `number` | `undefined` | `true`     | ID of cloned element to be removed |

#### Return

`this`

#### Example

```javascript
const cloneable = new Cloneable(container);

// Clone element 2 times. Now, we have 2 cloned elements.
cloneable
  .init()
  .clone()
  .clone();

// Remove first cloned element. Now, there is only 1 cloned element.
cloneable.removeClonedElement(1);
```

### `Cloneable.middleware(...callbacks)`

Register middleware function to be called with cloned element as an argument. Use to alter the cloned element.  
This method accepts argument list.

#### Parameters

| name       | type       | default     | isRequired | explanation                                                                                                                      |
| ---------- | ---------- | ----------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | `function` | `undefined` | `true`     | Middleware function which accepts the cloned element as the first argument and cloned element's index or ID as a second argument |

#### Return

`this`

#### Example

Change `textContent` of the cloned element.

```javascript
const cloneable = new Cloneable(container);

cloneable
  .middleware((cloned, index) => {
    cloned.textContent = `Cloned #${index}`;

    return cloned;
  })
  .init();
```

### `Cloneable.on(String eventName, ...eventListener)`

Add event listener to the `Cloneable` object. Similar to Node.js `EventEmitter` class.

This method accepts argument list.

#### Parameters

| name            | type       | default     | isRequired | explanation                                                     |
| --------------- | ---------- | ----------- | ---------- | --------------------------------------------------------------- |
| `eventName`     | `string`   | `undefined` | `true`     | Event name. See available event at `CloneableEvents`.           |
| `eventListener` | `function` | `undefined` | `true`     | Event listener callback function to be called on event occurred |

#### Return

`this`

#### Example

```javascript
const cloneable = new Cloneable(container);

cloneable.on("beforeStateChange", () => {
  console.log("State is gonna change!");
});

cloneable.init();
```

### `Cloneable.isCloneable()`

Check if it's still cloneable.

#### Return

| type   | value   | when                                                                       |
| ------ | ------- | -------------------------------------------------------------------------- |
| `bool` | `true`  | Number of cloned elements is less than `maxCloneable` value                |
| `bool` | `false` | Number of cloned elements is greater than or equal to `maxCloneable` value |

#### Example

```javascript
const cloneable = new Cloneable(container, { maxCloneable: 2 });

cloneable.init();
cloneable.clone().isCloneable(); // -> true
cloneable.clone().isCloneable(); // -> false
```
