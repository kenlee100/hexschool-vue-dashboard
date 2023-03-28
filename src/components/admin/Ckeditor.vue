<template>
  <textarea ref="ckeditorContent"></textarea>
</template>
<script>
import { toRaw } from "vue";
import ClassicEditor from "../../utils/ckeditor.js";
export default {
  data() {
    return {
      newEditor: "",
      ckeditorTarget: null,
    };
  },
  props: ["text"],
  emit: ["update"],
  watch: {
    text(newVal, oldVal) {
      console.log("dsgsg");
      // console.log(toRaw(this.ckeditorTarget).setData(newVal));
      this.newEditor = newVal
      toRaw(this.ckeditorTarget).setData(this.newEditor);
      this.$emit("update", this.newEditor);
    },
  },
  mounted() {
    console.log("this.$refs.ckeditorContent", this.$refs.ckeditorContent);
    ClassicEditor
      // Note that you do not have to specify the plugin and toolbar configuration — using defaults from the build.
      .create(this.$refs.ckeditorContent)
      .then((editor) => {
        // editor = editor
        console.log(this);
        // console.log('get',editor.getData())
        this.ckeditorTarget = editor;

        // this.newEditor = editor
        // console.log("Editor was initialized", editor.model.document);
        editor.model.document.on("change:data", () => {
          // this.newEditor = this.text;
          console.log("The data has changed!");
        });
      })
      .catch((error) => {
        console.error(error.stack);
      });
  },
};
</script>
