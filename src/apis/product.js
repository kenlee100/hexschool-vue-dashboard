const { VITE_PATH } = import.meta.env;
import request from "@/utils/request";

export const getProducts = (num) =>
  request({
    url: `/api/${VITE_PATH}/admin/products/?page=${num}`,
    method: "GET",
  });

export const deleteItem = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/product/${id}`,
    method: "DELETE",
  });

export const updateProduct = (method = "POST", content = "", data) =>
  request({
    url: `/api/${VITE_PATH}/admin/product/${content}`,
    method,
    data,
  });
