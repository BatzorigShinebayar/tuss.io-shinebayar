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
                  </div>
                  <div class="hl mx-0"></div>
                  <div class="d-flex">
                    <div class="mr-auto">
                      <p class="text-muted">HGI</p>
                      <strong>---</strong>
                      <p class="text-muted">U.Onoo</p>
                      <strong>----</strong>
                    </div>
                    <div class="mr-5">
                      <p class="text-muted">SAGU</p>
                      <strong>---</strong>
                      <p class="text-muted">Rank</p>
                      <strong>---</strong>
                    </div>
                  </div>
                  <div class="hl mx-0"></div>
                  <p class="text-muted">User status</p>
                  <b-badge
                    v-if="partnerData.is_active === '1'"
                    variant="success"
                    >Active</b-badge
                  >
                  <b-badge v-else variant="danger">Inactive</b-badge>
                  <p class="text-muted mt-3">Stakeholder types</p>
                  <b-badge
                    v-for="type in partnerData.partner_types_id"
                    :key="type.id"
                    variant="deep-blue"
                    class="mr-1"
                    >{{ type.short_name }}</b-badge
                  >
                  <p class="text-muted mt-3">Date of Birth</p>
                  <strong class="mr-1">{{ partnerData.birthday }}</strong>
                  <p class="text-muted mt-3">Register</p>
                  <strong class="mr-1">{{ partnerData.register }}</strong>
                  <p class="text-muted mt-3">Email</p>
                  <strong class="mr-1">{{ partnerData.email }}</strong>
                  <p class="text-muted mt-3">Country</p>
                  <strong class="mr-1">{{ partnerData.country }}</strong>
                  <p class="text-muted mt-3">Gender</p>
                  <strong class="mr-1">
                    <Fa
                      v-if="partnerData.gender === 'female'"
                      :icon="['far', 'venus']"
                      style="color: #ffc0cb"
                    />
                    <Fa v-else :icon="['far', 'mars']" class="text-primary" />
                    {{ partnerData.gender }}</strong
                  >
                  <p class="text-muted mt-3">Mobile</p>
                  <strong class="mr-1">{{ partnerData.mobile }}</strong>
                  <p class="text-muted mt-3">Fax</p>
                  <strong class="mr-1">{{ partnerData.fax }}</strong>
                  <p class="text-muted mt-3">Address</p>
                  <strong class="mr-1">{{ partnerData.address }}</strong>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-col>
      <b-col :cols="activity ? '7' : '10'">
        <b-col cols="12" class="card mt-3">
          <div class="card-body">
            <div class="media">
              <div class="media-body d-flex">
                <b-col cols="4">
                  <h4><strong>Dashboard</strong></h4>
                  <p class="mt-2 text-muted">{{ new Date() | date }}</p>
                </b-col>
                <b-col class="d-flex" cols="8">
                  <b-col
                    class="align-self-center"
                    style="text-align: center"
                    cols="3"
                  >
                    <strong class="mx-auto">a value</strong>
                    <p class="text-muted class='mx-auto'">a</p>
                  </b-col>
                  <b-col
                    class="align-self-center"
                    style="text-align: center"
                    cols="3"
                  >
                    <strong class="mx-auto">b value</strong>
                    <p class="text-muted class='mx-auto'">b</p></b-col
                  >
                  <b-col
                    class="align-self-center"
                    style="text-align: center"
                    cols="3"
                  >
                    <strong class="mx-auto">c value</strong>
                    <p class="text-muted class='mx-auto'">c</p></b-col
                  >
                  <b-col
                    class="align-self-center"
                    style="text-align: center"
                    cols="3"
                  >
                    <strong class="mx-auto">d value</strong>
                    <p class="text-muted class='mx-auto'">d</p></b-col
                  >
                </b-col>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" class="lined-card px-0 mt-3">
          <div class="card-body under-border">
            <div class="media">
              <div class="media-body flex-space-between">
                <p><strong>Contacts</strong></p>
                <!--                <Fa-->
                <!--                  class="cursor-pointer"-->
                <!--                  :icon="['fas', 'cog']"-->
                <!--                  @click="editPersonalInfo"-->
                <!--                />-->
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="media">
              <div class="media-body d-flex"></div>
            </div>
          </div>
        </b-col>
        <h4 class="font-weight-bold my-3">Attendance</h4>
        <b-table
          striped
          id="attendance"
          :hover="true"
          :fields="tableField"
          :items="attendance"
        >
        </b-table>
        <h4 class="font-weight-bold my-3">Leaves and Vacations</h4>
        <b-table
          striped
          id="leaves_and_vacations"
          :hover="true"
          :fields="leavesField"
          :items="leaves"
        >
        </b-table>
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
  </div>
</template>

<script>
export default {
  name: 'StakeholdersDetails',
  components: {},
  data() {
    return {
      menuType: null,
      activity: true,
      partnerData: null,
      json_data: null,
      tableField: [
        {
          key: 'checkbox',
          label: '',
        },
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'weekday',
          label: 'Weekday',
          sortable: true,
        },
        {
          key: 'time_in',
          label: 'Time in',
        },
        {
          key: 'time_out',
          label: 'Time out',
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
        },
        {
          key: 'action',
          label: '',
        },
      ],
      attendance: [],
      leavesField: [
        {
          key: 'checkbox',
          label: '',
        },
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'weekday',
          label: 'Weekday',
          sortable: true,
        },
        {
          key: 'time_in',
          label: 'Time in',
        },
        {
          key: 'time_out',
          label: 'Time out',
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
        },
        {
          key: 'action',
          label: '',
        },
      ],
      leaves: [],
    };
  },
  beforeMount() {
    const params = this.$route.params.id + '/';
    this.getPartnerDetailById(params);
  },
  methods: {
    async getPartnerType(params) {
      const response = await this.$store.dispatch('getPartnerTypes', params);
      if (response.status === 200) {
        const partner_types = response.data.results;
        const partner_type_ids = this.partnerData.partner_types_id;
        for (const i in partner_type_ids) {
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
        console.log(this.partnerData);
      }
    },
    async getPartnerDetailById(params) {
      const response = await this.$store.dispatch(
        'getPartnerDetailById',
        params
      );
      if (response.status === 200) {
        this.partnerData = response.data;
        const param = `?is_active=1&organization=${this.$store.getters.activeCompany}`;
        await this.getPartnerType(param);
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
  },
};
</script>
<style scoped>
.left-border {
  border-left: 2px solid gainsboro;
  height: 100%;
}
.under-border {
  border-bottom: 2px solid gainsboro;
  width: 100%;
}
</style>
