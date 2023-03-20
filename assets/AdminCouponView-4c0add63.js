import{m as T,M as $,D as V,P as x}from"./PaginationComponent-86b3f4b1.js";import{_ as g,o as a,c as d,a as e,w as p,v as m,j as w,t as b,r as h,e as _,F as D,g as L}from"./index-4535df0f.js";const U={data(){return{modal:{},newTempContent:{},due_date:""}},props:{tempContent:{type:Object,default(){}},isNew:{type:Boolean,default:!1}},watch:{tempContent(){this.newTempContent=this.tempContent;const o=new Date(this.newTempContent.due_date*1e3).toISOString().split("T");[this.due_date]=o},due_date(){this.newTempContent.due_date=Math.floor(new Date(this.due_date)/1e3)}},mixins:[T],mounted(){this.$refs.modal.addEventListener("hidden.bs.modal",()=>{this.newTempContent={}}),this.modal=new $(this.$refs.modal,{backdrop:"static",keyboard:!1})}},N={ref:"modal",class:"modal fade"},E={class:"modal-dialog"},I={class:"modal-content border-0"},P={class:"modal-header bg-dark text-white"},A={id:"productModalLabel",class:"modal-title"},B={key:0},O={key:1},R={class:"modal-body"},S={class:"mb-3"},j=e("label",{for:"title"},"標題",-1),F={class:"mb-3"},H=e("label",{for:"coupon_code"},"優惠碼",-1),q={class:"mb-3"},z=e("label",{for:"due_date"},"到期日",-1),G={class:"mb-3"},J=e("label",{for:"price"},"折扣百分比",-1),K={class:"mb-3"},Q={class:"form-check form-switch"},W={class:"form-check-label",for:"switch-coupon"},X={key:0,class:"text-success"},Y={key:1,class:"text-danger"},Z={class:"modal-footer"};function ee(o,t,c,u,n,i){return a(),d("div",N,[e("div",E,[e("div",I,[e("div",P,[e("h5",A,[c.isNew?(a(),d("span",B,"新增優惠卷")):(a(),d("span",O,"編輯優惠卷"))]),e("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=(...s)=>o.closeModal&&o.closeModal(...s))})]),e("div",R,[e("div",S,[j,p(e("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[1]||(t[1]=s=>n.newTempContent.title=s),placeholder:"請輸入標題"},null,512),[[m,n.newTempContent.title]])]),e("div",F,[H,p(e("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[2]||(t[2]=s=>n.newTempContent.code=s),placeholder:"請輸入優惠碼"},null,512),[[m,n.newTempContent.code]])]),e("div",q,[z,p(e("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[3]||(t[3]=s=>n.due_date=s)},null,512),[[m,n.due_date]])]),e("div",G,[J,p(e("input",{type:"number",class:"form-control",id:"price",min:"0",max:"100","onUpdate:modelValue":t[4]||(t[4]=s=>n.newTempContent.percent=s),placeholder:"請輸入折扣百分比"},null,512),[[m,n.newTempContent.percent,void 0,{number:!0}]])]),e("div",K,[e("div",Q,[p(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"switch-coupon","onUpdate:modelValue":t[5]||(t[5]=s=>n.newTempContent.is_enabled=s),"true-value":1,"false-value":0},null,512),[[w,n.newTempContent.is_enabled]]),e("label",W,[n.newTempContent.is_enabled?(a(),d("span",X,"啟用")):(a(),d("span",Y,"未啟用"))])])])]),e("div",Z,[e("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[6]||(t[6]=(...s)=>o.closeModal&&o.closeModal(...s))}," 取消 "),e("button",{type:"button",class:"btn btn-primary",onClick:t[7]||(t[7]=s=>o.$emit("update-coupon",n.newTempContent))},b(c.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const te=g(U,[["render",ee]]),{VITE__URL:f,VITE__PATH:C}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},oe={data(){return{isLoading:!1,isNew:!1,coupons:[],temp:{title:"",is_enabled:0,percent:100,code:""},pagination:{}}},components:{AdminCouponModal:te,DelModal:V,PaginationComponent:x},methods:{getCoupons(o=1){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/ken100/admin/coupons?page=${o}`).then(t=>{this.coupons=t.data.coupons,this.pagination=t.data.pagination,this.isLoading=!1}).catch(t=>{alert(`${t.response.data.message}`),this.isLoading=!1})},updateCoupon(o){let t=`${f}/api/${C}/admin/coupon`,c="post";this.isNew||(t=`${f}/api/${C}/admin/coupon/${o.id}`,c="put"),this.$http[c](t,{data:o}).then(u=>{this.$refs.couponModal.closeModal(),this.getCoupons(),alert(u.data.message)}).catch(u=>{alert(u.response.data.message)})},deleteItem(o){this.$http.delete(`${f}/api/${C}/admin/coupon/${o}`).then(t=>{this.$refs.deleteCouponModal.closeModal(),this.getCoupons(),alert(t.data.message)}).catch(t=>{alert(`${t.response.data.message}`)})},openModal(o,t){o==="new"?(this.isNew=!0,this.$refs.couponModal.openModal(),this.temp={due_date:new Date().getTime()/1e3}):o==="edit"?(this.isNew=!1,this.temp={...t},this.$refs.couponModal.openModal()):o==="delete"&&(this.temp={...t},this.$refs.deleteCouponModal.openModal())}},mounted(){this.isLoading=!0,this.getCoupons()}},ne={class:"text-end mt-4"},se={class:"mt-4 mb-4 p-3 bg-white shadow-sm"},le={class:"table-responsive"},ae={class:"table table-striped table-hover mb-0"},de=e("thead",{class:"table-light"},[e("tr",null,[e("th",null,"名稱"),e("th",null,"折扣百分比"),e("th",null,"到期日"),e("th",null,"是否啟用"),e("th",null,"編輯")])],-1),ie={class:"form-check form-switch"},ce=["id","onUpdate:modelValue","onChange"],pe=["for"],ue={key:0,class:"text-success"},re={key:1,class:"text-danger"},me={class:"btn-group"},he=["onClick"],_e=["onClick"];function be(o,t,c,u,n,i){const s=h("VueLoading"),v=h("AdminCouponModal"),M=h("DelModal"),k=h("PaginationComponent");return a(),d("div",null,[_(s,{active:n.isLoading},null,8,["active"]),e("div",ne,[e("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=l=>i.openModal("new"))}," 建立新的優惠券 ")]),e("div",se,[e("div",le,[e("table",ae,[de,e("tbody",null,[(a(!0),d(D,null,L(n.coupons,(l,y)=>(a(),d("tr",{key:y},[e("td",null,b(l.title),1),e("td",null,b(l.percent)+"%",1),e("td",null,b(o.$filters.date(l.due_date)),1),e("td",null,[e("div",ie,[p(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:l.id,"onUpdate:modelValue":r=>l.is_enabled=r,"true-value":1,"false-value":0,onChange:r=>i.updateCoupon(l)},null,40,ce),[[w,l.is_enabled]]),e("label",{class:"form-check-label",for:l.id},[l.is_enabled?(a(),d("span",ue,"啟用")):(a(),d("span",re,"未啟用"))],8,pe)])]),e("td",null,[e("div",me,[e("button",{class:"btn btn-outline-primary btn-sm",onClick:r=>i.openModal("edit",l)}," 編輯 ",8,he),e("button",{class:"btn btn-outline-danger btn-sm",onClick:r=>i.openModal("delete",l)}," 刪除 ",8,_e)])])]))),128))])])])]),_(v,{"temp-content":n.temp,"is-new":n.isNew,ref:"couponModal",onUpdateCoupon:i.updateCoupon},null,8,["temp-content","is-new","onUpdateCoupon"]),_(M,{ref:"deleteCouponModal",item:n.temp,onDeleteItem:i.deleteItem},null,8,["item","onDeleteItem"]),_(k,{pages:n.pagination,onChangePage:i.getCoupons,"get-data":i.getCoupons},null,8,["pages","onChangePage","get-data"])])}const ge=g(oe,[["render",be]]);export{ge as default};
