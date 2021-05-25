export default {
  changeGrpId({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeGrpId', data);
      resolve();
    });
  },
  changeOrgId({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeOrgId', data);
      resolve();
    });
  },
  changeDepId({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeDepId', data);
      resolve();
    });
  },
  changeUsrId({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeUsrId', data);
      resolve();
    });
  },
  changeEmpId({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeEmpId', data);
      resolve();
    });
  },
  changeEmpImg({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeEmpImg', data);
      resolve();
    });
  },
  changeEmpName({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeEmpName', data);
      resolve();
    });
  },
  changeFormName({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeFormName', data);
      resolve();
    });
  },
  changeFormCode({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeFormCode', data);
      resolve();
    });
  },
  changeForms({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeForms', data);
      resolve();
    });
  },
  pushForms({ commit }, data) {
    return new Promise((resolve) => {
      commit('pushForms', data);
      resolve();
    });
  },
  changeSubmit({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeSubmit', data);
      resolve();
    });
  },
  changeActiveField({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeActiveField', data);
      resolve();
    });
  },
  changeActiveTabForFields({ commit }, data) {
    return new Promise((resolve) => {
      commit('changeActiveTabForFields', data);
      resolve();
    });
  },
};
