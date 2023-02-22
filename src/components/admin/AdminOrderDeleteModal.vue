<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempContent.title }}</strong>
          訂單(刪除後將無法恢復)。
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
            class="btn btn-danger"
            @click="deleteItem(tempContent.id)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
import * as bootstrap from "bootstrap";
export default {
  props: {
    tempContent: {
      type: Object,
      default() {},
    },
  },
  methods: {
    deleteItem(id) {
      // console.log(this.tempContent)
      // console.log(id, `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${id}`)
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${id}`)
        .then((res) => {
          // 外層傳入 取得所有商品
          this.$emit("update-data");
          this.closeModal();
          alert(res.data.message);
        })
        .catch((err) => {
          // 顯示失敗資訊
          alert(`${err.response.data.message}`);
        });
    },
    closeModal() {
      this.modal.hide();
    },
    openModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
