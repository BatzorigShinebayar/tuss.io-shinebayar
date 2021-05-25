<template>
  <b-form v-if="ready" class="d-block mt-3 overflow-auto">
    <div
      v-for="(deficiencyItem, idx) in deficiencyLines"
      :key="idx"
      class="overflow-visible"
    >
      {{ deficiencyLines }}
      <div>
        <div class="mb-2">
          <b-col cols="12">
            <div class="flex-space-between">
              <!--              <p class="number mr-2">{{ idx + 1 }}</p>-->
              <div class="hl align-self-center"></div>
              <i
                v-if="!deficiencyItem.id"
                class="ml-2 number bx bx-trash align-middle"
                @click="remove(idx)"
              ></i>
              <i
                v-b-toggle.diagnoseLineElDef-task
                class="ml-2 number bx bx-task align-middle"
              ></i>
              <b-sidebar
                id="diagnoseLineElDef-task"
                title="Creat new task"
                right
                shadow
                backdrop
                lazy
                class="sidebar-lg"
              >
                <div>
                  <b-row class="mx-1">
                    <b-col cols="12">
                      <DiagnoseLineElementDeficiencysLine
                        v-if="tabMenu === 'DiagnoseLineElementDeficiencysLine'"
                        :definciency-task-id="deficiencyItem.id"
                        @emit_data="emitDiagTempLines"
                      />
                    </b-col>
                  </b-row>
                </div>
                <template #footer="{ hide }">
                  <b-col cols="12" class="d-flex bg-secondary py-3 footer">
                    <b-col class="p-0" cols="9">
                      <p class="btn sendBtn w-100" @click="send">Save</p>
                    </b-col>
                    <b-col class="pr-0" cols="3">
                      <p class="cancelBtn w-100 btn" @click="hide">Close</p>
                    </b-col>
                  </b-col>
                </template>
              </b-sidebar>
            </div>
          </b-col>
        </div>
        <b-col cols="12">
          <b-form-group
            label="Choose Deficiency category"
            :label-for="'deficiencyCategory_' + idx"
          >
            <b-form-radio-group
              :id="'deficiencyCategory_' + idx"
              v-model="deficiencyItem.deficiencyCategory"
              :options="deficiencyCategories"
              :name="`deficiencyLines[${idx}][deficiencyCategory]`"
              @change="log"
              class="tus-radio-btn"
            >
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <div v-if="deficiencyItem.deficiencyCategory === 'skill'">
          <b-col cols="12">
            <b-form-group label="Skill deficiency" :label-for="'Skill_' + idx">
              <b-form-textarea
                :id="'Skill_' + idx"
                v-model="deficiencyItem.description"
                placeholder="- Choose -"
                @input="dataChange"
                :multiple="false"
                :clearable="false"
              />
            </b-form-group>
          </b-col>
          <b-row class="mx-0">
            <b-col cols="6">
              <b-form-group
                label="Skill Increase Type"
                :label-for="'skill_increase_type_' + idx"
              >
                <treeselect
                  :id="'skill_increase_type_' + idx"
                  v-model="deficiencyItem.skill_increase_type"
                  placeholder="- Choose -"
                  :multiple="false"
                  @input="dataChange"
                  :options="skill_increase_types"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Skill Deficient Level"
                :label-for="'skill_deficient_level_' + idx"
              >
                <treeselect
                  :id="'diagnoseLineId' + idx"
                  v-model="deficiencyItem.skill_deficient_level"
                  placeholder="- Choose -"
                  :multiple="false"
                  @input="dataChange"
                  :options="skill_deficient_levels"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <div v-if="deficiencyItem.deficiencyCategory === 'system'">
          <b-row class="mx-1">
            <b-col cols="6">
              <b-form-group
                label="System deficiency"
                :label-for="'System_' + idx"
              >
                <b-form-textarea
                  :id="'regulations_' + idx"
                  v-model="deficiencyItem.description"
                  placeholder="- Choose -"
                  @input="dataChange"
                  :multiple="false"
                  :clearable="false"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <div>
      <b-col class="mb-5 pb-2" cols="12">
        <div class="btn btn-secondary" @click="addDeficiency">
          <p>Add Deficiency</p>
        </div>
      </b-col>
    </div>
    <!--    <DiagnoseLineElementDeficiencysTask-->
    <!--      :diagnoseLineElDefTask="DeficiencyTaskItem"-->
    <!--    />-->
  </b-form>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
