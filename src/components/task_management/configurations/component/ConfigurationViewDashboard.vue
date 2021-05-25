<template>
  <div>
    <div class="card mini-stats-wid mx-3">
      <div class="card-body flex-space-between h-100">
        <div class="stat ml-4">
          <h4 class="text-muted">Task name:</h4>
          <p class="font-weight-bold pt-3" style="max-width: 300px">
            <router-link
              :to="{
                name: 'task-detail',
                query: {
                  id: configuration.task.id,
                },
              }"
              class="task-link"
            >
              {{ configuration.task.name }}
            </router-link>
          </p>
        </div>
        <div class="stat vl" />
        <div class="stat">
          <div>
            <h4 class="text-muted">Submitted by:</h4>
            <p class="font-weight-bold pt-3">
              {{ configuration.employee | get_employee_info }}
            </p>
          </div>
        </div>
        <div class="stat vl" />
        <div class="stat mr-2">
          <div>
            <h4 class="text-muted">Submitted Date:</h4>
            <p class="font-weight-bold pt-3">
              {{ configuration.sent_date | datetime }}
            </p>
          </div>
        </div>
        <div
          v-if="
            configuration.state === 'draft' || configuration.state === 'confirm'
          "
          class="stat vl"
        />
        <div
          v-if="
            configuration.state === 'draft' || configuration.state === 'confirm'
          "
          class="stat mr-2"
        >
          <div v-if="configuration.state === 'draft'">
            <h4 class="text-muted">Rejected Date:</h4>
            <p class="font-weight-bold pt-3">
              {{ configuration.updated_date | datetime }}
            </p>
          </div>
          <div v-if="configuration.state === 'confirm'">
            <h4 class="text-muted">Confirmed Date:</h4>
            <p class="font-weight-bold pt-3">
              {{ configuration.confirm_date | datetime }}
            </p>
          </div>
        </div>
        <div class="stat vl" />
        <div class="stat">
          <div>
            <h4 class="text-muted">Configured changes:</h4>
            <h5>
              <div
                class="d-flex flex-column pt-2"
                v-if="configuration.description"
              >
                <b-badge class="mb-1" variant="danger"> Rejected </b-badge>
              </div>
              <div class="d-flex flex-column pt-2" v-else>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_dep"
                  variant="primary"
                >
                  Department
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_end_date"
                  variant="primary"
                >
                  Due date
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_start_date"
                  variant="primary"
                >
                  Started date
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_ex_emp"
                  variant="primary"
                >
                  Executing employee
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_name"
                  variant="primary"
                >
                  Task name
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_sfunc"
                  variant="primary"
                >
                  Sub function
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_task_type"
                  variant="primary"
                >
                  Type
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_stagegroup_date"
                  variant="primary"
                >
                  Task stage group date
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.change_stagegroup_employee"
                  variant="primary"
                >
                  Task stage group assignee employee
                </b-badge>
                <b-badge
                  class="mb-1"
                  v-if="configuration.delete_task"
                  variant="danger"
                >
                  Deleting task
                </b-badge>
              </div>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationViewDashboard',
  components: {},
  props: {
    configuration: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
#title {
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
}
</style>
