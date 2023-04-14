<template>Welcome</template>

<script>
import { useLoadingState } from "@/stores/common.js";
export default {
  mounted() {
    useLoadingState().isLoading = true;
    setTimeout(() => {
      useLoadingState().isLoading = false;
    }, 300);
  },
};
</script>
