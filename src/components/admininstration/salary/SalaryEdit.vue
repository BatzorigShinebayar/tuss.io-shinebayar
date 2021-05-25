<template>
  <div>
    <b-sidebar
      id="salary-edit"
      title="Edit salary category"
      right
      shadow
      backdrop
      lazy
      class="sidebar-md"
      @shown="loadData"
    >
      <div class="p-4">
        <b-form>
          <b-form-group label="Salary category name">
            <b-form-input v-model="categoryName" type="text"></b-form-input>
            <span v-if="!$v.categoryName.required" class="text-danger">
              Salary category name is required
            </span>
          </b-form-group>

          <b-form-group label="Total salary">
            <b-form-input v-model="baseSalary" type="number"></b-form-input>
            <span v-if="!$v.baseSalary.required" class="text-danger">
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

          <b-button
            class="mt-4 mb-5"
            variant="outline-danger"
            block
            v-b-modal.delete-salary-modal
            @click="addVariable"
          >
            <Fa :icon="['fas', 'trash']" />
            Delete
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
            @click="editSalary"
            >Save
          </b-button>
        </div>
      </template>
    </b-sidebar>

    <b-modal id="edit-salary-modal" centered>
      <h4 class="text-center">Salary category saved</h4>
      <template #modal-footer="{ ok }">
        <div class="w-100 d-flex justify-content-center">
          <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
            OK
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal id="delete-success-salary-modal" centered>
      <h4 class="text-center">Salary category deleted</h4>
      <template #modal-footer="{ ok }">
        <div class="w-100 d-flex justify-content-center">
          <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
            OK
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal id="delete-salary-modal" title="">
      <h4 class="text-center mb-3">Are you sure to delete?</h4>
      <h5 class="text-center">
        {{ categoryName }}
      </h5>
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
          <b-button variant="danger" size="lg" @click="deleteSalary">
            Yes
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
  name: 'SalaryEdit',

  props: {
    salary: {
      type: Object,
    },
  },

  data() {
    return {
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

  watch: {
    salary() {
      this.loadData();
    },
  },

  methods: {
    loadData() {
      this.variables = [];
      this.categoryName = this.salary.name;
      this.baseSalary = this.salary.base_salary;

      if (this.salary.salary_structure.length > 0) {
        for (const salary of this.salary.salary_structure) {
          this.variableNumber += 1;
          const id = this.variableNumber;

          this.variables.push({
            generate_id: id,
            id: salary.id,
            salary_deep_category: salary.salary_deep_category,
            percent: salary.percent,
            name: salary.name,
          });
        }
      }
    },

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

    editSalary() {
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
          id: this.salary.id,
          organization: company,
          name: this.categoryName,
          base_salary: this.baseSalary,
          salary_structures: this.variables,
        };

        const url = `/pages/company_builder/update_salary_category/${this.salary.id}/`;

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'salary-edit');
          this.$bvModal.show('edit-salary-modal');
          this.$emit('reload', true);
        });
      }
    },

    closeModal() {
      this.$bvModal.hide('delete-salary-modal');
    },

    deleteSalary() {
      this.$bvModal.hide('delete-salary-modal');
      const url = `/pages/company_builder/update_salary_category/${this.salary.id}/`;
      const payload = { is_active: 0 };

      axios.post(url, payload).then(() => {
        this.$root.$emit('bv::toggle::collapse', 'salary-edit');
        this.$bvModal.show('delete-success-salary-modal');
        this.$emit('reload', true);
      });
    },
  },
};
</script>
