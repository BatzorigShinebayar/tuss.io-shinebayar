<template>
  <b-sidebar
    id="create-stage"
    title="Create Stage"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @change="loadForm"
  >
    <div class="p-3">
      <b-form>
        <b-form-group label="Code" label-for="edit-stage-code">
          <b-form-input
            id="edit-stage-code"
            v-model="code"
            type="text"
          ></b-form-input>
          <span v-if="!this.$v.code.required && formSubmit" class="text-danger">
            Code is required
          </span>
        </b-form-group>
        <b-form-group label="Stage Name" label-for="edit-stage-name">
          <b-form-textarea
            id="edit-stage-name"
            v-model="name"
            rows="4"
          ></b-form-textarea>
          <span v-if="!this.$v.name.required && formSubmit" class="text-danger">
            Stage name is required
          </span>
        </b-form-group>
        <TimeDurationPicker @time="getTime" />
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
import TimeDurationPicker from '@/components/admininstration/algorithm/TimeDurationPicker';

export default {
  name: 'StageCreate',

  components: { TimeDurationPicker },

  data() {
    return {
      stageId: null,
      stage: null,
      code: null,
      name: null,
      hours: null,
      formSubmit: false,
      algorithmId: null,
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
      this.hours = null;
    },

    createStage() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const createInfo = this.$store.getters.algorithmDetailStageCreate;

        const payload = {
          algorithm: createInfo.algorithmId,
          stage_group: createInfo.stageId,
          code: this.code,
          name: this.name,
          is_condition: false,
          is_form: false,
          form: null,
          sequence: createInfo.sequence,
          recommended_hours: null,
          can_repeat: false,
        };

        const url = '/pages/company_builder/algorithm/stage/';

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'create-stage');
          this.$parent.$emit('reload', true);
        });
      }
    },

    getTime(duration) {
      this.hours = duration;
    },
  },
};
</script>
