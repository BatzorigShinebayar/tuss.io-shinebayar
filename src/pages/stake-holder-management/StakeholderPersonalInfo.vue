<template>
  <MainLayout>
    <SubMenu>
      <template #submenu>
        <Searchbar :search-items="searchItems" :search-bar="'stakeholders'" />
      </template>
    </SubMenu>
    <NavBar>
      <template #top>
        <h5 class="p-3">Stakeholders</h5>
      </template>
    </NavBar>
    <div class="container-fluid">
      <b-nav tabs class="ml-1">
        <b-nav-item>
          <router-link
            :to="{
              name: 'shm-list',
              params: {
                type: 'organization',
                id: $store.getters.activeCompany,
              },
            }"
          >
            Overview
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link
            :to="{
              name: 'stake-holder-detail',
              params: {
                id: $route.params.id,
              },
            }"
          >
            General Information
          </router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link to=""> Personal Information </router-link>
        </b-nav-item>
        <b-nav-item-dropdown
          id="my-nav-dropdown"
          text="Dropdown"
          toggle-class="nav-link-custom"
          right
        >
          <b-dropdown-item
            ><router-link
              :to="{
                name: 'leave-requests',
              }"
            >
              Leave requests
            </router-link></b-dropdown-item
          >
          <b-dropdown-item
            ><router-link
              :to="{
                name: 'employee-vacations',
              }"
            >
              Employees vacation
            </router-link></b-dropdown-item
          >
          <!--          <b-dropdown-divider></b-dropdown-divider>-->
        </b-nav-item-dropdown>
        <b-nav-item>
          <router-link to=""> Performance </router-link>
        </b-nav-item>
      </b-nav>
      <SHPersonalInfo />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import SubMenu from '@/components/layout/SubMenu';
import Searchbar from '@/components/layout/SearchBar';
import NavBar from '@/components/layout/NavBar';
import SHPersonalInfo from '@/components/stake-holder-management/SHPersonalInfo';

export default {
  name: 'StakeHoldersPersonalInfo',
  components: {
    MainLayout,
    SubMenu,
    Searchbar,
    NavBar,
    SHPersonalInfo,
  },
  data() {
    return {
      searchItems: [
        {
          name: 'Stakeholders',
          icon: '',
          url: '',
          weekNum: 0,
        },
      ],
    };
  },
};
</script>
