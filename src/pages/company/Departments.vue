<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Department</h5>
      </template>
    </NavBar>

    <SubMenu>
      <template #submenu>
        <Sidebar />
      </template>
    </SubMenu>

    <div class="container-fluid pr-lg-4 pl-lg-4">
      <ContentHeader>
        <template #text>
          <h4 class="font-weight-bold mb-3">Lets jump start</h4>
          <p>
            Welcome to our planet TUS D+. We have so much in store for you and
            your company. So, let’s jump start your journey with a tutorial!
          </p>
        </template>
        <template #image>
          <img
            src="@/assets/images/administration/admin-content-header.svg"
            class="content-header-image"
            alt=""
          />
        </template>
      </ContentHeader>

      <div class="d-flex justify-content-end align-items-center">
        <div v-if="permission('dept_upd')">
          <b-button
            v-if="treeDraggable"
            variant="danger"
            @click="revertTree"
            class="ml-2"
          >
            <Fa :icon="['fas', 'cog']" />
            Edit Structure
          </b-button>
          <b-button v-else variant="deep-blue" @click="editTree" class="ml-2">
            <Fa :icon="['fas', 'cog']" />
            Edit Structure
          </b-button>
        </div>
        <b-button
          v-if="permission('dept_crt')"
          variant="deep-blue"
          class="ml-2"
          @click="createDepartment"
        >
          <Fa :icon="['fas', 'plus']" />
          Add Department
        </b-button>
      </div>

      <hr />

      <div class="d-flex justify-content-between align-items-center mt-4">
        <p>Department structure:</p>
        <b-form-checkbox v-model="showDeleted" @input="showDeletedDepartments">
          Show deleted
        </b-form-checkbox>
      </div>

      <div v-if="departmentTree" class="mt-3">
        <div
          v-if="treeDraggable"
          class="d-flex justify-content-end align-items-center mb-3"
        >
          <b-button variant="secondary" @click="revertTree" class="ml-2">
            <Fa :icon="['fas', 'times']" />
            Cancel Edit
          </b-button>
          <b-button
            v-b-modal.edit-structure-modal
            variant="danger"
            class="ml-2"
          >
            <Fa :icon="['fas', 'save']" />
            Save
          </b-button>
        </div>

        <Tree
          id="department-tree"
          :value="departmentTree"
          :droppable="treeDraggable"
          :draggable="treeDraggable"
        >
          <div
            class="tree-item"
            slot-scope="{ node, path, tree }"
            :class="[
              node.is_active === '1' ? 'active' : 'inactive',
              treeDraggable ? 'editable-tree' : '',
            ]"
          >
            <div class="tree-collapse" @click="tree.toggleFold(node, path)">
              <Fa
                v-if="node.$folded"
                :icon="['fas', 'chevron-circle-down']"
                class="text-primary mr-1"
              />
              <Fa
                v-else
                :icon="['fas', 'chevron-circle-up']"
                class="text-primary mr-1"
              />
              <p class="font-weight-bold d-inline">{{ node.name }}</p>
            </div>

            <div class="d-flex align-items-center">
              <div>
                <p class="font-weight-bold text-right">Manager</p>
                <p v-if="node.manager__id">
                  {{ node.manager__name }} {{ node.manager__last_name }}
                </p>
                <p v-else>&nbsp;</p>
              </div>
              <a
                v-if="permission('dept_upd')"
                class="cursor-pointer text-primary ml-2 p-1"
                @click="editDepartment(node.id)"
              >
                <Fa :icon="['fas', 'cog']" />
              </a>
              <a
                class="cursor-pointer text-primary ml-1 p-1"
                @click="deleteDepartment(node.id)"
              >
                <Fa :icon="['fas', 'trash']" />
              </a>
            </div>
          </div>
        </Tree>
      </div>

      <b-button
        v-if="permission('dept_crt')"
        variant="secondary"
        block
        class="mt-3 mb-5"
        size="lg"
        @click="createDepartment"
      >
        <Fa :icon="['fas', 'plus']" />
        Add Department
      </b-button>

      <DepartmentCreate
        v-if="permission('dept_crt')"
        @reload="loadDepartment"
      />

      <DepartmentEdit
        v-if="permission('dept_upd')"
        @reload="loadDepartment"
        :department="departmentSelected"
      />

      <DepartmentDelete
        v-if="permission('dept_del')"
        @reload="loadDepartment"
        @deactivate="showModalDeactivate"
        :department="departmentSelected"
      />

      <b-modal id="edit-structure-modal" title="">
        <h4 class="text-center mb-3">Are you sure to save?</h4>
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
            <b-button
              variant="danger"
              size="lg"
              @click="saveDepartmentStructure"
            >
              Yes
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="department-deactivate-success-modal" centered>
        <h4 class="text-center">Department deactivated</h4>
        <template #modal-footer="{ ok }">
          <div class="w-100 d-flex justify-content-center">
            <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
              OK
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </MainLayout>
</template>

