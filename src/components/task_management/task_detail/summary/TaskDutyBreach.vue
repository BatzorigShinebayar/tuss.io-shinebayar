<template>
  <div class="mb-5">
    <h5 class="font-weight-bold mb-3">Duty breaches</h5>
    <b-table
      v-if="issues.length !== 0"
      :items="issues"
      :fields="tableFields"
      class="task-summary-table"
    >
      <template #cell(detail)="row">
        <Fa
          :icon="['fas', 'caret-circle-up']"
          :rotation="row.detailsShowing ? null : 180"
          size="2x"
          @click="row.toggleDetails"
          class="cursor-pointer text-deep-blue"
        />
      </template>
      <template #cell(conflict_type)="row">
        {{ breachTypeConverter(row.item.conflict_type) }}
      </template>
      <template #cell(employee)="row">
        {{ row.item.employee | get_employee_info }}
      </template>
      <template #cell(point)="row">
        <p :class="row.item.point < 0 ? 'text-danger' : ''">
          {{ row.item.point }}
        </p>
      </template>
      <template #cell(conflict_category)="row">
        <h5>
          <b-badge
            v-if="row.item.conflict_category === 'row.item.conflict_category'"
            variant="danger"
          >
            Yes
          </b-badge>
          <b-badge v-else variant="danger">No</b-badge>
        </h5>
      </template>
      <template #row-details="row">
        <div class="row">
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Duty:</p>
            <p>{{ row.item.duty }}</p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Duty type:</p>
            <p>{{ dutyTypeConverter(row.item.duty_type) }}</p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">By law:</p>
            <p>{{ row.item.regulation_name }}</p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Diagnosis:</p>
            <p>
              {{
                row.item.employee_check_conflict_diagnoses__emp_check_diagnose
              }}
            </p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Reason description:</p>
            <p>{{ row.item.reason }}</p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Suggestion:</p>
            <p>{{ row.item.suggestion }}</p>
          </div>
          <div class="col-lg-3 mb-3">
            <p class="font-weight-bold">Created date:</p>
            <p>{{ row.item.conflict_date }}</p>
          </div>
        </div>
      </template>
    </b-table>
    <b-alert v-else variant="primary" show>
      <Fa :icon="['fas', 'thumbs-up']" />
      This task has no duty breaches.
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'TaskDutyBreach',

  props: {
    issues: Array,
  },

  data() {
    return {
      tableFields: [
        {
          key: 'detail',
          label: '',
        },
        {
          key: 'conflict_type',
          label: 'Duty Breach Type',
        },
        {
          key: 'employee',
          label: 'Employee',
        },
        {
          key: 'point',
          label: 'Achivement Score',
        },
        {
          key: 'conflict_date',
          label: 'Effective Date',
        },
        {
          key: 'conflict_category',
          label: 'Affects salary',
        },
      ],
    };
  },

  methods: {
    breachTypeConverter(breachType) {
      for (const breach of this.$store.getters.company.key_info_categories) {
        if (breach.id === breachType) {
          return breach.name;
        }
      }
      return breachType;
    },

    dutyTypeConverter(dutyType) {
      for (const duty of this.$store.getters.company.duty_type) {
        if (duty.id === dutyType) {
          return duty.name;
        }
      }
      return dutyType;
    },
  },
};
</script>
