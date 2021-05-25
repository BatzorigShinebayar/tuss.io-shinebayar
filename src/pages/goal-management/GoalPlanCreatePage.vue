<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Creating New Goal plan</h5>
      </template>
    </NavBar>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <a class="cursor-pointer mt-2 mb-3 d-inline-block" @click="back">
        <Fa :icon="['fas', 'chevron-left']" />
        Back
      </a>

      <div class="row">
        <div class="col-lg-3 mb-4">
          <div class="lineless-card p-3 h-100">
            <h5 class="font-weight-bold mt-3">Creating New Goal Plan</h5>
            <p class="text-black-50 mb-3">Goal set properly is halfway done!</p>
            <h5 class="font-weight-bold text-primary mb-1">
              {{ Math.ceil((value * 100) / max) }}%
            </h5>
            <b-progress
              :value="value"
              :max="max"
              variant="primary"
              height="5px"
              class="mb-4"
            ></b-progress>

            <hr />

            <h5 class="font-weight-bold text-danger">Draft</h5>
            <p class="text-black-50 mb-3">State</p>

            <hr />

            <div class="d-flex align-items-center justify-content-between">
              <p>Define goal plan general information</p>
              <Fa
                :icon="['fas', 'check-circle']"
                size="2x"
                class="ml-2"
                :class="step1"
              />
            </div>

            <hr />

            <div class="d-flex align-items-center justify-content-between">
              <p>Define goal plan lines</p>
              <Fa
                :icon="['fas', 'check-circle']"
                size="2x"
                class="ml-2"
                :class="step2"
              />
            </div>

            <hr />

            <div class="d-flex align-items-center justify-content-between">
              <p>Review goal plan and confirm</p>
              <Fa
                :icon="['fas', 'check-circle']"
                size="2x"
                class="ml-2"
                :class="step3"
              />
            </div>

            <hr />

            <b-button variant="primary" class="mt-4 mb-2" @click="save" block>
              <Fa :icon="['fas', 'save']" />
              Create
            </b-button>
          </div>
        </div>
        <div class="col-lg-9 mb-4">
          <div class="lined-card p-4 h-100">
            <h4 class="font-weight-bold">Creating New Goal plan</h4>
            <p class="text-black-50 mt-1">
              Lorem ipsum dolor sit amet constectutor amet sit dolor
            </p>
            <b-form-group label="Goal plan name" class="mt-4">
              <b-input
                type="text"
                v-model="name"
                class="goal-plan-create-input"
                spellcheck="false"
              />
              <span v-if="!$v.name.required && formSubmit" class="text-danger">
                Goal plan name is required
              </span>
            </b-form-group>

            <b-form-group label="Goal plan description" class="mt-4">
              <b-input
                type="text"
                v-model="description"
                class="goal-plan-create-input"
                spellcheck="false"
              />
              <span
                v-if="!$v.description.required && formSubmit"
                class="text-danger"
              >
                Goal plan description is required
              </span>
            </b-form-group>

            <b-form-group
              label="This goal will be used for measuring the outcome of:"
              class="mt-4"
            >
              <b-form-radio-group
                v-model="structDecompLvl"
                :options="structDecompLvlList"
                class="goal-radio-btn"
              >
              </b-form-radio-group>
            </b-form-group>

            <b-form-group
              v-if="structDecompLvl !== 'company'"
              label="Please specify which department"
              class="mt-4"
            >
              <b-form-radio-group
                v-model="department"
                :options="departmentList"
                class="goal-radio-btn"
              >
              </b-form-radio-group>
              <span
                v-if="!$v.department.required && formSubmit"
                class="text-danger"
              >
                Department is required
              </span>
            </b-form-group>

            <b-form-group
              v-if="structDecompLvl === 'job_title' && department"
              label="Please specify which job title"
              class="mt-4"
            >
              <b-form-radio-group
                v-model="jobTitle"
                :options="jobTitleList"
                class="goal-radio-btn"
              >
              </b-form-radio-group>
              <span
                v-if="!$v.jobTitle.required && formSubmit"
                class="text-danger"
              >
                Job title is required
              </span>
            </b-form-group>

            <div class="d-flex">
              <b-form-group
                label="Please choose year"
                class="goal-plan-create-date mr-3"
              >
                <b-form-select v-model="year" :options="yearList" />
              </b-form-group>

              <b-form-group label="Goal measuring frequency">
                <b-form-radio-group
                  v-model="frequency"
                  :options="frequencyList"
                  class="goal-radio-btn"
                >
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="lined-card p-4 mb-5">
            <h4 class="font-weight-bold">Goal Plan Lines</h4>
            <p class="text-black-50 mt-1">Goal set properly is halfway done!</p>

            <b-modal id="goal-plan-add" centered title="Add index to plan">
              <b-form-group
                label="Choose index to add into plan line"
                class="px-2 mb-0"
              >
                <treeselect
                  v-model="goalIndex"
                  :options="indexList"
                  :multiple="false"
                  :clearable="false"
                  :disable-branch-nodes="true"
                  :value-consists-of="'LEAF_PRIORITY'"
                >
                </treeselect>
              </b-form-group>

              <template #modal-footer="{ ok }">
                <div class="w-100 d-flex justify-content-end mb-3">
                  <b-button variant="outline-primary" class="" @click="ok()">
                    Cancel
                  </b-button>
                  <b-button
                    :disabled="!goalIndex"
                    variant="primary"
                    class="mx-2 px-4"
                    @click="addIndex"
                  >
                    Add
                  </b-button>
                </div>
              </template>
            </b-modal>

            <b-button-group class="mt-3 mb-3">
              <b-button variant="outline-primary" @click="addIndexModal">
                <Fa :icon="['fas', 'plus']" />
                Add index
              </b-button>
              <b-button variant="outline-primary" @click="tableDelete">
                <Fa :icon="['fas', 'minus']" />
                Remove index
              </b-button>
              <b-button variant="outline-primary" @click="tableRevert">
                <Fa :icon="['fas', 'undo']" />
                Undo
              </b-button>
            </b-button-group>

            <ejs-treegrid
              ref="grid"
              id="goal-plan-table"
              :dataSource="tableData"
              :editSettings="tableEditOptions"
              @rowSelected="rowSelected"
            >
              <e-columns v-if="sprPlanLinesDate.length === 12">
                <e-column
                  field="id"
                  headerText="id"
                  :isPrimaryKey="true"
                  :visible="false"
                ></e-column>
                <e-column
                  field="name"
                  headerText="Index"
                  :allowEditing="false"
                ></e-column>
                <e-column
                  field="1"
                  headerText="Jan"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="2"
                  headerText="Feb"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="3"
                  headerText="Mar"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="4"
                  headerText="Arp"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="5"
                  headerText="May"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="6"
                  headerText="Jun"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="7"
                  headerText="Jul"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="8"
                  headerText="Aug"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="9"
                  headerText="Sep"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="10"
                  headerText="Oct"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="11"
                  headerText="Nov"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="12"
                  headerText="Dev"
                  editType="numericedit"
                ></e-column>
              </e-columns>
              <e-columns v-if="sprPlanLinesDate.length === 4">
                <e-column
                  field="id"
                  headerText="id"
                  :isPrimaryKey="true"
                  :visible="false"
                ></e-column>
                <e-column field="name" headerText="Index"></e-column>
                <e-column
                  field="1"
                  headerText="Season 1"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="2"
                  headerText="Season 2"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="3"
                  headerText="Season 3"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="4"
                  headerText="Season 4"
                  editType="numericedit"
                ></e-column>
              </e-columns>
              <e-columns v-if="sprPlanLinesDate.length === 2">
                <e-column
                  field="id"
                  headerText="id"
                  :isPrimaryKey="true"
                  :visible="false"
                ></e-column>
                <e-column field="name" headerText="Index"></e-column>
                <e-column
                  field="1"
                  headerText="First half"
                  editType="numericedit"
                ></e-column>
                <e-column
                  field="2"
                  headerText="Last half"
                  editType="numericedit"
                ></e-column>
              </e-columns>
              <e-columns v-if="sprPlanLinesDate.length === 1">
                <e-column
                  field="id"
                  headerText="id"
                  :isPrimaryKey="true"
                  :visible="false"
                ></e-column>
                <e-column field="name" headerText="Index"></e-column>
                <e-column
                  field="1"
                  headerText="Year"
                  editType="numericedit"
                ></e-column>
              </e-columns>
            </ejs-treegrid>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import Vue from 'vue';
