<template>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        建立新的優惠券
      </button>
    </div>
    <div class="mt-4 mb-4 p-3 bg-white shadow-sm">
      <div class="table-responsive">
        <table class="table table-striped table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>名稱</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ $filters.date(item.due_date) }}</td>
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
                    @change="updateCoupon(item)"
                  />
                  <label class="form-check-label" :for="item.id"
                    ><span class="text-success" v-if="item.is_enabled"
                      >啟用</span
                    >
                    <span class="text-danger" v-else>未啟用</span></label
                  >
                </div>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
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
    <AdminCouponModal
      :temp-content="temp"
      :is-new="isNew"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal ref="deleteCouponModal" :item="temp" @delete-item="deleteItem" />
    <PaginationComponent
      :pages="pagination"
      @change-page="getCoupons"
      :get-list="getCoupons"
    />
  </div>
</template>
<script>
import AdminCouponModal from "@/components/admin/AdminCouponModal.vue";
import DelModal from "@/components/DelModal.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common.js";
import { getCoupons, deleteItem, updateCoupon } from "@/apis/coupon";
export default {
  data() {
    return {
      isNew: false,
      coupons: [],
      temp: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      pagination: {},
    };
  },
  components: {
    AdminCouponModal,
    DelModal,
    PaginationComponent,
  },
  methods: {
    async getCoupons(num = 1) {
      useLoadingState().isLoading = true;
      const res = await getCoupons(num);
      this.coupons = res.coupons;
      this.pagination = res.pagination;
      useLoadingState().isLoading = false;
    },
    async updateCoupon(content) {
      useLoadingState().isLoading = true;
      let param = "";
      let method = "post";
      // 判斷 isNew 是否為 新增
      if (!this.isNew) {
        param += content.id;
        method = "put";
      }
      console.log("update", content);
      const res = await updateCoupon(method, param, {
        data: content,
      });
      this.$refs.couponModal.closeModal();
      await this.getCoupons();
      this.isNew = false;

      await toast.fire({
        icon: "success",
        title: res.message,
      });
    },
    async deleteItem(id) {
      useLoadingState().isProcessing = true;
      const res = await deleteItem(id);
      this.$refs.deleteCouponModal.closeModal();
      await this.getCoupons();
      await toast.fire({
        icon: "success",
        title: res.message,
      });
    },
    openModal(openMethod, item) {
      if (openMethod === "new") {
        this.isNew = true;
        this.$refs.couponModal.openModal();

        this.temp = {
          title: "",
          is_enabled: 0,
          percent: 100,
          code: "",
          due_date: new Date().getTime() / 1000,
        };
      } else if (openMethod === "edit") {
        this.isNew = false;
        this.temp = { ...item };

        this.$refs.couponModal.openModal();
      } else if (openMethod === "delete") {
        this.temp = { ...item };
        this.$refs.deleteCouponModal.openModal();
      }
    },
  },
  mounted() {
    useLoadingState().isLoading = true;
    this.getCoupons();
  },
};
</script>
