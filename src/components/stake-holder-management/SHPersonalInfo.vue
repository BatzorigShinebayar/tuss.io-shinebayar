<template>
  <div>
    <b-row>
      <b-col cols="12 h-100">
        <div class="float-right d-flex">
          <div class="d-flex mx-2 cursor-pointer" @click="markAsFormer">
            <Fa :icon="['far', 'clipboard-list']" />
            <p class="ml-2 align-self-center">Mark as Former</p>
          </div>
          <div class="d-flex mx-2 cursor-pointer" @click="download">
            <Fa :icon="['far', 'download']" />
            <p class="ml-2 align-self-center">Download file</p>
          </div>
          <div class="d-flex mx-2 cursor-pointer" @click="hideActivity">
            <Fa :icon="['far', 'eye-slash']" />
            <p
              class="ml-2 align-self-center"
              :class="{ 'text-muted': !activity }"
            >
              Hide activity
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="2">
        <b-col cols="12">
          <div class="card mt-3">
            <div class="card-body">
              <div class="media">
                <div class="media-body">
                  <img
                    :src="partnerData.image"
                    onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
                    class="border-white rounded-circle align-self-center"
                    width="63.5px"
                    height="63.5px"
                  />
                  <div class="mt-2">
                    <p>
                      <strong>{{ partnerData.full_name }}</strong>
                    </p>
                    <b-badge
                      v-for="type in partnerData.partner_types_id"
                      :key="type.id"
                      variant="deep-blue"
                      class="mr-1 mt-2 cursor-pointer p-1"
                      :class="{ active: partnerType === type.id }"
                      @click="changeType(type.id)"
                      >{{ type.short_name }}</b-badge
                    >
                  </div>
                  <div class="hl mx-0"></div>
                  <div>
                    <strong>Profile Completion Progress</strong>
                    <p class="text-muted">
                      Documentation is a love letter that you write to your
                      future self.
                    </p>
                    <h3 class="mt-2 text-primary">{{ value }}%</h3>
                    <b-progress
                      :value="value"
                      height="5px"
                      max="100"
                      class="mb-3"
                    ></b-progress>
                  </div>
                  <div class="hl mx-0"></div>
                  <div class="d-flex align-items-center">
                    <p class="mr-auto">Complete Personal information section</p>
                    <Fa
                      class="text-primary"
                      :icon="['fas', 'check-circle']"
                      size="2x"
                    />
                  </div>
                  <div class="hl mx-0"></div>
                  <div v-for="(item, index) in additionalData" :key="index">
                    <div class="d-flex align-items-center">
                      <p class="mr-auto">Complete "{{ item.name }}" section</p>
                      <Fa
                        class="text-primary"
                        :icon="['fas', 'check-circle']"
                        size="2x"
                      />
                    </div>
                    <div
                      v-if="index + 1 !== additionalData.length"
                      class="hl mx-0"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-col>
      <b-col :cols="activity ? '7' : '10'">
        <b-col cols="12" class="lined-card px-0 mt-3">
          <div class="card-body under-border">
            <div class="media">
              <div class="media-body flex-space-between">
                <p><strong>Personal info</strong></p>
                <Fa
                  class="cursor-pointer"
                  :icon="['fas', 'cog']"
                  @click="editPersonalInfo"
                />
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="media">
              <div class="media-body d-flex">
                <b-col class="d-table" cols="6"
                  ><b-row class="my-1">
                    <b-col cols="5">
                      <p>Full Name</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.full_name }} </u>
                      </p>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Date of Birth</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.birthday }} </u>
                      </p>
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Phone</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.mobile }} </u>
                      </p>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Email</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.email }} </u>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col class="d-table" cols="6">
                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Gender</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <Fa
                          v-if="partnerData.gender === 'female'"
                          :icon="['far', 'venus']"
                          style="color: #ffc0cb"
                        />
                        <Fa
                          v-else
                          :icon="['far', 'mars']"
                          class="text-primary"
                        />
                        <u> {{ partnerData.gender }} </u>
                      </p>
                    </b-col>
                  </b-row>

                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Country</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.country }} </u>
                      </p>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col cols="5">
                      <p>Phone Code</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.phone_code }} </u>
                      </p>
                    </b-col> </b-row
                  ><b-row class="my-1">
                    <b-col cols="5">
                      <p>Address</p>
                    </b-col>
                    <b-col cols="7">
                      <p>
                        <u> {{ partnerData.address }} </u>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </div>
            </div>
          </div>
        </b-col>
        <b-col
          v-for="(item, index) in additionalData"
          :key="index"
          cols="12"
          class="lined-card px-0 mt-3"
        >
          <div class="card-body under-border">
            <div class="media">
              <div class="media-body flex-space-between">
                <p>
                  <strong>{{ item.name }}</strong>
                </p>
                <div v-if="item.is_multi_data" class="ml-auto">
                  <div
                    class="btn"
                    @click="setMenu('grid')"
                    :class="{ 'active bg-white': menuType === 'grid' }"
                  >
                    <Fa
                      :icon="['far', 'th-large']"
                      :class="{ 'text-primary': menuType === 'grid' }"
                    />
                  </div>
                  <div
                    class="btn"
                    @click="setMenu('list')"
                    :class="{ 'active bg-white': menuType === 'list' }"
                  >
                    <Fa
                      :icon="['fas', 'list-ul']"
                      :class="{ 'text-primary': menuType === 'list' }"
                    />
                  </div>
                </div>
                <div v-if="item.is_multi_data" class="vl my-0"></div>
                <Fa
                  class="cursor-pointer align-self-center"
                  @click="editAdditionalInfo(item)"
                  :icon="['fas', 'cog']"
                />
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="media">
              <div class="media-body">
                <b-col v-if="item.is_multi_data" cols="12">
                  <b-table
                    v-if="menuType === 'list'"
                    striped
                    id="leaves_and_vacations"
                    :hover="true"
                    :fields="setTableField(item.loaded_items)"
                    :items="setTableData(item.data)"
                  >
                    <template #cell(sequence)="props">
                      {{ props.index + 1 }}
                    </template>
                  </b-table>
                </b-col>
                <b-form-row v-else>
                  <b-col v-for="(listItem, i) in item.data" :key="i" cols="7">
                    <div class="d-flex">
                      <b-col class="ml-2 my-1" cols="6">
                        <p>{{ listItem.label }}</p>
                      </b-col>
                      <b-col class="my-1" cols="6">
                        <u>{{ listItem.value }}</u>
                      </b-col>
                    </div>
                  </b-col>
                </b-form-row>
              </div>
            </div>
          </div>
        </b-col>
      </b-col>
      <b-col cols="3" v-if="activity">
        <b-col cols="12">
          <p><strong>Recent activity</strong></p>
          <div v-for="item in 5" :key="item" class="card mt-3">
            <div class="card-body">
              <div class="media">
                <div class="media-body d-flex">
                  <div>
                    <p>
                      Completed “Хүний нөөцийн бүрдүүлэлтийг дижиталжуулах
                      шийдлүүдийн дизайныг гаргах” task
                    </p>
                    <p class="text-muted float-right">just now</p>
                  </div>
                  <div class="float-right">
                    <Fa :id="'edit-' + item" :icon="['far', 'ellipsis-v']" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-col>
    </b-row>
    <sideBarEdit :type="sideBarType" :data="sideBarData" />
  </div>
