<template>
  <div>
    <div class="card mt-3">
      <div class="card-body cursor-pointer">
        <div class="media">
          <b-col class="media-body" cols="12">
            <div class="edit-ellipsis px-1">
              <Fa
                :id="'edit-' + cardData.partner_id"
                :icon="['far', 'ellipsis-v']"
                class="fa-lg"
              />
            </div>
            <div class="d-table mx-auto">
              <b-row class="d-flex justify-content-center mt-1">
                <img
                  :src="cardData.image"
                  onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
                  class="border-white rounded-circle"
                  width="56px"
                  height="56px"
                />
              </b-row>
              <b-row class="mt-3">
                <b class="text-center" style="min-height: 45px">
                  {{ cardData.partner.name }} {{ cardData.partner.last_name }}
                </b>
              </b-row>
              <b-row class="d-flex justify-content-center mt-1">
                <p class="text-center">
                  {{ cardData.organization.short_name }}
                </p>
              </b-row>
              <b-row class="d-flex justify-content-center mt-3 mb-4">
                <b-badge v-if="cardData.is_main" variant="success">
                  Main job title
                </b-badge>
                <b-badge v-else variant="danger"> Sub job title </b-badge>
              </b-row>
            </div>
          </b-col>
        </div>
      </div>
    </div>
    <b-popover
      :target="'edit-' + cardData.partner_id"
      triggers="hover"
      placement="right"
    >
      <div class="d-flex flex-column">
        <p class="btn">Edit profile</p>
        <p class="btn">Mark as former</p>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.text-center {
  text-align: center;
}
.card {
  width: 170px;
  height: 220px;
}
.edit-ellipsis {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
