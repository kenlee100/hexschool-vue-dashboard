// ckeditor.js

import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Style from "@ckeditor/ckeditor5-style/src/style.js";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

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

const { VITE__URL, VITE__PATH } = import.meta.env;
const token = document.cookie.replace(
  // userToken Token名稱
  /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);
console.log("token", token);
export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Autoformat,
  BlockQuote,
  Bold,
  CKFinderUploadAdapter,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
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
  SourceEditing,
  Strikethrough,
  Style,
  SimpleUploadAdapter,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  Underline,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "heading",
      "|",
      "bold",
      "fontColor",
      "fontSize",
      "fontBackgroundColor",
      "underline",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "highlight",
      "style",
      "|",
      "strikethrough",
      "sourceEditing",
    ],
  },
  language: "zh",
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
  simpleUpload: {
    // The URL that the images are uploaded to.
    uploadUrl: `${VITE__URL}/api/${VITE__PATH}/admin/upload/`,

    // Enable the XMLHttpRequest.withCredentials property.
    withCredentials: true,

    // Headers sent along with the XMLHttpRequest to the upload server.
    headers: {
      "X-CSRF-TOKEN": "CSRF-Token",
      Authorization: token,
    },
  },
};
