import { defineStore } from "pinia";
import { localToken, localUserName } from "@/utils/auth";
const { VITE__URL } = import.meta.env;
export const userStore = defineStore("user", {
  state: () => ({
    token: localToken.get(),
    userInfo: { name: localUserName.get() } || {},
  }),
  actions: {
    async login(data) {
      this.$http
        .post(`${VITE__URL}/admin/signin`, this.loginData)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `userToken=${token}; expires=${new Date(expired)};`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          //   toast.fire({
          //     icon: "error",
          //     title: `${err.data.message}`,
          //   });
        });
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
    //   this.routerList = [];
    },
  },
});
