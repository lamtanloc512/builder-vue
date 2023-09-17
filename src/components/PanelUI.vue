<script setup lang="ts">
import { SelectorUI, StyleManagerUI } from './index.ts';

</script>

<template>
  <div :style="{
    padding: '8px',
    backgroundColor: 'var(--color-bg-white)'
  }">
    <StyleManagerUI />
    <SelectorUI />
  </div>
</template>