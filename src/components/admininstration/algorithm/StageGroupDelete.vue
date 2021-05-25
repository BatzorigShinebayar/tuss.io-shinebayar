<template>
  <b-modal id="stage-group-delete" title="">
    <h4 class="text-center mb-3">Are you sure to delete?</h4>
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
        <b-button variant="danger" size="lg" @click="deleteStageGroup">
          Yes
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StageGroupDelete',

  props: {
    deleteStageGroupId: {
      type: Number,
      default() {
        return 0;
      },
    },
  },

  data() {
    return {
      stage: null,
      stageId: null,
      code: null,
      name: null,
    };
  },

  methods: {
    closeModal() {
      this.$bvModal.hide('stage-group-delete');
    },

    deleteStageGroup() {
      const params = { id: this.deleteStageGroupId };
      const url = '/pages/company_builder/algorithm/stage_group/';

      axios.delete(url, { params: params }).then(() => {
        this.$bvModal.hide('stage-group-delete');
        this.$parent.$emit('reload', true);
      });
    },
  },
};
</script>
