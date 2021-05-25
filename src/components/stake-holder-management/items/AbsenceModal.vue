<template>
  <div>
    <b-modal id="absence-form" size="xl" title=" Form">
      <b-col cols="12">
        <b-form-row>
          <b-col cols="4">
            <b-form-group label="Employee Name">
              <b-form-input
                :value="employee"
                class="custom-input"
                disabled
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Job title">
              <b-form-input
                :value="job_title"
                class="custom-input"
                disabled
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="Creating date">
              <b-form-input
                :value="date | datetime"
                class="custom-input"
                disabled
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="12">
            <b-form-group
              :label="'Choose' + leave_data.text + ' reason duration'"
            >
              <b-form-radio-group
                v-model="leave_type"
                :options="options"
                name="absence-duration"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-form-row>
        <div>
          <b-form-row>
            <b-col cols="3">
              <b-form-group :label="leave_data.text + ' reason starting date'">
                <b-input-group>
                  <input
                    class="form-control custom-input"
                    type="datetime-local"
                    v-model="start_date"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group :label="leave_data.text + ' end date'">
                <b-input-group>
                  <input
                    class="form-control custom-input"
                    type="datetime-local"
                    v-model="end_date"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col class="pl-5" cols="3">
              <b-form-group :label="leave_data.text + ' duration in hour'">
                <b-input-group style="width: 105px">
                  <b-input-group-prepend class="m-0">
                    <b-button class="plan-time custom-input">
                      <i
                        class="bx bxs-time-five align-middle"
                        variant="dark"
                      ></i>
                    </b-button>
                  </b-input-group-prepend>
                  <b-input
                    class="custom-input"
                    placeholder="00:00"
                    v-model="leave_duration"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <p class="mb-2">
            {{ leave_data.text }}: {{ start_date | dateFix }} to
            {{ end_date | dateFix }}
          </p>
        </div>
        <b-form-row v-if="!leave_data.is_vacation_leave">
          <b-col cols="8">
            <b-form-group :label="leave_data.text + ' reason'">
              <b-form-textarea v-model="reason" row="3"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row class="d-flex w-100">
          <div class="hl" />
        </b-form-row>
        <b-form-row>
          <b-col cols="12">
            <b-form-group label="Choose assign tasks to other employee">
              <b-form-radio-group
                v-model="is_assign_task"
                :options="assign_task_option"
                name="assign-task"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-form-row>
        <div v-if="is_assign_task">
          <p class="mb-2">Assign task to other employee</p>
          <b-form-row v-for="(task, index) in assigning_tasks" :key="index">
            <b-col cols="4">
              <b-form-group label="Task Name">
                <treeselect
                  v-model="task.task_id"
                  placeholder="- Choose -"
                  :multiple="false"
                  :options="tasks"
                  :clearable="false"
                ></treeselect>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="Assigning Employee">
                <treeselect
                  v-model="task.employee_id"
                  placeholder="- Choose -"
                  :multiple="false"
                  :options="employees"
                  :clearable="false"
                ></treeselect>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group label="Assigned employee's verification">
                <b-button v-if="task.verified" variant="success"
                  >Verified</b-button
                >
                <b-button v-else variant="warning">Not Verified</b-button>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-button variant="deep-blue" @click="addTask">+ Add Task</b-button>
        </div>
        <div v-else>
          <p>Do tasks by myself during '{{ leave_data.text }}' time</p>
        </div>
        <div v-if="!leave_data.is_vacation_leave">
          <b-form-row class="d-flex w-100">
            <div class="hl" />
          </b-form-row>
          <b-form-row>
            <b-col cols="12">
              <b-form-group label="Use leave as vacation leave">
                <b-form-radio-group
                  v-model="use_as_vacation"
                  :options="use_as_vacation_option"
                  name="absence-types"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <div v-if="use_as_vacation === 1">
            <p>
              <strong>{{ this.minToDayHourMin(vacation_days) }}</strong> left
            </p>
          </div>
        </div>
      </b-col>
      <template #modal-footer="{ close }">
        <div class="w-100">
          <b-button variant="dark" class="ml-2 float-right" @click="create">
            Send
          </b-button>
          <b-button class="float-right" @click="close"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
  name: 'AbsenceModal',

  components: { Treeselect },

  props: {},
  filters: {
    dateFix(date) {
      return date.replaceAll('T', ' ');
    },
  },
  data() {
    return {
      name: null,
      job_title: null,
      date: new Date(),
      employee: null,
      reason: null,
      start_date: new Date().toISOString().substring(0, 16),
      end_date: new Date().toISOString().substring(0, 16),
      leave_type: 1,
      leave_reason_type_id: 1,
      leave_data: 'Absence for hours',
      options: [],
      absence_date: new Date(),
      tasks: [],
      assigning_tasks: [],
      employees: [],
      is_assign_task: true,
      assign_task_option: [
        { text: 'Assign tasks to others', value: true },
        { text: 'Do tasks by myself during leave time', value: false },
      ],
      vacation_days: '0 work days 0 hour 0 minute',
      use_as_vacation: 0,
      use_as_vacation_option: [
        { text: 'Yes', value: 1 },
        { text: 'No', value: 0 },
      ],
      leave_duration: null,
      leave_duration_min: null,
      system_vacation_leave_id: null,
      vacation_id: null,
    };
  },
  watch: {
    leave_type(id) {
      this.leave_reason_type_id = id;
      for (const i in this.options) {
        if (this.options[i].value === id) {
          this.leave_data = this.options[i];
        }
      }
    },
    use_as_vacation(data) {
      if (data === 1) {
        this.leave_reason_type_id = this.system_vacation_leave_id;
      }
    },
    leave_duration(data) {
      if (data.includes(':')) {
        const value = data.split(':');
        const hour = parseInt(value[0]) | 0;
        let min = parseInt(value[1]) | 0;
        min = min + hour * 60;
        this.leave_duration_min = min;
      }
    },
  },
  mounted() {
    const employeeData = this.$store.getters.company.employees;
    for (const i in employeeData) {
      if (employeeData[i].partner__id === this.$store.getters.user.partner_id) {
        this.employee =
          employeeData[i].partner__last_name +
          ' ' +
          employeeData[i].partner__name;
      }
      if (employeeData[i].is_active === '1') {
        this.employees.push({
          id: employeeData[i].partner__id,
          label:
            employeeData[i].partner__last_name +
            ' ' +
            employeeData[i].partner__name,
        });
      }
    }

    const companies = this.$store.getters.user.companies;
    for (const i in companies) {
      if (companies[i].organization_id === this.$store.getters.activeCompany) {
        this.job_title = companies[i].job_title;
      }
    }
    this.getLeavetypes(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&is_system_default=true`,
      true
    );
    const year = new Date().getFullYear();
    this.getVacationLeave(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&year=${year}&partner=${this.$store.getters.user.partner_id}`,
      true
    );
  },
  methods: {
    async getLeavetypes(params, system_dedault = false) {
      const response = await this.$store.dispatch('getLeavetypes', params);
      if (response.status === 200) {
        if (response.data.total > 0) {
          const result = response.data.results;
          if (system_dedault) {
            this.options = [];
            for (const i in result) {
              const json = {
                text: result[i].name,
                value: result[i].id,
                is_system_default: result[i].is_system_default,
                is_vacation_leave: result[i].is_vacation_leave,
              };
              this.options.push(json);
              if (i === '0') {
                this.leave_type = result[i].id;
              }
              if (result[i].is_vacation_leave) {
                this.system_vacation_leave_id = result[i].id;
              }
            }

            this.getLeavetypes(
              `?organization=${this.$store.getters.activeCompany}&is_active=1&is_system_default=false`
            );
          } else {
            for (const i in result) {
              const json = {
                text: result[i].name,
                value: result[i].id,
                is_system_default: result[i].is_system_default,
                is_vacation_leave: result[i].is_vacation_leave,
              };
              this.options.push(json);
            }
          }
        }
      }
    },
    async getVacationLeave(params) {
      const response = await this.$store.dispatch(
        'getVacationLeaveDays',
        params
      );
      if (response.status === 200) {
        if (
          response.data.total > 0 &&
          response.data.results[0].state === 'confirm'
        ) {
          this.vacation_days = response.data.results[0].remaining_vacation_days;
          this.vacation_id = response.data.results[0].id;
        }
      }
    },
    async updateVacationLeave(params) {
      const response = await this.$store.dispatch(
        'putVacationLeaveDays',
        params
      );
      if (response.status === 200) {
        //
      }
    },
    async createLeaveRequest(params) {
      const response = await this.$store.dispatch('createLeaveRequest', params);
      if (response.status === 200) {
        //
        if (this.leave_reason_type_id === this.system_vacation_leave_id) {
          const param = {
            urlParam: this.vacation_id + '/',
            urlData: {
              id: this.vacation_id,
              remaining_vacation_days:
                this.vacation_days - params.leave_duration,
            },
          };
          // this.updateVacationLeave(param);
        }
        this.$root.$emit('bv::toggle::modal', 'absence-form');
      }
    },
    minToDayHourMin(time) {
      const days = parseInt(time / 8 / 60);
      const hour = parseInt((time - days * 60 * 8) / 60);
      const hour_mem = (time - days * 60 * 8) / 60;
      let min = (hour_mem - hour).toFixed(3) * 100;
      min = parseInt((min * 60) / 100);
      return days + ' work days ' + hour + ' hour ' + min + ' minute';
    },
    addTask() {
      this.assigning_tasks.push({
        task_id: null,
        employee_id: this.$store.getters.user.partner_id,
        verified: false,
      });
    },
    onContext(ctx) {
      this.absence_date = ctx.selectedYMD;
    },
    create() {
      const params = {
        created_date: new Date(),
        created_user: this.$store.getters.user.id,
        is_active: '1',
        is_transfer_task: this.is_assign_task,
        leave_duration: this.leave_duration_min,
        leave_start_datetime: this.start_date.replaceAll('T', ' '),
        leave_end_datetime: this.end_date.replaceAll('T', ' '),
        leave_reason_type_id: this.leave_reason_type_id,
        leave_reason_description: this.reason,
        organization_id: this.$store.getters.activeCompany,
        partner_id: this.$store.getters.user.partner_id,
        state: 'sent',
      };
      this.createLeaveRequest(params);
    },
  },
};
</script>
<style scoped></style>
