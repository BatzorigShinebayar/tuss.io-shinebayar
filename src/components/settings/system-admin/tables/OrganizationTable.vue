<template>
  <div>
    <b-table
      striped
      id="group-table"
      :hover="true"
      :fields="tableField"
      :items="tableData"
    >
      <template #cell(sequence)="props">
        {{ props.index + 1 }}
      </template>
      <template #cell(name)="props">
        {{ props.item.name }}
      </template>
      <template #cell(logo)="props">
        <img
          :src="'https://tuss.io/tusd_images/org_logo/' + props.item.logo"
          onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
          class="border-white rounded-circle con-vs-avatar -m-1"
          width="25px"
          height="25px"
        />
      </template>
      <template #cell(admin)="props">
        <p>
          {{ props.item.admin }}
        </p>
      </template>
      <template #cell(state)="props">
        <b-badge v-if="props.item.is_active === '1'" variant="success">
          active
        </b-badge>
        <b-badge v-else variant="danger"> inactive </b-badge>
      </template>
      <template #cell(action)="props">
        <a class="float-right cursor-pointer">
          <Fa
            class="mx-1"
            :icon="['far', 'edit']"
            @click="$emit('emit_id', props.item)"
          />
        </a>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'OrgGrpTable',
  components: {},
  props: {
    tableData: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      searchEmployeeName: '',
      tableField: [
        {
          key: 'sequence',
          label: '',
        },
        {
          key: 'logo',
          label: 'Logo',
        },
        {
          key: 'name',
          label: 'Organization Name',
          sortable: true,
        },
        {
          key: 'short_name',
          label: 'Short Name',
        },
        {
          key: 'sagu_max',
          label: 'Maximum SAGU',
        },
        {
          key: 'admin',
          label: 'Admin',
        },
        {
          key: 'state',
          label: 'State',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      partners: [],
    };
  },
  mounted() {
    const params = `?page_size=10000&is_employee=true`;
    this.getPartners(params);
  },
  methods: {
    async getPartners(params) {
      const response = await this.$store.dispatch('getPartners', params);
      if (response.status === 200) {
        this.partners = response.data.results;
        for (const i in this.tableData) {
          for (const j in this.partners) {
            if (
              parseInt(this.partners[j].id) ===
              parseInt(this.tableData[i].admin)
            ) {
              this.tableData[i].admin =
                this.partners[j].last_name[0].toUpperCase() +
                '.' +
                this.partners[j].name;
            }
          }
        }
      }
    },
    searchName() {},
  },
};
</script>
<style scoped></style>
