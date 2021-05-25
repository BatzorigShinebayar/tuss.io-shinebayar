<template>
  <div>
    <b-alert show variant="danger">
      <p class="mb-3">Notice!</p>
      <p>
        You are about to delete an employee. The distributed tasks will be
        irreversible. In case you want to reactivate this employee and assign
        the previous tasks, you have to do new configurations. Hence, please
        confirm the procedure by clicking the “confirmation” button
      </p>
    </b-alert>

    <b-modal id="employee-deactivate-confirm" title="">
      <h4 class="text-center mb-3">Are you sure?</h4>
      <template #modal-footer>
        <div class="w-100 d-flex justify-content-center mb-4">
          <b-button
            variant="secondary"
            class="mr-3"
            size="lg"
            @click="closeModal"
          >
            No
          </b-button>
          <b-button variant="danger" size="lg" @click="deactivatEmp">
            Yes
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationStep',

  methods: {
    closeModal() {
      this.$bvModal.hide('employee-deactivate-confirm');
    },

    showModal() {
      this.$bvModal.show('employee-deactivate-confirm');
    },

    deactivatEmp() {
      this.$emit('confirmStepData', true);
    },
  },
};
</script>
