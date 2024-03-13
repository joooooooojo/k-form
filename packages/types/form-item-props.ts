import {
  CascaderNode,
  CascaderProps,
  CascaderValue,
  ColorPickerProps,
  DatePickerProps,
  FormItemRule,
  InputNumberProps,
  InputProps,
  ISelectProps,
  RadioProps,
  SwitchProps
} from "element-plus";
import { Arrayable } from "element-plus/es/utils";

type SelectOptionType = {
  label: string;
  value: any;
  disabled?: boolean;
};

/** 表单项类型 **/
type KFormItemPropsType =
  | "custom" // 自定义插槽，必须传入slotName
  | "switch"
  | "color"
  | "select"
  | "cascader"
  | "date-picker"
  | "input"
  | "radio"
  | "number-input"; //数字输入框

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
type InputPropsPayload<T = any> = Merge<
  Partial<InputProps>,
  {
    disabled?: ((formValue: T, prop: string) => boolean) | boolean;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: string | number) => void;
    onInput?: (value: string | number) => void;
    onClear?: () => void;
  }
>;
type InputNumberPropsPayload<T = any> = Merge<
  Partial<InputNumberProps>,
  {
    disabled?: ((formValue: T, prop: string) => boolean) | boolean;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: string | number) => void;
  }
>;
type ISelectPropsPayload<T = any> = Merge<
  Partial<ISelectProps>,
  {
    disabled?: ((formValue: T, prop: string) => boolean) | boolean;
    options?:
      | ((formValue: T) => Array<SelectOptionType>)
      | Array<SelectOptionType>;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: any) => void;
    onClear?: () => void;
    onVisibleChange?: (visible: boolean) => void;
    onRemoveTag?: (tagValue: any) => void;
  }
>;
type SwitchPropsPayload<T = any> = Merge<
  Partial<SwitchProps>,
  {
    onChange: (val: boolean | string | number) => void;
  }
>;
type ColorPickerPropsPayload<T = any> = Merge<
  Partial<ColorPickerProps>,
  {
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: string) => void;
    onActiveChange?: (value: string) => void;
  }
>;
type CascaderPropsPayload<T = any> = Merge<
  Partial<CascaderProps>,
  {
    disabled?: ((formValue: T, prop: string) => boolean) | boolean;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: CascaderValue) => void;
    onClear?: () => void;
    onVisibleChange?: (visible: boolean) => void;
    onRemoveTag?: (value: CascaderNode["valueByOption"]) => void;
    onExpandChange?: (value: CascaderValue) => void;
  }
>;
type DatePickerPropsPayload<T = any> = Merge<
  Partial<DatePickerProps>,
  {
    rangeKeys?: [number | string, number | string];
    disabled?: ((formValue: T, prop: string) => boolean) | boolean;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onChange?: (value: any) => void;
    onClear?: () => void;
    onVisibleChange?: (visibility: boolean) => void;
    onCalendarChange?: (val: [Date, null | Date]) => void;
    onPanelChange?: (
      date: Date | [Date, Date],
      mode: "month" | "year",
      view?: string
    ) => void;
  }
>;
type RadioPropsPayload<T = any> = Merge<
  Partial<RadioProps>,
  {
    onChange?: (value: string | number | boolean) => void;
  }
>;

type KFormItemProps<T = any> = {
  /** 和element原 prop不同只允许填写字符串，同时充当键名和校验的prop **/
  prop?: string;
  /** 文本标签 **/
  label?: string;
  /** 表单项宽度 **/
  width?: string | number;
  /** 标签宽度 **/
  labelWidth?: string | number;
  /** 是否必填 **/
  required?: boolean;
  /** 表单项校验规则 如果您不想根据输入事件触发验证器，在相应的输入类型组件上设置validate-event属性为 false **/
  rules?: Arrayable<FormItemRule>;
  /** 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。**/
  error?: string;
  /** 是否展示错误提示 **/
  showMessage?: boolean;
  /** 是否在行内显示校验信息 **/
  inlineMessage?: boolean;
  /** 表单项下组件尺寸 **/
  size?: string;
  /** 与原生for作用相同 **/
  for?: string;
  /** 表单项的校验状态 **/
  validateState?: string;
  /** 子表单项。一维表单纵向排列，设置children后表单为二维，渲染到此处时将children中的表单项时横向排列 **/
  children?: Array<KFormItemProps<T>>;
  /** 指定每行表单项数量(如果不传则按照children的长度设置列数) **/
  childrenNum?: number;
  /** 子表单项Key值，设置children时需要设置 **/
  rowKey?: string;
  /** 表单项类型 **/
  type?: KFormItemPropsType;
  /** tooltip提示，不传则不提示**/
  tooltip?: string;
  /** 是否展示 默认展示，传入函数时formValue为表单数据 **/
  show?: boolean | ((formValue: T) => boolean);
  /** 载荷，不同表单项类型有不同载荷，使用时手动指定特定类型 **/
  payload?: any;
  /** 插槽 **/
  slotName?: string;
};

export type {
  KFormItemProps,
  KFormItemPropsType,
  InputPropsPayload,
  InputNumberPropsPayload,
  ISelectPropsPayload,
  SwitchPropsPayload,
  ColorPickerPropsPayload,
  CascaderPropsPayload,
  DatePickerPropsPayload,
  RadioPropsPayload,
  SelectOptionType
};
