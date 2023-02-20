<template>
  <div class="mt-4 mb-4 p-3 bg-white">
    <table class="table mb-0">
      <thead>
        <tr>
          <th>建立時間</th>
          <th width="120">購買款項</th>
          <th width="120" class="text-end">售價</th>
          <th width="120">是否付款</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at }}</td>
          <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products">{{ product.product.title }}</li>
              </ul>
          </td>

          <td class="text-end"></td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="item.id"
                v-model="item.is_paid"
                :true-value="1"
                :false-value="0"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="item.id"
                ><span class="text-success" v-if="item.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span></label
              >
            </div>
          </td>
          <td>
            <!-- <div class="btn-group">
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
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AdminProductModal
    ref="productModal"
    :temp-content="temp"
    :is-new="isNew"
    @update-data="getOrder"
  ></AdminProductModal>
  <AdminDeleteModal
    ref="deleteProductModal"
    :temp-content="temp"
    @update-data="getOrder"
  ></AdminDeleteModal>
  <Pagination
    :pages="pagination"
    @change-page="getOrder"
    :get-products="getOrder"
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
      orders: [],
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
    getOrder(num = 1) {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/?page=${num}`)
        .then((res) => {
          console.log(res)
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          // 顯示失敗資訊
          alert(`${err.response.data.message}`);
          this.isLoading = false;
        });
    },
    // openModal(openMethod, item) {
    //   if (openMethod === "new") {
    //     this.isNew = true;
    //     this.$refs.productModal.openModal();

    //     this.temp = { imagesUrl: [] };
    //   } else if (openMethod === "edit") {
    //     this.isNew = false;
    //     this.temp = JSON.parse(JSON.stringify(item));

    //     this.$refs.productModal.openModal();
    //   } else if (openMethod === "delete") {
    //     this.temp = JSON.parse(JSON.stringify(item));
    //     this.$refs.deleteProductModal.openModal();
    //   }
    // },
    // updatePaid(content) {
    //   this.$http
    //     .put(
    //       `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${content.id}`,
    //       {
    //         data: content,
    //       }
    //     )
    //     .then((res) => {
    //       this.getOrder();
    //       alert(res.data.message);
    //     })
    //     .catch((err) => {
    //       // axios版本不同，err 回傳的資料層級也不同
    //       alert(err.response.data.message);
    //     });
    // },
  },
  mounted() {
    this.isLoading = true;
    this.getOrder();
  },
};
</script>
