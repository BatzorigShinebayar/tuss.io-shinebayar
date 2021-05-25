<template>
  <div class="diagnose-side-menu">
    <a class="diagnose-side-menu-toggler">
      <Fa :icon="['fas', 'caret-left']" fixed-width @click="toggler" />
    </a>

    <div class="diagnose-side-menu-header p-3">
      <h5 class="font-weight-bold mb-2">Diagnose system</h5>

      <b-input-group label="Diagnose name" class="search-diagnose mb-3">
        <template #append>
          <b-input-group-text @click="searchDiagnose">
            <Fa :icon="['fas', 'search']" />
          </b-input-group-text>
        </template>
        <b-form-input
          placeholder="Search diagnose"
          v-model="search"
          @keydown.native="searchEnterHandler"
        ></b-form-input>
      </b-input-group>

      <div class="d-flex justify-content-between align-items-center">
        <DiagnoseFilter @reload="diagnoseFilter" />
        <div class="d-flex align-items-center">
          <Fa
            :icon="['fas', 'chevron-left']"
            class="diagnose-side-menu-control"
            @click="diagnosePagePrev"
          />
          <b-input
            id="diagnose-side-menu-page"
            class="diagnose-side-menu-page"
            type="text"
            v-model="page"
            @keypress="numberOnly"
            @input="pageChange"
            @keydown.native="goToPage"
          ></b-input>
          <Fa
            :icon="['fas', 'chevron-right']"
            class="diagnose-side-menu-control"
            @click="diagnosePageNext"
          />
        </div>
        <b-tooltip target="diagnose-side-menu-page" triggers="hover">
          {{ page }} of {{ maxPage }}
        </b-tooltip>
      </div>

      <b-button
        class="mt-3"
        @click="clear"
        variant="primary"
        block
        size="sm"
        v-if="diagnoseFiltered"
      >
        Clear filter
      </b-button>
    </div>

    <div class="diagnose-side-menu-footer">
      <simplebar data-simplebar-auto-hide="false" class="h-100">
        <a
          v-for="diagnose in diagnoseList"
          :key="diagnose.id"
          class="diagnose-menu-diagnose-item"
          @click="loadDiagnoseDetail(diagnose.id)"
          :class="setActiveClass(diagnose.id)"
        >
          <p class="diagnose-menu-title">{{ diagnose.code }}</p>
          <p class="diagnose-menu-title">{{ diagnose.name }}</p>
          <p class="diagnose-menu-title">
            {{ diagnose.employee | get_employee_info }}
          </p>
          <b-badge variant="primary">
            {{ diagnose.state }}
          </b-badge>
        </a>
      </simplebar>
    </div>
  </div>
</template>

<script>
import DiagnoseFilter from '@/components/diagnose-system/DiagnoseFilter';
import simplebar from 'simplebar-vue';
import axios from 'axios';

