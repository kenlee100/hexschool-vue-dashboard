<template>
  <div class="page-title pt-4">
    <h2 v-if="getPath.length > 0" class="fs-4 text-secondary">
      {{ getPath[0].name }}
    </h2>
    <h2 v-else class="fs-4 text-secondary">後台管理</h2>
  </div>
</template>
<script>
import adminNavListMenu from "../../stores/NavList.js";
import { mapState } from "pinia";
export default {
  props: {
    pageTitle: {
      type: String,
      require: true,
    },
  },
  computed: {
    // mapState(store名稱, ['要取得的值'])
    ...mapState(adminNavListMenu, ["navList"]),
    getPath() {
      // 回傳符合navList store的路徑
      return this.navList.filter((item) => item.path === this.$route.path);
    },
  },
};
</script>
