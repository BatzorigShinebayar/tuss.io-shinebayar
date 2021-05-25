<template>
  <b-col cols="12">
    <div class="card mt-3">
      <div class="card-body cursor-pointer">
        <div class="media">
          <div class="media-body d-flex">
            <b-col class="d-flex" cols="4">
              <div class="mr-1 align-self-center">
                <Fa
                  v-if="collapsed"
                  :icon="['fas', 'caret-circle-down']"
                  size="2x"
                  class="text-deep-blue"
                  @click="detailCollapse"
                />
                <Fa
                  v-else
                  :icon="['fas', 'caret-circle-up']"
                  size="2x"
                  class="text-deep-blue"
                  @click="detailCollapse"
                />
              </div>
              <p class="ml-2 partner-type align-self-center">
                {{ data.partner_type }}
              </p>
            </b-col>
            <b-col class="d-flex h-100" cols="5">
              <div>
                <div>
                  <h5 class="text-success d-flex">
                    <strong class="mx-auto">0%</strong>
                  </h5>
                  <p class="pt-2" style="text-align: center">
                    This Month Performance
                  </p>
                </div>
              </div>
              <div class="vl" />
              <div class="mr-2">
                <div>
                  <h5 class="text-muted d-flex">
                    <strong class="mx-auto">{{ data.partners.length }}</strong>
                  </h5>
                  <p class="pt-2" style="text-align: center">Total members</p>
                </div>
              </div>
              <div class="vl" />
              <div class="ml-2">
                <div>
                  <h5 class="text-muted d-flex">
                    <strong class="mx-auto">0</strong>
                  </h5>
                  <p class="pt-2" style="text-align: center">Indexes</p>
                </div>
              </div>
            </b-col>
            <b-col class="d-flex" cols="3">
              <b-button
                @click="create"
                class="align-self-center ml-auto"
                variant="deep-blue"
              >
                <Fa :icon="['fas', 'plus']" />
                Add new member
              </b-button>
            </b-col>
          </div>
        </div>
      </div>
    </div>
    <b-table
      id="stakeholders"
      v-if="!collapsed"
      ref="stakeholders"
      class="mt-3"
      striped
      :fields="tableField"
      :items="stakeholders"
    >
      <template #cell(sequence)="props">
        {{ props.index + 1 }}
      </template>
      <template #cell(name)="props">
        <router-link
          :to="{
            name: 'stake-holder-detail',
            params: {
              id: props.item.partner_id,
            },
          }"
          class="task-link"
        >
          {{ props.item.name }}
        </router-link>
      </template>
      <template #cell(action)>
        <a class="float-right cursor-pointer">
          <Fa class="mx-1" :icon="['far', 'edit']" />
          <Fa class="mx-1" :icon="['fas', 'trash']" />
        </a>
      </template>
      <template #cell(image)="props">
        <img
          :src="props.item.image"
          onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
          class="avatar-xs"
          alt
        />
      </template>
    </b-table>
  </b-col>
</template>

<script>
export default {
  name: 'StakeHoldersPartnerTypes',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      collapsed: true,
      stakeholders: [],
      tableField: [],
      sequence: {
        key: 'sequence',
        label: '',
      },
    };
  },
  watch: {
    collapsed(is_true) {
      if (!is_true) {
        const params = `?organization=${this.$store.getters.activeCompany}&partner_type=${this.data.partner_type_id}`;
        this.getPartnerTypeRel(params);
      }
    },
  },
  mounted() {},
  methods: {
    async getPartnerTypeRel(params) {
      const response = await this.$store.dispatch('getPartnerTypeRel', params);
      if (response.status === 200) {
        const data = response.data;
        this.stakeholders = [];
        for (const i in data.partner_types) {
          for (const j in data.partner_types[i].partners) {
            this.stakeholders.push(data.partner_types[i].partners[j]);
            this.tableField = [];
            for (const l in data.partner_types[i].partners[j]) {
              if (!l.includes('id') && !l.includes('json')) {
                this.tableField.push(l);
              }
            }
          }
        }
        this.tableField.unshift(this.sequence);
      }
    },
    detailCollapse() {
      this.collapsed = !this.collapsed;
    },
    create() {
      this.$emit('partner_type', this.data);
      this.$root.$emit('bv::toggle::collapse', 'sideBarPartnerCreate');
    },
  },
};
</script>
<style scoped>
.partner-type {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
}
</style>
