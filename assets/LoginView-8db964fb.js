import{t as d}from"./toast-ffc4b616.js";import{_ as c,o as m,c as _,a as s,w as r,v as l,b as p}from"./index-4cba5261.js";const{VITE__URL:u}={VITE__PATH:"ken100",VITE__URL:"https://vue3-course-api.hexschool.io/v2",BASE_URL:"/hexschool-vue-dashboard",MODE:"production",DEV:!1,PROD:!0},h={data(){return{loginData:{username:"",password:""}}},methods:{login(){this.$http.post(`${u}/admin/signin`,this.loginData).then(t=>{const{token:o,expired:i}=t.data;document.cookie=`userToken=${o}; expires=${new Date(i)};`,this.$router.push("/admin")}).catch(t=>{d.fire({icon:"error",title:`${t.data.message}`})})}}},f={class:"w-100 h-100 bg-light"},g={class:"container d-flex flex-column h-100"},w={class:"overflow-auto row align-items-center h-100"},v={class:"col-lg-6 mx-auto"},x={class:"p-4 bg-white"},b=s("div",{class:"position-relative mt-n4"},[s("h1",{class:"text-center"},"JAPAN TRIP")],-1),D={class:"row justify-content-center"},E=s("h3",{class:"mb-3 font-weight-normal text-center"},"後台管理",-1),V={id:"form",class:"form-signin"},k={class:"form-floating mb-3"},T=s("label",{for:"username"},"Email address",-1),P={class:"form-floating"},y=s("label",{for:"password"},"Password",-1);function R(t,o,i,U,n,a){return m(),_("div",f,[s("div",g,[s("div",w,[s("div",v,[s("div",x,[b,s("div",D,[E,s("form",V,[s("div",k,[r(s("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":o[0]||(o[0]=e=>n.loginData.username=e)},null,512),[[l,n.loginData.username]]),T]),s("div",P,[r(s("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":o[1]||(o[1]=e=>n.loginData.password=e)},null,512),[[l,n.loginData.password]]),y]),s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit",onClick:o[2]||(o[2]=p((...e)=>a.login&&a.login(...e),["prevent"]))}," 登入 ")])])])])])])])}const I=c(h,[["render",R]]);export{I as default};