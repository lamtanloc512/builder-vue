<script setup lang="ts">
import { Layout, LayoutHeader, LayoutContent, LayoutSider } from "@arco-design/web-vue";
import { useEditor } from './composables/editor.ts'
import { PanelUI } from './components/index.ts'
import { useEditorStore } from './store/editorStore.ts';
import { onMounted, provide, ref } from "vue";
import AppLayout from "./AppLayout.vue";

// const store = useEditorStore();
const { _editor, connect } = useEditor()
const div = ref()
const editor = ref();

provide('editor', editor)

</script>

<template>
  <AppLayout :editor="editor">
    <template #default>
      <LayoutHeader :style="{ height: `50px`, width: '100%', borderBottom: '1px solid var(--color-border-2)' }">
      </LayoutHeader>
      <Layout>
        <LayoutSider :style="{
          minWidth: '200px', height: '100%', borderRight: '1px solid var(--color-border-2)',
          backgroundColor: 'var(--color-fill-2)',
          padding: '8px'
        }">
          <!--<div id="panel__switcher"></div>-->
        </LayoutSider>
        <LayoutContent>
          <div :ref="(el) => {
            div = el
            connect(div);
            editor = _editor
          }"></div>
        </LayoutContent>
        <LayoutSider :style="{
          minWidth: '250px', height: '100%', borderLeft: '1px solid var(--color-border-2)',
          backgroundColor: 'var(--color-fill-2)',
          padding: '8px'
        }">
          <PanelUI :editor="editor" />
        </LayoutSider>
      </Layout>
    </template>

  </AppLayout>
</template>

<style>
@import url("https://unpkg.com/grapesjs/dist/css/grapes.min.css");

/* Reset some default styling */
.gjs-cv-canvas {
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
