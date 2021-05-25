<template>
  <b-form class="d-block mt-3 overflow-auto">
    <div v-for="(k, i) in diagnoseTempLines" :key="i" class="overflow-visible">
      <div class="mb-2">
        <b-col cols="12">
          <div class="flex-space-between">
            <p class="number mr-2">{{ i + 1 }}</p>
            <div class="hl align-self-center"></div>
            <i
              v-if="!k.id"
              class="ml-2 number bx bx-trash align-middle"
              @click="remove(i)"
            ></i>
          </div>
        </b-col>
      </div>
      <div>
        <b-col cols="12">
          <b-form-group
            label="Choose Diagnose type"
            :label-for="'diagnoseType_' + i"
          >
            <b-form-radio-group
              :id="'diagnoseType_' + i"
              v-model="k.diagnoseType"
              :options="diagnoseTypes"
              @change="log"
              class="tus-radio-btn"
            >
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </div>
      <div v-if="k.diagnoseType === 'Algorithm'">
        <b-col cols="12">
          <b-form-group label="Use task's algorithm?">
            <b-form-checkbox
              v-model="k.use_task_algorithm"
              name="is-system-diagnose"
              @change="checkTaskAlgorithm(i)"
              class="tus-check-btn p-0"
            >
              {{ k.use_task_algorithm ? 'Yes' : 'No' }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col v-if="!k.use_task_algorithm" cols="12">
          <b-form-group label="Choose algorithm" :label-for="'algorithm_' + i">
            <treeselect
              :id="'conflictType_' + i"
              v-model="k.algorithm_id"
              placeholder="- Choose -"
              :multiple="false"
              :options="algorithm"
              @select="delete k.regulation_id && delete k.is_tus40_diagnosis"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </div>
      <div v-if="k.diagnoseType === 'Regulation'">
        <b-row class="mx-1">
          <b-col cols="6">
            <b-form-group label="Regulations" :label-for="'regulations_' + i">
              <treeselect
                :id="'regulations_' + i"
                v-model="k.regulation_id"
                placeholder="- Choose -"
                :multiple="false"
                :options="regulations"
                @select="
                  delete k.algorithm_id &&
                    delete k.is_tus40_diagnosis &&
                    k.use_task_algorithm
                "
                :clearable="false"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div v-if="k.diagnoseType === 'System diagnose'">
        <b-col cols="12">
          <b-form-group label="Is system diagnose?">
            <b-form-checkbox
              v-model="k.is_tus40_diagnosis"
              name="is-system-diagnose"
              @select="
                delete k.regulation_id &&
                  delete k.algorithm_id &&
                  delete k.use_task_algorithm
              "
              class="tus-check-btn p-0"
            >
              {{ k.is_tus40_diagnosis ? 'Yes' : 'No' }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </div>
    </div>
    <div>
      <b-col class="mb-5 pb-2" cols="12">
        <div class="btn btn-secondary" @click="addDiagTempLines">
          <p>Add diagnosis</p>
        </div>
      </b-col>
    </div>
  </b-form>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'DiagnoseTemplateLine',
  components: {
    Treeselect,
  },

  props: {
    diagnoseTemplateId: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      algorithm: [],
      regulations: [],
      diagnoseTempLines: [],
      diagnoseTypes: ['Algorithm', 'Regulation', 'System diagnose'],
    };
  },
  watch: {
    diagnoseTempLines: {
      handler: function (data) {
        for (const i in data) {
          data[i].sequence = i;
        }
        this.$emit('emit_data', data);
      },
      deep: true,
    },
  },
  mounted() {
    const algorithm = [];
    for (const alg of this.$store.getters.company.algorithm) {
      if (alg.is_active === '1') {
        algorithm.push(alg);
      }
    }
    this.treeSelectData(algorithm, this.algorithm);
    const regulations = [];
    for (const regu of this.$store.getters.company.regulations) {
      if (regu.is_active === '1') {
        regulations.push(regu);
      }
    }
    this.treeSelectData(regulations, this.regulations);

    console.log(this.diagnoseTemplateId);
    const diagnoseTemplates = this.$store.getters.company.diagnosis_templates;
    for (const i in diagnoseTemplates) {
      if (diagnoseTemplates[i].id === this.diagnoseTemplateId) {
        this.diagnoseTempLines = diagnoseTemplates[i].diagnosis_template_lines;
      }
    }
    console.log('diagnoseTempLines', this.diagnoseTempLines);
    for (const i in this.diagnoseTempLines) {
      if (this.diagnoseTempLines[i].is_tus40_diagnosis) {
        this.diagnoseTempLines[i].diagnoseType = 'System diagnose';
        delete this.diagnoseTempLines[i].regulation;
        delete this.diagnoseTempLines[i].algorithm;
        delete this.diagnoseTempLines[i].use_task_algorithm;
      } else if (this.diagnoseTempLines[i].regulation) {
        this.diagnoseTempLines[i].diagnoseType = 'Regulation';
        this.diagnoseTempLines[i].regulation_id = [
          this.diagnoseTempLines[i].regulation,
        ];
        delete this.diagnoseTempLines[i].regulation;
        delete this.diagnoseTempLines[i].is_tus40_diagnosis;
        delete this.diagnoseTempLines[i].algorithm;
        delete this.diagnoseTempLines[i].use_task_algorithm;
      } else if (this.diagnoseTempLines[i].algorithm) {
        this.diagnoseTempLines[i].diagnoseType = 'Algorithm';
        this.diagnoseTempLines[i].algorithm_id =
          this.diagnoseTempLines[i].algorithm;
        delete this.diagnoseTempLines[i].regulation;
        delete this.diagnoseTempLines[i].is_tus40_diagnosis;
        delete this.diagnoseTempLines[i].algorithm;
        delete this.diagnoseTempLines[i].use_task_algorithm;
      } else if (this.diagnoseTempLines[i].use_task_algorithm) {
        this.diagnoseTempLines[i].diagnoseType = 'Algorithm';
        delete this.diagnoseTempLines[i].regulation;
        delete this.diagnoseTempLines[i].is_tus40_diagnosis;
        delete this.diagnoseTempLines[i].algorithm;
      }
    }
    console.log('after', this.diagnoseTempLines);
  },
  methods: {
    log(data) {
      this.diagnoseTempLines.push({});
      this.diagnoseTempLines.pop(this.diagnoseTempLines.length - 1);
      console.log('a', data);
      console.log(this.diagnoseTempLines);
    },
    treeSelectData(data, target, withCode = false) {
      const changingData = data;
      for (const i in changingData) {
        const jsonData = {};
        if (withCode) {
          jsonData.id = changingData[i].id;
          jsonData.label = changingData[i].code + ' - ' + changingData[i].name;
        } else {
          jsonData.id = changingData[i].id;
          jsonData.label = changingData[i].name;
        }
        target.push(jsonData);
      }
    },
    checkTaskAlgorithm(index) {
      delete this.diagnoseTempLines[index].regulation_id;
      delete this.diagnoseTempLines[index].is_tus40_diagnosis;
      if (this.diagnoseTempLines[index].use_task_algorithm) {
        delete this.diagnoseTempLines[index].algorithm_id;
      } else {
        delete this.diagnoseTempLines[index].use_task_algorithm;
      }
    },
    remove(id) {
      this.diagnoseTempLines.splice(id, 1);
    },
    async addDiagTempLines() {
      this.diagnoseTempLines.push({
        diagnoseType: 'Algorithm',
      });
    },
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
