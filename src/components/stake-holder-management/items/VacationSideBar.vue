<template>
  <b-sidebar
    id="vacationSideBar"
    ref="vacationSideBar"
    :title="'Vacation schedule ' + type"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div style="margin-bottom: 100px">
      <b-col class="mt-4" cols="12">
        <div
          class="card flex-space-between mini-stats-wid bg-deep-blue"
          style="min-width: 340px"
        >
          <div class="card-body">
            <div class="d-flex">
              <div class="text-white d-block">
                <h4 class="font-weight-bold mb-3">
                  {{ type === 'edit' ? 'Edit' : 'Create' }} your vacation
                  schedule!
                </h4>
                <p class="pt-3 w-75">
                  Please input required information below to {{ type }} your
                  vacation schedule.
                </p>
              </div>
              <img
                id="astronaut"
                src="@/assets/images/background/astronaut2.png"
                alt="astronaut"
              />
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <b-form class="d-block mt-3">
          <b-form-row>
            <b-col cols="6">
              <b-form-group label="Employee" label-for="partner">
                <b-form-input
                  id="partner"
                  class="custom-input"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Vacation year" label-for="vacation_year">
                <b-form-input
                  id="vacation_year"
                  class="custom-input"
                  disabled
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="6">
              <b-form-group label="Vacation days" label-for="vac_days">
                <b-form-input
                  id="vac_days"
                  disabled
                  class="custom-input"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Remaining vacation days"
                label-for="remain_vac_day"
              >
                <b-form-input
                  id="remain_vac_day"
                  disabled
                  class="custom-input"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="6">
              <b-form-group
                label="Vacation start date"
                label-for="vacation_start_date"
              >
                <b-form-input
                  id="vacation_start_date"
                  class="custom-input"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group
                label="Vacation end date"
                label-for="vacation_end_date"
              >
                <b-form-input
                  id="vacation_end_date"
                  class="custom-input"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form>
      </b-col>
    </div>
    <b-col cols="12" class="d-flex bg-secondary py-3 footer">
      <b-col v-if="type === 'edit'" class="btn sendBtn mr-2" cols="10">
        <p @click="update">Update</p>
      </b-col>
      <b-col v-else class="btn sendBtn mr-2" cols="10">
        <p @click="create">create</p>
      </b-col>
      <b-col class="cancelBtn btn" cols="2">
        <p @click="hide">Close</p>
      </b-col>
    </b-col>
  </b-sidebar>
</template>

<script>
export default {
  name: 'VacationSideBar',

  components: {},

  props: {
    type: {
      type: String,
      default() {
        return '';
      },
    },
    data: {
      type: Object,
      default: null,
    },
    bool: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      partner_rel: null,
      json_data: null,
      changedPersonalInfo: null,
    };
  },

  watch: {},

  methods: {
    update() {},
    create() {},
    hide() {
      this.$root.$emit('bv::toggle::collapse', 'vacationSideBar');
    },
  },
};
</script>

<style scoped>
.sendBtn {
  background-color: #263a5a;
  color: white;
}

.cancelBtn {
  background-color: white;
  color: #263a5a;
  border: solid 2px #263a5a;
}

.footer {
  z-index: 1;
  position: absolute;
  bottom: 0;
}
.card {
  height: 160px;
}
#astronaut {
  position: absolute;
  right: 20px;
  top: -17px;
}
</style>
