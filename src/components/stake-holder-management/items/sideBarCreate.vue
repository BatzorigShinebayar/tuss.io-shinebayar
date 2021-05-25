<template>
  <b-sidebar
    id="sideBarPartnerCreate"
    ref="sideBarPartnerCreate"
    title="Stakeholder create"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div style="margin-bottom: 100px">
      <personalInfoEdit
        :data="data"
        :type="true"
        :partner-type="partnerType"
        @emit_personal="emitted_personal"
      />
    </div>
    <b-col cols="12" class="d-flex bg-secondary py-3 footer">
      <b-col class="btn sendBtn mr-2" cols="10">
        <p @click="create">Create</p>
      </b-col>
      <b-col class="cancelBtn btn" cols="2">
        <p @click="hide">Close</p>
      </b-col>
    </b-col>
  </b-sidebar>
</template>

<script>
import personalInfoEdit from '@/components/stake-holder-management/items/sideBarItems/PersonalInfoEdit';
export default {
  name: 'sideBarPartnerCreate',

  components: { personalInfoEdit },

  props: {
    partnerType: {
      type: Object,
      default() {
        return null;
      },
    },
  },

  data() {
    return {
      partner_rel: null,
      json_data: null,
      changedPersonalInfo: null,
      existing_partner: false,
      existing_partner_rel: false,
    };
  },

  watch: {
    partnerType(data) {
      console.log('partnerType', data);
    },
  },
  methods: {
    async createPartner(params) {
      const response = await this.$store.dispatch('createPartner', params);
      if (response.status === 200) {
        const params = {
          created_date: new Date(),
          created_user: this.$store.getters.user.id,
          is_active: '1',
          json_data: [],
          partner_type_id: this.changedPersonalInfo.partner_type_id,
          partner_id: response.data,
        };
        this.createPartnerRel(params, false);
      }
    },
    async updatePartner(params) {
      const response = await this.$store.dispatch('updatePartner', params);
      if (response.status === 200) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarPartnerCreate');
      }
    },
    async createPartnerRel(params, update = true) {
      const response = await this.$store.dispatch('createPartnerRel', params);
      if (response.status === 200) {
        if (update) {
          this.update();
        } else {
          this.$root.$emit('bv::toggle::collapse', 'sideBarPartnerCreate');
        }
      }
    },
    async updatePartnerRel(params) {
      const response = await this.$store.dispatch('updatePartnerRel', params);
      if (response.status === 200) {
        this.update();
      }
    },
    async getPartnerRel(params) {
      const response = await this.$store.dispatch('getPartnerRel', params);
      if (response.status === 200 && response.data.total > 0) {
        this.existing_partner_rel = true;
        this.changedPersonalInfo.partner_rel_id = response.data.results[0].id;
      }
    },
    emitted_personal(data) {
      if (data) {
        this.changedPersonalInfo = data;
        if (data.is_exist) {
          this.existing_partner = data.is_exist;
          delete data.is_exist;
          if (data.partner_type_id) {
            const params = `?partner_type=${data.partner_type_id}&partner=${data.id}`;
            this.getPartnerRel(params);
          }
        }
      }
    },
    update() {
      const data = {};
      data.address = this.changedPersonalInfo.address;
      data.birthday = this.changedPersonalInfo.birthday;
      data.country_id = this.changedPersonalInfo.country_id;
      data.email = this.changedPersonalInfo.email;
      data.gender = this.changedPersonalInfo.gender;
      data.id = this.changedPersonalInfo.id;
      data.last_name = this.changedPersonalInfo.last_name;
      data.mobile = this.changedPersonalInfo.mobile;
      data.name = this.changedPersonalInfo.name;
      data.is_company = this.changedPersonalInfo.is_company;
      const params = {
        urlParam: this.changedPersonalInfo.id + '/',
        urlData: {
          updated_user: this.$store.getters.user.id,
          updated_date: new Date(),
          ...data,
        },
      };
      this.updatePartner(params);
    },
    create() {
      if (this.existing_partner) {
        if (this.existing_partner_rel) {
          const params = {
            urlParam: this.changedPersonalInfo.partner_rel_id + '/',
            urlData: {
              id: this.changedPersonalInfo.partner_rel_id,
              updated_date: new Date(),
              updated_user: this.$store.getters.user.id,
              is_active: '1',
            },
          };
          this.updatePartnerRel(params);
        } else {
          const params = {
            created_date: new Date(),
            created_user: this.$store.getters.user.id,
            is_active: '1',
            json_data: [],
            partner_type_id: this.partnerType.partner_type_id,
            partner_id: this.changedPersonalInfo.id,
          };
          this.createPartnerRel(params);
        }
      } else {
        const data = {};
        data.address = this.changedPersonalInfo.address;
        data.birthday = this.changedPersonalInfo.birthday;
        data.country_id = this.changedPersonalInfo.country_id;
        data.email = this.changedPersonalInfo.email;
        data.register = this.changedPersonalInfo.register;
        data.gender = this.changedPersonalInfo.gender;
        data.last_name = this.changedPersonalInfo.last_name;
        data.mobile = this.changedPersonalInfo.mobile;
        data.is_company = this.changedPersonalInfo.is_company;
        data.name = this.changedPersonalInfo.name;
        const params = {
          created_user: this.$store.getters.user.id,
          created_date: new Date(),
          is_active: '1',
          organization_id: this.$route.params.id,
          ...data,
        };
        this.createPartner(params);
      }
    },
    hide() {
      this.$root.$emit('bv::toggle::collapse', 'sideBarPartnerCreate');
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
