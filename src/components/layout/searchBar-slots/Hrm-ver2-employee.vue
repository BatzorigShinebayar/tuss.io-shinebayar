<template>
  <b-row id="search-body" class="w-100">
    <b-col id="container" class="h-100" cols="12">
      <b-row class="m-3">
        <p id="header">
          <i class="bx bx-menu align-middle mr-2" />Ажилтны мэдээлэл
        </p>
      </b-row>
      <b-row
        v-for="(item, index) in data"
        :key="index"
        class="d-block p-1 ml-1 mt-1"
      >
        <b-col class="w-100 d-flex" cols="12">
          <img
            src="@/assets/images/users/avatar-1.jpg"
            class="rounded mr-2"
            width="39"
            height="44"
            alt
          />
          <div
            id="employee_info"
            class="flex-space-between w-100 cursor-pointer"
            @mouseover="item_id = index"
            @mouseleave="item_id = null"
            @click="chooseMenu(item.name)"
          >
            <div class="align-self-center w-100">
              <p class="textBold ws-nowrap">{{ item.name }}</p>
              <p
                class="text-muted col-md-10 p-0"
                style="font-size: 13px; line-height: 14px"
              >
                {{ item.department }}
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
  name: 'Ach',
  props: {
    chooseItem: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      icon: '',
      item_id: null,
      data: [
        {
          name: 'Batdorj Jargalsaihan',
          department: 'Digital System Architect',
        },
        {
          name: 'З.Гүндсамбуу',
          department: 'Програм хөгжүүлэлтийн инженер',
        },
        {
          name: 'Batdorj Jargalsaihan2',
          department: 'Digital System Architect',
        },
        {
          name: 'Batdorj Jargalsaihan3',
          department: 'Digital System Architect',
        },
      ],
    };
  },
  methods: {
    chooseMenu(item) {
      this.$emit('update:chooseItem', item);
    },
  },
};
</script>
<style scoped>
#search-body #container {
  overflow-x: hidden;
  overflow-y: auto;
}
.text-muted {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#employee_info:hover .text-muted {
  white-space: unset;
  overflow: hidden;
  text-overflow: unset;
}
</style>
