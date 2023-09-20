<script setup lang="ts">
	import { Collapse, CollapseItem, List } from '@arco-design/web-vue';
	import { Ref, onMounted, onUnmounted, ref } from 'vue';
	//@ts-ignore
	import { Editor, Sector } from 'grapesjs';
	import { upperFirst } from 'lodash';
	import { PropertyField } from './index.ts';
	import { inject } from 'vue';

	const editor: Editor | undefined = inject('editor');
	const styleManager = editor?.StyleManager;
	const sectors: Ref<Sector[] | any> = ref();
	const divEl = ref();

	onMounted(() => {
		editor?.on('style:custom', handleStyleManager);
	});
	onUnmounted(() => {
		editor?.off('style:custom', handleStyleManager);
	});
	//methods
	const handleStyleManager = (props: any) => {
		let { container } = props;
		if (!container) {
			container = divEl.value;
			sectors.value = styleManager?.getSectors({ visible: true });
		}
	};
</script>
<template>
	<div
		id="styleManager"
		:style="{
			padding: '4px',
			backgroundColor: 'var(--color-bg-white)',
		}"
		:ref="(el) => (divEl = el)">
		<Collapse
			:bordered="false"
			accordion>
			<CollapseItem
				v-for="sector in sectors"
				:style="{ padding: '2px' }"
				:key="sector.getId()"
				:header="upperFirst(sector.getName())">
				<List
					:scrollbar="true"
					:bordered="false"
					:max-height="'50vh'">
					<div
						:style="{ padding: '0 14px 0 0' }"
						v-for="sectorProperty in sector.getProperties()"
						:key="sectorProperty.getId()">
						<PropertyField
							:isComposite="false"
							:sectorProperty="sectorProperty" />
					</div>
				</List>
			</CollapseItem>
		</Collapse>
	</div>
</template>
<style></style>
