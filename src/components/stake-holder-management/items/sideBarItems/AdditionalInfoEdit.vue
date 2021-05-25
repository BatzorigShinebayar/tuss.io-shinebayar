<template>
  <div>
    <b-col cols="12">
      <b-form class="d-block mt-3">
        <div v-if="information.is_multi_data">
          <div v-for="(variable, index) in infoData" :key="index">
            <div class="salary-variable-item">
              <div class="flex-shrink-1">
                <h4 class="text-primary">
                  {{ index + 1 }}
                </h4>
              </div>
              <div class="flex-grow-1">
                <div class="salary-variable-remove">
                  <Fa
                    class="text-danger cursor-pointer"
                    :icon="['fas', 'trash']"
                    @click="removeVariable(index, infoData)"
                  />
                </div>
                <b-form-row>
                  <b-col
                    v-for="(cols, indexx) in information.loaded_items"
                    :key="indexx"
                    cols="12"
                  >
                    <div v-if="cols.is_active === '1'">
                      <b-form-group
                        v-if="cols.type === 'text' || cols.type === 'number'"
                        :label="cols.label"
                        :label-for="cols.id + '_' + indexx"
                      >
                        <b-form-input
                          :id="cols.id + '_' + index"
                          class="custom-input"
                          v-model="variable[indexx]['value']"
                          @input="inputChange(variable, cols, $event)"
                          :required="cols.required"
                          :type="cols.type"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        v-if="cols.type === 'textarea'"
                        :label="cols.label"
                        :label-for="cols.id + '_' + indexx"
                      >
                        <b-form-textarea
                          :id="cols.id + '_' + indexx"
                          v-model="variable[indexx]['value']"
                          @input="inputChange(variable, cols, $event)"
                          :required="cols.required"
                          rows="2"
                        ></b-form-textarea>
                      </b-form-group>
                      <b-form-group
                        v-if="cols.type === 'boolean'"
                        :label="cols.label"
                      >
                        <b-form-checkbox
                          class="mb-2 tus-check-btn d-inline-block"
                          v-model="variable[indexx]['value']"
                          @change="inputChange(variable, cols, $event)"
                          name="check-button"
                        >
                          {{
                            cols.data
                              ? cols.chooses.bool_true
                              : cols.chooses.bool_false
                          }}
                        </b-form-checkbox>
                      </b-form-group>
                      <b-form-group
                        v-if="cols.type === 'options'"
                        :label="cols.label"
                        :label-for="cols.id + '_' + indexx"
                      >
                        <b-form-select
                          :id="cols.id + '_' + indexx"
                          :options="cols.options"
                          v-model="variable[indexx]['value']"
                          @change="inputChange(variable, cols, $event)"
                          class="custom-input"
                          :required="cols.required"
                        ></b-form-select>
                      </b-form-group>
                    </div>
                  </b-col>
                </b-form-row>
              </div>
            </div>
          </div>
          <b-button class="w-100 mt-3" @click="addDataList(information)"
            >+ Add{{ information.menu_name }}</b-button
          >
        </div>
        <div v-else>
          <b-form-row>
            <b-col
              v-for="(cols, index) in information.loaded_items"
              :key="index"
              cols="12"
            >
              <div class="mt-2" v-if="cols.is_active === '1'">
                <b-form-group
                  v-if="cols.type === 'text' || cols.type === 'number'"
                  :label="cols.label"
                  :label-for="cols.id + '_' + index"
                >
                  <b-form-input
                    :id="cols.id + '_' + index"
                    class="custom-input"
                    v-model="infoData[index]['value']"
                    @input="inputChange(infoData, cols, $event)"
                    :required="cols.required"
                    :type="cols.type"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  v-if="cols.type === 'textarea'"
                  :label="cols.label"
                  :label-for="cols.id + '_' + index"
                >
                  <b-form-textarea
                    :id="cols.id + '_' + index"
                    :required="cols.required"
                    v-model="infoData[index]['value']"
                    @input="inputChange(infoData, cols, $event)"
                    rows="2"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                  v-if="cols.type === 'boolean'"
                  :label="cols.label"
                >
                  <b-form-checkbox
                    class="mb-2 tus-check-btn d-inline-block"
                    v-model="infoData[index]['value']"
                    @change="inputChange(infoData, cols, $event)"
                    name="check-button"
                  >
                    {{
                      cols.data
                        ? cols.chooses.bool_true
                        : cols.chooses.bool_false
                    }}
                  </b-form-checkbox>
                </b-form-group>
                <b-form-group
                  v-if="cols.type === 'options'"
                  :label="cols.label"
                  :label-for="cols.id + '_' + index"
                >
                  <b-form-select
                    :id="cols.id + '_' + index"
                    :options="cols.options"
                    v-model="infoData[index]['value']"
                    class="custom-input"
                    @change="inputChange(infoData, cols, $event)"
                    :required="cols.required"
                  ></b-form-select>
                </b-form-group>
              </div>
            </b-col>
          </b-form-row>
        </div>
      </b-form>
    </b-col>
  </div>
</template>
<script>
export default {
  name: 'AdditionalInfoEdit',
  components: {},
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      information: { is_multi_data: false },
      infoData: [],
    };
  },
  watch: {
    information: {
      handler: function (data) {
        this.$emit('emit_json', data);
      },
      deep: true,
    },
    infoData() {
      this.information.data = this.infoData;
    },
    data: {
      handler: function () {
        this.putInformationData();
      },
      deep: true,
    },
  },
  mounted() {
    this.putInformationData();
  },
  methods: {
    putInformationData() {
      this.information = { ...this.data };
      if (!this.data.info_data_id) {
        let json = {};
        const list = [];
        if (this.information.is_multi_data) {
          this.infoData = [];
        } else {
          const list = [];
          for (const i in this.information.loaded_items) {
            if (this.information.loaded_items[i].is_active === '1') {
              const json_data = {
                label: this.information.loaded_items[i].label,
                id: this.information.loaded_items[i].id,
                value: '',
              };
              list.push(json_data);
            }
          }
          this.infoData = list;
        }
        console.log('information', this.information);
      }
    },
    inputChange(item, col, event) {
      for (const i in item) {
        if (item[i].id === col.id) {
          item[i].value = event;
        }
      }
    },
    removeVariable(index, item) {
      item.splice(index, 1);
    },
    addDataList(item) {
      console.log('aaa', item);
      const list = [];
      for (const i in item.loaded_items) {
        if (item.loaded_items[i].is_active === '1') {
          const json = {
            label: item.loaded_items[i].label,
            id: item.loaded_items[i].id,
            value: '',
          };
          list.push(json);
        }
      }
      item.data.push(list);
    },
    activate(data) {
      if (!data.isDisabled) {
        for (const value in this.information) {
          if (this.information[value].menu_id === data.menu_id) {
            data.isActive = true;
            document.getElementById(data.menu_id).setAttribute('checked', '');
          } else {
            this.information[value].isActive = false;
            document
              .getElementById(this.information[value].menu_id)
              .removeAttribute('checked');
          }
        }
      }
    },
    changed() {
      this.isChanged = !this.isChanged;
    },
  },
};
</script>
<style scoped>
.card {
  height: 160px;
}
#astronaut {
  position: absolute;
  right: 20px;
  top: -17px;
}
.text-input {
  height: 40px !important;
}
.tabBtn {
  border: 0;
  background-color: #f2f3f5;
  color: #263a5a;
  border-radius: 0;
}
</style>
