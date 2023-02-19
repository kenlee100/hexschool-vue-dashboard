<template>
  <!-- TODO: modal 功能待調整 -->
  <h1>--</h1>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-end">{{ item.origin_price }}</td>
        <td class="text-end">{{ item.price }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <AdminProductModal
    ref="productModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-data="getProducts"
  ></AdminProductModal>
  <AdminDeleteModal
    ref="deleteProductModal"
    :temp-content="temp"
    @update-data="getProducts"
  ></AdminDeleteModal>
  <Pagination
    :pages="pagination"
    @change-page="getProducts"
    :get-products="getProducts"
  ></Pagination>
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import AdminProductModal from "@/components/admin/AdminProductModal.vue";
import AdminDeleteModal from "@/components/admin/AdminDeleteModal.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      isLoading: false,
      // 初始商品資料
      products: [],
      temp: {
        imagesUrl: [],
      },
      pagination: {},
      isNew: false,
      productId: "",
    };
  },
  components: {
    Pagination,
    AdminProductModal,
    AdminDeleteModal,
  },
  methods: {
    // 取得目前頁碼商品資料
    getProducts(num = 1) {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${num}`)
        .then((res) => {
          this.products = res.data.products;
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
        this.$refs.productModal.openModal();

        this.temp = { imagesUrl: [] };
      } else if (openMethod === "edit") {
        this.isNew = false;
        this.temp = JSON.parse(JSON.stringify(item));

        this.$refs.productModal.openModal();
      } else if (openMethod === "delete") {
        this.temp = JSON.parse(JSON.stringify(item));
        this.$refs.deleteProductModal.openModal();
      }
    },
  },
  mounted() {
    this.isLoading = true;
    this.getProducts();
  },
};
</script>
