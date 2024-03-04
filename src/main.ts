import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import KForm from "../packages";

const app = createApp(App);

app.use(ElementPlus);
app.use(KForm);
app.mount("#app");
