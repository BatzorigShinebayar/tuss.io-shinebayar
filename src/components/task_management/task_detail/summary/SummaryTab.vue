<template>
  <div class="mt-4">
    <h5 class="text-danger">Coming soon... under development...</h5>
    <div class="d-flex justify-content-end align-items-center mb-3">
      <b-button variant="primary" @click="printPage">
        <Fa :icon="['fas', 'print']" />
        Print
      </b-button>
    </div>

    <div id="summary-print">
      <TaskSummaryInfo
        :totalHours="totalHours"
        :keyInformation="keyInformation"
      />
      <TaskPlannedHours :plannedHours="plannedHours" />
      <TaskDutyBreach :issues="issues" />
      <TaskConfigurationSummary :taskConfigurations="taskConfigurations" />
    </div>
  </div>
</template>

<script>
import TaskSummaryInfo from '@/components/task_management/task_detail/summary/TaskSummaryInfo';
import TaskPlannedHours from '@/components/task_management/task_detail/summary/TaskPlannedHours';
import TaskDutyBreach from '@/components/task_management/task_detail/summary/TaskDutyBreach';
import TaskConfigurationSummary from '@/components/task_management/task_detail/summary/TaskConfigurationSummary';
import axios from 'axios';

export default {
  name: 'SummaryTab',

  components: {
    TaskSummaryInfo,
    TaskPlannedHours,
    TaskDutyBreach,
    TaskConfigurationSummary,
  },

  data() {
    return {
      taskConfigurations: [],
      totalHours: null,
      plannedHours: null,
      keyInformation: null,
      issues: [],
    };
  },

  watch: {
    $route() {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    printPage() {},

    loadData() {
      const taskId = this.$route.query.id;

      if (!taskId) {
        return;
      }

      const urlPlan = `pages/plan/task-summary-plan/${taskId}/`;
      axios.get(urlPlan).then((response) => {
        this.taskConfigurations = response.data;
      });

      const urlCheck = `pages/plan/task-summary-check/${taskId}/`;
      axios.get(urlCheck).then((response) => {
        this.totalHours = response.data.total_hours;
        this.plannedHours = response.data.planned_hours;
        this.keyInformation = response.data.key_information;
        this.issues = response.data.issues;
      });
    },
  },
};
</script>
