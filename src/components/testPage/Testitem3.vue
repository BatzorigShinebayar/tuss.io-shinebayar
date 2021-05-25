<template>
  <b-row>
    <b-col cols="6">
      <div class="p-3">
        <div class="px-3">
          <b-row>
            <b-col cols="12">
              <div class="card flex-space-between mini-stats-wid">
                <div class="card-body">
                  <div class="media">
                    <b-col class="media-body" cols="12">
                      <p id="title" class="textBold ws-nowrap mb-3">
                        {{ title }}
                      </p>
                      <div
                        class="btn-group btn-group-toggle mt-2 w-100"
                        data-toggle="buttons"
                      >
                        <label
                          v-for="item in buttons"
                          :key="item.id"
                          class="btn btn-secondary"
                          :class="{ active: item.isActive }"
                        >
                          <input
                            :id="item.id"
                            type="radio"
                            name="options"
                            @click="activate(item)"
                          />
                          {{ item.name }}
                        </label>
                      </div>
                      <div id="body">
                        <simplebar
                          data-simplebar-auto-hide="true"
                          class="h-100"
                        >
                          <div class="overflow-auto h-100 mt-2">
                            <div
                              v-for="key in bodyItem"
                              :key="key.id"
                              class="border-bottom py-2 flex-space-between mx-2"
                            >
                              <div class="ml-3">
                                <p class="textBold ws-nowrap pt-1">
                                  {{ key.title }}
                                </p>
                                <p class="subtext text-muted pt-1 ws-nowrap">
                                  {{ key.body }}
                                </p>
                              </div>
                              <div class="align-self-center mr-2">
                                <i class="bx bx-edit-alt color-green"></i>
                                <i class="bx bx-trash color-red"></i>
                              </div>
                            </div>
                          </div>
                        </simplebar>
                      </div>
                    </b-col>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
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
import simplebar from 'simplebar-vue';

export default {
  name: 'UsefullComp',
  components: { simplebar },
  data() {
    return {
      title: 'Анхаарах ажилууд',
      buttons: {
        button1: {
          name: 'Шинээр төлөвлөх',
          id: 'option1',
          isActive: true,
          data: [
            {
              title: 'Brand logo design',
              body: 'Assigned to Janis',
            },
            {
              title: 'Blog Template UI',
              body: 'Assigned to Dianna',
            },
            {
              title: 'Multipurpose Landing',
              body: 'Assigned to Team B',
            },
            {
              title: 'Blah blah blah',
              body: 'Assigned to SAD',
            },
            {
              title: 'Blah blah blah',
              body: 'Assigned to SAD',
            },
          ],
        },
        button2: {
          name: 'Дуусаж буй',
          id: 'option2',
          isActive: false,
          data: [
            {
              title: 'AAAAAAAAAAAAAA',
              body: 'Assigned to Janis',
            },
            {
              title: 'BBBBBBBBBBBBBBBB',
              body: 'Assigned to Dianna',
            },
            {
              title: 'CCCCCCCCCCCCCCCC',
              body: 'Assigned to Team B',
            },
            {
              title: 'DDDDDDDDDDDDDDDD',
              body: 'Assigned to SAD',
            },
          ],
        },
        button3: {
          name: 'Эхэлж буй',
          id: 'option3',
          isActive: false,
          data: [],
        },
      },
      bodyItem: null,
    };
  },
  created() {
    this.bodyItem = this.buttons.button1.data;
  },
  methods: {
    activate(data) {
      this.bodyItem = data.data;
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
    },
  },
};
</script>

<style scoped>
#body {
  max-height: 220px;
  height: 220px;
}
#title {
  font-size: 18px;
}
.btn-secondary {
  background-color: #eff2f7;
  color: #2a3042;
  border: 0;
}
.btn-secondary.active {
  background-color: #2a3042;
  color: white;
}
</style>