import { TreeGridPlugin, Edit } from '@syncfusion/ej2-vue-treegrid';
import Treeselect from '@riophae/vue-treeselect';
Vue.use(TreeGridPlugin);

export default {
  name: 'GoalPlanCreatePage',

  metaInfo: {
    title: 'Goal Management | TUSS D+',
  },

  components: {
    MainLayout,
    NavBar,
    Treeselect,
  },

  data() {
    return {
      indexList: [],
      formSubmit: false,
      name: null,
      description: null,
      structDecompLvl: 'job_title',
      structDecompLvlList: [
        { value: 'job_title', text: 'Employee' },
        { value: 'department', text: 'Department' },
        { value: 'company', text: 'Company' },
      ],
      department: null,
      jobTitle: null,
      year: null,
      yearList: [2021, 2022, 2023, 2024, 2025],
      frequency: 'monthly',
      frequencyList: [
        { value: 'monthly', text: 'Monthly' },
        { value: 'quarterly', text: 'Quarterly' },
        { value: 'half_year', text: 'Half year' },
        { value: 'yearly', text: 'Yearly' },
      ],
      state: 'draft',
      max: 7,
      value: 0,
      step1: 'text-black-50',
      step2: 'text-black-50',
      step3: 'text-black-50',
      tableData: [],
      tableDataBackup: [],
      tableEditOptions: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },
      tableSelectedRow: null,
      goalIndex: null,
      selectedIndexes: [],
      sprPlanLinesDate: [],
      sprPlanLines: [],
    };
  },

  computed: {
    departmentList() {
      const list = [];
      for (const item of this.$store.getters.company.department) {
        if (item.is_active === '1') {
          list.push({
            value: item.id,
            text: item.short_name,
          });
        }
      }
      return list;
    },

    jobTitleList() {
      const list = [];
      if (this.department) {
        for (const item of this.$store.getters.company.job_title) {
          if (item.is_active === '1' && item.department === this.department) {
            list.push({
              value: item.id,
              text: item.short_name,
            });
          }
        }
      }
      return list;
    },
  },

  mounted() {
    //setting default
    const year = new Date().getFullYear();
    if (this.yearList.includes(year)) {
      this.year = year;
    }

    this.loadIndexes();
    this.updateProgress();
    this.goalDateCalculate();
  },

  validations() {
    const retVal = {
      name: { required },
      description: { required },
    };

    if (
      this.structDecompLvl === 'job_title' ||
      this.structDecompLvl === 'department'
    ) {
      retVal.department = { required };
    }

    if (this.structDecompLvl === 'job_title') {
      retVal.jobTitle = { required };
    }

    return retVal;
  },

  watch: {
    name() {
      this.updateProgress();
    },

    description() {
      this.updateProgress();
    },

    structDecompLvl() {
      this.updateProgress();
    },

    department() {
      this.updateProgress();
    },

    jobTitle() {
      this.updateProgress();
    },

    year() {
      this.updateProgress();
      this.goalDateCalculate();
    },

    frequency() {
      this.updateProgress();
      this.goalDateCalculate();
    },

    selectedIndexes() {},
  },

  methods: {
    back() {
      window.history.back();
    },

    loadIndexes() {
      const company = this.$store.getters.activeCompany;
      const url = `pages/goal/list_goal_index/${company}/`;

      axios.get(url).then((response) => {
        const indexes = [];
        for (const index of response.data.index_list) {
          if (index.active === '1') {
            indexes.push({
              id: index.id,
              label: index.name,
              shortName: index.short_name,
              name: index.name,
              childs: index.childs,
            });
          }
        }
        this.indexList = indexes;
      });
    },

    updateProgress() {
      this.value = 0;
      if (this.structDecompLvl === 'job_title') {
        this.max = 7;
      } else if (this.structDecompLvl === 'department') {
        this.max = 6;
        if (this.department) {
          this.value += 1;
        }
      } else if (this.structDecompLvl === 'company') {
        this.max = 5;
      }
      if (this.structDecompLvl === 'job_title' && this.jobTitle) {
        this.value += 1;
      }
      if (this.structDecompLvl === 'job_title' && this.department) {
        this.value += 1;
      }
      if (this.name) {
        this.value += 1;
      }
      if (this.description) {
        this.value += 1;
      }
      if (this.structDecompLvl) {
        this.value += 1;
      }
      if (this.year) {
        this.value += 1;
      }
      if (this.frequency) {
        this.value += 1;
      }

      if (this.structDecompLvl === 'job_title' && this.value === 7) {
        this.step1 = 'text-primary';
      } else if (this.structDecompLvl === 'department' && this.value === 6) {
        this.step1 = 'text-primary';
      } else if (this.structDecompLvl === 'company' && this.value === 5) {
        this.step1 = 'text-primary';
      } else {
        this.step1 = 'text-black-50';
      }
    },

    save() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.tableToData();
        const url = '/pages/goal/create_goal_plan/';

        const payload = {
          organization: this.$store.getters.activeCompany,
          name: this.name,
          description: this.description,
          struct_decomp_lvl: this.structDecompLvl,
          state: this.state,
          department: this.department,
          job_title: this.jobTitle,
          year: this.year,
          frequency: this.frequency,
          start_date: `${this.year}-01-01`,
          end_date: `${this.year}-12-31`,
          update_user: this.$store.getters.user.id,
          spr_plan_lines: this.sprPlanLines,
        };

        axios.post(url, payload).then(() => {
          this.$router.push({ name: 'goal-plan-list' });
        });
      }
    },

    rowSelected(payload) {
      this.tableSelectedRow = payload;
    },

    addIndexModal() {
      this.$bvModal.show('goal-plan-add');
    },

    addIndex() {
      this.$bvModal.hide('goal-plan-add');

      let selectedIndexItem;
      for (const singleIndex of this.indexList) {
        if (singleIndex.id === this.goalIndex) {
          selectedIndexItem = singleIndex;
        }
      }

      if (this.selectedIndexes.length > 0) {
        let exist = false;

        for (const singleSelected of this.selectedIndexes) {
          if (singleSelected.id === selectedIndexItem.id) {
            exist = true;
          }
        }
        if (!exist) {
          this.selectedIndexes.push(selectedIndexItem);
          this.tableRowAdd(selectedIndexItem);
        }
      } else {
        this.selectedIndexes.push(selectedIndexItem);
        this.tableRowAdd(selectedIndexItem);
      }
    },

    tableDelete() {
      let selectedRow = this.$refs.grid.getSelectedRowIndexes().length;
      let selectedRowIndex = this.$refs.grid.getSelectedRowIndexes()[0];

      if (selectedRow > 0) {
        this.tableData.splice(selectedRowIndex, 1);
        const deleteId = this.tableSelectedRow.data.id;

        let i;
        for (i = 0; i < this.selectedIndexes.length; i++) {
          if (this.selectedIndexes[i].id === deleteId) {
            this.selectedIndexes.splice(i, 1);
          }
        }

        this.tableData = [...this.tableData];
      }
    },

    tableRevert() {
      const backup = JSON.stringify(this.tableDataBackup);
      this.tableData = JSON.parse(backup);
      this.$refs.grid.ej2Instances.refresh();
    },

    goalDateCalculate() {
      const sprPlanLinesDate = [];
      let increment;
      if (this.frequency === 'monthly') {
        increment = 1;
      } else if (this.frequency === 'quarterly') {
        increment = 3;
      } else if (this.frequency === 'half_year') {
        increment = 6;
      } else if (this.frequency === 'yearly') {
        increment = 12;
      } else {
        increment = 1;
      }

      for (let month = 0; month < 12; month += increment) {
        const startDate = new Date(this.year, month, 1);
        const endDate = new Date(this.year, month + increment, 0);
        const start = this.dateConverter(startDate);
        const end = this.dateConverter(endDate);
        sprPlanLinesDate.push({ start_date: start, end_date: end });
      }
      this.sprPlanLinesDate = sprPlanLinesDate;
    },

    tableRowAdd(selectedIndexItem) {
      let lines = {};
      for (let i = 1; i <= this.sprPlanLinesDate.length; i++) {
        lines[i] = 0;
      }
      let rowItem = {
        id: selectedIndexItem.id,
        name: selectedIndexItem.shortName,
        ...lines,
      };
      this.tableData.push(rowItem);
      this.$refs.grid.ej2Instances.refresh();
    },

    dateConverter(dateObj) {
      const startyear = dateObj.getFullYear();
      const startmonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const startday = dateObj.getDate().toString().padStart(2, '0');
      return `${startyear}-${startmonth}-${startday}`;
    },

    //converts table data to api data
    tableToData() {
      const sprPlanLines = [];
      this.sprPlanLinesDate.forEach((line, index) => {
        const lineIndex = [];
        for (const singleIndex of this.tableData) {
          lineIndex.push({
            index: singleIndex.id,
            planned_value: singleIndex[index + 1],
          });
        }

        const row = {
          start_date: line.start_date,
          end_date: line.end_date,
          sequence: index + 1,
          plan_line_indexes: lineIndex,
        };

        sprPlanLines.push(row);
      });

      this.sprPlanLines = sprPlanLines;
    },
  },

  provide: {
    treegrid: [Edit],
  },
};
</script>

<style scoped>
@import '../../../node_modules/@syncfusion/ej2-base/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-buttons/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-calendars/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-inputs/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-navigations/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-popups/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-grids/styles/bootstrap4.css';
@import '../../../node_modules/@syncfusion/ej2-treegrid/styles/bootstrap4.css';
</style>
