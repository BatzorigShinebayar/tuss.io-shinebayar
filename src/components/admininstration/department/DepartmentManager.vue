<template>
  <treeselect
    id="set-department-manager"
    v-model="manager"
    :multiple="false"
    :value-consists-of="'LEAF_PRIORITY'"
    :options="employeeList"
    :disable-branch-nodes="true"
    :clearable="true"
    @input="change"
  >
  </treeselect>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';

export default {
  name: 'DepartmentManager',

  components: { Treeselect },

  props: {
    default: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      manager: null,
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

  watch: {
    default(value) {
      if (value !== 0) {
        this.manager = value;
      }
    },
  },

  methods: {
    change() {
      const objType = !!this.manager && this.manager.constructor === Array;
      if (objType) {
        this.manager = this.manager[0];
      }
      this.$emit('manager', this.manager);
    },
  },
};
</script>
