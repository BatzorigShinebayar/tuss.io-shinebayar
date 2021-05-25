<template>
  <div class="lined-card p-3 mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="font-weight-bold">Task Goal</h5>
      <a class="cursor-pointer">
        <Fa :icon="['fas', 'cog']" @click="objectiveEdit" />
      </a>
    </div>
    <p class="mt-3 mb-4">{{ objective }}</p>
    <b-modal id="task-goal-objective-edit" title="Goal objective" hide-footer>
      <b-form-group label="Objective" label-for="edit-stage-code">
        <b-form-textarea
          v-model="newObjective"
          rows="5"
          spellcheck="false"
        ></b-form-textarea>
        <span
          v-if="!$v.newObjective.required && formSubmit"
          class="text-danger"
        >
          Objective is required
        </span>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
          @click="objectiveSave()"
          class="px-4"
        >
          Save
        </b-button>
      </div>
    </b-modal>
    <TaskObjectives />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';
import TaskObjectives from '@/components/task_management/task_detail/goal/TaskObjectives';

export default {
  name: 'TaskGoal',

  components: { TaskObjectives },

  data() {
    return {
      formSubmit: false,
      objective: null,
      newObjective: null,
    };
  },

  validations: {
    newObjective: { required },
  },

  inject: ['taskDetail'],

  watch: {
    taskDetail: {
      handler() {
        this.objectiveLoad();
      },
      deep: true,
    },
  },

  mounted() {
    this.objectiveLoad();
  },

  methods: {
    objectiveLoad() {
      this.objective = this.taskDetail.object.goal_definition;
      this.newObjective = this.taskDetail.object.goal_definition;
    },

    objectiveEdit() {
      this.$bvModal.show('task-goal-objective-edit');
    },

    objectiveSave() {
      this.formSubmit = true;
      this.$v.newObjective.$touch();

      if (!this.$v.newObjective.$invalid) {
        this.$bvModal.hide('task-goal-objective-edit');

        const taskId = this.$route.query.id;
        const url = `/pages/plan/task_goal_update/${taskId}/`;

        const payload = {
          id: taskId,
          goal_definition: this.newObjective,
          updated_user: this.$store.getters.user.id,
        };

        axios.post(url, payload).then(() => {
          this.objective = this.newObjective;
          this.formSubmit = false;
        });
      }
    },
  },
};
</script>
