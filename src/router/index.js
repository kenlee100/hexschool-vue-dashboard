import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/front/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "AdminLayout",
      component: () => import("@/views/AdminLayout.vue"),
      // 巢狀路由
      children: [
        {
          path: "",
          name: "AdminHome",
          component: () => import("@/views/admin/AdminHomeView.vue"),
        },
        {
          path: "products",
          name: "AdminProducts",
          component: () => import("@/views/admin/AdminProductListView.vue"),
        },
        {
          path: "article",
          name: "AdminArticle",
          component: () => import("@/views/admin/AdminArticleView.vue"),
        },
        {
          path: "coupon",
          name: "coupon",
          component: () => import("@/views/admin/AdminCouponView.vue"),
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: () => import("@/views/admin/AdminOrderListView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: () => import("@/views/404View.vue"),
    },
  ],
  linkActiveClass: "active",
});

export default router;
