import {
  CascaderNode,
  CascaderOption,
  CascaderProps,
  CascaderValue,
  ColorPickerProps,
  DatePickerProps,
  FormItemRule,
  InputNumberProps,
  InputProps,
  ISelectProps,
  SwitchProps
} from "element-plus";
type Arrayable<T> = T | T[];

type SelectOptionType = {
  label: string;
  value: any;
  disabled?: boolean;
};

/** 表单项类型 **/
type KFormItemType =
  | "custom" // 自定义插槽，必须传入slotName
  | "switch"
  | "color"
  | "select"
  | "cascader"
  | "date-picker"
  | "input"
  | "radio"
  | "number"; //数字输入框

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
      | ((formValue: T, prop: string) => Array<SelectOptionType>)
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
type CascaderPropsPayload<T = any> = {
  modelValue: string | number | string[] | number[] | any;
  options:
    | ((formValue: T, prop: string) => Array<CascaderOption>)
    | Array<CascaderOption>;
  props: CascaderProps;
  size: "large" | "default" | "small";
  placeholder: string;
  disabled?: ((formValue: T, prop: string) => boolean) | boolean;
  clearable: boolean;
  /**输入框中是否显示选中值的完整路径**/
  showAllLevels: boolean;
  /** 多选模式下是否折叠Tag**/
  collapseTags: boolean;
  /** 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true**/
  collapseTagsTooltip: boolean;
  /** 用于分隔选项的字符**/
  separator: string;
  /** 该选项是否可以被搜索**/
  filterable: boolean;
  /** 自定义搜索逻辑，第一个参数是node，第二个参数是keyword，返回的布尔值表示是否保留该选项**/
  filterMethod: (node: CascaderNode, keyword: string) => boolean;
  /** 搜索关键词正在输入时的去抖延迟，单位为毫秒**/
  debounce: number;
  /** 过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 false 或者是一个被拒绝的 Promise，那么接下来的过滤逻辑便不会执行。**/
  beforeFilter: (value: string) => boolean;
  /** 弹出内容的自定义类名**/
  popperClass: string;
  /** 弹层是否使用 teleport**/
  teleported: boolean;
  /**是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false**/
  popperAppendToBody: boolean;
  /** 标签类型**/
  tagType: "success" | "info" | "warning" | "danger";
  /**输入时是否触发表单的校验**/
  validateEvent: boolean;
  /**需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。**/
  maxCollapseTags: number;
  /**组件的空值配置 参考[config-provider](https://element-plus.org/zh-CN/component/config-provider.html#empty-values-configurations) **/
  emptyValues: Array;
  /**清空选项的值 参考 [config-provider](https://element-plus.org/zh-CN/component/config-provider.html#empty-values-configurations) **/
  valueOnClear: string | number | boolean | Function;
  onBlur?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onChange?: (value: CascaderValue) => void;
  onClear?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  onRemoveTag?: (value: CascaderNode["valueByOption"]) => void;
  onExpandChange?: (value: CascaderValue) => void;
};
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
type RadioPropsPayload<T = any> = {
  /** 单选框按钮或边框按钮的大小**/
  size: "default" | "large" | "small";
  disabled?: ((formValue: T, prop: string) => boolean) | boolean;
  /** 按钮形式的 Radio 激活时的文本颜色**/
  textColor: string;
  /** 按钮形式的 Radio 激活时的填充色和边框色**/
  fill: string;
  /** 输入时是否出发表单验证**/
  validateEvent: boolean;
  name: string;
  id: string;
  ariaLabel: string;
  type: "default" | "button";
  options: Array<RadioOption> | ((formValue: T, prop: string) => RadioOption[]);
  onChange?: (value: string | number | boolean) => void;
};

type RadioOption = {
  label: string | number;
  value: string | number;
  disabled: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  name: string;
};

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
  type?: KFormItemType;
  /** tooltip提示，不传则不提示**/
  tooltip?: string;
  /** 是否展示 默认展示，传入函数时formValue为表单数据 **/
  show?: boolean | ((formValue: T) => boolean);
  /** 载荷，不同表单项类型有不同载荷，使用时手动指定特定类型 **/
  payload?: any;
  /** 插槽 **/
  slotName?: string;
  /** 动态表单项 -- 下一项**/
  next?:
    | ((formValue?: any, currentKey?: string) => Arrayable<KFormItemProps>)
    | null;
};

export type {
  KFormItemProps,
  KFormItemType,
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
