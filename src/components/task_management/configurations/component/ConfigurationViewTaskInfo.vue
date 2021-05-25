<template>
  <div>
    <div class="d-flex">
      <b-col class="p-0" cols="6">
        <div class="card mini-stats-wid mx-3">
          <div class="card-body flex-space-between h-100">
            <div class="stat w-100">
              <h5 class="font-weight-bold">Previous task Information</h5>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_name"
              >
                <p class="font-weight-bold">Task's old name:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_name }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_sfunc"
              >
                <p class="font-weight-bold">Task's old sub function:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_sfunc | subFunction(subFunctions) }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_task_type"
              >
                <p class="font-weight-bold">Task's old type:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_task_type }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_execute_emp"
              >
                <p class="font-weight-bold">Task's old executing employee:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_execute_emp | get_employee_info }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_dep"
              >
                <p class="font-weight-bold">Task's old department:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_dep | get_department_short_name }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_start_date"
              >
                <p class="font-weight-bold">Task's old start date:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_start_date }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.prev_end_date"
              >
                <p class="font-weight-bold">Task's old due date:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.prev_end_date }}
                </p>
              </div>
            </div>
          </div>
        </div></b-col
      >
      <b-col class="p-0" cols="6">
        <div class="card mini-stats-wid mx-3">
          <div class="card-body flex-space-between h-100">
            <div class="stat w-100">
              <h5 class="font-weight-bold">Configured task Information</h5>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_name"
              >
                <p class="font-weight-bold">Task's changed name:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_name }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_sfunc"
              >
                <p class="font-weight-bold">Task's changed sub function:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_sfunc | subFunction(subFunctions) }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_task_type"
              >
                <p class="font-weight-bold">Task's changed type:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_task_type }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_execute_emp"
              >
                <p class="font-weight-bold">
                  Task's changed executing employee:
                </p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_execute_emp | get_employee_info }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_dep"
              >
                <p class="font-weight-bold">Task's changed department:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_dep | get_department_short_name }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_start_date"
              >
                <p class="font-weight-bold">Task's changed start date:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_start_date }}
                </p>
              </div>
              <div
                class="flex-space-between pt-3"
                v-if="configuredTask.next_end_date"
              >
                <p class="font-weight-bold">Task's changed due date:</p>
                <p style="max-width: 250px">
                  {{ configuredTask.next_end_date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <div class="mt-3 d-flex">
      <b-col cols="6">
        <b-table
          id="oldStageGrpTable"
          ref="oldStageGrpTable"
          striped
          :fields="prevTableFields"
          :items="taskStageGroup"
        >
          <template #head(checkbox)>
            <div class="d-flex">
              <b-form-checkbox class="mx-auto" :value="true" />
            </div>
          </template>
          <template #cell(checkbox)>
            <div class="d-flex">
              <b-form-checkbox :value="true" class="mx-auto" />
            </div>
          </template>
          <template #cell(stage_code)="props">
            {{ props.item.stage_group.code }}
          </template>
          <template #cell(start_date)="props">
            <p v-if="props.item.prev_start_date">
              {{ props.item.prev_start_date }}
            </p>
            <p v-else>N/A</p>
          </template>
          <template #cell(due_date)="props">
            <p v-if="props.item.prev_end_date">
              {{ props.item.prev_end_date }}
            </p>
            <p v-else>N/A</p>
          </template>
          <template #cell(prev_employee)="props">
            <p v-if="props.item.prev_employee">
              {{ props.item.prev_employee | get_employee_info }}
            </p>
            <p v-else>N/A</p>
          </template>
        </b-table>
      </b-col>
      <b-col cols="6">
        <b-table
          id="newStageGrpTable"
          ref="newStageGrpTable"
          striped
          :fields="nextTableFields"
          :items="taskStageGroup"
        >
          <template #head(checkbox)>
            <div class="d-flex">
              <b-form-checkbox class="mx-auto" :value="true" />
            </div>
          </template>
          <template #cell(checkbox)>
            <div class="d-flex">
              <b-form-checkbox :value="true" class="mx-auto" />
            </div>
          </template>
          <template #cell(stage_code)="props">
            {{ props.item.stage_group.code }}
          </template>
          <template #cell(start_date)="props">
            <p v-if="props.item.next_start_date">
              {{ props.item.next_start_date }}
            </p>
            <p v-else>N/A</p>
          </template>
          <template #cell(due_date)="props">
            <p v-if="props.item.next_end_date">
              {{ props.item.next_end_date }}
            </p>
            <p v-else>N/A</p>
          </template>
          <template #cell(next_employee)="props">
            <p v-if="props.item.next_employee">
              {{ props.item.next_employee | get_employee_info }}
            </p>
            <p v-else>N/A</p>
          </template>
        </b-table>
      </b-col>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationDetail',
  components: {},
  props: {
    configuredTask: {
      type: Object,
      default: null,
    },
    algorithm: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    configuredTask() {
      this.getTaskDetailById();
    },
  },
  data() {
    return {
      subFunctions: [],
      prevTableFields: [
        {
          key: 'checkbox',
          label: '',
        },
        {
          key: 'stage_code',
          label: 'Stage Code',
          sortable: true,
        },
        {
          key: 'prev_employee',
          label: 'Previous assigned employee',
          sortable: true,
        },
        {
          key: 'start_date',
          label: 'Previous start date',
        },
        {
          key: 'due_date',
          label: 'Previous due date',
        },
      ],
      nextTableFields: [
        {
          key: 'checkbox',
          label: '',
        },
        {
          key: 'stage_code',
          label: 'Stage Code',
          sortable: true,
        },
        {
          key: 'next_employee',
          label: 'Changed assigned employee',
          sortable: true,
        },
        {
          key: 'start_date',
          label: 'Changed start date',
        },
        {
          key: 'due_date',
          label: 'Changed due date',
        },
      ],
      stageGrp: [],
      taskStageGroup: [],
    };
  },
  created() {},
  filters: {
    subFunction(value, list) {
      for (const val of list) {
        if (val.id === value) {
          value = val.code + ' - ' + val.name;
        }
      }
      return value;
    },
    stage(value, list) {
      for (const val of list) {
        if (val.id === value) {
          value = val.code;
        }
      }
      return value;
    },
  },
  beforeMount() {
    const functions = this.$store.getters.company.function;
    for (const i in functions) {
      for (const j in functions[i].sub_function) {
        this.subFunctions.push(functions[i].sub_function[j]);
      }
    }
    for (const algorithm of this.$store.getters.company.algorithm) {
      if (algorithm.id === this.algorithm) {
        for (const stageGrp of algorithm.stage_groups) {
          this.stageGrp.push(stageGrp);
        }
      }
    }
    if (
      this.configuredTask.date_change_lines.length > 0 ||
      this.configuredTask.stage_group_employee_change_lines.length > 0
    ) {
      this.getTaskDetailById();
    }
  },
  mounted() {},
  methods: {
    // async getTaskDetailById(params) {
    async getTaskDetailById() {
      const params = this.configuredTask.task_id + '/?active=1';
      const response = await this.$store.dispatch('getTaskDetailById', params);
      if (response.status === 200) {
        this.taskStageGroup = response.data.task_stage_groups;
        const taskStage = this.configuredTask.date_change_lines;
        const taskStageEmp =
          this.configuredTask.stage_group_employee_change_lines;
        for (const i in this.taskStageGroup) {
          for (const j in taskStageEmp) {
            if (
              this.taskStageGroup[i].id === taskStageEmp[j].task_stage_group_id
            ) {
              this.taskStageGroup[i].prev_employee =
                taskStageEmp[j].prev_employee;
              this.taskStageGroup[i].next_employee =
                taskStageEmp[j].next_employee;
            }
          }
          for (const j in taskStage) {
            if (
              this.taskStageGroup[i].id === taskStage[j].task_stage_group_id
            ) {
              this.taskStageGroup[i].prev_start_date =
                taskStage[j].prev_start_date;
              this.taskStageGroup[i].next_start_date =
                taskStage[j].next_start_date;
              this.taskStageGroup[i].prev_end_date = taskStage[j].prev_end_date;
              this.taskStageGroup[i].next_end_date = taskStage[j].next_end_date;
            }
          }
        }
        console.log('taskStageGroup', this.taskStageGroup);
      }
    },
  },
};
</script>
<style scoped>
.card {
  background-color: white;
  border: solid 2px #f2f3f5;
}
</style>
