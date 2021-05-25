import Vue from 'vue';
import Vuex from 'vuex';
import baseStates from './base/states';
import baseGetters from './base/getters';
import baseMutations from './base/mutations';
import baseActions from './base/actions';
import checkStates from './check/states';
import checkGetters from './check/getters';
import checkMutations from './check/mutations';
import checkActions from './check/actions';
import formStates from './form/states';
import formMutations from './form/mutations';
import formActions from './form/actions';
import planStates from './plan/states';
import planGetters from './plan/getters';
import planMutations from './plan/mutations';
import planActions from './plan/actions';
import companyStates from './company/states';
import companyGetters from './company/getters';
import companyMutations from './company/mutations';
import companyActions from './company/actions';
import diagnoseStates from './diagnose/states';
import diagnoseGetters from './diagnose/getters';
import diagnoseMutations from './diagnose/mutations';
import diagnoseActions from './diagnose/actions';
import stakeholdersStates from './stakeholders/states';
import stakeholdersGetters from './stakeholders/getters';
import stakeholdersMutations from './stakeholders/mutations';
import stakeholdersActions from './stakeholders/actions';
import goal from './goal';

Vue.use(Vuex);

const state = {
  ...baseStates,
  ...checkStates,
  ...formStates,
  ...planStates,
  ...companyStates,
  ...diagnoseStates,
  ...stakeholdersStates,
};

const getters = {
  ...baseGetters,
  ...checkGetters,
  ...planGetters,
  ...companyGetters,
  ...diagnoseGetters,
  ...stakeholdersGetters,
};

const mutations = {
  ...baseMutations,
  ...checkMutations,
  ...formMutations,
  ...planMutations,
  ...companyMutations,
  ...diagnoseMutations,
  ...stakeholdersMutations,
};

const actions = {
  ...baseActions,
  ...checkActions,
  ...formActions,
  ...planActions,
  ...companyActions,
  ...diagnoseActions,
  ...stakeholdersActions,
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    goal,
  },
});

export default store;
