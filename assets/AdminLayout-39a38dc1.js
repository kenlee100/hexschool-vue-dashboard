import{d as w,m as $,_ as p,r as l,o,c as s,a as e,e as i,f as _,F as y,g as b,h as m,t as g,b as L,R as T}from"./index-4535df0f.js";const x=w("adminNavListMenu",{state:()=>({navList:[{path:"/admin/products",name:"行程管理"},{path:"/admin/article",name:"文章管理"},{path:"/admin/coupon",name:"優惠券管理"},{path:"/admin/orderlist",name:"訂單列表"}]})}),B={computed:{...$(x,["navList"])}},N={class:"sidebar position-fixed start-0 top-0 bottom-0 z-10 d-flex flex-column h-100 overflow-x-hidden overflow-y-auto"},P={class:"brand-section flex-shrink-0 p-4"},V={class:"sidebar-menu list-unstyled mb-0"};function E(t,n,c,u,h,a){const r=l("router-link");return o(),s("div",N,[e("div",P,[i(r,{class:"flex w-full h-20 justify-content-center align-items-center text-decoration-none text-white",to:"/admin"},{default:_(()=>[m("Admin")]),_:1})]),e("ul",V,[(o(!0),s(y,null,b(t.navList,d=>(o(),s("li",{class:"",key:d.path},[i(r,{class:"d-block py-3 px-4 fs-6 text-decoration-none text-white",to:d.path},{default:_(()=>[m(g(d.name),1)]),_:2},1032,["to"])]))),128))])])}const R=p(B,[["render",E]]),A={props:{logout:{type:Function,default(){}}}},S={class:"header-bar sticky-top start-0 top-0 end-0 d-flex align-items-center p-3 bg-white shadow-sm"},D={class:"dropdown ms-auto",ref:"dropdown"},H=e("div",{class:"profile-info dropdown-toggle","data-bs-toggle":"dropdown"},[e("div",{class:"profile-info__img d-flex justify-content-center align-items-center w-3 h-3 rounded-circle bg-light"},[e("i",{class:"bi bi-person-fill"})])],-1),M={class:"dropdown-menu"};function C(t,n,c,u,h,a){return o(),s("header",S,[e("div",D,[H,e("ul",M,[e("li",null,[e("a",{class:"dropdown-item",href:"#",onClick:n[0]||(n[0]=L((...r)=>c.logout&&c.logout(...r),["prevent"]))},"登出")])])],512)])}const F=p(A,[["render",C]]),I={props:{pageTitle:{type:String,require:!0}},computed:{...$(x,["navList"]),getPath(){return this.navList.filter(t=>t.path===this.$route.path)}}},U={class:"page-title pt-4"},j={key:0,class:"fs-4 text-secondary"},z={key:1,class:"fs-4 text-secondary"};function O(t,n,c,u,h,a){return o(),s("div",U,[a.getPath.length>0?(o(),s("h2",j,g(a.getPath[0].name),1)):(o(),s("h2",z,"後台管理"))])}const q=p(I,[["render",O]]),{VITE__URL:f}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},G={components:{RouterView:T,NavBar:R,HeaderBar:F,PageTitle:q},methods:{checkLogin(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,"$1");t?(this.$http.defaults.headers.common.Authorization=t,this.$http.post(`${f}/api/user/check`).then(()=>{}).catch(n=>{this.$router.push("/"),alert(`${n.response.data.message}`)})):(alert("請先登入"),this.$router.push("/"))},logout(){this.$http.post(`${f}/logout`).then(t=>{alert(t.data.message),document.cookie="userToken=;expires=;",this.$router.push("/")}).catch(t=>{alert(`${t.response.data.message}`)})}},created(){this.checkLogin()}},J={class:"layout-content d-flex flex-column h-100"},K={class:"data-section flex-grow-1 pb-3"},Q={class:"container-fluid"};function W(t,n,c,u,h,a){const r=l("NavBar"),d=l("HeaderBar"),v=l("PageTitle"),k=l("router-view");return o(),s("div",J,[i(r),e("section",K,[i(d,{logout:a.logout},null,8,["logout"]),e("div",Q,[i(v,{"page-title":"test"}),i(k)])])])}const Y=p(G,[["render",W]]);export{Y as default};
