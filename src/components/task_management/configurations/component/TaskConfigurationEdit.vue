<template>
  <b-sidebar
    id="taskConf-edit"
    title="Task configuration"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div class="p-3" v-if="configuration !== null">
      <b-form-group label="Configuring task" label-for="configuring-task">
        <b-form-input
          id="configuring-task"
          v-model="configuration.task.name"
          disabled
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Reason for configuration"
        label-for="reason-for-configuration"
      >
        <treeselect
          id="reason-for-configuration"
          v-model="reasonSelected"
          :multiple="false"
          :options="reasons"
          @input="action"
          :clearable="false"
        />
      </b-form-group>
      <b-form-group label="Verifying documents" label-for="documents">
        <b-form-textarea
          id="documents"
          v-model="documentData"
          @input="action"
          rows="3"
          required
        ></b-form-textarea>
        <span
          v-if="!this.$v.documentData.required && formSubmit"
          class="text-danger"
        >
          Documents are required
        </span>
      </b-form-group>

      <b-form-group label-for="task-configuration-type">
        <b-form-radio-group
          id="task-configuration-type"
          v-model="typeSelected"
          :options="types"
          class="tus-radio-btn"
        >
        </b-form-radio-group>
      </b-form-group>
      <div class="break"></div>
      <div v-if="typeSelected === 'Configure Task'">
        <configureTaskDetail
          :configuration="taskConfiguration"
          @emit_data="emitConfigureDetail"
        />
      </div>
    </div>

    <template #footer="{ hide }">
      <b-col cols="12" class="d-flex bg-secondary py-3 footer">
        <b-col class="pl-0" cols="4">
          <p class="btn sendBtn w-100" @click="setConfiguringType('draft')">
            Save
          </p>
        </b-col>
        <b-col class="p-0" cols="5">
          <p class="btn sendBtn w-100" @click="setConfiguringType('sent')">
            Send
          </p>
        </b-col>
        <b-col class="pr-0" cols="3">
          <p class="cancelBtn w-100 btn" @click="hide">Close</p>
        </b-col>
      </b-col>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import Treeselect from '@riophae/vue-treeselect';
import configureTaskDetail from '@/components/task_management/configurations/component/ConfigureTaskEditDetail';

