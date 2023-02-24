<template>
  <div class="mt-4 mb-4 p-3 bg-white shadow-sm">
    <div class="table-responsive">
      <table class="table table-striped table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th>購買時間</th>
            <th>客戶資訊</th>
            <th>購買品項</th>
            <th class="text-end">應付金額</th>
            <th width="120">是否付款</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>
              <ul class="list-unstyled mb-0">
                <li>
                  <span>姓名：</span><span>{{ item.user.name }}</span>
                </li>
                <li>
                  <span>Email：</span><span>{{ item.user.email }}</span>
                </li>
              </ul>
            </td>
            <td>
              <ol class="list-group list-group-numbered mb-0">
                <li
                  class="list-group-item ps-0 border border-0 bg-transparent"
                  v-for="product in item.products"
                  :key="product.id"
                >
                  {{ product.product.title }}
                </li>
              </ol>
            </td>

            <td class="text-end">${{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <!-- 這裡的 is_paid 是true / false -->
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :id="item.id"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="item.id"
                  ><span class="text-success" v-if="item.is_paid">已付款</span>
                  <span class="text-danger" v-else>未付款</span></label
                >
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('view', item)"
                >
                  檢視
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
  <AdminOrderModal
    ref="orderModal"
    :temp-content="temp"
    @update-paid="updatePaid"
  ></AdminOrderModal>
  <AdminOrderDeleteModal
    ref="deleteOrderModal"
    :temp-content="temp"
    @delete-order="deleteItem"
  ></AdminOrderDeleteModal>
  <Pagination
    :pages="pagination"
    @change-page="getOrder"
    :get-data="getOrder"
  ></Pagination>
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE__URL, VITE__PATH } = import.meta.env;
import AdminOrderModal from "@/components/admin/AdminOrderModal.vue";
import AdminOrderDeleteModal from "@/components/admin/AdminOrderDeleteModal.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  data() {
    return {
      isLoading: false,
      // 初始商品資料
      orders: [],
      temp: {},
      pagination: {},
      productId: "",
    };
  },
  components: {
    Pagination,
    AdminOrderModal,
    AdminOrderDeleteModal,
  },
  methods: {
    // 取得目前頁碼商品資料
    getOrder(num = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE__URL}/api/${VITE__PATH}/admin/orders/?page=${num}`)
        .then((res) => {
          console.log("getOrder", res);
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
    deleteItem(id) {
      this.$http
        .delete(`${VITE__URL}/api/${VITE__PATH}/admin/order/${id}`)
        .then((res) => {
          this.$refs.deleteOrderModal.closeModal();
          this.getOrder();
          alert(res.data.message);
        })
        .catch((err) => {
          // 顯示失敗資訊
          alert(`${err.response.data.message}`);
        });
    },
    openModal(openMethod, item) {
      if (openMethod === "view") {
        this.temp = JSON.parse(JSON.stringify(item));
        this.$refs.orderModal.openModal();
      } else if (openMethod === "delete") {
        this.temp = JSON.parse(JSON.stringify(item));
        this.$refs.deleteOrderModal.openModal();
      }
    },
    updatePaid(content) {
      this.$http
        .put(`${VITE__URL}/api/${VITE__PATH}/admin/order/${content.id}`, {
          data: {
            is_paid: content.is_paid,
          },
        })
        .then((res) => {
          this.getOrder();
          this.$refs.orderModal.closeModal();
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
    this.getOrder();
  },
};
</script>
