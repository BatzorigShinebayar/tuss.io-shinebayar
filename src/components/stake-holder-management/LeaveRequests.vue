<template>
  <div>
    <div class="container-fluid pl-lg-4 pr-lg-4">
      <b-col cols="12">
        <b-row>
          <b-col class="pl-0">
            <CIPerfCard :data="dashboard" />
          </b-col>
        </b-row>
      </b-col>
      <div class="d-flex align-items-center mt-3">
        <b-table
          id="leaveRequest"
          ref="leaveRequest"
          striped
          :fields="leaveField"
          :items="requests"
        >
          <template #cell(sequence)="props">
            {{ props.index + 1 }}
          </template>
          <template #cell(partner)="props">
            <router-link
              :to="{
                name: 'stake-holder-detail',
                params: {
                  id: props.item.partner_id,
                },
              }"
              class="task-link"
            >
              {{ props.item.partner | get_employee_info }}
            </router-link>
          </template>
          <template #cell(leave_reason_type)="props">
            {{ leave_type(props.item.leave_reason_type) }}
          </template>
          <template #cell(is_transfer_task)="props">
            <b-badge v-if="props.item.is_transfer_task" variant="success">
              Yes
            </b-badge>
            <b-badge v-else variant="danger">No </b-badge>
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
            <b-badge v-else-if="props.item.state === 'check'" variant="primary"
              >{{ props.item.state }}
            </b-badge>
          </template>
          <template #cell(action)="props" class="d-inline">
            <b-dropdown
              v-if="canConfirm && props.item.state !== 'draft'"
              text="Action"
              variant="dark"
              class="mx-3"
            >
              <b-dropdown-item
                v-if="canConfirm"
                @click="confirm(props.item.id, props.index)"
                :disabled="confirmDisable"
                >Confirm</b-dropdown-item
              >
              <b-dropdown-item
                v-if="canCheck && props.item.state === 'sent'"
                @click="checkRequest(props.item.id, props.index)"
                >Check</b-dropdown-item
              >
              <b-dropdown-item
                v-if="canReject"
                v-b-modal.reject-leave-request
                @click="rejectModal(props.item)"
                >Reject</b-dropdown-item
              >
            </b-dropdown>
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
    <b-modal
      id="reject-leave-request"
      ref="reject-leave-request"
      title="Rejecting reason"
    >
      <b-col class="d-flex mb-2" cols="12">
        <p class="modal-text mr-2">Leave request type:</p>
        <b class="modal-text">{{ this.leave_type(modalData.data) }}</b>
      </b-col>
      <b-col class="d-flex mb-2" cols="12">
        <p class="modal-text mr-2">Employee:</p>
        <b class="modal-text">{{ modalData.employee | get_employee_info }}</b>
      </b-col>
      <b-col cols="12">
        <p class="modal-text">Reason:</p>
        <b-form-textarea
          v-model="modalData.reason"
          placeholder="Write reason why you rejecting"
        ></b-form-textarea>
        <p id="reason_warning" class="text-danger" style="display: none">
          Please write reason why you rejecting
        </p>
      </b-col>
      <template #modal-footer="{ cancel }">
        <div class="w-100">
          <b-button
            variant="dark"
            class="ml-2 float-right"
            :disabled="modalReject"
            @click="rejectLeaveRequest"
          >
            Submit
          </b-button>
          <b-button class="float-right" @click="cancel()"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CIPerfCard from '@/components/crucial_information/CIPerfCards';
export default {
  name: 'LeaveRequests',

  components: { CIPerfCard },
  data() {
    return {
      canConfirm: true,
      canReject: true,
      confirmDisable: false,
      canCheck: true,
      modalReject: false,
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
          key: 'leave_reason_type',
          label: 'Leave reason',
          sortable: true,
        },
        {
          key: 'leave_start_datetime',
          label: 'Starting time',
        },
        {
          key: 'leave_end_datetime',
          label: 'End time',
        },
        {
          key: 'is_transfer_task',
          label: 'Transfer task',
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
      requests: null,
      leaveTypes: [],
      dashboard: {
        Personal_leave_requests: '0',
        Personal_vacation_days: '0',
        Remaining_vacation_days: { state: '0', color: 'text-success' },
      },
      total: 0,
      page: 1,
      modalData: { data: null, employee: null, reason: null },
    };
  },

  mounted() {
    this.getLeavetypes(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&is_system_default=true`,
      true
    );
    this.getLeaveRequest(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&page=${this.page}`
    );
    this.getMyLeaveRequest(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&state=confirm&partner=${this.$store.getters.user.partner_id}&page_size=10000`
    );
    const year = new Date().getFullYear();
    this.getVacationLeave(
      `?organization=${this.$store.getters.activeCompany}&is_active=1&year=${year}&partner=${this.$store.getters.user.partner_id}`,
      true
    );
  },

  methods: {
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
    async getLeavetypes(params, system_dedault = false) {
      const response = await this.$store.dispatch('getLeavetypes', params);
      if (response.status === 200) {
        if (response.data.total > 0) {
          const result = response.data.results;
          if (system_dedault) {
            this.leaveTypes = [];
            for (const i in result) {
              const json = {
                text: result[i].name,
                value: result[i].id,
              };
              this.leaveTypes.push(json);
            }

            this.getLeavetypes(
              `?organization=${this.$store.getters.activeCompany}&is_active=1&is_system_default=false`
            );
          } else {
            for (const i in result) {
              const json = {
                text: result[i].name,
                value: result[i].id,
              };
              this.leaveTypes.push(json);
            }
          }
        }
      }
    },
    async getVacationLeave(params) {
      const response = await this.$store.dispatch(
        'getVacationLeaveDays',
        params
      );
      if (response.status === 200) {
        if (
          response.data.total > 0 &&
          response.data.results[0].state === 'confirm'
        ) {
          const vacation_days_limit =
            response.data.results[0].vacation_days_limit;
          const remaining_vacation_days =
            response.data.results[0].remaining_vacation_days;
          this.dashboard.Personal_vacation_days =
            this.minToDayHourMin(vacation_days_limit);
          this.dashboard.Remaining_vacation_days.state = this.minToDayHourMin(
            remaining_vacation_days
          );
        }
      }
    },
    async getMyLeaveRequest(params) {
      const response = await this.$store.dispatch('getLeaveRequest', params);
      if ((response.status === 200, response.data.total > 0)) {
        this.dashboard.Personal_leave_requests = response.data.total;
      }
    },
    async getLeaveRequest(params) {
      const response = await this.$store.dispatch('getLeaveRequest', params);
      if ((response.status === 200, response.data.total > 0)) {
        this.requests = response.data.results;
        this.total = response.data.total;
      }
    },
    async updateLeaveRequest(params, index) {
      const response = await this.$store.dispatch('putLeaveRequest', params);
      if (response.status === 200) {
        this.requests[index].state = params.urlData.state;
        this.confirmDisable = false;
        this.modalReject = false;

        //
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
    checkRequest(id, index) {
      const param = {
        urlParam: id + '/',
        urlData: {
          id: id,
          state: 'check',
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
