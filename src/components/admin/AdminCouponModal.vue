<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <VForm
          v-slot="{ errors }"
          @submit="$emit('update-coupon', newTempContent)"
        >
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="title">標題</label>
              <VField
                type="text"
                name="標題"
                class="form-control"
                :class="{ 'border-danger': errors['標題'] }"
                id="title"
                rules="required"
                v-model="newTempContent.title"
                placeholder="請輸入標題"
              />
              <error-message name="標題" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="coupon_code">優惠碼</label>
              <VField
                type="text"
                name="優惠碼"
                class="form-control"
                :class="{ 'border-danger': errors['優惠碼'] }"
                id="coupon_code"
                rules="required"
                v-model="newTempContent.code"
                placeholder="請輸入優惠碼"
              />
              <error-message name="優惠碼" class="text-danger" />
            </div>
            <div class="mb-3">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                :min="due_date"
                v-model="due_date"
              />
            </div>
            <div class="mb-3">
              <label for="price">折扣百分比</label>
              <VField
                type="number"
                name="折扣百分比"
                class="form-control"
                :class="{ 'border-danger': errors['折扣百分比'] }"
                id="price"
                min="0"
                max="100"
                rules="required"
                v-model.number="newTempContent.percent"
                placeholder="請輸入折扣百分比"
              />
              <error-message name="折扣百分比" class="text-danger" />
            </div>
            <div class="mb-3">
              <!-- <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="newTempContent.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div> -->
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="switch-coupon"
                  v-model="newTempContent.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="switch-coupon"
                  ><span class="text-success" v-if="newTempContent.is_enabled"
                    >啟用</span
                  >
                  <span class="text-danger" v-else>未啟用</span></label
                >
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
            <button type="submit" class="btn btn-primary">
              {{ isNew ? "新增優惠卷" : "更新優惠券" }}
            </button>
          </div>
        </VForm>
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
      due_date: "",
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
      const dateAndTime = new Date(this.newTempContent.due_date * 1000)
        .toISOString()
        .split("T");
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.newTempContent.due_date = Math.floor(new Date(this.due_date) / 1000);
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
