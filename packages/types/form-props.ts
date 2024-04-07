import { FormRules } from "element-plus";
import { KFormItemProps } from "./form-item-props";

type KLabelPosition = "top" | "right" | "left";
type KRequiredAsteriskPosition = "right" | "left";
type KFormItemSize = "default" | "small" | "large";
type Arrayable<T> = T | T[];

type KFormProps = {
  /** 表单宽度 默认100% */
  width?: string;
  /** 表单项配置 */
  options?: Array<KFormItemProps> | (() => Arrayable<KFormItemProps>);
  /** 表单数据模型 */
  modelValue: Record<string, any>;
  /** 表单校验规则 */
  rules?: FormRules;
  /** 表单标签位置 */
  labelPosition?: KLabelPosition;
  /** 标签的长度，例如 '50px',传入number类型默认为px单位。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 */
  labelWidth?: string | number;
  /** 表单域标签的后缀 */
  labelSuffix?: string;
  /** 是否显示必填字段的标签旁边的红色星号 */
  hideRequiredAsterisk?: boolean;
  /** 星号的位置 */
  requiredAsteriskPosition?: KRequiredAsteriskPosition;
  /** 是否以行内形式展示校验信息 */
  inlineMessage?: boolean;
  /** 是否在输入框中显示校验结果反馈图标 */
  statusIcon?: boolean;
  /** 是否在 rules 属性改变后立即触发一次验证 */
  validateOnRuleChange?: boolean;
  /** 用于控制该表单内组件的尺寸 */
  size?: KFormItemSize;
  /** 是否禁用该表单内的所有组件 */
  disabled?: boolean;
  /** 当校验失败时，是否滚动到第一个错误表单项*/
  scrollToError?: boolean;
  /** 当校验有失败结果时，滚动到第一个失败的表单项目 可通过 [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) 配置*/
  scrollIntoViewOptions?: object | boolean;
  /** 表单校验触发时调用*/
  onValidate?: () => void;
};

export type {
  Arrayable,
  KFormProps,
  KFormItemSize,
  KLabelPosition,
  KRequiredAsteriskPosition
};
