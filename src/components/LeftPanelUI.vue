<script setup lang="ts">
import { Tabs, TabPane } from '@arco-design/web-vue';
import { IconPlus, IconLayers, IconImage } from '@arco-design/web-vue/es/icon';
import LayerMangerUI from './LayerManagerUI.vue';
import BlockManagerUI from './BlockManagerUI.vue';
import { ref } from 'vue';

const activeKey = ref<number>(2);

const goToLayer = () => {
	activeKey.value = 1;
};
</script>
<template>
	<div class="h-100">
		<Tabs id="blockUI" class="h-100" v-model:activeKey="activeKey" :direction="'vertical'">
			<TabPane :key="1">
				<template #title>
					<div class="icon__wrapper">
						<IconLayers class="icon" />
					</div>
				</template>
				<LayerMangerUI @goToLayer="goToLayer" />
			</TabPane>
			<TabPane :key="2">
				<template #title>
					<div class="icon__wrapper">
						<IconPlus class="icon" />
					</div>
				</template>
				<BlockManagerUI />
			</TabPane>
			<TabPane :key="3">
				<template #title>
					<div class="icon__wrapper">
						<IconImage class="icon" />
					</div>
				</template>
			</TabPane>
		</Tabs>
	</div>
</template>

<style>
#blockUI .arco-tabs-nav {
	padding: 0;
}
#blockUI .icon {
	font-size: 18px;
}
#blockUI .icon__wrapper {
	padding: 14px;
}
#blockUI .arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab {
	padding: 0;
	margin: 0 !important;
	margin-top: 0 !important;
}
#blockUI .arco-tabs-nav-type-line .arco-tabs-tab-title {
	padding: 0;
	margin: 0 !important;
	margin-top: 0 !important;
	line-height: 1;
}
#blockUI .arco-tabs-nav-type-line .arco-tabs-tab-title::before {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
</style>
