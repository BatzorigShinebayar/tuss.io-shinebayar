<template>
  <div class="step-row row">
    <div class="step-col col-md-4" :class="setStep(1)">
      <div class="d-flex align-items-center justify-content-center">
        <div class="rounded-circle p-1 mr-1">
          <Fa :icon="['fas', 'bullseye']" size="lg" />
        </div>
        <p>General</p>
      </div>
    </div>
    <div class="step-col col-md-4" :class="setStep(2)">
      <div class="d-flex align-items-center justify-content-center">
        <div class="rounded-circle p-1 mr-1">
          <Fa :icon="['fas', 'briefcase']" size="lg" />
        </div>
        <p>Distribute Tasks</p>
      </div>
    </div>
    <div class="step-col col-md-4" :class="setStep(3)">
      <div class="d-flex align-items-center justify-content-center">
        <div class="rounded-circle p-1 mr-1">
          <Fa :icon="['fas', 'link']" size="lg" />
        </div>
        <p>Confirmation</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepHeader',

  props: {
    step: {
      type: Number,
      default() {
        return 1;
      },
    },
  },

  data() {
    return {
      total: 3,
    };
  },

  methods: {
    setStep(current) {
      if (this.step >= current) {
        if (this.step > current) {
          return 'active';
        } else {
          return 'active current';
        }
      } else {
        return '';
      }
    },
  },
};
</script>
