<script setup lang="ts">
	import { Radio, RadioGroup } from '@arco-design/web-vue';
	import { PropertyRadio, PropertySelect } from 'grapesjs';
	import { computed, ref } from 'vue';
	//@ts-ignore
	import { upperFirst } from 'lodash';
	const props = defineProps<{
		sectorProperty: PropertySelect & PropertyRadio;
	}>();

	console.log(props.sectorProperty.getOption());
	console.log(props.sectorProperty.getOptions());
	console.log(props.sectorProperty.getLabel());
	const radioOptions = computed(() => {
		return props.sectorProperty.getOptions().map((el) => {
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
	const clear = () => {
		radioValue.value = props.sectorProperty.getValue();
	};
	defineExpose({
		clear,
	});
</script>

<template>
	<RadioGroup
		@change="handleRadioChange"
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
