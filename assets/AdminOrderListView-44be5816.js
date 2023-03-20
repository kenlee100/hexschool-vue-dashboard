import{m as M,M as T,P as O,D as L}from"./PaginationComponent-86b3f4b1.js";import{_ as g,o as d,c as a,a as t,t as o,i as x,w as f,j as w,F as h,g as b,r as p,e as u}from"./index-4535df0f.js";const P={data(){return{modal:{},newTempContent:{}}},props:{tempContent:{type:Object,default(){}},isNew:{type:Boolean,default:!1}},watch:{tempContent(){this.newTempContent=this.tempContent}},mixins:[M],mounted(){this.$refs.modal.addEventListener("hidden.bs.modal",()=>{this.newTempContent={}}),this.modal=new T(this.$refs.modal,{backdrop:"static",keyboard:!1})}},V={ref:"modal",class:"modal fade"},D={class:"modal-dialog modal-xl"},E={class:"modal-content border-0"},I={class:"modal-header bg-dark text-white"},U=t("h5",{id:"productModalLabel",class:"modal-title"},[t("span",null,"訂單細節")],-1),N={class:"modal-body"},A={class:"row"},S={class:"col-md-6"},B=t("h3",null,"用戶資料",-1),J={class:"table table-striped table-hover mb-0"},R={key:0},j=t("th",{style:{width:"100px"}},"姓名",-1),F=t("th",null,"Email",-1),H=t("th",null,"電話",-1),q=t("th",null,"地址",-1),z={class:"col-md-6"},G=t("h3",null,"訂單細節",-1),K={class:"table table-striped table-hover mb-0"},Q=t("th",{style:{width:"100px"}},"訂單編號",-1),W=t("th",null,"下單時間",-1),X=t("th",null,"付款時間",-1),Y={key:0},Z={key:1},tt=t("th",null,"付款狀態",-1),et={key:0,class:"text-success"},st={key:1,class:"text-muted"},nt=t("th",null,"總金額",-1),ot={class:"d-flex justify-content-end py-3"},lt={class:"form-check form-switch"},dt={class:"form-check-label",for:"switch-paid"},at={key:0,class:"text-success"},it={key:1,class:"text-danger"},rt={class:"row"},ct=t("h3",null,"選購商品",-1),pt={class:"table"},ut=t("thead",null,[t("tr")],-1),ht={class:"text-end"},_t={class:"modal-footer"};function mt(n,e,y,C,s,r){return d(),a("div",V,[t("div",D,[t("div",E,[t("div",I,[U,t("button",{type:"button",class:"btn-close",onClick:e[0]||(e[0]=(...i)=>n.closeModal&&n.closeModal(...i))})]),t("div",N,[t("div",A,[t("div",S,[B,t("table",J,[s.newTempContent.user?(d(),a("tbody",R,[t("tr",null,[j,t("td",null,o(s.newTempContent.user.name),1)]),t("tr",null,[F,t("td",null,o(s.newTempContent.user.email),1)]),t("tr",null,[H,t("td",null,o(s.newTempContent.user.tel),1)]),t("tr",null,[q,t("td",null,o(s.newTempContent.user.address),1)])])):x("",!0)])]),t("div",z,[G,t("table",K,[t("tbody",null,[t("tr",null,[Q,t("td",null,o(s.newTempContent.id),1)]),t("tr",null,[W,t("td",null,o(n.$filters.date(s.newTempContent.create_at)),1)]),t("tr",null,[X,t("td",null,[s.newTempContent.paid_date?(d(),a("span",Y,o(n.$filters.date(s.newTempContent.paid_date)),1)):(d(),a("span",Z,"時間不正確"))])]),t("tr",null,[tt,t("td",null,[s.newTempContent.is_paid?(d(),a("strong",et,"已付款")):(d(),a("span",st,"尚未付款"))])]),t("tr",null,[nt,t("td",null,"$"+o(n.$filters.currency(s.newTempContent.total)),1)])])]),t("div",ot,[t("div",lt,[f(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"switch-paid","onUpdate:modelValue":e[1]||(e[1]=i=>s.newTempContent.is_paid=i)},null,512),[[w,s.newTempContent.is_paid]]),t("label",dt,[s.newTempContent.is_paid?(d(),a("span",at,"已付款")):(d(),a("span",it,"未付款"))])])])])]),t("div",rt,[t("div",null,[ct,t("table",pt,[ut,t("tbody",null,[(d(!0),a(h,null,b(s.newTempContent.products,i=>(d(),a("tr",{key:i.id},[t("th",null,o(i.product.title),1),t("td",null,o(i.qty)+" / "+o(i.product.unit),1),t("td",ht," $"+o(n.$filters.currency(i.final_total)),1)]))),128))])])])])]),t("div",_t,[t("button",{type:"button",class:"btn btn-outline-secondary",onClick:e[2]||(e[2]=(...i)=>n.closeModal&&n.closeModal(...i))}," 取消 "),t("button",{type:"button",class:"btn btn-primary",onClick:e[3]||(e[3]=i=>n.$emit("update-paid",s.newTempContent))}," 修改付款狀態 ")])])])],512)}const bt=g(P,[["render",mt]]),{VITE__URL:_,VITE__PATH:m}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},gt={data(){return{isLoading:!1,orders:[],temp:{},pagination:{},productId:""}},components:{PaginationComponent:O,AdminOrderModal:bt,DelModal:L},methods:{getOrder(n=1){this.isLoading=!0,this.$http.get(`${_}/api/${m}/admin/orders/?page=${n}`).then(e=>{this.orders=e.data.orders,this.pagination=e.data.pagination,this.isLoading=!1}).catch(e=>{alert(`${e.response.data.message}`),this.isLoading=!1})},deleteItem(n){this.$http.delete(`${_}/api/${m}/admin/order/${n}`).then(e=>{this.$refs.deleteOrderModal.closeModal(),this.getOrder(),alert(e.data.message)}).catch(e=>{alert(`${e.response.data.message}`)})},openModal(n,e){n==="view"?(this.temp=JSON.parse(JSON.stringify(e)),this.$refs.orderModal.openModal()):n==="delete"&&(this.temp=JSON.parse(JSON.stringify(e)),this.$refs.deleteOrderModal.openModal())},updatePaid(n){this.$http.put(`${_}/api/${m}/admin/order/${n.id}`,{data:{is_paid:n.is_paid}}).then(e=>{this.getOrder(),this.$refs.orderModal.closeModal(),alert(e.data.message)}).catch(e=>{alert(e.response.data.message)})}},mounted(){this.isLoading=!0,this.getOrder()}},ft={class:"mt-4 mb-4 p-3 bg-white shadow-sm"},wt={class:"table-responsive"},yt={class:"table table-striped table-hover mb-0"},Ct=t("thead",{class:"table-light"},[t("tr",null,[t("th",null,"購買時間"),t("th",null,"客戶資訊"),t("th",null,"購買品項"),t("th",{class:"text-end"},"應付金額"),t("th",{width:"120"},"是否付款"),t("th",{width:"120"},"編輯")])],-1),vt={class:"list-unstyled mb-0"},kt=t("span",null,"訂單編號：",-1),$t=t("span",null,"姓名：",-1),Mt=t("span",null,"Email：",-1),Tt={class:"list-group list-group-numbered mb-0"},Ot={class:"text-end"},Lt={class:"form-check form-switch"},xt=["id","onUpdate:modelValue","onChange"],Pt=["for"],Vt={key:0,class:"text-success"},Dt={key:1,class:"text-danger"},Et={class:"btn-group"},It=["onClick"],Ut=["onClick"];function Nt(n,e,y,C,s,r){const i=p("AdminOrderModal"),v=p("DelModal"),k=p("PaginationComponent"),$=p("VueLoading");return d(),a(h,null,[t("div",ft,[t("div",wt,[t("table",yt,[Ct,t("tbody",null,[(d(!0),a(h,null,b(s.orders,l=>(d(),a("tr",{key:l.id},[t("td",null,o(n.$filters.date(l.create_at)),1),t("td",null,[t("ul",vt,[t("li",null,[kt,t("span",null,o(l.id),1)]),t("li",null,[$t,t("span",null,o(l.user.name),1)]),t("li",null,[Mt,t("span",null,o(l.user.email),1)])])]),t("td",null,[t("ol",Tt,[(d(!0),a(h,null,b(l.products,c=>(d(),a("li",{class:"list-group-item ps-0 border border-0 bg-transparent",key:c.id},o(c.product.title),1))),128))])]),t("td",Ot,"$"+o(l.total),1),t("td",null,[t("div",Lt,[f(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:l.id,"onUpdate:modelValue":c=>l.is_paid=c,onChange:c=>r.updatePaid(l)},null,40,xt),[[w,l.is_paid]]),t("label",{class:"form-check-label",for:l.id},[l.is_paid?(d(),a("span",Vt,"已付款")):(d(),a("span",Dt,"未付款"))],8,Pt)])]),t("td",null,[t("div",Et,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:c=>r.openModal("view",l)}," 檢視 ",8,It),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:c=>r.openModal("delete",l)}," 刪除 ",8,Ut)])])]))),128))])])])]),u(i,{ref:"orderModal","temp-content":s.temp,onUpdatePaid:r.updatePaid},null,8,["temp-content","onUpdatePaid"]),u(v,{ref:"deleteOrderModal",item:s.temp,onDeleteItem:r.deleteItem,"item-title":s.temp.id},null,8,["item","onDeleteItem","item-title"]),u(k,{pages:s.pagination,onChangePage:r.getOrder,"get-data":r.getOrder},null,8,["pages","onChangePage","get-data"]),u($,{active:s.isLoading,"onUpdate:active":e[0]||(e[0]=l=>s.isLoading=l)},null,8,["active"])],64)}const Bt=g(gt,[["render",Nt]]);export{Bt as default};