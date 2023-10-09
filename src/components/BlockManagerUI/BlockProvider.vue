<script setup lang="ts">
import { Block, BlockProperties, Editor } from 'grapesjs';
import { clone } from 'lodash';
import { inject, onMounted, onUnmounted, ref, toRaw } from 'vue';
import { predefineBlocks } from '../../config/block';

const proxyEditor: Editor | undefined = inject('editor');
const editor = toRaw(proxyEditor);
const Blocks = editor?.Blocks;
const blockArray = ref<Block[] | undefined>();
const onDragStart = ref();
const onDragStop = ref();

onMounted(() => {
	editor?.on('block:custom', handleBlocks);
});
onUnmounted(() => {
	editor?.off('block:custom', handleBlocks);
});

const handleBlocks = ({
	blocks,
	dragStart,
	dragStop,
}: {
	blocks: Array<Block>;
	dragStart: any;
	dragStop: any;
}) => {
	// console.log(blocks, dragStart, dragStop, drag);
	// console.log(drag);
	blockArray.value = clone(blocks);
	onDragStart.value = dragStart;
	onDragStop.value = dragStop;
};

type BlockConfig = {
	id: string;
	config: BlockProperties;
};

if (Blocks) {
	predefineBlocks.forEach((block: BlockConfig) => {
		Blocks.add(block.id, block.config);
		// console.log(block);
	});
}
</script>

<template>
	<div class="card--wrapper">
		<slot
			name="item"
			:block="block"
			:dragStart="onDragStart"
			:dragstop="onDragStop"
			v-for="block in blockArray" />
	</div>
</template>

<style scoped>
.card--wrapper {
	padding: 8px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
}
</style>
