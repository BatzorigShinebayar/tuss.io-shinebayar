<template>
  <div>
    <b-sidebar
      id="StakeholderEditJson"
      title="Stakeholders"
      right
      shadow
      backdrop
      lazy
      class="sidebar-lg"
    >
      <b-col class="my-3 d-flex" cols="12">
        <b-col cols="10">
          <b-form-group
            label="Information group name"
            label-for="info-group-name"
          >
            <b-form-input
              id="info-group-name"
              v-model="menu.menu_name"
              class="custom-input"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="align-self-center ml-4" cols="1">
          <b-button>
            <i class="bx bx-cog bx-sm" @click="editMenu(menu.menu_id)"></i>
          </b-button>
        </b-col>
      </b-col>
      <b-col v-if="menu.menu_items.length > 0" class="my-3" cols="12">
        <div v-for="(variable, index) in menu.menu_items" :key="index">
          <div
            class="salary-variable-item"
            :style="variable.is_active === '1' ? '' : 'border: 2px solid red'"
          >
            <div class="flex-shrink-1">
              <h4
                :class="
                  variable.is_active === '1' ? 'text-primary' : 'text-danger'
                "
              >
                {{ index + 1 }}
              </h4>
            </div>
            <div class="flex-grow-1">
              <div class="salary-variable-remove">
                <Fa
                  v-if="variable.is_active === '0'"
                  class="text-success cursor-pointer"
                  :icon="['fas', 'plus']"
                  @click="activateVariable(variable.id)"
                />
                <Fa
                  v-else
                  class="text-danger cursor-pointer"
                  :icon="['fas', 'trash']"
                  @click="removeVariable(variable.id)"
                />
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <b-form-group label="Field Name">
                    <b-form-input
                      type="text"
                      class="custom-input"
                      placeholder="Please type field name"
                      v-model="variable.label"
                      :name="`variables[${index}][label]`"
                      :state="!!variable.label"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-lg-8">
                  <b-form-group label="Field Type">
                    <b-form-select
                      v-model="variable.type"
                      class="custom-input"
                      :options="types"
                      :name="`variables[${index}][type]`"
                      :state="!!variable.type"
                    ></b-form-select>
                  </b-form-group>
                </div>
                <div class="col-lg-3">
                  <b-form-group label="Required Field?">
                    <b-form-checkbox
                      class="mt-2 tus-check-btn d-inline-block"
                      v-model="variable.required"
                      name="check-button"
                    >
                      {{ variable.required ? 'Yes' : 'No' }}
                    </b-form-checkbox>
                  </b-form-group>
                </div>
                <div class="col-lg-1 d-flex pl-0">
                  <b-button class="my-auto">
                    <i class="bx bx-cog bx-sm" @click="editField(index)"></i>
                  </b-button>
                </div>
              </div>
              <h6><strong>Preview</strong></h6>
              <b-form-group class="mt-3" :label="variable.label">
                <b-form-input
                  v-if="variable.type === 'text' || variable.type === 'number'"
                  class="custom-input"
                  :placeholder="variable.place_holder"
                  :required="variable.required"
                  :type="variable.type"
                ></b-form-input>
                <b-form-textarea
                  v-if="variable.type === 'textarea'"
                  :placeholder="variable.place_holder"
                  :required="variable.required"
                  rows="2"
                ></b-form-textarea>
                <b-form-checkbox
                  v-if="variable.type === 'boolean'"
                  class="mt-2 tus-check-btn d-inline-block"
                  :required="variable.required"
                  name="check-button"
                >
                  sss
                </b-form-checkbox>
                <b-form-select
                  v-if="variable.type === 'options'"
                  :options="dummyOption"
                  class="custom-input"
                  :required="variable.required"
                ></b-form-select>
              </b-form-group>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <b-col class="btn btn-secondary px-5 mt-2" @click="addField" cols="12">
          + Add field</b-col
        >
      </b-col>
      <template #footer="{ hide }">
        <div cols="12" class="my-3 d-flex">
          <b-col cols="10">
            <b-button
              v-if="type === 'create'"
              variant="deep-blue"
              @click="create"
              block
            >
              Create
            </b-button>
            <b-button v-else variant="deep-blue" @click="update" block>
              Update
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button @click="hide" variant="outline-dark" block>
              Close
            </b-button>
          </b-col>
        </div>
      </template>
    </b-sidebar>
    <b-modal
      id="edit-json-field-setting"
      v-if="menu.menu_items.length > 0"
      :title="
        modalType === 'field'
          ? menu.menu_items[modal_index].type + ' field properties'
          : 'Information group property'
      "
    >
      <div v-if="modalType === 'field'">
        <b-col class="my-1" cols="12">
          <b-form-group label="Placeholder text">
            <b-form-input
              v-model="menu.menu_items[modal_index].place_holder"
              class="custom-input"
              placeholder="Type placeholder for field"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="
            menu.menu_items[modal_index].type === 'number' ||
            menu.menu_items[modal_index].type === 'text' ||
            menu.menu_items[modal_index].type === 'textarea'
          "
          class="my-1"
          cols="12"
        >
          <b-form-group label="Has character Max limit?">
            <b-form-checkbox
              class="mt-2 tus-check-btn d-inline-block"
              v-model="menu.menu_items[modal_index].has_char_max_limit"
              name="check-button"
            >
              {{
                menu.menu_items[modal_index].has_char_max_limit ? 'Yes' : 'No'
              }}
            </b-form-checkbox>
          </b-form-group>
          <b-form-group
            v-if="menu.menu_items[modal_index].has_char_max_limit"
            label="Max limit"
          >
            incoming
          </b-form-group>
        </b-col>
        <b-col
          v-if="menu.menu_items[modal_index].type === 'number'"
          class="my-1"
          cols="12"
        >
          <b-form-group label="Has character min limit?">
            <b-form-checkbox
              class="mt-2 tus-check-btn d-inline-block"
              v-model="menu.menu_items[modal_index].has_char_min_limit"
              name="check-button"
            >
              {{
                menu.menu_items[modal_index].has_char_min_limit ? 'Yes' : 'No'
              }}
            </b-form-checkbox>
          </b-form-group>
          <b-form-group
            v-if="menu.menu_items[modal_index].has_char_min_limit"
            label="Min limit"
          >
            incoming
          </b-form-group>
        </b-col>
        <b-col
          v-if="menu.menu_items[modal_index].type === 'options'"
          class="my-1"
          cols="12"
        >
          <b-form-group label="Connect to remote data soruce?">
            <b-form-checkbox
              class="mt-2 tus-check-btn d-inline-block"
              v-model="menu.menu_items[modal_index].option_remote_data"
              name="check-button"
            >
              {{
                menu.menu_items[modal_index].option_remote_data ? 'Yes' : 'No'
              }}
            </b-form-checkbox>
          </b-form-group>
          <div v-if="menu.menu_items[modal_index].option_remote_data">
            <div class="card">
              <b-form-row class="card-body">
                <b-col cols="12">
                  <b-form-group label="Remote date source URL">
                    <b-form-input
                      v-model="menu.menu_items[modal_index].remote_data_url"
                      class="custom-input"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="Label field">
                    <b-form-input
                      v-model="menu.menu_items[modal_index].remote_data_label"
                      class="custom-input"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="Value field">
                    <b-form-input
                      v-model="menu.menu_items[modal_index].remote_data_value"
                      class="custom-input"
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </div>
          </div>
          <div v-else>
            <div class="card">
              <div class="card-body d-flex">
                <b-col cols="6">
                  <p>Label:</p>
                  <b-form-input
                    v-for="(option, index) in menu.menu_items[modal_index]
                      .options"
                    :key="index"
                    class="custom-input"
                    v-model="option.label"
                    type="text"
                  ></b-form-input>
                </b-col>
                <b-col cols="6"
                  ><p>Values:</p>
                  <div
                    v-for="(option, index) in menu.menu_items[modal_index]
                      .options"
                    :key="index"
                  >
                    <b-form-input
                      class="custom-input"
                      v-model="option.value"
                      type="text"
                    ></b-form-input>

                    <Fa
                      :icon="['fas', 'trash']"
                      @click="removeVariable(index)"
                    />
                  </div>
                </b-col>
              </div>
            </div>
          </div>
          <div
            v-if="!menu.menu_items[modal_index].option_remote_data"
            class="flex-space-between mt-3"
          >
            <b-col
              class="btn btn-secondary mx-3"
              @click="
                menu.menu_items[modal_index].options.push({
                  label: '',
                  value: '',
                })
              "
              cols="6"
              >+ Add select choice</b-col
            >
            <b-col
              class="btn btn-secondary mx-3"
              @click="menu.menu_items[modal_index].options = []"
              cols="4"
              >Clear all</b-col
            >
          </div>
          <b-form-group class="mt-3" label="Multiple select is allowed?">
            <b-form-checkbox
              class="mt-2 tus-check-btn d-inline-block"
              v-model="menu.menu_items[modal_index].multi_option"
              name="check-button"
            >
              {{ menu.menu_items[modal_index].multi_option ? 'Yes' : 'No' }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </div>
      <div v-else-if="modalType === 'menu'">
        <b-form-group label="Will this info group use repeater?">
          <b-form-checkbox
            class="mt-2 tus-check-btn d-inline-block"
            v-model="menu.use_repeater"
            name="check-button"
          >
            {{ menu.use_repeater ? 'Yes' : 'No' }}
          </b-form-checkbox>
        </b-form-group>
      </div>
      <template #modal-footer="{ close }">
        <div class="w-100">
          <b-button variant="dark" class="ml-2 float-right" @click="close">
            Confirm
          </b-button>
          <b-button class="float-right" @click="close"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'StakeholderEditJson',

  components: {},

  props: {
    data: {
      type: [Object, Array],
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default() {
        return '';
      },
    },
    bool: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      json_data: [],
      menu: {
        menu_name: null,
        menu_items: [],
        menu_id: null,
        use_repeater: false,
      },
      org_partner_rel: null,
      types: ['text', 'number', 'textarea', 'options', 'boolean'],
      dummyOption: ['choose-1', 'choose-2'],
      modal_index: 0,
      modalType: 'field',
    };
  },
  watch: {
    bool(data) {
      this.mountingData();
    },
  },
  mounted() {
    this.mountingData();
  },
  methods: {
    mountingData() {
      if (this.id) {
        console.log('this.data', this.data);
        const param = `?is_active=1&partner_type=${this.id}&organization=${this.$store.getters.activeCompany}`;
        this.getOrgPartnerType(param);
        if (this.type === 'edit') {
          this.menu = this.data;
        } else {
          this.menu = {
            menu_name: null,
            menu_items: [],
            menu_id: null,
            use_repeater: false,
          };
        }
      }
    },
    addField() {
      const id = Math.floor(Math.random() * 1000);
      for (const i in this.menu.menu_items) {
        if (this.menu.menu_items[i].id === 'field-' + id) {
          this.addField();
        }
      }
      this.menu.menu_items.push({ is_active: '1', id: 'field-' + id });
    },
    editField(index) {
      this.modalType = 'field';
      this.modal_index = index;
      this.$root.$emit('bv::toggle::modal', 'edit-json-field-setting');
    },
    editMenu(index) {
      this.modalType = 'menu';
      this.modal_index = index;
      this.$root.$emit('bv::toggle::modal', 'edit-json-field-setting');
    },
    activateVariable(id) {
      for (const i in this.menu.menu_items) {
        if (this.menu.menu_items[i].id === id) {
          this.menu.menu_items[i].is_active = '1';
        }
      }
    },
    removeVariable(id) {
      for (const i in this.menu.menu_items) {
        if (this.menu.menu_items[i].id === id) {
          if (this.type === 'create') {
            this.menu.menu_items.splice(i, 1);
          } else {
            this.menu.menu_items[i].is_active = '0';
          }
        }
      }
    },
    emitData(data) {
      this.json_data = data;
    },
    async getOrgPartnerType(params) {
      const response = await this.$store.dispatch('getOrgPartnerType', params);
      if (response.status === 200) {
        if (response.data.results[0].loaded_json_data !== '') {
          this.json_data = response.data.results[0].loaded_json_data;
        } else {
          this.json_data = [];
        }
        this.org_partner_rel = response.data.results[0];
      }
    },
    async createPartnerTypeInfoBase(params) {
      const response = await this.$store.dispatch(
        'createPartnerTypeInfoBase',
        params
      );
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'StakeholderEditJson');
      }
    },
    async updatePartnerTypeInfoBase(params) {
      const response = await this.$store.dispatch(
        'updatePartnerTypeInfoBase',
        params
      );
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'StakeholderEditJson');
      }
    },
    generateMenuId() {
      const menu_id = Math.floor(Math.random() * 1000);
      for (const i in this.data) {
        if (this.data[i].menu_id === 'menu-' + menu_id) {
          this.generateMenuId();
        }
      }
      this.menu.menu_id = 'menu-' + menu_id;
    },
    create() {
      const params = {
        name: this.menu.menu_name,
        org_partner_type_id: this.org_partner_rel.id,
        is_active: '1',
        info_base_items: this.menu.menu_items,
        is_multi_data: this.menu.use_repeater,
        created_user: this.$store.getters.user.id,
        created_date: new Date(),
      };
      this.createPartnerTypeInfoBase(params);
    },
    update() {
      const id = this.menu.menu_id;
      const params = {
        urlParam: id + '/',
        urlData: {
          id: id,
          info_base_items: this.menu.menu_items,
          is_multi_data: this.menu.use_repeater,
          updated_user: this.$store.getters.user.id,
          updated_date: new Date(),
        },
      };
      this.updatePartnerTypeInfoBase(params);
    },
  },
};
</script>
<style scoped></style>
