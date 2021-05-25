import axios from 'axios';
import router from '@/router';
import store from '@/store';

axios.defaults.baseURL = 'https://base-api.tuss.io';
// axios.defaults.baseURL = 'http://localhost:9070';

axios.defaults.timeout = 3600000;

//on send request
axios.interceptors.request.use((context) => {
  store.dispatch('spinnerLoad', true);
  return context;
});

//on response
axios.interceptors.response.use(
  (response) => {
    store.dispatch('spinnerLoad', false);
    return response;
  },

  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //excluding login response
        if (error.response.config.url !== '/api/token/') {
          router.push({ name: 'logout' });
        }
      }
    }

    store.dispatch('spinnerLoad', false);
    return Promise.reject(error);
  }
);
