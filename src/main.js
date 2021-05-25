import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';
import VueMeta from 'vue-meta';
import { Vuelidate } from 'vuelidate';
import { BootstrapVue } from 'bootstrap-vue';
import VueFilterDateFormat from 'vue-filter-date-format';
import 'simplebar/dist/simplebar.min.css';
import 'boxicons';
import 'boxicons/css/boxicons.css';
import '@/assets/style/main.scss';
import '@/plugins/fontawesome';
import '@/plugins/element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // Default lang is Chinese
import '@/plugins/axios';
import '@/plugins/filters';
import '@/plugins/mixins';
import excel from 'vue-excel-export';
import { GanttPlugin } from '@syncfusion/ej2-vue-gantt';

Vue.config.productionTip = true;
Vue.use(ElementUI, { locale });
Vue.use(VueMeta, { refreshOnceOnNavigation: true });
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(excel);
Vue.use(GanttPlugin);
Vue.use(VueFilterDateFormat);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
