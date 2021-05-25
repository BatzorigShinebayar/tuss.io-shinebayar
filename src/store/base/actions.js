import axios from 'axios';
/* eslint-disable */
export default {
  async token({ commit }, context) {
    await axios.post('/api/token/', context).then((response) => {
      const token = `Bearer ${response.data.access}`;
      axios.defaults.headers.common['Authorization'] = token;
      commit('setToken', token);
      commit('user', response.data.user);
      commit('activeCompany', response.data.user.company_id);
    });
  },

  async company({ commit, getters }) {
    const companyId = getters.activeCompany;
    await axios
      .post('/api/company/', { organization: companyId })
      .then((response) => {
        commit('company', response.data);
      });
  },

  logout({ commit }) {
    commit('removeToken', null);
    commit('user', null);
    commit('activeCompany', null);
    commit('company', null);
  },

  spinnerLoad({ commit, getters }, payload) {
    let queue = getters.spinnerLoad;

    if (payload === true) {
      queue += 1;
    } else {
      queue -= 1;
    }

    commit('spinnerLoad', queue);

    if (queue === 0) {
      commit('spinner', false);
    } else {
      commit('spinner', true);
    }
  },

  getSalaryCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/salary-category/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getCompanyJobTitles({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/job-title/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getDuty({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/duty_info/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderCreatePartner({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/company_builder/partner/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderCreateAlgorithm({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/company_builder/algorithm/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderGetRules({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/company_builder/rules/', { params: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderGetRuleDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/company_builder/rules/detail/', { params: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderCreateRules({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/company_builder/rules/detail/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderGetRegulationDetail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/company_builder/regulation/detail/', { params: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderCreateRegulation({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/company_builder/regulation/detail/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderGetDepartment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/company_builder/department/', { params: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyBuilderGetFunction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/company_builder/function/', { params: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getDepartments({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/department/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getJobTitlePermission({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/job-title-permission/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postJobTitle({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      if (url) {
        axios
          .put('/api/job-title/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/api/job-title/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  postJobTitlePermission({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      if (url) {
        axios
          .put('/api/job-title-permission/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/api/job-title-permission/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  getCompany({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/company/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getOrganizations({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/organization/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateOrganization({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      axios
        .put('/api/organization/' + url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getOrganizationTypes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/organization-type/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCompanyGroup({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/org-group/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateOrganizationGroup({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      axios
        .put('/api/org-group/' + url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getJobTitlePartners({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/job-title-partner/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createUpdateJobTitlePartners({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      if (url) {
        axios
          .put('/api/job-title-partner/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/api/job-title-partner/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  getPartners({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/partner/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/country/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getContentAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/content-action/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPermissionTemplateContentaction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/permission-template-content-action/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postPermissionTemplateContentaction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const url = payload.urlParams;
      const data = payload.urlData;
      console.log('payload', url, data);
      if (url) {
        axios
          .put('/api/permission-template-content-action/' + url, data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        axios
          .post('/api/permission-template-content-action/', data)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  },
  postPermissionTemplate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/permission-template/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPermissionTemplate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/permission-template/' + payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePermissionTemplate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/permission-template/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getFunction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/function-type-full/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postFunction({ commit }, payload) {
    if (!payload.urlParam){
    return new Promise((resolve, reject) => {
      axios
        .post('/api/function/', payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
    } else {
      return new Promise((resolve, reject) => {
        axios
          .put('/api/function/'+payload.urlParam, payload.urlData)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  postSubFunction({ commit }, payload) {
    if (!payload.urlParam){
    return new Promise((resolve, reject) => {
      axios
        .post('/api/sub-function/', payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/sub-function/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  },
  getOrganizationAlgorithm({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/organization-algorithm/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  putOrganizationAlgorithm({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/organization-algorithm/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
