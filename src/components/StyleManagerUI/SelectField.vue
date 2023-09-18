<script setup lang="ts">
import { Row, Select, Option, Col } from "@arco-design/web-vue";
import { PropertySelect } from "grapesjs";
import { computed, ref } from "vue";
//@ts-ignore
import { upperFirst } from 'lodash'

const props = defineProps<{
  sectorProperty: PropertySelect
}>()

const selectModel = ref<string>(props.sectorProperty.getDefaultValue())

const displayOptions = computed(() => props.sectorProperty.getOptions().map((el) => {
  return {
    id: props.sectorProperty.getOptionId(el),
    value: props.sectorProperty.getOptionId(el),
    text: upperFirst(props.sectorProperty.getOptionLabel(el))
  }
}))
</script>
<template>
  <Row class="w-100 my-2">
    <Col>
    <Select :size="'small'" class="w-100" v-model="selectModel" :allowClear="props.sectorProperty.canClear()">
      <Option v-for="option in displayOptions" :key="option.id" :value="option.value">
        <span>
          {{ option.text }}
        </span>
      </Option>
    </Select>
    </Col>
  </Row>
</template>

<style scoped></style>