<template>
  <div>
    <div class="container-fluid pr-lg-4 pl-lg-4">
      <div class="d-flex align-items-center mt-2">
        <h3><strong>StakeHolders</strong></h3>
        <div class="d-flex ml-auto">
          <b-button
            v-if="permission('shld_crt')"
            @click="create"
            variant="deep-blue"
          >
            <Fa :icon="['fas', 'plus']" />
            Create new Stakeholder Type
          </b-button>
        </div>
      </div>
      <b-col
        v-for="(item, index) in tableData"
        :key="index"
        class="lined-card my-3"
        cols="12"
      >
        <div class="card-body">
          <div class="media">
            <div class="media-body d-flex h-100">
              <b-col class="d-flex h-100" cols="3">
                <Fa
                  v-if="item.hide"
                  :icon="['fas', 'chevron-circle-up']"
                  size="2x"
                  @click="chevron(item)"
                  class="text-primary align-self-center mr-3"
                />
                <Fa
                  v-else
                  :icon="['fas', 'chevron-circle-down']"
                  size="2x"
                  @click="chevron(item)"
                  class="text-primary align-self-center mr-3"
                />
                <div class="align-self-center">
                  <p class="text-muted">Stakeholder title</p>
                  <div class="d-flex">
                    <Fa :icon="['fas', 'users']" size="lg" class="mr-2" />
                    <strong>{{ item.name }}</strong>
                  </div>
                </div>
              </b-col>
              <div class="vl my-0" />
              <b-col class="d-flex h-100 align-items-center" cols="9">
                <div>
                  <p class="text-muted">Description</p>
                  <p class="mt-1">{{ item.description }}</p>
                </div>
                <Fa
                  :icon="['far', 'ellipsis-v']"
                  size="lg"
                  @click="edit(item)"
                  class="ml-auto cursor-pointer"
                />
              </b-col>
            </div>
          </div>
        </div>
        <div v-if="item.hide" class="card-body pt-0">
          <div class="media">
            <div class="media-body w-100">
              <div class="hl mx-0" />
              <div class="d-flex align-items-center">
                <h5><strong>Stakeholder information base structure</strong></h5>
                <b-button
                  v-if="permission('shld_upd')"
                  @click="createJsonData(item.id, item.json_data)"
                  variant="deep-blue"
                  class="ml-auto"
                >
                  <Fa :icon="['fas', 'plus']" />
                  Create new
                </b-button>
              </div>
              <p>
                Here you can configure structure of information you will be
                collecting regarding this type of stakeholder.
              </p>
              <div
                v-for="(json, indx) in item.json_data"
                :key="indx"
                class="mt-4"
              >
                <div>
                  <strong class="mr-3">
                    <Fa
                      v-if="json.hide"
                      :icon="['fas', 'caret-down']"
                      size="lg"
                      @click="caret(json)"
                      class="mr-2 cursor-pointer"
                    />
                    <Fa
                      v-else
                      :icon="['fas', 'caret-right']"
                      size="lg"
                      @click="caret(json)"
                      class="mr-2 cursor-pointer"
                    />
                    {{ json.menu_name }}</strong
                  >
                  <u
                    class="text-primary cursor-pointer"
                    @click="editJsonData(item.id, json)"
                    >/edit/</u
                  >
                </div>
                <div v-if="json.hide">
                  <div
                    v-for="(menu_item, i) in json.menu_items"
                    :key="i"
                    class="d-flex"
                  >
                    <p
                      class="m-2 mx-1"
                      :class="menu_item.is_active === '1' ? '' : 'deleted'"
                    >
                      "{{ menu_item.label }}",
                    </p>
                    <p
                      class="my-2"
                      :class="menu_item.is_active === '1' ? '' : 'deleted'"
                    >
                      "{{ menu_item.type }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </div>
    <StakeholderSideBar :data="sideBarData" :type="sideBarType" :bool="check" />
    <StakeholderEditJson
      :data="sideBarDataJson"
      :type="sideBarTypeJson"
      :bool="checkJson"
      :id="sideBarIdJson"
    />
  </div>
</template>

