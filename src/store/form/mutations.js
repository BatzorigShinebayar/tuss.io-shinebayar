export default {
  changeGrpId(state, data) {
    state.grp_id = data;
  },
  changeOrgId(state, data) {
    state.org_id = data;
  },
  changeDepId(state, data) {
    state.dep_id = data;
  },
  changeUsrId(state, data) {
    state.usr_id = data;
  },
  changeEmpId(state, data) {
    state.emp_id = data;
  },
  changeEmpName(state, data) {
    state.emp_name = data;
  },
  changeEmpImg(state, data) {
    state.emp_img = data;
  },
  changeFormName(state, data) {
    state.form_name = data;
  },
  changeFormCode(state, data) {
    state.form_code = data;
  },
  changeSubmit(state, data) {
    state.submit = data;
  },
  changeForms(state, data) {
    state.forms = data;
  },
  pushForms(state, data) {
    state.forms.push(data);
  },
  changeActiveField(state, data) {
    state.activeField = data;
  },
  changeActiveTabForFields(state, data) {
    state.activeTabForFields = data;
  },
};
