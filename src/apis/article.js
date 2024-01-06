const { VITE_PATH } = import.meta.env;
import request from "@/utils/request";

export const getArticles = (num) =>
  request({
    url: `/api/${VITE_PATH}/admin/articles/?page=${num}`,
    method: "GET",
  });

export const getArticleItem = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/article/${id}`,
    method: "GET",
  });

export const deleteItem = (id) =>
  request({
    url: `/api/${VITE_PATH}/admin/article/${id}`,
    method: "DELETE",
  });

export const updateArticle = (method = "POST", content = "", data) =>
  request({
    url: `/api/${VITE_PATH}/admin/article/${content}`,
    method,
    data,
  });
