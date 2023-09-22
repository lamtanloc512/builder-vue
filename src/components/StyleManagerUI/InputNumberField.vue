<script setup lang="ts">
	import { InputNumber } from '@arco-design/web-vue';
	import { ref, toRef } from 'vue';
	import { isNumber, isString, toNumber, toString } from 'lodash';
	//@ts-ignore
	import { PropertyNumber } from 'grapesjs';

	const props = defineProps<{
		sectorProperty: PropertyNumber;
		isComposite?: boolean;
	}>();

	const inputNumberValue = toRef(toNumber(props.sectorProperty.getValue()));

	const canClearCompositeChilds = ref(false);

	type EvType = {
		value: number | string | undefined;
		ev: Event;
	};

	const handleNumberChange = (value: EvType['value']): void => {
		props.sectorProperty.upValue(toString(value));
		if (props.isComposite) {
			canClearCompositeChilds.value = true;
		}
	};
	const clear = () => {
		// props.sectorProperty.setValue(props.sectorProperty.getDefaultValue());
		props.sectorProperty.clear();
		inputNumberValue.value = isString(props.sectorProperty.getValue())
			? toNumber(props.sectorProperty.getValue())
			: isNumber(props.sectorProperty.getValue())
			? props.sectorProperty.getValue()
			: 0;
		if (props.isComposite) {
			canClearCompositeChilds.value = false;
		}
	};

	defineExpose({ clear });
</script>

<template>
	<div>
		<InputNumber
			v-model="inputNumberValue"
			:allowClear="
				canClearCompositeChilds
					? canClearCompositeChilds
					: sectorProperty.canClear()
			"
			:defaultValue="toNumber(sectorProperty.getDefaultValue())"
			:placeholder="sectorProperty.getDefaultValue()"
			@change="handleNumberChange"
			@clear="clear" />
	</div>
</template>

<style scoped></style>
