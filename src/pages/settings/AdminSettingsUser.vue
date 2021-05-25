<template>
  <MainLayout>
    <SubMenu>
      <template #submenu>
        <Searchbar :search-items="searchItems" :search-bar="'system-admin'" />
      </template>
    </SubMenu>
    <NavBar>
      <template #top>
        <h5 class="p-3">Admin settings</h5>
      </template>
    </NavBar>
    <div class="container-fluid">
      <ul class="nav nav-tabs ml-1">
        <li>
          <router-link
            :to="{
              name: 'admin-setting',
            }"
            class="nav-link"
          >
            Back
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{
              name: 'admin-setting-org',
              params: {
                groupId: group_id,
              },
            }"
            class="nav-link"
          >
            Organization List
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{
              name: 'admin-setting-user',
              params: {
                groupId: group_id,
              },
            }"
            class="nav-link active"
          >
            User List
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" class="nav-link"> Tickets </router-link>
        </li>
      </ul>
      <Overview />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import SubMenu from '@/components/layout/SubMenu';
import Searchbar from '@/components/layout/SearchBar';
import NavBar from '@/components/layout/NavBar';
import Overview from '@/components/settings/system-admin/UserList';

export default {
  name: 'adminSetting',
  components: {
    MainLayout,
    SubMenu,
    Searchbar,
    NavBar,
    Overview,
  },
  data() {
    return {
      searchItems: [
        {
          name: 'Group configuration',
          icon: '',
          url: '',
          weekNum: 0,
        },
      ],
      group_id: null,
    };
  },
  mounted() {
    if (!this.$store.getters.user.is_admin) {
      this.$router.push({ name: 'crucial' });
    }
    if (this.$route.params.groupId) {
      this.group_id = this.$route.params.groupId;
    } else {
      const companies = this.$store.getters.user.companies;
      for (const i in companies) {
        if (companies[i].is_main) {
          this.group_id = companies[i].group_id;
        }
      }
    }
  },
};
</script>
