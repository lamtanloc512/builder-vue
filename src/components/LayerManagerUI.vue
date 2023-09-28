<script setup lang="ts">
	import { Component, Editor } from 'grapesjs';
	import { inject, onUnmounted } from 'vue';
	import { onMounted, ref } from 'vue';
	import LayerItem from './LayerManagerUI/LayerItem.vue';
	import { provide, watch, toRaw, computed } from 'vue';
	import { isUndefined } from 'lodash';

	const proxyEditor: Editor | undefined = inject('editor');
	const editor = toRaw(proxyEditor);
	const Layers = editor?.Layers;
	const root = ref<Component | undefined>(Layers?.getRoot());
	const componentResolverMap: Record<string, Component> = {};
	const loading = ref(false);

	watch(
		() => root, // Watch the root value
		(newValue) => {
			// Callback function when the root value changes
			console.log('new root', newValue);
		},
		{ deep: true }, // Use a deep watcher to track nested properties
	);

	onMounted(() => {
		editor?.on('layer:root', handleRoot);
		// editor?.on('component:update', handleComponentUpdate);
	});
	onUnmounted(() => {
		editor?.off('layer:root', handleRoot);
		// editor?.off('component:update', handleComponentUpdate);
	});

	const handleRoot = (_root: Component) => {
		loading.value = true;
		updateRoot(_root);
		if (root) componentResolverMap[_root.getId()] = _root;
		addToResolverMap(Layers?.getComponents(_root));
	};

	const addToResolverMap = (components: Component[] | undefined): void => {
		components?.forEach((el: Component): any => {
			componentResolverMap[el.getId()] = el;
			if (el.components.length > 0) {
				addToResolverMap(Layers?.getComponents(el));
			}
		});
	};

	const updateRoot = (_root: Component) => {
		root.value = _root;
		loading.value = false;
	};

	provide('componentResolverMap', componentResolverMap);
</script>
<template>
	<div class="container">
		<LayerItem
			:level="0"
			:isRoot="true"
			:component="root"
			v-if="root"
			@updateRoot="updateRoot" />
	</div>
</template>
<style scoped>
	.container {
		overflow-y: hidden;
		overflow-x: auto;
		height: auto;
	}
</style>
