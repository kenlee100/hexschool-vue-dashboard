<template>
  <div class="container">
    <h1>admin</h1>
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="loginData.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="loginData.password"
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${VITE_APP_URL}/admin/signin`, this.loginData)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `userToken=${token}; expires=${new Date(expired)};`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
</script>
