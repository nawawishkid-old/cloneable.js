import Cloneable from "./Cloneable";

const changeTextColorMiddleware = function(cloned, index) {
  cloned.style.color = "red";
  console.log(this._getState().clonedElements);

  return cloned;
};
const opacityTransitionMiddleware = function(cloned, index) {
  const parent = cloned.parentElement;

  parent.style.opacity = 0;
  parent.style.transition = "opacity .4s";

  setTimeout(() => (parent.style.opacity = 1), 1000);

  return cloned;
};
const options = {
  "cloneable-default-style": { maxCloneable: 2, isAppend: true },
  "cloneable-custom-style": {
    maxCloneable: 5,
    isAppend: false,
    events: {
      load: [() => console.log("LOADED!")]
    }
  },
  "cloneable-middleware": {
    middlewares: [changeTextColorMiddleware, opacityTransitionMiddleware]
  }
};

document.querySelectorAll(".cloneable").forEach(elem => {
  new Cloneable(elem, options[elem.id])
    .on("load", function() {
      this.container.classList.remove("is-invisible");
    })
    .init();
});

const getContainer = () => {
  const div = document.createElement("div");
  const toBeCloned = document.createElement("p");

  toBeCloned.textContent = "Clone me!!!";

  div.appendChild(toBeCloned);

  return div;
};
const customCloneButton = () => {
  const btn = document.createElement("button");

  btn.className = "button is-outlined is-primary";
  btn.textContent = "Add more";

  return btn;
};
const customRemoveButton = () => {
  const btn = document.createElement("span");

  btn.className = "delete";

  return btn;
};
const specialCloneable = new Cloneable(getContainer(), {
  cloneButton: customCloneButton(),
  removeButton: customRemoveButton()
});

specialCloneable
  .on("load", function() {
    document.body.appendChild(this.container);
  })
  .init();
