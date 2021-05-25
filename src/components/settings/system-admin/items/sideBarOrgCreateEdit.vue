<template>
  <b-sidebar
    id="sideBarOrgCreateEdit"
    ref="sideBarOrgCreateEdit"
    :title="type + ' Organization'"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div style="margin-bottom: 100px">
      <div class="w-100 flex-space-between align-items-center">
        <label
          v-for="item in buttons"
          :key="item.id"
          class="btn w-100 tabBtn d-flex align-items-center py-2"
          style="height: 59px"
          :class="{
            'text-primary': item.isActive,
            'bg-primary': item.isComplete,
          }"
        >
          <input
            :id="item.id"
            type="radio"
            style="display: none"
            @click="activate(item)"
          />

          <p
            class="m-auto"
            :class="{
              'text-warning': item.isComplete,
            }"
          >
            <Fa class="mr-2" size="lg" :icon="[item.iconType, item.icon]" />{{
              item.name
            }}
          </p>
        </label>
      </div>
      <b-col v-for="item in buttons" :key="item.id" cols="12">
        <b-form v-if="item.id === 'org' && item.isActive" class="d-block mt-3">
          <b-form-row>
            <b-col cols="12">
              <b-form-group label="Organization Logo" label-for="companyLogo">
                <b-form-file
                  id="companyLogo"
                  v-model="organizationLogo"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  @change="handleImageOrganization"
                  accept="image/jpeg, image/png"
                ></b-form-file>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Organization Name" label-for="org_name">
                <b-form-input
                  id="org_name"
                  v-model="org_name"
                  type="text"
                ></b-form-input>
                <span
                  v-if="!$v.org_name.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Name is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Organization Short Name"
                label-for="org_short_name"
              >
                <b-form-input
                  id="org_short_name"
                  v-model="org_short_name"
                  type="text"
                ></b-form-input>
                <span
                  v-if="!$v.org_short_name.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Short Name is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Organization Register Number"
                label-for="org_registerNum"
              >
                <b-form-input
                  id="org_registerNum"
                  v-model="org_registerNum"
                  type="text"
                ></b-form-input>
                <span
                  v-if="!$v.org_registerNum.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Register Number is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Organization type" label-for="org_type">
                <Treeselect
                  id="org_type"
                  v-model="org_type"
                  placeholder="- Choose -"
                  :options="org_types"
                  @change="validation('org')"
                ></Treeselect>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Organization Mission"
                label-for="org_mission"
              >
                <b-form-textarea
                  id="org_mission"
                  v-model="org_mission"
                  row="3"
                ></b-form-textarea>
                <span
                  v-if="!$v.org_mission.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Mission is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Organization Vision" label-for="org_vision">
                <b-form-textarea
                  id="org_vision"
                  v-model="org_vision"
                  row="3"
                ></b-form-textarea>
                <span
                  v-if="!$v.org_vision.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Vision is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Organization Values" label-for="org_values">
                <b-form-textarea
                  id="org_values"
                  v-model="org_values"
                  row="3"
                ></b-form-textarea>
                <span
                  v-if="!$v.org_values.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  Organization Values is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Max SAGU" label-for="sagu">
                <b-form-input
                  id="sagu"
                  v-model="max_sagu"
                  max="100"
                  min="0"
                  type="number"
                ></b-form-input>
                <span
                  v-if="!$v.max_sagu.minValue && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  SAGU must greater than 0
                </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row v-if="type === 'Create'">
            <b-col cols="6">
              <b-form-group label="CEO Firstname" label-for="ceo_firstname">
                <b-form-input
                  id="ceo_firstname"
                  v-model="ceo_firstname"
                  type="text"
                ></b-form-input>
                <span
                  v-if="!$v.ceo_firstname.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  CEO Firstname is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="CEO Lastname" label-for="ceo_lastname">
                <b-form-input
                  id="ceo_lastname"
                  v-model="ceo_lastname"
                  type="text"
                ></b-form-input>
                <span
                  v-if="!$v.ceo_lastname.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  CEO Lastname is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="CEO Email" label-for="ceo_email">
                <b-form-input
                  id="ceo_email"
                  v-model="ceo_email"
                  type="email"
                ></b-form-input>
                <span
                  v-if="!$v.ceo_email.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  CEO Email is required
                </span>
                <span
                  v-if="!$v.ceo_email.email && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  CEO Email must be email
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="CEO Phone" label-for="ceo_phone">
                <b-form-input
                  id="ceo_phone"
                  v-model="ceo_phone"
                  type="number"
                ></b-form-input>
                <span
                  v-if="!$v.ceo_phone.required && orgFormSubmit"
                  class="mt-2 text-danger"
                >
                  CEO Phone is required
                </span>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="TUS Analyst" label-for="tus_analyst">
                <Treeselect
                  id="tus_analyst"
                  v-model="tus_analyst"
                  placeholder="- Choose -"
                  :options="tus_analyst_list"
                  @change="validation('org')"
                ></Treeselect>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form>
        <b-form v-if="item.id === 'conf' && item.isActive" class="d-block mt-3">
          <b-form-row>
            <b-col cols="12" class="lined-card px-0 mt-3">
              <div class="card-body under-border">
                <div class="media">
                  <div class="media-body">
                    <p>Notice!</p>
                    <p>
                      You are about to create a new organization.Please confirm
                      the procedure by clicking the
                      <strong>“{{ type }}”</strong> button
                    </p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-form-row>
        </b-form>
      </b-col>
    </div>
    <b-col cols="12" class="d-flex bg-secondary py-3 footer">
      <b-col class="cancelBtn btn mr-2" cols="2">
        <p @click="hide">Cancel</p>
      </b-col>
      <b-col class="btn sendBtn" cols="10">
        <div v-if="notComplete">
          <p @click="next">Next</p>
        </div>
        <div v-else>
          <p v-if="type === 'Create'" @click="create">{{ type }}</p>
          <p v-else-if="type === 'Edit'" @click="update">Update</p>
        </div>
      </b-col>
    </b-col>
  </b-sidebar>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import { email, minValue, required } from 'vuelidate/lib/validators';
