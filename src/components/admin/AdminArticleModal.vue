<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="newTempContent.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="newTempContent.imageUrl"
                  placeholder="請輸入圖片連結"
                />
                <img class="img-fluid" :src="newTempContent.imageUrl" alt="" />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="newTempContent.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div
                  class="col-md-2 mb-1"
                  v-for="(label, key) in newTempContent.tag"
                  :key="key"
                >
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      v-model="newTempContent.tag[key]"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="newTempContent.tag.splice(key, 1)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="col-auto mb-1"
                  v-if="
                    newTempContent.tag[newTempContent.tag.length - 1] ||
                    !newTempContent.tag.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    @click="newTempContent.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="newTempContent.description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  ref="ckeditorContent"
                  :editor="editor"
                  :config="editorConfig"
                ></ckeditor>
                <!-- <CKEditor ref="ckeditorContent" :editor="editor" :config="editorConfig"></CKEditor> -->
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switch-public"
                    v-model="newTempContent.isPublic"
                  />
                  <label class="form-check-label" for="switch-public"
                    ><span class="text-success" v-if="newTempContent.isPublic"
                      >公開</span
                    >
                    <span class="text-danger" v-else>不公開</span></label
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
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', newTempContent)"
          >
            {{ isNew ? "確認新增" : "確認修改" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from "@/mixins/modalMixin.js";
import Modal from "bootstrap/js/dist/modal";
// import CKEditor from "@/Ckeditor.vue";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../build/ckeditor.js";

export default {
  data() {
    return {
      modal: {},
      newTempContent: {
        tag: [],
      },
      create_at: 0,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "bold",
            "italic",
            "|",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "|",
            "insertTable",
            "|",
            "outdent",
            "indent",
            "|",
            "uploadImage",
            "blockQuote",
          ],
        },
      },
      // plugins: [Essentials],
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
      this.newTempContent = {
        ...this.tempContent,
        tag: this.tempContent.tag || [],
        isPublic: this.tempContent.isPublic || false,
      };
      // 陣列解構賦值
      [this.create_at, this.secondVal] = new Date(
        this.newTempContent.create_at * 1000
      )
        .toISOString()
        .split("T");
      // <input type="date" /> 資料格式 "2023-02-16"
      // new Date(this.newTempContent.create_at * 1000) ===> Feb 22 2023 08:00:00 GMT+0800 (台北標準時間)
      // new Date(this.newTempContent.create_at * 1000).toISOString() ===> 2023-02-22T00:00:00.000Z
      // new Date(this.newTempContent.create_at * 1000).toISOString().split("T") ===> ['2023-02-17', '00:00:00.000Z']
      // [this.create_at] = ['2023-02-17', '00:00:00.000Z'] ===> 左側只有一個 this.create_at，所以對應右側位置的值，只取出'2023-02-17'。 此時 this.create_at = '2023-02-17'
    },
    create_at() {
      this.newTempContent.create_at = Math.floor(
        new Date(this.create_at) / 1000
      );
    },
  },
  mixins: [modalMixin],
  // components: {
  //   CKEditor,
  // },
  mounted() {
    this.$refs.modal.addEventListener("hidden.bs.modal", () => {
      // 關閉modal時將內部暫存資料清空
      this.newTempContent = {
        tag: [],
      };
    });
    this.modal = new Modal(this.$refs.modal, {
      backdrop: "static",
      keyboard: false,
    });
    ClassicEditor.create(this.$refs.ckeditorContent, {})
      .then((editor) => {
        window.editor = editor;
      })
      .catch((error) => {
        console.error("Oops, something went wrong!");
        // console.error(
        //   "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
        // );
        // console.warn("Build id: 6vvzitvhg3i3-r519x1e752f9");
        console.error(error);
      });
  },
};
</script>
<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
