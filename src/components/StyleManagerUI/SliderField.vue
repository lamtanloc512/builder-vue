<script setup lang="ts">
	import { Slider } from '@arco-design/web-vue';
	import { PropertyNumber } from 'grapesjs';
	import { toNumber } from 'lodash';
	import { toRef } from 'vue';

	const props = defineProps<{ sectorProperty: PropertyNumber }>();
	const formatter = (value: number) => {
		return `${Math.round(value * 100)}%`;
	};
	const sliderValue = toRef(toNumber(props.sectorProperty.getValue()));

	type EvType = {
		value:
			| string
			| number
			| boolean
			| Record<string, any>
			| (string | number | boolean | Record<string, any>)[];
	};
	const handleSliderChange = (ev: EvType['value']): void => {
		props.sectorProperty.upValue(`${ev}`);
	};
	const handleClear = () => {
		props.sectorProperty.clear();
		sliderValue.value = toNumber(props.sectorProperty.getValue());
	};

	defineExpose<{
		handleClear: () => void;
	}>({
		handleClear,
	});
</script>

<template>
	<Slider
		v-model="sliderValue"
		:min="toNumber(sectorProperty.getMin())"
		:max="toNumber(sectorProperty.getMax())"
		:step="toNumber(sectorProperty.getStep())"
		:formatTooltip="formatter"
		@change="handleSliderChange" />
</template>

<style scoped></style>
