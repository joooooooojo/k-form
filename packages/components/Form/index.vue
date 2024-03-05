<script setup lang="ts">
import FormItem from "../FormItem/index.vue";
import { FormInstance } from "element-plus";
import { onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
import { formatPx } from "../../index";
import { KFormProps } from "../../types/form-props";
import { KDynamicFormItemProps } from "../../types/form-item-props";
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

const dynamic_options = ref<Array<KDynamicFormItemProps>>([]);

function getDynamicList(dynamicItem: KDynamicFormItemProps) {
  dynamic_options.value.push(dynamicItem);
  if (dynamicItem.next) {
    getDynamicList(dynamicItem.next(modelValue.value, dynamicItem.prop));
  }
}

const initDynamic = () => {
  if (!props.dynamicOptions) return;
  dynamic_options.value = [];
  getDynamicList(props.dynamicOptions);
  const ls: Array<KDynamicFormItemProps> = [];
  dynamic_options.value.map(item => {
    if (item.rowKey) {
      const row = ls.find(lsItem => lsItem.prop === item.rowKey);
      if (!row) {
        ls.push({
          prop: item.rowKey,
          children: [item]
        });
      } else {
        row.children.push(item);
      }
    } else {
      ls.push(item);
    }
  });
  dynamic_options.value = ls;
};
const slots = useSlots();
onMounted(() => {
  initDynamic();
});

const watcher = watch(
  () => modelValue.value,
  () => {
    initDynamic();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  watcher();
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
.k-form {
}

.k-form-row {
  display: grid;
  column-gap: 16px;
}
</style>
