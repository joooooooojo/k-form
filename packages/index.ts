import Form from "./components/Form/index.vue";
import { App } from "vue";
export function formatPx(value: string | number): string {
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
}

export const KForm = Object.assign(Form, {
  install: (app: App) => {
    app.component(Form.name, Form);
  }
});

export default KForm;
export type {
  KFormItemProps,
  KFormItemType,
  KDynamicFormItemProps,
  InputPropsPayload,
  InputNumberPropsPayload,
  ISelectPropsPayload,
  SwitchPropsPayload,
  ColorPickerPropsPayload,
  CascaderPropsPayload,
  DatePickerPropsPayload,
  RadioPropsPayload,
  SelectOptionType
} from "./types/form-item-props";
export type {
  KFormProps,
  KFormItemSize,
  KLabelPosition,
  KRequiredAsteriskPosition
} from "./types/form-props";
