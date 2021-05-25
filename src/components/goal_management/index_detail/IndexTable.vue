<template>
  <div class="mt-4 mb-5">
    <b-table
      striped
      :hover="true"
      :items="realization"
      :fields="tableField"
      :responsive="true"
    >
      <template #cell(employee)="data">
        <div class="text-nowrap">
          {{ data.item.employee | get_employee_info }}
        </div>
      </template>
      <template #cell(actions)="data">
        <div class="show-cell">
          <a class="cursor-pointer mr-1" v-if="permission('indx_rlz_upd')">
            <Fa :icon="['fas', 'cog']" @click="setEdit(data.item)" />
          </a>
          <a class="cursor-pointer" v-if="permission('indx_rlz_del')">
            <Fa :icon="['fas', 'trash']" @click="setDelete(data.item)" />
          </a>
        </div>
      </template>
    </b-table>

    <b-modal id="realization-delete" title="">
      <h4 class="text-center mb-3">Are you sure to delete?</h4>
      <h5 class="text-center">
        {{ nameDelete }}
      </h5>
      <template #modal-footer>
        <div class="w-100 d-flex justify-content-center mb-4">
          <b-button
            variant="secondary"
            class="mr-3"
            size="lg"
            @click="closeModal"
          >
            No
          </b-button>
          <b-button variant="danger" size="lg" @click="deleteIndex">
            Yes
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IndexTable',

  props: {
    realization: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      name: null,
      data: null,
      rotation: 0,
      tableField: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'employee',
          label: 'Employee',
        },
        {
          key: 'value',
          label: 'Value',
        },
        {
          key: 'state',
          label: 'State',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      nameDelete: null,
      realizationId: null,
    };
  },

  methods: {
    closeModal() {
      this.$bvModal.hide('realization-delete');
    },

    setEdit(index) {
      this.$store.commit('selectedIndex', index);
      this.$root.$emit('bv::toggle::collapse', 'realization-edit');
    },

    setDelete(index) {
      this.nameDelete = index.description;
      this.realizationId = index.id;
      this.$bvModal.show('realization-delete');
    },

    deleteIndex() {
      this.$bvModal.hide('realization-delete');

      const url = `/pages/goal/deactivate_index_realization/${this.realizationId}/`;

      axios.post(url).then(() => {
        this.$emit('reload', true);
      });
    },
  },
};
</script>
