<template>
  <div>
    <b-sidebar
      id="employee-deactivate"
      title="Deactivate Employee"
      right
      shadow
      backdrop
      lazy
      class="sidebar-lg"
      @shown="shown"
    >
      <StepHeader :step="step" />

      <div class="p-4">
        <p class="mb-3">
          Employee:
          <strong v-if="employee">
            {{ employee.partner__name }} {{ employee.partner__last_name }}
          </strong>
        </p>

        <GeneralStep
          v-show="generalStepShow"
          ref="generalStep"
          @generalStepData="getGeneralStepData"
        />

        <DistributeStep
          v-show="distributeStepShow"
          ref="distributeStep"
          :employee="employee"
          @distributeStepData="getDistributeStepData"
        />

        <ConfirmationStep
          v-show="confirmationStepShow"
          ref="confirmStep"
          @confirmStepData="getConfirm"
        />
      </div>

      <template #footer>
        <div class="d-flex justify-content-end m-3">
          <b-button
            variant="outline-dark"
            class="mr-2"
            @click="prevStep"
            size="lg"
          >
            Cancel
          </b-button>
          <b-button variant="deep-blue" @click="nextStep" block size="lg"
            >Next</b-button
          >
        </div>
      </template>
    </b-sidebar>

    <MessageBox>
      <h4 class="text-center">Employee created</h4>
    </MessageBox>
  </div>
</template>

<script>
import MessageBox from '@/components/shared_elements/MessageBox';
import GeneralStep from '@/components/admininstration/employees/deactivate/GeneralStep';
import DistributeStep from '@/components/admininstration/employees/deactivate/DistributeStep';
import ConfirmationStep from '@/components/admininstration/employees/deactivate/ConfirmationStep';
import StepHeader from '@/components/admininstration/employees/deactivate/StepHeader';
import axios from 'axios';

export default {
  name: 'DeactivateEmployee',

  props: {
    employee: {
      type: Object,
    },
  },

  components: {
    StepHeader,
    ConfirmationStep,
    DistributeStep,
    GeneralStep,
    MessageBox,
  },

  data() {
    return {
      step: 1,
      generalStepShow: false,
      generalStepFine: false,
      distributeStepShow: false,
      confirmationStepShow: false,
      reason: null,
      document: null,
      task: null,
    };
  },

  beforeMount() {
    this.setWizard();
  },

  methods: {
    shown() {
      this.step = 1;
      this.setWizard();
    },

    setWizard() {
      if (this.step === 1) {
        this.generalStepShow = true;
        this.distributeStepShow = false;
        this.confirmationStepShow = false;
      } else if (this.step === 2) {
        this.generalStepShow = false;
        this.distributeStepShow = true;
        this.confirmationStepShow = false;
      } else if (this.step === 3) {
        this.generalStepShow = false;
        this.distributeStepShow = false;
        this.confirmationStepShow = true;
      }
    },

    prevStep() {
      if (this.step === 1) {
        this.$root.$emit('bv::toggle::collapse', 'employee-deactivate');
      }

      if (this.step > 1) {
        this.step -= 1;
        this.setWizard();
      }
    },

    nextStep() {
      if (this.step === 1) {
        this.$refs.generalStep.generalStep();
      } else if (this.step === 2) {
        this.$refs.distributeStep.distributeStep();
      } else if (this.step === 3) {
        this.$refs.confirmStep.showModal();
      }

      //return when data wrong
      if (!this.generalStepFine) {
        return;
      }

      //next step
      if (this.step < 3) {
        this.step += 1;
        this.setWizard();
      }
    },

    getGeneralStepData(generalStepData) {
      if (generalStepData) {
        this.reason = generalStepData.reason;
        this.document = generalStepData.document;
        this.generalStepFine = true;
      } else {
        this.generalStepFine = false;
      }
    },

    getDistributeStepData(distributeStepData) {
      this.task = distributeStepData;
    },

    getConfirm(confirm) {
      if (confirm) {
        const url = `/pages/company_builder/deactivate_employee/`;

        let formData = new FormData();
        formData.append('reason', this.reason);
        formData.append(
          'deactivate_employee',
          this.$store.getters.user.partner_id
        );
        formData.append('old_employee', this.employee.id);
        formData.append('task_list', JSON.stringify(this.task));
        formData.append('document', this.document);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        axios.post(url, formData, config).then((response) => {
          console.log(response);
        });

        this.$refs.confirmStep.closeModal();
        this.$bvModal.hide('employee-deactivate');
      }
    },
  },
};
</script>
