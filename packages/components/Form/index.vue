<script setup lang="ts">
import FormItem from "../FormItem/index.vue";
import { FormInstance } from "element-plus";
import { onBeforeUnmount, ref } from "vue";
import { formatPx } from "../../index";
import { KFormProps } from "../../types/form-props";
defineOptions({
  name: "KForm"
});

const form = ref<FormInstance>();

const props = withDefaults(defineProps<KFormProps>(), {
  width: "auto"
});

const modelValue = defineModel<object>();

const validate = () => {
  return form.value.validate();
};

const clearValidate = () => {
  return form.value.clearValidate();
};

defineExpose({ validate, clearValidate });
</script>

<template>
  <el-form
    ref="form"
    class="k-form"
    v-bind="props"
    :model="modelValue"
    :style="{ width: formatPx(width) }"
    @validate="onValidate"
  >
    <template v-for="item in options" :key="item.prop">
      <FormItem v-bind="item" v-model="modelValue" v-if="!item.children">
        <template v-if="item.type === 'custom'" v-slot:[item.slotName]>
          <slot :name="item.slotName"> </slot>
        </template>
      </FormItem>
      <div
        class="k-form-row"
        :key="item.rowKey"
        :style="{
          'grid-template-columns': `repeat(${
            item.childrenNum ?? item.children.length
          },1fr)`
        }"
        v-else
      >
        <FormItem
          v-model="modelValue"
          v-bind="item"
          v-for="child in item.children"
          :key="child.prop"
        >
          <template v-if="item.type === 'custom'" v-slot:[item.slotName]>
            <slot :name="item.slotName"> </slot>
          </template>
        </FormItem>
      </div>
    </template>
  </el-form>
</template>

<style>
.k-form-row {
  display: grid;
  column-gap: 16px;
}
</style>
