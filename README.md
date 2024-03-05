## 📦 安装

```bash
npm install @joooooooooojo/kform
# or
yarn add @joooooooooojo/kform
# or
pnpm add @joooooooooojo/kform
```


### 全局注册（src/main.ts）

```ts
import { createApp } from "vue";
import App from "./App.vue";
import KForm from "@joooooooooojo/kform";

const app = createApp(App);

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