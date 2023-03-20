<template>
  <header
    class="header-bar sticky-top start-0 top-0 end-0 d-flex align-items-center p-3 bg-white shadow-sm"
  >
    <div class="dropdown ms-auto" ref="dropdown">
      <div class="profile-info dropdown-toggle" data-bs-toggle="dropdown">
        <div
          class="profile-info__img d-flex justify-content-center align-items-center w-3 h-3 rounded-circle bg-light"
        >
          <i class="bi bi-person-fill"></i>
        </div>
      </div>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
// import * as bootstrap from "bootstrap";
export default {
  props: {
    logout: {
      type: Function,
      default() {},
    },
  },
};
</script>
