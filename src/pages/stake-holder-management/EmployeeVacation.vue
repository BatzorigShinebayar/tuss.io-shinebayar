<template>
  <MainLayout>
    <SubMenu>
      <template #submenu>
        <Searchbar :search-items="searchItems" :search-bar="'leave-requests'" />
      </template>
    </SubMenu>
    <NavBar>
      <template #top>
        <h5 class="p-3">Employees vacation</h5>
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
        <b-nav-item disabled>
          <router-link class="text-muted" to="#">
            General Information
          </router-link>
        </b-nav-item>
        <b-nav-item disabled>
          <router-link class="text-muted" to="#">
            Personal Information
          </router-link>
        </b-nav-item>
        <b-nav-item-dropdown
          active
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
      <EmployeeVacation />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import SubMenu from '@/components/layout/SubMenu';
import Searchbar from '@/components/layout/SearchBar';
import NavBar from '@/components/layout/NavBar';
import EmployeeVacation from '@/components/stake-holder-management/EmployeesVacation';

export default {
  name: 'EmployeeVacations',
  components: {
    MainLayout,
    SubMenu,
    Searchbar,
    NavBar,
    EmployeeVacation,
  },
  data() {
    return {
      searchItems: [
        {
          name: 'Employees vacation',
          icon: '',
          url: '',
          weekNum: 0,
        },
      ],
    };
  },
};
</script>