<script>
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import ContentHeader from '@/components/admininstration/ContentHeader';
import { Draggable, Fold, Tree } from 'he-tree-vue';
import MainLayout from '@/components/layout/MainLayout';
import DepartmentCreate from '@/components/admininstration/department/DepartmentCreate';
import DepartmentEdit from '@/components/admininstration/department/DepartmentEdit';
import DepartmentDelete from '@/components/admininstration/department/DepartmentDelete';
import axios from 'axios';
// import 'he-tree-vue/dist/he-tree-vue.css';

export default {
  name: 'Departments',

  metaInfo: {
    title: 'Department - Company | TUSS D+',
  },

  components: {
    DepartmentDelete,
    DepartmentEdit,
    DepartmentCreate,
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    ContentHeader,
    Tree: Tree.mixPlugins([Fold, Draggable]),
  },

  data() {
    return {
      hasPermission: null,
      departments: null,
      departmentTree: null,
      treeDraggable: false,
      showDeleted: false,
      departmentSelected: null,
    };
  },

  created() {
    this.loadDepartment();
  },

  methods: {
    loadDepartment() {
      const payload = { organization: this.$store.getters.activeCompany };

      this.$store.dispatch('getDepartment', payload).then((response) => {
        this.departments = response.data;
        this.buildTree();
      });
    },

    showModalDeactivate() {
      this.$bvModal.show('department-deactivate-success-modal');
    },

    showDeletedDepartments() {
      this.buildTree();
    },

    buildTree() {
      const nest = (items, id = null, link = 'parent') =>
        items
          .filter((item) => item[link] === id)
          .map((item) => ({ ...item, children: nest(items, item.id) }));

      let rawData;
      if (this.showDeleted) {
        rawData = this.departments;
      } else {
        rawData = [];
        for (const dep of this.departments) {
          if (dep.is_active === '1') {
            rawData.push(dep);
          }
        }
      }
      this.departmentTree = nest(rawData);
    },

    editTree() {
      this.treeDraggable = true;
    },

    revertTree() {
      this.treeDraggable = false;
      this.loadDepartment();
    },

    createDepartment() {
      this.$root.$emit('bv::toggle::collapse', 'create-department');
    },

    editDepartment(depId) {
      this.departmentSelected = depId;
      this.$root.$emit('bv::toggle::collapse', 'edit-department');
    },

    deleteDepartment(depId) {
      this.departmentSelected = depId;
      this.$root.$emit('bv::toggle::collapse', 'delete-department');
    },

    closeModal() {
      this.$bvModal.hide('edit-structure-modal');
    },

    saveDepartmentStructure() {
      this.$bvModal.hide('edit-structure-modal');
      this.treeDraggable = false;

      const url = '/pages/company_builder/department/structure/';
      const payload = {
        organization: this.$store.getters.activeCompany,
        structure: this.departmentTree,
      };

      axios.post(url, payload).then(() => {
        this.loadDepartment();
      });
    },
  },
};
</script>
