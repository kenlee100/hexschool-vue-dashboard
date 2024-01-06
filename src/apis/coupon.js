const { VITE_PATH } = import.meta.env;
import request from "@/utils/request";

export const getCoupons = (num) =>
  request({
    url: `/api/${VITE_PATH}/admin/coupons?page=${num}`,
    method: "GET",
  });

export const deleteItem = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/coupon/${id}`,
    method: "DELETE",
  });

export const updateCoupon = (method = "POST", content = "", data) =>
  request({
    url: `/api/${VITE_PATH}/admin/coupon/${content}`,
    method,
    data,
  });
