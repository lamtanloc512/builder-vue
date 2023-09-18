<script setup lang="ts">
import { Layout } from "@arco-design/web-vue";
defineProps<{ editor: any }>()
</script>
<template>
  <Layout style="height: 100vh;">
    <slot :editor="editor"></slot>
  </Layout>
</template>
<style scoped></style>