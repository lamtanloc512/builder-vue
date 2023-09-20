<script setup lang="ts">
	import { Card } from '@arco-design/web-vue';
	import { ref, toRef } from 'vue';
	import { PropertyField } from '../index.ts';
	//@ts-ignore
	import { PropertyComposite, Property } from 'grapesjs';

	const props = defineProps<{
		sector: PropertyComposite;
	}>();

	// const sectorProperties = ref<Property[]>(props.sector.getProperties());
	const sector = toRef(props.sector);
	const sectorProperties = sector.value.getProperties();
	const propertyRef = ref();

	const handleClear = (): void => {
		console.log('caled');
		propertyRef.value.forEach((property: any) => {
			console.log(property);
			property.handleClear();
		});
	};
	defineExpose({
		handleClear,
	});
</script>

<template>
	<Card
		class="composite-group"
		:size="'small'">
		<div class="grid-container">
			<PropertyField
				v-for="sectorProperty in sectorProperties"
				:class="[
					sectorProperties.length % 2 == 1
						? 'grid-item-odd'
						: 'grid-item-event',
				]"
				:isComposite="true"
				:sectorProperty="sectorProperty"
				ref="propertyRef" />
		</div>
	</Card>
</template>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-columns: 1fr;
		row-gap: 0px;
		column-gap: 8px;
		margin: 0 auto;
	}
	.grid-item-event {
		grid-column: span 1;
	}
	.grid-item-odd {
		grid-column: span 2;
	}
</style>
