<script setup lang="ts">
import { computed } from "vue";
import { KFormItemProps } from "../../types/form-item-props";

const props = withDefaults(defineProps<KFormItemProps>(), {
  payload: {},
  show: true,
  showMessage: true
});
const model = defineModel();

const isShow = (show: KFormItemProps["show"]): boolean => {
  if (show === undefined) {
    return true;
  }
  if (typeof show === "boolean") {
    return show;
  } else {
    return show(model.value);
  }
};

const _disabled = () => {
  if (!props.payload) {
    return undefined;
  }
  const disabled = props.payload.disabled;
  return typeof disabled === "function"
    ? disabled(model.value, props.prop)
    : disabled;
};

const options = computed(() => {
  if (!props.payload || !props.payload.options) return [];
  if (typeof props.payload.options === "function") {
    return props.payload.options(model.value, props.prop);
  } else {
    return props.payload.options;
  }
});

const getRules = () => {
  const rules = [];
  if (props.required) {
    rules.push({
      required: true,
      message: props.label + "不能为空",
      trigger: ["change", "blur"]
    });
  }
  if (props.rules) {
    return props.rules;
  }
  return rules;
};
</script>

<template>
  <el-tooltip v-if="isShow(show)" :content="tooltip" :disabled="!tooltip">
    <el-form-item
      class="kk-form-item"
      :style="{ width: width }"
      :label-width="labelWidth"
      :label="label"
      :prop="prop"
      :required="required"
      :rules="getRules()"
    >
      <el-date-picker
        v-if="type === 'date-picker'"
        v-bind="payload"
        v-model="model[prop]"
        :disabled="_disabled()"
        @change="payload.onChange"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
        @clear="payload.onClear"
        @visible-change="payload.onVisibleChange"
        @calendar-change="payload.onCalendarChange"
        @panel-change="payload.onPanelChange"
      />
      <el-switch
        v-model="model[prop]"
        v-else-if="type === 'switch'"
        :disabled="_disabled()"
        v-bind="payload"
        @change="payload.onChange"
      />
      <el-color-picker
        v-model="model[prop]"
        v-else-if="type === 'color'"
        v-bind="payload"
        :disabled="_disabled()"
        @change="payload.onChange"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
        @activeChange="payload.onActiveChange"
      />
      <el-radio-group
        v-model="model[prop]"
        v-else-if="type === 'radio'"
        :disabled="_disabled()"
        v-bind="payload"
        @change="payload.onChange"
      >
        <el-radio v-for="(item, index) in options" v-bind="item" :key="index"
          >{{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-cascader
        v-model="model[prop]"
        v-else-if="type === 'cascader'"
        v-bind="payload"
        :disabled="_disabled()"
        @change="payload.onChange"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
        @clear="payload.onClear"
        @remove-tag="payload.onRemoveTag"
        @visible-change="payload.onVisibleChange"
        @expand-change="payload.onExpandChange"
      />
      <el-select
        v-model="model[prop]"
        v-else-if="type === 'select'"
        v-bind="payload"
        :disabled="_disabled()"
        @change="payload.onChange"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
        @clear="payload.onClear"
        @remove-tag="payload.onRemoveTag"
        @visible-change="payload.onVisibleChange"
      >
        <el-option
          v-for="_option in options"
          :prop="_option.value"
          :label="_option.label"
          :value="_option.value"
          :disabled="_option.disabled"
        ></el-option>
      </el-select>
      <el-input-number
        v-bind="payload"
        v-model="model[prop]"
        v-else-if="type === 'number'"
        @change="payload.onChange"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
      />
      <slot v-else-if="type === 'custom'" :name="slotName" />
      <el-input
        v-else
        v-bind="payload"
        v-model="model[prop]"
        :disabled="_disabled()"
        @change="payload.onChange"
        @input="payload.onInput"
        @blur="payload.onBlur"
        @focus="payload.onFocus"
        @clear="payload.onClear"
      >
      </el-input>
    </el-form-item>
  </el-tooltip>
</template>

<style>
.kk-form-item .el-input {
  width: 100%;
}

.kk-form-item .el-select {
  width: 100%;
}

.kk-form-item .el-cascader {
  width: 100%;
}

.kk-form-item .el-input-number {
  width: 100%;
}
</style>
