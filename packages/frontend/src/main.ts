import { createApp } from "vue";
import { createVfm } from "vue-final-modal";
import "./style.css";
import "vue-final-modal/style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/router";

const pinia = createPinia();
const vfm = createVfm();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vfm);
app.mount("#app");
