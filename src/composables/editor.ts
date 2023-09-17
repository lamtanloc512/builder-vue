import { ref } from "vue";
import grapesjs, { Editor } from "grapesjs";
export const useEditor = (overrideProps = {}) => {
  const node = document.createElement("div");
  node.innerHTML = `<div class="LASMASMASMAS" style="padding: 25px">Custom Style Type</div>
  <div class="asdasdsad" style="font-size: 50px">Value 50</div>
  `;

  const props = {
    container: node,
    fromElement: true,
    width: "auto",
    storageManager: false,
    height: '300px',
    selectorManager: {
      componentFirst: true,
      custom: true,
    },
    styleManager: {
      custom: true
    },
    panels: { defaults: [] },
    ...overrideProps,
  };

  //@ts-ignore
  const editor: Ref<Editor> = ref(grapesjs.init(props));
//  const editor = grapesjs.init(props)
  const connect = (el: HTMLElement) => (el ? el.appendChild(node) : "");
  return { editor, connect };
};
