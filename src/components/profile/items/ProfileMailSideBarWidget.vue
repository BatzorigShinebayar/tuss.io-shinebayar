<template>
  <b-row id="search-body" class="w-100">
    <b-col class="overflow-auto h-100" cols="12">
      <b-row class="m-3">
        <b-col class="w-100 border-bottom mb-3 pb-3">
          <b-row class="mb-1">
            <b-col>
              <h4 style="font-family: Roboto; font-weight: bold">My Profile</h4>
            </b-col>
            <b-col align="end">
              <i class="bx bx-edit"></i>
            </b-col>
          </b-row>
          <b-col class="mb-1">
            <img
              src="@/assets/images/users/avatar-1.jpg"
              class="img-thumbnail rounded-circle"
              width="100px"
            />
          </b-col>
          <b-col class="mb-1">
            <b-row>
              <b-col>
                <h5 class="font-size-15 text-title">
                  {{ $store.getters.user.last_name }}
                  {{ $store.getters.user.first_name }}
                </h5>
              </b-col>
              <b-col> <h1>job title</h1></b-col>
            </b-row>
          </b-col>
        </b-col>
        <b-row class="w-100 border-bottom">
          <b-col align="center">
            <b-col>
              <h5 class="font-size-15">124</h5>
              <p class="text-muted mb-0">ХГИ</p>
            </b-col>
            <b-col>
              <h5 class="font-size-15">1234</h5>
              <p class="text-muted mb-0">У.Оноо</p>
            </b-col>
          </b-col>
          <b-col align="center">
            <b-col>
              <h5 class="font-size-15">98</h5>
              <p class="text-muted mb-0">САГУ</p>
            </b-col>
            <b-col>
              <h5 class="font-size-15">2</h5>
              <p class="text-muted mb-0">Ранк</p>
            </b-col>
          </b-col>
        </b-row>
      </b-row>
      <b-row class="m-3">
        <b-col>
          <ProfileMailMenuCardWidget />
        </b-col>
      </b-row>
      <b-row class="m-3">
        <b-col>
          <p id="header">
            <i class="bx bx-menu align-middle mr-1" />THE COMPANY REPORTS
          </p>
        </b-col>
        <b-col>
          <ul>
            <li>
              <router-link :to="{ name: 'PersonalInfo' }">
                Personal Information
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'My-Attendance' }">
                <span>My Attendance</span>
              </router-link>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row class="m-3">
        <b-col>
          <p id="header">
            <i class="bx bx-menu align-middle mr-1" />Office Tools
          </p></b-col
        >
        <b-col>
          <ul>
            <li>
              <router-link :to="{ name: 'gmailInbox' }">
                <span>Gmail</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'calendar' }">
                <span>Calendar</span>
              </router-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import ProfileMailMenuCardWidget from '@/components/profile/items/ProfileMailMenuCardWidget';
export default {
  name: 'ProfileMailSideBarWidget',
  components: {
    ProfileMailMenuCardWidget,
  },
  computed: {
    activeCompany() {
      return this.$store.getters.activeCompany;
    },
  },
  data() {
    return {
      menuList: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>
