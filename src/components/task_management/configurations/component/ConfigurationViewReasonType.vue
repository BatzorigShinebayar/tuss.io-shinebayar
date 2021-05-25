<template>
  <div>
    <div class="card mini-stats-wid mx-3">
      <div class="card-body flex-space-between h-100">
        <b-col cols="12" v-if="configuration.description">
          <h5 class="font-weight-bold">Rejected Reason</h5>
          <div class="flex-space-between pt-3">
            <p class="font-weight-bold">Reason:</p>
            <p class="font-weight-bold">
              {{ configuration.description }}
            </p>
          </div>
        </b-col>
        <b-col v-else cols="12">
          <h5 class="font-weight-bold">Configuration Reason</h5>
          <div class="flex-space-between pt-3">
            <p class="font-weight-bold">Reason type:</p>
            <p class="font-weight-bold">
              {{
                configuration.reason_lines[0].task_stage_coordination_reason
                  | reasonType(reasons)
              }}
            </p>
          </div>
          <div class="flex-space-between pt-3">
            <p class="font-weight-bold">Reason description:</p>
            <p class="font-weight-bold">
              {{ configuration.reason_lines[0].evidence }}
            </p>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationViewReasonType',
  components: {},
  props: {
    configuration: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      reasons: this.$store.getters.company.coordination_reason,
    };
  },
  filters: {
    reasonType(value, list) {
      for (const val of list) {
        if (val.id === value) {
          value = val.code + ' - ' + val.name;
        }
      }
      return value;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.card {
  background-color: white;
  border: solid 2px #f2f3f5;
}
</style>
