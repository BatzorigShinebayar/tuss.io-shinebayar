<template>
  <div>
    <div
      class="mt-4"
      v-for="diagnoseLine of diagnose_lines"
      :key="diagnoseLine.id"
    >
      <div v-if="diagnoseLine.algorithm">
        <div class="card card-accent-yellow">
          <header class="card-header">
            {{ diagnoseLine.algorithm | get_algorithm_full_name }}
            {{ diagnoseLine.skill_deficient_levels }}
            <p class="btn sendBtn w-10" @click="send">Save</p>
          </header>
          <div class="card-body">
            <DiagnoseLineElements
              :algorithmId="diagnoseLine.algorithm"
              :algorithmStageGroups="
                diagnoseLine.algorithm | get_algorithm_stage_groups
              "
              :regulationId="diagnoseLine.regulation"
              :is_tus40_diagnosis="diagnoseLine.is_tus40_diagnosis"
              :diagnose_line_elements="diagnoseLine.diagnose_line_elements"
              @input="algorithmlineElements"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import DiagnoseLineElements from '@/components/diagnose-system/diagnose_detail/DiagnoseLineElements';

export default {
  name: 'DiagnoseAlgorithmTab',
  components: {
    DiagnoseLineElements,
  },

  props: {
    diagnose_lines: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // lineElements: [],
      // algorithmlineElements: [],
    };
  },
  // provide() {
  //   return {
  //     algorithmlineElementsDef: this.algorithmlineElementsDef,
  //     algorithmlineElements: this.algorithmlineElements,
  //   };
  // },
  methods: {
    algorithmlineElements(params) {
      // this.algorithmlineElements = params;
      console.log('101010', params);
      //   this.algorithmlineElementsDef = params;
      //   console.log('9999', this.algorithmlineElementsDef);
    },
    // async send() {
    //   let elementJsonData = {};
    //   let diagnose_line_elements = [];
    //   for (const idx in this.algorithmlineElements) {
    //     elementJsonData = {};
    //     if (this.algorithmlineElements[idx].id) {
    //       elementJsonData.id = this.algorithmlineElements[idx].id;
    //     }
    //     // elementJsonData.diagnosis = this.diagnoseId;
    //     // elementJsonData.diagnosis_line = this.diagnoseLineId;
    //     elementJsonData.employee = this.algorithmlineElements[idx].employee;
    //     elementJsonData.description = this.algorithmlineElements[
    //       idx
    //     ].description;
    //     elementJsonData.deficiency_category = this.algorithmlineElements[
    //       idx
    //     ].deficiency_category;
    //     console.log('101010', this.algorithmlineElements);
    //     if (this.algorithmId) {
    //       elementJsonData.algorithm_stage = this.algorithmlineElements[
    //         idx
    //       ].algorithm_stage;
    //     }
    //     if (this.regulationId) {
    //       elementJsonData.duty = this.algorithmlineElements[idx].duty;
    //       elementJsonData.is_primary_breach = this.algorithmlineElements[
    //         idx
    //       ].is_primary_breach;
    //       // elementJsonData.score = this.lineElements[idx].score;
    //     }
    //     // elementJsonData.sequence = idx;
    //     // let systemDeficiencies = [];
    //     // let skillDeficiencies = [];
    //     // console.log('dddd', this.algorithmlineElements);
    //     // for (let elementDeficiency of this.algorithmlineElements) {
    //     //   console.log('mmmmmmmmmmm', elementDeficiency);
    //     //   if (elementDeficiency.deficiencyCategory === 'skill') {
    //     //     skillDeficiencies.push({
    //     //       // diagnose_line_element: this.elementDeficiencies[idx].id,
    /*   //       // diagnosis_line: this.diagnoseLineId,*!*/
    /*   //       // diagnosis: this.diagnoseId,*!*/
    /*   //       description: elementDeficiency.description,*!*/
    /*   //       skill_increase_type: elementDeficiency.skill_increase_type,*!*/
    /*   //       skill_deficient_level: elementDeficiency.skill_deficient_level,*!*/
    /*   //     });*!*/
    /*   //   } else {*!*/
    /*   //     systemDeficiencies.push({*!*/
    /*   //       // diagnose_line_element: this.lineElements[idx].id,*!*/
    /*   //       // diagnosis_line: this.diagnoseLineId,*!*/
    /*   //       // diagnosis: this.diagnoseId,*!*/
    /*   //       description: elementDeficiency.description,*!*/
    /*   //     });*!*/
    /*   //   }*!*/
    /*   // }*!*/
    /*   // elementJsonData.system_deficiencies = systemDeficiencies;*!*/
    //     // elementJsonData.skill_deficiencies = skillDeficiencies;
    //     // diagnose_line_elements.push(elementJsonData);
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
  },
};
</script>
<style scoped>
.btn-secondary {
  background-color: #2a3042;
  color: white;
}
</style>
