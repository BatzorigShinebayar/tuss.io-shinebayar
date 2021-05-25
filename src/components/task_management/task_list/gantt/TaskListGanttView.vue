<template>
  <div>
    <h4 class="text-primary mb-5 text-center">Gantt chart coming soon...</h4>
    {{ taskGanttData }}
    <div v-if="taskGanttData">
      <ejs-gantt
        ref="gantt"
        id="GanttContainer"
        :dataSource="taskGanttData"
        :height="height"
        :taskFields="taskFields"
        :columns="columns"
        :treeColumnIndex="0"
        :allowSelection="true"
        :gridLines="gridLines"
        :highlightWeekends="true"
        :timelineSettings="timelineSettings"
        :labelSettings="labelSettings"
        :includeWeekend="true"
      >
      </ejs-gantt>
    </div>
  </div>
</template>

<script>
import { GanttPlugin, Selection, DayMarkers } from '@syncfusion/ej2-vue-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

export default {
  name: 'TaskGanttChartView',

  props: {
    taskGanttData: {
      type: [Object, Array],
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      height: '450px',
      taskFields: {
        id: 'id',
        name: 'name',
        startDate: 'start_date',
        progress: 'progress',
        duration: 'duration',
        child: 'task_stage_groups',
      },
      columns: [
        { field: 'id', visible: false },
        {
          field: 'name',
          headerText: 'Name',
          width: '250',
          clipMode: 'EllipsisWithTooltip',
        },
        { field: 'start_date', headerText: 'Start Date' },
        { field: 'duration', headerText: 'Duration' },
      ],
      gridLines: 'Both',
      timelineSettings: {
        timelineUnitSize: 50,
        topTier: {
          unit: 'Month',
          format: 'MMM dd, y',
        },
        bottomTier: {
          unit: 'Day',
          formatter: (date) => {
            let month = date.getMonth();
            if (month === 1) {
              return '';
            } else {
              let presentDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              let start = new Date(presentDate.getFullYear(), 0, 0);
              let diff = Number(presentDate) - Number(start);
              let oneDay = 1000 * 60 * 60 * 24;
              let day = Math.floor(diff / oneDay);
              return 'day ' + (day - 59);
            }
          },
        },
      },
      labelSettings: {
        leftLabel: 'name',
      },
    };
  },
  provide: {
    gantt: [Selection, DayMarkers],
  },
};
</script>

<style>
@import '../../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
@import '../../../../../node_modules/@syncfusion/ej2-vue-gantt/styles/material.css';
</style>
