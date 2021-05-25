<template>
  <div class="mb-5">
    <h5 class="font-weight-bold mb-3">Configurations</h5>
    <b-table
      v-if="taskConfigurations.length !== 0"
      :items="taskConfigurations"
      :fields="tableFields"
      class="task-summary-table"
    >
      <template #cell(employee)="row">
        {{ row.item.employee | get_employee_info }}
      </template>
      <template #cell(reason_lines__task_stage_coordination_reason)="row">
        {{
          reasonLineConverter(
            row.item.reason_lines__task_stage_coordination_reason
          )
        }}
      </template>
      <template #cell(state)="row">
        <h5>
          <b-badge
            :variant="row.item.state === 'confirm' ? 'success' : 'warning'"
          >
            {{ row.item.state }}
          </b-badge>
        </h5>
      </template>
      <template #cell(sent_date)="row">
        {{ dateConverter(row.item.sent_date) }}
      </template>
      <template #cell(action)="row">
        <b-button
          variant="primary"
          :to="{
            name: 'task-configurations-detail',
            params: { id: row.item.id },
          }"
          target="_blank"
        >
          View configuration
        </b-button>
      </template>
    </b-table>
    <b-alert v-else variant="primary" show>
      <Fa :icon="['fas', 'thumbs-up']" />
      This task has no configurations.
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'TaskConfigurationSummary',

  props: {
    taskConfigurations: Array,
  },

  data() {
    return {
      tableFields: [
        {
          key: 'reason_lines__task_stage_coordination_reason',
          label: 'Configuration Type',
        },
        {
          key: 'employee',
          label: 'Employee',
        },
        {
          key: 'sent_date',
          label: 'Sent date',
        },
        {
          key: 'state',
          label: 'State',
        },
        {
          key: 'action',
          label: 'Link',
        },
      ],
    };
  },

  methods: {
    reasonLineConverter(reasonId) {
      for (const reason of this.$store.getters.company.coordination_reason) {
        if (reason.id === reasonId) {
          return reason.name;
        }
      }
      return reasonId;
    },

    dateConverter(dateString) {
      if (dateString) {
        return new Date(dateString).toISOString().split('T')[0];
      } else {
        return null;
      }
    },
  },
};
</script>
