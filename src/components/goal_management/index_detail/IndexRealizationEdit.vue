<template>
  <b-sidebar
    id="realization-edit"
    title="Edit realization"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @shown="loadIndex"
  >
    <div class="p-3">
      <b-form-group label="Date">
        <b-form-input v-model="date" type="date"></b-form-input>
        <span v-if="!$v.date.required && formSubmit" class="text-danger">
          Date is required
        </span>
      </b-form-group>

      <b-form-group label="Value">
        <b-form-input v-model="value" type="number"></b-form-input>
        <span v-if="!$v.value.required && formSubmit" class="text-danger">
          Value is required
        </span>
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea v-model="description" rows="2"></b-form-textarea>
        <span v-if="!$v.description.required && formSubmit" class="text-danger">
          Description is required
        </span>
      </b-form-group>
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
  name: 'IndexRealizationEdit',

  data() {
    return {
      formSubmit: false,
      indexId: null,
      date: null,
      value: null,
      task: null,
      description: null,
      employee: null,
      realizationId: null,
    };
  },

  validations: {
    date: { required },
    value: { required },
    description: { required },
  },

  methods: {
    loadIndex() {
      const index = this.$store.getters.selectedIndex;
      this.indexId = index.index;
      this.date = index.date;
      this.value = index.value;
      this.description = index.description;
      this.employee = index.employee;
      this.realizationId = index.id;
    },

    edit() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const payload = {
          id: this.realizationId,
          index_id: this.indexId,
          date: this.date,
          value: this.value,
          description: this.description,
          employee: this.employee,
        };

        const url = `/pages/goal/update_index_realization/${this.realizationId}/`;

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'realization-edit');
          this.$emit('reload', true);
        });
      }
    },
  },
};
</script>
