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
        <p v-if="props.item.is_active === '1'">
          {{ props.index + 1 }}
        </p>
        <p v-else>
          <s class="text-danger"> {{ props.index + 1 }}</s>
        </p>
      </template>
      <template #cell(name)="props">
        <div class="d-flex">
          <img
            :src="props.item.picture"
            onError="this.onerror=null;this.src='https://tuss.io/tusd_images/profile/human_icon.png';"
            class="border-white rounded-circle con-vs-avatar mr-2"
            width="25px"
            height="25px"
          />
          <div class="align-self-center">
            <p v-if="props.item.is_active === '1'">
              {{ props.item.partner.name }} {{ props.item.partner.last_name }}
            </p>
            <p v-else>
              <s class="text-danger">
                {{ props.item.partner.name }}
                {{ props.item.partner.last_name }}</s
              >
            </p>
          </div>
        </div>
      </template>
      <template #cell(email)="props">
        <p v-if="props.item.is_active === '1'">
          {{ props.item.partner.email }}
        </p>
        <p v-else>
          <s class="text-danger"> {{ props.item.partner.email }}</s>
        </p>
      </template>
      <template #cell(department)="props">
        <p v-if="props.item.is_active === '1'">
          {{ props.item.department.short_name }}
        </p>
        <p v-else>
          <s class="text-danger"> {{ props.item.department.short_name }}</s>
        </p>
      </template>
      <template #cell(organization)="props">
        <p v-if="props.item.is_active === '1'">
          {{ props.item.organization.short_name }}
        </p>
        <p v-else>
          <s class="text-danger"> {{ props.item.organization.short_name }}</s>
        </p>
      </template>
      <template #cell(job_title)="props">
        <p v-if="props.item.is_active === '1'">
          {{ props.item.job_title.short_name }}
        </p>
        <p v-else>
          <s class="text-danger"> {{ props.item.job_title.short_name }}</s>
        </p>
      </template>
      <template #cell(is_main)="props">
        <b-badge v-if="props.item.is_main" variant="success"> true </b-badge>
        <b-badge v-else variant="danger"> false </b-badge>
      </template>
      <template #cell(action)="props">
        <a class="float-right cursor-pointer">
          <Fa
            v-if="props.item.is_active === '1'"
            class="mx-1"
            :icon="['fas', 'trash']"
            @click="remove(props.item.id)"
          />
          <Fa
            v-else
            class="mx-1"
            :icon="['far', 'edit']"
            @click="setActive(props.item.id)"
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
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
        },
        {
          key: 'organization',
          label: 'Organization',
        },
        {
          key: 'department',
          label: 'Department',
        },
        {
          key: 'job_title',
          label: 'Job title',
        },
        {
          key: 'is_main',
          label: 'Main Job Title',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      partners: [],
      refresh: false,
    };
  },
  mounted() {},
  methods: {
    async createUpdateJobTitlePartners(params) {
      const response = await this.$store.dispatch(
        'createUpdateJobTitlePartners',
        params
      );
      if (response.status === 200) {
        this.$emit('refresh', !this.refresh);
      }
    },
    setActive(id) {
      const params = {
        urlParams: id + '/',
        urlData: {
          id: id,
          is_active: '1',
          updated_date: new Date(),
          updated_user: this.$store.getters.user.id,
        },
      };
      this.createUpdateJobTitlePartners(params);
    },
    remove(id) {
      const params = {
        urlParams: id + '/',
        urlData: {
          id: id,
          is_active: '0',
          updated_date: new Date(),
          updated_user: this.$store.getters.user.id,
        },
      };
      this.createUpdateJobTitlePartners(params);
    },
    searchName() {},
  },
};
</script>
<style scoped></style>
