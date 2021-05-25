<template>
  <div class="task-side-menu">
    <a class="task-side-menu-toggler">
      <Fa :icon="['fas', 'caret-left']" fixed-width @click="toggler" />
    </a>

    <div class="task-side-menu-header p-3">
      <h5 class="font-weight-bold mb-2">Task management</h5>

      <b-input-group label="Task name" class="search-task mb-3">
        <template #append>
          <b-input-group-text @click="searchTask">
            <Fa :icon="['fas', 'search']" />
          </b-input-group-text>
        </template>
        <b-form-input
          placeholder="Search task"
          v-model="search"
          @keydown.native="searchEnterHandler"
        ></b-form-input>
      </b-input-group>

      <div class="d-flex justify-content-between align-items-center">
        <TaskDetailFilter @reload="taskFilter" />
        <div class="d-flex align-items-center">
          <Fa
            :icon="['fas', 'chevron-left']"
            class="task-side-menu-control"
            @click="taskPagePrev"
          />
          <b-input
            id="task-side-menu-page"
            class="task-side-menu-page"
            type="text"
            v-model="page"
            @keypress="numberOnly"
            @input="pageChange"
            @keydown.native="goToPage"
          ></b-input>
          <Fa
            :icon="['fas', 'chevron-right']"
            class="task-side-menu-control"
            @click="taskPageNext"
          />
        </div>
        <b-tooltip target="task-side-menu-page" triggers="hover">
          {{ page }} of {{ maxPage }}
        </b-tooltip>
      </div>

      <b-button
        class="mt-3"
        @click="clear"
        variant="primary"
        block
        size="sm"
        v-if="taskFiltered"
      >
        Clear filter
      </b-button>
    </div>

    <div class="task-side-menu-footer">
      <simplebar data-simplebar-auto-hide="false" class="h-100">
        <a
          v-for="task in taskList"
          :key="task.id"
          class="task-menu-task-item"
          @click="loadTaskDetail(task.id)"
          :class="setActiveClass(task.id)"
        >
          <p class="task-menu-title">{{ task.name }}</p>
          <b-badge v-if="task.task_state !== 'draft'" variant="success">
            {{ task.task_state }}
          </b-badge>
          <b-badge v-else variant="warning" class="text-white">
            {{ task.task_state }}
          </b-badge>
        </a>
      </simplebar>
    </div>
  </div>
</template>

<script>
import TaskDetailFilter from '@/components/task_management/task_detail/TaskDetailFilter';
import simplebar from 'simplebar-vue';
import axios from 'axios';

