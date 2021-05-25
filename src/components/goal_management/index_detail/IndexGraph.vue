<template>
  <div class="mb-5">
    <ejs-chart
      v-if="realization.length > 0"
      id="container"
      width="100%"
      :primaryXAxis="primaryXAxis"
      :primaryYAxis="primaryYAxis"
    >
      <e-series-collection>
        <e-series
          :dataSource="realization"
          type="Spline"
          xName="date"
          yName="value"
          name="Value"
          :marker="marker"
        >
        </e-series>
      </e-series-collection>
    </ejs-chart>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  ChartPlugin,
  SplineSeries,
  Category,
  DataLabel,
} from '@syncfusion/ej2-vue-charts';

Vue.use(ChartPlugin);

export default {
  name: 'IndexGraph',

  props: {
    realization: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  provide: {
    chart: [SplineSeries, Category, DataLabel],
  },

  data() {
    return {
      primaryXAxis: {
        valueType: 'Category',
      },
      primaryYAxis: {
        labelFormat: '{value}',
      },
      marker: {
        dataLabel: {
          visible: true,
        },
      },
    };
  },

  methods: {},
};
</script>
