<template>
  <div>
    <b-row class="my-5">
      <ProfileDashboard />
    </b-row>
    <b-row class="my-5" style="background-color: #f8f9fa">
      <b-col>
        <b-row>
          <b-col>
            <b-row>
              <DutyViolationsBarChart style="width: 2000px" />
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="my-5" style="background-color: #f8f9fa">
      <b-col>
        <b-row>
          <b-col>
            <b-row class="my-5"> </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DutyViolationsBarChart from '../../items/chart/DutyViolationsBarChart';
import ProfileDashboard from '../../items/ProfileDashboard';

export default {
  name: 'My_Task',
  components: {
    DutyViolationsBarChart,
    ProfileDashboard,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    date: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {};
  },
  methods: {
    fixDate() {
      return this.date.replace('/', ' - ');
    },
    fixData(data) {
      return data.toString().split('_').join(' ');
    },
  },
};
</script>

<style scoped></style>
