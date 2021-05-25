<template>
  <b-col cols="12">
    <div class="card mt-3">
      <div class="card-body cursor-pointer">
        <div class="media">
          <div class="media-body d-flex h-100">
            <b-col class="d-flex" cols="5">
              <img
                :src="'/tusd_images/profile/' + partner_organization.picture"
                onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
                class="rounded mr-2 align-self-center"
                width="100px"
                height="100px"
                alt
              />
              <div class="align-self-center ml-4">
                <p class="company-name">{{ organization.name }}</p>
                <p class="company-desc">{{ organization.mission }}</p>
              </div>
            </b-col>
            <div class="vl" />
            <b-col cols="7">
              <b-row class="mx-1">
                <b-col cols="6">
                  <div class="my-3 flex-space-between">
                    <p class="company-info my-auto">Phone number:</p>
                    <u v-if="partner_organization.phone">{{
                      partner_organization.phone
                    }}</u>
                    <u v-else>N/A</u>
                  </div>
                  <div class="my-3 flex-space-between">
                    <p class="company-info my-auto">Website:</p>
                    <u v-if="partner_organization.website">{{
                      partner_organization.website
                    }}</u>
                    <u v-else>N/A</u>
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="my-3 flex-space-between">
                    <p class="company-info my-auto">Email:</p>
                    <u v-if="partner_organization.email">{{
                      partner_organization.email
                    }}</u>
                    <u v-else>N/A</u>
                  </div>
                  <div class="my-3 flex-space-between">
                    <p class="company-info my-auto">Facebook:</p>
                    <u v-if="partner_organization.facebook">{{
                      partner_organization.facebook
                    }}</u>
                    <u v-else>N/A</u>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mx-1">
                <b-col cols="12">
                  <div class="my-3 flex-space-between">
                    <p class="company-info">Address:</p>
                    <u
                      v-if="partner_organization.address"
                      style="max-width: 400px"
                      >{{ partner_organization.address }}</u
                    >
                    <u v-else>N/A</u>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </div>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'StakeHoldersOrgView',
  props: {},
  data() {
    return {
      organization: null,
      partner_organization: null,
    };
  },
  mounted() {
    this.getOrganizations('/' + this.$route.params.id);
  },
  methods: {
    async getOrganizations(params) {
      const response = await this.$store.dispatch('getOrganizations', params);
      if (response.status === 200) {
        this.organization = response.data;
        this.getPartners('/' + this.organization.partner);
      }
    },
    async getPartners(params) {
      const response = await this.$store.dispatch('getPartners', params);
      if (response.status === 200) {
        this.partner_organization = response.data;
      }
    },
  },
};
</script>
<style scoped>
.company-name {
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
  text-transform: uppercase;
}
.company-desc {
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
}
.company-info {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
}
</style>
