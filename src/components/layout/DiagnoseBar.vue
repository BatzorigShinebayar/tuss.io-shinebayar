<template>
  <div class="vh-100">
    <div>
      <i
        id="spanButton"
        class="bx bx-chevron-right-circle"
        @click="sideMenuToggle()"
      ></i>
    </div>
    <div id="diagnose-bar">
      <div id="diagnose-header">
        <b-row class="card bg-white pt-4 pl-4 pr-4 pb-3">
          <b-col cols="11" class="ml-2">
            <b-row class="d-flex">
              <b-col>
                <b-row class="flex-space-between">
                  <div class="d-flex">
                    <div
                      id="diagnoseTitle"
                      class="pl-2 align-self-center d-flex mr-1"
                    >
                      <i
                        class="bx mr-2 align-self-center"
                        :class="'bx-' + chosenMenu.icon"
                      ></i>
                      <p>{{ chosenMenu.name }}</p>
                    </div>
                    <b-dropdown
                      v-if="diagnoseItems.length > 1"
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
                        v-for="item in diagnoseItems"
                        :key="item.name"
                        @click="diagnoseMenu(item)"
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
                  <b-button class="diagnose-task">
                    <i class="bx bx-search align-middle" variant="dark"></i>
                  </b-button>
                </b-input-group-prepend>
                <b-form-input
                  v-model="diagnoseData"
                  class="diagnose-task"
                  placeholder="Diagnose"
                  size="sm"
                ></b-form-input>
              </b-input-group>
            </b-row>
          </b-col>
          <b-row id="filters" class="flex-space-between ml-2 mr-3">
            <p>
              <i class="bx bx-cloud-light-rain align-middle"></i>My Active
              Diagnose
            </p>
            <p><i class="bx bx-filter-alt align-middle ml-4 pr-1"></i>Filter</p>
            <!--            <p>-->
            <!--              <i class="bx bx-menu-alt-right align-middle ml-4 pl-2 pr-1"></i>Clustering-->
            <!--            </p>-->
          </b-row>
        </b-row>
      </div>
      <div id="diagnose-body">
        <simplebar data-simplebar-auto-hide="true" class="h-100">
          <div class="pt-1">
            <DiagnoseTask
              v-if="diagnoseBar === 'diagnose-task'"
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
import DiagnoseTask from '@/components/layout/searchBar-slots/DiagnoseTask';

export default {
  name: 'DiagnoseBar',

  components: {
    simplebar,
    DiagnoseTask,
  },

  props: {
    diagnoseItems: {
      type: Array,
      default: null,
    },
    diagnoseBar: {
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
      diagnoseData: '',
      diagnosisData: '',
    };
  },

  watch: {
    diagnoseData(data) {
      this.diagnosisData = data.toString();
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
    diagnoseItems(data) {
      const item = data;
      for (const i in item) {
        if (this.diagnoseBar === 'DiagnoseTask') {
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
  },

  destroyed() {
    window.document.body.classList.remove('submenu-active');
  },

  methods: {
    diagnoseMenu(data) {
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
          id: data.id,
        },
      });
      window.location.assign(r.href);
    },
    sideMenuToggle() {
      window.document.body.classList.toggle('submenu-active');
      window.document
        .getElementById('spanButton')
        .classList.toggle('bxs-caret-left-circle');
      window.document
        .getElementById('spanButton')
        .classList.toggle('bxs-caret-left-circle');
    },
  },
};
</script>

<style scoped>
.diagnose-task {
  border: 0;
  background-color: #f8f8fb;
  color: #495057;
  font-size: 14px;
  line-height: 16px;
}
.diagnose-task i {
  font-size: 16px;
}
#filters {
  font-size: 14px;
  color: #495057;
}
#diagnose-header {
  box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.05);
}
</style>
