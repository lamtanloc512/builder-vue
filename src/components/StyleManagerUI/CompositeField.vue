<script setup lang="ts">
  import { Card } from "@arco-design/web-vue";
  import { ref, watchEffect } from "vue";
  import { PropertyField } from "../index.ts";
  import { PropertyComposite, Property } from "grapesjs";

  const props = defineProps<{
    sector: PropertyComposite;
  }>();

  const sectorProperties = ref<Property[]>(props.sector.getProperties());

  // const sectorProperties = ref<Property>(props.sector.getProperties());

  // console.log(
  // 	props.sectorProperty.getProperties().forEach((el) => {
  // 		console.log(el);
  // 	}),
  // );

  //  const propValue =

  // type EvType = {
  // 	value:
  // 		| string
  // 		| number
  // 		| boolean
  // 		| Record<string, any>
  // 		| (string | number | boolean | Record<string, any>)[];
  // };
  // const handleSliderChange = (ev: EvType['value']): void => {
  // 	props.sectorProperty.upValue(`${ev}`);
  // };
  // const handleClear = () => {
  // 	sliderValue.value = toNumber(props.sectorProperty.getValue());
  // };

  // defineExpose<{
  // 	handleClear: () => void;
  // }>({
  // 	handleClear,
  // });

  watchEffect(() => {
    sectorProperties.value.forEach((el) => {
      console.log(el);
    });
  });
</script>

<template>
  <Card :size="'small'">
    <!-- <Grid :colGap="8" :rowGap="8">
      <GridItem v-for="sectorProperty in sectorProperties">
        <PropertyField :isComposite="true" :sectorProperty="sectorProperty" />
      </GridItem>
    </Grid> -->
    <!-- <Space
      class="w-100"
      :direction="'horizontal'"
      :wrap="false"
      :size="'small'">
      <PropertyField
        v-for="sectorProperty in sectorProperties"
        :isComposite="true"
        :sectorProperty="sectorProperty" />
    </Space> -->
    <div class="grid-container">
      <PropertyField
        class="grid-item"
        v-for="sectorProperty in sectorProperties"
        :isComposite="true"
        :sectorProperty="sectorProperty" />
    </div>
  </Card>
</template>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-columns: 1fr;
    gap: 8px;
    margin: 0 auto;
  }
  .grid-item {
    text-align: center;
  }
  .grid-item:last-child {
    grid-column: span 2;
  }
</style>
