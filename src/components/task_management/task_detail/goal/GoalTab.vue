<template>
  <div class="mt-4 mb-5">
    <div class="row">
      <div class="col-lg-2">
        <TaskAsignee />
      </div>
      <div class="col-lg-10">
        <TaskSummary />
        <TaskProblem />
        <TaskGoal />
        <TaskGlossary />
      </div>
    </div>
  </div>
</template>

<script>
import TaskSummary from '@/components/task_management/task_detail/goal/TaskSummary';
import TaskProblem from '@/components/task_management/task_detail/goal/TaskProblem';
import TaskGoal from '@/components/task_management/task_detail/goal/TaskGoal';
import TaskGlossary from '@/components/task_management/task_detail/goal/TaskGlossary';
import TaskAsignee from '@/components/task_management/task_detail/goal/TaskAsignee';

export default {
  name: 'GoalTab',

  components: {
    TaskAsignee,
    TaskGlossary,
    TaskGoal,
    TaskProblem,
    TaskSummary,
  },
};
</script>
