<template>
  <div>
    <div v-if="hasTask">
      <p class="mb-3">
        Please distribute active tasks assigned to
        <span v-if="employee">
          {{ employee.partner__name }} {{ employee.partner__last_name }}
        </span>
        before deleting this employee
      </p>
      <b-form-group
        class="mb-5"
        label="Replacing Employeee"
        label-for="set-employee"
      >
        <treeselect
          id="set-employee"
          v-model="replacingEmployee"
          :multiple="false"
          :value-consists-of="'LEAF_PRIORITY'"
          :options="employeeList"
          :disable-branch-nodes="true"
          :clearable="false"
          @input="replaceEmployee"
          :disabled="disabledEmployee"
        >
        </treeselect>
      </b-form-group>
      <p class="mb-3">or distribute here to other employees</p>
      <div v-for="(task, index) in loadedTasks" :key="index" class="row mb-3">
        <div class="col-lg-6">
          <div class="d-flex">
            <p class="mr-3">{{ index + 1 }}</p>
            <p>{{ task.name }}</p>
          </div>
        </div>
        <div class="col-lg-6">
          <treeselect
            :multiple="false"
            :value-consists-of="'LEAF_PRIORITY'"
            :options="employeeList"
            :disable-branch-nodes="true"
            :clearable="false"
            :value="replacingEmployee"
            @input="changeEmployee(task.id, $event)"
          >
          </treeselect>
        </div>
      </div>
    </div>
    <div v-else>
      <p>There's no task to distribute to others</p>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import axios from 'axios';

export default {
  name: 'DistributeStep',

  components: { Treeselect },

  props: {
    employee: {
      type: Object,
    },
  },

  data() {
    return {
      employeeSelected: null,
      replacingEmployee: null,
      disabledEmployee: false,
      loadedTasks: null,
      distributedTasks: [],
      hasTask: false,
    };
  },

  computed: {
    employeeList() {
      const employeeList = this.$store.getters.company.employees;
      const allDepartments = this.$store.getters.company.department;
      const activeDepartments = [];

      for (const department of allDepartments) {
        if (department.is_active === '1') {
          const employees = [];

          for (const emp of employeeList) {
            if (emp.department__id === department.id) {
              if (emp.is_active === '1') {
                const employeeContext = {
                  id: emp.partner__id,
                  label: emp.partner__name + ' ' + emp.partner__last_name,
                };
                employees.push(employeeContext);
              }
            }
          }

          const departmentContext = {
            id: department.id + 'dep',
            label: department.name,
            children: employees,
          };
          activeDepartments.push(departmentContext);
        }
      }

      return activeDepartments;
    },
  },

  mounted() {
    const objType =
      !!this.employeeSelected && this.employeeSelected.constructor === Array;
    if (objType) {
      this.employeeSelected = this.employeeSelected[0];
    }

    this.loadEmployeeTask();
    this.setDefault();
  },

  methods: {
    loadEmployeeTask() {
      const url = `/pages/plan/get_employee_tasks/${this.employee.id}/`;

      axios.get(url).then((response) => {
        if (response.data.employee_tasks.length !== 0) {
          this.hasTask = true;
        }

        this.loadedTasks = response.data.employee_tasks;

        const distributedTasks = [];

        this.loadedTasks.forEach((item) => {
          distributedTasks.push({
            task_id: item.id,
            new_employee: this.employeeSelected[0],
          });
        });

        this.distributedTasks = distributedTasks;
      });
    },

    replaceEmployee(replacingEmployee) {
      this.employeeSelected = this.replacingEmployee;
      const distributedTasks = [];

      if (this.loadedTasks) {
        this.loadedTasks.forEach((item) => {
          distributedTasks.push({
            task_id: item.id,
            new_employee: replacingEmployee,
          });
        });
      }

      this.distributedTasks = distributedTasks;
    },

    setDefault() {
      const currentUser = this.$store.getters.user.partner_id;
      this.employeeSelected = [currentUser];
      this.replacingEmployee = [currentUser];

      //find employees department
      let empDepartment;
      for (const employee of this.$store.getters.company.employees) {
        if (employee.partner__id === this.employee.id) {
          empDepartment = employee.department__id;
        }
      }

      //find department manager
      for (const department of this.$store.getters.company.department) {
        if (department.id === empDepartment) {
          this.employeeSelected = [department.manager__id];
          this.replacingEmployee = [department.manager__id];
        }
      }
    },

    changeEmployee(taskId, event) {
      //correcting data
      const objType =
        !!this.employeeSelected && this.employeeSelected.constructor === Array;
      if (objType) {
        this.employeeSelected = this.employeeSelected[0];
      }

      this.$emit('executor', this.employeeSelected);

      //find and replacing
      this.distributedTasks.forEach((item) => {
        if (item.task_id === taskId) {
          item.new_employee = event;
        }
      });
    },

    distributeStep() {
      this.$emit('distributeStepData', this.distributedTasks);
    },
  },
};
</script>
