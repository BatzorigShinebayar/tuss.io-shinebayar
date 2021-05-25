<template>
  <b-form class="d-block mt-3 overflow-auto">
    <div v-for="(k, i) in lineElements" :key="i" class="overflow-visible">
      <div class="mb-2">
        <b-col cols="12">
          <div class="flex-space-between">
            <div>
              <Fa
                v-if="i !== 0"
                :icon="['fa', 'caret-circle-up']"
                class="text-deep-blue"
                @click="changeElementUp(i)"
              />
              <Fa
                v-if="lineElements.length - 1 !== i"
                :icon="['fa', 'caret-circle-down']"
                class="text-deep-blue"
                @click="changeElementDown(i)"
              />
            </div>
            <p class="number mr-2">{{ i + 1 }}</p>
            <div class="hl align-self-center"></div>
            <i
              v-if="!k.id"
              class="ml-2 number bx bx-trash align-middle"
              @click="remove(i)"
            ></i>
            <!--            <p class="btn sendBtn w-10" @click="send">Save</p>-->
          </div>
        </b-col>
      </div>
      <div class="mb-2">
        <b-col cols="12">
          <b-form-group label="Employee" :label-for="'employee_' + i">
            <treeselect
              id="employee"
              v-model="k.employeeList"
              placeholder="- Choose -"
              :name="`lineElements[${i}][employee]`"
              :multiple="false"
              :options="employeeList"
              :clearable="false"
              @input="elementDef"
            />
          </b-form-group>
        </b-col>
      </div>
      <div v-if="algorithmId">
        <b-col cols="12">
          <b-form-group
            label="Choose stage group"
            :label-for="'algorithm_stage_' + i"
          >
            <treeselect
              :id="'stage_group_' + i"
              v-model="k.stageGroupList"
              :name="`lineElements[${i}][algorithm_stage]`"
              placeholder="- Choose -"
              :multiple="false"
              :options="stageGroupList"
              :clearable="false"
              @input="elementDef"
            />
          </b-form-group>
        </b-col>
      </div>
      <div v-if="regulationId">
        <b-col cols="4">
          <b-form-group label="Choose Duty" :label-for="'duty_' + i">
            <treeselect
              :id="'duty_' + i"
              v-model="k.dutyList"
              :name="`lineElements[${i}][duty]`"
              placeholder="- Choose -"
              :multiple="false"
              :options="dutyList"
              :clearable="false"
              @input="elementDef"
            />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Is Primary Breach?">
            <b-form-checkbox
              v-model="k.isSelected"
              switch
              class="mr-n2"
              :options="is_primary_breach"
            >
              <span class="sr-only">False</span>
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </div>
      <div class="mb-2">
        <b-col cols="12">
          <b-form-group label="Description" :label-for="'description_' + i">
            <b-form-textarea
              v-model="k.description"
              spellcheck="false"
              @input="elementDef"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </div>
      <DiagnoseLineElementDeficiency @input="elementDef" />
    </div>
    <div>
      <b-col class="mb-5 pb-2" cols="12">
        <div class="btn btn-secondary" @click="addDiagLineElement">
          <p>Add element</p>
        </div>
      </b-col>
    </div>
  </b-form>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import DiagnoseLineElementDeficiency from '@/components/diagnose-system/diagnose_detail/DiagnoseLineElementDeficiency';

