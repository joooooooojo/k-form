<script setup lang="ts">
import { ref } from "vue";
import { ISelectPropsPayload, KDynamicFormItemProps } from "../packages";

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
const clientType = (formValue?: T): KDynamicFormItemProps => {
  return {
    rowKey: "row-1",
    parent: root,
    label: "客户类型",
    prop: "type",
    type: "select",
    payload: {
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

const code = (): Array<KDynamicFormItemProps> => {
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
    }
  ];
};
</script>

<template>
  <KForm v-model="form" width="600px" :dynamicOptions="root">
    <template v-slot:aaa>
      <el-input />
    </template>
  </KForm>
</template>

<style scoped></style>
