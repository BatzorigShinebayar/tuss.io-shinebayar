<template>
  <div>
    <div id="setting-menu"></div>
    <div class="py-3">
      <b-col cols="12">
        <i id="setting-button" class="bx bx-cog bx-sm" @click="buildForm()"></i>
        <simplebar data-simplebar-auto-hide="true" class="h-100 w-100">
          <div class="overflow-auto h-100 mr-5 mt-2">
            <b-col cols="12">
              <b-row class="d-flex mt-3">
                <div class="form-foundation-setting">
                  <b-col class="d-flex justify-content-between" cols="12">
                    <i
                      id="formSetting"
                      class="bx bxs-cog bx-sm"
                      @mouseover="hoverSetting(true)"
                      @mouseleave="hoverSetting(false)"
                      @click="clickSetting"
                    ></i>
                    <div
                      id="form-setting-panel"
                      class="
                        align-self-center
                        w-100
                        d-flex
                        justify-content-between
                      "
                    >
                      <span @click="panelWidth(4)">
                        <i class="bx bxs-layout bx-xs ml-1"></i> md-4
                      </span>
                      <span @click="panelWidth(3)">
                        <i class="bx bxs-layout bx-xs ml-1"></i> md-3
                      </span>
                      <span @click="panelWidth(2)">
                        <i class="bx bxs-layout bx-xs ml-1"></i> md-2
                      </span>
                      <span @click="panelWidth(1)">
                        <i class="bx bxs-layout bx-xs ml-1"></i> md-1
                      </span>
                    </div>
                  </b-col>
                </div>
                <b-col
                  v-for="val in formPanelWidth"
                  :key="val"
                  :cols="12 / formPanelWidth"
                  :value="12 / formPanelWidth"
                >
                  <div
                    class="form-foundation text-muted create"
                    @click="createFoundation($event)"
                  >
                    -- Суурь бэлдэх --
                  </div>
                </b-col>
                <b-col cols="12">
                  <b-form-row id="form-container">
                    <b-col
                      v-for="(val, indx) in formFoundation"
                      :key="indx"
                      :cols="val.col"
                    >
                      <div class="form-foundation text-muted mt-2">
                        -- Форм нэмэх --
                        <i
                          class="bx bx-trash color-red"
                          style="position: absolute; top: 15px; right: 12px"
                          @click="deleteForm($event)"
                        ></i>
                      </div>
                    </b-col>
                  </b-form-row>
                </b-col>
              </b-row>
            </b-col>
          </div>
        </simplebar>
      </b-col>
    </div>
  </div>
</template>

<script>
import simplebar from 'simplebar-vue';

export default {
  name: 'FormViewer',
  components: { simplebar },

  props: {
    formTemplate: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formPanelWidth: 1,
      formFoundation: [],
    };
  },
  created() {},
  methods: {
    buildForm() {
      const formMenuCSS = document.getElementById('setting-menu').style;
      formMenuCSS.width = formMenuCSS.width === '' ? '40%' : '';
    },
    hoverSetting(data) {
      const formSetting = document.getElementById('formSetting');
      const formPanelCSS = document.getElementById('form-setting-panel').style;
      if (data === true) {
        formSetting.classList.add('bx-rotate-90');
        formPanelCSS.display = 'block';
      } else {
        formSetting.classList.remove('bx-rotate-90');
        formPanelCSS.display = 'none';
      }
    },
    clickSetting() {
      const formPanelCSS = document.getElementById('form-setting-panel').style;
      formPanelCSS.display = formPanelCSS.display === 'none' ? 'block' : 'none';
    },
    panelWidth(data) {
      this.formPanelWidth = data;
    },
    createFoundation(event) {
      this.formFoundation.push({
        col: event.target.parentElement.getAttribute('value'),
      });
      console.log(this.formFoundation);
    },
    deleteForm(event) {
      document
        .getElementById('form-container')
        .removeChild(event.target.parentElement.parentElement);
    },
  },
};
</script>
<style scoped>
#setting-menu {
  z-index: 1;
  float: right;
  top: 0;
  right: 0;
  background-color: gray;
  width: 0;
  height: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transition: width 1s;
}
#setting-button {
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 9999;
  cursor: pointer;
  float: right;
}
.form-foundation {
  background-color: transparent;
  border: 2px dashed green;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}
.form-foundation.create {
  border: 2px dashed orange;
}
.form-foundation:hover {
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.08);
}
.form-foundation:active {
  border: 2px solid orange;
}
.form-foundation-setting {
  position: absolute;
  z-index: 99;
  float: left;
  cursor: pointer;
  top: -11px;
}
#form-setting-panel {
  display: block;
  transition: width 1s;
}
</style>
