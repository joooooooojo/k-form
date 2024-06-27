<script setup lang="ts">
import FormItem from "../FormItem/index.vue";
import { FormInstance, FormItemProp, FormValidateCallback } from "element-plus";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { formatPx, KFormItemProps } from "../../index";
import { KFormProps } from "../../types/form-props";
import { isEmpty } from "lodash";

type Arrayable<T> = T | T[];
defineOptions({
  name: "KForm"
});

const form = ref<FormInstance>();

const props = withDefaults(defineProps<KFormProps>(), {
  width: "auto"
});

const modelValue = defineModel<object>();

const _dynamicOptions = ref<Array<KFormItemProps>>([]);
function getDynamicList(dynamicItem: Arrayable<KFormItemProps>) {
  if (Array.isArray(dynamicItem)) {
    _dynamicOptions.value.push(...dynamicItem);
    dynamicItem.forEach(item => {
      if (item.next) {
        getDynamicList(item.next(modelValue.value, item.prop));
      }
    });
    return;
  }
  _dynamicOptions.value.push(dynamicItem);
  if (dynamicItem.next) {
    getDynamicList(dynamicItem.next(modelValue.value, dynamicItem.prop));
  }
}
const _options = computed(() => {
  if (typeof props.options !== "function") return props.options;
  else return _dynamicOptions.value;
});

const watcher = watch(
  () => modelValue.value,
  () => {
    if (typeof props.options !== "function") return;
    _dynamicOptions.value = [];
    getDynamicList(props.options());
    const ls = [];
    _dynamicOptions.value.map(item => {
      if (item.rowKey && !item.children) {
        const row = ls.find(lsItem => lsItem.rowKey === item.rowKey);
        if (!row) {
          ls.push({
            childrenNum: item.childrenNum,
            rowKey: item.rowKey,
            children: [item]
          });
        } else {
          row.children.push(item);
        }
      } else {
        ls.push(item);
      }
    });
    _dynamicOptions.value = ls;
  },
  {
    deep: true,
    immediate: true
  }
);

onBeforeUnmount(() => {
  watcher();
});

const validate = () => {
  return form.value.validate;
};
/** 清理某个字段的表单验证信息。**/
const clearValidate = (props?: Arrayable<FormItemProp> | undefined) => {
  return form.value.clearValidate(props);
};

/** 验证具体的某个字段。**/
const validateField = (
  /** 为每个表单项的prop值 **/
  props?: Arrayable<string> | undefined,
  callback?: FormValidateCallback | undefined
) => {
  return form.value.validateField(props, callback);
};
/** 重置该表单项，将其值重置为初始值，并移除校验结果**/
const resetFields = (props?: Arrayable<string> | undefined) => {
  form.value.resetFields(props);
};
/** 滚动到指定的字段**/
const scrollToField = (prop: string) => {
  form.value.scrollToField(prop);
};
defineExpose({
  validate,
  clearValidate,
  validateField,
  resetFields,
  scrollToField
});
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
    <template v-for="item in _options" :key="item.prop">
      {{
        [
          item.slotName,
          item.payload?.append,
          item.payload?.prefix,
          item.payload?.prepend,
          item.payload?.suffix
        ].filter(_item => !isEmpty(_item))
      }}
      <FormItem v-bind="item" v-model="modelValue" v-if="!item.children">
        <template
          v-for="slotName in [
            item.slotName,
            item.payload?.append,
            item.payload?.prefix,
            item.payload?.prepend,
            item.payload?.suffix
          ].filter(_item => !isEmpty(_item))"
          v-slot:[slotName]
        >
          <slot :name="slotName"></slot>
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
          v-bind="child"
          v-for="child in item.children"
          :key="child.prop"
        >
          <template
            v-for="slotName in [
              child.slotName,
              child.payload?.append,
              child.payload?.prefix,
              child.payload?.prepend,
              child.payload?.suffix
            ].filter(_item => !isEmpty(_item))"
            v-slot:[slotName]
          >
            <slot :name="slotName"></slot>
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
