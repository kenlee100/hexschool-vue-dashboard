import{m as T,M as V,D as x,P as D}from"./PaginationComponent-314f6a30.js";import{_ as y,r as u,o as i,c as d,a as e,f as a,g as L,n as w,w as k,v as U,k as $,t as g,F as E,h as N}from"./index-4cba5261.js";import{t as b}from"./toast-ffc4b616.js";import{u as p}from"./common-f565fb83.js";const P={data(){return{modal:{},newTempContent:{},due_date:""}},props:{tempContent:{type:Object,default(){}},isNew:{type:Boolean,default:!1}},watch:{tempContent(){this.newTempContent=this.tempContent;const o=new Date(this.newTempContent.due_date*1e3).toISOString().split("T");[this.due_date]=o},due_date(){this.newTempContent.due_date=Math.floor(new Date(this.due_date)/1e3)}},mixins:[T],mounted(){this.$refs.modal.addEventListener("hidden.bs.modal",()=>{this.newTempContent={}}),this.modal=new V(this.$refs.modal,{backdrop:"static",keyboard:!1})}},I={ref:"modal",class:"modal fade"},A={class:"modal-dialog"},F={class:"modal-content border-0"},S={class:"modal-header bg-dark text-white"},B={id:"productModalLabel",class:"modal-title"},O={key:0},R={key:1},q={class:"modal-body"},H={class:"mb-3"},j=e("label",{for:"title"},"標題",-1),z={class:"mb-3"},G=e("label",{for:"coupon_code"},"優惠碼",-1),J={class:"mb-3"},K=e("label",{for:"due_date"},"到期日",-1),Q=["min"],W={class:"mb-3"},X=e("label",{for:"percent"},"折扣百分比",-1),Y={class:"mb-3"},Z={class:"form-check form-switch"},ee={class:"form-check-label",for:"switch-coupon"},te={key:0,class:"text-success"},oe={key:1,class:"text-danger"},ne={class:"modal-footer"},se={type:"submit",class:"btn btn-primary"};function le(o,t,r,m,n,c){const _=u("VField"),h=u("ErrorMessage"),C=u("VForm");return i(),d("div",I,[e("div",A,[e("div",F,[a(C,{onSubmit:t[7]||(t[7]=s=>o.$emit("update-coupon",n.newTempContent))},{default:L(({errors:s})=>[e("div",S,[e("h5",B,[r.isNew?(i(),d("span",O,"新增優惠卷")):(i(),d("span",R,"編輯優惠卷"))]),e("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...l)=>o.closeModal&&o.closeModal(...l))})]),e("div",q,[e("div",H,[j,a(_,{type:"text",name:"title",label:"標題",class:w(["form-control",{"is-invalid":s.title}]),id:"title",rules:"required",modelValue:n.newTempContent.title,"onUpdate:modelValue":t[1]||(t[1]=l=>n.newTempContent.title=l),placeholder:"請輸入標題"},null,8,["class","modelValue"]),a(h,{name:"title",class:"text-danger"})]),e("div",z,[G,a(_,{type:"text",name:"coupon_code",label:"優惠碼",class:w(["form-control",{"is-invalid":s.coupon_code}]),id:"coupon_code",rules:"required",modelValue:n.newTempContent.code,"onUpdate:modelValue":t[2]||(t[2]=l=>n.newTempContent.code=l),placeholder:"請輸入優惠碼"},null,8,["class","modelValue"]),a(h,{name:"coupon_code",class:"text-danger"})]),e("div",J,[K,k(e("input",{type:"date",class:"form-control",id:"due_date",min:n.due_date,"onUpdate:modelValue":t[3]||(t[3]=l=>n.due_date=l)},null,8,Q),[[U,n.due_date]])]),e("div",W,[X,a(_,{type:"number",name:"percent",label:"折扣百分比",class:w(["form-control",{"is-invalid":s.percent}]),id:"price",min:"0",max:"100",rules:{required:!0,max_value:100,regex:/^(0|[1-9][0-9]?|100)$/},modelValue:n.newTempContent.percent,"onUpdate:modelValue":t[4]||(t[4]=l=>n.newTempContent.percent=l),modelModifiers:{number:!0},placeholder:"請輸入折扣百分比"},null,8,["class","rules","modelValue"]),a(h,{name:"percent",class:"text-danger"})]),e("div",Y,[e("div",Z,[k(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"switch-coupon","onUpdate:modelValue":t[5]||(t[5]=l=>n.newTempContent.is_enabled=l),"true-value":1,"false-value":0},null,512),[[$,n.newTempContent.is_enabled]]),e("label",ee,[n.newTempContent.is_enabled?(i(),d("span",te,"啟用")):(i(),d("span",oe,"未啟用"))])])])]),e("div",ne,[e("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[6]||(t[6]=(...l)=>o.closeModal&&o.closeModal(...l))}," 取消 "),e("button",se,g(r.isNew?"新增優惠卷":"更新優惠券"),1)])]),_:1})])])],512)}const ae=y(P,[["render",le]]),{VITE__URL:v,VITE__PATH:M}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},ie={data(){return{isNew:!1,coupons:[],temp:{title:"",is_enabled:0,percent:100,code:""},pagination:{}}},components:{AdminCouponModal:ae,DelModal:x,PaginationComponent:D},methods:{getCoupons(o=1){p().isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/ken100/admin/coupons?page=${o}`).then(t=>{this.coupons=t.data.coupons,this.pagination=t.data.pagination,p().isLoading=!1}).catch(t=>{p().isLoading=!1,b.fire({icon:"error",title:`${t.response.data.message}`})})},updateCoupon(o){let t=`${v}/api/${M}/admin/coupon`,r="post";this.isNew||(t=`${v}/api/${M}/admin/coupon/${o.id}`,r="put"),this.$http[r](t,{data:o}).then(m=>{this.$refs.couponModal.closeModal(),this.getCoupons(),this.isNew=!1,b.fire({icon:"success",title:m.data.message})}).catch(m=>{p().isLoading=!1,b.fire({icon:"error",title:`${m.response.data.message}`})})},deleteItem(o){p().isProcessing=!0,this.$http.delete(`${v}/api/${M}/admin/coupon/${o}`).then(t=>{this.$refs.deleteCouponModal.closeModal(),this.getCoupons(),b.fire({icon:"success",title:t.data.message})}).catch(t=>{p().isLoading=!1,b.fire({icon:"error",title:`${t.response.data.message}`})})},openModal(o,t){o==="new"?(this.isNew=!0,this.$refs.couponModal.openModal(),this.temp={due_date:new Date().getTime()/1e3}):o==="edit"?(this.isNew=!1,this.temp={...t},this.$refs.couponModal.openModal()):o==="delete"&&(this.temp={...t},this.$refs.deleteCouponModal.openModal())}},mounted(){p().isLoading=!0,this.getCoupons()}},de={class:"text-end mt-4"},ce={class:"mt-4 mb-4 p-3 bg-white shadow-sm"},pe={class:"table-responsive"},re={class:"table table-striped table-hover mb-0"},ue=e("thead",{class:"table-light"},[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",null,"是否啟用"),e("th",null,"編輯")])],-1),me={class:"form-check form-switch"},_e=["id","onUpdate:modelValue","onChange"],he=["for"],be={key:0,class:"text-success"},fe={key:1,class:"text-danger"},ge={class:"btn-group"},Ce=["onClick"],we=["onClick"];function ve(o,t,r,m,n,c){const _=u("AdminCouponModal"),h=u("DelModal"),C=u("PaginationComponent");return i(),d("div",null,[e("div",de,[e("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=s=>c.openModal("new"))}," 建立新的優惠券 ")]),e("div",ce,[e("div",pe,[e("table",re,[ue,e("tbody",null,[(i(!0),d(E,null,N(n.coupons,(s,l)=>(i(),d("tr",{key:l},[e("td",null,g(s.title),1),e("td",null,g(s.percent)+"%",1),e("td",null,g(o.$filters.date(s.due_date)),1),e("td",null,[e("div",me,[k(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:s.id,"onUpdate:modelValue":f=>s.is_enabled=f,"true-value":1,"false-value":0,onChange:f=>c.updateCoupon(s)},null,40,_e),[[$,s.is_enabled]]),e("label",{class:"form-check-label",for:s.id},[s.is_enabled?(i(),d("span",be,"啟用")):(i(),d("span",fe,"未啟用"))],8,he)])]),e("td",null,[e("div",ge,[e("button",{class:"btn btn-outline-primary btn-sm",onClick:f=>c.openModal("edit",s)}," 編輯 ",8,Ce),e("button",{class:"btn btn-outline-danger btn-sm",onClick:f=>c.openModal("delete",s)}," 刪除 ",8,we)])])]))),128))])])])]),a(_,{"temp-content":n.temp,"is-new":n.isNew,ref:"couponModal",onUpdateCoupon:c.updateCoupon},null,8,["temp-content","is-new","onUpdateCoupon"]),a(h,{ref:"deleteCouponModal",item:n.temp,onDeleteItem:c.deleteItem},null,8,["item","onDeleteItem"]),a(C,{pages:n.pagination,onChangePage:c.getCoupons,"get-list":c.getCoupons},null,8,["pages","onChangePage","get-list"])])}const Te=y(ie,[["render",ve]]);export{Te as default};
