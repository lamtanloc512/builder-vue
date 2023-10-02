<script setup lang="ts">
	import { IconApps, IconCaretDown, IconCaretRight } from '@arco-design/web-vue/es/icon';
	import { Component, Editor, LayerData } from 'grapesjs';
	import { clone, cloneDeep, debounce, isNull, isUndefined } from 'lodash';
	import { inject, toRaw } from 'vue';
	import { shallowRef } from 'vue';
	import { ref } from 'vue';
	import { onMounted } from 'vue';
	import { onUnmounted } from 'vue';
	import { computed } from 'vue';
	import { toRef } from 'vue';
	import Draggable from 'vuedraggable';

	const proxyEditor: Editor | undefined = inject('editor');
	const editor = toRaw(proxyEditor);
	const componentResolverMap: Record<string, Component> | undefined =
		inject('componentResolverMap');

	const Layers = editor?.Layers;
	const Components = editor?.Components;
	const props = defineProps<{
		component: Component;
		isRoot: boolean;
		level: number;
	}>();

	const emit = defineEmits(['updateRoot']);
	const name = ref();
	const components = shallowRef<Component[] | undefined>(Layers?.getComponents(props.component));
	const name = ref();
	const visible = ref(false);
	const open = ref(false);
	const selected = ref(false);
	const hovered = ref(false);
	const some = ref();
	const dropIndicator = ref();
	// const editing = ref();
	const toggleShow = ref(true);
	const candDrag = props.component.get('draggable') as boolean;
	const dragComponent = ref<Component | undefined | null>();
	const dropComponent = ref<Component | undefined | null>();
	const onDragOverLayerItem = ref();
	const hasChild = computed(() => (components.value ? components.value.length > 0 : false));
	const computedLevel = computed(() => toRef(props.level).value - 1);

	onMounted(() => {
		editor?.on('layer:component', handleComponentUpdate);
	});
	onUnmounted(() => {
		editor?.off('layer:component', handleComponentUpdate);
	});

	const handleComponentUpdate = (_component: Component) => {
		if (_component === props.component) {
			updateLayerData(Layers?.getLayerData(props.component));
		}
	};
	const updateLayerData = (data: LayerData | undefined) => {
		if (data) {
			name.value = data.name;
			components.value = data.components;
			visible.value = data.visible;
			open.value = data.open;
			selected.value = data.selected;
			hovered.value = data.hovered;
		}
	};

	const setSelected = (ev: MouseEvent) => {
		Layers?.setLayerData(props.component, { selected: true }, { ev });
	};

	// const toggleVisible = () => {
	// 	Layers?.setVisible(props.component, !visible.value);
	// };

	const onDragStart = (e: DragEvent) => {
		const el = document.elementFromPoint(e.clientX, e.clientY);
		const layerItem = el?.closest('[data-id]');
		if (layerItem instanceof HTMLElement) {
			dragComponent.value = componentResolverMap
				? componentResolverMap[`${layerItem.dataset.id}`]
				: undefined;
		}
	};

	const onDragMove = (evt: any) => {
		onDragOverLayerItem.value = evt.to;
		if (onDragOverLayerItem.value) {
			const currentOnDragOverLayerItem = onDragOverLayerItem.value.closest('[data-id]');
			if (onDragOverLayerItem.value) {
				dropComponent.value = componentResolverMap
					? componentResolverMap[`${currentOnDragOverLayerItem.dataset.id}`]
					: undefined;
				if (onDragOverLayerItem.value.classList.contains('canDrop')) {
					console.log(onDragOverLayerItem.value);
					// onDragOverLayerItem.value.classList.add('indicator');
				}
			}
		}
	};

	const onDragEnd = (e) => {
		// console.log(e);
		if (
			!isNull(dragComponent.value) &&
			!isUndefined(dragComponent.value) &&
			!isNull(dropComponent.value) &&
			!isUndefined(dropComponent.value)
		) {
			some.value = Components?.canMove(dropComponent.value, dragComponent.value);
		}

		if (some.value && some.value.result) {
			const dragNode = toRaw(some.value.source);
			const dropNode = toRaw(some.value.target);
			dragNode?.move(dropNode, { at: e.newIndex });
			dragComponent.value = null;
			dropComponent.value = null;
			dropIndicator.value = null;
			some.value = {};
			emit('updateRoot', Layers?.getRoot());
		}
	};

	const onMouseEnter = () => {
		Layers?.setLayerData(props.component, { hovered: true });
	};
	const onMouseLeave = () => {
		Layers?.setLayerData(props.component, { hovered: false });
	};

	type draggableOnMoveEvt = {
		to: HTMLElement;
		dragged: HTMLElement;
		draggedRect: DOMRect;
		related: HTMLElement;
		willInsertAfter: boolean;
	};

	function checkMove(evt: draggableOnMoveEvt) {
		const el = evt.to;
		if (!el) return false;
		return el.classList.contains('canNotDrop') ? false : true;
	}

	type Moved = {
		element: Component;
		oldIndex: number;
		newIndex: number;
	};

	const onChange = (e: any) => {
		const moved: Moved = e.moved;
		if (moved) {
		}
	};
