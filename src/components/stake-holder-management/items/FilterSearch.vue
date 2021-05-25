<template>
  <div>
    <div v-b-modal.modal-1 class="task-control mr-3" @click="clear">
      <i class="bx bxs-filter-alt"></i>Шүлтүүр
    </div>

    <b-modal id="modal-1">
      <template #modal-header="{ close }">
        <p><i class="bx bxs-filter-alt"></i> Шүүлтүүр</p>
        <i class="bx bx-x close cursor-pointer" @click="close()"></i>
      </template>
      <div v-for="(item, key) in table.tableField" :key="key">
        <div v-if="item.Filter" class="p-2">
          <b-form-group
            v-if="item.Filter.type === 'textfield'"
            label-cols="4"
            label-cols-lg="3"
            :label="item.title"
            label-for="task-filter-name"
          >
            <b-form-input
              v-model="table.filterValue[item.name]"
              :placeholder="item.title"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            v-if="item.Filter.type === 'multiselect'"
            :label="item.title"
            label-for="search-filter-employee"
          >
            <multiselect
              id="search-filter-employee"
              v-model="selectedEmployees.id"
              :multiple="true"
              :options="optionList"
              :close-on-select="false"
              :preserve-search="true"
              placeholder="- Сонгох -"
              label="text"
              track-by="value"
            >
              <template slot="selection" slot-scope="{ values, isOpen }"
                ><span
                  v-if="values.length &amp;&amp; !isOpen"
                  class="multiselect__single"
                  >{{ values.length }} ажилтан</span
                ></template
              >
            </multiselect>
          </b-form-group>
        </div>
      </div>
      <template #modal-footer="{ cancel }">
        <div class="w-100">
          <b-button
            variant="primary"
            class="ml-2 float-right"
            @click="doFilter"
          >
            Хайх
          </b-button>
          <b-button
            variant="outline-secondary"
            class="float-right"
            @click="cancel()"
          >
            Цуцлах
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'FilterSearch',

  components: {
    multiselect: Multiselect,
  },

  props: {
    tableProp: {
      type: Object,
      default: () => {},
    },
    employeeList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      table: [],
      selectedEmployees: [],
    };
  },

  computed: {
    optionList() {
      const empl = [];
      for (const i in this.employeeList) {
        empl.push({
          value: this.employeeList[i].id,
          text:
            this.employeeList[i].last_name + ' ' + this.employeeList[i].name,
        });
      }

      return empl;
    },
  },

  mounted() {
    this.table = this.tableProp;
  },

  methods: {
    clear() {
      this.selectedEmployees = [];
    },
    doFilter() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow');
      this.table.filterActive = true;
      const employeeName = {};
      for (const key in this.selectedEmployees) {
        if (Array.isArray(this.selectedEmployees[key])) {
          employeeName.name = [];
          for (const index in this.selectedEmployees[key]) {
            // employeeName[key].push(this.selectedEmployees[key][index].text);
            employeeName.name.push({
              fullName: this.selectedEmployees[key][index].text,
              id: this.selectedEmployees[key][index].value,
            });
          }
        }
      }
      const filterVal = this.table.filterValue;
      this.table.filterValue = Object.assign({}, employeeName, filterVal);
      for (const key in this.table.filterValue) {
        for (const item in this.table.tableField) {
          if (key === this.table.tableField[item].name) {
            const value = this.table.filterValue[key];
            this.table.filterValue[key] = {};
            this.table.filterValue[key].label =
              this.table.tableField[item].title;
            this.table.filterValue[key].data = value;
          }
        }
      }
      this.$emit('update:table', this.table);
      // console.log(this.$emit('filterData'));
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
