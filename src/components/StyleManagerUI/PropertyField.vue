<script setup lang="ts">
import { Col, Row, Space } from "@arco-design/web-vue";
import { IconCloseCircle } from "@arco-design/web-vue/es/icon/index.js";
import { Property, PropertySelect } from "grapesjs";
import { computed } from "vue";
//@ts-ignore
import SelectField from "./SelectField.vue";

type SectorPropertyType = PropertySelect & Property
const props = defineProps<{
  sectorProperty: SectorPropertyType
}>()


const propType = computed(() => props.sectorProperty.getType())


</script>
<template>
  <Space :direction="'vertical'" :size="'large'" fill>
    <Row :justify="'space-between'" :align="'center'">
      <Col>
      <div>{{ sectorProperty.getLabel() }}</div>
      <IconCloseCircle v-if="sectorProperty.canClear()" @click="sectorProperty.clear()"
        :style="{ fontSize: '20px', color: 'rgb(var(--red-6))' }" />
      </Col>
      <Col>
      <SelectField v-if="propType == 'select'" :sectorProperty="props.sectorProperty" />
      </Col>
    </Row>
  </Space>
</template>
<style scoped></style>
