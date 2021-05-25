export default {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },

  removeToken(state) {
    state.token = null;
    localStorage.removeItem('token');
  },

  user(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },

  activeCompany(state, activeCompanyId) {
    state.activeCompany = activeCompanyId;
    localStorage.setItem('activeCompany', activeCompanyId);
  },

  company(state, company) {
    state.company = company;
    localStorage.setItem('company', JSON.stringify(company));
  },

  spinnerLoad(state, spinner) {
    state.spinnerLoad = spinner;
  },

  spinner(state, spinner) {
    state.spinner = spinner;
  },
};
