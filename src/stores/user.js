import { defineStore } from "pinia";
import { userLogin, logout, checkLogin } from "@/apis/auth";
import { localToken, localUserName } from "@/utils/auth";
import router from "@/router";
import toast from "@/utils/toast";
import { useLoadingState } from "@/stores/common";
export const userStore = defineStore("user", {
  state: () => ({
    token: localToken.get(),
    userInfo: { name: localUserName.get() } || {},
  }),
  actions: {
    async login(data) {
      // try {
      //   const loginData = {
      //     username: data.username,
      //     password: data.password,
      //   };
      //   const res = await userLogin(loginData);
      //   useLoadingState().isLoading = false;
      //   const { token, expired } = res;
      //   document.cookie = `userToken=${token}; expires=${new Date(expired)};`;

      //   this.setToken(res.token);
      //   // this.setUserName(res.name);
      //   return res;
      // } catch (error) {
      //   return Promise.reject(error);
      // }
      const loginData = {
        username: data.username,
        password: data.password,
      };
      const res = await userLogin(loginData);
      useLoadingState().isLoading = false;
      const { token, expired } = res;
      document.cookie = `userToken=${token}; expires=${new Date(expired)};`;

      this.setToken(res.token);
    },
    async logout() {
      useLoadingState().isLoading = true;
      await logout();
      document.cookie = "userToken=;expires=;";
      this.cleanTokenAndInfo();
      router.push("/");
    },
    async checkLogin() {
      console.log('checklogin');
      useLoadingState().isLoading = true;
      const token = document.cookie.replace(
        // userToken Token名稱
        /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // console.log("token");

      try {
        if (token) {
          await checkLogin();
          useLoadingState().isLoading = false;
        } else {
          toast
            .fire({
              icon: "error",
              title: `請先登入`,
            })
            .then(() => {
              console.log("router", router);
              // router.push("/");
            });
        }
      } catch (err) {
        console.log("checkLogin", err);
        useLoadingState().isLoading = false;
        toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
        router.push("/");
      }
    },
    setToken(access_token) {
      localToken.set(access_token);
      this.token = access_token;
    },
    setUserName(username) {
      localUserName.set(username);
      this.userInfo.name = username;
    },

    cleanTokenAndInfo() {
      this.token = "";
      this.userInfo = {};
      localToken.remove();
      localUserName.remove();
    },
  },
});
