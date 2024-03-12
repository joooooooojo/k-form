## 📦 安装

```bash
npm install @joooooooooojo/kform
# or
yarn add @joooooooooojo/kform
# or
pnpm add @joooooooooojo/kform
```
## 说明
`KForm是一个配置优先的表单组件，它是基于Vue3，ElementPlus的el-form组件进行封装的，所以在使用KForm之前，请详细阅读`[ElementPlus的表单组件文档](https://element-plus.gitee.io/zh-CN/component/form.html)。

### 全局注册（src/main.ts）

```ts
import { createApp } from "vue";
import App from "./App.vue";
import KForm from "@joooooooooojo/kform";

const app = createApp(App);

// 组件依赖于ElementPlus，所以需要先安装ElementPlus
// import ElementPlus from 'element-plus'
// app.use(ElementPlus)

app.use(KForm);
app.mount("#app");
```

### 类型声明（src/components.d.ts）

```ts
import KForm  from '@joooooooooojo/kform'
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    KForm: typeof KForm
  }
}
```
如果您在使用volar，那么可以在tsconfig.json中添加以下配置
```json
{
  "compilerOptions": {
    // ...
    "types": ["@joooooooooojo/kform/volar"]
  }
}
```
如果您在使用webstorm，那么可以在main.ts同层级下的声明文件中添加以下配置
```ts
import KForm  from '@joooooooooojo/kform'
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    KForm:  typeof KForm
  }
}
```
### 使用示例
```text
import {ref} from "vue";
import {InputPropsPayload, ISelectPropsPayload, KFormItemProps} from "@joooooooooojo/kform";

const form = ref({
  username: '',
  password: '',
  gender: 0
})
const options:Array<KFormItemProps> = [
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    payload:{
      placeholder: '请输入用户名',
    } as InputPropsPayload
  },
  {
    type: 'input',
    label: '密码',
    prop: 'password',
    payload:{
      placeholder: '请输入密码',
      type: 'password'
    } as InputPropsPayload
  },
  {
    type: 'select',
    label: '性别',
    prop: 'gender',
    payload:{
      options() {
          return [
          {label: '男', value: 0},
          {label: '女', value: 1}
        ]
      },
      clearable:true,
      multiple:true,
      onChange(value) {
        console.log(value)
      },
    } as ISelectPropsPayload
  },
  {
    type: 'custom',
    slotName: 'avatar',
  }
]


<template>
  <KForm v-model="form" width="600px" :options="options" :label-width="120" label-position="top">
    <template v-slot:avatar>
      <img src="https://avatars.githubusercontent.com/u/20628032?v=4" alt="avatar" />
    </template>
  </KForm>
</template>
```

### 表单类型
| Property | Type | Description |
| --- | --- | --- |
| `width` | `string` | 表单宽度 默认100% |
| `options` | `Array<KFormItemProps>` | 表单项配置 |
| `dynamicOptions` | `KDynamicFormItemProps` | 动态表单配置(优先级高) |
| `modelValue` | `Record<string, any>` | 表单数据模型 |
| `rules` | `FormRules` | 表单校验规则 |
| `labelPosition` | `KLabelPosition` | 表单标签位置 |
| `labelWidth` | `string` or `number` | 标签的长度，例如 '50px',传入number类型默认为px单位。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 |
| `labelSuffix` | `string` | 表单域标签的后缀 |
| `hideRequiredAsterisk` | `boolean` | 是否显示必填字段的标签旁边的红色星号 |
| `requiredAsteriskPosition` | `KRequiredAsteriskPosition` | 星号的位置 |
| `inlineMessage` | `boolean` | 是否以行内形式展示校验信息 |
| `statusIcon` | `boolean` | 是否在输入框中显示校验结果反馈图标 |
| `validateOnRuleChange` | `boolean` | 是否在 rules 属性改变后立即触发一次验证 |
| `size` | `KFormItemSize` | 用于控制该表单内组件的尺寸 |
| `disabled` | `boolean` | 是否禁用该表单内的所有组件 |
| `scrollToError` | `boolean` | 当校验失败时，是否滚动到第一个错误表单项 |
| `scrollIntoViewOptions` | `object` or `boolean` | 当校验有失败结果时，滚动到第一个失败的表单项目 可通过 [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) 配置 |
| `onValidate` | `() => void` | 表单校验触发时调用 |

### 表单项属性
| Property | Type | Description |
| --- | --- | --- |
| `prop` | `string` | 和element原 prop不同只允许填写字符串，同时充当键名和校验的prop |
| `label` | `string` | 文本标签 |
| `width` | `string` \| `number` | 表单项宽度 |
| `labelWidth` | `string` \| `number` | 标签宽度 |
| `required` | `boolean` | 是否必填 |
| `rules` | `Arrayable<FormItemRule>` | 表单项校验规则 如果您不想根据输入事件触发验证器，在相应的输入类型组件上设置validate-event属性为 false |
| `error` | `string` | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息 |
| `showMessage` | `boolean` | 是否展示错误提示 |
| `inlineMessage` | `boolean` | 是否在行内显示校验信息 |
| `size` | `string` | 表单项下组件尺寸 |
| `for` | `string` | 与原生for作用相同 |
| `validateState` | `string` | 表单项的校验状态 |
| `children` | `Array<KFormItemProps<T>>` | 子表单项。一维表单纵向排列，设置children后表单为二维，渲染到此处时将children中的表单项时横向排列 |
| `childrenNum` | `number` | 指定每行表单项数量(如果不传则按照children的长度设置列数) |
| `rowKey` | `string` | 子表单项Key值，设置children时需要设置 |
| `type` | `KFormItemPropsType` | 表单项类型 |
| `tooltip` | `string` | tooltip提示，不传则不提示 |
| `show` | `boolean` \| `((formValue: T) => boolean)` | 是否展示 默认展示，传入函数时formValue为表单数据 |
| `payload` | `any` | 载荷，不同表单项类型有不同载荷，使用时手动指定特定类型 |
| `slotName` | `string` | 插槽 |
