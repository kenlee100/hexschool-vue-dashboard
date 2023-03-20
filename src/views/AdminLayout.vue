<template>
  <div class="layout-content d-flex flex-column h-100">
    <NavBar></NavBar>
    <section class="data-section flex-grow-1 pb-3">
      <HeaderBar :logout="logout" />
      <div class="container-fluid">
        <PageTitle page-title="test"></PageTitle>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>
<script>
const { VITE__URL } = import.meta.env;
import { RouterView } from "vue-router";
import NavBar from "@/components/admin/NavBar.vue";
import HeaderBar from "@/components/admin/HeaderBar.vue";
import PageTitle from "@/components/admin/AdminPageTitle.vue";
export default {
  components: { RouterView, NavBar, HeaderBar, PageTitle },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        // userToken Token名稱
        /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http
          .post(`${VITE__URL}/api/user/check`)
          .then(() => {})
          .catch((err) => {
            // 驗證失敗轉到登入
            this.$router.push("/");
            // 顯示失敗資訊
            alert(`${err.response.data.message}`);
          });
      } else {
        alert("請先登入");
        this.$router.push("/");
      }
    },
    logout() {
      this.$http
        .post(`${VITE__URL}/logout`)
        .then((res) => {
          alert(res.data.message);
          document.cookie = "userToken=;expires=;";
          this.$router.push("/");
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
        });
    },
  },
  // 原本是mounted，改為created 可避免登入驗證錯誤
  created() {
    this.checkLogin();
  },
};
</script>
