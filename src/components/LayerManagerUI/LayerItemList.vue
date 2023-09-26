<script setup lang="ts">
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { IconCaretDown, IconMinus } from '@arco-design/web-vue/es/icon';
	import { CanMoveResult, Component, Editor, LayerData } from 'grapesjs';
	import { isNull, isUndefined } from 'lodash';
	import { onMounted, ref } from 'vue';

	const props = defineProps<{
		component: Component;
		editor: Editor | undefined;
	}>();

	const Layers = props.editor?.Layers;
	const Components = props.editor?.Components;
	//states
	const name = ref<string>();
	const components = ref<TreeNodeData[]>();
	const visible = ref<boolean>();
	const open = ref<boolean>();
	const selected = ref<boolean>();
	const hovered = ref<boolean>();
	// const editing = ref<boolean>();
	// const layerRef = ref();
	const canMove = ref();
	const dragNodeIndex = ref();

	const componentResolverMap: Map<string, Component> = new Map();

	onMounted(() => {
		updateLayer(Layers?.getLayerData(props.component));
		// props.editor?.on('layer:custom', (props) => {
		// 	console.log(props);
		// });

		// Triggered when the root layer is changed.
		// props.editor?.on('layer:root', (root) => {
		// 	console.log(root);
		// });

		// Triggered when a component is updated, this allows you to update specific layers.
		props.editor?.on('layer:component', onLayerComponentUpdate);
	});

	const updateLayer = (data: LayerData | undefined) => {
		name.value = data?.name;
		components.value = convertToTreeNode(data?.components);
		visible.value = data?.visible;
		open.value = data?.open;
		selected.value = data?.open;
		hovered.value = data?.hovered;
	};

	const onLayerComponentUpdate = (_component: Component | undefined) => {
		if (_component === props.component) {
			updateLayer(Layers?.getLayerData(_component));
		}
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
		const dragComponent = componentResolverMap.get(`${dragNode.key}`);
		const targetComponent = componentResolverMap.get(`${dropNode.key}`);
		dragNodeIndex.value = dragComponent?.index();
		let checkComponentMovement: CanMoveResult | undefined;
		if (dragComponent && targetComponent) {
			checkComponentMovement = Components?.canMove(
				targetComponent,
				dragComponent,
				dragNodeIndex.value,
			);
		}
		if (
			!isNull(checkComponentMovement) &&
			!isUndefined(checkComponentMovement) &&
			!isNull(checkComponentMovement?.source) &&
			!isUndefined(checkComponentMovement?.source)
		) {
			checkComponentMovement.source?.move(checkComponentMovement.target, {
				at: 0,
			});

			canMove.value = {};
		}
	};

	// const onDragStart = (ev: DragEvent, node: TreeNodeData) => {
	// 	console.log(node);
	// 	const currentComponentNode = componentResolverMap.get(`${node.key}`);
	// 	console.log(currentComponentNode);
	// };

	const convertToTreeNode = (
		components: Component[] | undefined,
	): TreeNodeData[] => {
		if (!components || components.length == 0) return [];
		return components.map((el: Component): any => {
			componentResolverMap.set(el.getId(), el);
			return {
				key: el.getId(),
				title: el.getName(),
				children: convertToTreeNode(Layers?.getComponents(el)),
			};
		});
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
		const component = componentResolverMap.get(`${selectedKeys}`);
		if (component) {
			Layers?.setLayerData(component, { selected: true }, { event: data.e });
		}
	};
</script>

<template>
	<div>
		<Tree
			draggable
			showLine
			:data="components"
			@drop="onDrop"
			@select="setSelected">
			<template #switcher-icon="_, { isLeaf }">
				<IconCaretDown v-if="!isLeaf" />
				<IconMinus v-if="isLeaf" />
			</template>
		</Tree>
	</div>
</template>

<style scoped></style>
