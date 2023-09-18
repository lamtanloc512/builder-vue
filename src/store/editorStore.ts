import { useEditor } from './../composables/editor.ts';
import { defineStore } from 'pinia';

const { newEditor, connect } = useEditor();

export const useAppStore = defineStore('editorStore', {
	state: () => ({ editor: newEditor, connect }),
	getters: {
		getEditor: (state) => state.editor,
	},
	actions: {},
});
