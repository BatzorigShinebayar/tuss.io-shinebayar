export default {
  crucialInfoMonthly(state, crucialInfoMonthly) {
    state.crucialInfoMonthly = crucialInfoMonthly;
  },
  checkListConflictMonthly(state, checkListConflictMonthly) {
    state.checkListConflictMonthly = checkListConflictMonthly;
  },
  nextWeekPlanData(state) {
    return state.nextWeekPlanData;
  },
  CICreateSideMenuToggle(state, data) {
    state.CICreateSideMenuToggle = data;
  },
  dailyCheckData(state, data) {
    state.daily_check_data = data;
  },
  dailyCheckCreate(state, data) {
    state.daily_check_create = data;
  },
  dailyCheckId(state, data) {
    state.dailycheck_id = data;
  },
};
