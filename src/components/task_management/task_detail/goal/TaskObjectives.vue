<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="font-weight-bold">Objectives</h5>
      <a class="cursor-pointer">
        <Fa :icon="['fas', 'plus']" @click="indexSaveModal" />
      </a>
    </div>

    <b-table
      striped
      hover
      :items="savedIndexes"
      :fields="tableFields"
      class="mt-4"
    >
      <template #cell(detail)="row">
        <a class="cursor-pointer text-deep-blue">
          <Fa
            :icon="['fas', 'caret-circle-up']"
            size="2x"
            @click="row.toggleDetails"
            :rotation="row.detailsShowing ? null : 180"
            :class="row.detailsShowing ? 'text-primary' : ''"
          />
        </a>
      </template>
      <template #row-details="row">
        <p>coming soon...</p>
        <p class="d-none">{{ row.item }}</p>
      </template>
      <template #cell(actions)="row">
        <a class="cursor-pointer mr-2">
          <Fa :icon="['fas', 'cog']" @click="indexEditModal(row.item)" />
        </a>
        <a class="cursor-pointer">
          <Fa :icon="['fas', 'trash']" @click="indexDeleteModal(row.item)" />
        </a>
      </template>
    </b-table>

    <b-modal
      id="task-goal-index-save"
      title="Task goal"
      hide-footer
      @show="showSaveModal"
    >
      <b-form-group label="Goal index">
        <b-form-select
          v-model="indexSelected"
          :options="indexList"
          value-field="id"
          text-field="name"
        ></b-form-select>
        <span
          v-if="!$v.indexSelected.required && formSubmitIndex"
          class="text-danger"
        >
          Goal index is required
        </span>
      </b-form-group>
      <b-form-group label="Value">
        <b-form-input type="number" v-model="indexValue"></b-form-input>
        <span
          v-if="!$v.indexValue.required && formSubmitIndex"
          class="text-danger"
        >
          Value is required
        </span>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
          @click="indexSave()"
          class="px-4"
        >
          Add
        </b-button>
      </div>
    </b-modal>

    <b-modal id="task-goal-index-edit" title="Task goal" hide-footer>
      <b-form-group label="Goal index">
        <b-form-select
          v-model="indexSelectedEdit"
          :options="indexList"
          value-field="id"
          text-field="name"
        ></b-form-select>
        <span
          v-if="!$v.indexSelectedEdit.required && formSubmitIndex"
          class="text-danger"
        >
          Goal index is required
        </span>
      </b-form-group>
      <b-form-group label="Value">
        <b-form-input type="number" v-model="indexValueEdit"></b-form-input>
        <span
          v-if="!$v.indexValueEdit.required && formSubmitIndex"
          class="text-danger"
        >
          Value is required
        </span>
      </b-form-group>
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
          @click="indexEditSave()"
          class="px-4"
        >
          Save
        </b-button>
      </div>
    </b-modal>

    <b-modal id="task-goal-index-delete" title="">
      <h4 class="text-center mb-3">Are you sure to delete?</h4>
      <p v-if="indexEdit" class="text-center">{{ indexEdit.name }}</p>
      <template #modal-footer>
        <div class="w-100 d-flex justify-content-center mb-4">
          <b-button
            variant="secondary"
            class="mr-3"
            size="lg"
            @click="indexDeleteModalClose"
          >
            No
          </b-button>
          <b-button variant="danger" size="lg" @click="indexDelete">
            Yes
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'TaskObjectives',

  data() {
    return {
      formSubmitIndex: false,
      indexList: [],
      indexSelected: null,
      indexValue: null,
      savedIndexes: [],
      tableFields: [
        {
          key: 'detail',
          label: '',
        },
        {
          key: 'short_name',
          label: 'Index ID',
        },
        {
          key: 'name',
          label: 'Index name',
        },
        {
          key: 'planned_value',
          label: 'Target value',
        },
        {
          key: 'achieved_value',
          label: 'Achieved value',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      indexEdit: null,
      indexSelectedEdit: null,
      indexValueEdit: null,
    };
  },

  validations: {
    indexSelected: { required },
    indexValue: { required },
    indexSelectedEdit: { required },
    indexValueEdit: { required },
  },

  inject: ['taskDetail'],

  watch: {
    taskDetail: {
      handler() {
        this.indexLoad();
        this.objectiveLoad();
      },
      deep: true,
    },
  },

  mounted() {
    this.indexLoad();
    this.objectiveLoad();
  },

  methods: {
    indexLoad() {
      const company = this.$store.getters.activeCompany;
      const url = `pages/goal/list_goal_index/${company}/`;

      axios.get(url).then((response) => {
        const indexes = [];
        for (const index of response.data.index_list) {
          if (index.active === '1') {
            indexes.push(index);
          }
        }
        this.indexList = indexes;
        this.buildTable();
      });
    },

    objectiveLoad() {
      const url = `pages/plan/get_task_objectives/${this.$route.query.id}/`;

      axios.get(url).then((response) => {
        this.savedIndexes = response.data.results;
        this.buildTable();
      });
    },

    buildTable() {
      if (this.savedIndexes.length > 0 && this.indexList.length > 0) {
        const fullTable = [];
        for (const row of this.savedIndexes) {
          if (row.active === '1') {
            for (const index of this.indexList) {
              if (row.index === index.id) {
                let achievedValue;

                if (row.realizations.length > 0) {
                  achievedValue = '';
                } else {
                  achievedValue = 'N/A';
                }

                row.short_name = index.short_name;
                row.name = index.name;
                row.achieved_value = achievedValue;
              }
            }
            fullTable.push(row);
          }
        }
        this.savedIndexes = fullTable;
      }
    },

    indexSaveModal() {
      this.$bvModal.show('task-goal-index-save');
    },

    showSaveModal() {
      this.indexSelected = null;
      this.indexValue = null;
    },

    indexSave() {
      this.formSubmitIndex = true;
      this.$v.indexSelected.$touch();
      this.$v.indexValue.$touch();

      if (!this.$v.indexSelected.$invalid && !this.$v.indexValue.$invalid) {
        const url = 'pages/plan/task_objective_create/';

        let name = '';
        for (const index of this.indexList) {
          if (index.id === this.indexSelected) {
            name = index.name;
          }
        }

        const payload = {
          task_id: this.$route.query.id,
          index: this.indexSelected,
          name: name,
          planned_value: parseFloat(this.indexValue),
          updated_user: this.$store.getters.user.id,
          created_user: this.$store.getters.user.id,
        };

        axios.post(url, payload).then(() => {
          this.objectiveLoad();
          this.$bvModal.hide('task-goal-index-save');
        });
      }
    },

    indexEditModal(item) {
      this.indexEdit = item;
      this.indexSelectedEdit = item.index;
      this.indexValueEdit = item.planned_value;
      this.$bvModal.show('task-goal-index-edit');
    },

    indexEditSave() {
      const url = `pages/plan/task_objective_update/${this.indexEdit.id}/`;
      const payload = {
        id: this.indexEdit.id,
        task_id: this.$route.query.id,
        index: this.indexSelectedEdit,
        name: this.indexEdit.name,
        planned_value: this.indexValueEdit,
        updated_user: this.$store.getters.user.id,
      };

      axios.post(url, payload).then(() => {
        this.$bvModal.hide('task-goal-index-edit');
        this.objectiveLoad();
      });
    },

    indexDeleteModalClose() {
      this.$bvModal.hide('task-goal-index-delete');
    },

    indexDeleteModal(item) {
      this.indexEdit = item;
      this.$bvModal.show('task-goal-index-delete');
    },

    indexDelete() {
      this.$bvModal.hide('task-goal-index-delete');
      const url = `pages/plan/task_objective_update/${this.indexEdit.id}/`;
      const payload = {
        active: '0',
        id: this.indexEdit.id,
        task_id: this.$route.query.id,
        index: this.indexEdit.index,
        name: this.indexEdit.name,
        planned_value: this.indexEdit.planned_value,
        updated_user: this.$store.getters.user.id,
      };

      axios.post(url, payload).then(() => {
        this.objectiveLoad();
      });
    },
  },
};
</script>