export default {
  name: 'TaskConfiguration',
  components: { Treeselect, configureTaskDetail },
  props: {
    configuration: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      taskData: [],
      reasonSelected: [1],
      reasons: [],
      documentData: '',
      typeSelected: 'Configure Task',
      types: ['Configure Task', 'Cancel task'],
      formSubmit: false,
      jsonEmployeeChange: {
        task_stage: null,
        prev_employee: null,
        next_employee: null,
        created_user: this.$store.getters.user.id,
        updated_user: this.$store.getters.user.id,
      },
      jsonReason: {
        task_stage_coordination_reason: null,
        evidence: '',
        created_user: this.$store.getters.user.id,
        updated_user: this.$store.getters.user.id,
      },
      sendingJsonData: {
        id: null,
        name: '',
        task_id: null,
        change_name: false,
        change_dep: false,
        change_ex_emp: false,
        change_sfunc: false,
        delete_task: false,
        change_task_type: false,
        prev_task_type: null,
        next_task_type: null,
        prev_name: null,
        next_name: null,
        prev_dep: null,
        next_dep: null,
        prev_execute_emp: null,
        next_execute_emp: null,
        prev_sfunc: null,
        next_sfunc: null,
        organization: this.$store.getters.activeCompany,
        department: null,
        manager: null,
        employee: this.$store.getters.user.partner_id,
        state: 'draft',
        updated_date: new Date(),
        updated_user: this.$store.getters.user.id,
        date_change_lines: [],
        stage_group_employee_change_lines: [],
        employee_change_lines: [],
        reason_lines: [],
      },
      incEmittedData: {},
      isValidEmit: false,
      sidebarToggle: false,
      taskConfiguration: [],
    };
  },

  validations: {
    documentData: { required },
  },

  mounted() {
    this.reasonSelected[0] =
      this.configuration.json_data.reason_lines[0].task_stage_coordination_reason;
    this.documentData = this.configuration.json_data.reason_lines[0].evidence;
    if (this.configuration.delete_task) {
      this.typeSelected = this.types[1];
    } else {
      this.typeSelected = this.types[0];
    }
    this.getCoordinationReason();
    this.taskConfiguration = this.configuration;
  },
  methods: {
    async updateTaskCoordination(params) {
      const param = {
        urlParam: params.id + '/',
        urlData: params,
      };
      const response = await this.$store.dispatch(
        'updateTaskCoordination',
        param
      );
      if (response.status === 200) {
        alert(response.data.msg);
        this.sidebarToggle = false;
        console.log('sentJsonData', response.data, param);
      }
    },
    emitConfigureDetail(data) {
      console.log('emit', data);
      this.isValidEmit = data.isValid;
      this.incEmittedData = data;
    },
    async getCoordinationReason() {
      const reasons = this.$store.getters.company.coordination_reason;
      for (const i in reasons) {
        if (i === 0) {
          this.reasonSelected[i] = reasons[i].id;
        }
        const jsonData = {
          id: reasons[i].id,
          label: reasons[i].code + ' - ' + reasons[i].name,
        };
        this.reasons.push(jsonData);
      }
    },
    setConfiguringType(type) {
      this.formSubmit = true;
      this.$v.$touch();
      if (this.typeSelected === 'Cancel task') {
        this.isValidEmit = true;
      }
      if (this.$v.$invalid || !this.isValidEmit) {
        alert('Not Valid form data, \nPlease check task configuration form');
      } else {
        // let date = new Date();
        // date = date.toISOString().slice(0, 10).replaceAll('/', '-');
        this.sendingJsonData.name = this.configuration.name;
        this.sendingJsonData.id = this.configuration.id;
        this.sendingJsonData.task_id = this.configuration.task.id;
        this.sendingJsonData.department = this.configuration.department;
        this.sendingJsonData.manager = this.configuration.manager;
        if (this.typeSelected === 'Cancel task') {
          this.sendingJsonData.delete_task = true;
        } else {
          this.sendingJsonData.change_name = this.incEmittedData.change_name;
          this.sendingJsonData.change_dep = this.incEmittedData.change_dep;
          this.sendingJsonData.change_ex_emp =
            this.incEmittedData.change_ex_emp;
          this.sendingJsonData.change_sfunc = this.incEmittedData.change_sfunc;
          this.sendingJsonData.change_task_type =
            this.incEmittedData.change_task_type;
          this.sendingJsonData.prev_task_type =
            this.incEmittedData.prev_task_type;
          this.sendingJsonData.next_task_type =
            this.incEmittedData.next_task_type;
          this.sendingJsonData.prev_name = this.incEmittedData.prev_name;
          this.sendingJsonData.next_name = this.incEmittedData.next_name;
          this.sendingJsonData.prev_dep = this.incEmittedData.prev_dep;
          this.sendingJsonData.next_dep = this.incEmittedData.next_dep;
          this.sendingJsonData.prev_execute_emp =
            this.incEmittedData.prev_execute_emp;
          this.sendingJsonData.next_execute_emp =
            this.incEmittedData.next_execute_emp;
          this.sendingJsonData.prev_sfunc = this.incEmittedData.prev_sfunc;
          this.sendingJsonData.next_sfunc = this.incEmittedData.next_sfunc;
          this.sendingJsonData.date_change_lines =
            this.incEmittedData.date_change_lines;
          this.sendingJsonData.stage_group_employee_change_lines =
            this.incEmittedData.stage_group_employee_change_lines;
          this.sendingJsonData.employee_change_lines =
            this.incEmittedData.employee_change_lines;
          this.sendingJsonData.change_start_date =
            this.incEmittedData.change_start_date;
          this.sendingJsonData.prev_start_date =
            this.incEmittedData.prev_start_date;
          this.sendingJsonData.next_start_date =
            this.incEmittedData.next_start_date;
          this.sendingJsonData.change_end_date =
            this.incEmittedData.change_end_date;
          this.sendingJsonData.prev_end_date =
            this.incEmittedData.prev_end_date;
          this.sendingJsonData.next_end_date =
            this.incEmittedData.next_end_date;
        }
        this.sendingJsonData.state = type;

        let reasonSelected = '';
        if (typeof this.reasonSelected === 'number') {
          reasonSelected = this.reasonSelected;
        } else {
          reasonSelected = this.reasonSelected[0];
        }
        const jsonData = {
          task_stage_coordination_reason: reasonSelected,
          evidence: this.documentData,
          updated_user: this.$store.getters.user.id,
          updated_date: new Date(),
        };
        this.sendingJsonData.reason_lines[0] = jsonData;
        this.updateTaskCoordination(this.sendingJsonData);
      }
    },
  },
};
</script>

<style scoped>
.break {
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
}
.sendBtn {
  background-color: #2a3042;
  color: white;
}
.cancelBtn {
  background-color: white;
  color: #2a3042;
  border: solid 2px #2a3042;
}
</style>
