<script setup lang="ts">
	import { MenuItem, SubMenu } from '@arco-design/web-vue';
	import { IconApps } from '@arco-design/web-vue/es/icon';
	import { ref } from 'vue';

	const props = defineProps<{
		component: Object;
	}>();

	const test = ref(false);
</script>

<template>
	<div class="drop-zone">
		<div
			v-if="!test"
			class="wrapper">
			<div class="indent"></div>
			<MenuItem
				class="w-100 m-0"
				key="1_0">
				<template #icon><IconApps /></template>
				<template #title>Navigation 2</template>
				<div>Menu 1</div></MenuItem
			>
		</div>

		<SubMenu
			v-if="test"
			key="1">
			<template #icon><IconApps /></template>
			<template #title>Navigation 2</template>
			<MenuItem key="1_0">Menu 1</MenuItem>
			<MenuItem key="1_1">Menu 2</MenuItem>
			<MenuItem key="1_2">Menu 3</MenuItem>
		</SubMenu>
	</div>
</template>

<style scoped>
	.wrapper {
		display: flex;
		justify-content: start;
		align-items: center;
		/* border-radius: 4px;
		border: 1px solid black; */
		padding: 4px 0;
	}
	.indent {
		margin: 0 20px;
		width: 1px;
		height: 32px;
		background-color: black;
	}
</style>
