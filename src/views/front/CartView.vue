<template>
  <h1>Cart</h1>
  <div class="container">
    <div class="mt-4">
      <!-- 購物車列表 -->
      <!-- 單純使用 v-if cart.carts.length 會報錯。產生原因：未判斷陣列是否為undefined 。解決方法：加個判斷，注意這裡判斷undefined要寫在判斷length前面，否則無效-->
      <div v-if="cart.carts && cart.carts.length > 0" class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="clearCartItem"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-end">單價</th>
            <th class="text-end">總價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(item)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <i
                    v-if="loadingStatus.loadingItem === item.id"
                    class="fas fa-spinner fa-pulse"
                  ></i>
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <!-- @blur 失去焦點後才執行 -->
                <div class="input-group input-group-sm">
                  <div class="input-group my-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model.number="item.qty"
                      @blur="updateCart(item)"
                      :disabled="loadingStatus.loadingItem === item.id"
                    />
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <span>${{ item.product.price }}</span>
                <small
                  class="text-success"
                  v-if="cart.final_total !== cart.total"
                  >折扣價：</small
                >
              </td>
              <td class="text-end">
                <span>${{ item.final_total }}</span>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-end">${{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">${{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="my-5 row justify-content-center">
      <Form
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="Email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['Email'] }"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            rules="required|email"
          ></Field>
          <error-message name="Email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">收件人手機</label>
          <Field
            id="tel"
            name="手機"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['手機'] }"
            placeholder="請輸入手機"
            :rules="isPhone"
            v-model="form.user.tel"
          ></Field>
          <error-message name="手機" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">地區</label>
          <Field
            id="city"
            name="地區"
            class="form-control"
            :class="{ 'is-invalid': errors['地區'] }"
            placeholder="請輸入地區"
            rules="required"
            as="select"
            v-model="form.user.city"
          >
            <option value="">請選擇地區</option>
            <option value="台北市">台北市</option>
            <option value="高雄市">高雄市</option>
          </Field>
          <error-message name="地區" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
  <VueLoading v-model:active="isLoading"></VueLoading>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      isLoading: false,
      // 讀取狀態，使用id 判斷 讀取狀態效果顯示與隱藏
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      productId: "",
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          city: "",
        },
        message: "",
      },
    };
  },

  methods: {
    // 取得購物車
    getCartList() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(`${err.response.data.message}`);
          this.isLoading = false;
        });
    },
    // 刪除單筆購物車
    async deleteCartItem(content) {
      // 賦予讀取狀態id
      this.loadingStatus.loadingItem = content.id;
      try {
        const res = await this.$http.delete(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${content.id}`
        );
        // 將讀取狀態清空
        this.loadingStatus.loadingItem = "";
        await this.getCartList();
        const {
          // 取出內層的資料
          product: { title },
        } = content;
        const { message } = res.data;
        alert(`${title} ${message}`);
      } catch (err) {
        alert(`${err.response.data.message}`);
      }
    },
    // 清除購物車
    async clearCartItem() {
      const dialog = confirm("確定清除購物車嗎？");
      if (dialog) {
        try {
          const res = await this.$http.delete(
            `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`
          );
          await this.getCartList();
          const { message } = res.data;
          setTimeout(() => {
            alert(`${message} 購物車`);
          }, 500);
        } catch (err) {
          alert(`${err.response.data.message}`);
        }
      }
    },
    // 修改購物車數量
    async updateCart(content) {
      // 賦予讀取狀態id
      this.loadingStatus.loadingItem = content.id;
      try {
        await this.$http.put(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${content.id}`,
          {
            data: {
              product_id: content.product_id,
              qty: content.qty,
            },
          }
        );
        // 將讀取狀態清空
        this.loadingStatus.loadingItem = "";
        await this.getCartList();
        const {
          // 取出內層的資料
          product: { title },
        } = content;
        alert(`已更新 品名：${title} 數量`);
      } catch (err) {
        alert(`${err.response.data.message}`);
      }
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請填入正確的手機號碼";
    },
    // 建立訂單
    async createOrder() {
      const order = this.form;
      try {
        const res = await this.$http.post(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/order`,
          {
            data: order,
          }
        );
        //解構賦值
        const { message, orderId } = res.data;
        alert(` ${message} ，訂單編號 ${orderId}`);
        this.$refs.form.resetForm(); //VeeValidate 重設表單 resetForm方法
        this.form.message = ""; // 清除textarea欄位
        await this.getCartList();
      } catch (err) {
        alert(`${err.response.data.message}`);
      }
    },
  },
  mounted() {
    this.isLoading = true;
    this.getCartList();
  },
};
</script>
