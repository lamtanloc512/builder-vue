<script setup lang="ts">
import BlockProvider from './BlockManagerUI/BlockProvider.vue';
</script>

<template>
	<BlockProvider #item="{ block, dragStart, dragstop }">
		<div
			:class="['text-center border p-2 grab']"
			:draggable="true"
			@dragstart="() => dragStart(block)"
			@dragstop="() => dragstop(block)">
			<div class="icon--wrapper" :innerHTML="block?.getMedia()"></div>
		</div>
	</BlockProvider>
</template>

<style scoped>
.grab {
	cursor: grab;
}
.icon--wrapper {
	display: grid;
	place-items: center;
}
.icon--wrapper * {
	height: 24px;
	width: 24px;
}
</style>