// import DiagnoseLineElementDeficiencysTask from '@/components/diagnose-system/diagnose_detail/DiagnoseLineElementDeficiencysTask';
import DiagnoseLineElementDeficiencysLine from '@/components/diagnose-system/diagnose_detail/DiagnoseLineElementDeficiencysLine';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'DiagnoseLineElementDeficiency',
  components: {
    DiagnoseLineElementDeficiencysLine,
    Treeselect,
  },
  props: {
    diagnoseId: {
      type: Number,
      default: () => null,
    },
    diagnoseLineId: {
      type: Number,
      default: () => null,
    },
    elementId: {
      type: Number,
      default: () => null,
    },
    // deficiencyLines: {
    //   type: Array,
    //   default: () => null,
    // },
  },
  data() {
    return {
      definciencyTaskId: [],
      tabMenu: 'DiagnoseLineElementDeficiencysLine',
      name: '',
      symptom: '',
      templateLinesData: [],
      DeficiencyTaskItem: null,
      ready: true,
      skill_deficient_level: [],
      skill_increase_type: [],
      deficiencyLines: [],
      deficiencyCategories: this.$store.getters.company.deficiency_categories,
    };
  },
  validations: {
    reasonSelected: { required },
    documentData: { required },
  },
  mounted() {
    const activeSkillIncreaseTypes = [];
    for (const skillType of this.$store.getters.company.skill_increase_types) {
      if (skillType.is_active === '1') {
        const skillTypeContext = {
          id: skillType.id,
          label: skillType.code + ' - ' + skillType.name,
        };
        activeSkillIncreaseTypes.push(skillTypeContext);
      }
    }
    this.skill_increase_types = activeSkillIncreaseTypes;

    const activeSkillDeficientLevels = [];
    for (const skillLevel of this.$store.getters.company
      .skill_deficient_levels) {
      if (skillLevel.is_active === '1') {
        const skillLevelContext = {
          id: skillLevel.id,
          label: skillLevel.code + ' - ' + skillLevel.name,
        };
        activeSkillDeficientLevels.push(skillLevelContext);
      }
    }
    this.skill_deficient_levels = activeSkillDeficientLevels;
  },
  methods: {
    log(data) {
      this.deficiencyLines.push({});
      this.deficiencyLines.pop(this.deficiencyLines.length - 1);
      console.log('B', data);
      // console.log(this.deficiencyLines);
    },
    remove(idx) {
      this.deficiencyLines.splice(idx, 1);
    },
    deficiencyTask(idx) {
      this.DeficiencyTaskItem = idx.item;
    },
    async addDeficiency() {
      this.deficiencyLines.push({});
    },
    dataChange() {
      this.$emit('input', this.deficiencyLines);
      console.log('ccccc', this.deficiencyLines);
    },
    // start=>DefTaskline
    async postDiagnoseTemplateList(params) {
      const response = await this.$store.dispatch(
        'postDiagnoseTemplateList',
        params
      );
      if (response.status === 200) {
        return true;
      }
    },
    async getDiagnoseTemplateList(params) {
      const response = await this.$store.dispatch(
        'getDiagnoseTemplateList',
        params
      );
      if (response.status === 200) {
        const company = { ...this.$store.getters.company };
        company.diagnosis_templates = response.data;
        this.$store.commit('company', company);
        console.log('company', this.$store.getters.company);
      }
    },
    closeSideBar() {
      this.$store.dispatch('CICreateSideMenuToggle', false);
    },
    emitDiagTempLines(data) {
      this.definciencyTaskId = data;
      console.log('88', this.definciencyTaskId);
    },
    // async send() {
    //   const checkList = [];
    //   for (const i in this.definciencyTaskId) {
    //     delete this.definciencyTaskId[i].diagnoseType;
    //     let id = '';
    //     let jsonData = {
    /*      diagnosis_template_id: this.diagnoseTemplate.id,*/
    /*    };*/
    /*    if (this.definciencyTaskId[i].id) {*/
    /*      jsonData.is_active = this.diagnoseTemplate.is_active;*/
    /*      jsonData.updated_user = this.$store.getters.user.id;*/
    /*      jsonData.updated_date = new Date();*/
    /*      id = this.diagnoseTemplate.id + '/';*/
    /*    } else {*/
    /*      jsonData.created_user = this.$store.getters.user.id;*/
    /*      jsonData.updated_user = this.$store.getters.user.id;*/
    /*      jsonData.created_date = new Date();*/
    /*      jsonData.updated_date = new Date();*/
    /*      jsonData.organization_id = this.$store.getters.activeCompany;*/
    /*    }*/
    /*    jsonData = { ...jsonData, ...this.diagTempLines[i] };*/
    /*    const params = {*/
    //       urlParam: id,
    //       urlData: jsonData,
    //     };
    //     console.log('sendingData', jsonData);
    //     checkList.push(await this.postDiagnoseTemplateList(params));
    //   }
    //   if (checkList.length === this.diagTempLines.length) {
    //     console.log('done');
    //     const param = this.$store.getters.activeCompany + '/';
    //     this.getDiagnoseTemplateList(param);
    //   }
    // },
  },
};
</script>
<style scoped>
.btn-secondary {
  background-color: #2a3042;
  color: white;
}
</style>
