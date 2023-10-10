import { Editor } from 'grapesjs';
import { createApp } from 'vue';
import Template from './Template.vue';
export const Container = (editor: Editor) => {
	editor.DomComponents.addType('container', {
		model: {
			defaults: {
				attributes: { class: 'wrapper' },
				styles: `
					.wrapper {
						padding: 8px;
						border: 1px dashed black;
					}
				`,
			},
		},
		view: {
			onRender(props) {
				createApp(Template, props).mount(props.el);
			},
		},
	});
};
