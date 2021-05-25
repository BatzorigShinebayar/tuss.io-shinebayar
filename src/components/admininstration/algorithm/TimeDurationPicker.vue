<template>
  <b-form-group id="timepicker" label="Recommended hours">
    <b-input-group>
      <template #append>
        <b-dropdown :text="minutesLabel" variant="primary" menu-class="w-100">
          <b-dropdown-item @click="setMinutes('0')">00min</b-dropdown-item>
          <b-dropdown-item @click="setMinutes('10')">10min</b-dropdown-item>
          <b-dropdown-item @click="setMinutes('20')">20min</b-dropdown-item>
          <b-dropdown-item @click="setMinutes('30')">30min</b-dropdown-item>
          <b-dropdown-item @click="setMinutes('40')">40min</b-dropdown-item>
          <b-dropdown-item @click="setMinutes('50')">50min</b-dropdown-item>
        </b-dropdown>
      </template>
      <b-form-input
        type="number"
        v-model="hours"
        min="0"
        max="999999"
        @update="setHours"
      ></b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  name: 'TimeDurationPicker',

  data() {
    return {
      hours: 0,
      minutes: '00',
      minutesLabel: '00min',
      value: '0:0',
    };
  },

  methods: {
    setHours() {
      this.value = `${this.hours}:${this.minutes}`;
      this.$emit('time', this.value);
    },

    setMinutes(minutes) {
      this.minutes = minutes;
      this.minutesLabel = `${minutes}min`;
      this.value = `${this.hours}:${this.minutes}`;
      this.$emit('time', this.value);
    },
  },
};
</script>
