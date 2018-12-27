import Cloneable from "../src/Cloneable";
import EventEmitter from "../src/EventEmitter";
// import OptionController from "../src/OptionController";

const getCloneable = (options = {}) => new Cloneable(getContainer(), options);

const getContainer = () => {
  const div = document.createElement("div");

  div.innerHTML = "<p>Clone me!</p>";

  return div;
};

const getContainerWithCustomButtons = () => {
  const container = getContainer();
  const cloneBtn = getCustomButton();
  const removeBtn = getCustomButton();

  cloneBtn.dataset.cloneableCloneBtn = "";
  removeBtn.dataset.cloneableRemoveBtn = "";

  container.appendChild(cloneBtn);
  container.appendChild(removeBtn);

  return { container, cloneBtn, removeBtn };
};

const getCustomButton = () => {
  const btn = document.createElement("button");

  btn.textContent = "Click me";

  return btn;
};

describe("Cloneable", () => {
  describe("Instantiation", () => {
    test("Should throws Error if first parameter is not given", () => {
      const instantiate = () => new Cloneable();

      expect(instantiate).toThrow(Error);
      expect(instantiate).toThrow("Cloneable container must be defined");
    });

    test("Should throws TypeError if first parameter is not HTML or SVG element", () => {
      const instantiate = () => new Cloneable("div");

      expect(instantiate).toThrow(TypeError);
      expect(instantiate).toThrow(
        "Cloneable container must be a direct or inherited instance of HTMLElement or SVGElement class"
      );
    });

    test("Should throws TypeError if second parameter is not an object", () => {
      const instantiate = () => new Cloneable(getContainer(), "string");

      expect(instantiate).toThrow(TypeError);
      expect(instantiate).toThrow(
        "Options parameter must be object, string given"
      );
    });

    test("Should throws TypeError if second parameter is null", () => {
      const instantiate = () => new Cloneable(getContainer(), null);

      expect(instantiate).toThrow(TypeError);
      expect(instantiate).toThrow(
        "Options parameter must be object, null given"
      );
    });

    test("Should assigns first parameter to this.container", () => {
      const elem = getContainer();
      const cloneable = new Cloneable(elem);

      expect(cloneable.container).toEqual(elem);
    });

    test("Should assigns EventEmitter instance to this.eventEmitter", () => {
      const cloneable = new Cloneable(getContainer());

      expect(cloneable.eventEmitter.constructor).toEqual(EventEmitter);
    });
  });

  describe("default options", () => {
    test("Default middlewares should be empty array.", () => {
      const cloneable = new Cloneable(getContainer());

      expect(cloneable.middlewares).toEqual([]);
    });
  });

  describe("Use options from HTML data-* attribute", () => {
    test("data-cloneable-clone-btn", () => {
      const { container, cloneBtn } = getContainerWithCustomButtons();
      const cloneable = new Cloneable(container);

      cloneable.init();

      expect(cloneable.cloneButton.isSameNode(cloneBtn)).toBeTruthy();
    });

    test("data-cloneable-remove-btn", () => {
      const { container, removeBtn } = getContainerWithCustomButtons();
      const cloneable = new Cloneable(container);

      cloneable.init().clone();

      expect(
        cloneable.clonedElements[0].nextElementSibling.isEqualNode(removeBtn)
      ).toBeTruthy();
    });

    test("data-max", () => {
      const container = getContainer();
      const MAX = 3;

      container.dataset.max = MAX;

      const cloneable = new Cloneable(container);

      // Should have just 3 cloned elements.
      expect(cloneable.optionController.get("maxCloneable")).toBe(MAX);
    });

    test("data-append", () => {
      const container = getContainer();
      const isAppend = false;

      container.dataset.append = isAppend.toString();

      const cloneable = new Cloneable(container);

      expect(cloneable.optionController.get("isAppend")).toBe(isAppend);
    });
  });

  describe("Use options from JavaScript CloneableOptions object", () => {
    test("maxCloneable", () => {
      const maxCloneable = 3;
      const cloneable = getCloneable({ maxCloneable });

      expect(cloneable.optionController.get("maxCloneable")).toBe(maxCloneable);
    });

    test("isAppend", () => {
      const isAppend = false;
      const cloneable = getCloneable({ isAppend });

      expect(cloneable.optionController.get("isAppend")).toBe(isAppend);
    });

    test("cloneButton", () => {
      const cloneButton = getCustomButton();
      const cloneable = getCloneable({ cloneButton }).init();

      expect(cloneable.cloneButton.isSameNode(cloneButton)).toBeTruthy();
    });

    test("removeButton", () => {
      const removeButton = getCustomButton();
      const cloneable = getCloneable({ removeButton }).init();

      expect(
        cloneable.removeButtonTemplate.isEqualNode(removeButton)
      ).toBeTruthy();
    });

    test("middlewares", () => {
      const middlewares = [() => {}, () => {}];
      const cloneable = getCloneable({ middlewares });

      expect(cloneable.middlewares).toBe(middlewares);
    });

    test("events", () => {
      const events = {
        load: [() => {}]
      };
      const cloneable = getCloneable({ events });

      expect(cloneable.eventEmitter.events).toEqual(events);
    });
  });

  describe("HTML data-* attribute options overriding", () => {
    test("data-max -> maxCloneable", () => {
      const container = getContainer();
      const MAX = 5;

      container.dataset.max = 2;

      const cloneable = new Cloneable(container, { maxCloneable: MAX });

      // Should have just 3 cloned elements.
      expect(cloneable.optionController.get("maxCloneable")).toBe(MAX);
    });

    test("data-append -> isAppend", () => {
      const container = getContainer();
      const isAppend = true;

      container.dataset.append = "false";

      const cloneable = new Cloneable(container, { isAppend });

      expect(cloneable.optionController.get("isAppend")).toBe(isAppend);
    });

    test("data-cloneable-clone-button -> cloneButton", () => {
      const { container } = getContainerWithCustomButtons();
      const cloneButton = getCustomButton();
      const cloneable = new Cloneable(container, {
        cloneButton
      });

      cloneable.init();

      expect(cloneable.cloneButton.isSameNode(cloneButton)).toBeTruthy();
    });

    test("data-cloneable-remove-button -> removeButton", () => {
      const { container } = getContainerWithCustomButtons();
      const removeButton = getCustomButton();
      const cloneable = new Cloneable(container, { removeButton });

      cloneable.init().clone();

      expect(
        cloneable.clonedElements[0].nextElementSibling.isEqualNode(removeButton)
      ).toBeTruthy();
    });
  });

  describe("Behavior", () => {
    test("Should not clone if number of cloned elements reach maxCloneable value", () => {
      const container = getContainer();
      const MAX = 3;
      const cloneable = new Cloneable(container, { maxCloneable: MAX });

      cloneable.init();
      Array(MAX + 1)
        .fill("")
        .forEach(() => cloneable.clone());

      // Should have just ${MAX} cloned elements.
      expect(cloneable.clonedElements.length).toBe(MAX);
    });

    test("Should accepts middleware function to alter cloned element", () => {
      const elem = getContainer();
      const id = "hahaha";
      const cloneable = new Cloneable(elem);

      cloneable
        .middleware(cloned => {
          cloned.id = id;

          return cloned;
        })
        .init();
      cloneable.clone();

      expect(cloneable.clonedElements[0].id).toEqual(id);
    });

    test("Should stores every cloned elements", () => {
      const toBeCloned = document.createElement("p");
      const container = document.createElement("div");

      toBeCloned.textContent = "Clone me";

      container.appendChild(toBeCloned);

      const cloneable = new Cloneable(container);

      cloneable
        .init()
        .clone()
        .clone();

      expect(cloneable.clonedElements).toEqual([toBeCloned, toBeCloned]);
    });
  });
});
