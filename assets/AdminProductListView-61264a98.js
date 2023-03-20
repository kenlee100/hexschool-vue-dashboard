import{m as M,M as x,P as E,D as L}from"./PaginationComponent-86b3f4b1.js";import{C as I}from"./ckeditor-c1425c37.js";import{_ as k,r as f,o as l,c as i,a as e,w as m,v as u,F as T,g as V,t as h,i as D,e as _,j as P}from"./index-4535df0f.js";const{VITE__URL:U,VITE__PATH:y}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},N={data(){return{modal:{},newTempContent:{imagesUrl:[]},editor:I,editorConfig:{toolbar:["heading","typing","bold","italic","|","link"]}}},props:{tempContent:{type:Object,default(){}},isNew:{type:Boolean,default:!1}},watch:{tempContent(){this.newTempContent=this.tempContent}},methods:{createImage(){let n=null;this.newTempContent.imagesUrl&&(n=this.newTempContent.imagesUrl.length);const t={id:new Date().getTime(),num:n+=1};this.newTempContent.imagesUrl?this.newTempContent.imagesUrl.push(t):(this.newTempContent.imagesUrl=[],this.newTempContent.imagesUrl.push(t))},deleteImage(n){this.newTempContent.imagesUrl.forEach((t,d)=>{t.id===n.id&&this.newTempContent.imagesUrl.splice(d,1)})},uploadFile(n){const t=new FormData;if(n==="main-file"){const d=this.$refs[n];t.append(d.name,d.files[0]),this.$http.post(`${U}/api/${y}/admin/upload/`,t).then(c=>{this.newTempContent.imageUrl=c.data.imageUrl}).catch(c=>{alert(c.response.data.message)})}else{const d=this.$refs[n][0],c=parseInt(d.dataset.num);t.append(d.name,d.files[0]),this.$http.post(`${U}/api/${y}/admin/upload/`,t).then(o=>{this.newTempContent.imagesUrl[c].imageUrl=o.data.imageUrl}).catch(o=>{alert(o.response.data.message)})}}},mixins:[M],mounted(){this.$refs.modal.addEventListener("hidden.bs.modal",()=>{this.newTempContent={imagesUrl:[]}}),this.modal=new x(this.$refs.modal,{backdrop:"static",keyboard:!1})}},$={ref:"modal",class:"modal fade"},A={class:"modal-dialog modal-xl"},O={class:"modal-content border-0"},R={class:"modal-header bg-dark text-white"},F={id:"productModalLabel",class:"modal-title"},S={key:0},B={key:1},H={class:"modal-body"},J={class:"row"},j={class:"col-sm-4"},q={class:"image-upload-section d-flex flex-column"},z={class:"mb-2"},G={class:"mb-3"},K=e("label",{for:"imageUrl",class:"form-label"},"主要圖片",-1),Q={class:"input-group"},W=["src"],X={key:1,class:"img-fluid",src:"https://placehold.co/640x480?text=No+Photo",alt:""},Y={class:"mb-3"},Z={key:0,class:"d-flex flex-column overflow-auto"},ee={class:"form-label"},te={class:"form-group"},oe=["placeholder","onUpdate:modelValue"],se=["name","onChange","data-num"],ne=["src"],le={key:1,class:"img-fluid",src:"https://placehold.co/640x480?text=No+Photo",alt:""},ie=["onClick"],ae={class:"col-sm-8"},de={class:"mb-3"},re=e("label",{for:"title",class:"form-label"},"標題",-1),ce={class:"row"},me={class:"mb-3 col-md-6"},pe=e("label",{for:"category",class:"form-label"},"分類",-1),ue={class:"mb-3 col-md-6"},he=e("label",{for:"price",class:"form-label"},"單位",-1),_e={class:"row"},ge={class:"mb-3 col-md-6"},fe=e("label",{for:"origin_price",class:"form-label"},"原價",-1),be={class:"mb-3 col-md-6"},we=e("label",{for:"price",class:"form-label"},"售價",-1),Ce=e("hr",null,null,-1),ve={class:"mb-3"},Te=e("label",{for:"description",class:"form-label"},"產品描述",-1),Ue={class:"mb-3"},ye=e("label",{for:"content",class:"form-label"},"說明內容",-1),ke={class:"mb-3"},Ve={class:"form-check form-switch"},Pe={class:"form-check-label",for:"switch-activated"},Me={key:0,class:"text-success"},xe={key:1,class:"text-danger"},Ee={class:"modal-footer"};function Le(n,t,d,c,o,r){const b=f("ckeditor");return l(),i("div",$,[e("div",A,[e("div",O,[e("div",R,[e("h5",F,[d.isNew?(l(),i("span",S,"新增產品")):(l(),i("span",B,"編輯產品"))]),e("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...s)=>n.closeModal&&n.closeModal(...s))})]),e("div",H,[e("div",J,[e("div",j,[e("div",q,[e("div",z,[e("div",G,[K,m(e("input",{type:"text",class:"form-control",placeholder:"請輸入主要圖片連結","onUpdate:modelValue":t[1]||(t[1]=s=>o.newTempContent.imageUrl=s)},null,512),[[u,o.newTempContent.imageUrl]]),e("div",Q,[e("input",{type:"file",class:"form-control",name:"main-file-upload",onChange:t[2]||(t[2]=s=>r.uploadFile("main-file")),ref:"main-file"},null,544)]),o.newTempContent.imageUrl?(l(),i("img",{key:0,class:"img-fluid",src:o.newTempContent.imageUrl,alt:""},null,8,W)):(l(),i("img",X))])]),e("div",Y,[e("button",{class:"btn btn-outline-primary btn-sm d-block w-100",onClick:t[3]||(t[3]=(...s)=>r.createImage&&r.createImage(...s))}," 新增其他圖片欄位 ")])]),Array.isArray(o.newTempContent.imagesUrl)?(l(),i("div",Z,[(l(!0),i(T,null,V(o.newTempContent.imagesUrl,(s,p)=>(l(),i("div",{key:s.id,class:"py-3 border-bottom"},[e("label",ee,"圖片 "+h(s.num),1),e("div",te,[m(e("input",{type:"text",class:"form-control",placeholder:"請輸入圖片"+s.num+"連結","onUpdate:modelValue":g=>o.newTempContent.imagesUrl[p].imageUrl=g},null,8,oe),[[u,o.newTempContent.imagesUrl[p].imageUrl]]),e("input",{type:"file",class:"form-control",name:"file-upload-"+(p+1),ref_for:!0,ref:"ref-file-"+(p+1),onChange:g=>r.uploadFile("ref-file-"+(p+1)),"data-num":p},null,40,se),s.imageUrl?(l(),i("img",{key:0,class:"img-fluid",src:s.imageUrl,alt:""},null,8,ne)):(l(),i("img",le))]),e("div",null,[e("button",{class:"btn btn-outline-danger btn-sm d-block w-100",onClick:g=>r.deleteImage(s)}," 刪除圖片 "+h(s.num),9,ie)])]))),128))])):D("",!0)]),e("div",ae,[e("div",de,[re,m(e("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":t[4]||(t[4]=s=>o.newTempContent.title=s)},null,512),[[u,o.newTempContent.title]])]),e("div",ce,[e("div",me,[pe,m(e("input",{id:"category",type:"text",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":t[5]||(t[5]=s=>o.newTempContent.category=s)},null,512),[[u,o.newTempContent.category]])]),e("div",ue,[he,m(e("input",{id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":t[6]||(t[6]=s=>o.newTempContent.unit=s)},null,512),[[u,o.newTempContent.unit]])])]),e("div",_e,[e("div",ge,[fe,m(e("input",{id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":t[7]||(t[7]=s=>o.newTempContent.origin_price=s)},null,512),[[u,o.newTempContent.origin_price,void 0,{number:!0}]])]),e("div",be,[we,m(e("input",{id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":t[8]||(t[8]=s=>o.newTempContent.price=s)},null,512),[[u,o.newTempContent.price,void 0,{number:!0}]])])]),Ce,e("div",ve,[Te,_(b,{editor:o.editor,config:o.editorConfig,modelValue:o.newTempContent.description,"onUpdate:modelValue":t[9]||(t[9]=s=>o.newTempContent.description=s)},null,8,["editor","config","modelValue"])]),e("div",Ue,[ye,_(b,{editor:o.editor,config:o.editorConfig,modelValue:o.newTempContent.content,"onUpdate:modelValue":t[10]||(t[10]=s=>o.newTempContent.content=s)},null,8,["editor","config","modelValue"])]),e("div",ke,[e("div",Ve,[m(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"switch-activated","true-value":1,"false-value":0,"onUpdate:modelValue":t[11]||(t[11]=s=>o.newTempContent.is_enabled=s)},null,512),[[P,o.newTempContent.is_enabled]]),e("label",Pe,[o.newTempContent.is_enabled?(l(),i("span",Me,"已啟用")):(l(),i("span",xe,"未啟用"))])])])])])]),e("div",Ee,[e("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[12]||(t[12]=(...s)=>n.closeModal&&n.closeModal(...s))}," 取消 "),e("button",{type:"button",class:"btn btn-primary",onClick:t[13]||(t[13]=s=>n.$emit("update-product",o.newTempContent))},h(d.isNew?"新增產品":"修改產品"),1)])])])],512)}const Ie=k(N,[["render",Le]]),{VITE__URL:C,VITE__PATH:v}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},De={data(){return{isLoading:!1,products:[],temp:{imagesUrl:[]},pagination:{},isNew:!1,productId:""}},components:{PaginationComponent:E,AdminProductModal:Ie,DelModal:L},methods:{getProducts(n=1){this.isLoading=!0,this.$http.get(`${C}/api/${v}/admin/products/?page=${n}`).then(t=>{this.products=t.data.products,this.pagination=t.data.pagination,this.isLoading=!1}).catch(t=>{alert(`${t.response.data.message}`),this.isLoading=!1})},openModal(n,t){n==="new"?(this.isNew=!0,this.$refs.productModal.openModal(),this.temp={imagesUrl:[]}):n==="edit"?(this.isNew=!1,this.temp=JSON.parse(JSON.stringify(t)),this.$refs.productModal.openModal()):n==="delete"&&(this.temp=JSON.parse(JSON.stringify(t)),this.$refs.deleteProductModal.openModal())},deleteItem(n){this.$http.delete(`${C}/api/${v}/admin/product/${n}`).then(t=>{this.$refs.deleteProductModal.closeModal(),this.getProducts(),alert(t.data.message)}).catch(t=>{alert(`${t.response.data.message}`)})},updateProduct(n){let t=`${C}/api/${v}/admin/product`,d="post";this.isNew||(t=`${C}/api/${v}/admin/product/${n.id}`,d="put"),this.$http[d](t,{data:n}).then(c=>{this.$refs.productModal.closeModal(),this.getProducts(),alert(c.data.message)}).catch(c=>{alert(c.response.data.message)})}},mounted(){this.isLoading=!0,this.getProducts()}},Ne={class:"text-end mt-4"},$e={class:"mt-4 mb-4 p-3 bg-white shadow-sm"},Ae={class:"table-responsive"},Oe={class:"table table-striped table-hover mb-0"},Re=e("thead",{class:"table-light"},[e("tr",null,[e("th",{width:"120"},"分類"),e("th",null,"產品名稱"),e("th",{width:"120",class:"text-end"},"原價"),e("th",{width:"120",class:"text-end"},"售價"),e("th",{width:"120"},"是否啟用"),e("th",{width:"120"},"編輯")])],-1),Fe={class:"text-end"},Se={class:"text-end"},Be={class:"form-check form-switch"},He=["id","onUpdate:modelValue","onChange"],Je=["for"],je={key:0,class:"text-success"},qe={key:1,class:"text-danger"},ze={class:"btn-group"},Ge=["onClick"],Ke=["onClick"];function Qe(n,t,d,c,o,r){const b=f("AdminProductModal"),s=f("DelModal"),p=f("PaginationComponent"),g=f("VueLoading");return l(),i(T,null,[e("div",Ne,[e("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=a=>r.openModal("new"))}," 建立新的產品 ")]),e("div",$e,[e("div",Ae,[e("table",Oe,[Re,e("tbody",null,[(l(!0),i(T,null,V(o.products,a=>(l(),i("tr",{key:a.id},[e("td",null,h(a.category),1),e("td",null,h(a.title),1),e("td",Fe,h(a.origin_price),1),e("td",Se,h(a.price),1),e("td",null,[e("div",Be,[m(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:a.id,"onUpdate:modelValue":w=>a.is_enabled=w,"true-value":1,"false-value":0,onChange:w=>r.updateProduct(a)},null,40,He),[[P,a.is_enabled]]),e("label",{class:"form-check-label",for:a.id},[a.is_enabled?(l(),i("span",je,"啟用")):(l(),i("span",qe,"未啟用"))],8,Je)])]),e("td",null,[e("div",ze,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:w=>r.openModal("edit",a)}," 編輯 ",8,Ge),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:w=>r.openModal("delete",a)}," 刪除 ",8,Ke)])])]))),128))])])])]),_(b,{ref:"productModal","temp-content":o.temp,"is-new":o.isNew,onUpdateProduct:r.updateProduct},null,8,["temp-content","is-new","onUpdateProduct"]),_(s,{ref:"deleteProductModal",item:o.temp,onDeleteItem:r.deleteItem},null,8,["item","onDeleteItem"]),_(p,{pages:o.pagination,onChangePage:r.getProducts,"get-data":r.getProducts},null,8,["pages","onChangePage","get-data"]),_(g,{active:o.isLoading,"onUpdate:active":t[1]||(t[1]=a=>o.isLoading=a)},null,8,["active"])],64)}const Ze=k(De,[["render",Qe]]);export{Ze as default};