<script setup lang="ts">
	import {
		IconApps,
		IconCaretDown,
		IconCaretRight,
	} from '@arco-design/web-vue/es/icon';
	import { Component, Editor } from 'grapesjs';
	import { inject } from 'vue';
	import { ref } from 'vue';

	const editor: Editor | undefined = inject('editor');
	const layer = editor?.Layers;
	const props = defineProps<{
		component: Omit<Component, 'level'>;
		isRoot: boolean;
	}>();

	const toggleShow = ref(false);
	const childs = !props.isRoot ? layer?.getComponents(props.component) : [];
	const level = props.component?.level ? props.component?.level : 0;
</script>

<template>
	<div class="layer__item">
		<div class="layer__item__row">
			{{ JSON.stringify(level) }}
			<div
				v-if="!isRoot"
				v-for="_ in level"
				class="indent"></div>
			<IconCaretRight
				v-if="!toggleShow && childs?.length > 0"
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
			v-if="!isRoot && toggleShow"
			:component="com"
			:isRoot="false" />
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
	.layer__item__row:hover {
		border: 2px solid black;
		border-radius: 4px;
	}
</style>
