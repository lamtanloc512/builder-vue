<script setup lang="ts">
	import { Editor } from 'grapesjs';
	import { inject, onMounted, ref } from 'vue';

	const editor: Editor | undefined = inject('editor');
	const layerManager = editor?.LayerManager;
	const divEl = ref();
	onMounted(() => {
		// editor?.on('layer:custom', (props) => {
		// 	// props.container (HTMLElement) - The default element where you can append your UI
		// });

		// Triggered when the root layer is changed.
		// editor?.on('layer:root', (root) => {
		// 	// Update the root of your UI
		// });

		// Triggered when a component is updated, this allows you to update specific layers.
		// editor?.on('layer:component', (component) => {
		// 	// Update the specific layer of your UI
		// });
		console.log(layerManager);
	});

	const handleLayerManager = (props: any) => {
		let { container } = props;
		if (!container) {
			container = divEl.value;
			sectors.value = styleManager?.getSectors({ visible: true });
		}
	};
</script>
<template>
	<div :ref="divEl"></div>
</template>
<style scoped></style>
