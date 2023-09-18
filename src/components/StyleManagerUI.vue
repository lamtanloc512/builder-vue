<script setup lang="ts">
import { Collapse, CollapseItem } from '@arco-design/web-vue';
import { Editor, Sector } from 'grapesjs';
import { Ref, onMounted, onUnmounted, ref } from 'vue';
//@ts-ignore
import { upperFirst } from 'lodash';
import { PropertyField } from './index.ts'

const props = defineProps<{ editor: Editor }>()
const styleManager = props.editor.StyleManager
const sectors: Ref<Sector[] | any> = ref()
const divEl = ref()

onMounted(() => {
  props.editor.on('style:custom', handleStyleManager)
})
onUnmounted(() => {
  props.editor.off('style:custom', handleStyleManager);
})
//methods
const handleStyleManager = (props: any) => {
  let { container } = props
  if (!container) {
    container = divEl.value
    sectors.value = styleManager.getSectors({ visible: true })
  }
}

</script>
<template>
  <div id="styleManager" :style="{
    padding: '8px',
    backgroundColor: 'var(--color-bg-white)'
  }" :ref="(el) => divEl = el">
    <Collapse :bordered="false">
      <CollapseItem v-for="sector in sectors" :key="sector.getId()" :header="upperFirst(sector.getName())">
        <div v-for="sectorProperty in sector.getProperties()" :key="sectorProperty.getId()">
          <PropertyField :sectorProperty="sectorProperty" />
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</template>
<style scoped></style>