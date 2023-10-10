<script setup lang="ts">
	//@ts-ignore
	import { Property } from 'grapesjs';
	import {
		ColorObject,
		ColorPickerChangeTrigger,
		ColorPickerPanel,
		// ColorPickerPanel,
	} from 'tdesign-vue-next';
	import { onMounted, ref } from 'vue';
	import { translateChinese } from '../../dom.ts';

	const props = defineProps<{
		sectorProperty: Property;
	}>();

	const emit = defineEmits(['reset']);

	const colorValue = ref(
		props.sectorProperty.hasValue()
			? props.sectorProperty.getValue()
			: props.sectorProperty.getDefaultValue()
	);
	const recentColors = ref([
		'red',
		'green',
		'yellow',
		'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
		'linear-gradient(45deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)',
		'linear-gradient(120deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)',
	]);

	onMounted(() => {
		translateChinese();
	});

	type EVType = {
		value: string;
		context: {
			color: ColorObject;
			trigger: ColorPickerChangeTrigger;
		};
	};
	const handleColorChange = (value: EVType['value']) => {
		props.sectorProperty.upValue(`${value}`);
	};
	const handleRecentColorChange = (values: Array<string>) => {
		recentColors.value = [...values];
	};

	const handleClear = () => {
		colorValue.value = props.sectorProperty.getValue();
		emit('reset');
	};

	defineExpose<{
		handleClear: () => void;
	}>({
		handleClear,
	});
</script>

<template>
	<ColorPickerPanel
		class="w-100"
		v-model="colorValue"
		:clearable="sectorProperty.canClear()"
		:recentColors="recentColors"
		:enableAlpha="true"
		:multiple="true"
		:swatch-colors="[]"
		@change="handleColorChange"
		@recentColorsChange="handleRecentColorChange" />
</template>

<style scoped></style>
