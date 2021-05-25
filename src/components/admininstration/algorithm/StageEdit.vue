<template>
  <b-sidebar
    id="edit-stage"
    title="Edit Stage"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @shown="loadState"
  >
    <div class="p-3">
      <b-form>
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
        <b-form-group label="Stage Name" label-for="edit-stage-name">
          <b-form-textarea
            id="edit-stage-name"
            v-model="name"
            rows="4"
          ></b-form-textarea>
          <span v-if="!this.$v.name.required" class="text-danger">
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
import TimeDurationPicker from '@/components/admininstration/algorithm/TimeDurationPicker';

export default {
  name: 'StageEdit',

  components: { TimeDurationPicker },

  data() {
    return {
      stageId: null,
      stage: null,
      code: null,
      name: null,
      hours: null,
    };
  },

  validations: {
    name: { required },
    code: { required },
  },

  methods: {
    loadState() {
      this.stageId = this.$store.getters.algorithmDetailStageEdit;
      for (const algorithm of this.$store.getters.company.algorithm) {
        for (const stages of algorithm.stage_groups) {
          for (const stage of stages.stages) {
            if (stage.id === this.stageId) {
              this.stage = stage;
              this.code = stage.code;
              this.name = stage.name;
              this.hours = '0.0';
              break;
            }
          }
        }
      }
    },

    edit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.stage.code = this.code;
        this.stage.name = this.name;
        this.stage.recommended_hours = this.hours;

        const payload = {
          id: this.stageId,
          ...this.stage,
        };

        const url = '/pages/company_builder/algorithm/stage/';

        axios.put(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'edit-stage');
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
