<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Permission template</h5>
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
            class="content-header-image mr-2"
            alt=""
          />
        </template>
      </ContentHeader>

      <Body />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import Body from '@/components/admininstration/permission/PermissionTemplate';
import ContentHeader from '@/components/admininstration/ContentHeader';

export default {
  name: 'PermissionTemplate',

  metaInfo: {
    title: 'Permission Template - Company | TUSS D+',
  },

  components: {
    ContentHeader,
    Sidebar,
    NavBar,
    SubMenu,
    Body,
    MainLayout,
  },
};
</script>
