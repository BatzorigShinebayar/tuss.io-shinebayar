<template>
  <div>
    <div></div>

    <b-modal id="task-choosher" centered>
      <template #modal-footer="{ ok }">
        <b-button
          variant="primary"
          class="justify-content-center pr-5 pl-5 mb-3"
          @click="ok()"
          >OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TaskChooser',

  methods: {
    show() {
      this.$bvModal.show('task-chooser');
    },
  },
};
</script>
