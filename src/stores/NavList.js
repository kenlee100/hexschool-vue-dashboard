import { defineStore } from "pinia";

export default defineStore("adminNavListMenu", {
  state: () => ({
    navList: [
      // {
      //   path: "/admin",
      //   name: "後台管理",
      // },
      {
        path: "/admin/products",
        name: "行程管理",
      },
      {
        path: "/admin/article",
        name: "文章管理",
      },
      {
        path: "/admin/coupon",
        name: "優惠券管理",
      },
      {
        path: "/admin/orderlist",
        name: "訂單列表",
      },
      // {
      //   path: "/",
      //   name: "回到前台",
      // },
    ],
  }),
});
