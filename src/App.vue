<script setup lang="ts">
import { ref } from "vue";
import { DatePickerPropsPayload, KFormItemProps } from "../packages";

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
    type: "date-picker",
    payload: {
      type: "daterange",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期"
    } as DatePickerPropsPayload
  },
  {
    type: "custom",
    slotName: "avatar"
  }
];
</script>

<template>
  <KForm v-model="form" width="600px" :options="options">
    <template v-slot:avatar>
      <img
        src="https://avatars.githubusercontent.com/u/20628032?v=4"
        alt="avatar"
      />
    </template>
  </KForm>
</template>

<style scoped></style>
