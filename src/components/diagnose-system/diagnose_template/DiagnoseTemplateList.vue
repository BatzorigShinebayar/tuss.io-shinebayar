<template>
  <div v-if="ready">
    <div class="d-flex justify-content-between align-items-center mb-3 w-100">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex align-items-center font-weight-bold">
          Diagnosis templates
          <h2></h2>
        </div>
      </div>
    </div>

    <b-table
      striped
      :hover="true"
      :items="tableData"
      :fields="tableField"
      :head-variant="'dark'"
      :responsive="true"
    >
      <template #cell(code)="data">
        <div class="text-nowrap">
          {{ data.item.code }}
        </div>
      </template>

      <template #cell(symptom)="data">
        <router-link
          :to="{ name: 'diagnose-detail', params: { id: data.item.id } }"
          class="task-link"
        >
          {{ data.item.symptom }}
        </router-link>
      </template>

      <template #cell(diagnosis_template_lines)="data">
        <div class="text-nowrap">
          <ul class="user-list">
            <li
              v-for="(diagnose_line, index) in data.item
                .diagnosis_template_lines"
              :key="index"
            >
              <b-badge v-if="diagnose_line.algorithm" variant="warning">{{
                diagnose_line.algorithm | get_algorithm_full_name
              }}</b-badge>
              <b-badge v-if="diagnose_line.regulation" variant="primary">{{
                diagnose_line.regulation | get_regulation_full_name
              }}</b-badge>
              <b-badge v-if="diagnose_line.use_task_algorithm" variant="success"
                >Use Task algorithm</b-badge
              >
              <b-badge v-if="diagnose_line.is_tus40_diagnosis" variant="danger"
                >Use System diagnoses</b-badge
              >
            </li>
          </ul>
        </div>
      </template>

      <template #cell(edit)="data">
        <div class="text-nowrap">
          <b-button
            v-b-toggle.diagnoseTemplate-edit
            @click="diagnoseTemp(data)"
            class="mr-3 white-btn"
          >
            Edit
          </b-button>
        </div>
      </template>
    </b-table>

    <div class="d-flex justify-content-center mt-4">
      <b-pagination
        v-if="diagnoseCount > 0"
        v-model="diagnosePage"
        pills
        :total-rows="diagnoseCount"
        :per-page="50"
        @change="diagnosePagination"
      ></b-pagination>
    </div>
    <!--    <p class="text-right mb-5">Total: {{ diagnoseCount }}</p>-->
    <DiagnoseTemplateEdit :diagnoseTemplate="diagnosePassItem" />
  </div>
</template>

<script>
import DiagnoseTemplateEdit from '@/components/diagnose-system/diagnose_template/DiagnoseTemplateEdit';
export default {
  name: 'DiagnoseTemplateList',

  components: {
    DiagnoseTemplateEdit,
  },

  data() {
    return {
      diagnosePassItem: null,
      diagnoseConfiguration: null,
      ready: true,
      tableData: this.$store.getters.company.diagnosis_templates,
      tableField: [
        {
          key: 'code',
          label: 'Code',
          sortable: true,
        },
        {
          key: 'name',
          label: 'Symptom',
          sortable: true,
        },
        {
          key: 'sequence',
          label: 'Sequence',
          sortable: false,
        },
        {
          key: 'is_active',
          label: 'is_active',
          sortable: true,
        },
        {
          key: 'diagnosis_template_lines',
          label: 'Diagnosis_template_lines',
          sortable: false,
        },
        {
          key: 'edit',
          sortable: false,
        },
      ],
      tableSort: [
        {
          field: 'created_date',
          direction: 'asc',
        },
      ],
      tableParams: null,
      tableUrl: null,
      activeCompany: this.$store.getters.activeCompany,
      searchDiagnoseName: this.$route.query.search || null,
      searchDiagnoseNameActive: false,
      diagnoseName: null,
      diagnosePage: 1,
      diagnoseData: null,
      diagnoseCount: 0,
      searchData: null,
      diagnoseDetailActive: false,
      filterActive: false,
      filterClear: false,
      filterValues: null,
      filterLoad: false,
    };
  },

  methods: {
    diagnoseTemp(data) {
      this.diagnosePassItem = data.item;
    },
    async diagnosePagination(page) {
      this.diagnosePage = page;
      const query = Object.assign({}, this.$route.query);
      query.page = page;
      await this.$router.replace({ query });
    },
  },
};
</script>

<style scoped></style>
