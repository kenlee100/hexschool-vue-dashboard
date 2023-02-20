import { defineStore } from "pinia";

export default defineStore("navListMenu", {
  state: () => ({
    navList: [
      // {
      //   path: "/admin",
      //   name: "後台管理",
      // },
      {
        path: "/admin/productlist",
        name: "行程管理",
      },
      {
        path: "/admin/blog",
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
