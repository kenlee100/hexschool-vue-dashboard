<template>
  <Navbar></Navbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import { RouterView } from "vue-router";
import Navbar from "../components/front/Nav.vue";
export default {
  components: { RouterView, Navbar },
};
</script>
