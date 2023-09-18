<script setup lang="ts">
import { Layout } from "@arco-design/web-vue";
import { Editor } from "grapesjs";
defineProps<{ editor: Editor }>()
</script>
<template>
  <Layout style="height: 100vh;">
    <slot :editor="editor"></slot>
  </Layout>
</template>
<style scoped></style>