<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'DutyViolationsBarChart',
  components: { apexchart: VueApexCharts },
  data() {
    return {
      series: [
        {
          name: 'Primary',
          type: 'bar',
          color: '#2A3042',
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
        {
          name: 'Aligment',
          type: 'bar',
          color: '#F46A6A',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
        {
          name: 'Support',
          type: 'bar',
          color: '#F1B44C',
          data: [233, 142, 235, 227, 243, 22, 117, 531, 222, 322, 112, 216],
        },
      ],
      chartOptions: {
        chart: {
          stacked: true,
        },
        title: {
          text: 'Total Duty Violations',
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [],
        },
        labels: [
          '01 Jan 21',
          '02 Feb 21',
          '03 Mar 21',
          '04 Apr 21',
          '05 May 21',
          '06 Jun 21',
          '07 Jul 21',
          '08 Aug 21',
          '09 Sep 21',
          '10 Oct 21',
          '11 Nov 21',
          '12 Dec 21',
        ],
        toolbar: {
          show: true,
        },
        xaxis: {
          type: 'datetime',
        },
      },
    };
  },
};
</script>