export default {
  name: 'TaskSideMenu',

  components: {
    TaskDetailFilter,
    simplebar,
  },

  computed: {
    activeCompany() {
      return this.$store.getters.activeCompany;
    },
  },

  data() {
    return {
      search: this.$route.query.search || null,
      year: this.$route.query.year || null,
      organization: this.$route.query.organization || null,
      task_type: this.$route.query.task_type || null,
      sub_function_id: this.$route.query.sub_function_id || null,
      department_id: this.$route.query.department_id || null,
      algorithm: this.$route.query.algorithm || null,
      task_state: this.$route.query.task_state || null,
      executing_employee: this.$route.query.executing_employee || null,
      start_date: this.$route.query.start_date || null,
      end_date: this.$route.query.end_date || null,
      page: 1,
      maxPage: 0,
      taskCount: 0,
      filterClear: false,
      taskList: [],
      taskYear: null,
      taskYearList: [
        { value: 2020, text: '2020' },
        { value: 2021, text: '2021' },
        { value: 2022, text: '2022' },
        { value: 2023, text: '2023' },
        { value: 2024, text: '2024' },
      ],
      taskFiltered: false,
    };
  },

  created() {
    this.taskYear = new Date().getFullYear();
    const params = this.$route.query;

    if (params.page) {
      this.page = params.page;
    }

    if (params.search) {
      this.search = params.search;
    }
  },

  mounted() {
    const query = this.$route.query;

    if (query.search) {
      this.taskFiltered = true;
    }
    if (query.task_type) {
      this.taskFiltered = true;
    }
    if (query.sub_function_id) {
      this.taskFiltered = true;
    }
    if (query.department_id) {
      this.taskFiltered = true;
    }
    if (query.algorithm) {
      this.taskFiltered = true;
    }
    if (query.task_state) {
      this.taskFiltered = true;
    }
    if (query.executing_employee) {
      this.taskFiltered = true;
    }
    if (query.start_date) {
      this.taskFiltered = true;
    }
    if (query.end_date) {
      this.taskFiltered = true;
    }

    this.loadTaskList();
  },

  methods: {
    toggler() {
      const menu = document.querySelector('.task-side-menu');
      menu.classList.toggle('reverse');
      document.body.classList.toggle('submenu-active');
    },

    // load task list
    loadTaskList() {
      const query = this.$route.query;
      query.ordering = '-created_date';
      const url = `/pages/plan/list_task_stat/${this.activeCompany}/${this.taskYear}/`;
      this.taskList = [];

      axios.get(url, { params: query }).then((response) => {
        this.taskCount = response.data.total;
        this.taskList = response.data.results;
        this.maxPage = Math.ceil(this.taskCount / 50);
      });
    },

    // task name search
    async searchTask() {
      if (!this.search) {
        return;
      }
      this.taskFiltered = true;
      this.page = 1;

      const query = {
        search: this.search,
      };

      if (this.$route.query.search !== this.search) {
        await this.$router.replace({ query });
      }

      this.loadTaskList();
    },

    searchEnterHandler(event) {
      if (event.which === 13) {
        this.taskFiltered = true;
        this.loadTaskList();
      }
    },

    // clear
    async clear() {
      this.search = null;
      this.page = 1;

      const query = Object.assign({}, this.$route.query);
      delete query.search;
      delete query.page;
      delete query.task_type;
      delete query.sub_function_id;
      delete query.department_id;
      delete query.algorithm;
      delete query.task_state;
      delete query.executing_employee;
      delete query.start_date;
      delete query.end_date;

      try {
        await this.$router.replace({ query });
      } catch (error) {
        this.loadTaskList();
        return;
      }

      this.loadTaskList();
      this.taskFiltered = false;
    },

    //pagination
    async taskPagination(page) {
      this.page = page;
      const query = Object.assign({}, this.$route.query);
      query.page = page;
      await this.$router.replace({ query });
      this.loadTaskList();
    },

    numberOnly($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    pageChange($event) {
      if ($event > 999) {
        this.page = this.maxPage;
      }
    },

    async goToPage(event) {
      if (event.which === 13) {
        if (this.page <= this.maxPage) {
          const query = {
            ...this.$route.query,
            page: this.page,
          };

          if (this.$route.query.page !== this.page) {
            await this.$router.replace({ query });
          }
          this.loadTaskList();
        } else {
          this.page = this.maxPage;
          this.loadTaskList();
        }
      }
    },

    async taskPagePrev() {
      if (this.page > 1) {
        this.page--;
        const query = {
          ...this.$route.query,
          page: this.page,
        };

        if (this.$route.query.page !== this.page) {
          await this.$router.replace({ query });
        }

        this.loadTaskList();
      }
    },

    async taskPageNext() {
      if (this.page < this.maxPage) {
        this.page++;
        const query = {
          ...this.$route.query,
          page: this.page,
        };

        if (this.$route.query.page !== this.page) {
          await this.$router.replace({ query });
        }

        this.loadTaskList();
      }
    },

    //updating parameters
    async loadTaskDetail(taskId) {
      const query = {
        ...this.$route.query,
        id: taskId,
      };

      await this.$router.replace({ query });
    },

    taskFilter() {
      this.taskFiltered = true;
      this.page = 1;
      this.loadTaskList();
    },

    setActiveClass(taskId) {
      if (String(this.$route.query.id) === String(taskId)) {
        return 'active';
      } else {
        return '';
      }
    },
  },
};
</script>
