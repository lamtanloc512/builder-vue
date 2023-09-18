<script setup lang="ts">
import { Editor } from 'grapesjs';
import { onMounted, onUnmounted, ref } from 'vue';


const props = defineProps<{
  editor: Editor
}>()

const sectors = ref([])
const divEl = ref()

onMounted(() => {
  console.log(props.editor);
  props.editor.on('style:custom', (props: any) => {
    console.log(props)
  });
  //  editor.value.on('style:sector:remove ', handleStyleCustom);
  //  editor.value.on('style:sector:update', handleStyleCustom);
  //  editor.value.on('style:property:add', handleStyleCustom);
  //  editor.value.on('style:property:remove', handleStyleCustom);
  //  editor.value.on('style:property:update', handleStyleCustom);
  //  editor.value.on('style:target', handleStyleCustom);
  //  editor.value.on('style:custom', handleStyleCustom);
})

onUnmounted(() => {
  props.editor.off('style:custom', handleStyleCustom);
})

const handleStyleCustom = (props: any) => {
  console.log(props)
  //  let {container} = props
  //  if (!container) {
  //    container = divEl.value
  //  }
}

</script>
<template>
  <div :ref="(el) => divEl = el">
    <h4>Hello WOrld</h4>
  </div>
</template>


<style scoped></style>