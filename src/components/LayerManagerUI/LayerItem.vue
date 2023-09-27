<script setup lang="ts">
	import {
		IconApps,
		IconCaretDown,
		IconCaretRight,
	} from '@arco-design/web-vue/es/icon';
	import { Component, Editor } from 'grapesjs';
	import { inject } from 'vue';
	import { ref } from 'vue';
	import { debounce } from 'lodash';
	import { computed } from 'vue';

	const editor: Editor | undefined = inject('editor');
	const layer = editor?.Layers;
	const props = defineProps<{
		component: Component;
		isRoot: boolean;
		level: number;
	}>();

	const toggleShow = ref(false);
	const childs = layer?.getComponents(props.component);
	const onDragOver = debounce((e: DragEvent) => {
		const el = document.elementFromPoint(e.clientX, e.clientY);
		console.log(el);
	}, 100);
</script>

<template>
	<div
		class="layer__item"
		@dragover="onDragOver"
		:data-id="component.getId()">
		<div
			class="layer__item__row"
			draggable="true">
			<div
				v-for="_ in level"
				:class="['indent']"></div>
			<IconCaretRight
				v-if="!toggleShow && childs ? childs.length > 0 : false"
				class="me-1"
				@click="(_) => (toggleShow = true)" />
			<IconCaretDown
				v-if="toggleShow"
				class="me-1"
				@click="(_) => (toggleShow = false)" />
			<IconApps class="me-1" />
			<span>{{ component.getName() }}</span>
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