</template>

<script>
import sideBarEdit from '@/components/stake-holder-management/items/sideBarEdit';
export default {
  name: 'SHPersonalInfo',
  components: {
    sideBarEdit,
  },
  data() {
    return {
      menuType: 'list',
      partnerType: null,
      activity: true,
      partnerData: null,
      tempData: null,
      sideBarType: null,
      sideBarData: null,
      json_data: null,
      value: 10,
      additionalData: [],
      tempAdditionalData: [],
    };
  },
  watch: {
    partnerType(data) {
      const param = `?is_active=1&organization_id=${this.$store.getters.activeCompany}&partner_id=${this.$route.params.id}&partner_type=${data}`;
      this.getOrgPartnerType(param);
    },
  },
  beforeMount() {
    const params = this.$route.params.id + '/';
    this.getPartnerDetailById(params);
  },
  methods: {
    setTableData(data) {
      console.log('setTableData', data);
      const list = [];
      for (const i in data) {
        const json = {};
        for (const j in data[i]) {
          json[data[i][j].id] = data[i][j].value;
        }
        list.push(json);
      }
      console.log('setTableData_list', list);
      return list;
    },
    setTableField(data) {
      const value = [];
      value.push({
        key: 'sequence',
        label: '',
      });
      for (const i in data) {
        const json = {
          key: data[i].id,
          label: data[i].label,
        };
        value.push(json);
      }
      return value;
    },
    changeType(typeId) {
      this.partnerType = typeId;
    },
    setMenu(type) {
      this.menuType = type;
    },
    async getPartnerType(params) {
      const response = await this.$store.dispatch('getPartnerTypes', params);
      if (response.status === 200) {
        const partner_types = response.data.results;
        const partner_type_ids = this.tempData.partner_types_id;
        for (const i in partner_type_ids) {
          if (i === '0') {
            this.partnerType = partner_type_ids[i];
          }
          for (const j in partner_types) {
            if (partner_types[j].id === partner_type_ids[i]) {
              let json_data = {
                id: partner_types[j].id,
                short_name: partner_types[j].short_name,
              };
              partner_type_ids[i] = json_data;
            }
          }
        }
        this.partnerData = this.tempData;
        console.log(this.partnerData);
      }
    },
    async getPartnerDetailById(params) {
      const response = await this.$store.dispatch(
        'getPartnerDetailById',
        params
      );
      if (response.status === 200) {
        this.tempData = response.data;
        const param = `?is_active=1&organization=${this.$store.getters.activeCompany}`;
        await this.getPartnerType(param);
      }
    },
    async getOrgPartnerType(params) {
      const response = await this.$store.dispatch('getOrgPartnerType', params);
      if (response.status === 200) {
        const org_partner_types = response.data.results;
        this.tempAdditionalData = [];
        for (const i in org_partner_types) {
          const params = `?org_partner_type=${org_partner_types[i].id}&is_active=1&ordering=id`;
          await this.getPartnerTypeInfoBase(params);
        }
      }
    },
    async getPartnerTypeInfoBase(params) {
      const response = await this.$store.dispatch(
        'getPartnerTypeInfoBase',
        params
      );
      if (response.status === 200) {
        //
        this.tempAdditionalData = response.data.results;
        // for (const i in this.tempAdditionalData) {
        //   this.tempAdditionalData[i].data = this.tempAdditionalData[
        //     i
        //   ].loaded_items;
        //   for (const j in this.tempAdditionalData[i].data) {
        //     if (this.tempAdditionalData[i].is_multi_data) {
        //       this.tempAdditionalData[i].data[j].value = [];
        //     } else {
        //       this.tempAdditionalData[i].data[j].value = null;
        //     }
        //   }
        // }
        for (const i in this.tempAdditionalData) {
          const param = `?info_base=${this.tempAdditionalData[i].id}`;
          this.tempAdditionalData[i].partnerType = this.partnerType;
          this.getInfoBaseData(param);
        }
      }
    },

    async getInfoBaseData(params) {
      const response = await this.$store.dispatch('getInfoBaseData', params);
      if (response.status === 200) {
        if (response.data.total > 0) {
          for (const j in response.data.results) {
            for (const i in this.tempAdditionalData) {
              if (
                this.tempAdditionalData[i].id ===
                response.data.results[j].info_base
              ) {
                this.tempAdditionalData[i].data =
                  response.data.results[0].loaded_json_data;
                this.tempAdditionalData[i].info_data_id =
                  response.data.results[j].id;
              }
            }
          }
        }
        this.additionalData = [];
        for (const i in this.tempAdditionalData) {
          this.additionalData.push(this.tempAdditionalData[i]);
        }
        console.log('this.additionalData', this.additionalData);
      }
    },
    changeMenu(data) {
      this.menuType = data;
    },
    hideActivity() {
      this.activity = !this.activity;
    },
    download() {
      console.log('download');
    },
    markAsFormer() {
      console.log('markAsFormer');
    },
    editPersonalInfo() {
      this.sideBarType = 'Personal info';
      this.sideBarData = this.partnerData;
      this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
    },
    editAdditionalInfo(data) {
      this.sideBarType = 'Additional info';
      this.sideBarData = { ...data };
      console.log('this.partnerData', data);
      this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
    },
  },
};
</script>
<style scoped>
.badge.active {
  background-color: white;
  color: black;
}
.left-border {
  border-left: 2px solid gainsboro;
  height: 100%;
}
.under-border {
  border-bottom: 2px solid gainsboro;
  width: 100%;
}
</style>
