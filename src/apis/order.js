const { VITE_PATH } = import.meta.env;
import request from "@/utils/request";

export const getOrder = (num) =>
  request({
    url: `/api/${VITE_PATH}/admin/orders/?page=${num}`,
    method: "GET",
  });

export const deleteOrderItem = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/orderd/${id}`,
    method: "DELETE",
  });

export const updatePaid = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/order/${id}`,
    method: "PUT",
  });
