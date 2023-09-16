<script setup lang="ts">
import grapesjs, {Editor} from 'grapesjs'
import {ref, onMounted, onUnmounted, watch} from "vue";
import TextArea from "./components/TextArea.vue";
import {Layout, LayoutHeader, LayoutContent, LayoutSider} from "@arco-design/web-vue";
import {customSelectorUI} from './events/selectorCustom.ts'

const editor = ref<Partial<Editor>>();
const sidePanelId = 'side-panel'
const panelAppRef = ref();
onMounted(() => {
  editor.value = grapesjs.init({
    container: "#editorPreview",
    fromElement: true,
    height: '300px',
    width: 'auto',
    storageManager: false,
    panels: {defaults: []},
    selectorManager: {
      componentFirst: true,
      custom: true,
    }
  })
  customSelectorUI(sidePanelId, panelAppRef, editor.value)

})

onUnmounted(() => {
})

</script>

<template>
  <Layout style="height: 100vh;">
    <LayoutHeader
      :style="{height: `50px`, width: '100%', borderBottom: '1px solid var(--color-border-2)'}"></LayoutHeader>
    <Layout>
      <LayoutSider :style="{minWidth: '250px', height: '100%', borderRight: '1px solid var(--color-border-2)',
        backgroundColor: 'var(--color-fill-2)',
        padding: '8px'
      }">
        <div id="side-panel"></div>
      </LayoutSider>
      <LayoutContent v-cloak>
        <div id="editorPreview" v-cloak>
          <TextArea/>
        </div>
      </LayoutContent>
    </Layout>
  </Layout>


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
