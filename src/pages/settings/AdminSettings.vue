<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Organization's group settings</h5>
      </template>
    </NavBar>
    <div class="container-fluid">
      <Overview />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Overview from '@/components/settings/system-admin/GroupSettings';

export default {
  name: 'adminSetting',
  components: {
    MainLayout,
    NavBar,
    Overview,
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.$store.getters.user.is_admin) {
      this.$router.push({ name: 'crucial' });
    }
  },
};
</script>
