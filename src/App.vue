<script setup lang="ts">
import { ref } from "vue";
import { KFormItemProps } from "../packages/types/form-item-props";

const form = ref({
  username: "",
  password: 0
});

const options: Array<KFormItemProps> = [
  {
    label: "账号",
    prop: "username",
    payload: {
      disabled: () => {
        return true;
      }
    }
  },
  {
    type: "number-input",
    label: "密码",
    prop: "password",
    payload: {
      disabled: true
    }
  },
  {
    label: "日期",
    prop: "date",
    type: "select"
  }
];
</script>

<template>
  <KForm v-model="form" width="600px" :options="options" />
</template>

<style scoped></style>
