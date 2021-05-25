<template>
  <div>
    <b-form-group label="Reason*:">
      <b-form-textarea
        v-model="reason"
        rows="3"
        placeholder="Please Input the reason for deleting this employee"
        spellcheck="false"
      ></b-form-textarea>
      <span v-if="!$v.reason.required && formSubmit" class="text-danger">
        This field is required
      </span>
    </b-form-group>

    <b-form-group label="Verifying Document:">
      <b-form-file
        v-model="document"
        placeholder="Upload a file"
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'GeneralStep',

  data() {
    return {
      reason: null,
      document: null,
      formSubmit: false,
    };
  },

  validations: {
    reason: { required },
  },

  methods: {
    generalStep() {
      this.formSubmit = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$emit('generalStepData', false);
      } else {
        const payload = {
          reason: this.reason,
          document: this.document,
        };
        this.$emit('generalStepData', payload);
      }
    },
  },
};
</script>
