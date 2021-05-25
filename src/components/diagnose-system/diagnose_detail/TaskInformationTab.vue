<template>
  <div class="bg-light rounded p-4">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-lg-12">
            <div class="d-flex">
              <a class="cursor-pointer text-primary mr-3 mt-2">
                <Fa :icon="['fas', 'caret-circle-down']" size="2x" />
              </a>
              <div class="col-lg-10">
                <h6 class="font-weight-bold mb-1">
                  {{ taskDetail.code }} : {{ taskDetail.name }}
                </h6>
              </div>
              <div class="d-flex align-items-start col-lg-2 mt-2">
                <b-button squared variant="outline-secondary">Comment</b-button>
                <b-button variant="dark">Vote</b-button>
                <!--                  <b-col lg="4" class="pb-2"><b-button size="sm">Comment</b-button></b-col>-->
                <!--                  <b-col lg="6" class="pb-2"><b-button size="sm" variant="dark">Vote</b-button></b-col>-->
              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-2">
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">Started Date:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.start_date }}
              </p>
            </div>
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">End Date:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.end_date }}
              </p>
            </div>
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">Initiator:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.initiator.id | get_employee_info }}
              </p>
            </div>
          </div>
          <div class="col-md-4 mt-2">
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">Task type:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.task_type | get_task_type_code }}
              </p>
            </div>
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">Department:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.department_id.id | get_department_short_name }}
              </p>
            </div>
            <div class="d-flex align-items-center">
              <p class="text-black-50 mt-1 pr-2">Executing:</p>
              <p class="font-weight-bold mt-1 pr-2">
                {{ taskDetail.executing_employee.id | get_employee_info }}
              </p>
            </div>
          </div>
          <div class="col-md-12 mt-3 mb-3">
            <div class="d-flex align-items-end">
              <p class="text-black-50 mt-1 pr-2">Team:</p>
              <p class="font-weight-bold mt-1 pr-2 right">
                {{ taskDetail.task_team }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <StageGroupTable
      if="taskStageGroup"
      :stage="taskStageGroup"
      :algorithm="algorithm"
      :use_perform_task="false"
    />
  </div>
</template>
<script>
import StageGroupTable from '@/components/task_management/task_detail/StageGroupTable';
import axios from 'axios';

export default {
  name: 'TaskInformationTab',
  components: { StageGroupTable },
  data() {
    return {
      taskDetail: null,
      taskStageGroup: null,
      algorithm: null,
    };
  },
  props: {
    taskId: {
      type: Number,
    },
  },
  watch: {
    taskId() {
      this.getTaskDetail();
    },
  },
  created() {
    this.algorithm = this.taskDetail.algorithm;
    this.jsonData = this.taskDetail.json_data;
    if (this.taskDetail.task_stage_groups) {
      this.taskStageGroup = this.taskDetail.task_stage_groups;
    }

    if (this.jsonData) {
      if (this.jsonData.task_stage_groups) {
        this.taskStageGroup = this.jsonData.task_stage_groups;
      }
    }
  },
  mounted() {
    this.getTaskDetail();
  },
  methods: {
    async getTaskDetail() {
      if (this.taskId) {
        const newUrl = `/pages/plan/view_full_task_info/${this.taskId}/`;
        await axios
          .get(newUrl)
          .then((response) => {
            this.taskName = response.data.name;
            this.taskDetail = response.data;
            this.taskState = response.data.task_state;
            this.taskStageGroup = response.data.task_stage_groups;
            this.algorithm = response.data.algorithm;
            this.ready = true;
          })
          .catch(() => {
            document.location.history.back();
          });
      }
    },
    detailCollapse() {
      if (this.rotation === 0) {
        this.rotation = 180;
      } else {
        this.rotation = 0;
      }
    },
  },
};
</script>
<style scoped></style>
