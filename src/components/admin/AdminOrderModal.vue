<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>訂單細節</span>
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <h3>用戶資料</h3>
              <table class="table table-striped table-hover mb-0">
                <tbody v-if="newTempContent.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ newTempContent.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ newTempContent.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ newTempContent.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ newTempContent.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <h3>訂單細節</h3>
              <table class="table table-striped table-hover mb-0">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ newTempContent.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(newTempContent.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="newTempContent.paid_date">
                        {{ $filters.date(newTempContent.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="newTempContent.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>${{ $filters.currency(newTempContent.total) }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="d-flex justify-content-end py-3">
                <div class="form-check form-switch">
                  <!-- 這裡的input id與label for 的值要與order list的不同，否則這裡切換後會觸發 order list的修改資料方法 -->
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switch-paid"
                    v-model="newTempContent.is_paid"
                  />
                  <label class="form-check-label" for="switch-paid"
                    ><span class="text-success" v-if="newTempContent.is_paid"
                      >已付款</span
                    >
                    <span class="text-danger" v-else>未付款</span></label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in newTempContent.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      ${{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', newTempContent)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from "@/mixins/modalMixin.js";
import Modal from "bootstrap/js/dist/modal";
export default {
  data() {
    return {
      modal: {},
      newTempContent: {},
    };
  },
  props: {
    tempContent: {
      type: Object,
      default() {},
    },
    // 接收外層isNew，判斷modal標題
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    tempContent() {
      this.newTempContent = this.tempContent;
    },
  },
  mixins: [modalMixin],
  mounted() {
    this.$refs.modal.addEventListener("hidden.bs.modal", () => {
      // 關閉modal時將內部暫存資料清空
      this.newTempContent = {};
    });
    this.modal = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
