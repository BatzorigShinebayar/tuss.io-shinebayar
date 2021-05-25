<template>
  <div>
    <b-sidebar
      id="employee-edit"
      title="Edit employee"
      right
      shadow
      backdrop
      lazy
      class="sidebar-md"
    >
      <div class="p-4">
        <b-form>
          <b-form-group
            label="Employee First Name"
            label-for="add-employee-name"
          >
            <b-form-input
              id="add-employee-name"
              v-model="name"
              type="text"
              required
              name="name"
            ></b-form-input>
            <span v-if="!this.$v.name.required" class="text-danger">
              Name is required
            </span>
          </b-form-group>
          <b-form-group
            label="Employee Last Name"
            label-for="add-employee-sur-name"
          >
            <b-form-input
              id="add-employee-sur-name"
              v-model="last_name"
              type="text"
              required
              name="sur_name"
            ></b-form-input>
            <span v-if="!this.$v.last_name.required" class="text-danger">
              Last name is required
            </span>
          </b-form-group>
          <b-form-group label="Employee E-mail" label-for="add-employee-email">
            <b-form-input
              id="add-employee-email"
              v-model="email"
              type="email"
              required
              name="email"
            ></b-form-input>
            <span v-if="!this.$v.email.required" class="text-danger"
              >E-mail is required</span
            >
            <span v-if="!this.$v.email.email" class="text-danger"
              >E-mail is invalid</span
            >
          </b-form-group>
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="Department"
            label-for="add-employee-department"
          >
            <b-form-radio-group
              id="add-employee-department"
              v-model="selectedDepartment"
              :options="departments"
              :aria-describedby="ariaDescribedby"
              name="department"
              class="tus-radio-btn"
              @change="setJobTitles"
            >
            </b-form-radio-group>
            <span v-if="!$v.selectedDepartment.required" class="text-danger">
              Department is required
            </span>
          </b-form-group>
          <b-form-group
            v-if="selectedDepartment"
            id="input-group-1"
            label="Job Title"
            label-for="input-1"
          >
            <b-form-select
              v-model="selectedJobTitle"
              :options="jobTitles"
            ></b-form-select>
          </b-form-group>
        </b-form>
      </div>
      <template #footer>
        <div class="m-3">
          <b-button
            :disabled="isDisabled"
            type="submit"
            variant="deep-blue"
            block
            size="lg"
            @click="editEmployee"
            >Save
          </b-button>
        </div>
      </template>
    </b-sidebar>

    <b-modal id="edit-empployee-status" centered>
      <h4 class="text-center">Employee edited</h4>
      <template #modal-footer="{ ok }">
        <div class="w-100 d-flex justify-content-center">
          <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
            OK
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'EditEmployee',

  props: {
    employee: {
      type: Object,
    },
  },

  data() {
    return {
      name: null,
      last_name: null,
      email: null,
      departments: null,
      selectedDepartment: null,
      jobTitles: null,
      selectedJobTitle: null,
      isDisabled: false,
    };
  },

  watch: {
    employee() {
      this.setFields();
    },
  },

  validations: {
    last_name: { required },
    name: { required },
    email: { required, email },
    selectedDepartment: { required },
    selectedJobTitle: { required },
  },

  beforeMount() {
    this.setFields();
    this.setDepartment();
  },

  methods: {
    setFields() {
      if (this.employee) {
        this.name = this.employee.partner__name;
        this.last_name = this.employee.partner__last_name;
        this.email = this.employee.partner__email;
        this.selectedDepartment = this.employee.department__id;
        this.setJobTitles();
        this.selectedJobTitle = this.employee.job_title__id;
      }
    },

    setDepartment() {
      const departments = this.$store.getters.company.department;
      const list = [];
      for (const department of departments) {
        if (department.is_active === '1') {
          list.push({ text: department.short_name, value: department.id });
        }
      }
      this.departments = list;
    },

    setJobTitles() {
      const allJobs = this.$store.getters.company.job_title;
      const list = [];
      for (const job of allJobs) {
        if (job.is_active === '1') {
          const jobDepartment = job.department;
          if (jobDepartment === this.selectedDepartment) {
            list.push({
              text: job.name,
              value: job.id,
            });
          }
        }
      }
      this.jobTitles = list;
    },

    editEmployee() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isDisabled = true;
        const payload = {
          job_title_partner_id: this.employee.id,
          last_name: this.last_name,
          name: this.name,
          email: this.email,
          department_id: this.selectedDepartment,
          job_title_id: this.selectedJobTitle,
        };
        const url = '/pages/company_builder/partner/';

        axios
          .put(url, payload)
          .then(() => {
            this.isDisabled = false;
            this.$bvModal.show('edit-empployee-status');
            this.$root.$emit('bv::toggle::collapse', 'employee-edit');
            this.$emit('reload', true);
          })
          .catch(() => {
            this.isDisabled = false;
          });
      }
    },
  },
};
</script>
