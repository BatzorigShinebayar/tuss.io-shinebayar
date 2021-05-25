<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Goal Management System</h5>
      </template>

      <template #bottom>
        <ul class="nav nav-tabs ml-1">
          <li class="nav-item">
            <router-link :to="{ name: 'goal' }" class="nav-link active">
              <Fa :icon="['fas', 'bullseye']" />
              Goal Index
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'goal-plan-list' }" class="nav-link">
              <Fa :icon="['fas', 'check-circle']" />
              Goal Plan
            </router-link>
          </li>
        </ul>
      </template>
    </NavBar>

    <div class="container-fluid pr-lg-4 pl-lg-4 mb-5">
      <div class="d-flex justify-content-between align-items-center my-4 w-100">
        <h5 class="font-weight-bold">List of Indexes</h5>
        <div class="d-flex align-items-center">
          <div class="mr-3">
            <b-input-group class="search-form">
              <template #append>
                <b-input-group-text @click="searchIndex">
                  <Fa :icon="['fas', 'search']" />
                </b-input-group-text>
              </template>
              <b-form-input
                placeholder="Search"
                v-model="searchIndexName"
              ></b-form-input>
            </b-input-group>
          </div>
          <b-button
            v-b-toggle.goal-index-create
            variant="deep-blue"
            v-if="permission('indx_crt')"
          >
            <Fa :icon="['fas', 'plus']" />
            Create new index
          </b-button>
        </div>
      </div>

      <b-alert
        v-if="searchActive"
        variant="primary"
        dismissible
        class="d-block"
        show
        @dismissed="searchNameClear"
      >
        Search result:
        <strong>{{ searchActive }}</strong>
      </b-alert>

      <div class="d-flex justify-content-between align-items-center">
        <p class="ml-2 p-1">INDEX</p>
        <p class="mr-3 p-1">ACTIONS</p>
      </div>

      <IndexItem
        v-for="(item, index) in indexList"
        :key="index"
        :item="item"
        @edit="editIndex"
        @delete="deleteIndex"
      />

      <IndexCreate :parentIndices="indexList" @reload="loadIndex" />

      <IndexDelete :selectedIndex="selectedIndex" @reload="loadIndex" />

      <IndexEdit
        :indexes="indexListBackup"
        :selectedIndex="selectedIndex"
        @reload="loadIndex"
      />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import IndexEdit from '@/components/goal_management/index_list/IndexEdit';
import IndexDelete from '@/components/goal_management/index_list/IndexDelete';
import IndexItem from '@/components/goal_management/index_list/IndexItem';
import IndexCreate from '@/components/goal_management/index_list/IndexCreate';
import axios from 'axios';

export default {
  name: 'GoalIndexListPage',

  components: {
    MainLayout,
    NavBar,
    IndexEdit,
    IndexDelete,
    IndexItem,
    IndexCreate,
  },

  metaInfo: {
    title: 'Goal Management | TUSS D+',
  },

  data() {
    return {
      indexList: null,
      indexListBackup: null,
      searchIndexName: null,
      searchActive: false,
      selectedIndex: null,
    };
  },

  mounted() {
    this.loadIndex();
  },

  methods: {
    loadIndex() {
      const company = this.$store.getters.activeCompany;
      const url = `pages/goal/list_goal_index/${company}/`;

      axios.get(url).then((response) => {
        const indexes = [];
        for (const index of response.data.index_list) {
          if (index.active === '1') {
            indexes.push(index);
          }
        }
        this.indexList = indexes;
        this.indexListBackup = indexes;
      });
    },

    // Index name search
    searchIndex() {
      if (this.searchIndexName) {
        const found = [];
        for (const index of this.indexListBackup) {
          if (
            index.name
              .toLowerCase()
              .includes(this.searchIndexName.toLowerCase())
          ) {
            found.push(index);
          }
        }
        this.indexList = found;
        this.searchActive = this.searchIndexName;
      }
    },

    // index name search clear
    searchNameClear() {
      this.searchActive = false;
      this.searchIndexName = null;
      this.indexList = this.indexListBackup;
    },

    //edit index
    editIndex(index) {
      this.selectedIndex = index;
      this.$root.$emit('bv::toggle::collapse', 'goal-index-edit');
    },

    //delete index
    deleteIndex(index) {
      this.selectedIndex = index;
      this.$bvModal.show('index-deactivate-modal');
    },
  },
};
</script>
