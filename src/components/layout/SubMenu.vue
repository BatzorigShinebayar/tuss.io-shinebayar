<template>
  <div class="submenu">
    <slot name="submenu" />
  </div>
</template>

<script>
export default {
  name: 'SubMenu',

  mounted() {
    document.body.classList.add('submenu-active');
  },

  destroyed() {
    document.body.classList.remove('submenu-active');
  },
};
</script>
