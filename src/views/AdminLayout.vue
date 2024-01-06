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
import { RouterView } from "vue-router";
import NavBar from "@/components/admin/NavBar.vue";
import HeaderBar from "@/components/admin/HeaderBar.vue";
import PageTitle from "@/components/admin/AdminPageTitle.vue";
import { mapActions, mapState } from "pinia";
import toast from "@/utils/toast";

import { useLoadingState } from "@/stores/common";
import { userStore } from "@/stores/user";
export default {
  components: { RouterView, NavBar, HeaderBar, PageTitle },
  methods: {
    // async loginCheck() {
    //   await this.checkLogin();
    //   // useLoadingState().isLoading = false;
    // },
    async logout() {
      try {
        await this.logout();
        // useLoadingState().isLoading = false;
      } catch (err) {
        // console.log('logout err',err);
        // useLoadingState().isLoading = false;
        toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
      }
    },
    ...mapActions(userStore, ["logout", "checkLogin"]),
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
