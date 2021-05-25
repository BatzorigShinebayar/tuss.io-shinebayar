<template>
  <b-sidebar
    id="delete-department"
    title="Deactivate Department"
    class="sidebar-sm"
    right
    shadow
    backdrop
    lazy
    @hidden="clearData"
  >
    <div class="p-4">
      <p>You are going to deactivate department:</p>
      <h5 class="text-danger mt-1 mb-5">{{ departmentName }}</h5>

      <b-form-group label="Destination department">
        <b-form-select
          v-model="destinationDepartment"
          :options="departmentList"
        ></b-form-select>
        <span
          v-if="!$v.destinationDepartment.required && formSubmit"
          class="text-danger"
        >
          Destination department is required
        </span>
      </b-form-group>

      <b-modal id="department-deactivate-modal" title="">
        <h4 class="text-center mb-3">Are you sure to delete?</h4>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-center mb-4">
            <b-button
              variant="secondary"
              class="mr-3"
              size="lg"
              @click="closeModal"
            >
              No
            </b-button>
            <b-button variant="danger" size="lg" @click="deactivateDepartment">
              Yes
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>

    <template #footer>
      <div class="m-3 p-2">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="validateForm"
        >
          <Fa :icon="['fas', 'trash']" />
          Deactivate
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'DepartmentDelete',

  props: {
    department: {
      type: Number,
    },
  },

  data() {
    return {
      formSubmit: false,
      destinationDepartment: null,
    };
  },

  computed: {
    departmentName() {
      if (this.department) {
        for (const department of this.$store.getters.company.department) {
          if (department.id === this.department) {
            return department.name;
          }
        }
        return null;
      } else {
        return null;
      }
    },

    departmentList() {
      const departments = [];
      for (const department of this.$store.getters.company.department) {
        if (department.is_active === '1') {
          departments.push({
            value: department.id,
            text: department.name,
          });
        }
      }
      return departments;
    },
  },

  validations: {
    destinationDepartment: { required },
  },

  methods: {
    validateForm() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$bvModal.show('department-deactivate-modal');
      }
    },

    deactivateDepartment() {
      if (!this.$v.$invalid) {
        this.$bvModal.hide('department-deactivate-modal');

        const url = '/pages/company_builder/deactivate_department/';
        const payload = {
          old: this.department,
          new: this.destinationDepartment,
        };

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'delete-department');
          this.clearData();
          this.$emit('reload', true);
          this.$emit('deactivate', true);
        });
      }
    },

    clearData() {
      this.formSubmit = false;
      this.destinationDepartment = null;
    },

    closeModal() {
      this.$bvModal.hide('department-deactivate-modal');
    },
  },
};
</script>
