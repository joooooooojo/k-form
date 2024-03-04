## 📦 安装

```bash
npm install @joooooooooojo/kform
# or
yarn add @joooooooooojo/form
# or
pnpm add @joooooooooojo/kform
```


### 全局注册（main.ts）

```ts
import { createApp } from "vue";
import App from "./App.vue";
import KForm from "@joooooooooojo/kform";

const app = createApp(App);

app.use(KForm);
app.mount("#app");
```