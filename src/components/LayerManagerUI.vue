<script setup lang="ts">
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { IconCaretDown, IconMinus } from '@arco-design/web-vue/es/icon';
	import { Component, Editor } from 'grapesjs';
	import { watchEffect } from 'vue';
	import { onUnmounted } from 'vue';
	import { inject, onMounted, ref } from 'vue';

	const editor: Editor | undefined = inject('editor');
	const Layers = editor?.Layers;
	const Components = editor?.Components;
	const currentComponent = ref();
	const root = ref();
	const layerData = ref();
	const data = ref<TreeNodeData[]>();
	const componentResolverMap = new Map<string, Component>();

	watchEffect(() => {
		console.log(currentComponent.value);
	});

	onMounted(() => {
		editor?.on('layer:root', handleRoot);
		editor?.on('layer:component', onLayerComponentUpdate);
		document.addEventListener('mouseover', hoverEvent);
	});
	onUnmounted(() => {
		editor?.off('layer:root', handleRoot);
		editor?.off('layer:component', onLayerComponentUpdate);
		document.removeEventListener('mouseover', hoverEvent);
	});

	const hoverEvent = (e: MouseEvent) => {
		const el = document
			.elementFromPoint(e.clientX, e.clientY)
			?.closest('[data-key]');
		if (el instanceof HTMLElement) {
			currentComponent.value = componentResolverMap.get(`${el?.dataset?.key}`);
			if (currentComponent.value)
				Layers?.setLayerData(currentComponent.value, { hovered: true });
		}
	};

	const handleRoot = (_root: Component) => {
		root.value = _root;
		layerData.value = Layers?.getLayerData(_root);
		componentResolverMap.set(_root.getId(), _root);
		data.value = [
			{
				key: _root.getId(),
				title: _root.getName(),
				draggable: `${_root.get('draggable')}`,
				children: [
					...convertToTreeNode(Layers?.getLayerData(_root)?.components),
				],
			},
		];
	};

	const setSelected = (
		selectedKeys: (string | number)[],
		data: {
			selected?: boolean | undefined;
			selectedNodes: TreeNodeData[];
			node?: TreeNodeData | undefined;
			e?: Event | undefined;
		},
	) => {
		currentComponent.value = componentResolverMap.get(`${selectedKeys}`);
		if (currentComponent.value) {
			Layers?.setLayerData(
				currentComponent.value,
				{ selected: true },
				{ event: data.e },
			);
		}
	};

	const onLayerComponentUpdate = (_component: Component | undefined) => {
		const elist = document.querySelectorAll('.tree-node-hovered');
		elist.forEach((el) => {
			el.classList.remove('tree-node-hovered');
		});
		currentComponent.value = _component;
		const el = document.querySelector(
			`[data-key="${currentComponent.value.getId()}"]`,
		);
		if (el) {
			el.classList.add('tree-node-hovered');
		}
	};

	const convertToTreeNode = (
		components: Component[] | undefined,
	): TreeNodeData[] => {
		if (!components || components.length == 0) return [];
		return components.map((el: Component): any => {
			componentResolverMap.set(el.getId(), el);
			return {
				key: el.getId(),
				title: el.getName(),
				draggable: el.get('draggable'),
				children: convertToTreeNode(Layers?.getComponents(el)),
			};
		});
	};

	const onDrop = ({
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
		const _dragComponent = componentResolverMap.get(`${dragNode.key}`);
		const _dropComponent = componentResolverMap.get(`${dropNode.key}`);
		if (!_dragComponent || !_dropComponent) return;
		const componentIndex = _dragComponent.index() + dropPosition;
		const canMove = Components?.canMove(
			_dropComponent,
			_dragComponent,
			componentIndex,
		);

		if (canMove && canMove.result) {
			const _data = data.value;
			const loop = (
				_data: TreeNodeData[] | undefined,
				key: string | number | undefined,
				callback: any,
			) => {
				_data?.some(
					(item: TreeNodeData, index: number, arr: TreeNodeData[]) => {
						if (item.key === key) {
							callback(item, index, arr);
							return true;
						}
						if (item.children) return loop(item.children, key, callback);
						return false;
					},
				);
			};

			loop(
				_data,
				dragNode.key,
				(_: TreeNodeData, index: number, arr: any[]): any => {
					arr.splice(index, 1);
				},
			);

			if (dropPosition === 0) {
				loop(_data, dropNode.key, (item: TreeNodeData) => {
					item.children = item.children || [];
					item.children.push(dragNode);
				});
			} else {
				loop(
					_data,
					dropNode.key,
					(_: TreeNodeData, index: number, arr: TreeNodeData[]) => {
						arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
					},
				);
			}
			_dragComponent.move(_dropComponent, { at: componentIndex });
		}
	};
</script>
<template>
	<div>
		<Tree
			v-if="data"
			draggable
			showLine
			blockNode
			:data="data"
			:size="'medium'"
			:hovered="true"
			@select="setSelected"
			@drop="onDrop">
			<template #switcher-icon="_, { isLeaf }">
				<IconCaretDown v-if="!isLeaf" />
				<IconMinus v-if="isLeaf" />
			</template>
		</Tree>
	</div>
</template>
<style>
	.tree-node-hovered {
		box-shadow: inset 0 0 0 1px rgb(var(--arcoblue-6));
		border-radius: 4px;
		z-index: 10000;
	}
	.arco-tree-node-title:hover {
		background-color: unset;
	}
</style>
