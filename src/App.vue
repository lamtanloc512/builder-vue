<script setup lang="ts">
import {Layout, LayoutHeader, LayoutContent, LayoutSider} from "@arco-design/web-vue";
import {useEditor} from './composables/editor.ts'
import {provide} from "vue";
import {PanelUI} from './components/index.ts'
import {Slider} from './plugins/StyleManager/index.ts'

const {editor, connect} = useEditor()

const handleConnect = (el) => {
  connect(el)
}

provide('editor', editor)
</script>

<template>
  <Layout style="height: 100vh;">
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
        <div :ref="handleConnect"></div>
      </LayoutContent>
      <LayoutSider :style="{
        minWidth: '250px', height: '100%', borderLeft: '1px solid var(--color-border-2)',
        backgroundColor: 'var(--color-fill-2)',
        padding: '8px'
      }">
        <PanelUI/>
      </LayoutSider>
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
