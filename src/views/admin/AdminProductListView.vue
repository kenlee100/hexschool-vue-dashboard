<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <div class="mt-4 mb-4 p-3 bg-white shadow-sm">
    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-light">
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
            <td>
              <p class="mb-0 line-clamp-2">{{ item.title }}</p>
            </td>
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
  </div>
  <AdminProductModal
    ref="productModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-product="updateProduct"
  ></AdminProductModal>
  <DelModal ref="deleteProductModal" :item="temp" @delete-item="deleteItem" />
  <PaginationComponent
    :pages="pagination"
    @change-page="getProducts"
    :get-list="getProducts"
  />
</template>
<script>
import AdminProductModal from "@/components/admin/AdminProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common.js";
import { getProducts, deleteItem, updateProduct } from "@/apis/product";
export default {
  data() {
    return {
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
    PaginationComponent,
    AdminProductModal,
    DelModal,
  },
  methods: {
    // 取得目前頁碼商品資料
    async getProducts(num = 1) {
      useLoadingState().isLoading = true;
      const res = await getProducts(num);
      this.products = res.products;
      this.pagination = res.pagination;
      useLoadingState().isLoading = false;
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
    async deleteItem(id) {
      const res = await deleteItem(id);
      useLoadingState().isProcessing = true;
      this.$refs.deleteProductModal.closeModal();
      await this.getProducts();
      await toast.fire({
        icon: "success",
        title: res.message,
      });
    },
    async updateProduct(content) {
      useLoadingState().isProcessing = true;
      let param = "";
      let method = "post";
      // 判斷 isNew 是否為 新增
      if (!this.isNew) {
        param += content.id;
        method = "put";
      }

      const res = await updateProduct(method, param, { data: content });
      this.$refs.productModal.closeModal();
      await this.getProducts();
      this.isNew = false;
      await toast.fire({
        icon: "success",
        title: res.message,
      });
    },
  },
  async created() {
    useLoadingState().isLoading = true;
    await this.getProducts();
  },
};
</script>
