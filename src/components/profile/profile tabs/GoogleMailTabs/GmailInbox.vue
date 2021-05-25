<template>
  <div class="container-fluid" style="background-color: #ffffff">
    <b-tabs>
      <b-tab title="Back"> </b-tab>
      <b-tab title="Search">
        <b-col cols="12">
          <mail-search />
        </b-col>
      </b-tab>
      <b-tab title="Setting">
        <b-col cols="12">
          <mail-setting />
        </b-col>
      </b-tab>
      <b-tab title="Refresh"> </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import mailSearch from '@/components/profile/items/mail/mailSearch';
import mailSetting from '@/components/profile/items/mail/mailSetting';
export default {
  name: 'GmailInbox',
  components: {
    mailSearch,
    mailSetting,
  },
  data() {
    return {
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
};
</script>

<style scoped></style>