export default {
  name: 'sideBarGroupCreateEdit',

  components: { Treeselect },

  props: {
    type: {
      type: String,
      default() {
        return '';
      },
    },
    data: {
      type: Object,
      default: null,
    },
    groupId: {
      type: [String, Number],
      default: null,
    },
    bool: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      information: { ...this.data },
      buttons: [
        {
          name: 'Organization',
          id: 'org',
          iconType: 'fas',
          icon: 'user-astronaut',
          isActive: true,
          isValid: false,
          isComplete: false,
          isDisabled: false,
        },
        {
          name: 'Confirmation',
          id: 'conf',
          iconType: 'fas',
          icon: 'flushed',
          isActive: false,
          isValid: true,
          isComplete: false,
          isDisabled: true,
        },
      ],
      notComplete: true,
      organizationLogo: null,
      org_logo_type: null,
      org_base64image: null,
      org_name: null,
      org_registerNum: null,
      org_short_name: null,
      org_types: [],
      org_type: 0,
      max_sagu: 0,
      org_mission: null,
      org_vision: null,
      org_values: null,
      ceo_firstname: null,
      ceo_lastname: null,
      ceo_phone: null,
      ceo_email: null,
      tus_analyst: this.$store.getters.user.partner_id,
      tus_analyst_list: [],
      orgFormSubmit: false,
    };
  },

  validations: {
    org_name: { required },
    org_short_name: { required },
    max_sagu: { minValue: minValue(1) },
    org_registerNum: { required },
    org_mission: { required },
    org_vision: { required },
    org_values: { required },
    ceo_firstname: { required },
    ceo_lastname: { required },
    ceo_phone: { required },
    ceo_email: { required, email },
  },
  watch: {
    bool() {
      this.setData();
    },
  },
  mounted() {
    const params = `?is_active=1&organization=1&page_size=10000`;
    this.getPartners(params);
    const param = `?is_active=1&page_size=10000`;
    this.getOrganizationTypes(param);
  },

  methods: {
    setData() {
      const data = this.data;
      if (this.type === 'Edit') {
        this.org_name = data.name;
        this.org_short_name = data.short_name;
        this.org_mission = data.mission;
        this.org_vision = data.vision;
        this.org_values = data.values;
        this.org_registerNum = data.register_number;
        this.max_sagu = data.sagu_max;
        this.tus_analyst = data.tus_analyst;
        this.org_type = data.company_type;
      } else {
        this.org_name = null;
        this.org_short_name = null;
        this.org_mission = null;
        this.org_vision = null;
        this.org_registerNum = null;
        this.org_values = null;
        this.max_sagu = null;
        this.tus_analyst = null;
        this.ceo_firstname = null;
        this.ceo_lastname = null;
        this.ceo_phone = null;
        this.ceo_email = null;
      }
    },
    async getOrganizationTypes(params) {
      const response = await this.$store.dispatch(
        'getOrganizationTypes',
        params
      );
      if (response.status === 200) {
        const responseData = response.data.results;
        const targetData = [];
        for (const i in responseData) {
          const jsonData = {};
          jsonData.id = responseData[i].id;
          jsonData.label = responseData[i].name;
          targetData.push(jsonData);
          if (i === '0') {
            this.org_type = jsonData.id;
          }
        }
        this.org_types = targetData;
      }
    },
    async getPartners(params) {
      const response = await this.$store.dispatch('getPartners', params);
      if (response.status === 200) {
        const responseData = response.data.results;
        const targetData = [];
        for (const i in responseData) {
          const jsonData = {};
          jsonData.id = responseData[i].id;
          jsonData.label =
            responseData[i].name + ' ' + responseData[i].last_name;
          targetData.push(jsonData);
        }
        this.tus_analyst_list = targetData;
      }
    },
    async updateOrganization(params) {
      const response = await this.$store.dispatch('updateOrganization', params);
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarOrgCreateEdit');
      }
    },
    async createUpdateOrganization(params) {
      const response = await this.$store.dispatch(
        'createUpdateOrganization',
        params
      );
      if (response.status === 200 && response.data.result) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarOrgCreateEdit');
      }
    },
    checkComplete() {
      let check = true;
      for (const i in this.buttons) {
        if (!this.buttons[i].isValid) {
          check = false;
        }
      }
      if (check) {
        this.notComplete = false;
      } else {
        this.notComplete = true;
      }
    },
    handleImageOrganization(data) {
      const logo = data.target.files[0].name.split('.');
      this.org_logo_type = logo[1];
      const selectedImg = data.target.files[0];
      this.createBase64Image(selectedImg, 'org');
      this.validation('org');
    },

    createBase64Image(fileObject, target) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = () => {
        this.org_base64image = reader.result;
      };
    },
    validation() {
      if (this.type === 'Edit') {
        this.ceo_firstname = 'a';
        this.ceo_lastname = 'a';
        this.ceo_phone = 1;
        this.ceo_email = 'a@a.com';
      }
      for (const i in this.buttons) {
        if (this.buttons[i].id === 'org') {
          this.orgFormSubmit = true;
          this.$v.$touch();
          console.log(this.$v);
          if (!this.$v.$invalid) {
            this.buttons[i].isValid = true;
          }
        }
      }
    },
    changed() {
      this.isChanged = !this.isChanged;
    },
    activate(data) {
      if (!data.isDisabled) {
        for (const value in this.buttons) {
          if (this.buttons[value].id === data.id) {
            data.isActive = true;
            document.getElementById(data.id).setAttribute('checked', '');
          } else {
            this.buttons[value].isActive = false;
            document
              .getElementById(this.buttons[value].id)
              .removeAttribute('checked');
          }
        }
      }
    },
    update() {
      const params = {
        urlParams: this.data.id + '/',
        urlData: {
          id: this.data.id,
          group_id: parseInt(this.groupId),
          name: this.org_name,
          short_name: this.org_short_name,
          company_type_id: this.org_type,
          mission: this.org_mission,
          vision: this.org_vision,
          values: this.org_values,
          register_number: this.org_registerNum,
          sagu_max: this.max_sagu,
          tus_analyst_id: this.tus_analyst,
        },
      };
      console.log(params);
      this.updateOrganization(params);
    },
    create() {
      const params = {
        group: this.groupId,
        name: this.org_name,
        short_name: this.org_short_name,
        organization_type: this.org_type,
        parent_company: null,
        mission: this.org_mission,
        vision: this.org_vision,
        values: this.org_values,
        max_sagu: this.max_sagu,
        ceo_first_name: this.ceo_firstname,
        ceo_last_name: this.ceo_lastname,
        ceo_email: this.ceo_email,
        ceo_phone: this.ceo_phone,
        tus_analyst: this.tus_analyst,
        logo: this.org_base64image,
        logo_type: this.org_logo_type,
        register_number: this.org_registerNum,
      };
      console.log(params);
      this.createUpdateOrganization(params);
    },
    next() {
      this.validation();
      this.checkComplete();
      for (let i in this.buttons) {
        i = parseInt(i);
        if (this.buttons[i].isActive && this.buttons[i].isValid) {
          this.buttons[i].isActive = false;
          this.buttons[i].isComplete = true;
          this.buttons[i].isDisabled = false;
          if (i + 1 !== this.buttons.length) {
            this.buttons[i + 1].isDisabled = false;
            this.buttons[i + 1].isActive = true;
          }
          break;
        }
      }
    },
    hide() {
      this.$root.$emit('bv::toggle::collapse', 'sideBarOrgCreateEdit');
    },
  },
};
</script>

<style scoped>
.sendBtn {
  background-color: #263a5a;
  color: white;
}

.cancelBtn {
  background-color: white;
  color: #263a5a;
  border: solid 2px #263a5a;
}

.footer {
  z-index: 1;
  position: absolute;
  bottom: 0;
}
.tabBtn {
  border: 0;
  background-color: #f2f3f5;
  color: #263a5a;
  border-radius: 0;
}
</style>
