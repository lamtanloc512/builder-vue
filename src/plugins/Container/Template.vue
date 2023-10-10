<script setup lang="ts">
import { Component, Editor } from 'grapesjs';
import { ref } from 'vue';

type PropsType = {
	editor: Editor;
	model: Component;
	el: HTMLElement;
};

const props = defineProps<PropsType>();
console.log(props);

// const containerModel = props.el.model;

const columns = ref(0);

// const onClick = () => {
// 	columns.value++;
// };
</script>

<template>
	<div :style="{ padding: '0.25rem' }">
		<div
			@dragover="(el) => console.log(el)"
			:style="{
				display: 'grid',
				gap: '0.25rem',
				placeContent: 'center',
				minHeight: '6rem',
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gridTemplateRows: '1fr',
			}">
			<div :style="{ border: '1px solid gray', height: '100%' }" v-for="(_, index) in columns">
				Div {{ index + 1 }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="css"></style>
