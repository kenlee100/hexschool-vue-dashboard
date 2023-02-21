<template>
  <header
    class="header-bar sticky-top start-0 top-0 end-0 d-flex align-items-center p-3 bg-white shadow-sm"
  >
    <div class="dropdown ms-auto">
      <div
        class="profile-info dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div class="profile-info__img w-3 h-3 rounded-circle bg-light"></div>
      </div>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">登出</a></li>
      </ul>
    </div>
  </header>
</template>
