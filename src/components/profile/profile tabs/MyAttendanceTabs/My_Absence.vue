<template>
  <div>
    <b-table
      striped
      id="leaves_and_vacations"
      :hover="true"
      :fields="leavesField"
      :items="leaves"
    >
    </b-table>
  </div>
</template>

<script>
export default {
  name: "My_Absence",
  data() {
    return {
      leavesField: [
        {
          key: 'checkbox',
          label: '',
        },
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'weekday',
          label: 'Weekday',
          sortable: true,
        },
        {
          key: 'time_in',
          label: 'Time in',
        },
        {
          key: 'time_out',
          label: 'Time out',
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
        },
        {
          key: 'action',
          label: '',
        },
      ],
      leaves: [],
    };
  },
};
</script>

<style scoped>

</style>
