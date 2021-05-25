<template>
  <div>
    <b-col cols="12">
      <b-form-group
        label="Configure task name"
        label-for="configuring-task-name"
      >
        <div id="configuring-task-name">
          <b-form-input v-model="taskName" disabled></b-form-input>
          <Fa
            class="text-warning align-self-center inputIcon"
            :icon="['far', 'edit']"
            @click="edit('configuring-task-name')"
            fixed-width
          />
        </div>
        <b-form-input
          id="configuring-task-name-edit"
          v-model="taskName"
          :style="{ display: 'none' }"
          @change="action(taskName, 'task-name')"
        ></b-form-input>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label="Configure Function"
        label-for="configuring-function-edit"
      >
        <div id="configuring-function">
          <b-form-input v-model="taskFunction" disabled></b-form-input>
          <Fa
            class="text-warning align-self-center inputIcon"
            :icon="['far', 'edit']"
            @click="edit('configuring-function')"
            fixed-width
          />
        </div>
        <treeselect
          id="configuring-function-edit"
          v-model="taskFunctionEdit"
          :multiple="false"
          :options="functions"
          :disable-branch-nodes="true"
          @input="action(taskFunctionEdit, 'function')"
          :clearable="false"
          style="display: none" /></b-form-group
    ></b-col>
    <div class="d-flex">
      <b-col :style="{ display: 'none' }" cols="6">
        <b-form-group label="Configure origin" label-for="configuring-origin">
          <div id="configuring-origin">
            <b-form-input v-model="origin" disabled></b-form-input>
            <Fa
              class="text-warning align-self-center inputIcon"
              :icon="['far', 'edit']"
              @click="edit('configuring-origin')"
              fixed-width
            />
          </div>
          <treeselect
            id="configuring-origin-edit"
            v-model="originEdit"
            :multiple="false"
            :options="origins"
            :disable-branch-nodes="true"
            @input="action(originEdit, 'origin')"
            :clearable="false"
            style="display: none"
          /> </b-form-group
      ></b-col>
      <b-col cols="6">
        <b-form-group
          label="Configure Department / Unit"
          label-for="configuring-department"
        >
          <div id="configuring-department">
            <b-form-input v-model="department" disabled></b-form-input>
            <Fa
              class="text-warning align-self-center inputIcon"
              :icon="['far', 'edit']"
              @click="edit('configuring-department')"
              fixed-width
            />
          </div>
          <treeselect
            id="configuring-department-edit"
            v-model="departmentEdit"
            :multiple="false"
            :options="departments"
            :disable-branch-nodes="true"
            @input="action(departmentEdit, 'department')"
            :clearable="false"
            style="display: none"
          /> </b-form-group
      ></b-col>
      <b-col cols="6">
        <b-form-group
          label="Configure Assignee / Unit"
          label-for="configuring-assignee"
        >
          <div id="configuring-assignee">
            <b-form-input v-model="assignedEmployee" disabled></b-form-input>
            <Fa
              class="text-warning align-self-center inputIcon"
              :icon="['far', 'edit']"
              @click="edit('configuring-assignee')"
              fixed-width
            />
          </div>
          <treeselect
            id="configuring-assignee-edit"
            v-model="assignedEmployeeEdit"
            :multiple="false"
            :options="employees"
            @input="action(assignedEmployeeEdit, 'taskAssignedEmployee')"
            :clearable="false"
            style="display: none"
          /> </b-form-group
      ></b-col>
    </div>
    <b-col class="mb-3" cols="12">
      <p class="textBold">Configure Dates</p>
    </b-col>
    <b-col class="d-flex" cols="12">
      <b-form-group label="Start Date" label-for="start-date">
        <b-form-input
          id="start-date"
          v-model="startDate"
          disabled
        ></b-form-input>
      </b-form-group>
      <div class="ml-4">
        <b-form-group label="Changes /days/" label-for="start-date-changes">
          <b-form-input
            id="start-date-changes"
            v-model="startDateChanges"
            type="number"
            @change="changeStartDate"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="ml-4">
        <b-form-group
          label="Configured Start Date"
          label-for="changed-start-date"
        >
          <p id="changed-start-date" class="mt-3">{{ configuredStartDate }}</p>
        </b-form-group>
      </div>
    </b-col>
    <b-col class="d-flex" cols="12">
      <b-form-group label="Due Date" label-for="due-date">
        <b-form-input id="due-date" v-model="dueDate" disabled></b-form-input>
      </b-form-group>
      <div class="ml-4">
        <b-form-group label="Changes /days/" label-for="due-date-changes">
          <b-form-input
            id="due-date-changes"
            v-model="dueDateChanges"
            @change="changeDueDate"
            type="number"
          ></b-form-input>
        </b-form-group>
      </div>
      <div class="ml-4">
        <b-form-group label="Configured Due Date" label-for="changed-due-date">
          <p id="changed-due-date" class="mt-3">{{ configuredDueDate }}</p>
        </b-form-group>
      </div>
    </b-col>
    <b-col
      v-for="(taskStgGrp, index) in taskStageGroup"
      :key="taskStgGrp.id"
      class="taskStgGrp d-flex mb-3 mt-1"
      cols="12"
    >
      <b-col cols="2" class="d-flex align-items-center mr-3">
        <div>
          <b-badge variant="primary">{{ taskStgGrp.stage_group.code }}</b-badge>
          <p>{{ taskStgGrp.stage_group.name }}</p>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="w-100">
          <div class="d-flex">
            <b-col cols="6">
              <b-form-group
                :label="`'${taskStgGrp.stage_group.code}' stage start date`"
                :label-for="'task-stage-start-date-' + index"
              >
                <b-form-datepicker
                  :id="'task-stage-start-date-' + index"
                  v-model="configuredData[index].stgGrpData[0]"
                  today-button
                  close-button
                  placeholder="MM-DD-YYYY"
                  :date-format-options="{
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }"
                  :state="configuredData[index].dateError"
                  @context="changeDate(configuredData[index].stgGrpData, index)"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                :label="`'${taskStgGrp.stage_group.code}' stage due date`"
                :label-for="'task-stage-end-date-' + index"
              >
                <b-form-datepicker
                  :id="'task-stage-end-date-' + index"
                  v-model="configuredData[index].stgGrpData[1]"
                  today-button
                  close-button
                  placeholder="MM-DD-YYYY"
                  :date-format-options="{
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }"
                  :state="configuredData[index].dateError"
                  @context="changeDate(configuredData[index].stgGrpData, index)"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
          </div>
          <div>
            <b-form-group label="Assigned employee" label-for="input-sm">
              <treeselect
                :id="'assigned-employee_' + index + '-edit'"
                v-model="configuredData[index].assignedEmployee"
                @input="
                  action(
                    configuredData[index].assignedEmployee,
                    'assignedEmployee',
                    index
                  )
                "
                :options="employees"
              >
              </treeselect>
            </b-form-group>
          </div>
        </div>
      </b-col>
    </b-col>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
