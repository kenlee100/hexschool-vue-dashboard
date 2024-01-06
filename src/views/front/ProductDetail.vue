<template>
  <h1>{{ productItem.title }}</h1>
  <div class="row">
    <div class="col-sm-6">
      <img
        v-if="productItem.imageUrl"
        class="img-fluid"
        :src="productItem.imageUrl"
        alt=""
      />
      <img
        v-else
        class="img-fluid"
        src="https://placehold.co/640x480?text=No+Photo"
        alt=""
      />
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{
        productItem.category
      }}</span>
      <p>商品描述：{{ productItem.description }}</p>
      <p>商品內容：{{ productItem.content }}</p>
      <div class="h5">{{ productItem.price }} 元</div>
      <del class="h6">原價 {{ productItem.origin_price }} 元</del>
      <div class="h5">現在只要 {{ productItem.price }} 元</div>
      <div>
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            min="1"
            v-model.number="qty"
          />
          <button
            type="button"
            @click="addCart(productItem)"
            class="btn btn-primary"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      isLoading: false,
      productItem: {},
      qty: 1,
    };
  },
  methods: {
    getProductItem(id) {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.productItem = res.data.product;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
          this.isLoading = false;
        });
    },
    addCart(content, qty = 1) {
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, {
          data: {
            product_id: content.id,
            qty,
          },
        })
        .then((res) => {
          //解構賦值
          const {
            message,
            // 取出內層的資料
            data: { product },
          } = res.data;
          alert(`${product.title} ${message}`);
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.getProductItem(this.$route.params.id);
  },
};
</script>
