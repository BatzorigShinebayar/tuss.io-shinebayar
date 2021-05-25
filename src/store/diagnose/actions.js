import axios from 'axios';
/* eslint-disable */
export default {
  diagnoseListDashboard({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/diag/list_diagnoses_dashboard/' + params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  diagnoseListView({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/diag/list_diagnoses/' + params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postDiagnoseTemplateList({ commit }, params) {
    return new Promise((resolve, reject) => {
      const url = params.urlParam;
      const data = params.urlData;
      if (url) {
        axios
          .put('/api/diagnosis_temp_line/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/api/diagnosis_temp_line/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  getDiagnoseTemplateList({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('pages/diag/list_diagnosis_template/' + params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