export default {
  name: 'TaskConfigurationDetail',
  components: { Treeselect },
  props: {
    task: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      assignedEmployee: '',
      assignedEmployeeEdit: [0],
      employees: [],
      editConfFunction: false,
      taskName: '',
      functions: [],
      taskFunction: '',
      taskFunctionEdit: [0],
      department: '',
      departmentEdit: [0],
      departments: [],
      startDate: '',
      startDateChanges: 0,
      dueDate: '',
      dueDateChanges: 0,
      configuredStartDate: '',
      configuredDueDate: '',
      startDateConfiguredDueDate: '',
      origin: '',
      originEdit: [0],
      taskStageGroup: [],
      origins: [],
      configuredData: [],
      sendingJsonData: {
        change_name: false,
        change_dep: false,
        change_ex_emp: false,
        change_sfunc: false,
        change_task_type: false,

        change_stagegroup_date: false,
        change_stagegroup_employee: false,

        change_start_date: false,
        change_end_date: false,
        next_end_date: null,
        next_start_date: null,
        prev_end_date: null,
        prev_start_date: null,

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
        department: null,
        date_change_lines: [],
        stage_group_employee_change_lines: [],
        employee_change_lines: [],
        isValid: true,
      },
    };
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.taskName = this.task.name;
    this.assignedEmployee =
      this.task.executing_employee.last_name +
      ' ' +
      this.task.executing_employee.name;

    this.startDate = this.task.start_date;
    this.assignedEmployeeEdit[0] = this.task.executing_employee.id;
    this.dueDate = this.task.end_date;
    this.taskFunctionEdit[0] = this.task.sub_function_id.id;
    this.departmentEdit[0] = this.task.department_id.id;
    // this.taskFunction =
    //   this.task.sub_function_id.code + ' - ' + this.task.sub_function_id.name;
    this.department = this.task.department_id.short_name;
    const subFunction = this.$store.getters.company.function;
    const functionType = this.$store.getters.company.function_type;
    for (const funcType of functionType) {
      funcType.functions = [];
      for (const j in subFunction) {
        if (
          subFunction[j].function_type === funcType.id &&
          subFunction[j].is_active === '1'
        ) {
          funcType.functions.push(subFunction[j]);
        }
      }
    }
    for (const i in functionType) {
      if (functionType[i].is_active === '1') {
        const jsonData = {
          id: 'pf_' + functionType[i].id,
          label: functionType[i].name,
          children: [],
        };
        this.functions.push(jsonData);
        for (const j in functionType[i].functions) {
          if (
            functionType[i].functions[j].function_type === functionType[i].id &&
            functionType[i].functions[j].is_active === '1'
          ) {
            const jsonData = {
              id: 'f_' + functionType[i].functions[j].id,
              label:
                functionType[i].functions[j].code +
                ' - ' +
                functionType[i].functions[j].name,
              children: [],
            };
            this.functions[i].children.push(jsonData);
            for (const l in functionType[i].functions[j].sub_function) {
              if (
                functionType[i].functions[j].sub_function[l].is_active === '1'
              ) {
                const jsonData = {
                  id: functionType[i].functions[j].sub_function[l].id,
                  label:
                    functionType[i].functions[j].sub_function[l].code +
                    ' - ' +
                    functionType[i].functions[j].sub_function[l].name,
                };
                this.functions[i].children[j].children.push(jsonData);
                if (this.taskFunctionEdit[0] === jsonData.id) {
                  this.taskFunction = jsonData.label;
                }
              }
            }
          }
        }
      }
    }
    const departments = this.$store.getters.company.department;
    for (const i in departments) {
      if (departments[i].is_active === '1') {
        const jsonData = {
          id: departments[i].id,
          label: departments[i].short_name,
        };
        this.departments.push(jsonData);
      }
    }
    this.configuredStartDate = this.startDate;
    this.configuredDueDate = this.dueDate;
    this.taskStageGroup = this.task.task_stage_groups;
    const configuredData = [];
    for (const i in this.taskStageGroup) {
      const employeeId = [];
      if (this.taskStageGroup[i].employee !== null) {
        employeeId.push(this.taskStageGroup[i].employee);
      }
      const json = {
        stgGrpData: [
          this.taskStageGroup[i].start_date,
          this.taskStageGroup[i].end_date,
        ],
        dateError: true,
        assignedEmployee: employeeId,
      };
      if (
        this.taskStageGroup[i].end_date > this.taskStageGroup[i].start_date &&
        this.taskStageGroup[i].start_date >= this.configuredStartDate &&
        this.taskStageGroup[i].end_date <= this.configuredDueDate
      ) {
        json.dateError = true;
      } else {
        json.dateError = false;
      }
      configuredData.push(json);
    }
    const employees = this.$store.getters.company.employees;
    for (const i in employees) {
      if (employees[i].is_active === '1') {
        const jsonData = {
          id: employees[i].partner__id,
          label:
            employees[i].partner__name + ' ' + employees[i].partner__last_name,
        };
        this.employees.push(jsonData);
      }
    }
    this.configuredData = configuredData;
    // this.origin = this.task.task_type.code + ' - ' + this.task.task_type.name;
    // this.originEdit[0] = this.task.task_type.id;
    // const taskTypes = this.$store.getters.company.task_type;
    // for (const i in taskTypes) {
    //   if (taskTypes[i].active === '1') {
    //     const jsonData = {
    //       id: taskTypes[i].id,
    //       label: taskTypes[i].code + ' - ' + taskTypes[i].name,
    //     };
    //     this.origins.push(jsonData);
    //     if (this.originEdit[0] === jsonData.id) {
    //       this.origin = jsonData.label;
    //     }
    //   }
    // }
  },
  methods: {
    edit(id) {
      document.getElementById(id).style.display = 'none';
      document.getElementById(id + '-edit').style.display = '';
    },
    changeStartDate(data) {
      const num = parseInt(data);
      this.configuredStartDate = this.dayAdd(num, this.startDate);
      this.configuredDueDate = this.dayAdd(num, this.dueDate);
      this.startDateConfiguredDueDate = this.configuredDueDate;
      for (const i in this.task.task_stage_groups) {
        const startDate = this.dayAdd(
          num,
          this.task.task_stage_groups[i].start_date
        );
        const endDate = this.dayAdd(
          num,
          this.task.task_stage_groups[i].end_date
        );
        this.configuredData[i].stgGrpData = [startDate, endDate];
        this.action([startDate, endDate], 'stgGrpData', parseInt(i));
      }
      this.sendingJsonData.change_start_date = true;
      this.sendingJsonData.prev_start_date = this.task.start_date;
      this.sendingJsonData.next_start_date = this.configuredStartDate;
      this.sendingJsonData.change_end_date = true;
      this.sendingJsonData.prev_end_date = this.task.end_date;
      this.sendingJsonData.next_end_date = this.configuredDueDate;
    },
    changeDueDate(data) {
      const num = parseInt(data);
      if (this.startDateConfiguredDueDate) {
        this.configuredDueDate = this.dayAdd(
          num,
          this.startDateConfiguredDueDate
        );
      } else {
        this.configuredDueDate = this.dayAdd(num, this.dueDate);
      }
      for (const i in this.task.task_stage_groups) {
        let startDate = '';
        let check = true;
        for (const j in this.sendingJsonData.date_change_lines) {
          if (
            this.sendingJsonData.date_change_lines[j].task_stage_group ===
            this.task.task_stage_groups[i].id
          ) {
            check = false;
            if (
              this.sendingJsonData.date_change_lines[j].next_end_date >
              this.configuredDueDate
            ) {
              startDate =
                this.sendingJsonData.date_change_lines[j].next_start_date;
              this.configuredData[i].stgGrpData[1] = this.configuredDueDate;
              this.action(
                [startDate, this.configuredDueDate],
                'stgGrpData',
                parseInt(i)
              );
            }
          }
        }
        if (check) {
          if (
            this.task.task_stage_groups[i].end_date > this.configuredDueDate
          ) {
            startDate = this.task.task_stage_groups[i].start_date;
            this.configuredData[i].stgGrpData[1] = this.configuredDueDate;
            this.action(
              [startDate, this.configuredDueDate],
              'stgGrpData',
              parseInt(i)
            );
          }
        }
        const stageGrpStartDate = this.configuredData[i].stgGrpData[0];
        const stageGrpDueDate = this.configuredData[i].stgGrpData[1];
        if (
          stageGrpDueDate > stageGrpStartDate &&
          stageGrpStartDate >= this.configuredStartDate &&
          stageGrpDueDate <= this.configuredDueDate
        ) {
          this.configuredData[i].dateError = true;
          this.action([stageGrpStartDate, stageGrpDueDate], 'stgGrpData', i);
        } else {
          this.configuredData[i].dateError = false;
        }
      }
      this.sendingJsonData.change_end_date = true;
      this.sendingJsonData.prev_end_date = this.task.end_date;
      this.sendingJsonData.next_end_date = this.configuredDueDate;
    },
    dayAdd(data, dateData) {
      const date = new Date(dateData);
      date.setDate(date.getDate() + parseInt(data));
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      return date.getFullYear() + '-' + month + '-' + day;
    },
    action(data, type, index) {
      let checkValid = true;
      if (data === '' || data === null || data === undefined) {
        checkValid = false;
      }
      if (type === 'taskAssignedEmployee') {
        this.sendingJsonData.change_ex_emp = true;
        this.sendingJsonData.prev_execute_emp = this.task.executing_employee.id;
        this.sendingJsonData.next_execute_emp = data;
      }
      if (type === 'task-name') {
        this.sendingJsonData.change_name = true;
        this.sendingJsonData.prev_name = this.task.name;
        this.sendingJsonData.next_name = data;
      }
      if (type === 'function') {
        console.log(type);
        console.log(data);
        if (typeof data === 'number') {
          this.sendingJsonData.change_sfunc = true;
          this.sendingJsonData.prev_sfunc = this.task.sub_function_id.id;
          this.sendingJsonData.next_sfunc = data;
        }
      }
      if (type === 'origin') {
        this.sendingJsonData.change_task_type = true;
        this.sendingJsonData.prev_task_type = this.task.task_type.id;
        this.sendingJsonData.next_task_type = data;
      }
      if (type === 'department') {
        this.sendingJsonData.change_dep = true;
        this.sendingJsonData.prev_dep = this.task.department_id.id;
        this.sendingJsonData.next_dep = data;
      }
      if (type === 'stgGrpData') {
        this.sendingJsonData.change_stagegroup_date = true;
        const jsonData = {};
        jsonData.task_stage_group_id = this.task.task_stage_groups[index].id;
        jsonData.stage_group =
          this.task.task_stage_groups[index].stage_group.id;
        jsonData.prev_start_date =
          this.task.task_stage_groups[index].start_date;
        jsonData.prev_end_date = this.task.task_stage_groups[index].end_date;
        jsonData.next_start_date = data[0];
        jsonData.next_end_date = data[1];
        jsonData.created_user = this.$store.getters.user.id;
        jsonData.updated_user = this.$store.getters.user.id;
        if (
          jsonData.next_start_date !== jsonData.prev_start_date ||
          jsonData.prev_end_date !== jsonData.next_end_date
        ) {
          if (this.sendingJsonData.date_change_lines.length === 0) {
            this.sendingJsonData.date_change_lines.push(jsonData);
          } else {
            let check = false;
            for (const i in this.sendingJsonData.date_change_lines) {
              if (
                this.sendingJsonData.date_change_lines[i]
                  .task_stage_group_id === jsonData.task_stage_group_id
              ) {
                this.sendingJsonData.date_change_lines[i] = jsonData;
                check = true;
              }
              if (
                this.sendingJsonData.date_change_lines[i].next_end_date <
                this.sendingJsonData.date_change_lines[i].next_start_date
              ) {
                checkValid = false;
              }
            }
            if (!check) {
              this.sendingJsonData.date_change_lines.push(jsonData);
            }
          }
        }
      }
      if (type === 'assignedEmployee') {
        this.sendingJsonData.change_stagegroup_employee = true;
        const jsonData = {};
        jsonData.task_stage_group_id = this.task.task_stage_groups[index].id;
        // jsonData.stage_group = this.task.task_stage_groups[
        //   index
        // ].stage_group.id;
        jsonData.prev_employee = this.task.task_stage_groups[index].employee;
        jsonData.next_employee = data;
        jsonData.created_user = this.$store.getters.user.id;
        jsonData.updated_user = this.$store.getters.user.id;

        if (jsonData.prev_employee !== jsonData.next_employee) {
          if (
            this.sendingJsonData.stage_group_employee_change_lines.length === 0
          ) {
            this.sendingJsonData.stage_group_employee_change_lines.push(
              jsonData
            );
          } else {
            let check = false;
            for (const i in this.sendingJsonData
              .stage_group_employee_change_lines) {
              if (
                this.sendingJsonData.stage_group_employee_change_lines[i]
                  .task_stage_group_id === this.task.task_stage_groups[index].id
              ) {
                this.sendingJsonData.stage_group_employee_change_lines[i] =
                  jsonData;
                check = true;
              }
            }
            if (!check) {
              this.sendingJsonData.stage_group_employee_change_lines.push(
                jsonData
              );
            }
          }
        }
      }
      this.sendingJsonData.isValid = checkValid;
      this.$emit('emit_data', this.sendingJsonData);
    },
    changeDate(data, index) {
      const date1 = data[0];
      const date2 = data[1];
      const endDate = date2;
      const startDate = date1;
      if (
        endDate >= startDate &&
        startDate >= this.configuredStartDate &&
        endDate <= this.configuredDueDate
      ) {
        this.configuredData[index].dateError = true;
        this.action(data, 'stgGrpData', index);
      } else {
        this.configuredData[index].dateError = false;
      }
    },
  },
};
</script>
<style scoped>
.inputIcon {
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 20px;
}
.taskStgGrp {
  border-bottom: 2px solid #bdbdbd;
}
</style>
