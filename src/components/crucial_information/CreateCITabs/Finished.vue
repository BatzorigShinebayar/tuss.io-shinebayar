<template>
  <div>
    <b-col cols="12">
      <div class="d-block">
        <b-row id="finishIMG" class="d-flex justify-content-center">
          <img
            id="finish-astronaut"
            src="@/assets/images/background/astronaut.png"
            alt="astronaut"
          />
        </b-row>
        <b-row class="mt-4 d-flex justify-content-center">
          <h4 class="w-55 text-center">
            Өнөөдрийн үүргийн гүйцэтгэлээ үнэн зөв мэдээлэлсэнд баярлалаа!
          </h4>
        </b-row>
        <b-row class="mt-3 d-flex justify-content-center">
          <p>
            Бид танийг өнөөдөр гүйцэтгэсэн ажлуудын гүйцэтгэлийг оруулах мөн
            зөвлөж байна.
          </p>
        </b-row>
        <b-row class="mt-4 d-flex justify-content-center">
          <div>
            <div id="dashboard" class="ml-4 btn btn-secondary">
              <p>Хянах самбарлуу очих</p>
            </div>
            <div class="btn btn-secondary">
              <p>Одоо оруулья!</p>
            </div>
          </div>
        </b-row>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'CI4Finished',
  components: {},
  props: {},
  data() {
    return {
      score: [{}],
    };
  },
  methods: {
    addScore() {
      this.score.push({});
    },
  },
};
</script>
<style scoped>
#finishIMG {
  margin-top: 200px;
}
.w-55 {
  width: 55%;
}
#finish-astronaut {
  width: 250px;
}
.btn-secondary {
  background-color: #2a3042;
  color: white;
}

#dashboard.btn-secondary {
  background-color: white;
  color: #2a3042;
  border: 1px solid #2a3042;
}
</style>
