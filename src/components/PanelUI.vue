<script setup lang="ts">
	import { Space } from '@arco-design/web-vue';
	import { SelectorUI, StyleManagerUI } from './index.ts';
</script>
<template>
	<Space
		:direction="'vertical'"
		fill>
		<StyleManagerUI />
		<SelectorUI />
	</Space>
</template>
<style scoped></style>
