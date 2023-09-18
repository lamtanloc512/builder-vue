import { Ref, onMounted, ref } from "vue";
import grapesjs, { Editor } from "grapesjs";
export const useEditor = (overrideProps = {}) => {
  const node = document.createElement("div");
  const _editor: Ref<Editor | undefined> = ref();
  node.innerHTML = `
    <div class="LASMASMASMAS" style="padding: 25px">Custom Style Type</div>
    <div class="asdasdsad" style="font-size: 50px">Value 50</div>
  `;

  const props = {
    container: node,
    fromElement: true,
    width: "auto",
    storageManager: false,
    height: "300px",
    selectorManager: {
      componentFirst: true,
      custom: true,
    },
    styleManager: {
      custom: true,
    },
    panels: { defaults: [] },
    ...overrideProps,
  };

  onMounted(() => {});
  const connect = (el: HTMLElement) => {
    //@ts-ignore
    _editor.value = ref(grapesjs.init(props));
    el ? el.appendChild(node) : "";
  };
  return { _editor, connect };
};
