import axios from 'axios';

export default {
  getAlgorithmDetail({ commit, getters }, algId) {
    return new Promise((resolve, reject) => {
      const url = `/pages/company_builder/algorithm/${algId}/`;
      axios
        .get(url)
        .then((response) => {
          commit('algorithmDetail', response.data);
          const company = getters.company;
          for (let i = 0; i < company.algorithm.length; i++) {
            if (company.algorithm[i].id === response.data.id) {
              company.algorithm[i] = response.data;
              commit('company', company);
            }
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getDepartment({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      const url = '/pages/company_builder/department/';

      axios
        .get(url, { params: payload })
        .then((response) => {
          const company = getters.company;
          company.department = response.data;
          commit('company', company);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createUpdateGroup({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      if (url) {
        axios
          .put('/pages/company_builder/group_create/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/pages/company_builder/group_create/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  createUpdateOrganization({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/company_builder/organization_create/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
