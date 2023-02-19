import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "FrontLayout",
      component: () => import("../views/FrontLayout.vue"),
      // 巢狀路由
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "products",
          name: "products",
          component: () => import("../views/front/ProductListView.vue"),
        },
        {
          path: "product/:id", // 動態路由
          component: () => import("../views/front/ProductDetail.vue"),
        },
        {
          path: "blogs",
          name: "blog",
          component: () => import("../views/front/BLogView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/front/AboutView.vue"),
        },
        {
          path: "faq",
          name: "faq",
          component: () => import("../views/front/FaqView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("../views/front/CartView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/front/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "AdminLayout",
      component: () => import("../views/AdminLayout.vue"),
      // 巢狀路由
      children: [
        {
          path: "",
          name: "adminhome",
          component: () => import("../views/admin/AdminHomeView.vue"),
        },
        {
          path: "productlist",
          name: "productlist",
          component: () => import("../views/admin/AdminProductListView.vue"),
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("../views/admin/AdminBlogView.vue"),
        },
        {
          path: "coupon",
          name: "coupon",
          component: () => import("../views/admin/AdminCouponView.vue"),
        },
        {
          path: "orderlist",
          name: "orderlist",
          component: () => import("../views/admin/AdminOrderListView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: () => import("../views/404.vue"),
    },
  ],
});

export default router;
