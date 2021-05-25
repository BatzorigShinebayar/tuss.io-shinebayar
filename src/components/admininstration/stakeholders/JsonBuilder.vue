<template>
  <div>
    <div class="card" id="setting-menu">
      <div v-if="settingMenu" class="card-body">
        <div class="media">
          <div class="media-body">
            <b-col
              v-for="(element, index) in dragItems"
              :key="index"
              class="my-2"
              cols="12"
            >
              <div :id="'drag_' + index" @click="chooseItem(element, index)">
                <b-button> {{ element.label }}</b-button>
              </div>
            </b-col>
          </div>
        </div>
      </div>
    </div>
    <b-tabs content-class="mt-3">
      <b-tab
        v-for="(menu, index) in formFoundation"
        :key="index"
        :title="menu.menu_name"
        @dblclick="alert('aaa')"
        :active="index === 0"
      >
        <div class="py-3">
          <b-col cols="12">
            <i
              id="setting-button"
              class="bx bx-cog bx-sm"
              @click="buildForm(index)"
            ></i>
            <div class="h-100 w-100">
              <div class="overflow-auto h-100 mr-5 mt-2">
                <b-col cols="12">
                  <b-row class="d-flex mt-4 pt-2">
                    <div class="form-foundation-setting">
                      <b-col class="d-flex justify-content-between" cols="12">
                        <i id="formSetting" class="bx bxs-cog bx-sm"></i>
                        <div
                          class="
                            align-self-center
                            w-100
                            d-flex
                            justify-content-between
                          "
                        >
                          <span
                            v-for="width in 10"
                            :key="width"
                            @click="panelWidth(width + 2)"
                          >
                            <i class="bx bxs-layout bx-xs ml-1"></i> md-{{
                              width + 2
                            }}
                          </span>
                        </div>
                      </b-col>
                    </div>
                    <b-col :cols="12">
                      <div
                        class="form-foundation text-muted create"
                        @click="createFoundation(index, formPanelWidth)"
                      >
                        -- Prepare for 'md-{{ formPanelWidth }}' --
                      </div>
                    </b-col>
                    <b-col class="overflow-auto" cols="12">
                      <b-form-row id="form-container">
                        <b-col
                          v-for="(cols, indx) in menu.menu_items"
                          :key="indx"
                          :cols="cols.col_len"
                        >
                          <div
                            class="form-foundation text-muted mt-2"
                            :class="{ active: activePanel === indx }"
                            @click="buildForm(index, indx)"
                            :id="'drop-div_' + index + '_' + indx"
                          >
                            <div class="w-100 d-flex" v-if="cols.type">
                              <b-form-input
                                v-if="
                                  cols.type === 'text' || cols.type === 'number'
                                "
                                :id="cols.label + '_' + indx"
                                class="custom-input"
                                :type="cols.type"
                              ></b-form-input>
                              <b-form-textarea
                                v-if="cols.type === 'textarea'"
                                :id="cols.label + '_' + indx"
                                rows="2"
                              ></b-form-textarea>
                              <b-form-checkbox
                                v-if="cols.type === 'boolean'"
                                class="mb-2 tus-check-btn mr-auto"
                                disabled
                                name="check-button"
                              >
                                {{
                                  cols.data
                                    ? cols.chooses.bool_true
                                    : cols.chooses.bool_false
                                }}
                              </b-form-checkbox>
                              <b-form-select
                                v-if="cols.type === 'options'"
                                :id="cols.label + '_' + indx"
                                :options="cols.options"
                                class="custom-input"
                              ></b-form-select>
                              <i
                                class="bx bx-trash color-red"
                                style="
                                  position: absolute;
                                  top: 15px;
                                  right: 12px;
                                "
                                @click="deleteForm(index, indx)"
                              ></i>
                            </div>
                            <div v-else class="align-items-center">
                              -- Add Json Input --
                              <i
                                class="bx bx-trash color-red"
                                style="
                                  position: absolute;
                                  top: 15px;
                                  right: 12px;
                                "
                                @click="deleteForm(index, indx)"
                              ></i>
                            </div></div
                        ></b-col>
                      </b-form-row>
                    </b-col>
                  </b-row>
                </b-col>
              </div>
            </div>
          </b-col>
        </div>
        <b-button
          :id="'delete-' + index"
          variant="danger"
          class="delete-button"
        >
          Delete tab
        </b-button>
        <b-popover
          :target="'delete-' + index"
          triggers="focus"
          placement="left"
        >
          <div class="d-flex flex-column">
            <p class="btn">Are you sure?</p>
            <b-button variant="dark" class="mx-auto" @click="deleteTab(index)">
              yes
            </b-button>
          </div>
        </b-popover>
      </b-tab>
      <template #tabs-end>
        <b-nav-item role="presentation" href="#" :id="'edit'"
          ><b>+</b></b-nav-item
        >
        <b-popover :target="'edit'" triggers="hover" placement="right">
          <div class="d-flex flex-column">
            <b-form-group label="Name of tab menu" :label-for="tab_menu_name">
              <b-col cols="12">
                <b-form-input
                  id="tab_menu_name"
                  v-model="tab_menu_name"
                  class="custom-input"
                  type="text"
                ></b-form-input>
                <b-button
                  variant="dark"
                  class="mt-3 mb-2 w-100"
                  @click="newTab"
                >
                  Add Tab
                </b-button>
              </b-col>
            </b-form-group>
          </div>
        </b-popover>
      </template>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'FormViewer',
  components: {},

  props: {
    formTemplate: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formPanelWidth: 12,
      formFoundation: [],
      settingMenu: false,
      dragItems: [
        { label: 'input text', type: 'text' },
        { label: 'input number', type: 'number' },
        { label: 'input textarea', type: 'textarea' },
        {
          label: 'input checkbox',
          type: 'boolean',
          chooses: { bool_true: true, bool_false: false },
        },
        {
          label: 'input dropDown',
          type: 'options',
          options: [
            { value: null, text: '- test chooses -' },
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
          ],
        },
      ],
      dropItems: [],
      focusedDiv: null,
      activePanel: null,
      activeTab: null,
      tab_menu_name: null,
    };
  },
  watch: {
    formFoundation: {
      handler: function (data) {
        this.$emit('emit_data', data);
      },
      deep: true,
    },
  },

  mounted() {
    this.formFoundation = this.formTemplate;
  },
  methods: {
    chooseItem(data) {
      const index = this.activeTab;
      const indx = this.activePanel;
      let json_data = { ...this.formFoundation[index].menu_items[indx] };
      json_data = { ...json_data, ...data };
      this.formFoundation[index].menu_items[indx] = json_data;
      this.formFoundation[index].menu_items.push({});
      this.formFoundation[index].menu_items.pop();
    },
    buildForm(index, indx) {
      const formMenuCSS = document.getElementById('setting-menu').style;
      if (typeof indx === 'number') {
        this.settingMenu = true;
        this.focusedDiv = 'drop-div_' + index + '_' + indx;
        this.activeTab = index;
        this.activePanel = indx;
        formMenuCSS.width = '25%';
      } else {
        this.settingMenu = !this.settingMenu;
        formMenuCSS.width = formMenuCSS.width === '' ? '25%' : '';
      }
    },
    panelWidth(data) {
      this.formPanelWidth = data;
    },
    createFoundation(indx, data) {
      this.formFoundation[indx].menu_items.push({
        col_len: data,
        required: false,
      });
    },
    deleteForm(index, indx) {
      this.activePanel = 0;
      this.formFoundation[index].menu_items.splice(indx, 1);
    },
    newTab() {
      this.formFoundation.push({
        menu_name: this.tab_menu_name,
        menu_items: [],
      });
    },
    deleteTab(intex) {
      this.formFoundation.splice(intex, 1);
    },
  },
};
</script>
<style scoped>
#setting-menu {
  z-index: 1;
  float: right;
  top: 0;
  right: 0;
  background-color: white;
  width: 0;
  height: 97%;
  margin: 7px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: width 1s;
}
#setting-button {
  position: absolute;
  top: -60px;
  right: 16px;
  z-index: 9999;
  cursor: pointer;
  float: right;
}
.delete-button {
  position: absolute;
  bottom: 18px;
  right: 16px;
  z-index: 9999;
  cursor: pointer;
  float: right;
}
.form-foundation {
  background-color: transparent;
  border: 2px dashed green;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}
.form-foundation.create {
  border: 2px dashed orange;
}
.form-foundation:hover {
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.08);
}
.form-foundation.active {
  border: 2px solid orange;
}
.form-foundation-setting {
  position: absolute;
  z-index: 99;
  float: left;
  cursor: pointer;
  top: -21px;
}
</style>
