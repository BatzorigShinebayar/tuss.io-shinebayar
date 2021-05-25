<template>
  <b-sidebar
    id="diagnoseTemplate-edit"
    title="Diagnose template edit"
    right
    shadow
    backdrop
    lazy
    class="sidebar-lg"
  >
    <div class="p-3" v-if="diagnoseTemplate !== null">
      <b-form-group id="input-group-1" label="Code" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="diagnoseTemplate.code"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Symptom" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="diagnoseTemplate.name"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Sequence" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="diagnoseTemplate.sequence"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="is_active" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="diagnoseTemplate.is_active"
          type="checkbox"
          true-value="1"
          false-value="0"
        ></b-form-input>
      </b-form-group>
    </div>
    <div>
      <b-row class="mx-1">
        <b-col cols="12">
          <DiagnoseTemplateLine
            v-if="tabMenu === 'DiagnoseTemplateLine'"
            :diagnose-template-id="diagnoseTemplate.id"
            @emit_data="emitDiagTempLines"
          />
        </b-col>
      </b-row>
    </div>

    <template #footer="{ hide }">
      <b-col cols="12" class="d-flex bg-secondary py-3 footer">
        <b-col class="p-0" cols="9">
          <p class="btn sendBtn w-100" @click="send">Save</p>
        </b-col>
        <b-col class="pr-0" cols="3">
          <p class="cancelBtn w-100 btn" @click="hide">Close</p>
        </b-col>
      </b-col>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import DiagnoseTemplateLine from '@/components/diagnose-system/diagnose_template/DiagnoseTemplateLine';

export default {
  name: 'DiagnoseTemplateEdit',
  components: {
    DiagnoseTemplateLine,
  },
  props: {
    diagnoseTemplate: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      diagTempLines: [],
      tabMenu: 'DiagnoseTemplateLine',
      name: '',
      symptom: '',
      templateLinesData: [],
    };
  },

  validations: {
    reasonSelected: { required },
    documentData: { required },
  },

  watch: {},
  mounted() {
    const param = this.$store.getters.activeCompany + '/';
    this.getDiagnoseTemplateList(param);
  },
  methods: {
    async postDiagnoseTemplateList(params) {
      const response = await this.$store.dispatch(
        'postDiagnoseTemplateList',
        params
      );
      if (response.status === 200) {
        return true;
      }
    },
    async getDiagnoseTemplateList(params) {
      const response = await this.$store.dispatch(
        'getDiagnoseTemplateList',
        params
      );
      if (response.status === 200) {
        const company = { ...this.$store.getters.company };
        company.diagnosis_templates = response.data;
        this.$store.commit('company', company);
        console.log('company', this.$store.getters.company);
      }
    },
    closeSideBar() {
      this.$store.dispatch('CICreateSideMenuToggle', false);
    },
    emitDiagTempLines(data) {
      this.diagTempLines = data;
    },
    async send() {
      const checkList = [];
      for (const i in this.diagTempLines) {
        delete this.diagTempLines[i].diagnoseType;
        let id = '';
        let jsonData = {
          diagnosis_template_id: this.diagnoseTemplate.id,
        };
        if (this.diagTempLines[i].id) {
          jsonData.is_active = this.diagnoseTemplate.is_active;
          jsonData.updated_user = this.$store.getters.user.id;
          jsonData.updated_date = new Date();
          id = this.diagnoseTemplate.id + '/';
        } else {
          jsonData.created_user = this.$store.getters.user.id;
          jsonData.updated_user = this.$store.getters.user.id;
          jsonData.created_date = new Date();
          jsonData.updated_date = new Date();
          jsonData.organization_id = this.$store.getters.activeCompany;
        }
        jsonData = { ...jsonData, ...this.diagTempLines[i] };
        const params = {
          urlParam: id,
          urlData: jsonData,
        };
        console.log('sendingData', jsonData);
        checkList.push(await this.postDiagnoseTemplateList(params));
      }
      if (checkList.length === this.diagTempLines.length) {
        console.log('done');
        const param = this.$store.getters.activeCompany + '/';
        this.getDiagnoseTemplateList(param);
      }
    },
  },
};
</script>

<style scoped>
.break {
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
}
.sendBtn {
  background-color: #2a3042;
  color: white;
}
.cancelBtn {
  background-color: white;
  color: #2a3042;
  border: solid 2px #2a3042;
}
</style>
