<template>
  <b-modal id="article-delete-modal" title="">
    <h4 class="text-center mb-2">Are you sure to delete?</h4>
    <h5 v-if="article" class="text-center">
      {{ article.code }} | {{ article.name }}
    </h5>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-center mb-4">
        <b-button
          variant="secondary"
          class="mr-3"
          size="lg"
          @click="closeDeleteModal"
          >No</b-button
        >
        <b-button variant="danger" size="lg" @click="deleteRule">Yes</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ArticleDelete',

  props: {
    article: {
      type: Object,
    },
  },

  methods: {
    closeDeleteModal() {
      this.$bvModal.hide('article-delete-modal');
    },

    deleteRule() {
      this.$bvModal.hide('article-delete-modal');

      const payload = { id: this.article.id };

      const url = '/pages/company_builder/rules/article/';

      axios.delete(url, { data: payload }).then(() => {
        this.$emit('reload', true);
      });
    },
  },
};
</script>
