<template>
  <div>
    <!--    <calendarFilter :clear="filterClear" @calendarFilter="calendarFilter" />-->
    <b-table
      striped
      id="attendance"
      ref="attendance"
      :hover="true"
      :fields="tableField"
      :items="attendance"
    >
      <template #cell(date)="data">{{ data.item.date }}</template>
      <template #cell(created_date)="data"> {{ data.item.date | get_weekday}}</template>
      <template #cell(check_in)="data"> {{ data.item.check_in | splite_date }}</template>
      <template #cell(check_out)="data">{{ data.item.check_out | splite_date }}</template>
      <template #cell(worked_hours)="data">{{ data.item.worked_hours}}</template>
      <template #cell(status)="data">{{ data.item.status}}</template>
      <template #cell(action)="data">{{ data.item.action}}</template>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'My_Attendance',
  components: {
    // calendarFilter,
  },
  data() {
    return {
      tableField: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'created_date',
          label: 'Weekday',
          sortable: true,
        },
        {
          key: 'check_in',
          dateTime: 'check in',
        },
        {
          key: 'check_out',
          label: 'check out',
        },
        {
          key: 'worked_hours',
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
    };
  },
  methods: {
    attendanceLoad() {
      this.attendanceCount = 0;
      const query = this.$route.query;

      if (!query.is_active) {
        query.is_active = '1';
      }

      query.ordering = '-created_date';

      const url = `/api/attendance/?partner=${this.$store.getters.user.partner_id}&date__gte=2021-05-01&date__lte=2021-05-31`;

      axios.get(url, { params: query }).then((response) => {
        this.attendance = response.data.results;
        this.attendanceCount = response.data.total;
      });
    },
  },

  mounted() {
    this.attendanceLoad();
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
