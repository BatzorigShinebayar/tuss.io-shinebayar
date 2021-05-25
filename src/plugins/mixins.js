import Vue from 'vue';

Vue.mixin({
  methods: {
    permission: function (permissionName) {
      if (process.env.NODE_ENV === 'development') {
        return true;
      } else {
        const permissionsList =
          this.$store.getters.company.permissions.permissionsList;
        return !!permissionsList.includes(permissionName);
      }
    },

    is_developer: function () {
      if (process.env.NODE_ENV === 'development') {
        return true;
      } else {
        if (this.$store.state.is_developer) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
});
