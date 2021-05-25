<template>
  <div id="shortCut">
    <b-dropdown
      size="lg"
      variant="link"
      right
      toggle-class="text-decoration-none"
      no-caret
    >
      <template #button-content>
        <Fa :icon="['far', 'plus-octagon']" size="2x" id="shortCutButton" />
      </template>
      <b-dropdown-item v-b-toggle.task-create @click="createTask">
        <Fa :icon="['far', 'layer-plus']" fixed-width />
        Create Task
      </b-dropdown-item>
      <b-dropdown-item @click="SendDailyCheck">
        <Fa :icon="['far', 'clipboard-list-check']" fixed-width />
        Send Daily check
      </b-dropdown-item>
      <b-dropdown-item
        v-if="is_developer()"
        v-b-toggle.task-create
        @click="createAbsence"
      >
        Leave request
      </b-dropdown-item>
    </b-dropdown>
    <TaskCreate v-if="taskCreate" />
    <CreateCI04 v-if="createCI04" :sidebar-toggle="createCI04" />
    <Absence v-if="absence" />
  </div>
</template>

<script>
import TaskCreate from '@/components/task_management/task_list/create/TaskCreate';
import CreateCI04 from '@/components/crucial_information/CreateCI4';
import Absence from '@/components/stake-holder-management/items/AbsenceModal';
export default {
  name: 'ShortCutMenu',

  components: { TaskCreate, CreateCI04, Absence },
  data() {
    return {
      taskCreate: false,
      createCI04: false,
      absence: false,
    };
  },
  watch: {
    '$store.state.check.CICreateSideMenuToggle'(data) {
      this.createCI04 = data;
    },
    createCI04(data) {
      console.log('createCI04', data);
    },
  },
  methods: {
    createTask() {
      if (this.$route.name === 'task') {
        this.taskCreate = false;
      } else {
        this.taskCreate = true;
      }
    },
    SendDailyCheck() {
      this.toggleSidebar();
    },
    createAbsence() {
      this.absence = true;
      this.$root.$emit('bv::toggle::modal', 'absence-form');
    },
    async getDailyCheckByEmployeeCreate(params) {
      const response = await this.$store.dispatch(
        'getDailyCheckByEmployeeCreate',
        params
      );
      if (response.status === 200) {
        return response.data;
      }
    },
    async toggleSidebar() {
      const date = new Date().toISOString().slice(0, 10).replaceAll('/', '-');
      const partnerId = this.$store.getters.user.partner_id;
      const params = partnerId + '/' + date + '/';
      const response = await this.getDailyCheckByEmployeeCreate(params);
      if (response && response.employee_check.state === 'draft') {
        const dailyCheckJsonData = response;
        this.$store.dispatch('dailyCheckCreate', dailyCheckJsonData);
        if (dailyCheckJsonData.employee_check.json_data !== null) {
          const employeeCheckData = dailyCheckJsonData.employee_check.json_data;
          this.$store.dispatch('dailyCheckData', employeeCheckData);
        } else {
          const jsonData = {
            dailycheck_id: response.employee_check.id,
            date,
            employee: parseInt(partnerId),
            state: '',
            user_id: this.$store.getters.user.id,
            is_conclusion_abnormal: false,
            system_problems: [],
            problems: [],
            achievements: [],
            reminders: [],
          };
          // this.$store.state['daily_check_data'] = jsonData;
          this.$store.dispatch('dailyCheckData', jsonData);
        }
        if (this.$route.name === 'crucialInfo04') {
          this.$store.dispatch('CICreateSideMenuToggle', !this.createCI04);
        } else {
          this.createCI04 = !this.createCI04;
        }
      }
    },
  },
};
</script>
<style scoped>
#shortCut {
  position: fixed;
  z-index: 999 !important;
  bottom: 10px;
  right: 0px;
  height: 55.49px;
  width: 69.2px;
}
#shortCutButton {
  color: orange;
}
</style>
