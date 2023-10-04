<script setup lang="ts">
import { Card } from '@arco-design/web-vue';
import { useBlock } from '../../../composables/block';
import { inject, shallowRef } from 'vue';
import { Block, BlockProperties, Editor } from 'grapesjs';

const blockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-type" viewBox="0 0 16 16">
  <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
</svg>`;
const [blockId, config] = useBlock('typography', {
	id: 'text',
	label: 'Text',
	category: 'Basic',
	media: blockIcon,
	activate: true,
	content: {
		type: 'text',
		content: 'Insert your text here',
	},
});

const typographyBlockRef = shallowRef<Block>();

const blocks = inject<Editor['Blocks']>('blocks');
if (blocks) {
	typographyBlockRef.value = blocks.add(blockId as string, config as BlockProperties);
	console.log(blocks);
}
</script>

<template>
	<Card
		@dragstart="(evt) => console.log(evt)"
		:bordered="false"
		:style="{ width: '100%' }"
		draggable="true">
		<div class="text-center" :innerHTML="typographyBlockRef?.getMedia()"></div>
	</Card>
</template>

<style scoped></style>
