<script setup lang="ts">
	import { Select, Option } from '@arco-design/web-vue';
	import { computed, toRef } from 'vue';
	import { upperFirst } from 'lodash';
	//@ts-ignore
	import { PropertySelect } from 'grapesjs';
	import { Property } from 'grapesjs/dist/index.js';

	const props = defineProps<{
		sectorProperty: PropertySelect;
	}>();

	// const selectValue = ref<string>(props.sectorProperty.getValue());
	const selectValue = toRef(props.sectorProperty.getValue());

	const displayOptions = computed(() =>
		props.sectorProperty.getOptions().map((el: Property) => {
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
	};
	const clear = () => {
		selectValue.value = props.sectorProperty.getValue();
	};
</script>
<template>
	<Select
		class="w-100"
		v-model="selectValue"
		:allowClear="sectorProperty.canClear()"
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
