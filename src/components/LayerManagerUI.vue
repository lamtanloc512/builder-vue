<script setup lang="ts">
	import { Component, Components, Editor } from 'grapesjs';
	import LayerItem from './LayerManagerUI/LayerItem.vue';
	import {
		provide,
		toRaw,
		shallowRef,
		onMounted,
		inject,
		onUnmounted,
	} from 'vue';
	import { Draggable, Sortable } from '@shopify/draggable';
	import { ref } from 'vue';
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { unref } from 'vue';

	const proxyEditor: Editor | undefined = inject('editor');
	const editor = toRaw(proxyEditor);
	const Layers = editor?.Layers;
	const Components = editor?.Components;
	const root = shallowRef<Component | undefined>();
	const rootNodeRef = ref();
	const componentResolverMap: Record<string, Component> = {};

	onMounted(() => {
		editor?.on('layer:root', handleRoot);
		editor?.on('layer:component', handleComponentUpdate);

		const wrapper = document.querySelectorAll('.container__draggable');
		console.log(wrapper);
		if (wrapper.length !== 0) {
			const sortable = new Sortable(wrapper, {
				draggable: '.layer__item.isChild.candDrag',
				mirror: {
					xAxis: false,
					yAxis: true,
					constrainDimensions: true,
				},
			});
		}
	});
	onUnmounted(() => {
		editor?.off('layer:root', handleRoot);
		editor?.off('layer:component', handleComponentUpdate);
	});

	const handleComponentUpdate = (_component: Component) => {
		if (_component === Layers?.getRoot()) {
			updateRoot(_component);
		}
	};

	const handleRoot = (_root: Component) => {
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
	};

	provide('componentResolverMap', componentResolverMap);
</script>
<template>
	<div class="container">
		<LayerItem
			v-if="root"
			:level="0"
			:isRoot="true"
			:component="root" />
	</div>
</template>
<style scoped>
	.container {
		overflow-y: hidden;
		overflow-x: auto;
		height: auto;
	}
</style>
