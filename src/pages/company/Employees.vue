<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Employee</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <ContentHeader>
        <template #text>
          <h4 class="font-weight-bold mb-3">Lets jump start</h4>
          <p>
            Welcome to our planet TUS D+. We have so much in store for you and
            your company. So, let’s jump start your journey with a tutorial!
          </p>
        </template>
        <template #image>
          <img
            src="@/assets/images/administration/admin-content-header.svg"
            class="content-header-image"
            alt=""
          />
        </template>
      </ContentHeader>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex">
          <div class="mr-3">
            <b-input-group class="search-form">
              <template #append>
                <b-input-group-text @click="search">
                  <Fa :icon="['fas', 'search']" />
                </b-input-group-text>
              </template>
              <b-form-input
                id="search-task"
                placeholder="Search"
                v-model="searchName"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-center">
          <b-form-checkbox
            v-model="showDeleted"
            class="mr-3"
            @input="showDeactivatedEmployee"
          >
            Show deactivated
          </b-form-checkbox>
          <b-button v-b-toggle.employee-create variant="deep-blue">
            <Fa :icon="['fas', 'plus']" />
            Create New Employee
          </b-button>
        </div>
      </div>

      <div v-if="searchActive">
        <b-alert
          show
          variant="deep-blue"
          dismissible
          class="block mb-3"
          @dismissed="searchClear"
        >
          Search result:
          <strong>{{ searchedName }}</strong>
        </b-alert>
      </div>

      <p class="mb-3">Total: {{ tableCount }}</p>

      <EmployeeTable
        :table-data="tableData"
        @delete="deleteEmployee"
        @edit="editEmployee"
      />

      <div class="d-flex justify-content-center mt-4">
        <b-pagination
          v-model="tablePage"
          pills
          :total-rows="tableCount"
          :per-page="50"
          @change="tablePagination"
        ></b-pagination>
      </div>

      <p class="text-right mb-5">Total: {{ tableCount }}</p>

      <CreateEmployee @reload="tableLoad" />

      <EditEmployee :employee="selectedEmployee" @reload="tableLoad" />

      <DeactivateEmployee :employee="selectedEmployee" />
    </div>
  </MainLayout>
</template>

<script>
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import ContentHeader from '@/components/admininstration/ContentHeader';
import EmployeeTable from '@/components/admininstration/employees/EmployeeTable';
import CreateEmployee from '@/components/admininstration/employees/CreateEmployee';
import MainLayout from '@/components/layout/MainLayout';
import DeactivateEmployee from '@/components/admininstration/employees/deactivate/DeactivateEmployee';
import EditEmployee from '@/components/admininstration/employees/EditEmployee';
import axios from 'axios';

export default {
  name: 'Employees',

  metaInfo: {
    title: 'Employee - Company | TUSS D+',
  },

  components: {
    MainLayout,
    EmployeeTable,
    Sidebar,
    NavBar,
    SubMenu,
    ContentHeader,
    CreateEmployee,
    DeactivateEmployee,
    EditEmployee,
  },

  data() {
    return {
      tableData: null,
      tablePage: 1,
      tableCount: null,
      selectedEmployee: null,
      showDeleted: false,
      searchActive: false,
      searchName: null,
      searchedName: null,
    };
  },

  mounted() {
    this.tableLoad();
  },

  methods: {
    tableLoad() {
      this.tableData = null;

      const params = {
        organization: this.$store.getters.activeCompany,
        page: this.tablePage,
      };

      if (this.showDeleted) {
        params.is_active = '0';
      }

      if (this.searchName) {
        params.search = this.searchName;
      }

      const url = '/pages/company_builder/partner/';
      const config = { params: params };

      axios.get(url, config).then((response) => {
        this.tablePage = response.data.page;
        this.tableCount = response.data.total;
        this.tableData = response.data.results;
      });
    },

    tablePagination(page) {
      this.tablePage = page;
      this.tableLoad();
    },

    deleteEmployee(employee) {
      this.selectedEmployee = employee;
      this.$root.$emit('bv::toggle::collapse', 'employee-deactivate');
    },

    editEmployee(employee) {
      this.selectedEmployee = employee;
      this.$root.$emit('bv::toggle::collapse', 'employee-edit');
    },

    search() {
      if (this.searchName) {
        this.searchActive = true;
        this.searchedName = this.searchName;
        this.showDeleted = true;
        this.tableLoad();
      }
    },

    showDeactivatedEmployee() {
      this.tableLoad();
    },

    searchClear() {
      this.searchActive = false;
      this.searchName = null;
      this.searchedName = null;
      this.tablePage = 1;
      this.tableLoad();
    },
  },
};
</script>
