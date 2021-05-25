<!--<template>-->
<!--  <div>-->
<!--    <b-button v-b-modal.modal-1 class="mr-3" variant="secondary">-->
<!--      <Fa :icon="['fas', 'filter']" class="mr-1" />Filter-->
<!--    </b-button>-->

<!--    <b-modal id="modal-1" scrollable>-->
<!--      <template #modal-header="{ close }">-->
<!--        <p><Fa :icon="['fas', 'filter']" /> Filter</p>-->
<!--        <button type="button" aria-label="Close" class="close" @click="close()">-->
<!--          ×-->
<!--        </button>-->
<!--      </template>-->

<!--      <div class="p-2">-->
<!--        <b-form-group label="Department" label-for="selector-department">-->
<!--          <treeselect-->
<!--            id="selector-department"-->
<!--            v-model="taskDepartment"-->
<!--            :multiple="false"-->
<!--            :options="taskDepartmentList"-->
<!--            :normalizer="taskDepartmentNormalizer"-->
<!--          />-->
<!--        </b-form-group>-->

<!--        <b-form-group-->
<!--          class="mb-4"-->
<!--          label="Task Executor"-->
<!--          label-for="selector-employee"-->
<!--        >-->
<!--          <treeselect-->
<!--            id="selector-employee"-->
<!--            v-model="taskEmployees"-->
<!--            :multiple="true"-->
<!--            :value-consists-of="'LEAF_PRIORITY'"-->
<!--            :options="taskEmployeesList"-->
<!--          >-->
<!--          </treeselect>-->
<!--        </b-form-group>-->
<!--      </div>-->

<!--      <template #modal-footer>-->
<!--        <div class="w-100">-->
<!--          <b-button-->
<!--            variant="primary"-->
<!--            class="ml-2 float-right"-->
<!--            @click="searchTask"-->
<!--          >-->
<!--            Filter-->
<!--          </b-button>-->
<!--          <b-button variant="light" class="float-right" @click="hideModal">-->
<!--            Cancel-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </template>-->
<!--    </b-modal>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Treeselect from '@riophae/vue-treeselect';-->

<!--export default {-->
<!--  name: 'calendarFilter',-->

<!--  components: {-->
<!--    Treeselect,-->
<!--  },-->

<!--  props: {-->
<!--    clear: {-->
<!--      type: Boolean,-->
<!--      default() {-->
<!--        return false;-->
<!--      },-->
<!--    },-->
<!--  },-->

<!--  data() {-->
<!--    return {-->
<!--      taskDate: null,-->
<!--      taskDepartment: null,-->
<!--      taskEmployees: null,-->

<!--      taskDepartmentNormalizer(node) {-->
<!--        return {-->
<!--          id: node.id,-->
<!--          label: node.short_name + ' | ' + node.name,-->
<!--        };-->
<!--      },-->
<!--    };-->
<!--  },-->

<!--  computed: {-->
<!--    taskDepartmentList() {-->
<!--      const optionList = [];-->
<!--      const allDepartment = this.$store.getters.company.department;-->
<!--      for (const department of allDepartment) {-->
<!--        if (department.is_active === '1') {-->
<!--          optionList.push(department);-->
<!--        }-->
<!--      }-->
<!--      return optionList;-->
<!--    },-->

<!--    taskEmployeesList() {-->
<!--      const employeeList = this.$store.getters.company.employees;-->
<!--      const allDepartments = this.$store.getters.company.department;-->
<!--      const activeDepartments = [];-->

<!--      for (const department of allDepartments) {-->
<!--        if (department.is_active === '1') {-->
<!--          const employees = [];-->

<!--          for (const emp of employeeList) {-->
<!--            if (emp.department__id === department.id) {-->
<!--              if (emp.is_active === '1') {-->
<!--                const employeeContext = {-->
<!--                  id: emp.partner__id,-->
<!--                  label: emp.partner__name + ' ' + emp.partner__last_name,-->
<!--                };-->
<!--                employees.push(employeeContext);-->
<!--              }-->
<!--            }-->
<!--          }-->

<!--          const departmentContext = {-->
<!--            id: department.id + 'dep',-->
<!--            label: department.name,-->
<!--            children: employees,-->
<!--          };-->
<!--          activeDepartments.push(departmentContext);-->
<!--        }-->
<!--      }-->
<!--      return activeDepartments;-->
<!--    },-->
<!--  },-->

<!--  watch: {-->
<!--    $route() {-->
<!--      this.update();-->
<!--    },-->

<!--    clear(isTrue) {-->
<!--      if (isTrue) {-->
<!--        this.taskDate = null;-->
<!--        this.taskFunction = null;-->
<!--        this.taskEmployees = null;-->
<!--      }-->
<!--    },-->
<!--  },-->

<!--  mounted() {-->
<!--    this.update();-->
<!--  },-->

<!--  methods: {-->
<!--    update() {-->
<!--      const query = this.$route.query;-->
<!--      this.taskDate = this.$route.query;-->
<!--      this.taskDepartment = query.department_id;-->
<!--      const employees = query.executing_employee;-->

<!--      if (employees) {-->
<!--        this.taskEmployees = employees.split(',').map((emp) => parseInt(emp));-->
<!--      }-->
<!--    },-->

<!--    hideModal() {-->
<!--      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow');-->
<!--    },-->

<!--    searchTask() {-->
<!--      this.hideModal();-->

<!--      const query = {-->
<!--        year: this.$route.query.year,-->
<!--        organization: this.$route.query.organization,-->
<!--      };-->

<!--      if (this.taskDate) {-->
<!--        query.search = this.taskDate;-->
<!--      }-->
<!--      if (this.taskDepartment) {-->
<!--        query.department_id = this.taskDepartment;-->
<!--      }-->
<!--      if (this.taskEmployees) {-->
<!--        query.executing_employee = this.taskEmployees.join();-->
<!--      }-->

<!--      this.$emit('calendarFiltered', query);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
