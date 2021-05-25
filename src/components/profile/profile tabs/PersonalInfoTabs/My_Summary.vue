<template>
  <div>
    <b-col>
      <b-col cols="12" class="lined-card px-0 mt-3">
<!--        <div class="card-body under-border">-->
<!--          <div class="media">-->
<!--            <div class="media-body flex-space-between">-->
<!--              <p><strong>Personal info</strong></p>-->
<!--              <Fa-->
<!--                class="cursor-pointer"-->
<!--                :icon="['fas', 'cog']"-->
<!--                @click="editPersonalInfo"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="card-body">
          <div class="media">
            <div class="media-body d-flex">
              <b-col class="d-table" cols="6">
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>First Name</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> Shinebayar </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Last Name</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> Batzorig </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Registry Number</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> XX99999999 </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Date of Birth</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> 1992 / 01 / 28 </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Phone</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> 88859666 </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Language</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> MN </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Gender</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> Male </u>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col cols="5">
                    <p>Email</p>
                  </b-col>
                  <b-col cols="7">
                    <p>
                      <u> batzorig.shinebayar@yahoo.com </u>
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </div>
          </div>
        </div>
      </b-col>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'My_Summary',
  components: {},
  // data() {
  //   return {
  //     menuType: 'list',
  //     partnerType: null,
  //     activity: true,
  //     partnerData: null,
  //     tempData: null,
  //     sideBarType: null,
  //     sideBarData: null,
  //     json_data: null,
  //     value: 10,
  //     additionalData: [],
  //     tempAdditionalData: [],
  //   };
  // },
  // watch: {
  //   partnerType(data) {
  //     const param = `?is_active=1&organization_id=${this.$store.getters.activeCompany}&partner_id=${this.$route.params.id}&partner_type=${data}`;
  //     this.getOrgPartnerType(param);
  //   },
  // },
  // beforeMount() {
  //   const params = this.$route.params.id + '/';
  //   this.getPartnerDetailById(params);
  // },
  // methods: {
  //   setTableData(data) {
  //     console.log('setTableData', data);
  //     const list = [];
  //     for (const i in data) {
  //       const json = {};
  //       for (const j in data[i]) {
  //         json[data[i][j].id] = data[i][j].value;
  //       }
  //       list.push(json);
  //     }
  //     console.log('setTableData_list', list);
  //     return list;
  //   },
  //   setTableField(data) {
  //     const value = [];
  //     value.push({
  //       key: 'sequence',
  //       label: '',
  //     });
  //     for (const i in data) {
  //       const json = {
  //         key: data[i].id,
  //         label: data[i].label,
  //       };
  //       value.push(json);
  //     }
  //     return value;
  //   },
  //   changeType(typeId) {
  //     this.partnerType = typeId;
  //   },
  //   setMenu(type) {
  //     this.menuType = type;
  //   },
  //   async getPartnerType(params) {
  //     const response = await this.$store.dispatch('getPartnerTypes', params);
  //     if (response.status === 200) {
  //       const partner_types = response.data.results;
  //       const partner_type_ids = this.tempData.partner_types_id;
  //       for (const i in partner_type_ids) {
  //         if (i === '0') {
  //           this.partnerType = partner_type_ids[i];
  //         }
  //         for (const j in partner_types) {
  //           if (partner_types[j].id === partner_type_ids[i]) {
  //             let json_data = {
  //               id: partner_types[j].id,
  //               short_name: partner_types[j].short_name,
  //             };
  //             partner_type_ids[i] = json_data;
  //           }
  //         }
  //       }
  //       this.partnerData = this.tempData;
  //       console.log(this.partnerData);
  //     }
  //   },
  //   async getPartnerDetailById(params) {
  //     const response = await this.$store.dispatch(
  //       'getPartnerDetailById',
  //       params
  //     );
  //     if (response.status === 200) {
  //       this.tempData = response.data;
  //       const param = `?is_active=1&organization=${this.$store.getters.activeCompany}`;
  //       await this.getPartnerType(param);
  //     }
  //   },
  //   async getOrgPartnerType(params) {
  //     const response = await this.$store.dispatch('getOrgPartnerType', params);
  //     if (response.status === 200) {
  //       const org_partner_types = response.data.results;
  //       this.tempAdditionalData = [];
  //       for (const i in org_partner_types) {
  //         const params = `?org_partner_type=${org_partner_types[i].id}&is_active=1&ordering=id`;
  //         await this.getPartnerTypeInfoBase(params);
  //       }
  //     }
  //   },
  //   async getPartnerTypeInfoBase(params) {
  //     const response = await this.$store.dispatch(
  //       'getPartnerTypeInfoBase',
  //       params
  //     );
  //     if (response.status === 200) {
  //       //
  //       this.tempAdditionalData = response.data.results;
  //       // for (const i in this.tempAdditionalData) {
  //       //   this.tempAdditionalData[i].data = this.tempAdditionalData[
  //       //     i
  //       //   ].loaded_items;
  //       //   for (const j in this.tempAdditionalData[i].data) {
  //       //     if (this.tempAdditionalData[i].is_multi_data) {
  //       //       this.tempAdditionalData[i].data[j].value = [];
  //       //     } else {
  //       //       this.tempAdditionalData[i].data[j].value = null;
  //       //     }
  //       //   }
  //       // }
  //       for (const i in this.tempAdditionalData) {
  //         const param = `?info_base=${this.tempAdditionalData[i].id}`;
  //         this.tempAdditionalData[i].partnerType = this.partnerType;
  //         this.getInfoBaseData(param);
  //       }
  //     }
  //   },
  //
  //   async getInfoBaseData(params) {
  //     const response = await this.$store.dispatch('getInfoBaseData', params);
  //     if (response.status === 200) {
  //       if (response.data.total > 0) {
  //         for (const j in response.data.results) {
  //           for (const i in this.tempAdditionalData) {
  //             if (
  //               this.tempAdditionalData[i].id ===
  //               response.data.results[j].info_base
  //             ) {
  //               this.tempAdditionalData[i].data =
  //                 response.data.results[0].loaded_json_data;
  //               this.tempAdditionalData[i].info_data_id =
  //                 response.data.results[j].id;
  //             }
  //           }
  //         }
  //       }
  //       this.additionalData = [];
  //       for (const i in this.tempAdditionalData) {
  //         this.additionalData.push(this.tempAdditionalData[i]);
  //       }
  //       console.log('this.additionalData', this.additionalData);
  //     }
  //   },
  //   changeMenu(data) {
  //     this.menuType = data;
  //   },
  //   hideActivity() {
  //     this.activity = !this.activity;
  //   },
  //   download() {
  //     console.log('download');
  //   },
  //   markAsFormer() {
  //     console.log('markAsFormer');
  //   },
  //   editPersonalInfo() {
  //     this.sideBarType = 'Personal info';
  //     this.sideBarData = this.partnerData;
  //     this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
  //   },
  //   editAdditionalInfo(data) {
  //     this.sideBarType = 'Additional info';
  //     this.sideBarData = { ...data };
  //     console.log('this.partnerData', data);
  //     this.$root.$emit('bv::toggle::collapse', 'sideBarEdit');
  //   },
  // },
};
</script>
<style scoped>
.badge.active {
  background-color: white;
  color: black;
}
.left-border {
  border-left: 2px solid gainsboro;
  height: 100%;
}
.under-border {
  border-bottom: 2px solid gainsboro;
  width: 100%;
}
</style>
