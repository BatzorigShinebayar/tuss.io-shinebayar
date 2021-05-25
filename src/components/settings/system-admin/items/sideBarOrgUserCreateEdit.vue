<template>
  <b-sidebar
    id="sideBarOrgUserCreateEdit"
    ref="sideBarOrgUserCreateEdit"
    :title="type + ' Organization user'"
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
            <b-col cols="7">
              <b-form-group label="Organization" label-for="organization">
                <Treeselect
                  id="organization"
                  v-model="organization"
                  placeholder="- Choose -"
                  :options="organization_list"
                  @input="changeOrg"
                ></Treeselect>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Organization Name" label-for="org_name">
                <b-form-input
                  id="org_name"
                  v-model="org_name"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Organization Short Name"
                label-for="org_short_name"
              >
                <b-form-input
                  id="org_short_name"
                  v-model="org_short_name"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Department" label-for="department">
                <b-form-radio-group
                  id="department"
                  v-model="departmentSelected"
                  :options="department"
                  class="tus-radio-btn"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Job Title" label-for="jobtitle">
                <b-form-radio-group
                  id="jobtitle"
                  v-model="jobTitleSelected"
                  :options="jobTitles"
                  class="tus-radio-btn"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="7">
              <b-form-group label="TUSD Analyst" label-for="tus_analyst">
                <Treeselect
                  id="tus_analyst"
                  v-model="tus_analyst"
                  placeholder="- Choose -"
                  :options="tus_analyst_list"
                  @input="changeAnalyst"
                ></Treeselect>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Analyst's first Name" label-for="first_name">
                <b-form-input
                  id="first_name"
                  v-model="first_name"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Analyst's last Name" label-for="last_name">
                <b-form-input
                  id="last_name"
                  v-model="last_name"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Analyst's email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="email"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Analyst's organization"
                label-for="analyst_org"
              >
                <b-form-input
                  id="analyst_org"
                  v-model="analyst_org"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="8">
              <b-form-group label="Analyst's address" label-for="address">
                <b-form-textarea
                  id="address"
                  v-model="address"
                  rows="3"
                  disabled
                ></b-form-textarea>
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
          <p v-else-if="type === 'Update'" @click="update">{{ type }}</p>
        </div>
      </b-col>
    </b-col>
  </b-sidebar>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
export default {
  name: 'sideBarOrgUserCreateEdit',

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
  },

  data() {
    return {
      information: { ...this.data },
      buttons: [
        {
          name: 'Organization user',
          id: 'org',
          iconType: 'fas',
          icon: 'user-astronaut',
          isActive: true,
          isValid: true,
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
      tus_analyst: null,
      tus_analyst_list: [],
      organizations: [],
      organization: null,
      partners: [],
      organization_list: [],
      org_name: null,
      org_short_name: null,
      first_name: null,
      last_name: null,
      email: null,
      analyst_org: null,
      address: null,
      departmentSelected: null,
      department: null,
      jobTitleSelected: null,
      jobTitles: null,
    };
  },

  watch: {},
  mounted() {
    const params = `?is_active=1&organization=${this.$store.getters.activeCompany}&page_size=10000`;
    this.getPartners(params);
    const param = `?is_active=1&page_size=10000&group=${this.groupId}`;
    this.getOrganizations(param);
  },

  methods: {
    changeOrg() {
      if (this.organizations.length > 0) {
        for (const i in this.organizations) {
          if (this.organizations[i].id === this.organization) {
            this.org_name = this.organizations[i].name;
            this.org_short_name = this.organizations[i].short_name;
            const param = `?is_active=1&page_size=10000&organization=${this.organizations[i].id}`;
            this.getDepartments(param);
            this.getCompanyJobTitles(param);
          }
        }
      }
    },
    changeAnalyst() {
      for (const i in this.partners) {
        if (this.partners[i].id === this.tus_analyst) {
          this.first_name = this.partners[i].name;
          this.last_name = this.partners[i].last_name;
          this.email = this.partners[i].email;
          this.address = this.partners[i].address;
          const param = `${this.partners[i].organization}/`;
          this.getOrganizations(param, true);
        }
      }
    },
    async getDepartments(params) {
      const response = await this.$store.dispatch('getDepartments', params);
      if (response.status === 200) {
        const deparmentList = [];
        const responseData = response.data.results;
        for (const i in responseData) {
          if (responseData[i].is_active === '1') {
            deparmentList.push({
              value: responseData[i].id,
              text: responseData[i].short_name,
            });
          }
        }
        this.department = deparmentList;
      }
    },
    async getCompanyJobTitles(params) {
      const response = await this.$store.dispatch(
        'getCompanyJobTitles',
        params
      );
      if (response.status === 200) {
        const jobTitleList = [];
        const responseData = response.data.results;
        for (const i in responseData) {
          if (responseData[i].is_active === '1') {
            jobTitleList.push({
              value: responseData[i].id,
              text: responseData[i].short_name,
            });
          }
        }
        this.jobTitles = jobTitleList;
      }
    },
    async getOrganizations(params, one = false) {
      const response = await this.$store.dispatch('getOrganizations', params);
      if (response.status === 200) {
        if (one) {
          this.analyst_org = response.data.name;
        } else {
          this.organization_list = [];
          const responseData = response.data.results;
          this.organizations = responseData;
          const targetData = [];
          for (const i in responseData) {
            const jsonData = {};
            jsonData.id = responseData[i].id;
            jsonData.label = responseData[i].name;
            targetData.push(jsonData);
            if (i === '0') {
              this.organization = jsonData.id;
              this.org_name = responseData[i].name;
              this.org_short_name = responseData[i].short_name;
              const param = `?is_active=1&page_size=10000&organization=${jsonData.id}`;
              await this.getDepartments(param);
              await this.getCompanyJobTitles(param);
            }
          }
          this.organization_list = targetData;
        }
      }
    },
    async getPartners(params) {
      const response = await this.$store.dispatch('getPartners', params);
      if (response.status === 200) {
        const responseData = response.data.results;
        this.partners = responseData;
        const targetData = [];
        for (const i in responseData) {
          const jsonData = {};
          jsonData.id = responseData[i].id;
          jsonData.label =
            responseData[i].name + ' ' + responseData[i].last_name;
          targetData.push(jsonData);
          if (i === '0') {
            this.tus_analyst = jsonData.id;
            this.first_name = responseData[i].name;
            this.last_name = responseData[i].last_name;
            this.email = responseData[i].email;
            this.address = responseData[i].address;
            const param = `${responseData[i].organization}/`;
            await this.getOrganizations(param, true);
          }
        }
        this.tus_analyst_list = targetData;
      }
    },
    async createUpdateJobTitlePartners(params) {
      const response = await this.$store.dispatch(
        'createUpdateJobTitlePartners',
        params
      );
      if (response.status === 200 && response.data.result) {
        this.$root.$emit('bv::toggle::collapse', 'sideBarOrgUserCreateEdit');
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
      console.log('update');
    },
    create() {
      const params = {
        urlData: {
          department_id: this.departmentSelected,
          group_id: parseInt(this.groupId),
          is_active: '1',
          is_main: false,
          job_title_id: this.jobTitleSelected,
          organization_id: this.organization,
          partner_id: this.tus_analyst,
          created_date: new Date(),
          created_user: this.$store.getters.user.id,
        },
      };
      this.createUpdateJobTitlePartners(params);
    },
    next() {
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
      this.$root.$emit('bv::toggle::collapse', 'sideBarOrgUserCreateEdit');
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
