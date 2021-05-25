<template>
  <b-sidebar
    id="regulation-edit"
    title="Edit regulation"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
  >
    <div class="p-4">
      <p class="mb-3">
        Created by: {{ regulationData.partner__name }}
        {{ regulationData.partner__last_name }}
      </p>
      <b-form>
        <b-form-group label="Regulation name">
          <b-form-input v-model="regulationName" type="text"></b-form-input>
        </b-form-group>

        <b-form-group label="Regulation short name">
          <b-form-input
            v-model="regulationShortName"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Confirm number">
          <b-form-input v-model="regulationNumber" type="text"></b-form-input>
        </b-form-group>

        <b-form-group label="Confirm date">
          <b-form-input v-model="regulationDate" type="date"></b-form-input>
        </b-form-group>

        <b-form-group label="Version">
          <b-form-input
            v-model="regulationVersion"
            type="number"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Description">
          <b-form-textarea v-model="description" rows="3"></b-form-textarea>
        </b-form-group>
      </b-form>
    </div>
    <template #footer>
      <div class="m-3 p-2">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="editRegulation"
          >Save
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'RegulationEdit',

  props: {
    regulationData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      formSubmit: false,
      regulationName: this.regulationData.name,
      regulationShortName: this.regulationData.short_name,
      regulationNumber: this.regulationData.number,
      regulationDate: this.regulationData.date,
      regulationVersion: this.regulationData.version,
      organization: this.$store.getters.activeCompany,
      regulationId: this.regulationData.id,
      description: this.regulationData.description,
    };
  },

  validations: {
    regulationName: { required },
    regulationShortName: { required },
    regulationNumber: { required },
    regulationDate: { required },
    regulationVersion: { required },
  },

  methods: {
    editRegulation() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const payload = {
          regulation_id: this.regulationId,
          name: this.regulationName,
          short_name: this.regulationShortName,
          date: this.regulationDate,
          version: this.regulationVersion,
          number: this.regulationNumber,
          organization: this.organization,
          description: this.description,
        };

        const url = `/pages/company_builder/regulation/detail/?id=${this.organization}`;

        axios.put(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'regulation-edit');
          this.$emit('reload', true);
        });
      }
    },
  },
};
</script>
