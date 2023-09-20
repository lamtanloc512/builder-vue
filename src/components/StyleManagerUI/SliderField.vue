<script setup lang="ts">
	import { Slider } from '@arco-design/web-vue';
	//@ts-ignore
	import { PropertyNumber } from 'grapesjs';
	import { toNumber } from 'lodash';
	import { ref } from 'vue';

	const props = defineProps<{ sectorProperty: PropertyNumber }>();
	const formatter = (value: number) => {
		return `${Math.round(value * 100)}%`;
	};
	const sliderValue = ref(toNumber(props.sectorProperty.getValue()));

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
