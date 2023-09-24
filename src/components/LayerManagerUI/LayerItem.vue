<script setup lang="ts">
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { Component, Editor, LayerData } from 'grapesjs';
	import { inject, onMounted, ref } from 'vue';

	const props = defineProps<{
		component: Component;
		level: Number;
		editor: Editor | undefined;
	}>();

	const layers = props.editor?.Layers;

	//states
	const name = ref<string>();
	const components = ref<TreeNodeData[]>();
	const visible = ref<boolean>();
	const open = ref<boolean>();
	const selected = ref<boolean>();
	const hovered = ref<boolean>();
	// const editing = ref<boolean>();
	const layerRef = ref();

	const componentResolverMap: Map<string, Component> = new Map();

	onMounted(() => {
		updateLayer(layers?.getLayerData(props.component));
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
			updateLayer(layers?.getLayerData(_component));
		}
	};

	const onDrop = () => {};

	const convertToTreeNode = (
		components: Component[] | undefined,
	): TreeNodeData[] => {
		if (!components || components.length == 0) return [];
		return components.map((el: Component): any => {
			componentResolverMap.set(el.ccid, el);
			return {
				key: el.getId(),
				title: el.getName(),
				children: convertToTreeNode(layers?.getComponents(el)),
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
			layers?.setLayerData(component, { selected: true }, { event: data.e });
		}
	};
</script>

<template>
	<div>
		<Tree
			draggable
			blockNode
			show-line
			:data="components"
			@drop="onDrop"
			@select="setSelected">
		</Tree>
	</div>
</template>

<style scoped></style>
