<script setup lang="ts">
import { ref } from "vue";
import { ISelectPropsPayload } from "../packages";

const form = ref({
  name: "",
  type: 0
});

const root = (): KDynamicFormItemProps => {
  return {
    rowKey: "row-1",
    parent: null,
    label: "客户名称",
    prop: "name",
    next: clientType
  };
};
const clientType = (formValue?: T) => {
  return {
    rowKey: "row-1",
    parent: root,
    label: "客户类型",
    prop: "type",
    type: "select",
    payload: {
      clearable: true,
      options: [
        {
          label: "企业",
          value: 0
        },
        {
          label: "个人",
          value: 1
        }
      ]
    } as ISelectPropsPayload,
    next: formValue.type === 0 ? code : null
  };
};

const code = (): Array => {
  return [
    {
      rowKey: "row-2",
      children: [
        {
          label: "企业信用代码",
          prop: "code"
        },
        {
          label: "企业信用代码",
          prop: "code1",
          type: "custom",
          slotName: "aaa"
        }
      ]
    },
    {
      rowKey: "row-3",
      label: "证件照片",
      type: "custom",
      slotName: "card-image"
    }
  ];
};
</script>

<template>
  <KForm v-model="form" width="600px" :dynamicOptions="root">
    <template v-slot:aaa>
      <el-input />
    </template>
    <template v-slot:card-image>
      <div>
        <label for="card__positive">
          <input id="upload-card__front" />
        </label>
        <label id="upload-card__back">
          <input id="card__back" />
        </label>
      </div>
    </template>
  </KForm>
</template>

<style scoped></style>
