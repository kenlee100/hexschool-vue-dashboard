<template>
  <nav
    class="sidebar position-fixed start-0 top-0 bottom-0 z-10 d-flex flex-column h-100 overflow-x-hidden overflow-y-auto"
  >
    <div class="brand-section flex-shrink-0 p-4">
      <router-link
        class="flex w-full h-20 justify-content-center align-items-center text-decoration-none text-white"
        to="/admin"
        >admin</router-link
      >
    </div>
    <ul class="sidebar-menu list-unstyled mb-0">
      <li class="" v-for="item in navList" :key="item.path">
        <router-link
          class="d-block py-3 px-4 fs-6 text-decoration-none text-white"
          :to="item.path"
          >{{ item.name }}</router-link
        >
      </li>
    </ul>
    <!-- <div class="flex flex-col">
      <button type="button" class="btn" @click="logout">登出</button>
    </div> -->
  </nav>
</template>
<script>
// const { VITE_APP_URL } = import.meta.env;
import navListMenu from "../../stores/NavList.js";
import { mapState } from "pinia";
export default {
  computed: {
    // mapState(store名稱, ['要取得的值'])
    ...mapState(navListMenu, ["navList"]),
  },
  // methods: {
  //   // 檢查是否登入
  //   checkLogin() {
  //     const token = document.cookie.replace(
  //       // userToken 剛剛定義的Token名稱
  //       /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
  //       "$1"
  //     );
  //     if (token) {
  //       this.$http.defaults.headers.common.Authorization = token;
  //       this.$http
  //         .post(`${VITE_APP_URL}/api/user/check`)
  //         .then(() => {})
  //         .catch((err) => {
  //           console.log(err);
  //           // 顯示失敗資訊
  //           alert(`${err.response.data.message}`);
  //           // 驗證失敗轉到登入
  //           this.$router.push("/login");
  //         });
  //     } else {
  //       alert("請先登入");
  //       this.$router.push("/login");
  //     }
  //   },

  // },
  // mounted() {
  //   this.checkLogin();
  // },
};
</script>
