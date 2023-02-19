<template>
  <div class="layout-content d-flex flex-column h-100">
    <Sidebar></Sidebar>
    <section class="data-section flex-grow-1 pb-3">
      <HeaderBar />
      <div class="container-fluid">
        <PageTitle page-title="test"></PageTitle>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>
<script>
import { RouterView } from "vue-router";
import Sidebar from "@/components/admin/Nav.vue";
import HeaderBar from "@/components/admin/HeaderBar.vue";
import PageTitle from "@/components/admin/AdminPageTitle.vue";
export default {
  methods: {},
  components: { RouterView, Sidebar, HeaderBar, PageTitle },
};
</script>
