<script setup lang="ts">
import { Space, InputTag } from "@arco-design/web-vue";
import StateButton from "./SelectorUI/StateButton.vue";
import { Editor } from "grapesjs";
import { inject, onMounted, onUnmounted, ref } from "vue";
import { CustomSelectorEvent } from "../types.js";
//inject
const editor: Editor | undefined = inject('editor')
//state
const classes = ref()
const states = ref()
const state = ref()
const targets = ref()
const selectors = ref(editor?.Selectors)
//hooks
onMounted(() => {
  editor?.on('selector:custom', handleUI)
})
onUnmounted(() => {
  editor?.off('selector:custom', handleUI)
})

//functions
const changeStateEvent = (e: string) => {
  selectors.value?.setState(e)
}
const handleUI = (event: CustomSelectorEvent) => {
  classes.value = event.selected.map(el => el.attributes.name)
  states.value = event.states
  state.value = selectors.value?.getState()
  targets.value = selectors.value?.getSelectedTargets()
    .map((target: { getSelectorsString: () => any; }) => target.getSelectorsString()).join(', ')
}
</script>
<template>
  <div :style=" {
    padding: '8px',
    backgroundColor: 'var(--color-bg-white)'
  } ">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 style="margin: 0">Classes</h5>
      <StateButton @changeStateEvent=" changeStateEvent " :states=" states " :state=" state " />
    </div>
    <Space size="medium" direction="vertical" fill>
      <InputTag size="medium" v-model=" classes " :style=" { width: '100%', minHeight: '80px' } " allow-clear />
    </Space>
  </div>
</template>

<style scoped></style>