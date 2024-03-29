<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" type="button" @click="openModal('new')">
      建立新的文章
    </button>
  </div>
  <div class="mt-4 mb-4 p-3 bg-white shadow-sm">
    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th style="width: 200px">標題</th>
            <th style="width: 100px">作者</th>
            <th style="width: 200px">描述</th>
            <th style="width: 100px">建立時間</th>
            <th style="width: 100px">是否公開</th>
            <th style="width: 120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in articles" :key="item.id">
            <td>
              <p class="mb-0 line-clamp-2">{{ item.title }}</p>
            </td>
            <td>{{ item.author }}</td>
            <td>
              <p class="mb-0 line-clamp-2">{{ item.description }}</p>
            </td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>
              <!-- 要更新狀態，需取得單一商品，才取的到content內容。要打article/id api -->
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :id="item.id"
                  v-model="item.isPublic"
                  @change="switchUpdate(item)"
                />
                <label class="form-check-label" :for="item.id"
                  ><span class="text-success" v-if="item.isPublic">公開</span>
                  <span class="text-danger" v-else>不公開</span></label
                >
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="getArticleItem(item.id)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openModal('delete', item)"
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
  <AdminArticleModalVue
    ref="articleModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-article="updateArticle"
  />
  <DelModal ref="deleteModal" :item="temp" @delete-item="deleteItem" />
  <PaginationComponent
    :pages="pagination"
    @change-page="getArticles"
    :get-list="getArticles"
  />
</template>
<script>
const { VITE__URL, VITE__PATH } = import.meta.env;
import AdminArticleModalVue from "@/components/admin/AdminArticleModal.vue";
import DelModal from "@/components/DelModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common.js";
export default {
  data() {
    return {
      modal: {},
      articles: [],
      temp: {
        isPublic: false,
        create_at: new Date().getTime() / 1000,
        tag: [],
      },
      pagination: {},
      isNew: false,
    };
  },
  methods: {
    getArticles(num = 1) {
      useLoadingState().isLoading = true;
      this.$http
        .get(`${VITE__URL}/api/${VITE__PATH}/admin/articles/?page=${num}`)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          useLoadingState().isLoading = false;
        })
        .catch((err) => {
          // 顯示失敗資訊
          useLoadingState().isLoading = false;
          toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    },
    getArticleItem(id) {
      useLoadingState().isLoading = true;
      this.$http
        .get(`${VITE__URL}/api/${VITE__PATH}/admin/article/${id}`)
        .then((res) => {
          this.openModal("edit", res.data.article);
          useLoadingState().isLoading = false;
        })
        .catch((err) => {
          useLoadingState().isLoading = false;
          toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    },
    openModal(openMethod, item) {
      if (openMethod === "new") {
        this.isNew = true;
        this.$refs.articleModal.openModal();

        this.temp = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
      } else if (openMethod === "edit") {
        this.isNew = false;
        this.temp = JSON.parse(JSON.stringify(item));

        this.$refs.articleModal.openModal();
      } else if (openMethod === "delete") {
        this.temp = JSON.parse(JSON.stringify(item));
        this.$refs.deleteModal.openModal();
      }
    },
    deleteItem(id) {
      useLoadingState().isLoading = true;
      this.$http
        .delete(`${VITE__URL}/api/${VITE__PATH}/admin/article/${id}`)
        .then((res) => {
          this.getArticles();
          this.$refs.deleteModal.closeModal();
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
        })
        .catch((err) => {
          useLoadingState().isLoading = false;
          toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    },
    async updateArticle(content) {
      useLoadingState().isLoading = true;
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
          this.$refs.articleModal.closeModal();
          this.getArticles();
          this.isNew = false;
          toast.fire({
            icon: "success",
            title: res.data.message,
          });
        })
        .catch((err) => {
          useLoadingState().isLoading = false;
          toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
        });
    },
    async switchUpdate(content) {
      useLoadingState().isLoading = true;
      try {
        const articleItem = await this.$http.get(
          `${VITE__URL}/api/${VITE__PATH}/admin/article/${content.id}`
        );
        const updateContent = {
          ...articleItem.data.article,
          isPublic: content.isPublic,
        };
        await this.updateArticle(updateContent);
      } catch (err) {
        useLoadingState().isLoading = false;
        toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
      }
    },
  },
  mounted() {
    useLoadingState().isLoading = true;
    this.getArticles();
  },
  components: { AdminArticleModalVue, DelModal, PaginationComponent },
};
</script>
