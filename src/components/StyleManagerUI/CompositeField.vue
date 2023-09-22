<script setup lang="ts">
	import {
		Card,
		Space,
		Button,
		Divider,
		Typography,
		TypographyText,
		TypographyTitle,
	} from '@arco-design/web-vue';
	import { ref } from 'vue';
	//@ts-ignore
	import { PropertyComposite, Property } from 'grapesjs';
	import InputNumberField from './InputNumberField.vue';
	import SelectField from './SelectField.vue';
	import ColorField from './ColorField.vue';

	const props = defineProps<{
		sector: PropertyComposite;
	}>();

	const componentRef = ref();

	const reset = (): void => {
		componentRef.value.forEach((el: any) => {
			const checkCanClear = el?.clear;
			if (checkCanClear) {
				el.clear();
			}
		});
	};

	const resolveMapComponent = {
		number: InputNumberField,
		select: SelectField,
		color: ColorField,
	} as any;
</script>

<template>
	<Card
		class="composite-group"
		:size="'small'">
		<div class="d-flex justify-content-between align-items-center py-1">
			<Typography :class="['mb-0 ms-1']">
				<TypographyTitle
					:style="{ fontSize: '13.5px' }"
					:heading="6"
					>{{ sector.getLabel() }}</TypographyTitle
				>
			</Typography>
			<Space
				:direction="'horizontal'"
				v-if="props.sector.canClear()">
				<Divider :direction="'vertical'" />
				<Typography>
					<TypographyText :style="{ fontSize: '13px' }">Reset</TypographyText>
				</Typography>
				<Button
					:size="'mini'"
					:shape="'circle'"
					:type="'primary'"
					:status="'success'"
					@click="reset">
					<IconCloseCircleFill
						:style="{
							fontSize: '18px',
						}" />
				</Button>
			</Space>
		</div>
		<div class="grid-container">
			<component
				ref="componentRef"
				v-for="sectorProperty in sector.getProperties()"
				:is="resolveMapComponent[sectorProperty.getType()]"
				:class="[
					sector.getProperties().length % 2 == 1
						? 'grid-item-odd'
						: 'grid-item-event',
				]"
				:isComposite="true"
				:sectorProperty="sectorProperty" />
		</div>
	</Card>
</template>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-columns: 1fr;
		row-gap: 8px;
		column-gap: 8px;
		margin: 0 auto;
	}
	.grid-item-event {
		grid-column: span 1;
	}
	.grid-item-odd {
		grid-column: span 2;
	}
</style>
