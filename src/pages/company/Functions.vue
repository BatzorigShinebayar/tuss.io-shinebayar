<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Function</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <FunctionList />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import FunctionList from '@/components/admininstration/function/FunctionList';

export default {
  name: 'Functions',

  metaInfo: {
    title: 'Function - Company | TUSS D+',
  },

  components: {
    MainLayout,
    FunctionList,
    Sidebar,
    NavBar,
    SubMenu,
  },
};
</script>
