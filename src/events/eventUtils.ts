import { Ref, VNode, createApp } from "vue";
// import Panel from "../components/Panel.vue";
import { Editor } from "grapesjs";
import TestComponent from "../components/TestComponent.vue";
import TestPanel from "../layouts/TestPanel.vue";

export const overrideSelectorUI = (
  id: String,
  editor: Editor,
  Component: VNode,
) => {
  const sidePanel = document.getElementById(`${id}`);
  if (sidePanel) {
    createApp(Component, { editor }).mount(sidePanel);
  }
};

export const overrideStyleUI = (id: string) => {
  const styleUIElement = document.getElementById(`${id}`);
  if (styleUIElement) createApp(TestComponent).mount(styleUIElement);
};

// export const overrideBlockUI = (id: string,editor: Editor, Component: VNode) {
//     const styleUIElement = document.getElementById(`${id}`);
//   if (styleUIElement) createApp(TestComponent).mount(styleUIElement);
// }
/**
 * Render new model inside the view
 * @param {id} id of HTMLElement
 * @param {editor} editor instance of grapesjs
 * @param {Component} Component component UI
 */
export const useOverrideUI = (
  editor: Ref<Editor | undefined>,
  Component: VNode,
) => {
  const div = document.createElement("div");
  const newApp = createApp(Component, {
    editor: editor.value ? editor.value : null,
  }).mount(div);
  return { newApp };
};
