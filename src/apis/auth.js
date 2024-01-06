import request from "@/utils/request";
export const userLogin = (data) =>
  request({
    url: `/admin/signin`,
    method: "POST",
    data,
  });

export const checkLogin = () =>
  request({
    url: `/api/user/check`,
    method: "POST",
  });

export const logout = () =>
  request({
    url: `/logout`,
    method: "POST",
  });
