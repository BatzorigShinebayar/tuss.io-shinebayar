import axios from 'axios';

export default {
  token(state) {
    return state.token;
  },

  isAuthenticated(state) {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = state.token;
      return true;
    } else {
      return false;
    }
  },

  user(state) {
    return state.user;
  },

  company(state) {
    return state.company;
  },

  activeCompany(state) {
    return parseInt(state.activeCompany);
  },

  spinnerLoad(state) {
    return state.spinnerLoad;
  },

  spinner(state) {
    return state.spinner;
  },
};