</script>

<template>
	<div
		:class="['layer__item', isRoot ? 'isRoot' : 'isChild', hasChild ? 'hasChild' : '']"
		@click.stop="setSelected"
		:data-id="component.getId()"
		:tabindex="component.index()"
		:draggable="candDrag">
		<div
			:class="['layer__item__row', selected ? 'selected' : '', hovered ? 'hover' : '']"
			@mouseenter="onMouseEnter"
			@mouseleave="onMouseLeave">
			<div v-if="level > 1" v-for="_ in computedLevel" class="indent"></div>
			<IconCaretRight
				v-if="!toggleShow && hasChild && level > 0"
				class="me-1"
				@click="(_) => (toggleShow = true)" />
			<IconCaretDown
				v-if="toggleShow && hasChild && level > 0"
				class="me-1"
				@click="(_) => (toggleShow = false)" />
			<div v-if="component.getIcon() != ''">{{ component.getIcon() }}</div>
			<IconApps v-else class="me-1" />

			<span>{{ component.getName() + component.cid }}</span>
		</div>
		<Draggable
			tag="ul"
			:class="['dropArea', !component.get('droppable') ? 'canNotDrop' : 'canDrop']"
			dragClass="drag__class"
			ghostClass="ghost__class"
			:group="'child'"
			:list="Layers?.getComponents(component)"
			:itemKey="(e: Component) => e.getId()"
			:move="checkMove"
			@move="onDragMove"
			@change="onChange"
			@start="(e) => onDragStart(e.originalEvent)"
			@end="onDragEnd">
			<template #item="{ element: component }">
				<LayerItem
					v-if="toggleShow"
					:component="component"
					:isRoot="false"
					:level="level + 1"
					:tabindex="component.index()"
					:key="component.getId()" />
			</template>
		</Draggable>
	</div>
</template>

<style scoped>
	.layer__item {
		font-size: 0.85rem;
		position: relative;
	}
	.layer__item.over {
		background-color: rgb(var(--green-3));
	}
	.layer__item.selected {
		background-color: aquamarine;
	}
	.layer__item__row {
		padding: 8px;
		border: 1px solid transparent;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 20px;
	}
	.layer__item__row.selected {
		box-shadow: inset 0 0 0 2px rgb(var(--arcoblue-7));
		border-radius: 4px;
	}
	.layer__item__row.hover {
		box-shadow: inset 0 0 0 2px rgb(var(--arcoblue-4));
		border-radius: 4px;
	}
	.indent {
		width: 6px;
		margin-right: 8px;
		height: 40px;
		border-right-style: solid;
		border-right-width: 1.5px;
		border-color: black;
	}

	ul {
		padding-left: 0;
		margin: 0;
	}

	.drag__class .indent {
		border-color: transparent;
	}
	.ghost__class .indent {
		visibility: hidden;
		opacity: 0;
	}
	.ghost__class {
		background-color: rgb(251, 255, 2);
	}
	.canNotDrop {
		position: relative;
	}
	.canDrop {
		position: relative;
	}
	/* .canNotDrop.indicator {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 2px;
		background: red;
	} */
	.canDrop.indicator__before::before {
		content: '';
		position: absolute;
		top: 0;
		left: 31px;
		right: 0;
		height: 2px;
		background: greenyellow;
	}
	.canDrop.indicator__after::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 31px;
		right: 0;
		height: 2px;
		background: greenyellow;
	}

	.dropArea {
	}
</style>
