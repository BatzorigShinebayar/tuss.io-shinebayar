<template>
  <MainLayout>
    <SubMenu>
      <template #submenu class="h-100">
        <b-row class="mt-2 mb-2 mx-1 ws-nowrap h-100">
          <ProfileMailSideBarWidget />
        </b-row>
      </template>
    </SubMenu>
    <NavBar>
      <template #top>
        <b-row class="mt-2 mb-2 mx-1 ws-nowrap w-100">
          <h1>Home Page</h1>
        </b-row>
        <b-row>
          <div></div>
        </b-row>
      </template>
      <template #bottom>
        <!--        <ProfilePersonalInfo class="w-100" />-->
      </template>
    </NavBar>
  </MainLayout>
</template>

<script>
import NavBar from '@/components/layout/NavBar';
import MainLayout from '@/components/layout/MainLayout';
import SubMenu from '../../components/layout/SubMenu';
import ProfileMailSideBarWidget from '../../components/profile/items/ProfileMailSideBarWidget';
export default {
  name: 'ProfileCalendar',

  metaInfo: {
    title: 'Profile | TUSS D+',
  },
  data: function () {
    return {};
  },
  components: {
    MainLayout,
    NavBar,
    SubMenu,
    ProfileMailSideBarWidget,
  },
};
</script>

<style scoped></style>
