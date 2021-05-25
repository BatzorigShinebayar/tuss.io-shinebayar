<template>
  <div class="vh-100">
    <div>
      <i
        id="spanButton"
        class="bx bx-minus-circle"
        @click="sideMenuToggle()"
      ></i>
    </div>
    <div id="search-bar">
      <div id="search-header">
        <b-row class="card bg-white pt-4 pl-4 pr-4 pb-3">
          <b-col cols="11" class="ml-2">
            <b-row class="d-flex">
              <b-col>
                <b-row class="flex-space-between">
                  <div class="d-flex">
                    <div
                      id="searchTitle"
                      class="pl-2 align-self-center d-flex mr-1"
                    >
                      <i
                        class="bx mr-2 align-self-center"
                        :class="'bx-' + chosenMenu.icon"
                      ></i>
                      <p>{{ chosenMenu.name }}</p>
                    </div>
                    <b-dropdown
                      v-if="searchItems.length > 1"
                      size="sm"
                      right
                      variant="white"
                      toggle-class="text-decoration-none"
                      no-caret
                    >
                      <template #button-content>
                        <i class="bx bx-caret-down bx-sm"></i>
                      </template>
                      <b-dropdown-item
                        v-for="item in searchItems"
                        :key="item.name"
                        @click="searchMenu(item)"
                        ><i class="bx pr-1" :class="'bx-' + item.icon"></i>
                        {{ item.name }}</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                  <!--                  <div class="float-right">-->
                  <!--                    <i class="bx bxs-plus-circle bx-md color-orange" />-->
                  <!--                  </div>-->
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-input-group size="sm" class="mt-3 mb-3">
                <b-input-group-prepend>
                  <b-button class="search-task">
                    <i class="bx bx-search align-middle" variant="dark"></i>
                  </b-button>
                </b-input-group-prepend>
                <b-form-input
                  v-model="searchData"
                  class="search-task"
                  placeholder="Search"
                  size="sm"
                ></b-form-input>
              </b-input-group>
            </b-row>
          </b-col>
          <b-row id="filters" class="flex-space-between ml-2 mr-3">
            <p>
              <i class="bx bx-info-circle align-middle"></i>
            </p>
            <p><i class="bx bx-filter-alt align-middle ml-4 pr-1"></i>Filter</p>
            <p>
              <i class="bx bx-menu-alt-right align-middle ml-4 pl-2 pr-1"></i
              >Clustering
            </p>
          </b-row>
        </b-row>
      </div>
      <div id="search-body">
        <simplebar data-simplebar-auto-hide="true" class="h-100">
          <div class="pt-1">
            <Ach
              v-if="searchBar === 'crucial-information'"
              :search-data="searchingData"
            />
            <CReport v-else-if="slug === 'account-and-payroll'" />
            <Employee
              v-else-if="
                searchBar === 'stake-holder-management-employee-id' &&
                chosenMenu.name === 'Employees'
              "
            />
            <Employee
              v-else-if="
                searchBar === 'stake-holder-management-employee-id' &&
                chosenMenu.name === 'Ур чадвар'
              "
            />
            <HRMver2
              v-else-if="
                searchBar === 'stake-holder-management-ver2-management'
              "
              :choose-item.sync="chooseItem"
            />
            <HRMver2employee
              v-else-if="
                searchBar ===
                'stake-holder-management-ver2-management-employee-id'
              "
              :choose-item.sync="chooseItem"
            />
            <TaskConfiguration
              v-else-if="searchBar === 'task-management-configurations'"
              :choose-item.sync="chooseItem"
            />
            <GoalIndexes
              v-else-if="searchBar === 'index-detail'"
              :choose-item.sync="chooseItem"
            />
            <Stakeholders
              v-else-if="searchBar === 'stakeholders'"
              :choose-item.sync="chooseItem"
            />
            <SystemAdmin
              v-else-if="searchBar === 'system-admin'"
              :choose-item.sync="chooseItem"
            />
          </div>
        </simplebar>
      </div>
    </div>
  </div>
</template>
<script>
import simplebar from 'simplebar-vue';
import Ach from '@/components/layout/searchBar-slots/Ach-mj';
import CReport from '@/components/layout/searchBar-slots/Company-report';
import Employee from '@/components/layout/searchBar-slots/Employee';
import HRMver2 from '@/components/layout/searchBar-slots/Hrm-ver2';
import HRMver2employee from '@/components/layout/searchBar-slots/Hrm-ver2-employee';
import TaskConfiguration from '@/components/layout/searchBar-slots/Task-configuration';
import GoalIndexes from '@/components/layout/searchBar-slots/Indexes';
import Stakeholders from '@/components/layout/searchBar-slots/StakeholderManagement';
import SystemAdmin from '@/components/layout/searchBar-slots/SystemAdmin';

export default {
  name: 'SearchBar',

  components: {
    simplebar,
    Ach,
    CReport,
    Employee,
    HRMver2,
    HRMver2employee,
    TaskConfiguration,
    GoalIndexes,
    Stakeholders,
    SystemAdmin,
  },

  props: {
    searchItems: {
      type: Array,
      default: null,
    },
    searchBar: {
      type: String,
      default: null,
    },
    chooseItem: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      slug: '',
      chosenMenu: '',
      searchData: '',
      searchingData: '',
    };
  },

  watch: {
    searchData(data) {
      this.searchingData = data.toString();
    },
    $route: {
      immediate: true,
      handler(to) {
        this.slug = to.name || '';
      },
    },
    chooseItem(newVal) {
      this.$emit('update:chooseItem', newVal);
    },
    searchItems(data) {
      const item = data;
      for (const i in item) {
        if (this.searchBar === 'crucial-information') {
          const weekNum = this.$route.params.weekId.split('-')[1];
          if (item[i].weekNum === parseInt(weekNum)) {
            this.chosenMenu = item[i];
          }
        }
      }
    },
  },

  mounted() {
    window.document.body.classList.add('submenu-active');
    if (this.searchBar === 'task-management-configurations') {
      this.chosenMenu = this.searchItems[0];
    }
  },

  destroyed() {
    window.document.body.classList.remove('submenu-active');
  },

  methods: {
    searchMenu(data) {
      // this.$router.push({
      //   name: data.url,
      //   params: {
      //     weekId: data.weekId,
      //     type: data.type,
      //     id: data.id,
      //   },
      // });
      let r = this.$router.resolve({
        name: data.url,
        params: {
          weekId: data.weekId,
          type: data.type,
          id: data.id,
        },
      });
      window.location.assign(r.href);
    },
    sideMenuToggle() {
      window.document.body.classList.toggle('submenu-active');
      window.document
        .getElementById('spanButton')
        .classList.toggle('bxs-plus-circle');
      window.document
        .getElementById('spanButton')
        .classList.toggle('bx-minus-circle');
    },
  },
};
</script>

<style scoped>
.search-task {
  border: 0;
  background-color: #f8f8fb;
  color: #495057;
  font-size: 14px;
  line-height: 16px;
}
.search-task i {
  font-size: 16px;
}
#filters {
  font-size: 14px;
  color: #495057;
}
#search-header {
  box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.05);
}
</style>
