<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">JAPAN TRIP</router-link>
      <div class="d-flex">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav" v-for="item in navList" :key="item.path">
            <router-link class="nav-link" :to="item.path">{{
              item.name
            }}</router-link>
          </div>
        </div>
        <div class="ms-4">
          <router-link class="btn btn-outline-secondary" to="/cart"
            >Cart</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        {
          path: "/products",
          name: "推薦行程",
        },
        {
          path: "/blogs",
          name: "旅行遊記",
        },
        {
          path: "/about",
          name: "關於我們",
        },
        {
          path: "/faq",
          name: "常見問題",
        },
      ],
    };
  },
};
</script>
