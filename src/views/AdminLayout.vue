<template>
  <div class="layout-content d-flex flex-column h-100">
    <NavBar></NavBar>
    <section class="data-section flex-grow-1 pb-3">
      <HeaderBar :logout="logout" />
      <div class="container-fluid">
        <PageTitle page-title="test"></PageTitle>
        <RouterView />
      </div>
      <VueLoading :active="isLoading"></VueLoading>
    </section>
  </div>
</template>
<script>
const { VITE__URL } = import.meta.env;
import { RouterView } from "vue-router";
import NavBar from "@/components/admin/NavBar.vue";
import HeaderBar from "@/components/admin/HeaderBar.vue";
import PageTitle from "@/components/admin/AdminPageTitle.vue";
import { mapState } from "pinia";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common.js";
export default {
  components: { RouterView, NavBar, HeaderBar, PageTitle },
  methods: {
    checkLogin() {
      useLoadingState().isLoading = true;
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
            this.$router.push("/login");
            useLoadingState().isLoading = false;
            toast.fire({
              icon: "error",
              title: `${err.response.data.message}`,
            });
          });
      } else {
        useLoadingState().isLoading = false;
        toast
          .fire({
            icon: "error",
            title: `請先登入`,
          })
          .then(() => {
            this.$router.push("/login");
          });
      }
    },
    logout() {
      useLoadingState().isLoading = true;
      this.$http
        .post(`${VITE__URL}/logout`)
        .then((res) => {
          useLoadingState().isLoading = false;
          document.cookie = "userToken=;expires=;";
          toast
            .fire({
              icon: "success",
              title: `${res.data.message}`,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch((err) => {
          useLoadingState().isLoading = false;
          toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    },
  },
  computed: {
    ...mapState(useLoadingState, ["isLoading"]),
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style lang="scss">
.swal2-container {
  top: 84px !important;
  z-index: 2001;
}
.swal2-actions {
  width: 100%;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
}
.swal2-confirm,
.swal2-cancel {
  flex: 1;
}

.vl-overlay.vl-full-page {
  z-index: 2000;
}
</style>
