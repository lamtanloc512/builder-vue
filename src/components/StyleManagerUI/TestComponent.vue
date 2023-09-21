<script setup lang="ts">
	import { Button } from 'tdesign-vue-next';

	const props = defineProps<{
		label: string;
	}>();
</script>

<template>
	<div>
		{{ label }}
	</div>
</template>

<style scoped></style>
