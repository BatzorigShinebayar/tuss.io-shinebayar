<template>
  <b-modal id="index-deactivate-modal" title="">
    <h4 class="text-center mb-3">Are you sure to delete?</h4>
    <h5 class="text-center" v-if="selectedIndex">
      {{ selectedIndex.indexName }}
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
        <b-button variant="danger" size="lg" @click="deactivateIndex">
          Yes
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IndexDelete',

  props: {
    selectedIndex: {
      type: Object,
    },
  },

  methods: {
    closeModal() {
      this.$bvModal.hide('index-deactivate-modal');
    },

    deactivateIndex() {
      this.$bvModal.hide('index-deactivate-modal');
      const url = `pages/goal/deactivate_goal_index/${this.selectedIndex.indexId}/`;

      axios.post(url).then(() => {
        this.$emit('reload', true);
      });
    },
  },
};
</script>
