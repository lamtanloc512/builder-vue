<script setup lang="ts">
	import {
		Col,
		Row,
		Space,
		Button,
		Divider,
		Typography,
		TypographyText,
		TypographyTitle,
	} from '@arco-design/web-vue';
	import { IconCloseCircleFill } from '@arco-design/web-vue/es/icon/index.js';
	import {
		Property,
		PropertyComposite,
		PropertyNumber,
		PropertyRadio,
		PropertySelect,
		//@ts-ignore
	} from 'grapesjs';
	import { computed, ref } from 'vue';
	import { includes } from 'lodash';
	import SelectField from './SelectField.vue';
	import RadioField from './RadioField.vue';
	import InputNumberField from './InputNumberField.vue';
	import ColorField from './ColorField.vue';
	import SliderField from './SliderField.vue';
	import CompositeField from './CompositeField.vue';

	export type SectorPropertyType = PropertySelect &
		PropertyRadio &
		PropertyNumber &
		PropertyComposite &
		Property;

	const props = defineProps<{
		sectorProperty: SectorPropertyType | Property | any;
		isComposite: boolean;
	}>();

	const radioRef = ref();
	const colorRef = ref();
	const sliderRef = ref();
	const propType = computed(() => props.sectorProperty.getType());
	const defaultValue = computed(() => props.sectorProperty.getDefaultValue());

	const handleClear = () => {
		props.sectorProperty.clear();
		switch (propType.value) {
			case 'radio':
				radioRef.value.handleClear();
				break;
			case 'color':
				colorRef.value.handleClear();
				break;
			case 'slider':
				sliderRef.value.handleClear();
				break;
			default:
				break;
		}
	};
</script>
<template>
	<Space
		:direction="'vertical'"
		:size="'large'"
		class="my-2"
		fill>
		<Row
			:justify="'space-between'"
			:align="'center'">
			<Col class="my-1">
				<div class="d-flex justify-content-between align-items-center py-1">
					<Typography :class="[isComposite ? 'ms-0 mb-1' : 'mb-0 ms-1']">
						<TypographyTitle
							:style="{ fontSize: '13.5px' }"
							:code="isComposite"
							:heading="6"
							>{{ sectorProperty.getLabel() }}</TypographyTitle
						>
					</Typography>
					<Space
						:direction="'horizontal'"
						v-if="!includes(['select', 'number', 'composite'], propType)">
						<Divider
							v-if="sectorProperty.canClear()"
							:direction="'vertical'" />
						<Typography v-if="sectorProperty.canClear()">
							<TypographyText
								:style="{ fontSize: '13px' }"
								:code="isComposite"
								>Reset</TypographyText
							>
						</Typography>
						<Button
							v-if="sectorProperty.canClear()"
							:size="'mini'"
							:shape="'circle'"
							:type="'primary'"
							:status="'danger'"
							@click="handleClear">
							<IconCloseCircleFill
								:style="{
									fontSize: '18px',
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
					ref="radioRef"
					:sectorProperty="sectorProperty"
					:defaultValue="defaultValue" />
			</Col>
			<Col v-if="propType == 'number'">
				<InputNumberField :sectorProperty="sectorProperty" />
			</Col>
			<Col v-if="propType == 'color'">
				<ColorField
					ref="colorRef"
					:sectorProperty="sectorProperty" />
			</Col>
			<Col v-if="propType == 'slider'">
				<SliderField
					ref="sliderRef"
					:sectorProperty="sectorProperty" />
			</Col>
			<Col v-if="propType == 'composite'">
				<CompositeField :sector="sectorProperty" />
			</Col>
		</Row>
	</Space>
</template>
<style scoped></style>
