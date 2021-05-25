<template>
  <b-sidebar
    id="sideBarEdit"
    ref="sideBarEdit"
    :title="type + ' edit'"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div style="margin-bottom: 100px">
      <personalInfoEdit
        v-if="type === 'Personal info'"
        :data="data"
        @emit_personal="emitted_personal"
      />
      <additionalInfoEdit v-else :data="data" @emit_json="emitted_json" />
    </div>
    <b-col cols="12" class="d-flex bg-secondary py-3 footer">
      <b-col class="btn sendBtn mr-2" cols="10">
        <p @click="update">Update</p>
      </b-col>
      <b-col class="cancelBtn btn" cols="2">
        <p @click="hide">Close</p>
      </b-col>
    </b-col>
  </b-sidebar>
</template>

<script>
import personalInfoEdit from '@/components/stake-holder-management/items/sideBarItems/PersonalInfoEdit';
import additionalInfoEdit from '@/components/stake-holder-management/items/sideBarItems/AdditionalInfoEdit';
export default {
  name: 'sideBarEdit',

  components: { personalInfoEdit, additionalInfoEdit },

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
  },

  data() {
    return {
      partner_rel: null,
      infoData: null,
      changedPersonalInfo: null,
    };
  },

  watch: {
    data: {
      handler: function (data) {
        console.log('data', data);
        const params = `?is_active=1&partner=${this.$route.params.id}&partner_type=${data.partnerType}`;
        this.getPartnerRel(params);
      },
      deep: true,
    },
  },
  methods: {
    async getPartnerRel(params) {
      const response = await this.$store.dispatch('getPartnerRel', params);
      if (response.status === 200) {
        if (response.data.total > 0) {
          this.partner_rel = response.data.results[0];
        }
      }
    },
    async createInfoBaseData(params) {
      const response = await this.$store.dispatch('createInfoBaseData', params);
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
      }
    },
    async updateInfoBaseData(params) {
      const response = await this.$store.dispatch('updateInfoBaseData', params);
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
      }
    },
    async updatePartner(params) {
      const response = await this.$store.dispatch('updatePartner', params);
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
      }
    },
    emitted_personal(data) {
      if (data) {
        this.changedPersonalInfo = data;
      }
    },
    emitted_json(data) {
      if (data) {
        this.infoData = data;
      }
    },
    update() {
      if (this.type === 'Personal info') {
        const data = {};
        data.address = this.changedPersonalInfo.address;
        data.birthday = this.changedPersonalInfo.birthday;
        data.country_id = this.changedPersonalInfo.country_id;
        data.email = this.changedPersonalInfo.email;
        data.gender = this.changedPersonalInfo.gender;
        data.id = this.data.partner_id;
        data.last_name = this.changedPersonalInfo.last_name;
        data.mobile = this.changedPersonalInfo.mobile;
        data.name = this.changedPersonalInfo.name;
        data.is_company = this.changedPersonalInfo.is_company;

        const params = {
          urlParam: this.data.partner_id + '/',
          urlData: {
            updated_user: this.$store.getters.user.id,
            updated_date: new Date(),
            ...data,
          },
        };
        console.log('params', params);
        this.updatePartner(params);
      } else {
        console.log('this.infoData', this.infoData, this.partner_rel);
        if (!this.infoData.info_data_id) {
          const params = {
            info_base_id: this.infoData.id,
            partner_type_rel_partner_id: this.partner_rel.id,
            json_data: this.infoData.data,
            created_user: this.$store.getters.user.id,
            created_date: new Date(),
          };
          this.createInfoBaseData(params);
        } else {
          const params = {
            urlParam: this.infoData.info_data_id + '/',
            urlData: {
              id: this.infoData.info_data_id,
              json_data: this.infoData.data,
              updated_user: this.$store.getters.user.id,
              updated_date: new Date(),
            },
          };
          this.updateInfoBaseData(params);
        }
      }
    },
    hide() {
      this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
    },
  },
};
</script>

<style scoped>
.tabBtn {
  border: 0;
  background-color: white;
  color: #263a5a;
  margin-top: 1px;
  border-radius: 0;
}

.tabBtn.active {
  background-color: #263a5a;
  color: white;
}

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
</style>
