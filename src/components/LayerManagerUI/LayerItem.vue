<script setup lang="ts">
	import { Tree, TreeNodeData } from '@arco-design/web-vue';
	import { Component, Editor, LayerData } from 'grapesjs';
	import { inject, onMounted, ref } from 'vue';

	const props = defineProps<{
		component: Component;
		level: Number;
		editor: Editor | undefined;
	}>();

	const Layers = props.editor?.Layers;

	//states
	const name = ref<string>();
	const components = ref<TreeNodeData[]>();
	const visible = ref<boolean>();
	const open = ref<boolean>();
	const selected = ref<boolean>();
	const hovered = ref<boolean>();
	const editing = ref<boolean>();
	const layerRef = ref();

	const { componentResolverMap } = inject('layerManager');

	onMounted(() => {
		updateLayer(Layers?.getLayerData(props.component));
		componentResolverMap.set(layerRef.value, props.component);
	});

	const updateLayer = (data: LayerData | undefined) => {
		name.value = data?.name;
		components.value = convertToTreeNode(data?.components);
		visible.value = data?.visible;
		open.value = data?.open;
		selected.value = data?.open;
		hovered.value = data?.hovered;

		// console.log(components.value);
	};

	const onDrop = () => {};

	const convertToTreeNode = (components: Component[] | undefined) => {
		if (!components) return [];
		function convertChildNode(components: Component[]) {
			console.log(components);

			if ((components.length = 0)) return [];
			function mapModelToChildNode(component: Component) {
				return {
					key: component.getId(),
					title: component.getName(),
				};
			}

			return components.map((el) => {
				console.log(el);
				return {
					key: el.getId(),
					title: el.getName(),
					children: mapModelToChildNode(el),
				};
			});
		}
		return components?.map((el: Component) => {
			return {
				key: el.getId(),
				title: el.getName(),
				children:
					el.collection.length > 0
						? convertChildNode(el.collection.models)
						: [],
			};
		});
	};
</script>

<template>
	<div>
		<Tree
			class="tree-demo"
			draggable
			blockNode
			show-line
			:data="components"
			@drop="onDrop">
		</Tree>
	</div>
</template>

<style scoped></style>
