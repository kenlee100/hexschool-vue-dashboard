<template>
  <div ref="ckeditorContent" :editor="editor" :config="editorConfig"></div>
</template>
<script>
import "../../build/ckeditor.js";
export default {
  data() {
    return {
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
    };
  },
  mounted() {
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
