<script setup lang="ts">
import { Layout, LayoutHeader, LayoutContent, LayoutSider } from "@arco-design/web-vue";
import { PanelUI, BlocksUI } from './components/index.ts'
import { provide, ref } from "vue";
import AppLayout from "./AppLayout.vue";
// import { Editor } from "grapesjs";
import { useAppStore } from "./store/editorStore.ts";
const div = ref()
const store = useAppStore();
provide('editor', store.editor)
</script>

<template>
  <div>
    <AppLayout>
      <LayoutHeader :style=" { height: `50px`, width: '100%', borderBottom: '1px solid var(--color-border-2)' } ">
      </LayoutHeader>
      <Layout>
        <LayoutSider :style=" {
          minWidth: '200px', height: '100%', borderRight: '1px solid var(--color-border-2)',
          backgroundColor: 'var(--color-fill-2)',
          padding: '8px'
        } ">
          <BlocksUI />
        </LayoutSider>
        <LayoutContent>
          <div :ref=" (el) => {
            div = el
            store.connect(div);
          } "></div>
        </LayoutContent>
        <LayoutSider :style=" {
          minWidth: '280px', height: '100%', borderLeft: '1px solid var(--color-border-2)',
          backgroundColor: 'var(--color-fill-2)',
          padding: '8px'
        } ">
          <PanelUI />
        </LayoutSider>
      </Layout>
    </AppLayout>
  </div>
</template>

<style>
@import url("https://unpkg.com/grapesjs/dist/css/grapes.min.css");

.gjs-cv-canvas {
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
