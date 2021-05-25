<template>
  <b-row>
    <b-col cols="6">
      <div class="p-3">
        <div class="px-3">
          <ul class="user-list">
            <li v-for="(item, index) in data" :key="index">
              <img
                :src="item.src"
                class="
                  border-white
                  rounded-circle
                  con-vs-avatar
                  -m-1
                  border-2 border-solid
                "
                :alt="item.name"
              />
            </li>
          </ul>
        </div>
      </div>
    </b-col>
    <b-col cols="6">
      <div class="p-3">
        <div class="px-3"></div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Image',
  components: {},
  data() {
    return {
      data: [
        {
          name: 'avatar',
          src: 'http://localhost:3000/_nuxt/assets/images/users/avatar-1.jpg',
        },
        {
          name: 'avatar',
          src: 'http://localhost:3000/_nuxt/assets/images/users/avatar-1.jpg',
        },
        {
          name: 'avatar',
          src: 'http://localhost:3000/_nuxt/assets/images/users/avatar-1.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped></style>
