<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Company Rules and Regulations</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <ContentHeader>
        <template #text>
          <h4 class="font-weight-bold mb-3">Lets jump start</h4>
          <p>
            Welcome to our planet TUS D+. We have so much in store for you and
            your company. So, let’s jump start your journey with a tutorial!
          </p>
        </template>
        <template #image>
          <img
            src="@/assets/images/administration/admin-content-header.svg"
            class="content-header-image"
            alt=""
          />
        </template>
      </ContentHeader>

      <ConstitutionList :rules="rules" />

      <RegulationList :regulations="regulations" />

      <ConstitutionCreate @reload="getRules" />

      <RegulationCreate @reload="getRules" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import ContentHeader from '@/components/admininstration/ContentHeader';
import RegulationList from '@/components/admininstration/rules/RegulationList';
import ConstitutionList from '@/components/admininstration/rules/ConstitutionList';
import ConstitutionCreate from '@/components/admininstration/rules/constitution/ConstitutionCreate';
import RegulationCreate from '@/components/admininstration/rules/regulation/RegulationCreate';
import axios from 'axios';

export default {
  name: 'RulesList',

  metaInfo: {
    title: 'Rules and Regulations - Company | TUSS D+',
  },

  components: {
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    ContentHeader,
    ConstitutionCreate,
    RegulationCreate,
    RegulationList,
    ConstitutionList,
  },

  data() {
    return {
      hasPermission: null,
      activeCompany: this.$store.getters.activeCompany,
      rules: null,
      regulations: null,
    };
  },

  mounted() {
    this.getRules();
  },

  methods: {
    getRules() {
      const params = { organization: this.activeCompany };
      const url = '/pages/company_builder/rules/';

      axios.get(url, { params: params }).then((response) => {
        this.rules = response.data.rules;
        this.regulations = response.data.regulations;
      });
    },
  },
};
</script>
