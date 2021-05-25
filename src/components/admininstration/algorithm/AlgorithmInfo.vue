<template>
  <div>
    <div id="alg-content" class="rounded-big bg-light p-4">
      <div v-for="stageGroup of stageGroups" :key="stageGroup.id">
        <StageGroup
          v-if="stageGroup.is_active === '1'"
          :stageGroup="stageGroup"
          @edit="editStageGroup"
          @delete="deleteStageGroup"
        />
      </div>
      <div
        v-if="permission('algr_crt') && !is_system_default"
        class="alg-stage-group"
      >
        <p class="alg-stage-title">&nbsp;</p>
        <b-button
          class="add-stage-group"
          slot="footer"
          block
          variant="deep-blue"
          @click="addStageGroup"
        >
          <Fa :icon="['fas', 'plus']" />
          Add Stage Group
        </b-button>
      </div>
    </div>

    <StageCreate v-if="permission('algr_crt')" @reload="loadAlgorithmDetail" />
    <StageEdit v-if="permission('algr_upd')" @reload="loadAlgorithmDetail" />
    <StageDelete v-if="permission('algr_del')" />
    <StageGroupCreate
      v-if="permission('algr_crt')"
      @reload="loadAlgorithmDetail"
    />
    <StageGroupEdit
      v-if="permission('algr_upd')"
      @reload="loadAlgorithmDetail"
    />
    <StageGroupDelete
      v-if="permission('algr_del')"
      :deleteStageGroupId="deleteStageGroupId"
    />
  </div>
</template>

<script>
import StageGroup from '@/components/admininstration/algorithm/StageGroup';
import StageEdit from '@/components/admininstration/algorithm/StageEdit';
import StageDelete from '@/components/admininstration/algorithm/StageDelete';
import StageCreate from '@/components/admininstration/algorithm/StageCreate';
import StageGroupCreate from '@/components/admininstration/algorithm/StageGroupCreate';
import StageGroupEdit from '@/components/admininstration/algorithm/StageGroupEdit';
import StageGroupDelete from '@/components/admininstration/algorithm/StageGroupDelete';

export default {
  name: 'AlgorithmInfo',

  components: {
    StageGroupDelete,
    StageGroupEdit,
    StageGroupCreate,
    StageCreate,
    StageDelete,
    StageEdit,
    StageGroup,
  },

  data() {
    return {
      stageGroups: null,
      deleteStageGroupId: 0,
    };
  },

  computed: {
    is_system_default() {
      return this.$store.getters.algorithmDetail.is_system_default;
    },
  },

  created() {
    this.loadAlgorithmDetail();
  },

  methods: {
    loadAlgorithmDetail() {
      this.stageGroups = this.$store.getters.algorithmDetail.stage_groups;
    },

    addStageGroup() {
      this.$root.$emit('bv::toggle::collapse', 'create-stage-group');
    },

    editStageGroup(stageGroupId) {
      this.$store.commit('algorithmDetailStageGroupEdit', stageGroupId);
      this.$root.$emit('bv::toggle::collapse', 'edit-stage-group');
    },

    deleteStageGroup(id) {
      this.deleteStageGroupId = id;
      this.$root.$emit('bv::show::modal', 'stage-group-delete');
    },
  },
};
</script>
