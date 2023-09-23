<script setup lang="ts">
	import { Component, Editor } from 'grapesjs';
import { VNodeRef, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue';
import LayerItem from './LayerManagerUI/LayerItem.vue';
	const editor: Editor | undefined = inject('editor');
	const divEl = ref();
	const root = ref();

	const Layers = editor?.Layers;

	onMounted(() => {
		editor?.on('layer:custom', handleLayerManager);
		editor?.on('layer:root', handleRootChange);
	});
	onBeforeUnmount(() => {
		editor?.off('layer:custom', handleLayerManager);
		editor?.off('layer:root', handleRootChange);
	});

	const handleLayerManager = (props: any) => {
		let { container, root } = props;
		if (!container) {
			container = divEl.value;
			handleRootChange(root);
		}
	};

	const handleRootChange = (_root: Component) => {
		root.value = _root;
	};

	const componentResolverMap = new Map();

	provide('layerManager', {
		Layers,
		componentResolverMap,
	});
</script>
<template>
	<div :ref="(el :VNodeRef | undefined) => divEl = el">
		<LayerItem
			v-if="root"
			:level="0"
			:component="root"
			:editor="editor" />
	</div>
</template>
<style scoped></style>