<script>
import StakeholderSideBar from '@/components/admininstration/stakeholders/StakeholderEdit';
import StakeholderEditJson from '@/components/admininstration/stakeholders/StakeholderEditJson';

export default {
  name: 'Stakeholders',

  components: {
    StakeholderSideBar,
    StakeholderEditJson,
  },

  data() {
    return {
      tempData: [],
      tableData: [],
      check: false,
      sideBarType: null,
      sideBarData: null,
      checkJson: false,
      sideBarTypeJson: null,
      sideBarDataJson: null,
      sideBarIdJson: null,
    };
  },

  mounted() {
    this.tempData = [];
    const companies = this.$store.getters.user.companies;
    let group_id = 0;
    for (const i in companies) {
      if (
        companies[i].organization_id === this.$store.getters.user.company_id
      ) {
        group_id = companies[i].group_id;
      }
    }
    const param = `?organization_id=${this.$store.getters.activeCompany}&ordering=id`;
    this.getOrgPartnerType(param);
  },

  methods: {
    chevron(item) {
      item.hide = !item.hide;
    },
    caret(item) {
      item.hide = !item.hide;
      this.tableData.push('');
      this.tableData.pop();
    },
    editJsonData(id, json) {
      this.sideBarTypeJson = 'edit';
      this.sideBarDataJson = json;
      this.sideBarIdJson = id;
      this.checkJson = !this.checkJson;
      this.$root.$emit('bv::toggle::collapse', 'StakeholderEditJson');
    },
    createJsonData(id, json) {
      this.sideBarTypeJson = 'create';
      this.sideBarDataJson = json;
      this.sideBarIdJson = id;
      this.checkJson = !this.checkJson;
      this.$root.$emit('bv::toggle::collapse', 'StakeholderEditJson');
    },
    async getOrgPartnerType(params) {
      const response = await this.$store.dispatch('getOrgPartnerType', params);
      if (response.status === 200) {
        const org_partner_types = response.data.results;
        for (const i in org_partner_types) {
          if (org_partner_types[i].is_active === '1') {
            const params = `${org_partner_types[i].partner_type}/`;
            await this.getPartnerTypes(params, org_partner_types[i].id);
          }
        }
      }
    },

    async getPartnerTypes(params, id) {
      const response = await this.$store.dispatch('getPartnerTypes', params);
      if (response.status === 200) {
        const json = response.data;
        json.hide = false;
        json.json_data = [];
        this.tempData.push(json);
        const params = `?org_partner_type=${id}&is_active=1&ordering=id`;
        await this.getPartnerTypeInfoBase(params, json.id);
      }
    },
    async getPartnerTypeInfoBase(params, id) {
      const response = await this.$store.dispatch(
        'getPartnerTypeInfoBase',
        params
      );
      if (response.status === 200) {
        for (const i in this.tempData) {
          if (this.tempData[i].id === id) {
            const results = response.data.results;
            for (const j in results) {
              let json = {
                hide: false,
                menu_name: results[j].name,
                menu_id: results[j].id,
                menu_items: results[j].loaded_items,
                use_repeater: results[j].is_multi_data,
              };
              this.tempData[i].json_data.push(json);
            }
          }
        }
        this.tableData = this.tempData;
      }
    },
    async createOrgPartnerType(params) {
      const response = await this.$store.dispatch(
        'createOrgPartnerType',
        params
      );
      if (response.status === 200) {
        // const params = {
        //   partner_type_id: response.data,
        //   organization_id: this.$store.getters.activeCompany,
        //   created_user: this.$store.getters.user.id,
        //   created_date: new Date(),
        // };
        // await this.createOrgPartnerType(params);
      }
    },
    edit(props) {
      this.sideBarType = 'edit';
      this.sideBarData = props.id;
      this.check = !this.check;
      this.$root.$emit('bv::toggle::collapse', 'stakeholderSideBar');
    },
    create() {
      this.sideBarType = 'create';
      this.sideBarData = null;
      this.check = !this.check;
      this.$root.$emit('bv::toggle::collapse', 'stakeholderSideBar');
    },
  },
};
</script>
<style scoped>
.deleted {
  text-decoration: line-through;
  color: red;
}
</style>
