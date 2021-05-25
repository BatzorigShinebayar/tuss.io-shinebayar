<template>
  <div class="lined-card mb-5">
    <div class="p-4">
      <h5 class="font-weight-bold text-primary">Planned hours:</h5>
    </div>
    <hr class="m-0" />
    <div class="p-4">
      <div class="row">
        <div class="col-lg-5">
          <ejs-accumulationchart
            ref="chart"
            id="container"
            :enableSmartLabels="enableSmartLabels"
            :tooltip="tooltip"
            background="#f8f9fa"
          >
            <e-accumulation-series-collection>
              <e-accumulation-series
                :dataSource="seriesData"
                xName="x"
                yName="y"
                innerRadius="70%"
                :dataLabel="chartDataLabel"
                :pointColorMapping="pointColorMapping"
              >
              </e-accumulation-series>
            </e-accumulation-series-collection>
          </ejs-accumulationchart>
        </div>
        <div class="col-lg-7">
          <b-table
            :items="tableData"
            :fields="tableField"
            :responsive="true"
            class="task-planned-hour-table mb-5"
          >
            <template #cell(employee)="data">
              {{ data.item.employee | get_employee_info }}
            </template>
            <template #cell(stage)="data">
              {{ stageConvert(data.item.stage, data.item.algorithm) }}
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  AccumulationChartPlugin,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
} from '@syncfusion/ej2-vue-charts';
Vue.use(AccumulationChartPlugin);

export default {
  name: 'TaskPlannedHours',

  props: {
    plannedHours: Array,
  },

  watch: {
    plannedHours() {
      this.loadTableData();
    },
  },

  data() {
    return {
      seriesData: [
        // { x: 'Argentina', y: 505370 },
        // { x: 'Belgium', y: 551500 },
        // { x: 'Cuba', y: 312685 },
        // { x: 'Dominican Republic', y: 350000 },
        // { x: 'Egypt', y: 301000 },
        // { x: 'Kazakhstan', y: 300000 },
        // { x: 'Somalia', y: 357022 },
      ],
      radius: 'r',
      legendSettings: { visible: true },
      dataLabel: { visible: true, position: 'Outside', name: 'x' },
      tooltip: {
        enable: true,
        format: '${point.y}',
      },
      enableAnimation: true,
      enableSmartLabels: true,
      chartDataLabel: {
        visible: true,
        name: 'x',
        position: 'Outside',
      },
      pointColorMapping: 'fill',
      tableData: [],
      tableField: [
        {
          key: 'employee',
          label: 'Employee name',
        },
        {
          key: 'stage',
          label: 'Stage',
        },
        {
          key: 'plan_hour',
          label: 'Planned hours',
        },
        {
          key: 'percentage',
          label: 'Percentage',
        },
      ],
      totalMinutes: null,
    };
  },

  methods: {
    loadTableData() {
      this.tableData = [];

      if (this.plannedHours.length > 0) {
        this.setTotalHours();
        for (const rowData of this.plannedHours) {
          this.addTableRow(rowData);
        }
        // this.$refs.chart.print();
        // this.$refs.chart.export('PNG', 'export');
      }
    },

    addTableRow(rowData) {
      const minutes = this.hourToMinute(rowData.plan_hour);
      let digits = (minutes * 100) / this.totalMinutes;

      if (this.tableData.length > 0) {
        let isExist = false;
        let existId;
        let i;
        for (i = 0; i < this.tableData.length; i++) {
          //check existing
          if (
            this.tableData[i].employee === rowData.employee &&
            this.tableData[i].stage === rowData.stage
          ) {
            isExist = true;
            existId = i;
            break;
          }
        }

        if (isExist) {
          //updating existing row
          const oldPlanHourMinute = this.tableData[existId].plan_hour_minute;
          const sumPlanHourMinute = oldPlanHourMinute + minutes;

          const sumPlanHourHour = String(sumPlanHourMinute / 60).padStart(
            2,
            '0'
          );
          const sumPlanHourMin = String(sumPlanHourMinute % 60).padStart(
            2,
            '0'
          );
          const sumPlanHour = `${sumPlanHourHour}:${sumPlanHourMin}`;

          let sumDigits = `${(
            (sumPlanHourMinute * 100) /
            this.totalMinutes
          ).toFixed(2)}%`;

          this.tableData[existId].plan_hour = sumPlanHour;
          this.tableData[existId].plan_hour_minute = sumPlanHourMinute;
          this.tableData[existId].percentage = sumDigits;
        } else {
          //add new row
          this.tableData.push({
            ...rowData,
            plan_hour_minute: minutes,
            percentage: `${digits.toFixed(2)}%`,
          });
        }
      } else {
        //first data
        this.tableData.push({
          ...rowData,
          plan_hour_minute: minutes,
          percentage: `${digits.toFixed(2)}%`,
        });
      }
    },

    hourToMinute(hour) {
      const hourList = hour.split(':');
      const hours = parseInt(hourList[0]);
      const minutes = parseInt(hourList[1]);
      return hours * 60 + minutes;
    },

    stageConvert(stageId, algorithmId) {
      for (const algorithm of this.$store.getters.company.algorithm) {
        if (algorithm.id === algorithmId) {
          for (const stage_group of algorithm.stage_groups) {
            for (const stage of stage_group.stages) {
              if (stage.id === stageId) {
                return stage.code;
              }
            }
          }
        }
      }
      return stageId;
    },

    setTotalHours() {
      let total = 0;
      for (let i = 0; i < this.plannedHours.length; i++) {
        const totalHours = this.hourToMinute(this.plannedHours[i].plan_hour);
        total += totalHours;
      }
      this.totalMinutes = total;
    },
  },

  provide: {
    accumulationchart: [PieSeries, AccumulationDataLabel, AccumulationTooltip],
  },
};
</script>
