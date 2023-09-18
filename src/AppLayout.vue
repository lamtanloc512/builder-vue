<script setup lang="ts">
import { Layout } from "@arco-design/web-vue";

// import { Editor } from "grapesjs";
// import { Ref, ref } from "vue";
// const props = defineProps<{ editor?: Ref<Editor | any> }>()
// const editorState = ref(props.editor)
// console.log(editorState);

</script>
<template>
  <Layout style="height: 100vh;">
    <slot></slot>
  </Layout>
</template>
<style scoped></style>