<template>
  <div>
    <div class="w-100 flex-space-between align-items-center">
      <label
        v-for="item in buttons"
        :key="item.id"
        class="btn w-100 tabBtn align-items-center py-2"
        style="height: 40px"
        :class="{ 'text-primary': item.isActive }"
      >
        <input
          :id="item.id"
          type="radio"
          style="display: none"
          @click="activate(item)"
        />
        <strong>{{ item.name }}</strong>
      </label>
    </div>
    <b-col cols="12">
      <b-form class="d-block mt-3"> </b-form>
    </b-col>
  </div>
</template>
<script>
// import Multiselect from 'vue-multiselect';

export default {
  name: 'PermissionConfiguration',
  components: {},
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      information: { ...this.data },
      buttons: {
        button1: {
          name: 'General Information',
          id: 'gi',
          icon: '',
          isActive: true,
          isDisabled: false,
        },
        button2: {
          name: 'Permission Configuration',
          id: 'pc',
          icon: '',
          isActive: false,
          isDisabled: false,
        },
      },
    };
  },
  watch: {
    isChanged() {},
  },
  beforeMount() {},
  methods: {
    changed() {
      this.isChanged = !this.isChanged;
    },
    activate(data) {
      if (!data.isDisabled) {
        for (const value in this.buttons) {
          if (this.buttons[value].id === data.id) {
            data.isActive = true;
            document.getElementById(data.id).setAttribute('checked', '');
          } else {
            this.buttons[value].isActive = false;
            document
              .getElementById(this.buttons[value].id)
              .removeAttribute('checked');
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.card {
  height: 160px;
}
.tabBtn {
  border: 0;
  background-color: #f2f3f5;
  color: #263a5a;
  border-radius: 0;
}
.text-input {
  height: 40px !important;
}
</style>
