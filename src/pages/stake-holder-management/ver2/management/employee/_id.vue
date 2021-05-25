<template>
  <div>
    <NavBar>
      <template #top>
        <h6 class="ml-2 p-3">Ажилтны мэдээлэл</h6>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Searchbar :choose-item.sync="chooseItem" :search-items="searchItems" />
      </template>
    </SubMenu>

    <div class="container-fluid">
      <Employee :choose-item="chooseItem" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar';
import Searchbar from '@/components/layout/SearchBar';
import SubMenu from '@/components/layout/SubMenu';
import Employee from '@/components/stake-holder-management/items/EmployeeInfo';

export default {
  name: 'SingleEmployee',
  components: { NavBar, SubMenu, Searchbar, Employee },
  layout: 'main',

  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  data() {
    return {
      chooseItem: '',
      pending: false,
      searchItems: [{ name: 'My Team Management', icon: '' }],
    };
  },

  head() {
    return {
      title: 'Ажилтны мэдээлэл | ТУС Д+',
    };
  },

  watch: {
    chooseItem(newVal, oldVal) {
      console.log(`We have ${newVal} changed from ${oldVal} yay!`);
    },
  },
  mounted() {},

  methods: {},
};
</script>
