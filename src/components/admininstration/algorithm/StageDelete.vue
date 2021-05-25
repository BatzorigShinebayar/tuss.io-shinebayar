<template>
  <b-modal id="stage-delete" title="" @show="loadStage">
    <h4 class="text-center mb-3">Are you sure to delete?</h4>
    <h5 class="text-center">
      <b-badge variant="deep-blue">{{ code }}</b-badge>
      {{ name }}
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
        <b-button variant="danger" size="lg" @click="deleteStage">
          Yes
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StageDelete',

  data() {
    return {
      stage: null,
      stageId: null,
      code: null,
      name: null,
    };
  },

  methods: {
    loadStage() {
      const stage = this.$store.getters.algorithmDetailStageDelete;
      this.stage = stage;
      this.stageId = stage.id;
      this.code = stage.code;
      this.name = stage.name;
    },

    closeModal() {
      this.$bvModal.hide('stage-delete');
    },

    deleteStage() {
      const params = { id: this.stageId };
      const url = '/pages/company_builder/algorithm/stage/';

      axios.delete(url, { params: params }).then(() => {
        this.$bvModal.hide('stage-delete');
        this.$parent.$emit('reload', true);
      });
    },
  },
};
</script>
