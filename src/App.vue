<script setup lang="ts">
import { ref } from "vue";
import {
  InputPropsPayload,
  ISelectPropsPayload,
  KFormItemProps
} from "../packages";
import { KForm } from "../packages";
const form = ref({
  name: "",
  user: {
    name: ""
  }
});

const options = (): KFormItemProps[] => {
  return [
    {
      label: "输入框1",
      prop: "user.name",
      payload: {
        prepend: "prepend"
      } as InputPropsPayload
    }
  ];
};
</script>

<template>
  <KForm v-model="form" :options="options()" width="600px">
    <template v-slot:prepend> 123 </template>
  </KForm>
  {{ form }}
</template>

<style scoped></style>
