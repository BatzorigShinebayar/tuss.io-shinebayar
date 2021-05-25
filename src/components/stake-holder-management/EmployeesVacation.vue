<template>
  <div>
    <div class="container-fluid pl-lg-4 pr-lg-4">
      <ContentHeader>
        <template #text>
          <h4 class="font-weight-bold mb-3">Lets jump start</h4>
          <p>Welcome to our planet TUS D+. We have so much in store</p>
        </template>
        <template #image>
          <img
            src="@/assets/images/administration/admin-content-header.svg"
            class="content-header-image"
            alt=""
          />
        </template>
      </ContentHeader>
      <div class="d-flex">
        <div class="ml-auto">
          <b-button
            v-if="vacation_leave_created"
            @click="edit"
            variant="deep-blue"
          >
            Edit My Vacation schedule
          </b-button>
          <b-button v-else @click="create" variant="deep-blue">
            Create My Vacation schedule
          </b-button>
        </div>
      </div>
      <div class="d-flex align-items-center mt-3">
        <b-table
          id="leaveRequest"
          ref="leaveRequest"
          striped
          :fields="leaveField"
          :items="vacation_data"
        >
          <template #cell(sequence)="props">
            {{ props.index + 1 }}
          </template>
          <template #cell(partner)="props">
            {{ props.item.partner | get_employee_info }}
          </template>
          <template #cell(vacation_days_limit)="props">
            {{ minToDayHourMin(props.item.vacation_days_limit) }}
          </template>
          <template #cell(remaining_vacation_days)="props">
            {{ minToDayHourMin(props.item.remaining_vacation_days) }}
          </template>
          <template #cell(state)="props">
            <b-badge v-if="props.item.state === 'confirm'" variant="success">
              {{ props.item.state }}
            </b-badge>
            <b-badge v-else-if="props.item.state === 'draft'" variant="danger"
              >rejected
            </b-badge>
            <b-badge v-else-if="props.item.state === 'sent'" variant="warning"
              >{{ props.item.state }}
            </b-badge>
          </template>
        </b-table>
      </div>
      <div class="d-flex">
        <p class="ml-auto">total: {{ total }}</p>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <b-pagination
          v-if="total > 0 && total / 50 > 1"
          v-model="page"
          pills
          :total-rows="total"
          :per-page="50"
          @change="pageChange"
        ></b-pagination>
      </div>
    </div>
    <VacationSideBar
      :data="sideBarData"
      :type="sideBarType"
      :bool="sideBarBool"
    />
  </div>
</template>

<script>
import ContentHeader from '@/components/admininstration/ContentHeader';
import VacationSideBar from '@/components/stake-holder-management/items/VacationSideBar';
export default {
  name: 'LeaveRequests',

  components: { VacationSideBar, ContentHeader },
  data() {
    return {
      leaveField: [
        {
          key: 'sequence',
          label: '',
        },
        {
          key: 'partner',
          label: 'Employee',
          sortable: true,
        },
        {
          key: 'year',
          label: 'Vacation year',
        },
        {
          key: 'start_date',
          label: 'Vacation start date',
          sortable: true,
        },
        {
          key: 'end_date',
          label: 'Vacation end date',
          sortable: true,
        },
        {
          key: 'vacation_days_limit',
          label: 'Vacation days',
        },
        {
          key: 'remaining_vacation_days',
          label: 'Remaining vacation days',
        },
        {
          key: 'state',
          label: 'State',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      vacation_data: null,
      leaveTypes: [],
      total: 0,
      page: 1,
      vacation_leave_created: false,
      sideBarData: null,
      sideBarType: 'edit',
      sideBarBool: false,
    };
  },

  mounted() {
    const year = new Date().getFullYear();
    this.getVacationLeave(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&year=${year}`
    );
    this.getMyVacationLeave(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&year=${year}&partner=${this.$store.getters.user.partner_id}`,
      true
    );
  },

  methods: {
    edit() {
      this.sideBarType = 'edit';
      this.sideBarBool = !this.sideBarBool;
      this.$root.$emit('bv::toggle::collapse', 'vacationSideBar');
    },
    create() {
      this.sideBarType = 'create';
      this.sideBarBool = !this.sideBarBool;
      this.$root.$emit('bv::toggle::collapse', 'vacationSideBar');
    },
    pageChange(page) {
      this.page = page;
      this.getLeaveRequest(
        `?organization=${this.$store.getters.activeCompany}&is_active=1&page=${page}`
      );
    },
    leave_type(id) {
      for (const i in this.leaveTypes) {
        if (this.leaveTypes[i].value === id) {
          return this.leaveTypes[i].text;
        }
      }
    },
    async getMyVacationLeave(params) {
      const response = await this.$store.dispatch(
        'getVacationLeaveDays',
        params
      );
      if (response.status === 200 && response.data.total > 0) {
        this.vacation_leave_created = true;
      } else {
        this.vacation_leave_created = false;
      }
    },
    async getVacationLeave(params) {
      const response = await this.$store.dispatch(
        'getVacationLeaveDays',
        params
      );
      if (response.status === 200 && response.data.total > 0) {
        this.vacation_data = response.data.results;
      }
    },
    confirm(id, index) {
      this.confirmDisable = true;
      const param = {
        urlParam: id + '/',
        urlData: {
          id: id,
          state: 'confirm',
          updated_date: new Date(),
          updated_user: this.$store.getters.user.id,
          updated_partner_id: this.$store.getters.user.partner_id,
        },
      };
      this.updateLeaveRequest(param, index);
    },
    rejectModal(data) {
      this.modalData.data = data.leave_reason_type;
      this.modalData.employee = data.partner;
      this.modalData.id = data.id;
      this.modalData.index = data.index;
    },
    rejectLeaveRequest() {
      if (this.modalData.reason !== null) {
        this.modalReject = true;
        document.getElementById('reason_warning').style.display = 'none';
        const id = this.modalData.id;
        const index = this.modalData.index;
        const param = {
          urlParam: id + '/',
          urlData: {
            id: id,
            state: 'draft',
            updated_date: new Date(),
            reject_reason: this.modalData.reason,
            updated_user: this.$store.getters.user.id,
            updated_partner_id: this.$store.getters.user.partner_id,
          },
        };
        this.updateLeaveRequest(param, index);
        this.$refs['reject-leave-request'].hide();
      } else {
        document.getElementById('reason_warning').style.display = 'block';
      }
    },
    minToDayHourMin(time) {
      const days = parseInt(time / 8 / 60);
      const hour = parseInt((time - days * 60 * 8) / 60);
      const hour_mem = (time - days * 60 * 8) / 60;
      let min = (hour_mem - hour).toFixed(3) * 100;
      min = parseInt((min * 60) / 100);
      return days + ' d ' + hour + ' h ' + min + ' m';
    },
  },
};
</script>
<style scoped></style>
