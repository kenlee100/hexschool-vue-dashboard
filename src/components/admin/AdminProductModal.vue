<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <VForm
          v-slot="{ errors }"
          @submit="$emit('update-product', newTempContent)"
        >
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="image-upload-section d-flex flex-column">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">主要圖片</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入主要圖片連結"
                        v-model="newTempContent.imageUrl"
                      />
                      <div class="input-group">
                        <input
                          type="file"
                          class="form-control"
                          name="main-file-upload"
                          @change="uploadFile('main-file')"
                          ref="main-file"
                        />
                      </div>
                      <img
                        v-if="newTempContent.imageUrl"
                        class="img-fluid"
                        :src="newTempContent.imageUrl"
                        alt=""
                      />
                      <img
                        v-else
                        class="img-fluid"
                        src="https://placehold.co/640x480?text=No+Photo"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="mb-3">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="createImage"
                    >
                      新增其他圖片欄位
                    </button>
                  </div>
                </div>
                <!-- 判斷 newTempContent.imagesUrl 是一個陣列 -->
                <div
                  class="d-flex flex-column overflow-auto"
                  v-if="Array.isArray(newTempContent.imagesUrl)"
                >
                  <template
                    v-for="(item, index) in newTempContent.imagesUrl"
                    :key="item.id"
                  >
                    <div class="py-3 border-bottom">
                      <label class="form-label">圖片 {{ item.num }}</label>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          :placeholder="'請輸入圖片' + item.num + '連結'"
                          v-model="newTempContent.imagesUrl[index].imageUrl"
                        />
                        <input
                          type="file"
                          class="form-control"
                          :name="'file-upload-' + (index + 1)"
                          :ref="'ref-file-' + (index + 1)"
                          @change="uploadFile('ref-file-' + (index + 1))"
                          :data-num="index"
                        />
                        <img
                          v-if="item.imageUrl"
                          class="img-fluid"
                          :src="item.imageUrl"
                          alt=""
                        />
                        <img
                          v-else
                          class="img-fluid"
                          src="https://placehold.co/640x480?text=No+Photo"
                          alt=""
                        />
                      </div>
                      <div>
                        <button
                          class="btn btn-outline-danger btn-sm d-block w-100"
                          @click="deleteImage(item)"
                        >
                          刪除圖片 {{ item.num }}
                        </button>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <VField
                    id="title"
                    name="title"
                    label="標題"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['title'] }"
                    placeholder="請輸入標題"
                    rules="required"
                    v-model="newTempContent.title"
                  />
                  <ErrorMessage name="title" class="text-danger" />
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <VField
                      name="category"
                      label="分類"
                      id="category"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['category'] }"
                      placeholder="請輸入分類"
                      rules="required"
                      v-model="newTempContent.category"
                    />
                    <ErrorMessage name="category" class="text-danger" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <VField
                      id="unit"
                      label="單位"
                      name="unit"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['unit'] }"
                      placeholder="請輸入單位"
                      rules="required"
                      v-model="newTempContent.unit"
                    />
                    <ErrorMessage name="unit" class="text-danger" />
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <VField
                      id="origin_price"
                      type="number"
                      name="origin_price"
                      label="原價"
                      min="0"
                      class="form-control"
                      :class="{ 'is-invalid': errors['origin_price'] }"
                      placeholder="請輸入原價"
                      rules="required"
                      v-model.number="newTempContent.origin_price"
                    />
                    <ErrorMessage name="origin_price" class="text-danger" />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <VField
                      id="price"
                      name="price"
                      label="售價"
                      type="number"
                      min="0"
                      class="form-control"
                      placeholder="請輸入售價"
                      rules="required"
                      v-model.number="newTempContent.price"
                      :class="{ 'is-invalid': errors['price'] }"
                    />
                    <ErrorMessage name="price" class="text-danger" />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    id="description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    v-model="newTempContent.description"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="newTempContent.content"
                  ></ckeditor>
                </div>
                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="switch-activated"
                      :true-value="1"
                      :false-value="0"
                      v-model="newTempContent.is_enabled"
                    />
                    <label class="form-check-label" for="switch-activated"
                      ><span
                        class="text-success"
                        v-if="newTempContent.is_enabled"
                        >已啟用</span
                      >
                      <span class="text-danger" v-else>未啟用</span></label
                    >
                  </div>
                </div>
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
              {{ isNew ? "新增產品" : "修改產品" }}
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import modalMixin from "@/mixins/modalMixin.js";
import Modal from "bootstrap/js/dist/modal";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      modal: {},
      newTempContent: {
        imagesUrl: [],
      },
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["heading", "bold", "italic", "|", "link"],
      },
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
  methods: {
    // 建立圖片欄位
    createImage() {
      // 計算圖片數量
      let count = null;
      // 有 imagesUrl 時
      if (this.newTempContent.imagesUrl) {
        // 將 newTempContent.imagesUrl 圖片數量賦予到count
        count = this.newTempContent.imagesUrl.length;
      }
      const imageObj = {
        // timestamp,  計算目前數量
        id: new Date().getTime(),
        num: (count += 1),
      };
      // 有 imagesUrl 時
      if (this.newTempContent.imagesUrl) {
        // 新增一筆物件
        this.newTempContent.imagesUrl.push(imageObj);
      } else {
        // 沒有 imagesUrl 時 新增 imagesUrl 陣列 + 新增一筆物件
        this.newTempContent.imagesUrl = [];
        this.newTempContent.imagesUrl.push(imageObj);
      }
    },
    // 移除圖片
    deleteImage(data) {
      this.newTempContent.imagesUrl.forEach((item, index) => {
        if (item.id === data.id) {
          this.newTempContent.imagesUrl.splice(index, 1);
        }
      });
    },
    uploadFile(refItem) {
      useLoadingState().isLoading = true;
      const formData = new FormData();
      // 上傳主要圖片
      if (refItem === "main-file") {
        const refFiles = this.$refs[refItem];
        formData.append(refFiles.name, refFiles.files[0]);
        this.$http
          .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload/`, formData)
          .then((res) => {
            useLoadingState().isLoading = false;
            this.newTempContent.imageUrl = res.data.imageUrl;
          })
          .catch((err) => {
            useLoadingState().isLoading = false;
            toast.fire({
              icon: "error",
              title: `${err.response.data.message}`,
            });
          });
      } else {
        // 上傳其他圖片
        const refFiles = this.$refs[refItem][0];
        const i = parseInt(refFiles.dataset.num);
        formData.append(refFiles.name, refFiles.files[0]);
        this.$http
          .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload/`, formData)
          .then((res) => {
            useLoadingState().isLoading = false;
            this.newTempContent.imagesUrl[i].imageUrl = res.data.imageUrl;
          })
          .catch((err) => {
            toast.fire({
              icon: "error",
              title: `${err.response.data.message}`,
            });
          });
      }
    },
  },
  mixins: [modalMixin],
  mounted() {
    this.$refs.modal.addEventListener("hidden.bs.modal", () => {
      // 關閉modal時將內部暫存資料清空
      this.newTempContent = {
        imagesUrl: [],
      };
    });
    this.modal = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
  },
};
</script>
