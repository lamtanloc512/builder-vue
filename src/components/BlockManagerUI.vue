<script setup lang="ts">
import BlockProvider from './BlockManagerUI/BlockProvider.vue';
</script>

<template>
	<BlockProvider #item="{ block, dragStart, dragstop }">
		<div
			:class="['text-center border p-2 grab']"
			draggable="true"
			@dragstart="() => dragStart(block)"
			@dragstop="() => dragstop(block)">
			<div class="w-100 text-center" :innerHTML="block?.getMedia()"></div>
		</div>
	</BlockProvider>
</template>

<style scoped>
.grab {
	cursor: grab;
}
</style>
