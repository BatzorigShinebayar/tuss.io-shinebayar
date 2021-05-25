<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Regulations</h5>
      </template>
      <template #bottom>
        <router-link
          class="btn task-detail-back"
          :to="{ name: 'company-rules' }"
        >
          <Fa :icon="['fas', 'chevron-left']" />
          Back
        </router-link>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div v-if="regulation" class="container-fluid pr-lg-4 pl-lg-4">
      <div class="rule-header">
        <div>
          <span class="text-black-50">Confirm date:</span>
          {{ regulation.regulation.date }}
        </div>
        <div>
          <span class="text-black-50">Confirm number:</span>
          {{ regulation.regulation.number }}
        </div>
        <div>
          <span class="text-black-50">Confirm by:</span>
          {{ regulation.regulation.partner__name }}
          {{ regulation.regulation.partner__last_name }}
        </div>
        <div>
          <span class="text-black-50">Version: </span>
          {{ regulation.regulation.version }}
        </div>
      </div>

      <p class="mt-3">{{ regulation.regulation.description }}</p>

      <h3 class="text-center font-weight-bold mt-4 mb-2">
        {{ regulation.regulation.name }}
      </h3>

      <div class="d-flex justify-content-end mb-4">
        <div v-if="permission('regu_upd')">
          <b-button
            v-if="dragActive"
            variant="danger"
            @click="revertTree"
            class="ml-2"
          >
            <Fa :icon="['fas', 'arrows']" />
            Move
          </b-button>
          <b-button v-else variant="deep-blue" @click="editTree" class="ml-2">
            <Fa :icon="['fas', 'arrows']" />
            Move
          </b-button>
        </div>
        <b-button
          v-if="permission('regu_upd')"
          v-b-toggle.regulation-edit
          variant="deep-blue"
          class="ml-2"
        >
          <Fa :icon="['fas', 'cog']" />
          Edit
        </b-button>
        <b-button
          v-if="permission('regu_del')"
          v-b-modal.regulation-delete-modal
          variant="deep-blue"
          class="ml-2"
        >
          <Fa :icon="['fas', 'trash']" />
          Delete
        </b-button>
      </div>

      <div
        v-if="dragActive"
        class="d-flex justify-content-end align-items-center mb-3"
      >
        <b-button variant="secondary" @click="revertTree" class="ml-2">
          <Fa :icon="['fas', 'times']" />
          Cancel Move
        </b-button>
        <b-button
          v-b-modal.edit-regulation-modal
          variant="deep-blue"
          class="ml-2"
        >
          <Fa :icon="['fas', 'save']" />
          Save
        </b-button>
      </div>

      <Tree
        id="rule-tree"
        :value="regulation.detail"
        :droppable="dragActive"
        :draggable="dragActive"
        class="mb-5"
      >
        <div slot-scope="{ node }">
          <div
            v-if="node.is_title"
            class="rule-item-subtitle"
            :class="dragActive ? 'active' : null"
          >
            <span class="font-weight-bold">
              {{ node.code }}. {{ node.name }}
            </span>
            <div>
              <b-dropdown
                right
                variant="secondary"
                no-caret
                id="rule-item-menu"
              >
                <template #button-content>
                  <Fa :icon="['far', 'ellipsis-v']" />
                </template>
                <b-dropdown-item href="#" @click="addDuty(node.id)">
                  <Fa :icon="['fas', 'plus']" /> Create duty
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="editDuty(node)">
                  <Fa :icon="['fas', 'cog']" /> Edit
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="deleteDuty(node)">
                  <Fa :icon="['fas', 'trash']" /> Delete
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div v-else>
            <div class="rule-item-detail" :class="dragActive ? 'active' : null">
              <p class="rule-item-detail-code flex-shrink-1">{{ node.code }}</p>
              <div class="rule-item-detail-text flex-grow-1">
                {{ node.name }}
              </div>
              <a class="rule-item-detail-edit flex-shrink-1">
                <b-dropdown
                  right
                  variant="secondary"
                  no-caret
                  id="rule-item-menu"
                >
                  <template #button-content>
                    <Fa :icon="['far', 'ellipsis-v']" />
                  </template>
                  <b-dropdown-item @click="editDuty(node)">
                    <Fa :icon="['fas', 'cog']" /> Edit
                  </b-dropdown-item>
                  <b-dropdown-item @click="deleteDuty(node)">
                    <Fa :icon="['fas', 'trash']" /> Delete
                  </b-dropdown-item>
                </b-dropdown>
              </a>
            </div>
          </div>
        </div>
      </Tree>

      <div v-if="regulation.detail.length === 0">
        <b-button v-b-toggle.duty-create>
          <Fa :icon="['fas', 'plus']" />
          Create duty
        </b-button>
      </div>

      <RegulationEdit
        :regulationData="regulation.regulation"
        @reload="regulationEditStatus"
      />

      <b-modal id="edit-regulation-modal" title="">
        <h4 class="text-center mb-3">Are you sure to save?</h4>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-center mb-4">
            <b-button
              variant="secondary"
              class="mr-3"
              size="lg"
              @click="closeEditModal"
            >
              No
            </b-button>
            <b-button variant="danger" size="lg" @click="saveRegulation">
              Yes
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="edit-regulation-status" centered>
        <h4 class="text-center">Saved</h4>
        <template #modal-footer="{ ok }">
          <div class="w-100 d-flex justify-content-center">
            <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
              OK
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="regulation-delete-modal" title="">
        <h4 class="text-center mb-2">Are you sure to delete?</h4>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-center mb-4">
            <b-button
              variant="secondary"
              class="mr-3"
              size="lg"
              @click="closeDeleteModal"
              >No</b-button
            >
            <b-button variant="danger" size="lg" @click="deleteRegulation"
              >Yes</b-button
            >
          </div>
        </template>
      </b-modal>

      <DutyCreate @reload="getRegulationDetail" :duty="selectedDutyId" />

      <DutyEdit @reload="getRegulationDetail" :duty="selectedDuty" />

      <DutyDelete @reload="getRegulationDetail" :duty="selectedDuty" />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import axios from 'axios';