export default {
  name: 'DiagnoseSideMenu',

  components: {
    DiagnoseFilter,
    simplebar,
  },

  computed: {
    activeCompany() {
      return this.$store.getters.activeCompany;
    },
  },

  data() {
    return {
      search: this.$route.query.search || null,
      organization: this.$route.query.organization || null,
      symptom_type: this.$route.query.symptom_type || null,
      department: this.$route.query.department || null,
      state: this.$route.query.state || null,
      employees: this.$route.query.employees || null,
      start_date: this.$route.query.start_date || null,
      end_date: this.$route.query.end_date || null,
      page: 1,
      maxPage: 0,
      diagnoseCount: 0,
      filterClear: false,
      diagnoseList: [],
      diagnoseFiltered: false,
    };
  },

  created() {
    const params = this.$route.query;

    if (params.page) {
      this.page = params.page;
    }

    if (params.search) {
      this.search = params.search;
    }
  },

  mounted() {
    const query = this.$route.query;

    if (query.search) {
      this.diagnoseFiltered = true;
    }
    if (query.symptom_type) {
      this.diagnoseFiltered = true;
    }
    if (query.department) {
      this.diagnoseFiltered = true;
    }
    if (query.state) {
      this.diagnoseFiltered = true;
    }
    if (query.employees) {
      this.diagnoseFiltered = true;
    }
    if (query.start_date) {
      this.diagnoseFiltered = true;
    }
    if (query.end_date) {
      this.diagnoseFiltered = true;
    }

    this.loadDiagnoseList();
  },

  methods: {
    toggler() {
      const menu = document.querySelector('.diagnose-side-menu');
      menu.classList.toggle('reverse');
      document.body.classList.toggle('submenu-active');
    },

    // load diagnose list
    loadDiagnoseList() {
      const params = this.$route.query;
      const url = `/pages/diag/list_diagnoses/${this.activeCompany}/`;
      this.diagnoseList = [];

      axios.get(url, { params }).then((response) => {
        this.diagnoseCount = response.data.total;
        this.diagnoseList = response.data.results;
        this.maxPage = Math.ceil(this.diagnoseCount / response.data.page_size);
      });
    },

    // diagnose name search
    async searchDiagnose() {
      if (!this.search) {
        return;
      }
      this.diagnoseFiltered = true;
      this.page = 1;

      const query = {
        search: this.search,
      };

      if (this.$route.query.search !== this.search) {
        await this.$router.replace({ query });
      }

      this.loadDiagnoseList();
    },

    searchEnterHandler(event) {
      if (event.which === 13) {
        this.diagnoseFiltered = true;
        this.loadDiagnoseList();
      }
    },

    // clear
    async clear() {
      this.search = null;
      this.page = 1;

      const query = Object.assign({}, this.$route.query);
      delete query.search;
      delete query.page;
      delete query.symptom_type;
      delete query.department;
      delete query.state;
      delete query.employees;
      delete query.start_date;
      delete query.end_date;

      try {
        await this.$router.replace({ query });
      } catch (error) {
        this.loadDiagnoseList();
        return;
      }

      this.loadDiagnoseList();
      this.diagnoseFiltered = false;
    },

    //pagination
    async diagnosePagination(page) {
      this.page = page;
      const query = Object.assign({}, this.$route.query);
      query.page = page;
      await this.$router.replace({ query });
      this.loadDiagnoseList();
    },

    numberOnly($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    pageChange($event) {
      if ($event > 999) {
        this.page = this.maxPage;
      }
    },

    async goToPage(event) {
      if (event.which === 13) {
        if (this.page <= this.maxPage) {
          const query = {
            ...this.$route.query,
            page: this.page,
          };

          if (this.$route.query.page !== this.page) {
            await this.$router.replace({ query });
          }
          this.loadDiagnoseList();
        } else {
          this.page = this.maxPage;
          this.loadDiagnoseList();
        }
      }
    },

    async diagnosePagePrev() {
      if (this.page > 1) {
        this.page--;
        const query = {
          ...this.$route.query,
          page: this.page,
        };

        if (this.$route.query.page !== this.page) {
          await this.$router.replace({ query });
        }

        this.loadDiagnoseList();
      }
    },

    async diagnosePageNext() {
      if (this.page < this.maxPage) {
        this.page++;
        const query = {
          ...this.$route.query,
          page: this.page,
        };

        if (this.$route.query.page !== this.page) {
          await this.$router.replace({ query });
        }

        this.loadDiagnoseList();
      }
    },

    //send emit diagnose detail
    async loadDiagnoseDetail(diagnoseId) {
      const query = {
        ...this.$route.query,
        id: diagnoseId,
      };

      try {
        await this.$router.replace({ query });
      } catch (error) {
        return;
      }

      this.$emit('diagnose');
    },

    diagnoseFilter() {
      this.diagnoseFiltered = true;
      this.page = 1;
      this.loadDiagnoseList();
    },

    setActiveClass(diagnoseId) {
      if (String(this.$route.query.id) === String(diagnoseId)) {
        return 'active';
      } else {
        return '';
      }
    },
  },
};
</script>

<style scoped></style>
