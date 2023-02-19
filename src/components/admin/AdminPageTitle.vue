<template>
  <div class="page-title py-4">
    <h2 class="fs-4">{{ getPath[0].name }}</h2>
  </div>
</template>
<script>
import navListMenu from "../../stores/NavList.js";
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
    ...mapState(navListMenu, ["navList"]),
    getPath() {
        // 回傳符合navList store的路徑
      return this.navList.filter((item) => item.path === this.$route.path);
    },
  },
  mounted() {
    console.log(this.$route.path);
  },
};
</script>
