<script setup lang="ts">
	import { InputNumber } from '@arco-design/web-vue';
	import { inject, ref } from 'vue';
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
		props.sectorProperty.upValue(toString(value));
	};
	const clear = () => {
		inputNumberValue.value = toNumber(props.sectorProperty.getValue());
	};

	const isComposite: boolean | undefined = inject('isComposite');

	defineExpose({
		clear,
	});
</script>

<template>
	<InputNumber
		v-model="inputNumberValue"
		:allowClear="isComposite ? true : sectorProperty.canClear()"
		:defaultValue="toNumber(sectorProperty.getDefaultValue())"
		:placeholder="sectorProperty.getDefaultValue()"
		@change="handleNumberChange"
		@clear="clear" />
</template>

<style scoped></style>
