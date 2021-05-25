<template>
  <div>
    <b-col class="mt-2 flex-space-between" cols="12">
      <b-col class="d-flex" cols="4">
        <h4 class="mr-2" style="border-radius: 25px">
          Task Configuration Status:
        </h4>
        <h5 class="d-block">
          <b-badge
            v-if="taskConfiguration.state === 'confirm'"
            variant="success"
          >
            {{ taskConfiguration.state }}
          </b-badge>
          <b-badge
            v-else-if="taskConfiguration.state === 'sent'"
            variant="warning"
          >
            {{ taskConfiguration.state }}
          </b-badge>
          <b-badge v-else variant="danger">
            {{ taskConfiguration.state }}
          </b-badge>
        </h5>
      </b-col>
      <b-col class="justify-content-center" cols="4">
        <div class="float-right d-flex">
          <!--          <b-button-->
          <!--            v-if="taskConfiguration.state === 'draft'"-->
          <!--            v-b-toggle.taskConf-edit-->
          <!--            class="mr-3 white-btn"-->
          <!--          >-->
          <!--            Edit</b-button-->
          <!--          >-->
          <div
            v-if="
              taskConfiguration.state === 'sent' &&
              isMyTskConf(taskConfiguration.employee_id) &&
              canConfirm &&
              canReject
            "
          >
            <b-button
              v-if="canReject"
              v-b-modal.reject-CI
              @click="rejectModal()"
              class="mr-3 dark-btn"
            >
              Reject</b-button
            >
            <b-button v-if="canConfirm" class="dark-btn" @click="confirm()">
              Confirm</b-button
            >
          </div>
        </div>
      </b-col>
    </b-col>
    <b-col class="mt-4" cols="12">
      <ConfigurationViewDashboard :configuration="taskConfiguration" />
    </b-col>
    <b-col class="mt-3" cols="12">
      <ConfigurationViewReasonType
        :configuration="taskConfiguration.json_data"
      />
    </b-col>
    <b-col
      class="mt-3"
      cols="12"
      v-if="
        !taskConfiguration.json_data.delete_task &&
        !taskConfiguration.description
      "
    >
      <ConfigurationViewTaskInfo
        :algorithm="algorithm"
        :configured-task="taskConfiguration.json_data"
      />
    </b-col>
    <!--
    <b-modal id="reject-CI" ref="reject-CI" title="Rejecting reason">
      <b-col class="d-flex mb-2" cols="12">
        <p class="modal-text mr-2">Configuration name:</p>
        <b class="modal-text">{{ modalData.confName }}</b>
      </b-col>
      <b-col class="d-flex mb-2" cols="12">
        <p class="modal-text mr-2">Submitted employee:</p>
        <b class="modal-text">{{ modalData.employee }}</b>
      </b-col>
      <b-col class="d-flex mb-2" cols="12">
        <p class="modal-text mr-2">Date:</p>
        <b class="modal-text">{{ modalData.date }}</b>
      </b-col>
      <b-col cols="12">
        <p class="modal-text">Reason:</p>
        <b-form-textarea
          v-model="modalData.reason"
          placeholder="Write reason why you rejecting"
        ></b-form-textarea>
        <p id="reason_warning" class="text-danger" style="display: none">
          Please write reason why you rejecting
        </p>
      </b-col>
      <template #modal-footer="{ cancel }">
        <div class="w-100">
          <b-button variant="dark" class="ml-2 float-right" @click="reject">
            Submit
          </b-button>
          <b-button class="float-right" @click="cancel()"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
    -->
    <!--    <TaskConfigurationEdit :configuration="taskConfiguration" />-->
  </div>
</template>

<script>
import ConfigurationViewDashboard from '@/components/task_management/configurations/component/ConfigurationViewDashboard';
import ConfigurationViewReasonType from '@/components/task_management/configurations/component/ConfigurationViewReasonType';
import ConfigurationViewTaskInfo from '@/components/task_management/configurations/component/ConfigurationViewTaskInfo';
export default {
  name: 'TaskConfigurationTab',
  components: {
    ConfigurationViewDashboard,
    ConfigurationViewReasonType,
    ConfigurationViewTaskInfo,
  },
  props: {
    taskConfId: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    taskConfId() {
      this.getTaskCoordinationById();
    },
  },
  data() {
    return {
      taskConfiguration: {
        state: 'draft',
        json_data: { delete_task: false },
        task: { name: '' },
        employee_id: '',
      },
      canReject: false,
      canConfirm: false,
      algorithm: 0,
      modalData: {
        confName: null,
        employee: null,
        date: null,
        reason: null,
        id: null,
        index: null,
        data: null,
      },
    };
  },
  beforeMount() {
    const param = this.taskConfId + '/';
    console.log(this.taskConfId);
    this.getTaskCoordinationById(param);
  },
  mounted() {},
  methods: {
    async getTaskCoordinationById() {
      const params = this.taskConfId + '/';

      this.taskConfiguration = null;
      const response = await this.$store.dispatch(
        'getTaskCoordinationById',
        params
      );
      if (response.status === 200) {
        if (response.data.state === 'confirm') {
          this.taskConfiguration = response.data;
        } else {
          this.taskConfiguration = response.data;
        }
        this.algorithm = this.taskConfiguration.task.algorithm;
      }
    },
  },
};
</script>

<style scoped>
.dark-btn {
  background-color: #2a3042;
  color: white;
}
.white-btn {
  background-color: white;
  color: #2a3042;
  border: solid 2px #2a3042;
}
</style>
