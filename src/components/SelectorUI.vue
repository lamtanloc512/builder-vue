<script setup lang="ts">
import { Space, InputTag } from "@arco-design/web-vue";
import StateButton from "./SelectorUI/StateButton.vue";
import { Editor } from "grapesjs";
import { Ref, inject, onMounted, onUnmounted, ref } from "vue";
import { CustomSelectorEvent } from "../types.js";

const editor: Readonly<Ref<Editor>> | any = inject('editor')

const classes = ref()
const states = ref()
const state = ref()
const targets = ref()
const selectors = ref<typeof editor.value.Selectors>(editor.value.Selectors)

const changeStateEvent = (e: String) => {
  selectors.value.setState(e.toString())
}
onMounted(() => {
  selectors.value = editor.value.Selectors
  editor.value.on('selector:custom', handleUI)
})

onUnmounted(() => {
  editor.value.off('selector:custom', handleUI)
})

const handleUI = (event: CustomSelectorEvent) => {
  classes.value = event.selected.map(el => el.attributes.name)
  states.value = event.states
  state.value = selectors.value.getState()
  targets.value = selectors.value.getSelectedTargets()
    .map((target: { getSelectorsString: () => any; }) => target.getSelectorsString()).join(', ')
}

</script>
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 style="margin: 0">Classes</h5>
      <StateButton @changeStateEvent="changeStateEvent" :states="states" />
    </div>
    <Space size="medium" direction="vertical" fill>
      <InputTag size="medium" v-model="classes" :style="{ width: '100%', minHeight: '80px' }" allow-clear />
    </Space>
  </div>
</template>

<style scoped></style>