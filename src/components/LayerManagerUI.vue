<script setup lang="ts">
import {
	BaseEvent,
	DragMoveEvent,
	DragOverEvent,
	DragStartEvent,
	DragStoppedEvent,
	Draggable,
} from '@shopify/draggable';
import { CanMoveResult, Component, Editor } from 'grapesjs';
import { clone } from 'lodash';
import {
	computed,
	inject,
	nextTick,
	onBeforeUnmount,
	onMounted,
	onUnmounted,
	ref,
	shallowRef,
	toRaw,
} from 'vue';
import LayerItem from './LayerManagerUI/LayerItem.vue';

const proxyEditor: Editor | undefined = inject('editor');
const editor = toRaw(proxyEditor);
const Layers = editor?.Layers;
const Components = editor?.Components;
const root = shallowRef<Component | undefined>();
const componentResolverMap: Record<string, Component> = {};
const draggableStartEvent = 'drag:start';
const draggableMoveEvent = 'drag:move';
const draggableOverEvent = 'drag:over';
const draggableStoppedEvent = 'drag:stopped';
// const draggOuEvent = 'drag:out';
// const draggOutContainerEvent = 'drag:out:container';

const emit = defineEmits(['goToLayer']);

let draggable: Draggable | undefined;

onMounted(() => {
	editor?.on('layer:root', handleRoot);
	editor?.on('layer:component', handleComponentUpdate);
	editor?.on('component:add', handleComponentAdd);
	const wrapper = document.querySelectorAll('.layer--wrapper');
	if (wrapper.length !== 0) {
		draggable = new Draggable(wrapper, {
			draggable: '.layer--item',
			mirror: {
				appendTo: 'body',
				constrainDimensions: true,
			},
			delay: {
				mouse: 250,
				drag: 0,
				touch: 100,
			},
		});

		draggable.on(draggableStartEvent, onDragStart);
		draggable.on(draggableMoveEvent, onDragMove);
		draggable.on(draggableOverEvent, onDragOver);
		//@ts-ignore
		draggable.on(draggableStoppedEvent, onDragStopped);
		// draggable.on(draggOuEvent, function (e) {
		// 	console.log(draggOuEvent, e);
		// });
		// draggable.on(draggOutContainerEvent, function (e) {
		// 	console.log(draggOutContainerEvent, e);
		// });
	}
});

onBeforeUnmount(() => {
	if (draggable) draggable.destroy();
});

const draggingComponent = ref<Component | undefined>();
const draggOverComponent = ref<Component | undefined>();
const checkMove = ref<CanMoveResult | undefined>();
const currentOnDragOverLayerItem = ref(0);
const indicatorEl = ref();

const onDragStart = (e: DragStartEvent): void => {
	const layerItem = e.source.closest('[data-draggable]');
	if (layerItem instanceof HTMLElement) {
		const componentId = layerItem.dataset.id;
		draggingComponent.value = toRaw(componentResolverMap[`${componentId}`]);
	}
};
const onDragMove = (e: DragMoveEvent): void => {
	if (e.originalEvent instanceof MouseEvent) {
		const currentEl = e.originalEvent.target as HTMLElement;
		if (currentEl && currentEl.getAttribute('class') == 'gjs-frame') {
			if (draggable) {
				const baseEvent = draggable as unknown as BaseEvent;
				baseEvent.cancel();
			}
		}
	}
};
const onDragOver = (e: DragOverEvent) => {
	const layerOverItem = e.over.closest('[data-draggable]');
	if (layerOverItem instanceof HTMLElement) {
		const componentId = layerOverItem.dataset.id;
		draggOverComponent.value = toRaw(componentResolverMap[`${componentId}`]);
		if (draggOverComponent.value) {
			const childs = Layers?.getComponents(draggOverComponent.value);
			const hasChild = childs ? childs.length > 0 : false;
			// @ts-ignore
			const droppable = draggOverComponent.value.get('droppable');
			if (hasChild || droppable) {
				checkMove.value = Components?.canMove(draggOverComponent.value, draggingComponent.value, 1);
			} else {
				const draggOverParent = draggOverComponent.value.parent();
				const layerRect = layerOverItem.getBoundingClientRect();
				const layerH = layerOverItem.offsetHeight;
				const pointerY = e.originalEvent instanceof MouseEvent ? e.originalEvent.clientY : null;
				const isBefore = pointerY ? pointerY < layerRect.y + layerH / 2 : false;
				indicatorEl.value = layerOverItem.querySelector('[data-button]');
				if (indicatorEl.value && draggOverComponent.value != draggingComponent.value) {
					if (isBefore) indicatorEl.value?.classList.add('indicator--before');
					else indicatorEl.value?.classList.add('indicator--after');
				}
				currentOnDragOverLayerItem.value = draggOverComponent.value.index() + (isBefore ? 0 : 1);
				checkMove.value = draggOverParent
					? Components?.canMove(
							draggOverParent,
							draggingComponent.value,
							currentOnDragOverLayerItem.value
					  )
					: undefined;
			}
		}
	}
};

const onDragStopped = (_: DragStoppedEvent): void => {
	if (checkMove.value && checkMove.value?.result) {
		const target = toRaw(checkMove.value.target);
		const source = toRaw(checkMove.value.source);
		if (source) {
			source?.move(target, { at: currentOnDragOverLayerItem.value });
		}
	}
	draggingComponent.value = {} as unknown as undefined;
	draggOverComponent.value = {} as unknown as undefined;
	checkMove.value = {} as unknown as undefined;
	currentOnDragOverLayerItem.value = 0;
	indicatorEl.value.classList.remove('indicator--before');
	indicatorEl.value.classList.remove('indicator--after');
	indicatorEl.value = {} as unknown as undefined;
	root.value = clone(Layers?.getRoot());
	nextTick();
};

onUnmounted(() => {
	editor?.off('layer:root', handleRoot);
	editor?.off('layer:component', handleComponentUpdate);
	editor?.off('component:add', handleComponentAdd);
});

const handleComponentUpdate = (_component: Component) => {
	if (_component == Layers?.getRoot()) {
		updateRoot(_component);
	}
};

const handleRoot = (_root: Component) => {
	updateRoot(_root);
	componentResolverMap[_root.getId()] = _root;
	addToResolverMap(Layers?.getComponents(_root));
	nextTick();
};

const handleComponentAdd = (_component: Component) => {
	componentResolverMap[_component.getId()] = _component;
	emit('goToLayer');
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
	root.value = clone(_root);
	nextTick();
};

const children = computed(() => (root.value ? Layers?.getComponents(root.value) : []));
</script>
<template>
	<div class="layer--container">
		<LayerItem
			:isRoot="true"
			:level="0"
			:component="root"
			:title="root?.getName()"
			:children="children" />
	</div>
</template>

<style>
ul,
li {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.layer--wrapper {
	overflow-y: hidden;
	overflow-x: auto;
}

.draggable-mirror .indent {
	background-color: transparent;
}

/* .draggable-mirror .layer--header .layer--button {
		border: 1px solid black;
	} */
.indicator--before::before {
	position: absolute;
	content: '';
	top: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 3px;
	box-shadow: inset 0px 2px 0px 0px rgb(var(--green-6));
}

.indicator--after::after {
	content: '';
	position: absolute;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100%;
	height: 3px;
	box-shadow: inset 0px 2px 0px 0px rgb(var(--green-6));
}
</style>
