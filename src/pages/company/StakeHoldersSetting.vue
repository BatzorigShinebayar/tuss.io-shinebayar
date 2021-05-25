<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Administration</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>
    <b-tabs content-class="p-3 text-muted">
      <b-tab active title="StakeHolder Type">
        <Stakeholders />
      </b-tab>
      <b-tab title="Onboarding Solutions"> </b-tab>
      <b-tab title="Working Hours"> </b-tab>
      <b-tab title="Badges"> </b-tab>
      <b-tab title="Holidays"> </b-tab>
      <b-tab title="Challenges"> </b-tab>
      <b-tab title="Object types"> </b-tab>
    </b-tabs>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import Stakeholders from '@/components/admininstration/stakeholders/StakeHolders';

export default {
  name: 'StakeholderSetting',

  components: {
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    Stakeholders,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
