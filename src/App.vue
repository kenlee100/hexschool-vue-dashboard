<template>
  <RouterView />
</template>
<script>
import { RouterView } from "vue-router";

export default {
  // TODO: 使用 Vite 完成路由設定
  // TODO: 前台顯示完整的產品列表，並可進入產品細節頁面
  // TODO: 在 Vite 中完成登入、前台表單驗證功能
  // TODO: 建立 .env 檔案內容
  // TODO: 前台表單及登入頁面及登入驗證功能
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    RouterView,
  },
  mounted() {
    this.isLoading = true;
  },
};
</script>

<style lang="scss"></style>
