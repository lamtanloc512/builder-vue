<script setup lang="ts">
import { Layout, LayoutHeader, LayoutContent, LayoutSider, ResizeBox } from '@arco-design/web-vue';
import { RightPanelUI, LeftPanelUI } from './components/index.ts';
import { provide, ref } from 'vue';
import AppLayout from './AppLayout.vue';
import { useAppStore } from './store/editorStore.ts';
const div = ref();
const store = useAppStore();
provide('editor', store.editor);
</script>

<template>
	<div>
		<AppLayout>
			<LayoutHeader
				:style="{
					height: `50px`,
					width: '100%',
					borderBottom: '1px solid var(--color-border-2)',
					position: 'fixed',
					zIndex: 100,
				}">
			</LayoutHeader>
			<Layout
				:style="{
					marginTop: '50px',
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}">
				<LayoutSider
					:style="{
						height: '100%',
						minWidth: '300px',
						overflowX: 'auto',
						borderRight: '1px solid var(--color-border-2)',
					}">
					<LeftPanelUI />
				</LayoutSider>
				<LayoutContent class="w-100">
					<ResizeBox
						:class="['container--editor']"
						:directions="['top', 'right', 'bottom', 'left']"
						:style="{
							width: '99%',
							height: '97%',
							textAlign: 'center',
						}">
						<div :class="['w-100 h-100']" :ref="(el) => store.connect(el as HTMLElement)"></div>
					</ResizeBox>
				</LayoutContent>
				<LayoutSider
					:style="{
						minWidth: '260px',
						height: '100%',
						borderLeft: '1px solid var(--color-border-2)',
						backgroundColor: 'var(--color-fill-2)',
						padding: '8px',
					}">
					<RightPanelUI />
				</LayoutSider>
			</Layout>
		</AppLayout>
	</div>
</template>

<style scoped>
.container--editor {
	display: grid;
	place-items: center;
	/* background-color: var(--color-neutral-4); */
}
</style>
