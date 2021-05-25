<template>
  <b-row id="search-body" class="w-100">
    <b-col class="overflow-auto h-100" cols="12">
      <b-row v-for="index in 20" :key="index" class="border-bottom pt-2 pb-2">
        <b-col class="d-flex" cols="12">
          <img
            src="@/assets/images/users/avatar-1.jpg"
            class="rounded mr-2"
            width="39"
            height="44"
            alt
          />
          <div
            class="flex-space-between w-100"
            @mouseover="item_id = index"
            @mouseleave="item_id = null"
          >
            <div class="align-self-center">
              <p class="textBold ws-nowrap">Batdorj Jargalsaihan</p>
              <p
                class="text-muted ws-nowrap"
                style="font-size: 13px; line-height: 14px"
              >
                Digital System Architect
              </p>
            </div>
            <div v-if="item_id === index" class="align-self-center">
              <i class="bx bx-dots-vertical-rounded"></i>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'Employee',
  data() {
    return {
      icon: '',
      item_id: null,
    };
  },
};
</script>
