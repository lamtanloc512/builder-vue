import { defineStore } from "pinia";
export const useEditorStore = defineStore("editorStore", {
  // const editor = ref({});
  // const getEditor = computed(() => editor.value);
  // function setEditor(_editor: Editor) {
  //   editor.value = _editor;
  // }
  // return { editor, getEditor, setEditor };

  state: () => ({ editor: {} }),
  getters: {
    getEditor: (state) => state.editor,
  },
  actions: {
    setEditor(_editor: any) {
      this.editor = _editor;
    },
  },
});
