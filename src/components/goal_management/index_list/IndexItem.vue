<template>
  <div class="goal-item">
    <div class="flex-grow-1">
      <div class="d-flex align-items-center w-100">
        <h5 class="mr-1">
          <b-badge variant="primary">{{ item.short_name }}</b-badge>
        </h5>
        <router-link
          :to="{ name: 'goal-detail', query: { id: item.id } }"
          class="font-weight-bold"
        >
          {{ item.name }}
        </router-link>
      </div>

      <p class="d-block text-black-50">{{ item.description }}</p>

      <small v-if="item.childs.length > 0" class="d-inline mr-1">
        Child indices:
      </small>
      <b-badge
        v-for="(child, index) in item.childs"
        :key="index"
        class="mr-1"
        variant="deep-blue"
      >
        {{ child.short_name }}
      </b-badge>
    </div>

    <div class="flex-shrink-1">
      <a
        class="goal-item-action"
        @click="editIndex(item)"
        v-if="permission('indx_upd')"
      >
        <Fa :icon="['fas', 'cog']" />
      </a>
      <a
        class="goal-item-action"
        @click="deleteIndex(item.id, item.name)"
        v-if="permission('indx_del')"
      >
        <Fa :icon="['fas', 'trash']" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexItem',

  props: {
    item: {
      type: Object,
    },
  },

  methods: {
    editIndex(index) {
      this.$emit('edit', index);
    },

    deleteIndex(indexId, indexName) {
      this.$emit('delete', { indexId, indexName });
    },
  },
};
</script>
