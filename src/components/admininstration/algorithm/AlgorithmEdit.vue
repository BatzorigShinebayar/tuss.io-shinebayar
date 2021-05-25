<template>
  <b-sidebar
    id="edit-algorithm"
    title="Edit Algorithm"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @shown="loadAlgorithm"
  >
    <div class="p-3">
      <b-form-row>
        <b-col cols="12">
          <b-form-group label="Code" label-for="edit-stage-code">
            <b-form-input
              id="edit-stage-code"
              v-model="code"
              type="text"
            ></b-form-input>
            <span v-if="!this.$v.code.required" class="text-danger">
              Code is required
            </span>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Stage Name" label-for="edit-stage-name">
            <b-form-textarea
              id="edit-stage-name"
              v-model="name"
              rows="2"
            ></b-form-textarea>
            <span v-if="!this.$v.name.required" class="text-danger">
              Algorithm name is required
            </span>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Description" label-for="edit-stage-name">
            <b-form-textarea
              id="edit-stage-name"
              v-model="description"
              rows="4"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group label="Number" label-for="edit-stage-code">
            <b-form-input
              id="edit-stage-code"
              v-model="number"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Use repeated">
            <b-form-checkbox
              class="mb-2 tus-check-btn d-inline-block"
              name="check-button"
              v-model="use_repeated"
            >
              {{ use_repeated ? 'Yes' : 'No' }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Diagram" label-for="edit-stage-code">
            <b-form-input
              id="edit-stage-code"
              v-model="diagram"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Diagram URL" label-for="edit-stage-code">
            <b-form-input
              id="edit-stage-code"
              v-model="diagramUrl"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
    </div>
    <template #footer>
      <div class="m-3">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="edit()"
        >
          Save
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'AlgorithmEdit',

  props: {
    algorithmDetail: {
      type: Object,
    },
  },

  data() {
    return {
      algorithmId: null,
      code: null,
      name: null,
      description: null,
      diagram: null,
      diagramUrl: null,
      number: null,
      use_repeated: false,
      org_alg_id: false,
    };
  },

  validations: {
    name: { required },
    code: { required },
  },
  mounted() {
    this.getOrganizationAlgorithm(
      '?organization=' +
        this.$store.getters.activeCompany +
        '&algorithm=' +
        this.algorithmDetail.id
    );
  },
  methods: {
    loadAlgorithm() {
      this.algorithmId = this.algorithmDetail.id;
      this.code = this.algorithmDetail.code;
      this.name = this.algorithmDetail.name;
      this.description = this.algorithmDetail.description;
      this.diagram = this.algorithmDetail.diagram;
      this.diagramUrl = this.algorithmDetail.diagram_url;
      this.number = this.algorithmDetail.number;
    },

    async getOrganizationAlgorithm(params) {
      const response = await this.$store.dispatch(
        'getOrganizationAlgorithm',
        params
      );
      if (response.status === 200 && response.data.total > 0) {
        this.use_repeated = response.data.results[0].use_repeated;
        this.org_alg_id = response.data.results[0].id;
      }
    },
    async putOrganizationAlgorithm(params) {
      await this.$store.dispatch('putOrganizationAlgorithm', params);
    },
    edit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const payload = {
          code: this.code,
          name: this.name,
          description: this.description,
          diagram: this.diagram,
          diagram_url: this.diagramUrl,
          number: this.number,
        };

        const url = `/pages/company_builder/algorithm/${this.algorithmId}/`;

        axios.put(url, payload).then(() => {
          const params = {
            urlParam: this.org_alg_id + '/',
            urlData: {
              id: this.org_alg_id,
              updated_user: this.$store.getters.user.id,
              updated_date: new Date(),
              use_repeated: this.use_repeated,
            },
          };
          this.putOrganizationAlgorithm(params);
          this.$root.$emit('bv::toggle::collapse', 'edit-algorithm');
          this.$emit('reload', true);
        });
      }
    },
  },
};
</script>
