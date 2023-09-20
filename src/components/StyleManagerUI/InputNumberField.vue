<script setup lang="ts">
	import { InputNumber } from '@arco-design/web-vue';
	import { ref } from 'vue';
	import { toNumber, toString } from 'lodash';
	//@ts-ignore
	import { PropertyNumber } from 'grapesjs';

	const props = defineProps<{
		sectorProperty: PropertyNumber;
	}>();

	const inputNumberValue = ref(
		props.sectorProperty.hasValue()
			? toNumber(props.sectorProperty.getValue())
			: 0,
	);

	type EvType = {
		value: number | undefined;
		ev: Event;
	};

	const handleNumberChange = (value: EvType['value']): void => {
		console.log(typeof value);
		props.sectorProperty.upValue(toString(value));
	};
	const clear = () => {
		inputNumberValue.value = toNumber(props.sectorProperty.getValue());
	};
</script>

<template>
	<InputNumber
		v-model="inputNumberValue"
		:size="'mini'"
		:mode="'button'"
		:defaultValue="toNumber(sectorProperty.getDefaultValue())"
		:placeholder="sectorProperty.getDefaultValue()"
		:allowClear="sectorProperty.canClear()"
		@change="handleNumberChange"
		@clear="clear" />
</template>

<style scoped></style>
