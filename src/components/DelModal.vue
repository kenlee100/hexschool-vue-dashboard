<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger" v-if="item.title">{{
            item.title
          }}</strong>
          <strong class="text-danger" v-else-if="itemTitle">{{
            itemTitle
          }}</strong>
          (刪除後將無法恢復)。
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
            @click="$emit('delete-item', item.id)"
          >
            確認刪除
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
  props: {
    item: {
      type: Object,
      default() {},
    },
    itemTitle: {
      type: String,
      default: "填入內容",
    },
  },
  mixins: [modalMixin],
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
