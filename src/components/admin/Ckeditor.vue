<template>
  <div ref="ckeditorContent"></div>
</template>
<script>
import ClassicEditor from "../../utils/ckeditor.js";
export default {
  data() {
    return {
      newEditor: "",
    };
  },
  props: ["text"],
  mounted() {
    console.log("this.$refs.ckeditorContent", this.$refs.ckeditorContent);
    ClassicEditor
      // Note that you do not have to specify the plugin and toolbar configuration — using defaults from the build.
      .create(this.$refs.ckeditorContent)
      .then((editor) => {
        console.log(editor.model.document);
        // console.log('get',editor.getData())
        // editor.setData(this.text)
        // this.newEditor = editor
        // console.log("Editor was initialized", editor.model.document);
        editor.model.document.on("change:data", () => {
          console.log("The data has changed!");
        });
      })
      .catch((error) => {
        console.error(error.stack);
      });
    // this.newEditor = this.tempEditor
  },
};
</script>
