import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  //public pages
  if (to.meta.auth) {
    //redirecting logged user to home page
    if (to.meta.auth === 'guest') {
      if (store.getters.isAuthenticated) {
        next('/');
      } else {
        next();
      }
    } else {
      next();
    }
  }

  //login required pages
  else {
    if (store.getters.isAuthenticated) {
      //user logged in
      next();
    } else {
      //user not login and redirected to login page
      next('login');
    }
  }
});

export default router;
