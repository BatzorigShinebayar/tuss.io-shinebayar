<template>
  <div>
    <div>
      <b-col cols="12">
        <b-row style="min-width: 1025px">
          <b-col class="pl-0">
            <CIPerfCards />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="pt-3 pl-0">
        <b-row>
          <b-col cols="12">
            <div class="card p-3 m-xl-5">
              <div>
                <b-row>
                  <h2 class="mb-8 text-4xl font-bold text-center capitalize">
                    Daily Check :
                    <span class="text-green-700">New York Times</span>
                  </h2>
                </b-row>
              </div>
              <b-row>
                <div class="col-md pt-3">
                  <swiper
                    ref="cardSwiper"
                    :options="swiperOption"
                    class="d-flex p-1"
                  >
                    <swiper-slide
                      v-for="(post, index) in posts"
                      :key="index"
                      class="justify-content-center"
                    >
                      <NytNewsCard v-if="!loading && !error" :posts="post" />
                    </swiper-slide>
                  </swiper>
                </div>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NytNewsCard from './NytNewsCard';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    NytNewsCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        updateOnWindowResize: false,
        grabCursor: true,
      },
      section: 'technology',
      posts: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    extractImage(post) {
      const defaultImg = {
        url: 'http://placehold.it/210x140?text=N/A',
        caption: post.title,
      };
      if (!post.multimedia) {
        return defaultImg;
      }
      let imgObj = post.multimedia.find(
        (media) => media.format === 'mediumThreeByTwo210'
      );
      return imgObj ? imgObj : defaultImg;
    },
    async fetchNews() {
      try {
        this.error = null;
        this.loading = true;
        const url = `http://127.0.0.1:3000/svc/topstories/v2/${this.section}.json?api-key=H4ry6NniLuyjtrpJYoATaq2zLe6uZw1l`;
        const response = await axios.get(url);
        const results = response.data.results;
        this.posts = results.map((post) => ({
          title: post.title,
          abstract: post.abstract,
          url: post.url,
          thumbnail: this.extractImage(post).url,
          caption: this.extractImage(post).caption,
          byline: post.byline,
          published_date: post.published_date,
        }));
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>
