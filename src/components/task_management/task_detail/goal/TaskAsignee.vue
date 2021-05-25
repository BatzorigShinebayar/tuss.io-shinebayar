<template>
  <div class="card bg-light p-3 mb-4">
    <h5 class="font-weight-bold mb-2">Main assignee</h5>

    <div v-if="taskDetail.object">
      <ProfileAvatar
        :partnerId="taskDetail.object.executing_employee.id"
        size="lg"
      />

      <p class="font-weight-bold mb-3">
        {{ taskDetail.object.executing_employee.name }}
        {{ taskDetail.object.executing_employee.last_name }}
      </p>

      <!--<p>Digital system architect</p>-->

      <p class="mb-1">Task team</p>
      <div v-if="taskTeams">
        <ProfileAvatar
          v-for="team in taskTeams"
          :key="team.id"
          :partnerId="team.team_member"
          size="sm"
          class="d-inline text-primary mr-2"
        />
      </div>
    </div>

    <hr />

    <p class="font-weight-bold">Progress towards your task goal</p>
    <p class="mb-2">Goal set properly is halfway done!</p>

    <h4 class="text-primary mb-2">{{ value }}%</h4>

    <b-progress
      :value="value"
      :max="max"
      variant="primary"
      height="5px"
    ></b-progress>

    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <p>Define Problem that your company is facing</p>
      <Fa :icon="['fas', 'check-circle']" size="2x" class="text-primary ml-2" />
    </div>

    <hr />

    <div class="d-flex justify-content-between align-items-center">
      <p>Define your Glossaries you will use in the goal</p>
      <Fa :icon="['fas', 'check-circle']" size="2x" class="text-primary ml-2" />
    </div>

    <hr />

    <div class="d-flex justify-content-between align-items-center">
      <p>Define task goal and objectives you want to achieve</p>
      <Fa :icon="['fas', 'check-circle']" size="2x" class="text-primary ml-2" />
    </div>
  </div>
</template>

<script>
import ProfileAvatar from '@/components/shared_elements/ProfileAvatar';

export default {
  name: 'TaskAsignee',

  components: {
    ProfileAvatar,
  },

  data() {
    return {
      taskTeams: null,
      value: 66,
      max: 100,
    };
  },

  inject: ['taskDetail'],

  watch: {
    taskDetail: {
      handler() {
        this.getTaskTeamsByTaskId();
      },
      deep: true,
    },
  },

  mounted() {
    this.getTaskTeamsByTaskId();
  },

  methods: {
    getTaskTeamsByTaskId() {
      const params = this.taskDetail.object.id + '/?active=1';
      this.$store.dispatch('getTaskTeamsByTaskId', params).then((response) => {
        this.taskTeams = response.data.results;
      });
    },
  },
};
</script>
