<script setup lang="ts">
import {Space, InputTag} from "@arco-design/web-vue";
import SelectorStateButton from "./PanelComponents/SelectorStateButton.vue";
import {Selector, State} from "grapesjs";
import {onMounted, onUnmounted, ref} from "vue";

type PropsType = {
  editor: Editor
}
const props = defineProps<PropsType>()
const classes = ref()
const states = ref()
const state = ref()
const targets = ref()
const selector = ref()

onMounted(() => {
  selector.value = props.editor.Selectors
  props.editor.on('selector:custom', handleUI)
})

onUnmounted(() => {
  props.editor.off('selector:custom', handleUI)
})

const changeStateEvent = (e: State) => {
  selector.value.setState(e)
  console.log(selector.value.getState())
}

const handleUI = (e: any) => {
  classes.value = selector.value.getSelected()?.map(el => el?.attributes?.name)
  states.value = selector.value.getStates()
  state.value = selector.value.getState()
  targets.value = selector.value.getSelectedTargets()
    .map(target => target.getSelectorsString()).join(', ')
}
</script>

<template>
  <div :style="{padding: '8px',
    backgroundColor:'var(--color-bg-white)'}">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 style="margin: 0">Classes</h5>
      <SelectorStateButton @changeStateEvent="changeStateEvent" :states="states"/>
    </div>
    <Space size="medium" direction="vertical" fill>
      <InputTag size="medium" v-model="classes" :style="{width:'100%', minHeight: '80px'}" allow-clear/>
    </Space>
  </div>

</template>