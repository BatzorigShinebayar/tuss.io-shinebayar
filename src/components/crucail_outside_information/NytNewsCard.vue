<template>
  <div>
    <div id="weekly-ach" class="card bg-deep-blue">
      <div>
        <img
          :src="posts.thumbnail"
          :alt="posts.caption"
          width="100%"
          height="179px"
        />
      </div>
      <div id="title" class="flex-space-between">
        <div class="align-self-center">
          <h4>{{ posts.title }}</h4>
        </div>
      </div>
      <div class="float-right">
        <small class="subtext text-muted nowrap">
          {{ posts.abstract }}
        </small>
        <p class="subtext ws-nowrap">
          {{ posts.byline }}
        </p>
        <p class="subtext ws-nowrap">
          {{ formatDate(posts.published_date) }}
        </p>
      </div>
      <div class="d-flex row">
        <button type="button" class="btn button mt-4 mr-1">Inform</button>
        <a :href="posts.url" target="_blank">
          <button type="button" class="btn button mt-4">Read More</button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from 'date-fns';

export default {
  name: 'CINytCard',
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(strDate) {
      return format(new Date(strDate), 'MMMM do, yyyy');
    },
  },
};
</script>
<style scoped>
#weekly-ach {
  width: 300px !important;
  height: 500px !important;
}
.card {
  color: #ffffff;
  margin-right: 5px;
}
</style>
