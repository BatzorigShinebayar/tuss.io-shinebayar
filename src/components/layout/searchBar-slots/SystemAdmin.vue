<template>
  <b-row id="search-body" class="w-100">
    <b-col class="overflow-auto h-100" cols="12">
      <b-row class="m-3">
        <p id="header">
          <i class="bx bx-menu align-middle mr-1" />THE GROUP COMPANIES
        </p>
      </b-row>
      <b-col cols="12" id="company-report">
        <b-form-row>
          <b-col
            v-for="item in data"
            :key="item.id"
            class="w-100 d-flex"
            cols="12"
          >
            <img
              :src="item.logo"
              onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
              class="rounded mr-2 align-self-center"
              width="39"
              height="44"
              alt
            />
            <a
              id="employee_info"
              class="flex-space-between w-100 cursor-pointer my-3"
              :href="
                $router.resolve({
                  name: 'admin-setting-org',
                  params: {
                    type: 'organizations',
                    groupId: item.id,
                  },
                }).href
              "
            >
              <div class="align-self-center w-100">
                <p class="textBold ws-nowrap">{{ item.name }}</p>
                <p
                  class="text-muted col-md-10 p-0"
                  style="font-size: 13px; line-height: 14px"
                >
                  {{ item.email }}
                </p>
              </div></a
            >
          </b-col>
        </b-form-row>
      </b-col>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'SystemAdmin',
  data() {
    return {
      weekId: this.$route.params.weekId,
      icon: '',
      name: null,
      data: null,
      employees: null,
      organization: null,
    };
  },
  mounted() {
    const params = '?is_active=1';
    this.getCompanyGroup(params);
  },
  methods: {
    async getCompanyGroup(params) {
      const response = await this.$store.dispatch('getCompanyGroup', params);
      if (response.status === 200) {
        this.data = response.data.results;
      }
    },
  },
};
</script>
