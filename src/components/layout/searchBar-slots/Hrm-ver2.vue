<template>
  <b-row id="search-body" class="w-100">
    <b-col class="overflow-auto h-100" cols="12">
      <b-row class="m-3">
        <p id="header">
          <i class="bx bx-menu align-middle mr-2" />Human resource management
        </p>
      </b-row>
      <b-row
        v-for="item in data"
        id="company-report"
        :key="item.name"
        class="d-block pl-2"
      >
        <b-col class="w-100" cols="12" @click="chooseMenu(item.name)">
          <b-col class="mt-3 p-0 d-flex" cols="12">
            <b-col cols="10" class="d-flex pl-0">
              <b-col cols="12" class="d-flex align-self-center">
                <i class="align-self-center bx" :class="'bx-' + item.icon"></i>
                <p class="menu pl-1">{{ item.name }}</p>
              </b-col>
            </b-col>
          </b-col>
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
      data: [
        { name: 'Ажилтны мэдээлэл', icon: 'group' },
        { name: 'Ур чадвар', icon: 'book-heart' },
        { name: 'Чөлөө', icon: 'edit' },
        { name: 'Зөрчил', icon: 'error-circle' },
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
