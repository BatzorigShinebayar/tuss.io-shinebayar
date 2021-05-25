export default {
  nextWeekPlanData(state) {
    return state.nextWeekPlanData;
  },
  crucialInfoMonthly(state) {
    return state.crucialInfoMonthly;
  },
  checkListConflictMonthly(state) {
    return state.checkListConflictMonthly;
  },
  CICreateSideMenu(state) {
    return state.CICreateSideMenuToggle;
  },
  dailyCheckData(state) {
    return state.daily_check_data;
  },
  dailyCheckCreate(state) {
    return state.daily_check_create;
  },
  dailyCheckId(state) {
    return state.dailycheck_id;
  },
  getThisWeekId() {
    const todayDate = new Date();
    let yearsFirstDay = new Date(todayDate.getFullYear(), 0, 1);
    const day = yearsFirstDay.getDay();
    if (day !== 1) {
      yearsFirstDay = new Date(todayDate.getFullYear(), 0, 1 + (7 - day));
    }
    const numberOfDays = Math.floor(
      (todayDate - yearsFirstDay) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil(numberOfDays / 7);
  },
};
