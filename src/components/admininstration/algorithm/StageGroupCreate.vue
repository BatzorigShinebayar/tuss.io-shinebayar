<template>
  <b-sidebar
    id="create-stage-group"
    title="Create Stage Group"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @change="loadForm"
  >
    <div class="p-3">
      <b-form>
        <b-form-group label="Code" label-for="edit-stage-group-code">
          <b-form-input
            id="edit-stage-group-code"
            v-model="code"
            type="text"
          ></b-form-input>
          <span v-if="!this.$v.code.required && formSubmit" class="text-danger">
            Code is required
          </span>
        </b-form-group>
        <b-form-group
          label="Stage Group Name"
          label-for="edit-stage-group-name"
        >
          <b-form-textarea
            id="edit-stage-group-name"
            v-model="name"
            rows="4"
          ></b-form-textarea>
          <span v-if="!this.$v.name.required && formSubmit" class="text-danger">
            Stage Group name is required
          </span>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="edit-stage-group-description"
        >
          <b-form-textarea
            id="edit-stage-group-description"
            v-model="description"
            rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Can repeat task stage group in repeated task?"
          label-for="can-repeat"
        >
          <b-form-checkbox
            id="can-repeat"
            v-model="canRepeat"
            name="can-repeat"
            class="tus-check-btn"
          >
            {{ canRepeat ? 'Yes' : 'No' }}
          </b-form-checkbox>
        </b-form-group>
      </b-form>
    </div>
    <template #footer>
      <div class="m-3">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="createStage()"
        >
          Create
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'StageGroupCreate',

  data() {
    return {
      formSubmit: false,
      algorithmId: this.$route.params.id,
      code: null,
      name: null,
      description: null,
      sequence: null,
      canRepeat: false,
    };
  },

  validations: {
    name: { required },
    code: { required },
  },

  methods: {
    loadForm() {
      this.code = null;
      this.name = null;
      this.description = null;
      this.sequence = null;

      //set sequence
      let maxSequence = 0;
      for (const algorithm of this.$store.getters.company.algorithm) {
        if (algorithm.id === this.algorithmId) {
          for (const stageGroup of algorithm.stage_groups) {
            if (stageGroup.sequence > maxSequence) {
              maxSequence = stageGroup.sequence;
            }
          }
        }
      }
      this.sequence = maxSequence + 1;
    },

    createStage() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const payload = {
          algorithm: this.algorithmId,
          code: this.code,
          name: this.name,
          description: this.description,
          can_repeat: this.canRepeat,
          sequence: this.sequence,
        };

        const url = '/pages/company_builder/algorithm/stage_group/';

        axios.post(url, payload).then(() => {
          this.$parent.$emit('reload', true);
        });
      }
    },
  },
};
</script>
