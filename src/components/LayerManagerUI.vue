<script setup lang="ts">
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { IconCaretDown, IconFullscreen } from '@arco-design/web-vue/es/icon';
	import { Component, Editor } from 'grapesjs';
	import { computed } from 'vue';
	import { watch } from 'vue';
	import { watchEffect } from 'vue';
	import { reactive } from 'vue';
	import { onUnmounted } from 'vue';
	import { inject, onMounted, ref } from 'vue';
	import LayerItem from './LayerManagerUI/LayerItem.vue';

	const editor: Editor | undefined = inject('editor');
	const Layers = editor?.Layers;
	const Components = editor?.Components;
	const root = ref();
	const layerData = ref();
	const components = ref();

	const data = [
		{
			title: 'Trunk 0-0',
			key: '0-0',
			children: [
				{
					title: 'Leaf 0-0-1',
					key: '0-0-1',
				},
				{
					title: 'Branch 0-0-2',
					key: '0-0-2',
					disableCheckbox: true,
					children: [
						{
							draggable: false,
							title: 'Leaf 0-0-2-1 (Drag disabled)',
							key: '0-0-2-1',
						},
					],
				},
			],
		},
		{
			title: 'Trunk 0-1',
			key: '0-1',
			children: [
				{
					title: 'Branch 0-1-1',
					key: '0-1-1',
					checkable: false,
					children: [
						{
							title: 'Leaf 0-1-1-1',
							key: '0-1-1-1',
						},
						{
							title: 'Leaf 0-1-1-2',
							key: '0-1-1-2',
						},
					],
				},
				{
					title: 'Leaf 0-1-2',
					key: '0-1-2',
				},
			],
		},
	];

	const componentResolverMap: Record<string, Component> = {};

	onMounted(() => {
		editor?.on('layer:root', handleRoot);
		editor?.on('layer:component', function (e) {});
	});
	onUnmounted(() => {
		editor?.off('layer:root', handleRoot);
		editor?.off('layer:component', function (e) {
			console.log(e);
		});
	});

	const handleRoot = (_root: Component) => {
		root.value = _root;
		layerData.value = Layers?.getLayerData(_root);
		components.value = Layers?.getComponents(_root);
		componentResolverMap[root.value.getId()] = _root;

		console.log(components.value);
	};

	function addLevelPropertyAndReturn(treeData, level = 1) {
		return treeData.map((node) => {
			const newNode = { ...node, level };
			if (node.children) {
				newNode.children = addLevelPropertyAndReturn(node.children, level + 1);
			}
			return newNode;
		});
	}

	const convertToTreeNode = (components: Component[] | undefined): any[] => {
		let i = 0;
		if (!components || components.length == 0) return [];
		return components.map((el: Component): any => {
			componentResolverMap[el.getId()] = el;
			return {
				level: i++,
				...convertToTreeNode(Layers?.getComponents(el)),
			};
		});
	};

	const onDrop = ({
		//@ts-ignore
		e,
		dragNode,
		dropNode,
		dropPosition,
	}: {
		e: DragEvent;
		dragNode: TreeNodeData;
		dropNode: TreeNodeData;
		dropPosition: number;
	}) => {
		const currentDragItem = componentResolverMap[`${dragNode.key}`];
		const currentDropOverItem = componentResolverMap[`${dropNode.key}`];

		if (!currentDragItem || !currentDropOverItem) return;
		const componentIndex = currentDragItem.index() + dropPosition;
		const canMove = Components?.canMove(
			currentDropOverItem,
			currentDragItem,
			componentIndex,
		);

		if (canMove && canMove.result) {
			currentDragItem.move(currentDropOverItem, { at: componentIndex });
		}
	};
</script>
<template>
	<div
		v-if="root && components"
		class="container">
		<LayerItem
			:isRoot="true"
			:component="root"
			:level="0" />
	</div>
</template>
<style scoped>
	.container {
		overflow-y: hidden;
		overflow-x: auto;
		height: auto;
	}
</style>
