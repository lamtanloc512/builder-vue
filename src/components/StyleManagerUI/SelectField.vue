<script setup lang="ts">
	import { Select, Option } from '@arco-design/web-vue';
	import { computed, toRef, ref } from 'vue';
	import { upperFirst } from 'lodash';
	import { PropertySelect, SelectOption } from 'grapesjs';

	const props = defineProps<{
		sectorProperty: PropertySelect;
		isComposite?: boolean;
	}>();

	const selectValue = toRef(props.sectorProperty.getValue());

	const canClearCompositeChilds = ref(false);

	const displayOptions = computed(() =>
		props.sectorProperty.getOptions().map((el: SelectOption) => {
			return {
				id: props.sectorProperty.getOptionId(el),
				value: props.sectorProperty.getOptionId(el),
				text: upperFirst(props.sectorProperty.getOptionLabel(el)),
			};
		}),
	);

	type EvType = {
		value:
			| string
			| number
			| boolean
			| Record<string, any>
			| (string | number | boolean | Record<string, any>)[];
	};
	const handleChange = (ev: EvType['value']): any => {
		props.sectorProperty.upValue(`${ev}`);
		if (props.isComposite) {
			canClearCompositeChilds.value = true;
		}
	};
	const clear = () => {
		selectValue.value = props.sectorProperty.getValue();
		props.sectorProperty.clear();
		canClearCompositeChilds.value = false;
	};

	defineExpose({ clear });
</script>
<template>
	<Select
		class="w-100"
		v-model="selectValue"
		:allowClear="
			canClearCompositeChilds
				? canClearCompositeChilds
				: sectorProperty.canClear()
		"
		@clear="clear"
		@change="handleChange">
		<Option
			v-for="option in displayOptions"
			:key="option.id"
			:value="option.value">
			<span>
				{{ option.text }}
			</span>
		</Option>
	</Select>
</template>

<style scoped></style>
