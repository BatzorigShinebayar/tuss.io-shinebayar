import axios from 'axios';
/* eslint-disable */
export default {
  nextWeekPlanData({ commit }, data) {
    return new Promise((resolve) => {
      commit("nextWeekPlanData", data);
      resolve();
    });
  },
  CICreateSideMenuToggle({ commit }, data) {
    return new Promise((resolve) => {
      commit("CICreateSideMenuToggle", data);
      resolve();
    });
  },
  dailyCheckCreate({ commit }, data) {
    return new Promise((resolve) => {
      commit("dailyCheckCreate", data);
      resolve();
    });
  },
  dailyCheckId({ commit }, data) {
    return new Promise((resolve) => {
      commit("dailyCheckId", data);
      resolve();
    });
  },
  dailyCheckData({ commit }, data) {
    return new Promise((resolve) => {
      commit("dailyCheckData", data);
      resolve();
    });
  },
  updateNextWeekPlan({ commit }, params) {
    console.log("sendingParams", params.data);
    return new Promise((resolve, reject) => {
      axios
        .post(
          "/pages/check/update_nextweek_plan/" + params.urlParam,
          params.data
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  orgDepNextWeekCriticalInfo({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/org_dep_next_week_critical_info/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getWeeklyReport({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/get_week_report/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getWeeklyCheckPlan({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/create_nextweek_plan/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTaskInfoByIds({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/pages/plan/get_task_name/", params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  weeklyCheckPlanUpdate(urlPath, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/pages/check/create_nextweek_plan/" + urlPath, params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  dailyCheckUpdate({ commit }, params) {
    console.log("sendingParams", params.data);
    return new Promise((resolve, reject) => {
      axios
        .post("/pages/check/daily_check_update/" + params.urlPath, params.data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCrucialInfoData({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/daily_check_by_date/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getTaskDetailByDate({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/get_plan_detail_by_date/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getThisWeekPlanByDate({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/this_week_plan_by_date/" + urlPath, { timeout: 360000 })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  getWeeklyCrucialInfo({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/weekly_critical_info/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getWeeklyCrucialInfoPlan({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/planned_task_stages/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getDailyCheckByEmployeeCreate({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/daily_check_by_employee_create/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  get_daily_check_create_data({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/daily_check_create/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  org_dep_daily_check_detail({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/org_dep_daily_check_detail/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  employee_daily_check_detail({ commit }, urlPath) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/employee_daily_check_detail/" + urlPath)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  crucialInfoMonthly({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/crucial-info-monthly/", {
          params
        })
        .then((response) => {
          commit("crucialInfoMonthly", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  checkListConflictMonthly({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/check-list-conflict-monthly/", {
          params
        })
        .then((response) => {
          commit("checkListConflictMonthly", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  incentiveMonthly({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/incentive-monthly/", {
          params
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  thisWeek({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .post("/this-week/", {
          params
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  crucialInfoTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/crucial-info-task/", {
          params
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getDashboardCrucialInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/get_week_report_ci/" +
          params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getDashboardCrucialInfoTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("/pages/check/get_week_report_ct/"+
          params
        )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};
