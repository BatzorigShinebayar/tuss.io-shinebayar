<template>
  <div>
    <NavBar>
      <template #top>
        <h4 class="p-3" style="min-width: 290px">
          {{ taskConfiguration.task.name }}
        </h4>
      </template>
    </NavBar>
    <router-link
      class="btn"
      :to="{
        name: 'task-configurations',
      }"
    >
      <Fa :icon="['fas', 'chevron-left']" /> Буцах
    </router-link>
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
    <!--    <TaskConfigurationEdit :configuration="taskConfiguration" />-->
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar';
// import TaskConfigurationEdit from '@/components/task_management/configurations/component/TaskConfigurationEdit';
import ConfigurationViewDashboard from '@/components/task_management/configurations/component/ConfigurationViewDashboard';
import ConfigurationViewReasonType from '@/components/task_management/configurations/component/ConfigurationViewReasonType';
import ConfigurationViewTaskInfo from '@/components/task_management/configurations/component/ConfigurationViewTaskInfo';

export default {
  name: 'TaskConfigurationView',
  components: {
    NavBar,
    ConfigurationViewDashboard,
    ConfigurationViewReasonType,
    ConfigurationViewTaskInfo,
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
    const param = this.$route.params.id + '/';
    this.getTaskCoordinationById(param);
    const departments = this.$store.getters.company.department;
    if (this.permission('tj10_hm1')) {
      this.canConfirm = true;
      this.canReject = true;
      this.isHM1 = true;
    } else {
      for (const i in departments) {
        if (
          departments[i].manager__id === this.$store.getters.user.partner_id
        ) {
          if (this.permission('tj10_hm2')) {
            this.canConfirm = true;
            this.canReject = true;
          }
        }
      }
    }
  },
  mounted() {},
  methods: {
    async updateTaskCoordination(params) {
      const response = await this.$store.dispatch(
        'updateTaskCoordination',
        params
      );
      if (response.status === 200) {
        alert(response.data.msg);
        const param = this.$route.params.id + '/';
        this.getTaskCoordinationById(param);
      }
    },
    async getTaskCoordinationById(params) {
      this.taskConfiguration = null;
      const response = await this.$store.dispatch(
        'getTaskCoordinationById',
        params
      );
      if (response.status === 200) {
        this.taskConfiguration = response.data;
        this.algorithm = this.taskConfiguration.task.algorithm;
      }
    },
    confirm() {
      const params = this.taskConfiguration;
      params.state = 'confirm';
      params.json_data.state = 'confirm';
      delete params.active;
      delete params.eid;
      delete params.created_date;
      delete params.created_user;
      params.task_id = params.task.id;
      delete params.task;
      const now = new Date();
      params.updated_date = now;
      params.updated_user = this.$store.getters.user.id;
      params.json_data.updated_date = now;
      params.json_data.updated_user = this.$store.getters.user.id;
      const jsonData = {
        urlParam: this.taskConfiguration.id + '/',
        urlData: params.json_data,
      };
      this.updateTaskCoordination(jsonData);
    },
    rejectModal() {
      const data = this.taskConfiguration;
      this.modalData.data = data;
      this.modalData.confName = data.name;
      const employees = this.$store.getters.company.employees;
      for (const i in employees) {
        if (employees[i].partner__id === data.employee) {
          this.modalData.employee =
            employees[i].partner__last_name + ' ' + employees[i].partner__name;
        }
      }
      const now = new Date();
      this.modalData.date = now.toISOString().slice(0, 10).replaceAll('/', '-');
      this.modalData.id = data.id;
      this.modalData.index = data.index;
    },
    reject() {
      if (this.modalData.reason !== null) {
        document.getElementById('reason_warning').style.display = 'none';
        const params = this.modalData.data;
        params.state = 'draft';
        params.description = this.modalData.reason;
        params.json_data.state = 'draft';
        delete params.active;
        delete params.eid;
        delete params.created_date;
        delete params.created_user;
        params.task_id = params.task.id;
        delete params.task;
        const now = new Date();
        params.updated_date = now;
        params.updated_user = this.$store.getters.user.id;
        const jsonData = {
          urlParam: params.id + '/',
          urlData: params,
        };
        this.updateTaskCoordination(jsonData);
        this.$refs['reject-CI'].hide();
      } else {
        document.getElementById('reason_warning').style.display = 'block';
      }
    },
    isMyTskConf() {
      return true;
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
