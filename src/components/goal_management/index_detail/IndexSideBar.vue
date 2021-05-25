<template>
  <div class="goal-sidebar">
    <a class="goal-sidebar-toggler">
      <Fa :icon="['fas', 'caret-left']" fixed-width @click="toggler" />
    </a>

    <div class="goal-sidebar-header p-3">
      <h5 class="font-weight-bold mb-2">Indexes</h5>

      <b-input-group label="Search" class="search-task mb-3">
        <template #append>
          <b-input-group-text @click="searchIndex">
            <Fa :icon="['fas', 'search']" />
          </b-input-group-text>
        </template>
        <b-form-input
          placeholder="Search"
          v-model="searchIndexName"
          @keydown.native="searchEnterHandler"
        ></b-form-input>
      </b-input-group>

      <b-button
        v-if="searchActive"
        @click="searchNameClear"
        class="mt-3"
        variant="primary"
        block
        size="sm"
      >
        Clear
      </b-button>
    </div>

    <div class="goal-sidebar-footer">
      <simplebar data-simplebar-auto-hide="false" class="h-100">
        <a
          v-for="(item, index) in indexList"
          :key="index"
          class="goal-sidebar-item"
          :class="setActiveClass(item.id)"
          @click="viewIndex(item)"
        >
          <p>
            <b-badge variant="primary">
              {{ item.short_name }}
            </b-badge>
            {{ item.name }}
          </p>
          <small v-if="item.childs.length > 0" class="d-inline mr-1">
            Child indices:
          </small>
          <b-badge
            v-for="(child, childIndex) in item.childs"
            :key="childIndex"
            variant="deep-blue"
            class="mr-1 font-weight-normal"
          >
            {{ child.short_name }}
          </b-badge>
        </a>
      </simplebar>
    </div>
  </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import axios from 'axios';

export default {
  name: 'IndexSideBar',

  components: {
    simplebar,
  },

  data() {
    return {
      indexList: null,
      indexListBackup: null,
      searchIndexName: null,
      searchActive: false,
      selectedIndex: null,
    };
  },

  mounted() {
    this.loadIndex();
  },

  methods: {
    toggler() {
      const menu = document.querySelector('.goal-sidebar');
      menu.classList.toggle('reverse');
      document.body.classList.toggle('submenu-active');
    },

    // Index name search
    searchIndex() {
      if (this.searchIndexName) {
        const found = [];
        for (const index of this.indexListBackup) {
          if (
            index.name
              .toLowerCase()
              .includes(this.searchIndexName.toLowerCase())
          ) {
            found.push(index);
          }
        }
        this.indexList = found;
        this.searchActive = this.searchIndexName;
      }
    },

    searchEnterHandler(event) {
      if (event.which === 13) {
        this.searchIndex();
      }
    },

    // index name search clear
    searchNameClear() {
      this.searchActive = false;
      this.searchIndexName = null;
      this.indexList = this.indexListBackup;
    },

    loadIndex() {
      const company = this.$store.getters.activeCompany;
      const url = `pages/goal/list_goal_index/${company}/`;

      axios.get(url).then((response) => {
        const indexes = [];
        for (const index of response.data.index_list) {
          if (index.active === '1') {
            indexes.push(index);
          }
          if (String(index.id) === this.$route.query.id) {
            this.$emit('select', index);
          }
        }
        this.indexList = indexes;
        this.indexListBackup = indexes;
      });
    },

    setActiveClass(indexId) {
      if (String(this.$route.query.id) === String(indexId)) {
        return 'active';
      } else {
        return '';
      }
    },

    viewIndex(index) {
      if (String(index.id) !== this.$route.query.id) {
        this.$emit('select', index);
        const query = { id: index.id };
        this.$router.replace({ query });
      }
    },
  },
};
</script>
