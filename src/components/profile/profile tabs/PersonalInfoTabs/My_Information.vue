<template>
  <div>
    <b-col>
      <b-col cols="12" class="lined-card px-0 mt-3">
<!--        <div class="card-body under-border">-->
<!--          <div class="media">-->
<!--            <div class="media-body flex-space-between">-->
<!--              <p><strong>Personal info</strong></p>-->
<!--              <Fa-->
<!--                class="cursor-pointer"-->
<!--                :icon="['fas', 'cog']"-->
<!--                @click="editPersonalInfo"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="card-body">
          <div class="media">
            <div class="media-body d-flex">
              <b-col class="d-table" cols="6">
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>First Name</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.name }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Last Name</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.last_name }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Registry Number</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.register }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Date of Birth</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.birthday }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Phone</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.mobile }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Language</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.language }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Gender</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.gender }} </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Email</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> {{ emp_profile.email }} </u>
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </div>
          </div>
        </div>
      </b-col>
    </b-col>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'My_Information',
  components: {},
  data(){
    return{
      emp_profile:[],
    }
  },
  methods:{
    getProfile(){
      const query = this.$route.query;
      if(!query.is_active){
        query.is_active = '1';
      }
      const url = `/api/partner/${this.$store.getters.user.partner_id}/`;

      axios.get(url,{params:query}).then((response) =>{
        this.emp_profile = response.data;
      })
    },
  },
  mounted() {
    this.getProfile()
  }
};
</script>

<style scoped></style>
