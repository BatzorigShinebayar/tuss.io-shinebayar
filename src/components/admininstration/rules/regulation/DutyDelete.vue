<template>
  <b-modal id="duty-delete-modal" title="">
    <h4 class="text-center mb-2">Are you sure to delete?</h4>
    <h5 v-if="duty" class="text-center">{{ duty.code }} | {{ duty.name }}</h5>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-center mb-4">
        <b-button
          variant="secondary"
          class="mr-3"
          size="lg"
          @click="closeDeleteModal"
          >No</b-button
        >
        <b-button variant="danger" size="lg" @click="deleteRegulation">
          Yes
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DutyDelete',

  props: {
    duty: {
      type: Object,
    },
  },

  methods: {
    closeDeleteModal() {
      this.$bvModal.hide('duty-delete-modal');
    },

    deleteRegulation() {
      this.$bvModal.hide('duty-delete-modal');

      const payload = { id: this.duty.id };

      const url = '/pages/company_builder/regulation/duty/';

      axios.delete(url, { data: payload }).then(() => {
        this.$emit('reload', true);
      });
    },
  },
};
</script>
