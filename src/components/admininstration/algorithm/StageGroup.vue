<template>
  <div class="alg-stage-group">
    <p class="alg-stage-title">
      <b-badge variant="primary">{{ stageGroup.code }}</b-badge>
      {{ stageGroup.name }}
    </p>

    <b-dropdown
      v-if="!is_system_default"
      text="Actions"
      class="mb-3"
      variant="primary"
      block
      menu-class="w-100"
    >
      <b-dropdown-item
        v-if="!stageGroup.form && algrCrt"
        :href="
          $router.resolve({
            name: 'form',
            query: {
              org: $store.getters.activeCompany,
              grp: groupId,
              alg: $route.params.id,
              stg_grp: stageGroup.id,
              usr: $store.getters.user.id,
            },
          }).href
        "
        target="_blank"
      >
        <Fa :icon="['fas', 'align-left']" />
        Create form
      </b-dropdown-item>
      <b-dropdown-item
        v-else-if="algrUpd"
        :href="
          $router.resolve({
            name: 'form-update',
            query: {
              id: stageGroup.form,
              usr: $store.getters.user.id,
            },
          }).href
        "
        target="_blank"
      >
        <Fa :icon="['fas', 'align-left']" />
        Edit form
      </b-dropdown-item>
      <b-dropdown-item
        v-if="permission('algr_upd')"
        @click="editStageGroup(stageGroup.id)"
      >
        <Fa :icon="['fas', 'cog']" />
        Edit stage group
      </b-dropdown-item>
      <b-dropdown-item
        v-if="permission('algr_crt')"
        @click="stageCreate(stageGroup.id)"
      >
        <Fa :icon="['fas', 'plus']" />
        Add stage
      </b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item
        v-if="permission('algr_del')"
        variant="danger"
        @click="deleteStageGroupShow(stageGroup.id)"
      >
        <Fa :icon="['fas', 'trash']" />
        Delete
      </b-dropdown-item>
    </b-dropdown>
    <draggable
      v-model="stageGroup.stages"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <div v-for="stage of stageGroup.stages" :key="stage.id">
        <StageItem v-if="stage.is_active === '1'" :stage="stage" />
      </div>
      <b-button
        v-if="permission('algr_crt') && !is_system_default"
        slot="footer"
        block
        variant="deep-blue"
        class="mt-3"
        @click="stageCreate(stageGroup.id)"
      >
        <Fa :icon="['fas', 'plus']" /> Add Stage
      </b-button>
    </draggable>
  </div>
</template>

<script>
import StageItem from '@/components/admininstration/algorithm/StageItem';
import draggable from 'vuedraggable';

export default {
  name: 'StageGroup',

  components: {
    draggable,
    StageItem,
  },

  props: {
    stageGroup: {
      type: Object,
    },
  },

  data() {
    return {
      sequence: 1,
      groupId: null,
      algrCrt: this.permission('algr_crt'),
      algrUpd: this.permission('algr_upd'),
    };
  },

  computed: {
    is_system_default() {
      return this.$store.getters.algorithmDetail.is_system_default;
    },
  },

  mounted() {
    const grp = this.$store.getters.user.companies;
    for (const i in grp) {
      if (
        parseInt(grp[i].organization_id) ===
        parseInt(this.$store.getters.activeCompany)
      ) {
        this.groupId = grp[i].group_id;
      }
    }
  },

  methods: {
    stageCreate(stageId) {
      for (const stage of this.stageGroup.stages) {
        if (stage.sequence >= this.sequence) {
          this.sequence = stage.sequence;
        }
      }

      const stageInfo = {
        stageId,
        algorithmId: this.$route.params.id,
        sequence: parseInt(this.sequence) + 1,
      };
      this.$store.commit('algorithmDetailStageCreate', stageInfo);
      this.$root.$emit('bv::toggle::collapse', 'create-stage');
    },

    deleteStageGroupShow(id) {
      this.$emit('delete', id);
    },

    editStageGroup(id) {
      this.$emit('edit', id);
    },
  },
};
</script>
