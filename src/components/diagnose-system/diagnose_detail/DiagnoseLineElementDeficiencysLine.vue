<template>
  <b-form class="d-block mt-3 overflow-auto">
    <div
      v-for="(k, i) in DiagnoseLineElementDeficiencysLine"
      :key="i"
      class="overflow-visible"
    >
      {{ DiagnoseLineElementDeficiencysLine }}
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
          <b-form-group label="Task name" :label-for="'taskName_' + i">
            <b-form-input
              :id="'taskName_' + i"
              type="text"
              v-model="k.task_name"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </div>
      <div>
        <b-col cols="12">
          <b-form-group label="Task type" :label-for="'taskType_' + i">
            <treeselect
              :id="'taskType_' + i"
              v-model="k.taskType"
              placeholder="- Choose -"
              :multiple="false"
              :options="taskTypeList"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </div>
      <div>
        <b-col cols="12">
          <b-form-group label="Function" :label-for="'fuction_' + i">
            <treeselect
              :id="'fuction_' + i"
              v-model="k.subfunction"
              placeholder="- Choose -"
              :multiple="false"
              :options="subFunction"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </div>
      <div>
        <b-row class="mx-1">
          <b-col cols="4">
            <b-form-group label="Start date" :label-for="'startDate_' + i">
              <b-form-datepicker
                v-model="k.startDate"
                placeholder="MM-DD-YYYY"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }"
                today-button
                close-button
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="End Date">
              <b-form-datepicker
                v-model="k.endDate"
                today-button
                close-button
                placeholder="MM-DD-YYYY"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Duration">
              <b-form-input
                :id="'duration_' + i"
                v-model="k.duration"
                :multiple="false"
                :clearable="false"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <div>
        <b-col cols="12">
          <b-form-group label="Algorithm" :label-for="'Algorithm_' + i">
            <treeselect
              :id="'Algorithm_' + i"
              v-model="k.algorithm"
              placeholder="- Choose -"
              :multiple="false"
              :options="options"
              :clearable="false"
            />
          </b-form-group>
        </b-col>
      </div>
    </div>
    <div>
      <b-col class="mb-5 pb-2" cols="12">
        <div class="btn btn-secondary" @click="addDiagTempLines">
          <p>+ Add Task</p>
        </div>
      </b-col>
    </div>
  </b-form>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'DiagnoseLineElementDeficiencysLine',
  components: {
    Treeselect,
  },
  props: {
    definciencyTaskId: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      subfunction: null,
      algorithm: null,
      taskType: null,
      DiagnoseLineElementDeficiencysLine: [],
    };
  },
  watch: {
    // DiagnoseLineElementDeficiencysLine: {
    //   handler: function (data) {
    //     for (const i in data) {
    //       data[i].sequence = i;
    //     }
    //     this.$emit('emit_data', data);
    //   },
    //   deep: true,
    // },
  },
  computed: {
    taskTypeList() {
      const optionList = [];
      const allTaskTypes = this.$store.getters.company.task_type;
      for (const taskType of allTaskTypes) {
        if (taskType.active === '1') {
          optionList.push({
            id: taskType.id,
            label: `${taskType.code} | ${taskType.name}`,
          });
        }
      }
      return optionList;
    },
    options() {
      const algorithmList = [];
      for (const algorithm of this.$store.getters.company.algorithm) {
        if (algorithm.is_active === '1') {
          algorithmList.push({
            id: algorithm.id,
            label: algorithm.name,
          });
        }
      }
      return algorithmList;
    },
    subFunction() {
      const subfunctionList = [];
      for (const subfunction of this.$store.getters.company.function) {
        if (subfunction.is_active === '1') {
          subfunctionList.push({
            id: subfunction.id,
            label: subfunction.name,
          });
        }
      }
      return subfunctionList;
    },
  },
  mounted() {},
  methods: {
    // log(data) {
    //   this.DiagnoseLineElementDeficiencysLine.push({});
    //   this.DiagnoseLineElementDeficiencysLine.pop(
    //     this.DiagnoseLineElementDeficiencysLine.length - 1
    //   );
    //   console.log('pppp', data);
    //   console.log('99', this.DiagnoseLineElementDeficiencysLine);
    // },
    // treeSelectData(data, target, withCode = false) {
    //   const changingData = data;
    //   for (const i in changingData) {
    //     const jsonData = {};
    //     if (withCode) {
    //       jsonData.id = changingData[i].id;
    //       jsonData.label = changingData[i].code + ' - ' + changingData[i].name;
    //     } else {
    //       jsonData.id = changingData[i].id;
    //       jsonData.label = changingData[i].name;
    //     }
    //     target.push(jsonData);
    //   }
    // },
    remove(id) {
      this.DiagnoseLineElementDeficiencysLine.splice(id, 1);
    },
    async addDiagTempLines() {
      this.DiagnoseLineElementDeficiencysLine.push({});
      console.log('wwwwwww', this.task_type);
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
