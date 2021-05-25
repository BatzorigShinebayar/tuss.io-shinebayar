import axios from 'axios';
/* eslint-disable */
export default {
  getPartnerTypeRel({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/partner_type_rels/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPartnerRel({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/partner_rel/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePartnerRel({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/shm/partner_rel/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createPartnerRel({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/partner_rel/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePartner({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/partner/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createPartner({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/partner/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getOrgPartnerType({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/org_partner_type/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateOrgPartnerType({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/shm/org_partner_type/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createOrgPartnerType({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/org_partner_type/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postPartnerType({ commit }, payload) {
    if (!payload.urlParam){
      return new Promise((resolve, reject) => {
        axios
          .post('/api/shm/partner_type/', payload.urlData)
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
          .put('/api/shm/partner_type/'+payload.urlParam, payload.urlData)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  getPartnerTypes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/partner_type/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPartnerDetailById({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/partner_details_by_id/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
  getLeavetypes({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/leave_type/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getVacationLeaveDays({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/allowed_vacaction_days/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  putVacationLeaveDays({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/shm/allowed_vacaction_days/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createLeaveRequest({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/leave_request/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  putLeaveRequest({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/shm/leave_request/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLeaveRequest({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/leave_request/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getPartnerTypeInfoBase({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/partner_type_info_base/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePartnerTypeInfoBase({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .put('/api/shm/partner_type_info_base/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createPartnerTypeInfoBase({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/partner_type_info_base/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getInfoBaseData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/shm/info_base_data/'+ payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createInfoBaseData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/info_base_data/', payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateInfoBaseData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/shm/info_base_data/'+payload.urlParam, payload.urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
