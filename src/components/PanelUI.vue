<script setup lang="ts">
import { Space } from '@arco-design/web-vue';
import { SelectorUI, StyleManagerUI } from './index.ts';
import { Editor } from 'grapesjs';
defineProps<{
  editor: Editor
}>()
</script>
<template>
  <Space direction="vertical" fill>
    <StyleManagerUI :editor="editor" />
    <SelectorUI :editor="editor" />
  </Space>
</template>
<style scoped></style>