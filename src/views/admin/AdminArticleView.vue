<template>
  <div class="text-end mt-4">
    <!-- <button class="btn btn-primary" type="button" @click="openModal(true)">
      建立新的頁面
    </button> -->
  </div>
  <div class="mt-4 mb-4 p-3 bg-white shadow-sm">
    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th style="width: 200px">標題</th>
            <th style="width: 200px">作者</th>
            <th>描述</th>
            <th style="width: 100px">建立時間</th>
            <th style="width: 100px">是否公開</th>
            <th style="width: 120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.title }}</td>
            <td>{{ article.author }}</td>
            <td>{{ article.description }}</td>
            <td>{{ $filters.date(article.create_at) }}</td>
            <td>
              <span v-if="article.isPublic">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal('edit', article)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openModal(article)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal> -->
  <AdminArticleModalVue
    ref="articleModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-article="getArticle"
  />
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE__URL, VITE__PATH } = import.meta.env;
import AdminArticleModalVue from "@/components/admin/AdminArticleModal.vue";
export default {
  data() {
    return {
      isLoading: false,
      articles: [],
      temp: {},
      pagination: {},
      isNew: false,
    };
  },
  methods: {
    getArticle(num = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE__URL}/api/${VITE__PATH}/admin/articles/?page=${num}`)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          // 顯示失敗資訊
          alert(`${err.response.data.message}`);
          this.isLoading = false;
        });
    },
    openModal(openMethod, item) {
      if (openMethod === "new") {
        this.isNew = true;
        this.$refs.articleModal.openModal();

        this.temp = { imagesUrl: [] };
      } else if (openMethod === "edit") {
        this.isNew = false;
        this.temp = JSON.parse(JSON.stringify(item));

        this.$refs.articleModal.openModal();
      } else if (openMethod === "delete") {
        this.temp = JSON.parse(JSON.stringify(item));
        // this.$refs.deleteProductModal.openModal();
      }
    },
    deleteItem(id) {
      this.$http
        .delete(`${VITE__URL}/api/${VITE__PATH}/admin/product/${id}`)
        .then((res) => {
          // this.$refs.deleteProductModal.closeModal();
          this.getArticle();
          alert(res.data.message);
        })
        .catch((err) => {
          // 顯示失敗資訊
          alert(`${err.response.data.message}`);
        });
    },
    updateArticle(content) {
      let url = `${VITE__URL}/api/${VITE__PATH}/admin/article`;
      let method = "post";
      // // // 判斷 isNew 是否為 新增
      if (!this.isNew) {
        url = `${VITE__URL}/api/${VITE__PATH}/admin/article/${content.id}`;
        method = "put";
      }
      this.$http[method](url, {
        data: content,
      })
        .then((res) => {
          this.$refs.productModal.closeModal();
          this.getArticle();
          alert(res.data.message);
        })
        .catch((err) => {
          // axios版本不同，err 回傳的資料層級也不同
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getArticle();
  },
  components: { AdminArticleModalVue },
};
</script>
