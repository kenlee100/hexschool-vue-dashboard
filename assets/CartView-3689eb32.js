import{_ as w,r as v,o as r,c as i,a as t,h as u,F as y,e as E,t as m,b as n,w as V,d as x,f as C,v as I,n as h}from"./index-095202d5.js";const{VITE__URL:f,VITE__PATH:g}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},U={data(){return{isLoading:!1,loadingStatus:{loadingItem:""},products:[],tempProduct:{imagesUrl:[]},productId:"",cart:{},form:{user:{name:"",email:"",tel:"",address:"",city:""},message:""}}},methods:{getCartList(){this.$http.get(`${f}/api/${g}/cart`).then(l=>{this.cart=l.data.data,this.isLoading=!1}).catch(l=>{alert(`${l.response.data.message}`),this.isLoading=!1})},async deleteCartItem(l){this.loadingStatus.loadingItem=l.id;try{const e=await this.$http.delete(`${f}/api/${g}/cart/${l.id}`);this.loadingStatus.loadingItem="",await this.getCartList();const{product:{title:d}}=l,{message:b}=e.data;alert(`${d} ${b}`)}catch(e){alert(`${e.response.data.message}`)}},async clearCartItem(){if(confirm("確定清除購物車嗎？"))try{const e=await this.$http.delete(`${f}/api/${g}/carts`);await this.getCartList();const{message:d}=e.data;setTimeout(()=>{alert(`${d} 購物車`)},500)}catch(e){alert(`${e.response.data.message}`)}},async updateCart(l){this.loadingStatus.loadingItem=l.id;try{await this.$http.put(`${f}/api/${g}/cart/${l.id}`,{data:{product_id:l.product_id,qty:l.qty}}),this.loadingStatus.loadingItem="",await this.getCartList();const{product:{title:e}}=l;alert(`已更新 品名：${e} 數量`)}catch(e){alert(`${e.response.data.message}`)}},isPhone(l){return/^(09)[0-9]{8}$/.test(l)?!0:"請填入正確的手機號碼"},async createOrder(){const l=this.form;try{const e=await this.$http.post(`${f}/api/${g}/order`,{data:l}),{message:d,orderId:b}=e.data;alert(` ${d} ，訂單編號 ${b}`),this.$refs.form.resetForm(),this.form.message="",await this.getCartList()}catch(e){alert(`${e.response.data.message}`)}}},mounted(){this.isLoading=!0,this.getCartList()}},S=t("h1",null,"Cart",-1),T={class:"container"},q={class:"mt-4"},F={key:0,class:"text-end"},$={class:"table align-middle"},B=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",{class:"text-end"},"單價"),t("th",{class:"text-end"},"總價")])],-1),N=["onClick","disabled"],P={key:0,class:"fas fa-spinner fa-pulse"},D={key:0,class:"text-success"},O={class:"input-group input-group-sm"},R={class:"input-group my-3"},A=["onUpdate:modelValue","onBlur","disabled"],H={class:"input-group-text",id:"basic-addon2"},M={class:"text-end"},j={key:0,class:"text-success"},z={class:"text-end"},G=t("td",{colspan:"4",class:"text-end"},"總計",-1),J={class:"text-end"},K={key:0},Q=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),W={class:"text-end text-success"},X={class:"my-5 row justify-content-center"},Y={class:"mb-3"},Z=t("label",{for:"email",class:"form-label"},"Email",-1),tt={class:"mb-3"},et=t("label",{for:"name",class:"form-label"},"收件人姓名",-1),st={class:"mb-3"},at=t("label",{for:"phone",class:"form-label"},"收件人手機",-1),lt={class:"mb-3"},ot=t("label",{for:"city",class:"form-label"},"地區",-1),nt=t("option",{value:""},"請選擇地區",-1),rt=t("option",{value:"台北市"},"台北市",-1),it=t("option",{value:"高雄市"},"高雄市",-1),dt={class:"mb-3"},ct=t("label",{for:"address",class:"form-label"},"收件人地址",-1),ut={class:"mb-3"},mt=t("label",{for:"message",class:"form-label"},"留言",-1),_t=t("div",{class:"text-end"},[t("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function pt(l,e,d,b,s,c){const _=v("Field"),p=v("error-message"),k=v("Form"),L=v("VueLoading");return r(),i(y,null,[S,t("div",T,[t("div",q,[s.cart.carts&&s.cart.carts.length>0?(r(),i("div",F,[t("button",{class:"btn btn-outline-danger",type:"button",onClick:e[0]||(e[0]=(...a)=>c.clearCartItem&&c.clearCartItem(...a))}," 清空購物車 ")])):u("",!0),t("table",$,[B,t("tbody",null,[s.cart.carts?(r(!0),i(y,{key:0},E(s.cart.carts,a=>(r(),i("tr",{key:a.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:o=>c.deleteCartItem(a),disabled:s.loadingStatus.loadingItem===a.id},[s.loadingStatus.loadingItem===a.id?(r(),i("i",P)):u("",!0),x(" x ")],8,N)]),t("td",null,[x(m(a.product.title)+" ",1),a.coupon?(r(),i("div",D,"已套用優惠券")):u("",!0)]),t("td",null,[t("div",O,[t("div",R,[C(t("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":o=>a.qty=o,onBlur:o=>c.updateCart(a),disabled:s.loadingStatus.loadingItem===a.id},null,40,A),[[I,a.qty,void 0,{number:!0}]]),t("span",H,m(a.product.unit),1)])])]),t("td",M,[t("span",null,"$"+m(a.product.price),1),s.cart.final_total!==s.cart.total?(r(),i("small",j,"折扣價：")):u("",!0)]),t("td",z,[t("span",null,"$"+m(a.final_total),1)])]))),128)):u("",!0)]),t("tfoot",null,[t("tr",null,[G,t("td",J,"$"+m(s.cart.total),1)]),s.cart.final_total!==s.cart.total?(r(),i("tr",K,[Q,t("td",W,"$"+m(s.cart.final_total),1)])):u("",!0)])])]),t("div",X,[n(k,{ref:"form",class:"col-md-6",onSubmit:c.createOrder},{default:V(({errors:a})=>[t("div",Y,[Z,n(_,{id:"email",name:"Email",type:"email",class:h(["form-control",{"is-invalid":a.Email}]),modelValue:s.form.user.email,"onUpdate:modelValue":e[1]||(e[1]=o=>s.form.user.email=o),placeholder:"請輸入 Email",rules:"required|email"},null,8,["class","modelValue"]),n(p,{name:"Email",class:"invalid-feedback"})]),t("div",tt,[et,n(_,{id:"name",name:"姓名",type:"text",class:h(["form-control",{"is-invalid":a.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:s.form.user.name,"onUpdate:modelValue":e[2]||(e[2]=o=>s.form.user.name=o)},null,8,["class","modelValue"]),n(p,{name:"姓名",class:"invalid-feedback"})]),t("div",st,[at,n(_,{id:"tel",name:"手機",type:"tel",class:h(["form-control",{"is-invalid":a.手機}]),placeholder:"請輸入手機",rules:c.isPhone,modelValue:s.form.user.tel,"onUpdate:modelValue":e[3]||(e[3]=o=>s.form.user.tel=o)},null,8,["class","rules","modelValue"]),n(p,{name:"手機",class:"invalid-feedback"})]),t("div",lt,[ot,n(_,{id:"city",name:"地區",class:h(["form-control",{"is-invalid":a.地區}]),placeholder:"請輸入地區",rules:"required",as:"select",modelValue:s.form.user.city,"onUpdate:modelValue":e[4]||(e[4]=o=>s.form.user.city=o)},{default:V(()=>[nt,rt,it]),_:2},1032,["class","modelValue"]),n(p,{name:"地區",class:"invalid-feedback"})]),t("div",dt,[ct,n(_,{id:"address",name:"地址",type:"text",class:h(["form-control",{"is-invalid":a.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:s.form.user.address,"onUpdate:modelValue":e[5]||(e[5]=o=>s.form.user.address=o)},null,8,["class","modelValue"]),n(p,{name:"地址",class:"invalid-feedback"})]),t("div",ut,[mt,C(t("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":e[6]||(e[6]=o=>s.form.message=o)},null,512),[[I,s.form.message]])]),_t]),_:1},8,["onSubmit"])])]),n(L,{active:s.isLoading,"onUpdate:active":e[7]||(e[7]=a=>s.isLoading=a)},null,8,["active"])],64)}const ft=w(U,[["render",pt]]);export{ft as default};
