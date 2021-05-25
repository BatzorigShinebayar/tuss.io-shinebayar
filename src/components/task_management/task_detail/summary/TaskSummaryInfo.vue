<template>
  <div
    class="
      lineless-card
      d-flex
      justify-content-around
      align-items-center
      p-4
      mb-4
    "
  >
    <h5 class="font-weight-bold text-center">Summary</h5>
    <div v-if="totalHours">
      <h5 class="font-weight-bold text-center">{{ totalHours }} hours</h5>
      <p class="text-black-50 text-center">Total planned</p>
    </div>
    <div v-if="keyInformation">
      <h5 class="font-weight-bold text-center">{{ keyInformation }}</h5>
      <p class="text-black-50 text-center">Key information</p>
    </div>
    <div v-if="deadLine">
      <h5 class="font-weight-bold text-center">{{ deadLine }}</h5>
      <p class="text-black-50 text-center">Until deadline</p>
    </div>
    <div v-if="elapsed">
      <h5 class="font-weight-bold text-center">{{ elapsed }}</h5>
      <p class="text-black-50 text-center">Elapsed</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskSummaryInfo',

  props: {
    totalHours: String,
    keyInformation: Number,
  },

  inject: ['taskDetail'],

  watch: {
    taskDetail: {
      handler() {
        this.calculateDate();
      },
      deep: true,
    },
  },

  data() {
    return {
      taskDate: null,
      elapsed: null,
      deadLine: null,
    };
  },

  mounted() {
    this.calculateDate();
  },

  methods: {
    calculateDate() {
      if (this.taskDetail.object) {
        const today = new Date();
        const startDate = new Date(this.taskDetail.object.start_date);
        const endDate = new Date(this.taskDetail.object.end_date);

        const durationEpoch = endDate - startDate;
        let elapsed = durationEpoch / 86400000;
        if (elapsed === 1) {
          elapsed = '1 day';
        } else {
          elapsed = `${elapsed} days`;
        }
        this.elapsed = elapsed;

        const remainingEpoch = endDate - today;
        let deadLine = Math.ceil(remainingEpoch / 86400000);
        if (deadLine < 0) {
          deadLine = '0 days';
        } else if (deadLine === 1) {
          deadLine = '1 day';
        } else {
          deadLine = `${deadLine} days`;
        }
        this.deadLine = deadLine;
      }
    },
  },
};
</script>
