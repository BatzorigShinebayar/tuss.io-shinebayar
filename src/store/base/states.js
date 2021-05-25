export default {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  company: JSON.parse(localStorage.getItem('company')) || null,
  activeCompany: localStorage.getItem('activeCompany') || null,
  spinnerLoad: 0,
  spinner: false,
  is_developer: false,
};
