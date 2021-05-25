<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">{{ name }}</h5>
      </template>
      <template #bottom>
        <b-tabs class="header-tab">
          <b-tab>
            <template #title>
              <a class="cursor-pointer" @click="back">
                <Fa :icon="['fas', 'chevron-left']" />
                Back
              </a>
            </template>
          </b-tab>
          <b-tab title="Overview" active lazy>
            <template #title>
              <Fa :icon="['far', 'calendar-alt']" />
              Overview
            </template>
          </b-tab>
        </b-tabs>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <IndexSideBar @select="selectIndex" />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <b-tabs v-model="tabIndex" nav-wrapper-class="d-none">
        <b-tab lazy>
          <IndexGraph :realization="realization" />

          <div class="d-flex justify-content-between align-items-center">
            <h5 class="font-weight-bold">Recent transaction</h5>
            <b-button
              variant="deep-blue"
              v-b-toggle.realization-create
              v-if="permission('indx_rlz_crt')"
            >
              <Fa :icon="['fas', 'plus']" />
              New
            </b-button>
          </div>

          <IndexTable :realization="realization" @reload="loadRealization" />

          <div v-if="total" class="d-flex justify-content-center mt-4">
            <b-pagination
              v-model="page"
              pills
              :total-rows="total"
              :per-page="50"
              @change="pagination"
            ></b-pagination>
          </div>
        </b-tab>
      </b-tabs>

      <IndexRealizationCreate @reload="loadRealization" />
      <IndexRealizationEdit @reload="loadRealization" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import SubMenu from '@/components/layout/SubMenu';
import NavBar from '@/components/layout/NavBar';
import IndexSideBar from '@/components/goal_management/index_detail/IndexSideBar';
import IndexGraph from '@/components/goal_management/index_detail/IndexGraph';
import IndexTable from '@/components/goal_management/index_detail/IndexTable';
import IndexRealizationCreate from '@/components/goal_management/index_detail/IndexRealizationCreate';
import axios from 'axios';
import IndexRealizationEdit from '@/components/goal_management/index_detail/IndexRealizationEdit';

export default {
  name: 'GoalDetailPage',

  metaInfo: {
    title: 'Goal Management | TUSS D+',
  },

  components: {
    IndexRealizationEdit,
    MainLayout,
    NavBar,
    SubMenu,
    IndexSideBar,
    IndexGraph,
    IndexTable,
    IndexRealizationCreate,
  },

  data() {
    return {
      name: 'Index Detail',
      tabIndex: 0,
      realization: [],
      page: 1,
      total: false,
    };
  },

  watch: {
    '$route.query.id'() {
      this.loadRealization();
    },
  },

  mounted() {
    this.loadRealization();
  },

  methods: {
    back() {
      window.history.back();
    },

    loadRealization() {
      const indexId = this.$route.query.id;

      if (!indexId) {
        return;
      }

      const url = `pages/goal/list_index_realization/${indexId}/`;

      const params = {
        page: this.page,
      };

      axios.get(url, { params }).then((response) => {
        const actives = [];
        for (const realization of response.data.results) {
          if (realization.active === '1') {
            actives.push(realization);
          }
        }

        this.realization = actives;

        if (response.data.total > 50) {
          this.total = response.data.total;
        }
      });
    },

    selectIndex(indexes) {
      this.name = indexes.name;
    },

    pagination(page) {
      this.page = page;
      this.loadRealization();
    },
  },
};
</script>