import { Tree, Draggable } from 'he-tree-vue';
import 'he-tree-vue/dist/he-tree-vue.css';
import DutyCreate from '@/components/admininstration/rules/regulation/DutyCreate';
import DutyEdit from '@/components/admininstration/rules/regulation/DutyEdit';
import DutyDelete from '@/components/admininstration/rules/regulation/DutyDelete';
import RegulationEdit from '@/components/admininstration/rules/regulation/RegulationEdit';

export default {
  name: 'RegulationDetail',

  metaInfo: {
    title: 'Regulation Detail - Company | TUSS D+',
  },

  components: {
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    Tree: Tree.mixPlugins([Draggable]),
    RegulationEdit,
    DutyCreate,
    DutyEdit,
    DutyDelete,
  },

  data() {
    return {
      regulation: null,
      id: this.$route.params.id,
      dragActive: false,
      selectedDutyId: null,
      selectedDuty: null,
    };
  },

  mounted() {
    this.getRegulationDetail();
  },

  methods: {
    closeDeleteModal() {
      this.$bvModal.hide('regulation-delete-modal');
    },

    deleteRegulation() {
      this.$bvModal.hide('regulation-delete-modal');
      const payload = {
        organization: this.organization,
        regulation_id: this.regulation.regulation.id,
      };
      const url = '/pages/company_builder/regulation/detail/';

      axios.delete(url, { data: payload }).then(() => {
        this.$router.push({ name: 'company-rules' });
      });
    },

    getRegulationDetail() {
      const url = '/pages/company_builder/regulation/detail/';

      axios.get(url, { params: { id: this.id } }).then((response) => {
        this.regulation = response.data;
      });
    },

    revertTree() {
      this.dragActive = false;
      this.getRegulationDetail();
    },

    editTree() {
      this.dragActive = true;
    },

    closeEditModal() {
      this.$bvModal.hide('edit-regulation-modal');
    },

    regulationEditStatus() {
      this.$bvModal.show('edit-regulation-status');
      this.getRegulationDetail();
    },

    addDuty(titleId) {
      this.selectedDutyId = 0;
      let titleIndex;
      let i;

      for (i = 0; i < this.regulation.detail.length; i++) {
        if (this.regulation.detail[i].id === titleId) {
          titleIndex = i + 1;
          break;
        }
      }

      for (i = titleIndex; i < this.regulation.detail.length; i++) {
        if (this.regulation.detail[i].is_title) {
          this.selectedDutyId = this.regulation.detail[i - 1].sequence;
          break;
        }
      }

      if (this.selectedDutyId === 0) {
        this.selectedDutyId =
          this.regulation.detail[this.regulation.detail.length - 1].sequence;
      }

      this.$root.$emit('bv::toggle::collapse', 'duty-create');
    },

    editDuty(duty) {
      this.selectedDuty = duty;
      this.$root.$emit('bv::toggle::collapse', 'duty-edit');
    },

    deleteDuty(duty) {
      this.selectedDuty = duty;
      this.$bvModal.show('duty-delete-modal');
    },

    saveRegulation() {
      this.$bvModal.hide('edit-regulation-modal');
      this.treeDraggable = false;

      const url = '/pages/company_builder/regulation/structure/';

      axios.post(url, this.regulation.detail).then(() => {
        this.revertTree();
      });
    },
  },
};
</script>
