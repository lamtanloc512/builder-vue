<script setup lang="ts">
  import { Row, Select, Option, Col } from "@arco-design/web-vue";
  import { PropertySelect } from "grapesjs";
  import { computed, ref } from "vue";
  //@ts-ignore
  import { upperFirst } from "lodash";

  const props = defineProps<{
    sectorProperty: PropertySelect;
  }>();

  const selectValue = ref<string>(props.sectorProperty.getValue());

  const displayOptions = computed(() =>
    props.sectorProperty.getOptions().map((el) => {
      return {
        id: props.sectorProperty.getOptionId(el),
        value: props.sectorProperty.getOptionId(el),
        text: upperFirst(props.sectorProperty.getOptionLabel(el)),
      };
    }),
  );

  type EvType = {
    value:
      | string
      | number
      | boolean
      | Record<string, any>
      | (string | number | boolean | Record<string, any>)[];
  };
  const handleChange = (ev: EvType["value"]): any => {
    props.sectorProperty.upValue(`${ev}`);
  };
  const clear = () => {
    selectValue.value = props.sectorProperty.getValue();
  };
</script>
<template>
  <Row class="w-100">
    <Col>
      <Select
        :size="'small'"
        class="w-100"
        v-model="selectValue"
        :allowClear="sectorProperty.canClear()"
        @clear="clear"
        @change="handleChange">
        <Option
          v-for="option in displayOptions"
          :key="option.id"
          :value="option.value">
          <span>
            {{ option.text }}
          </span>
        </Option>
      </Select>
    </Col>
  </Row>
</template>

<style scoped></style>
