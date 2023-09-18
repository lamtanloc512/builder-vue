<script setup lang="ts">
	import { Col, Row, Space, Button, Divider } from '@arco-design/web-vue';
	import { IconCloseCircleFill } from '@arco-design/web-vue/es/icon/index.js';
	import {
		Property,
		PropertyNumber,
		PropertyRadio,
		PropertySelect,
	} from 'grapesjs';
	import { computed } from 'vue';
	//@ts-ignore
	import { includes } from 'lodash';
	import SelectField from './SelectField.vue';
	import RadioField from './RadioField.vue';
	import InputNumberField from './InputNumberField.vue';

	type SectorPropertyType = PropertySelect &
		PropertyRadio &
		PropertyNumber &
		Property;
	const props = defineProps<{
		sectorProperty: SectorPropertyType;
	}>();

	const propType = computed(() => props.sectorProperty.getType());
	const defaultValue = computed(() => props.sectorProperty.getDefaultValue());
	// const inputValue = computed(() =>
	// 	props.sectorProperty.hasValue() ? props.sectorProperty.hasValue() : '',
	// );
	const handleClear = () => {
		props.sectorProperty.clear();
	};
</script>
<template>
	<Space
		:direction="'vertical'"
		:size="'large'"
		fill>
		<Row
			:justify="'space-between'"
			:align="'center'">
			<Col
				v-if="propType != 'select'"
				class="mt-3 mb-1">
				<div class="d-flex justify-content-between align-items-center">
					<span>{{ props.sectorProperty.getLabel() }}</span>
					<Space
						:direction="'horizontal'"
						v-if="!['select', 'number'].includes(propType)">
						<Divider
							v-if="sectorProperty.canClear()"
							:direction="'vertical'" />
						<span v-if="sectorProperty.canClear()">Clear</span>
						<Button
							v-if="sectorProperty.canClear()"
							:size="'mini'"
							:shape="'circle'"
							:type="'outline'"
							:status="'danger'"
							@click="handleClear">
							<IconCloseCircleFill
								:style="{
									fontSize: '20px',
								}" />
						</Button>
					</Space>
				</div>
			</Col>
			<Col v-if="propType == 'select'">
				<SelectField
					:sectorProperty="sectorProperty"
					:defaultValue="defaultValue" />
			</Col>
			<Col v-if="propType == 'radio'">
				<RadioField
					:sectorProperty="sectorProperty"
					:defaultValue="defaultValue" />
			</Col>
			<Col v-if="propType == 'number'">
				<InputNumberField :sectorProperty="sectorProperty" />
			</Col>
		</Row>
	</Space>
</template>
<style scoped></style>
