<template>
  <div id="mobile-menu">
    <a class="mobile-side-menu" @click="toggleSideMenu()">
      <Fa :icon="['fas', 'bars']" />
    </a>
    <img
      src="@/assets/images/tusd_logo_mini.svg"
      class="logo"
      alt="ТУС Д+"
      @click="toggleSideMenu()"
    />
    <a v-b-toggle.profile-menu class="profile-menu-btn mobile">
      <i class="bx bx-user bx-md"></i>
      <i class="bx bx-chevron-down"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',

  methods: {
    toggleSideMenu() {
      const menu = document.querySelector('#side-menu');
      menu.setAttribute('class', 'show');
      document.body.removeAttribute('class', 'vertical-collapsed');
    },
  },
};
</script>
