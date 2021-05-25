<template>
  <div>
    <b-row class="mt-4">
      <b-col cols="8">
        <div class="card mini-stats-wid" style="min-width: 750px">
          <div class="card-body flex-space-between h-100">
            <div class="stat ml-4">
              <h4 class="font-weight-bold ws-nowrap">Dashboard</h4>
              <p class="subtext text-muted pt-3 ws-nowrap">
                {{ fixDate() }}
              </p>
            </div>
            <div
              v-for="(item, key, index) in data"
              :key="key"
              class="stat"
              :class="{
                'mr-4': index == Object.keys(data).length - 1,
              }"
            >
              <div v-if="!item.state">
                <h4
                  class="text-center"
                  :class="{
                    'color-green':
                      (index == Object.keys(data).length - 1)
                      | 'font-weight-bold',
                  }"
                >
                  {{ item }}
                </h4>
                <p class="text-center subtext text-muted pt-3 ws-nowrap">
                  {{ fixData(key) }}
                </p>
              </div>
              <div v-else>
                <h4 class="text-center" :class="item.color">
                  {{ item.state }}
                </h4>
                <p class="text-center subtext text-muted pt-3 ws-nowrap">
                  {{ fixData(key) }}
                </p>
              </div>
            </div>
            <!--              <div v-if="index != Object.keys(data).length - 1" class="vl" />-->
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ProfileDashboard',
  props: {
    data: {
      type: Object,
      default: null,
    },
    date: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {};
  },
  methods: {
    fixDate() {
      return this.date.replace('/', ' - ');
    },
    fixData(data) {
      return data.toString().split('_').join(' ');
    },
  },
};
</script>

<style scoped>
#title {
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
}
.card {
  height: 112px;
}
</style>
