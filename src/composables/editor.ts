import grapesjs, { Editor } from 'grapesjs';
export const useEditor = (overrideProps = {}) => {
	const node: HTMLElement = document.createElement('div');
	node.innerHTML = `
	<div>
		<h1 class="asdasdsad" style="font-size: 50px">Welcome to VueGrapes Pagebuilder</h1>
		<h2 class="test" style="font-size: 33px">2nd Child</h2>
	</div>
	<div>
		<h1 class="asdasdsad" style="font-size: 50px">Welcome to VueGrapes Pagebuilder</h1>
		<h2 class="test" style="font-size: 33px">2nd Child</h2>
	</div>`;

	const props = {
		container: node,
		fromElement: true,
		width: 'auto',
		storageManager: false,
		height: '95vh',
		selectorManager: {
			componentFirst: true,
			custom: true,
		},
		styleManager: {
			custom: true,
		},
		layerManager: {
			custom: true,
		},
		panels: { defaults: [] },
		...overrideProps,
	};

	//@ts-ignore
	const newEditor: Editor = grapesjs.init(props);

	const connect = (el: HTMLElement) => {
		el ? el.appendChild(node) : '';
	};

	return { newEditor, connect };
};
