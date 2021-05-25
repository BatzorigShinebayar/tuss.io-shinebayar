<template>
  <b-sidebar
    id="task-edit"
    title="Edit task"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div class="p-4">
      <TaskName
        :formSubmit="formSubmit"
        :defaultValue="taskNameDefault"
        @getName="getName"
      />
      <TaskDepartment
        :formSubmit="formSubmit"
        :defaultValue="departmentDefault"
        @getDepartment="getDepartment"
      />
      <TaskType
        :formSubmit="formSubmit"
        :defaultValue="taskTypesSelectedDefault"
        @getType="getTaskType"
      />
      <TaskFunction
        :formSubmit="formSubmit"
        :defaultValue="functionsSelectedDefault"
        @getFunction="getFunction"
      />

      <TaskExecutor @executor="getExecutor" :default="taskExecutorDefault" />
      <p
        v-if="!this.$v.taskExecutor.required && formSubmit"
        class="text-danger mb-4"
      >
        Task executor is required
      </p>
    </div>
    <template #footer>
      <div class="bg-light d-flex justify-content-between py-3 px-4">
        <b-button-group size="lg" class="w-100">
          <b-button variant="deep-blue" @click="createTask">
            Save task
          </b-button>
          <b-button variant="outline-deep-blue" @click="closeTask">
            Cancel
          </b-button>
        </b-button-group>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import axios from 'axios';
import { required, maxLength } from 'vuelidate/lib/validators';
import TaskName from '@/components/task_management/task_list/create/TaskName';
import TaskDepartment from '@/components/task_management/task_list/create/TaskDepartment';
import TaskType from '@/components/task_management/task_list/create/TaskType';
import TaskFunction from '@/components/task_management/task_list/create/TaskFunction';
import TaskExecutor from '@/components/task_management/task_list/create/TaskExecutor';

