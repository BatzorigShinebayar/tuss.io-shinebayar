<template>
  <div>
    <Fa
      :icon="['fas', 'user-circle']"
      class="profile-avatar"
      :class="size"
      v-b-tooltip.hover
      :title="partnerId | get_employee_info"
    />
    <!--<img class="profile-avatar" src="" alt :class="size" />-->
  </div>
</template>

<script>
export default {
  name: 'ProfileAvatar',

  props: {
    partnerId: Number,

    size: {
      type: String,
      default() {
        return 'sm';
      },
    },
  },
};
</script>
