<template>
  <div v-if="pages.total_pages > 1" class="d-flex justify-content-center">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getList(pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 傳入的 item 為 頁碼數字 -->
        <li
          class="page-item"
          :class="{ active: pages.current_page === item }"
          v-for="(item, index) in pages.total_pages"
          :key="index"
        >
          <!-- 當下頁面狀態時 顯示 span標籤元素 -->
          <span v-if="pages.current_page === item" class="page-link">{{
            index + 1
          }}</span>
          <!-- 否則 顯示 a 標籤元素 + 可切換分頁資料事件 -->
          <a
            v-else
            class="page-link"
            href="#"
            @click.prevent="$emit('change-page', item)"
            >{{ index + 1 }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getList(pages.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    pages: {
      type: Object,
      default() {},
    },
    //
    getList: {
      type: Function,
      default: () => {},
    },
  },
  emits: ["change-page"],
};
</script>