export default {
  name: 'TaskEdit',

  components: {
    TaskName,
    TaskDepartment,
    TaskType,
    TaskFunction,
    TaskExecutor,
  },

  inject: ['taskDetail'],

  props: {
    json: {
      type: Object,
      default() {
        return null;
      },
    },
  },

  data() {
    return {
      taskName: null,
      taskNameDefault: null,
      departmentDefault: null,
      departmentSelected: null,
      departmentManager: null,
      taskTypesSelected: null,
      taskTypesSelectedDefault: null,
      functionsSelected: null,
      functionsSelectedDefault: null,
      taskFrequency: null,
      selectedAlgorithm: null,
      taskExecutor: null,
      taskExecutorDefault: null,
      taskTeam: null,
      taskStageGroup: null,
      formSubmit: false,
      dateError: false,
      taskStatusMessage: null,
      toastCounter: 0,
      newTaskId: 0,
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.sub_function,
        };
      },
    };
  },

  watch: {
    json() {
      this.loadData();
    },
  },

  validations: {
    taskName: { required, maxLength: maxLength(255) },
    departmentSelected: { required },
    taskTypesSelected: { required },
    functionsSelected: { required },
    taskExecutor: { required },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    getName(value) {
      this.taskName = value;
    },

    getDepartment(value) {
      this.departmentManager = value.departmentManager;
      this.departmentSelected = value.departmentId;
    },

    getTaskType(value) {
      this.taskTypesSelected = value;
    },

    getFunction(value) {
      this.functionsSelected = value;
    },

    loadData() {
      this.taskName = this.json.name;
      this.taskNameDefault = this.json.name;
      this.departmentSelected = this.json.department_id;
      this.departmentDefault = this.json.department_id;
      this.taskTypesSelected = this.json.task_type;
      this.taskTypesSelectedDefault = this.json.task_type;
      this.functionsSelected = this.json.sub_function_id;
      this.functionsSelectedDefault = this.json.sub_function_id;
      this.taskFrequency = this.json.frequency;
      this.selectedAlgorithm = this.json.algorithm;
      this.taskExecutor = this.json.executing_employee;
      this.taskExecutorDefault = this.json.executing_employee;
      this.taskStage = this.json.task_stage_groups;
      this.startDate = this.json.start_date;
      this.endDate = this.json.end_date;
      this.taskTeam = this.json.task_team;
    },

    taskStatusSuccess() {
      this.$bvToast.toast('Task edited', {
        title: 'Task',
        appendToast: true,
        variant: 'primary',
        solid: true,
        toaster: 'b-toaster-bottom-right',
        'no-auto-hide': false,
      });
    },

    taskStatusFail() {
      this.$bvToast.toast('Something went wrong, Please try again.', {
        title: 'Task',
        appendToast: true,
        variant: 'danger',
        solid: true,
        toaster: 'b-toaster-bottom-right',
        'no-auto-hide': false,
      });
    },

    closeTask() {
      this.$root.$emit('bv::toggle::collapse', 'task-edit');
    },

    getFrequency(value) {
      if (this.taskFrequency) {
        const startEpoch = Date.parse(value.startDate);
        const endEpoch = Date.parse(value.endDate);
        this.dateError = endEpoch < startEpoch;
      }
      this.taskFrequency = value;
    },

    getAlgorithm(value) {
      this.selectedAlgorithm = value;
    },

    getExecutor(executor) {
      this.taskExecutor = executor;
    },

    getTaskTeam(team) {
      this.taskTeam = team;
    },

    getTaskStage(stage) {
      this.taskStageGroup = stage;
    },

    createTask() {
      // form validation
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const jsonData = this.taskDetail.object.json_data;
        const taskId = this.taskDetail.object.id;
        const url = `pages/plan/task_update/${taskId}/`;

        jsonData.name = this.taskName;
        jsonData.department_id = this.departmentSelected;
        jsonData.task_type = this.taskTypesSelected;
        jsonData.sub_function_id = this.functionsSelected;
        jsonData.executing_employee = this.taskExecutor;

        const payload = {
          id: taskId,
          algorithm: jsonData.algorithm,
          created_user: jsonData.created_user,
          department_id: jsonData.department_id,
          end_date: jsonData.end_date,
          executing_employee: jsonData.executing_employee,
          initiator: jsonData.initiator,
          is_repeated: jsonData.is_repeated,
          name: jsonData.name,
          organization: jsonData.organization,
          planned_end_date: jsonData.end_date,
          planned_start_date: jsonData.start_date,
          start_date: jsonData.start_date,
          sub_function_id: jsonData.sub_function_id,
          task_stage_groups: jsonData.task_stage_groups,
          task_team: jsonData.task_team,
          task_type: jsonData.task_type,
          updated_user: this.$store.getters.user.id,
          task_state: 'draft',
          code: this.taskDetail.object.code,
        };

        //checking has frequency
        if (jsonData.frequency) {
          payload.frequency = jsonData.frequency;
        }

        axios
          .post(url, payload)
          .then(() => {
            this.$root.$emit('bv::toggle::collapse', 'task-edit');
            this.$parent.$emit('reload', true);
            this.taskStatusSuccess();
          })
          .catch(() => {
            this.taskStatusFail();
          });
      }
    },

    // one time-----------------------------------------------------------------
    GenerateOneTime() {
      const fullStage = [];
      let algorithm;

      for (const storeAlgorithm of this.$store.getters.company.algorithm) {
        if (this.selectedAlgorithm === storeAlgorithm.id) {
          algorithm = storeAlgorithm;
          break;
        }
      }

      for (const stageGroup of algorithm.stage_groups) {
        if (stageGroup.is_active === '1') {
          for (const sData of this.taskStageGroup) {
            if (sData.id === stageGroup.id) {
              const subStages = [];

              for (const subStg of stageGroup.stages) {
                if (!subStg.is_condition && subStg.is_active === '1') {
                  const currentUser = this.$store.getters.user.id;
                  const stgDict = {
                    start_date: sData.start,
                    end_date: sData.end,
                    planned_start_date: sData.start,
                    planned_end_date: sData.end,
                    created_user: currentUser,
                    updated_user: currentUser,
                    employee: sData.employee,
                    sequence: subStg.sequence,
                    stage: subStg.id,
                    planned_work_hour: null,
                    work_hour: null,
                  };
                  subStages.push(stgDict);
                }
              }

              const fullStageDict = {
                start_date: sData.start,
                end_date: sData.end,
                planned_start_date: sData.start,
                planned_end_date: sData.end,
                is_last: stageGroup.is_last,
                sequence: stageGroup.sequence,
                stage_group: sData.id,
                employee: sData.employee,
                planned_work_hour: null,
                work_hour: null,
                task_stages: subStages,
              };
              fullStage.push(fullStageDict);
            }
          }
        }
      }

      return fullStage;
    },
    // -------------------------------------------------------------------------

    // aweekly-------------------------------------------------------------------
    GenerateWeekly() {
      const repeat = this.taskFrequency.repeat;
      const result = [];

      for (const task of this.taskStageGroup) {
        if (task.is_repeated) {
          const duration = task.end - task.start;
          let dayName;
          if (task.start === 1) {
            dayName = 'mon';
          } else if (task.start === 2) {
            dayName = 'tue';
          } else if (task.start === 3) {
            dayName = 'wed';
          } else if (task.start === 4) {
            dayName = 'thu';
          } else if (task.start === 5) {
            dayName = 'fri';
          } else if (task.start === 6) {
            dayName = 'sat';
          } else if (task.start === 7) {
            dayName = 'sun';
          }

          const nextDay = this.getNextDayOfTheWeek(dayName, false);
          const epochDay = duration * 1000 * 60 * 60 * 24;
          const epochDate = nextDay.getTime() + epochDay;
          const endDay = new Date(epochDate);
          const total = { start: nextDay, end: endDay };

          let i;
          for (i = 0; i < repeat; i++) {
            const repeated = this.repeaterWeekly(total, i, task.id);
            result.push(repeated[0]);
          }
        } else {
          const total = { start: task.start, end: task.end };
          const repeated = this.repeaterWeekly(total, 0, task.id, false);
          result.push(repeated[0]);
        }
      }

      result[result.length - 1].is_last = true;
      return result;
    },

    getNextDayOfTheWeek(
      dayName,
      excludeToday = true,
      refDate = new Date(this.taskFrequency.startDate)
    ) {
      const dayOfWeek = [
        'sun',
        'mon',
        'tue',
        'wed',
        'thu',
        'fri',
        'sat',
      ].indexOf(dayName.slice(0, 3).toLowerCase());
      if (dayOfWeek < 0) return;
      refDate.setHours(0, 0, 0, 0);
      refDate.setDate(
        refDate.getDate() +
          +!!excludeToday +
          ((dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7)
      );
      return refDate;
    },

    repeaterWeekly(context, repeat, task_stage_group_id, can_repeat = true) {
      let startDate = '';
      let endDate = '';
      if (can_repeat) {
        const start = context.start;
        const end = context.end;
        const epochDay = repeat * 7 * 1000 * 60 * 60 * 24;
        const epochStart = start.getTime() + epochDay;
        const epochEnd = end.getTime() + epochDay;

        // startDate = new Date(epochStart).toISOString().slice(0, 10);
        // endDate = new Date(epochEnd).toISOString().slice(0, 10);
        startDate = this.dateToString(new Date(epochStart));
        endDate = this.dateToString(new Date(epochEnd));
      } else {
        startDate = context.start;
        endDate = context.end;
      }
      const fullStage = [];
      let algorithm;

      for (const storeAlgorithm of this.$store.getters.company.algorithm) {
        if (this.selectedAlgorithm === storeAlgorithm.id) {
          algorithm = storeAlgorithm;
          break;
        }
      }

      for (const stageGroup of algorithm.stage_groups) {
        if (stageGroup.is_active === '1') {
          for (const sData of this.taskStageGroup) {
            if (
              sData.id === stageGroup.id &&
              task_stage_group_id === sData.id
            ) {
              const subStages = [];

              for (const subStg of stageGroup.stages) {
                if (!subStg.is_condition && subStg.is_active === '1') {
                  const currentUser = this.$store.getters.user.id;
                  subStages.push({
                    start_date: startDate,
                    end_date: endDate,
                    planned_start_date: startDate,
                    planned_end_date: endDate,
                    created_user: currentUser,
                    updated_user: currentUser,
                    employee: sData.employee,
                    sequence: subStg.sequence,
                    stage: subStg.id,
                    planned_work_hour: null,
                    work_hour: null,
                  });
                }
              }

              fullStage.push({
                start_date: startDate,
                end_date: endDate,
                planned_start_date: startDate,
                planned_end_date: endDate,
                is_last: false,
                sequence: stageGroup.sequence,
                stage_group: sData.id,
                employee: sData.employee,
                planned_work_hour: null,
                work_hour: null,
                task_stages: subStages,
              });
            }
          }
        }
      }
      return fullStage;
    },
    // -------------------------------------------------------------------------

    // monthly------------------------------------------------------------------
    GenerateMonthly() {
      const repeat = this.taskFrequency.repeat;
      const result = [];

      for (const task of this.taskStageGroup) {
        if (task.is_repeated) {
          let i;
          for (i = 0; i < repeat; i++) {
            const today = new Date(this.taskFrequency.startDate);
            let start;
            let end;

            const checkDate = new Date(this.taskFrequency.startDate);
            checkDate.setDate(task.start);

            if (today <= checkDate) {
              start = new Date(today.setDate(task.start));
              end = new Date(today.setDate(task.end));
            } else {
              start = new Date(today.setMonth(today.getMonth() + 1));
              start = new Date(start.setDate(task.start));
              end = new Date(today.setDate(task.end));
            }

            const newStart = new Date(start.setMonth(start.getMonth() + i))
              .toISOString()
              .slice(0, 10);
            const newEnd = new Date(end.setMonth(end.getMonth() + i))
              .toISOString()
              .slice(0, 10);

            const repeated = this.repeater(newStart, newEnd, task.id);
            for (const single of repeated) {
              result.push(single);
            }
          }
        } else {
          const repeated = this.repeater(task.start, task.end, task.id);
          for (const single of repeated) {
            result.push(single);
          }
        }
      }
      result[result.length - 1].is_last = true;
      return result;
    },
    // -------------------------------------------------------------------------

    // quarterly----------------------------------------------------------------
    GenerateQuarterly() {
      const repeat = this.taskFrequency.repeat;
      const result = [];

      for (const task of this.taskStageGroup) {
        if (task.is_repeated) {
          let i;
          for (i = 0; i < repeat; i++) {
            const today = new Date(this.taskFrequency.startDate);
            let start;
            let end;

            const checkDate = new Date(this.taskFrequency.startDate);
            checkDate.setDate(task.start);

            if (today <= checkDate) {
              start = new Date(today.setDate(task.start));
              end = new Date(today.setDate(task.end));
            } else {
              start = new Date(today.setMonth(today.getMonth() + 1));
              start = new Date(start.setDate(task.start));
              end = new Date(today.setDate(task.end));
            }

            const newStart = new Date(start.setMonth(start.getMonth() + i * 3))
              .toISOString()
              .slice(0, 10);
            const newEnd = new Date(end.setMonth(end.getMonth() + i * 3))
              .toISOString()
              .slice(0, 10);

            const repeated = this.repeater(newStart, newEnd, task.id);
            for (const single of repeated) {
              result.push(single);
            }
          }
        } else {
          const repeated = this.repeater(task.start, task.end, task.id);
          for (const single of repeated) {
            result.push(single);
          }
        }
      }
      result[result.length - 1].is_last = true;
      return result;
    },
    // -------------------------------------------------------------------------

    // b-annual-----------------------------------------------------------------
    GenerateBiAnnual() {
      const repeat = this.taskFrequency.repeat;
      const result = [];

      for (const task of this.taskStageGroup) {
        if (task.is_repeated) {
          let i;
          for (i = 0; i < repeat; i++) {
            const today = new Date(this.taskFrequency.startDate);
            let start;
            let end;

            const checkDate = new Date(this.taskFrequency.startDate);
            checkDate.setDate(task.start);

            if (today <= checkDate) {
              start = new Date(today.setDate(task.start));
              end = new Date(today.setDate(task.end));
            } else {
              start = new Date(today.setMonth(today.getMonth() + 1));
              start = new Date(start.setDate(task.start));
              end = new Date(today.setDate(task.end));
            }

            const newStart = new Date(start.setMonth(start.getMonth() + i * 6))
              .toISOString()
              .slice(0, 10);
            const newEnd = new Date(end.setMonth(end.getMonth() + i * 6))
              .toISOString()
              .slice(0, 10);
            const repeated = this.repeater(newStart, newEnd, task.id);
            for (const single of repeated) {
              result.push(single);
            }
          }
        } else {
          const repeated = this.repeater(task.start, task.end, task.id);
          for (const single of repeated) {
            result.push(single);
          }
        }
      }
      result[result.length - 1].is_last = true;
      return result;
    },
    // -------------------------------------------------------------------------

    // annual-------------------------------------------------------------------
    GenerateAnnually() {
      const repeat = this.taskFrequency.repeat;
      const result = [];

      for (const task of this.taskStageGroup) {
        if (task.is_repeated) {
          let i;
          for (i = 0; i < repeat; i++) {
            const today = new Date(this.taskFrequency.startDate);
            let start;
            let end;

            const checkDate = new Date(this.taskFrequency.startDate);
            checkDate.setDate(task.start);

            if (today <= checkDate) {
              start = new Date(today.setDate(task.start));
              end = new Date(today.setDate(task.end));
            } else {
              start = new Date(today.setMonth(today.getMonth() + 1));
              start = new Date(start.setDate(task.start));
              end = new Date(today.setDate(task.end));
            }

            const newStart = new Date(
              start.setFullYear(start.getFullYear() + i)
            )
              .toISOString()
              .slice(0, 10);
            const newEnd = new Date(end.setFullYear(end.getFullYear() + i))
              .toISOString()
              .slice(0, 10);

            const repeated = this.repeater(newStart, newEnd, task.id);
            for (const single of repeated) {
              result.push(single);
            }
          }
        } else {
          const repeated = this.repeater(task.start, task.end, task.id);
          for (const single of repeated) {
            result.push(single);
          }
        }
      }
      result[result.length - 1].is_last = true;
      return result;
    },
    // -------------------------------------------------------------------------

    repeater(startDate, endDate, task_stage_group_id) {
      const fullStage = [];
      let algorithm;

      for (const storeAlgorithm of this.$store.getters.company.algorithm) {
        if (this.selectedAlgorithm === storeAlgorithm.id) {
          algorithm = storeAlgorithm;
          break;
        }
      }

      for (const stageGroup of algorithm.stage_groups) {
        if (stageGroup.is_active === '1') {
          for (const sData of this.taskStageGroup) {
            if (
              sData.id === stageGroup.id &&
              task_stage_group_id === sData.id
            ) {
              const subStages = [];

              for (const subStg of stageGroup.stages) {
                if (!subStg.is_condition && subStg.is_active === '1') {
                  const currentUser = this.$store.getters.user.id;
                  subStages.push({
                    start_date: startDate,
                    end_date: endDate,
                    planned_start_date: startDate,
                    planned_end_date: endDate,
                    created_user: currentUser,
                    updated_user: currentUser,
                    employee: sData.employee,
                    sequence: subStg.sequence,
                    stage: subStg.id,
                    planned_work_hour: null,
                    work_hour: null,
                  });
                }
              }

              fullStage.push({
                start_date: startDate,
                end_date: endDate,
                planned_start_date: startDate,
                planned_end_date: endDate,
                is_last: false,
                sequence: stageGroup.sequence,
                stage_group: sData.id,
                employee: sData.employee,
                planned_work_hour: null,
                work_hour: null,
                task_stages: subStages,
              });
            }
          }
        }
      }
      return fullStage;
    },

    //converting date object to string /yyyy-mm-dd/
    dateToString(dateObj) {
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