export default {
  name: 'DiagnoseLineElements',
  components: {
    DiagnoseLineElementDeficiency,
    Treeselect,
  },
  props: {
    algorithmId: {
      type: Number,
      default: () => null,
    },
    regulationId: {
      type: Number,
      default: () => null,
    },
    is_tus40_diagnosis: {
      type: Boolean,
      default: () => false,
    },
    algorithmStageGroups: {
      type: Array,
      default: () => [],
    },
    // lineElements: {
    //   type: Array,
    //   default: () => [],
    // },
    // skillLevels: {
    //   type: Array,
    //   default: () => [],
    // },
    // skillTypes: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      lineElements: [],
      is_primary_breach: [],
      elementDeficiencies: [],
      skill: [],
      dutyList: [],
      employeeList: [],
      stageGroupList: [],
    };
  },
  mounted() {
    for (const i in this.lineElements) {
      if (this.lineElements[i].is_tus40_diagnosis) {
        this.lineElements[i].deficiencyCategory = 'Skill deficiency';
      } else if (this.lineElements[i].regulation) {
        this.lineElements[i].deficiencyCategory = 'System deficiency';
        this.lineElements[i].regulation_id = [this.lineElements[i].regulation];
      }
    }

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
    this.employeeList = activeDepartments;

    const activeStageGroups = [];
    for (const stageGroup of this.algorithmStageGroups) {
      if (stageGroup.is_active === '1') {
        const activeStages = [];

        for (const stage of stageGroup.stages) {
          if (stage.is_active === '1') {
            const stageContext = {
              id: stage.id,
              label: stage.code + ' - ' + stage.name,
            };
            activeStages.push(stageContext);
          }
        }

        const stageGroupContext = {
          id: stageGroup.id + 'dep',
          label: stageGroup.name,
          children: activeStages,
        };
        activeStageGroups.push(stageGroupContext);
      }
    }
    this.stageGroupList = activeStageGroups;

    if (this.regulationId) {
      const param =
        '?is_active=1&is_title=false&page_size=100000&regulation=' +
        this.regulation_id;
      this.getDuties(param);
    }
  },
  watch: {},
  methods: {
    elementDef(diagnose_line_elements) {
      this.$emit('input', diagnose_line_elements);
      console.log('bbbbb', diagnose_line_elements);
    },
    async getDuties(params) {
      const response = await this.$store.dispatch('getDuty', params);
      if (response.status === 200) {
        this.system_duty = [];
        this.treeSelectData(response.data.results, this.system_duty, true);
        this.duty = [];
        const dutys = response.data.results;
        for (const i in dutys) {
          const jsonData = {};
          jsonData.id = dutys[i].id;
          jsonData.label = dutys[i].code + ' - ' + dutys[i].name;
          jsonData.duty_type = dutys[i].dtp_id;
          jsonData.point = dutys[i].dtp_point;
          this.dutyList.push(jsonData);
        }
      }
    },
    getDuty(regulation_id) {
      const param =
        '?is_active=1&is_title=false&page_size=100000&regulation=' +
        regulation_id;
      return this.getDuties(param);
    },
    remove(id) {
      this.lineElements.splice(id, 1);
    },
    task() {},
    async addDiagLineElement() {
      this.lineElements.push({});
    },
    changeElementUp(id) {
      console.log(this.lineElements);
      let temp = this.lineElements[id];
      console.log(temp);
      this.lineElements[id] = this.lineElements[id - 1];
      console.log(this.lineElements[id]);
      this.lineElements[id - 1] = temp;
      console.log(this.lineElements[id - 1]);
      console.log(this.lineElements);
      this.lineElements.push('');
      this.lineElements.pop();
    },
    changeElementDown(id) {
      let temp = this.lineElements[id];
      this.lineElements[id] = this.lineElements[id + 1];
      this.lineElements[id + 1] = temp;
      this.lineElements.push('');
      this.lineElements.pop();
    },
    /*async send() {*/
    /*  let elementJsonData = {};*/
    /*  let diagnose_line_elements = [];*/
    /*  for (const idx in this.lineElements) {*/
    /*    elementJsonData = {};*/
    /*    if (this.lineElements[idx].id) {*/
    /*      elementJsonData.id = this.lineElements[idx].id;*/
    /*    }*/
    /*    elementJsonData.diagnosis = this.diagnoseId;*/
    /*    elementJsonData.diagnosis_line = this.diagnoseLineId;*/
    /*    elementJsonData.employee = this.lineElements[idx].employee;*/
    /*    elementJsonData.description = this.lineElements[idx].description;*/
    /*    elementJsonData.deficiency_category = this.lineElements[*/
    //       idx
    //     ].deficiency_category;
    //     if (this.algorithmId) {
    //       elementJsonData.algorithm_stage = this.lineElements[
    //         idx
    //       ].algorithm_stage;
    //     }
    //     if (this.regulationId) {
    //       elementJsonData.duty = this.lineElements[idx].duty;
    //       elementJsonData.is_primary_breach = this.lineElements[
    //         idx
    //       ].is_primary_breach;
    //       // elementJsonData.score = this.lineElements[idx].score;
    //     }
    //     elementJsonData.sequence = idx;
    //     let systemDeficiencies = [];
    //     let skillDeficiencies = [];
    //     console.log('dddd', this.elementDeficiencies);
    //     for (let elementDeficiency of this.elementDeficiencies) {
    //       console.log('mmmmmmmmmmm', elementDeficiency);
    //       if (elementDeficiency.deficiencyCategory === 'skill') {
    //         skillDeficiencies.push({
    //           diagnose_line_element: this.lineElements[idx].id,
    //           diagnosis_line: this.diagnoseLineId,
    //           diagnosis: this.diagnoseId,
    //           description: elementDeficiency.description,
    //           skill_increase_type: elementDeficiency.skill_increase_type,
    //           skill_deficient_level: elementDeficiency.skill_deficient_level,
    //         });
    //       } else {
    //         systemDeficiencies.push({
    //           // diagnose_line_element: this.lineElements[idx].id,
    //           // diagnosis_line: this.diagnoseLineId,
    //           // diagnosis: this.diagnoseId,
    //           description: elementDeficiency.description,
    //         });
    //       }
    //     }
    //     elementJsonData.system_deficiencies = systemDeficiencies;
    //     elementJsonData.skill_deficiencies = skillDeficiencies;
    //     diagnose_line_elements.push(elementJsonData);
    //   }
    //   const params = {
    //     urlData: {
    //       diagnose_line_elements: diagnose_line_elements,
    //     },
    //   };
    //   console.log('sendingData', params);
    //   // await this.postDiagnoseTemplateList(params)
    //   // this.$emit('click', this.lineElements)
    // },
    // dataSwap(params){
    //   this.$emit('input', params);
    //   console.log('hhhhhhhhhhhh', params)
    // }
  },
};
</script>
<style scoped>
.dropdown {
  border: 1px solid #ced4da;
  width: 100%;
}
.btn-secondary {
  background-color: #2a3042;
  color: white;
}
</style>
