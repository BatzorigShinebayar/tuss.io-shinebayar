<template>
  <b-form-group label="Task name">
    <b-form-input v-model="taskName" spellcheck="false" @input="change" />
    <span v-if="!$v.taskName.required && formSubmit" class="text-danger">
      Task name is required
    </span>
    <span v-if="!$v.taskName.maxLength && formSubmit" class="text-danger">
      Task name max length is 255 characters
    </span>
  </b-form-group>
</template>

<script>
import { maxLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'TaskName',

  props: {
    formSubmit: Boolean,
    defaultValue: {
      type: String,
      default() {
        return null;
      },
    },
  },

  data() {
    return {
      taskName: null,
    };
  },

  watch: {
    defaultValue() {
      this.loadDefault();
    },
  },

  validations: {
    taskName: { required, maxLength: maxLength(255) },
  },

  mounted() {
    this.loadDefault();
  },

  methods: {
    loadDefault() {
      if (this.defaultValue) {
        this.taskName = this.defaultValue;
      }
    },

    change() {
      this.$emit('getName', this.taskName);
    },
  },
};
</script>
