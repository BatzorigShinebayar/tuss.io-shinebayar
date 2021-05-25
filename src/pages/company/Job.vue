<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Job Title</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <Body />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import Body from '@/components/admininstration/job_title/jobTitleTable';

export default {
  name: 'Job',

  metaInfo: {
    title: 'Job Title - Company | TUSS D+',
  },

  components: { MainLayout, Sidebar, NavBar, SubMenu, Body },
};
</script>
