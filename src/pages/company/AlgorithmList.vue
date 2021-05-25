<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Algorithm</h5>
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

      <div class="d-flex justify-content-between align-items-center">
        <b-input-group
          label="Хайлт"
          label-for="company_select"
          class="search-form"
        >
          <template #append>
            <b-input-group-text @click="searchAlgorithm">
              <Fa :icon="['fas', 'search']" />
            </b-input-group-text>
          </template>
          <b-form-input
            id="search-task"
            placeholder="Search"
            v-model="search"
          ></b-form-input>
        </b-input-group>

        <div class="d-flex align-items-center">
          <b-form-checkbox
            v-model="showDeleted"
            class="mr-3"
            @input="showDeletedAlgorithms"
            >Show deleted
          </b-form-checkbox>

          <b-button
            v-b-toggle.algorithm-create
            variant="deep-blue"
            v-if="permission('algr_crt')"
          >
            <Fa :icon="['fas', 'plus']" />
            Create new algorithm
          </b-button>
        </div>
      </div>

      <b-alert
        :show="seachActive"
        variant="primary"
        dismissible
        class="mt-3"
        @dismissed="searchNameClear"
      >
        Search result:
        <strong>{{ searched }}</strong>
      </b-alert>

      <AlgorithmTable :tableData="tableData" @reload="tableLoad" />

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

      <CreateAlgorithm v-if="permission('algr_crt')" @reload="tableLoad" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import AlgorithmTable from '@/components/admininstration/algorithm/AlgorithmTable';
import ContentHeader from '@/components/admininstration/ContentHeader';
import CreateAlgorithm from '@/components/admininstration/algorithm/CreateAlgorithm';
import axios from 'axios';

export default {
  name: 'AlgorithmList',

  metaInfo: {
    title: 'Algorithm - Company | TUSS D+',
  },

  components: {
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    ContentHeader,
    AlgorithmTable,
    CreateAlgorithm,
  },

  data() {
    return {
      hasPermission: null,
      tableData: null,
      tablePage: 1,
      tableCount: 0,
      seachActive: false,
      search: null,
      searched: null,
      showDeleted: false,
    };
  },

  created() {
    this.tableLoad();
  },

  methods: {
    tableLoad() {
      this.tableData = null;
      const url = '/pages/company_builder/algorithm/';

      const params = {
        is_active: 1,
        organization: this.$store.getters.activeCompany,
        page: this.tablePage,
      };

      if (this.search) {
        params.name = this.searched;
      }

      if (this.showDeleted) {
        delete params.is_active;
      }

      axios.get(url, { params: params }).then((response) => {
        this.tablePage = response.data.page;
        this.tableCount = response.data.total;
        this.tableData = response.data.results;
      });
    },

    searchAlgorithm() {
      this.seachActive = true;
      this.searched = this.search;
      this.showDeleted = true;
      this.tableLoad();
    },

    tablePagination(page) {
      this.tablePage = page;
      this.tableLoad();
    },

    searchNameClear() {
      this.seachActive = false;
      this.searched = null;
      this.search = null;
      this.tableLoad();
    },

    showDeletedAlgorithms() {
      this.tableLoad();
    },
  },
};
</script>
