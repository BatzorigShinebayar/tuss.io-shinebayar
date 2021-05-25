<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Goal Management System</h5>
      </template>
      <template #bottom>
        <ul class="nav nav-tabs ml-1">
          <li class="nav-item">
            <router-link :to="{ name: 'goal' }" class="nav-link">
              <Fa :icon="['fas', 'bullseye']" />
              Goal Index
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'goal-plan-list' }"
              class="nav-link active"
            >
              <Fa :icon="['fas', 'check-circle']" />
              Goal Plan
            </router-link>
          </li>
        </ul>
      </template>
    </NavBar>

    <div class="container-fluid pr-lg-4 pl-lg-4 mb-5">
      <div class="d-flex justify-content-between align-items-center mt-4">
        <h5 class="font-weight-bold">Objectives</h5>
        <div class="d-flex">
          <b-button
            variant="deep-blue"
            :to="{ name: 'goal-plan-create' }"
            class="text-nowrap"
          >
            <Fa :icon="['fas', 'plus']" />
            Create plan
          </b-button>
        </div>
      </div>

      <TaskChooser />

      <b-table
        id="goal-plan-list-table"
        head-variant="light"
        :items="plans"
        :fields="tableFields"
        class="mb-5"
      >
        <template #cell(detail)="row">
          <a class="cursor-pointer text-deep-blue">
            <Fa
              :icon="['fas', 'caret-circle-up']"
              size="2x"
              @click="row.toggleDetails"
              :rotation="row.detailsShowing ? null : 180"
              :class="row.detailsShowing ? 'text-warning' : ''"
            />
          </a>
        </template>
        <template #cell(name)="row">
          <p class="font-weight-bold">{{ row.item.name }}</p>
          <small>{{ row.item.start_date }} - {{ row.item.end_date }}</small>
        </template>
        <template #cell(realization)="row">
          <b-progress
            :value="row.item.realized_values"
            :max="row.item.planned_values"
            height="20px"
          ></b-progress>
        </template>
        <template #cell(percent)="row">
          <h5 class="font-weight-bold">{{ row.item.percent }}%</h5>
          <small>Realization</small>
        </template>
        <template #cell(state)="row">
          <h5>
            <b-badge
              :variant="row.item.state === 'confirm' ? 'primary' : 'warning'"
            >
              {{ row.item.state }}
            </b-badge>
          </h5>
        </template>
        <template #cell(actions)="row">
          <b-button variant="deep-blue" @click="view(row.item.id)">
            Detail
          </b-button>
        </template>
        <template #row-details="row">
          <GoalTableDetail :items="row.item.spr_plan_lines" />
        </template>
      </b-table>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import TaskChooser from '@/components/shared_elements/TaskChooser';
import GoalTableDetail from '@/components/goal_management/plan_list/GoalTableDetail';

export default {
  name: 'GoalPlanListPage',

  metaInfo: {
    title: 'Goal Management | TUSS D+',
  },

  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },

  validations: {
    name: { required },
  },

  components: {
    GoalTableDetail,
    TaskChooser,
    MainLayout,
    NavBar,
  },

  data() {
    return {
      searchName: null,
      year: 2021,
      yearList: [2021, 2022, 2023, 2024],
      plans: null,
      tableFields: [
        {
          key: 'detail',
          label: '',
          thClass: 'thdetail',
          tdClass: 'tddetail',
        },
        {
          key: 'name',
          label: 'INDEX',
        },
        {
          key: 'realization',
          label: 'REALIZATION',
          thClass: 'threalization',
        },
        {
          key: 'percent',
          label: 'PERCENT',
          thClass: 'thpercent',
        },
        {
          key: 'state',
          label: 'STATE',
          thClass: 'thstate',
        },
        {
          key: 'actions',
          label: 'ACTIONS',
          thClass: 'thactions',
        },
      ],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    back() {
      window.history.back();
    },

    view(id) {
      console.log(id);
    },

    loadData() {
      const url = `/pages/goal/list_goal_plan/${this.$store.getters.activeCompany}/`;
      axios.get(url).then((response) => {
        this.processData(response.data.spr_plan_list);
      });
    },

    processData(rawData) {
      const finalData = [];
      for (const plan of rawData) {
        let totalPlannedValues = 0;
        let totalRealizedValues = 0;
        for (const plan_line of plan.spr_plan_lines) {
          let plannedValues = 0;
          let realizedValues = 0;
          for (const index of plan_line.plan_line_indexes) {
            plannedValues += index.planned_value;
            realizedValues += index.realized_value;
          }

          plan_line.planned_values = plannedValues;
          plan_line.realized_values = realizedValues;
          plan_line.percent = calculatePercent(plannedValues, realizedValues);

          totalPlannedValues += plan_line.planned_values;
          totalRealizedValues += plan_line.realized_values;
        }

        plan.planned_values = totalPlannedValues;
        plan.realized_values = totalRealizedValues;
        plan.percent = calculatePercent(
          totalPlannedValues,
          totalRealizedValues
        );

        finalData.push(plan);
      }
      this.plans = finalData;
    },
  },
};

function calculatePercent(total, current) {
  return ((100 * current) / total).toFixed(2);
}
</script>
