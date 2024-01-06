<template>
  <h1>Product list</h1>
  <div class="row">
    <div class="col-4" v-for="item in products" :key="item.id">
      <div class="card mb-4">
        <router-link :to="`/product/${item.id}`">
          <img :src="item.imageUrl" class="card-img-top" :alt="item.title" />
        </router-link>
        <div class="card-body">
          <span class="badge rounded-pill bg-primary">{{ item.category }}</span>
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            {{ item.description }}
          </p>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="openModal(item.id)"
              :disabled="loadingStatus.loadingItem === item.id"
            >
              <i
                v-if="loadingStatus.loadingItem === item.id"
                class="fas fa-spinner fa-pulse"
              ></i>
              快速查看
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addCart(item)"
              :disabled="loadingStatus.loadingItem === item.id"
            >
              <i
                v-if="loadingStatus.loadingItem === item.id"
                class="fas fa-spinner fa-pulse"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductModal
    ref="productModal"
    :temp-content="tempProduct"
    :add-cart="addCart"
    :id="productId"
    :open-modal="openModal"
  ></ProductModal>
  <PaginationComponent
    :pages="pagination"
    @change-page="getProducts"
    :get-data="getProducts"
  ></PaginationComponent>
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import { RouterLink } from "vue-router";
import ProductModal from "@/components/front/ProductModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
export default {
  data() {
    return {
      isLoading: false,
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      productId: "",
    };
  },
  components: { RouterLink, ProductModal, PaginationComponent },
  methods: {
    openModal(id) {
      // id為外層帶入 productId
      // 將 id 帶入 讀取狀態
      this.loadingStatus.loadingItem = id;
      this.productId = id;
    },
    // 加入購物車
    addCart(content, qty = 1) {
      // 賦予讀取狀態id
      this.loadingStatus.loadingItem = content.id;
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, {
          data: {
            product_id: content.id,
            qty,
          },
        })
        .then((res) => {
          // 將讀取狀態清空
          this.loadingStatus.loadingItem = "";
          //解構賦值
          const {
            message,
            // 取出內層的資料
            data: { product },
          } = res.data;
          alert(`${product.title} ${message}`);
          this.$refs.productModal.closeModal();
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
        });
    },
    getProducts(num = 1) {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/products?page=${num}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getProducts();
  },
};
</script>
