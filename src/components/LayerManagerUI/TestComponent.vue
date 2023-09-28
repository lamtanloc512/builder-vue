<script setup lang="ts">
	import {
		IconApps,
		IconCaretDown,
		IconCaretRight,
	} from '@arco-design/web-vue/es/icon';
	import { Component, Editor, LayerData } from 'grapesjs';
	import { inject, toRaw } from 'vue';
	import { ref } from 'vue';
	import { debounce, isUndefined } from 'lodash';
	import { onMounted } from 'vue';
	import { onUnmounted } from 'vue';

	const proxyEditor: Editor | undefined = inject('editor');
	const editor = toRaw(proxyEditor);
	const componentResolverMap: Record<string, Component> | undefined = inject(
		'componentResolverMap',
	);

	const Layers = editor?.Layers;
	const Components = editor?.Components;
	const props = defineProps<{
		component: Component | undefined;
		isRoot: boolean;
		level: number;
	}>();

	const emit = defineEmits(['updateRoot']);
	if (!props.component) emit('updateRoot', Layers?.getRoot());
	const toggleShow = ref(true);
	const name = ref<string | undefined>();
	const childs = ref<Component | undefined>();
	const candDrag = props.component
		? (props.component.get('draggable') as boolean)
		: false;
	const hasChild = childs.value ? childs.value?.components.length > 0 : false;
	const dragComponent = ref<Component | undefined>();
	const dropComponent = ref<Component | undefined>();
	const currentLayerItem = ref();
	const visible = ref();
	const open = ref();
	const selected = ref();
	const hovered = ref();
	const editing = ref();

	onMounted(() => {
		editor?.on('layer:component', handleComponentUpdate);
	});
	onUnmounted(() => {
		editor?.off('layer:component', handleComponentUpdate);
	});

	const handleComponentUpdate = (_component: Component) => {
		console.log(_component);
		if (_component == props.component)
			updateLayer(Layers?.getLayerData(_component));
	};

	const updateLayer = (data: LayerData | undefined) => {
		if (data) {
			name.value = data.name;
			visible.value = data.visible;
			open.value = data.open;
			selected.value = data.selected;
			hovered.value = data.hovered;
		}
	};

	const onDragStart = debounce((e: DragEvent) => {
		const el = document.elementFromPoint(e.clientX, e.clientY);
		const layerItem = el?.closest('[data-id]');
		if (layerItem instanceof HTMLElement) {
			dragComponent.value = componentResolverMap
				? componentResolverMap[`${layerItem.dataset.id}`]
				: undefined;
		}
	}, 100);

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
		const el = document.elementFromPoint(e.clientX, e.clientY);
		currentLayerItem.value = el?.closest('[data-id]');
		if (currentLayerItem.value instanceof HTMLElement) {
			currentLayerItem.value.classList.remove('over');
			dropComponent.value = componentResolverMap
				? componentResolverMap[`${currentLayerItem.value.dataset.id}`]
				: undefined;
			if (
				dragComponent.value?.getId() != dropComponent.value?.getId() &&
				dropComponent.value?.get('droppable')
			) {
				// console.log('oke', layerOverItem);
				currentLayerItem.value.classList.add('over');
			} else {
				// console.log('false', layerOverItem);
				currentLayerItem.value.classList.remove('over');
			}
		}
	};

	const onDrop = debounce((e: DragEvent) => {
		e.preventDefault();
		if (dragComponent.value && dropComponent.value) {
			const some = Components?.canMove(
				toRaw(dropComponent.value),
				toRaw(dragComponent.value),
			);

			if (some && some.result) {
				// debounce(() => {
				// }, 50);
				some.source?.move(some.target, { at: 0 });
				emit('updateRoot', Layers?.getRoot());
			}
		}
	});
	const onDragLeave = debounce((_: DragEvent) => {
		if (currentLayerItem.value instanceof HTMLElement) {
			currentLayerItem.value.classList.remove('over');
		}
	});

	const onMouseEnter = debounce(() => {
		if (props.component)
			Layers?.setLayerData(props.component, { hovered: true });
	});
	const onMouseLeave = debounce(() => {
		if (props.component)
			Layers?.setLayerData(props.component, { hovered: false });
	});
</script>

<template>
	{{ JSON.stringify(component) }}
	<div
		class="layer__item"
		@dragstart="onDragStart"
		@dragover="onDragOver"
		@dragleave="onDragLeave"
		@drop="onDrop"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
		:data-id="component.getId()">
		<div
			class="layer__item__row"
			:draggable="candDrag ? candDrag : false">
			<div
				v-for="_ in level"
				:class="['indent']"></div>
			<IconCaretRight
				v-if="!toggleShow && hasChild"
				class="me-1"
				@click="(_) => (toggleShow = true)" />
			<IconCaretDown
				v-if="toggleShow && hasChild"
				class="me-1"
				@click="(_) => (toggleShow = false)" />
			<IconApps class="me-1" />
			<span>{{ name }}</span>
		</div>
		<LayerItem
			v-for="com in childs"
			v-if="toggleShow"
			:component="com"
			:isRoot="false"
			:level="level + 1" />
	</div>
</template>

<style scoped>
	.layer__item {
		font-size: 0.85rem;
	}
	.layer__item.over {
		background-color: rgb(var(--green-3));
	}
	.layer__item.selected {
		background-color: aquamarine;
	}
	.layer__item__row {
		padding: 8px;
		border: 2px solid transparent;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 20px;
	}
	.indent {
		width: 8px;
		margin-right: 8px;
		height: 40px;
		border-right-style: solid;
		border-right-width: 1.5px;
		border-color: black;
	}
	.indent_transparent {
		width: 8px;
		margin-right: 8px;
		height: 40px;
		border-right-style: solid;
		border-right-width: 1.5px;
		border-color: transparent;
	}
	.layer__item__row:hover {
		border: 2px solid rgb(var(--arcoblue-6));
		border-radius: 4px;
	}
</style>
