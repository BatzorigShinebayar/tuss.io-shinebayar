import axios from 'axios';
/* eslint-disable */
export default {
  getTaskTeamsByTaskId({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/get_task_team/' + params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  postTaskTeamMember({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/plan/add_task_team/', params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTaskCoordinationById({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/view_task_coordination/' + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createTaskCoordination({ commit }, param) {
    return new Promise((resolve, reject) => {
      axios
        .post('/pages/plan/create_task_coordination/', param)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateTaskCoordination({ commit }, urlVal) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/pages/plan/update_task_coordination/' + urlVal.urlParam,
          urlVal.urlData
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCoordinationReason({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/list_coordination_reason/' + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTaskCoordination({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/list_task_coordination/' + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTaskByOrgId({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/list_task_by_org/' + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTaskDetailById({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get('/pages/plan/view_full_task_info/' + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  companyPlan({ commit }, organizationId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/pages/plan/list_company_plan/${organizationId}/`)
        .then((response) => {
          commit('companyPlan', response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  task({ state }, params) {
    if (params.plan_company) {
      for (const task of state.getters.companyPlan) {
        if (params.plan_company === task.year) {
          params.plan_company = task.id;
        }
      }
    }

    return axios
      .get('/task/', { params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  },

  taskDetail({ getters }, taskId) {
    return axios
      .get('/task/' + String(taskId) + '/')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  taskStageGroup({ commit }, params) {
    return axios
      .get('/task_stage_group/', { params })
      .then((response) => {
        commit('taskStageGroup', response.data);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  taskStage({ commit }, params) {
    return axios
      .get('/task_stage/', { params })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  taskType({ commit }, organizationId) {
    return axios
      .get('/task_type/', { params: { organization: organizationId } })
      .then((response) => {
        commit('taskType', response.data);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },

  taskStageState({ commit }, organizationId) {
    return axios
      .get('/task_stage_state/', { params: { organization: organizationId } })
      .then((response) => {
        commit('taskStageState', response.data);
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};
