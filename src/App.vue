<template>
  <RouterView />
</template>
<script>
import { RouterView } from "vue-router";

export default {
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
