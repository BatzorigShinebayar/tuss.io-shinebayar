<template>
  <b-form-group label="Department">
    <b-form-radio-group
      v-model="departmentId"
      :options="departmentList"
      class="tus-radio-btn"
      @input="change"
    />
    <span v-if="!$v.departmentId.required && formSubmit" class="text-danger">
      Department is required
    </span>
  </b-form-group>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'TaskDepartment',

  props: {
    formSubmit: Boolean,
    defaultValue: {
      type: Number,
      default() {
        return null;
      },
    },
  },

  computed: {
    departmentList() {
      const deparmentList = [];
      for (const deparment of this.$store.getters.company.department) {
        if (deparment.is_active === '1') {
          deparmentList.push({
            value: deparment.id,
            text: deparment.short_name,
          });
        }
      }
      return deparmentList;
    },
  },

  data() {
    return {
      departmentId: null,
      departmentManager: null,
    };
  },

  watch: {
    defaultValue() {
      this.loadDefault();
    },
  },

  validations: {
    departmentId: { required },
  },

  mounted() {
    this.loadDefault();
  },

  methods: {
    loadDefault() {
      if (this.defaultValue) {
        this.departmentId = this.defaultValue;
        this.changeDepartmentManager();
      } else {
        //set default selected department
        const orgId = this.$store.getters.activeCompany;
        for (const company of this.$store.getters.user.companies) {
          if (company.organization_id === orgId) {
            this.departmentId = company.department_id;
          }
        }
      }
    },

    changeDepartmentManager() {
      const dep = this.departmentId;
      const departments = this.$store.getters.company.department;
      for (const selDep of departments) {
        if (selDep.id === dep) {
          this.departmentManager = selDep.manager__id;
        }
      }
    },

    change() {
      const dep = this.departmentId;
      const departments = this.$store.getters.company.department;
      for (const selDep of departments) {
        if (selDep.id === dep) {
          this.departmentManager = selDep.manager__id;
        }
      }

      const payload = {
        departmentManager: this.departmentManager,
        departmentId: this.departmentId,
      };

      this.$emit('getDepartment', payload);
    },
  },
};
</script>
