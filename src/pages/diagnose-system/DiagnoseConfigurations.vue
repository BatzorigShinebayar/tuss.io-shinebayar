<template>
  <MainLayout>
    <div>
      <NavBar>
        <template #top>
          <h5 class="p-3">Diagnose Configurations</h5>
        </template>
        <template #bottom>
          <div
            class="d-flex justify-content-between align-items-center mb-3 w-100"
          >
            <div
              class="d-flex justify-content-between align-items-center w-100"
            >
              <div class="d-flex align-items-center">
                <div class="mr-3">
                  <ul class="nav nav-tabs ml-1">
                    <li class="nav-item">
                      <router-link
                        :to="{ name: 'diagnose-list' }"
                        class="nav-link"
                      >
                        <i class="bx bx-grid-alt align-middle mr-1"></i
                        >Diagnoses
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link :to="{ name: '' }" class="nav-link">
                        <i class="bx bx-grid-alt align-middle mr-1"></i>System
                        Deficiencies
                      </router-link>
                    </li>
                    <!--          <li class="nav-item">-->
                    <!--            <nuxt-link to="/task-management/configurations" class="nav-link">-->
                    <!--              <i class="bx bx-globe align-middle mr-1"></i>Task Configurations-->
                    <!--            </nuxt-link>-->
                    <!--          </li>-->
                  </ul>
                </div>
                <div class="mr-3"></div>
              </div>

              <div class="d-flex align-items-center">
                <b-button size="sm"
                  ><router-link :to="{ name: 'diagnose-configurations' }">
                    <Fa :icon="['fas', 'cog']" />
                    <i class="bx align-middle mr-1"></i>Configurations
                  </router-link>
                </b-button>
              </div>
            </div>
          </div>
        </template>
      </NavBar>

      <div class="container-fluid pr-lg-4 pl-lg-4">
        <DiagnoseTemplateList />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import DiagnoseTemplateList from '@/components/diagnose-system/diagnose_template/DiagnoseTemplateList';

// data() {
//   return {
//     email: 'bold@tussolution.mn',
//     password: '2019',
//     // email: null,
//     // password: null,
//     loginError: false,
//     loginPending: false,
//     loginSubmit: false,
//     mouseX: null,
//     mouseY: null,
//     params: {
//       client_id:
//         '635183532065-jv6kd8skpqo01tlq8fp2i6c4msod8ghk.apps.googleusercontent.com',
//       scope:
//         'openid profile email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://mail.google.com/ https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly https://www.googleapis.com/auth/user.birthday.read',
//       secret: 'L9XFMPQ89htSa0GrFL_A534h',
//       key: 'AIzaSyAwAfMkayZwFT2k_ftBQF4lkbYn4XRIv0U',
//     },
//   };
// },

export default {
  name: 'DiagnoseConfigurations',

  components: {
    DiagnoseTemplateList,
    MainLayout,
    NavBar,
  },

  layout: 'main',

  metaInfo: {
    title: 'Diagnose Management | TUSS D+',
  },
};
</script>
