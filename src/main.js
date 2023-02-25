import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import Loading from "vue-loading-overlay";
import CKEditor from "@ckeditor/ckeditor5-vue";

import { date, currency } from "@/utils/filters.js";

import "vue-loading-overlay/dist/css/index.css";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "@/assets/styles/main.scss";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale("zh_TW");

const app = createApp(App);

// 全域註冊
app.config.globalProperties.$filters = {
  date,
  currency,
};
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.component("VueLoading", Loading); // 全域元件

app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
