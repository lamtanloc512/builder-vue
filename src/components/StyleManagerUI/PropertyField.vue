<script setup lang="ts">
	import { Col, Row, Space, Button, Divider } from '@arco-design/web-vue';
	import { IconCloseCircleFill } from '@arco-design/web-vue/es/icon/index.js';
	import { Property, PropertyRadio, PropertySelect } from 'grapesjs';
	import { computed, ref } from 'vue';
	//@ts-ignore
	import SelectField from './SelectField.vue';
	import RadioField from './RadioField.vue';

	type SectorPropertyType = PropertySelect & PropertyRadio & Property;
	const props = defineProps<{
		sectorProperty: SectorPropertyType;
	}>();

	const propType = computed(() => props.sectorProperty.getType());

	const onClear = ref();

	const handleClear = () => {
		onClear.value.clear();
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
			<Col class="mt-3 mb-1">
				<div class="d-flex justify-content-between align-items-center">
					<span>{{ props.sectorProperty.getLabel() }}</span>
					<Space :direction="'horizontal'">
						<Divider :direction="'vertical'" />
						<span v-if="sectorProperty.canClear()">Clear</span>
						<Button
							v-if="sectorProperty.canClear()"
							:size="'mini'"
							:shape="'circle'"
							:type="'outline'"
							:status="'danger'"
							@click="
								(_) => {
									sectorProperty.clear();
									handleClear();
								}
							">
							<IconCloseCircleFill
								:style="{
									fontSize: '20px',
								}" />
						</Button>
					</Space>
				</div>
			</Col>
			<Col>
				<SelectField
					v-if="propType == 'select'"
					ref="onClear"
					:sectorProperty="sectorProperty"
					:defaultValue="sectorProperty.getValue()" />
			</Col>
			<Col>
				<RadioField
					ref="onClear"
					v-if="propType == 'radio'"
					:sectorProperty="sectorProperty"
					:defaultValue="sectorProperty.getValue()" />
			</Col>
		</Row>
	</Space>
</template>
<style scoped></style>
