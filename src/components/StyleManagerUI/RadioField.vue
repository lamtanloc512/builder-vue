<script setup lang="ts">
	import { Radio, RadioGroup } from '@arco-design/web-vue';
	//@ts-ignore
	import { PropertyRadio, PropertySelect, SelectOption } from 'grapesjs';
	import { upperFirst } from 'lodash';
	import { computed, defineExpose, ref } from 'vue';

	const props = defineProps<{
		sectorProperty: PropertySelect & PropertyRadio;
	}>();

	const radioOptions = computed(() => {
		return props.sectorProperty.getOptions().map((el: SelectOption) => {
			return {
				id: el.id,
				text: upperFirst(el.id),
			};
		});
	});
	const radioValue = ref(props.sectorProperty.getValue());

	type EvType = {
		value:
			| string
			| number
			| boolean
			| Record<string, any>
			| (string | number | boolean | Record<string, any>)[];
	};

	const handleRadioChange = (ev: EvType['value']): void => {
		props.sectorProperty.upValue(`${ev}`);
	};

	const handleClear = () => {
		radioValue.value = props.sectorProperty.getValue();
	};

	defineExpose<{
		handleClear: () => void;
	}>({
		handleClear,
	});
</script>

<template>
	<RadioGroup
		@change="handleRadioChange"
		@clear="handleClear"
		v-model="radioValue"
		type="radio"
		:size="'small'">
		<Radio
			v-for="radio in radioOptions"
			:value="radio.id"
			>{{ radio.text }}</Radio
		>
	</RadioGroup>
</template>

<style scoped></style>
