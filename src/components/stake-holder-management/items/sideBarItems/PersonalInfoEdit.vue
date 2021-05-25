<template>
  <div>
    <b-col class="mt-4" cols="12">
      <div
        class="card flex-space-between mini-stats-wid bg-deep-blue"
        style="min-width: 340px"
      >
        <div class="card-body">
          <div class="d-flex">
            <div class="text-white d-block">
              <h4 class="font-weight-bold mb-3">
                {{ !type ? 'Edit' : 'Create' }} your Personal information!
              </h4>
              <p class="pt-3 w-75">
                {{ text }}
              </p>
            </div>
            <img
              id="astronaut"
              src="@/assets/images/background/astronaut2.png"
              alt="astronaut"
            />
          </div>
        </div>
      </div>
    </b-col>
    <b-col cols="12">
      <b-form class="d-block mt-3">
        <b-row>
          <b-col cols="6">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="information.email"
                class="text-input"
                type="text"
                :disabled="!type"
                @change="changed('email')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Register" label-for="register">
              <b-form-input
                id="register"
                v-model="information.register"
                class="text-input"
                type="text"
                :disabled="!type || is_exist"
                @change="changed"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group label="Name" label-for="name">
              <b-form-input
                id="name"
                v-model="information.name"
                class="text-input"
                type="text"
                @change="changed"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Last Name" label-for="last_name">
              <b-form-input
                id="last_name"
                v-model="information.last_name"
                class="text-input"
                type="text"
                @change="changed"
              ></b-form-input>
            </b-form-group> </b-col
        ></b-row>
        <b-row>
          <b-col cols="4">
            <b-form-group label="Birthday" label-for="birthday">
              <b-form-datepicker
                id="birthday"
                v-model="information.birthday"
                class="text-input"
                @change="changed"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Phone" label-for="mobile">
              <b-form-input
                id="mobile"
                v-model="information.mobile"
                class="text-input"
                type="text"
                @change="changed"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Genders" label-for="gender">
              <b-form-radio-group
                id="gender"
                :options="genders"
                v-model="information.gender"
                class="tus-radio-btn"
                name="radio-btn"
                button
                @change="changed"
              >
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6"
            ><b-form-group label="Choose conflict type" label-for="country">
              <Treeselect
                id="country"
                v-model="information.country_id"
                placeholder="- Choose -"
                :multiple="false"
                :options="countrys"
                :clearable="false"
                @select="changed"
              />
            </b-form-group>
          </b-col>
          <b-col v-if="type" cols="6">
            <b-form-group label="Stakeholder type">
              <Treeselect
                v-model="information.partner_type_id"
                placeholder="- Choose -"
                :multiple="false"
                :options="partnerTypes"
                :clearable="false"
                @select="changed"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4"
            ><b-form-group label="Is Organization?" label-for="is_company">
              <b-form-radio-group
                id="is_company"
                :options="is_company_chooses"
                v-model="information.is_company"
                class="tus-radio-btn"
                name="is_company-radio-btn"
                button
                @change="changed"
              >
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Address" label-for="address">
              <b-form-textarea
                id="address"
                v-model="information.address"
                rows="6"
                max-rows="6"
                @change="changed"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-col>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'PermissionConfiguration',
  components: { Treeselect },
  props: {
    data: {
      type: Object,
      default: null,
    },
    partnerType: {
      type: Object,
      default: null,
    },
    type: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      information: {
        email: null,
        country_id: 1,
        name: null,
        last_name: null,
        address: null,
        mobile: null,
        birthday: null,
        gender: 'male',
        is_company: false,
      },
      genders: ['male', 'female'],
      countrys: [],
      partnerTypes: [],
      text: null,
      is_exist: false,
      is_company_chooses: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
    };
  },
  watch: {
    information: {
      handler: function (data) {
        this.$emit('emit_personal', data);
      },
      deep: true,
    },
    is_exist(data) {
      if (!data) {
        this.information.name = null;
        this.information.full_name = null;
        this.information.last_name = null;
        this.information.address = null;
        this.information.mobile = null;
        this.information.birthday = null;
        this.information.register = null;
        this.information.is_company = false;
      }
    },
  },
  beforeMount() {
    let type = null;
    if (this.data) {
      this.information = { ...this.data };
      this.information.last_name = this.information.full_name.split(' ')[1];
      type = 'edit';
    } else {
      if (this.partnerType) {
        this.information.partner_type_id = this.partnerType.partner_type_id;
      }
      type = 'create';
    }
    this.text = `Please input required information below to ${type} your personal information.`;
    this.getCountry('?is_active=1');
    this.getOrgPartnerType(
      `?is_active=1&organization=${this.$store.getters.activeCompany}`
    );
  },
  methods: {
    async getPartnerTypes(params) {
      const response = await this.$store.dispatch('getPartnerTypes', params);
      if (response.status === 200) {
        //
        const partnerTypes = response.data.results;
        for (const i in partnerTypes) {
          for (const j in this.partnerTypes) {
            if (partnerTypes[i].id === this.partnerTypes[j].id) {
              this.partnerTypes[j].label = partnerTypes[i].name;
            }
          }
        }
      }
    },
    async getOrgPartnerType(params) {
      const response = await this.$store.dispatch('getOrgPartnerType', params);
      if (response.status === 200) {
        this.getPartnerTypes(`?is_active=1`);
        this.partnerTypes = [];
        const changingData = response.data.results;
        for (const i in changingData) {
          const jsonData = {};
          jsonData.id = changingData[i].partner_type;
          jsonData.label = changingData[i].partner_type;
          this.partnerTypes.push(jsonData);
        }
      }
    },
    async getCountry(params) {
      const response = await this.$store.dispatch('getCountry', params);
      if (response.status === 200) {
        this.countrys = [];
        const changingData = response.data.results;
        for (const i in changingData) {
          const jsonData = {};
          jsonData.id = changingData[i].id;
          jsonData.label = changingData[i].name;
          this.countrys.push(jsonData);
        }
      }
    },
    async getPartners(params) {
      const response = await this.$store.dispatch('getPartners', params);
      if (response.status === 200) {
        this.text = `Partner is already exist,\n you can edit your existing personal data and create stakeholder`;
        if (response.data.total > 0) {
          this.is_exist = true;
        } else {
          this.is_exist = false;
        }
        const result = response.data.results;
        let personal_data = null;
        let check = false;
        for (const i in result) {
          if (result[i].is_active === '1') {
            personal_data = result[i];
            check = true;
          }
        }
        if (!check) {
          personal_data = result[0];
        }
        this.information.name = personal_data.name;
        this.information.full_name =
          personal_data.name + ' ' + personal_data.last_name;
        this.information.last_name = personal_data.last_name;
        this.information.address = personal_data.address;
        this.information.gender = personal_data.gender;
        this.information.mobile = personal_data.mobile;
        this.information.birthday = personal_data.birthday;
        this.information.country_id = personal_data.country;
        this.information.register = personal_data.register;
        this.information.is_company = personal_data.is_company;
        this.information.is_exist = true;
        this.information.id = personal_data.id;
      }
    },
    changed(type) {
      if (type === 'email' && this.type) {
        const params = `?organization=${this.$route.params.id}&email=${this.information.email}`;
        this.getPartners(params);
      }
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
</style>
