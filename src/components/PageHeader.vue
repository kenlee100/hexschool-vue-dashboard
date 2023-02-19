<template>
  <div class="py-3">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "標題",
    },
  },
};
</script>
