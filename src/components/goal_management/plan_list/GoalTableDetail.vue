<template>
  <div class="mb-3">
    <div v-for="plan of items" :key="plan.id" class="plan-detail-parent">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <a v-b-toggle="`col${plan.id}`" class="plan-icon mx-3">
            <Fa :icon="['fas', 'caret-circle-up']" size="2x" class="col-open" />
            <Fa
              :icon="['fas', 'caret-circle-down']"
              size="2x"
              class="col-closed"
            />
          </a>
          <p class="font-weight-bold">
            {{ plan.start_date }} - {{ plan.end_date }}
          </p>
        </div>
        <div class="plan-detail">
          <b-progress
            class="detail-realization"
            :value="plan.realized_values"
            :max="plan.planned_values"
            height="20px"
          ></b-progress>
          <div class="detail-percent">
            <h5 class="font-weight-bold">{{ plan.percent }}%</h5>
            <small>Realization</small>
          </div>
        </div>
      </div>

      <b-collapse :id="`col${plan.id}`">
        <div
          v-for="planLine of plan.plan_line_indexes"
          :key="planLine.id"
          class="plan-line mt-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <p class="plan-line-name">{{ planLine.name }}</p>
            <div class="plan-detail">
              <b-progress
                class="detail-realization"
                :value="planLine.realized_value"
                :max="planLine.planned_value"
                height="20px"
              ></b-progress>
              <div class="detail-percent">
                <h5 class="font-weight-bold">{{ planLine.percent }}%</h5>
                <small>Realization</small>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalTableDetail',

  props: {
    items: Array,
  },
};
</script>
