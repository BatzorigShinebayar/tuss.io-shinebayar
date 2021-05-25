<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Salary</h5>
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

      <div class="d-flex justify-content-end">
        <b-button
          v-if="permission('slry_crt')"
          v-b-toggle.v-b-toggle.salary-create
          variant="deep-blue"
        >
          <Fa :icon="['fas', 'plus']" />
          Create
        </b-button>
      </div>

      <div class="row mt-4 mb-5">
        <SalaryCategory
          v-for="(salary, index) in salaries"
          :key="index"
          :salary="salary"
          @reload="getSalary"
          @edit="categoryEdit"
        />
      </div>

      <SalaryCreate @reload="getSalary" />

      <SalaryEdit @reload="getSalary" :salary="salary" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import ContentHeader from '@/components/admininstration/ContentHeader';
import SalaryCategory from '@/components/admininstration/salary/SalaryCategory';
import axios from 'axios';
import SalaryCreate from '@/components/admininstration/salary/SalaryCreate';
import SalaryEdit from '@/components/admininstration/salary/SalaryEdit';

export default {
  name: 'Salary',

  metaInfo: {
    title: 'Salary - Company | TUSS D+',
  },

  components: {
    SalaryEdit,
    SalaryCreate,
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    ContentHeader,
    SalaryCategory,
  },

  data() {
    return {
      activeCompany: this.$store.getters.activeCompany,
      salaries: null,
      salary: null,
    };
  },

  mounted() {
    this.getSalary();
  },

  methods: {
    getSalary() {
      const url = `/pages/company_builder/salary/?organization=${this.activeCompany}`;
      axios.get(url).then((response) => {
        this.salaries = response.data;
      });
    },

    categoryEdit(salary) {
      this.salary = salary;
      this.$root.$emit('bv::toggle::collapse', 'salary-edit');
    },
  },
};
</script>
