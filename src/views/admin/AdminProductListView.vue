<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <div class="mt-4 mb-4 p-3 bg-white">
    <table class="table mb-0">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-end">原價</th>
          <th width="120" class="text-end">售價</th>
          <th width="120">是否啟用</th>
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
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="item.id"
                v-model="item.is_enabled"
                :true-value="1"
                :false-value="0"
                @change="updateProduct(item)"
              />
              <label class="form-check-label" :for="item.id"
                ><span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span></label
              >
            </div>
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
  </div>
  <AdminProductModal
    ref="productModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-data="getProducts"
  ></AdminProductModal>
  <AdminProductDeleteModal
    ref="deleteProductModal"
    :temp-content="temp"
    @update-data="getProducts"
  ></AdminProductDeleteModal>
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
import AdminProductDeleteModal from "@/components/admin/AdminProductDeleteModal.vue";
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
    AdminProductDeleteModal,
  },
  methods: {
    // 取得目前頁碼商品資料
    getProducts(num = 1) {
      this.isLoading = true;
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
    updateProduct(content) {
      this.$http
        .put(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${content.id}`,
          {
            data: content,
          }
        )
        .then((res) => {
          this.getProducts();
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
    this.getProducts();
  },
};
</script>
