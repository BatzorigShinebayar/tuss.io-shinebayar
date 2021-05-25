<template>
  <Div>
    <div class="container-fluid" style="background-color: #ffffff">
      <b-col cols="12" class="d-flex mt-3 mb-2">
        <b-input-group class="search-form">
          <template #append>
            <b-input-group-text class="bg-secondary text-dark">
              <Fa :icon="['fas', 'search']" />
            </b-input-group-text>
          </template>
          <b-form-input
            v-model="searchData"
            class="bg-secondary text-dark"
            id="search-task"
            placeholder="Search"
          ></b-form-input>
        </b-input-group>
        <div class="ml-auto d-flex align-items-center">
          <b-button @click="create" variant="deep-blue">
            <Fa :icon="['fas', 'plus']" />
            Create new group
          </b-button>
        </div>
      </b-col>
      <div class="card bg-transparent">
        <Table :table-data="data" class="pt-3" @emit_grp_id="edit" />
      </div>
    </div>
    <SideBar :type="sideBarType" :data="sideBarData" :bool="bool" />
  </Div>
</template>
<script>
import Table from '@/components/settings/system-admin/tables/OrganizationGroupTable';
import SideBar from '@/components/settings/system-admin/items/sideBarGroupCreateEdit';

export default {
  name: 'OrganizationGroups',
  components: {
    Table,
    SideBar,
  },
  layout: 'main',

  data() {
    return {
      searchData: '',
      data: [],
      sideBarType: null,
      sideBarData: null,
      bool: false,
    };
  },
  mounted() {
    const params = '';
    this.getCompanyGroup(params);
  },
  methods: {
    async getCompanyGroup(params) {
      const response = await this.$store.dispatch('getCompanyGroup', params);
      if (response.status === 200) {
        this.data = response.data.results;
      }
    },
    create() {
      this.sideBarType = 'Create';
      this.bool = !this.bool;
      this.$root.$emit('bv::toggle::collapse', 'sideBarGroupCreateEdit');
    },
    edit(data) {
      this.sideBarType = 'Edit';
      this.sideBarData = data;
      this.bool = !this.bool;
      this.$root.$emit('bv::toggle::collapse', 'sideBarGroupCreateEdit');
    },
  },
};
</script>
