<script setup lang="ts">
	import { Button } from '@arco-design/web-vue';
	import {
		IconCaretDown,
		IconDragDotVertical,
		IconEyeInvisible,
	} from '@arco-design/web-vue/es/icon';
	import { Component, Editor, LayerData } from 'grapesjs';
	import { toNumber } from 'lodash';
	import { computed, inject, onMounted, onUnmounted, ref, toRaw } from 'vue';

	const proxyEditor: Editor | undefined = inject('editor');
	const editor = toRaw(proxyEditor);

	const Layers = editor?.Layers;
	const props = defineProps<{
		title: String;
		component: Component | undefined;
		children: Component[] | undefined;
		level: Number;
		isRoot: Boolean;
	}>();
	const name = ref();
	const visible = ref(true);
	const open = ref(false);
	const selected = ref(false);
	const hovered = ref(false);
	const show = ref(true);
	const toggle = () => (show.value = !show.value);
	const hasChild = computed(() => (props.children ? props.children?.length > 0 : false));

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
			visible.value = data.visible;
			open.value = data.open;
			selected.value = data.selected;
			hovered.value = data.hovered;
		}
	};

	const setSelected = (ev: MouseEvent) => {
		if (props.component) {
			Layers?.setLayerData(props.component, { selected: true }, { ev });
		}
	};
	const setUnSelected = (ev: MouseEvent) => {
		if (props.component) {
			Layers?.setLayerData(props.component, { selected: true }, { ev });
		}
	};

	const onMouseEnter = () => {
		if (props.component) {
			Layers?.setLayerData(props.component, { hovered: true });
		}
	};

	const onMouseLeave = () => {
		if (props.component) {
			Layers?.setLayerData(props.component, { hovered: false });
		}
	};

	const toggleVisible = () => {
		if (props.component) {
			Layers?.setVisible(props.component, !visible.value);
		}
	};

	const canDrag = computed(() => props.component?.get('draggable'));
</script>

<template>
	<li
		:class="[isRoot ? '' : 'layer--item']"
		:data-id="component?.getId()"
		data-draggable
		@click.stop="setSelected"
		@dblclick="setUnSelected">
		<div class="layer--header">
			<div v-for="_ in level" class="indent"></div>
			<Button
				@mouseenter="onMouseEnter"
				@mouseleave="onMouseLeave"
				:class="['layer--button', selected ? 'selected' : '', hovered ? 'hover' : '']"
				type="text"
				long
				data-button>
				<template #icon>
					<IconCaretRight v-if="!show && hasChild && !isRoot" @click="toggle" />
					<IconCaretDown v-if="show && hasChild && !isRoot" @click="toggle" />
					<IconDragDotVertical v-if="!isRoot && canDrag" class="ms-1" />
					<IconMindMapping v-if="isRoot" class="ms-1" />
					<span class="ms-1">{{ component?.getIcon() }}</span>
					<span class="ms-1">{{ title }}</span>
				</template>
				<div class="d-flex justify-content-between align-items-center">
					<div v-if="hovered || selected">
						<IconEye v-if="visible" @click="toggleVisible" class="ms-2" />
					</div>
					<div v-if="!visible">
						<IconEyeInvisible @click="toggleVisible" class="ms-2" />
					</div>
				</div>
			</Button>
		</div>
		<ul class="layer--wrapper">
			<NewLayerItem
				v-if="show"
				v-for="component in children"
				:isRoot="false"
				:component="component"
				:children="component ? Layers?.getComponents(component) : []"
				:title="component.getName()"
				:level="toNumber(level) + 1" />
		</ul>
	</li>
</template>

<style scoped>
	.layer--header {
		display: flex;
	}
	.layer--button {
		justify-content: space-between;
		padding: 0px 12px;
		color: var(--color-neutral-10);
		position: relative;
	}
	.layer--button.selected {
		box-shadow: inset 0 0 0 2px rgb(var(--arcoblue-7));
		border-radius: 4px;
	}
	.layer--button.hover {
		box-shadow: inset 0 0 0 2px rgb(var(--arcoblue-4));
		border-radius: 4px;
	}
	.indent {
		width: 1px;
		height: 32px;
		background-color: var(--color-neutral-6);
		margin-left: 20px;
	}
</style>
