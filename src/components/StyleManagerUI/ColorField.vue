<script setup lang="ts">
	import { Property } from 'grapesjs';
	import {
		ColorObject,
		ColorPickerChangeTrigger,
		ColorPicker,
	} from 'tdesign-vue-next';
	import { onMounted, ref } from 'vue';
	import { translateChinese } from '../../dom.ts';

	const props = defineProps<{
		sectorProperty: Property;
	}>();

	const colorValue = ref(
		props.sectorProperty.hasValue()
			? props.sectorProperty.getValue()
			: props.sectorProperty.getDefaultValue(),
	);
	const recentColors = ref([
		'red',
		'green',
		'yellow',
		'blue',
		'purple',
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
	};

	defineExpose<{
		handleClear: () => void;
	}>({
		handleClear,
	});
</script>

<template>
	<ColorPicker
		class="w-100"
		:style="{ innerWidth: '100%', outerWidth: '100%' }"
		:clearable="true"
		:enableAlpha="true"
		v-model="colorValue"
		v-model:recentColors="recentColors"
		@change="handleColorChange"
		@recentColorsChange="handleRecentColorChange" />
</template>

<style scoped>

</style>
