<template>
  <div>
    <b-sidebar
      id="salary-create"
      title="Create salary category"
      right
      shadow
      backdrop
      lazy
      class="sidebar-md"
      @hidden="hidden"
    >
      <div class="p-4">
        <b-form>
          <b-form-group label="Salary category name">
            <b-form-input v-model="categoryName" type="text"></b-form-input>
            <span
              v-if="!$v.categoryName.required && formSubmit"
              class="text-danger"
            >
              Salary category name is required
            </span>
          </b-form-group>

          <b-form-group label="Total salary">
            <b-form-input v-model="baseSalary" type="number"></b-form-input>
            <span
              v-if="!$v.baseSalary.required && formSubmit"
              class="text-danger"
            >
              Total salary is required
            </span>
          </b-form-group>

          <div v-if="variables">
            <div
              class="salary-variable-item"
              v-for="(variable, index) in variables"
              :key="index"
            >
              <div class="flex-shrink-1">
                <h4 class="text-primary">{{ index + 1 }}</h4>
              </div>
              <div class="flex-grow-1">
                <div class="salary-variable-remove">
                  <Fa
                    :icon="['fas', 'trash']"
                    @click="removeVariable(variable.generate_id)"
                  />
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <b-form-group label="Variable">
                      <b-form-select
                        v-model="variable.salary_deep_category"
                        :options="categories"
                        :name="`variables[${index}][salary_deep_category]`"
                        :state="!!variable.salary_deep_category"
                      ></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-lg-6">
                    <b-form-group label="Percent">
                      <b-form-input
                        type="number"
                        v-model="variable.percent"
                        :name="`variables[${index}][percent]`"
                        :state="!!variable.percent"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-lg-12">
                    <b-form-group label="Description">
                      <b-form-input
                        type="text"
                        v-model="variable.name"
                        :name="`variables[${index}][name]`"
                        :state="!!variable.name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <b-button class="mt-4" variant="secondary" block @click="addVariable">
            <Fa :icon="['fas', 'plus']" />
            Add Variable
          </b-button>
        </b-form>
      </div>
      <template #footer>
        <div class="m-3">
          <b-button
            type="submit"
            variant="deep-blue"
            size="lg"
            block
            @click="createSalary"
            >Create
          </b-button>
        </div>
      </template>
    </b-sidebar>

    <b-modal id="create-salary-modal" centered>
      <h4 class="text-center">Salary category created</h4>
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
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'SalaryCreate',

  data() {
    return {
      formSubmit: false,
      categoryName: null,
      baseSalary: null,
      variables: [],
      variableNumber: 0,
      categories: this.$store.getters.company.salary_deep_categories,
    };
  },

  validations: {
    categoryName: { required },
    baseSalary: { required },
  },

  methods: {
    removeVariable(removeId) {
      for (let i = 0; i < this.variables.length; i++) {
        if (this.variables[i].generate_id === removeId) {
          this.variables.splice(i, 1);
        }
      }
    },

    addVariable() {
      this.variableNumber += 1;
      const id = this.variableNumber;

      this.variables.push({
        generate_id: id,
        salary_deep_category: '',
        percent: '',
        name: '',
      });
    },

    hidden() {
      this.categoryName = null;
      this.baseSalary = null;
      this.variables = [];
      this.formSubmit = false;
    },

    createSalary() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        //variables validation
        for (const variable of this.variables) {
          if (
            !variable.name ||
            !variable.percent ||
            !variable.salary_deep_category
          ) {
            return;
          }
        }

        const company = this.$store.getters.activeCompany;

        const payload = {
          organization: company,
          name: this.categoryName,
          base_salary: this.baseSalary,
          salary_structures: this.variables,
        };

        const url = `/pages/company_builder/create_salary_category/`;

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'salary-create');
          this.$bvModal.show('create-salary-modal');
          this.$emit('reload', true);

          this.categoryName = null;
          this.baseSalary = null;
          this.variables = [];
          this.formSubmit = false;
        });
      }
    },
  },
};
</script>
