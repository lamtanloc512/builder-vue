<script setup lang="ts">
import { SelectorUI, StyleManagerUI } from './index.ts';
import { Editor } from 'grapesjs';
defineProps<{
  editor: Editor
}>()
</script>
<template>
  <div :style="{
    padding: '8px',
    backgroundColor: 'var(--color-bg-white)'
  }">
    <StyleManagerUI :editor="editor" />
    <SelectorUI :editor="editor" />
  </div>
</template>