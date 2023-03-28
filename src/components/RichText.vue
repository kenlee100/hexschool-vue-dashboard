<template>
  <div class="rich-text">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      v-model="tempData"
      @input="this.$emit('change-editor', tempData)"
    ></ckeditor>
  </div>
</template>
<script>
import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Font from "@ckeditor/ckeditor5-font/src/font";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Style from "@ckeditor/ckeditor5-style/src/style.js";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js";
import SpecialCharactersArrows from "@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js";
import SpecialCharactersCurrency from "@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js";
import SpecialCharactersLatin from "@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js";
import SpecialCharactersMathematical from "@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js";
import SpecialCharactersText from "@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableCaption from "@ckeditor/ckeditor5-table/src/tablecaption.js";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableColumnResize from "@ckeditor/ckeditor5-table/src/tablecolumnresize.js";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextPartLanguage from "@ckeditor/ckeditor5-language/src/textpartlanguage.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import Title from "@ckeditor/ckeditor5-heading/src/title.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
export default {
  data() {
    return {
      tempData: "",
      editor: ClassicEditorBase,
      editorConfig: {
        language: "zh-cn",
        plugins: [
          Alignment,
          Autoformat,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          Essentials,
          Font,
          FontBackgroundColor,
          FontColor,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          ImageInsert,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Indent,
          Italic,
          Link,
          LinkImage,
          List,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          RemoveFormat,
          SourceEditing,
          Strikethrough,
          Subscript,
          Superscript,
          Style,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          //   Title,
          Underline,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          HorizontalLine,
          Code,
        ],
        toolbar: {
          items: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
            "removeFormat",
            "|",
            "fontFamily",
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "alignment",
            "heading",
            "|",
            "specialCharacters",
            "link",
            "insertImage",
            "imageUpload",
            "insertTable",
            "|",
            "undo",
            "redo",
            "selectAll",
            "|",
            "code",
            "horizontalLine",
            "blockQuote",
            "numberedList",
            "bulletedList",
            "outdent",
            "indent",
            "mediaEmbed",
            "highlight",
            "style",
            "sourceEditing",
          ],
          shouldNotGroupWhenFull: true,
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "toggleImageCaption",
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "linkImage",
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
          ],
        },
        // tableProperties: {
        //   borderColors: customColors,
        //   backgroundColors: customColors,
        // },
        // tableCellProperties: {
        //   borderColors: customColors,
        //   backgroundColors: customColors,
        // },
        link: {
          addTargetToExternalLinks: true,
        },
        fontSize: {
          options: [12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 48],
        },
        fontColor: {
          //   colors: customColors,
          columns: 10,
        },
        fontBackgroundColor: {
          //   colors: customColors,
          columns: 10,
        },
      },
    };
  },
  emits: ["change-editor"],
  props: {
    editorData: {
      type: String,
    },
  },
  watch: {
    editorData(newVal) {
    //   console.log("newVal", newVal);
      this.tempData = this.editorData;
    },
  },

  mounted() {
    this.tempData = this.editorData;
    console.dir(this.editor);
  },
};
</script>
<style lang="scss">
.ck-editor__editable_inline {
  height: 450px;
}
</style>
