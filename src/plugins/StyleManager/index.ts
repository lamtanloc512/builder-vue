import { Editor } from "grapesjs";

export const Slider = (editor: Editor) => {
  editor.StyleManager.addType("my-custom-prop", {
    create({ props, change }) {
      const el = document.createElement("div");
      el.innerHTML = `<input type="range" class="my-input" min="${props.min}" max="${props.max}"/>`;
      const inputEl = el.querySelector(".my-input");
      inputEl.addEventListener("change", (event) => change({ event })); // `change` will trigger the emit
      inputEl.addEventListener("input", (event) =>
        change({ event, partial: true }),
      );
      return el;
    },
    // Propagate UI changes up to the targets
    emit({ props, updateStyle }, { event, partial }) {
      const { value } = event.target;
      updateStyle(`${value}px`, { partial });
    },
    // Update UI (eg. when the target is changed)
    update({ value, el }) {
      el.querySelector(".my-input").value = parseInt(value, 10);
    },
    // Clean the memory from side effects if necessary (eg. global event listeners, etc.)
    destroy() {},
  });
};
