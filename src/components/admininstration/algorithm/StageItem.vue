<template>
  <div
    class="alg-stage"
    :class="stage.is_active === '1' ? 'active' : 'inactive'"
  >
    <div class="d-flex">
      <p class="font-weight-bold mb-2">
        {{ stage.code }}
      </p>
    </div>
    <p class="mb-3">{{ stage.name }}</p>

    <div class="d-flex justify-content-between">
      <p class="text-primary">
        <Fa :icon="['far', 'stopwatch']" class="mr-1" />
        <span v-if="stage.recommended_hours">
          {{ stage.recommended_hours }} hours
        </span>
        <span v-else>unknown</span>
      </p>
      <div v-if="!is_system_default">
        <a
          v-if="permission('algr_upd')"
          class="text-primary cursor-pointer mr-3"
          @click="editStage(stage.id)"
        >
          <Fa :icon="['fas', 'cog']" />
        </a>
        <a
          v-if="permission('algr_del')"
          v-b-modal.sub-function-delete
          class="text-danger cursor-pointer"
          @click="deleteStage(stage)"
        >
          <Fa :icon="['fas', 'trash']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StageItem',

  props: {
    stage: {
      type: Object,
    },
  },

  computed: {
    is_system_default() {
      return this.$store.getters.algorithmDetail.is_system_default;
    },
  },

  methods: {
    editStage(stageId) {
      this.$store.commit('algorithmDetailStageEdit', stageId);
      this.$root.$emit('bv::toggle::collapse', 'edit-stage');
    },

    deleteStage(stage) {
      this.$store.commit('algorithmDetailStageDelete', stage);
      this.$bvModal.show('stage-delete');
    },
  },
};
</script>
