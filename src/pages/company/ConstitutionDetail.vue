<template>
  <MainLayout>
    <NavBar>
      <template #top>
        <h5 class="p-3">Constitution</h5>
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

    <div v-if="rule" class="container-fluid pr-lg-4 pl-lg-4">
      <div class="rule-header">
        <div>
          <span class="text-black-50">Confirm date:</span>
          {{ rule.rule.date }}
        </div>
        <div>
          <span class="text-black-50">Confirm number:</span>
          {{ rule.rule.number }}
        </div>
        <div>
          <span class="text-black-50">Confirm by:</span>
          {{ rule.rule.partner__name }}
          {{ rule.rule.partner__last_name }}
        </div>
        <div>
          <span class="text-black-50">Version: </span>
          {{ rule.rule.version }}
        </div>
      </div>

      <p class="mt-3">{{ rule.rule.description }}</p>

      <h3 class="text-center font-weight-bold mt-4 mb-2">
        {{ rule.rule.name }}
      </h3>

      <div class="d-flex justify-content-end mb-4">
        <div v-if="permission('rule_upd')">
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
          v-if="permission('rule_upd')"
          v-b-toggle.rule-edit
          variant="deep-blue"
          class="ml-2"
        >
          <Fa :icon="['fas', 'cog']" />
          Edit
        </b-button>
        <b-button
          v-if="permission('rule_del')"
          v-b-modal.rule-delete-modal
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
          v-b-modal.edit-constitution-modal
          variant="deep-blue"
          class="ml-2"
        >
          <Fa :icon="['fas', 'save']" />
          Save
        </b-button>
      </div>

      <Tree
        id="rule-tree"
        :value="rule.detail"
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
                <b-dropdown-item href="#" @click="addArticle(node.id)">
                  <Fa :icon="['fas', 'plus']" /> Create article
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="editArticle(node)">
                  <Fa :icon="['fas', 'cog']" /> Edit
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="deleteArticle(node)">
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
                  <b-dropdown-item @click="editArticle(node)">
                    <Fa :icon="['fas', 'cog']" /> Edit
                  </b-dropdown-item>
                  <b-dropdown-item @click="deleteArticle(node)">
                    <Fa :icon="['fas', 'trash']" /> Delete
                  </b-dropdown-item>
                </b-dropdown>
              </a>
            </div>
          </div>
        </div>
      </Tree>

      <div v-if="rule.detail.length === 0">
        <b-button v-b-toggle.article-create>
          <Fa :icon="['fas', 'plus']" />
          Create article
        </b-button>
      </div>

      <ConstitutionEdit
        :constitutionData="rule.rule"
        @reload="ruleEditStatus"
      />

      <b-modal id="edit-constitution-modal" title="">
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
            <b-button variant="danger" size="lg" @click="saveConstitution">
              Yes
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="edit-rule-status" centered>
        <h4 class="text-center">Saved</h4>
        <template #modal-footer="{ ok }">
          <div class="w-100 d-flex justify-content-center">
            <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
              OK
            </b-button>
          </div>
        </template>
      </b-modal>

      <b-modal id="rule-delete-modal" title="">
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
            <b-button variant="danger" size="lg" @click="deleteRule"
              >Yes</b-button
            >
          </div>
        </template>
      </b-modal>

      <ArticleCreate
        @reload="getContitutionDetail"
        :article="selectedArticleId"
      />

      <ArticleEdit @reload="getContitutionDetail" :article="selectedArticle" />

      <ArticleDelete
        @reload="getContitutionDetail"
        :article="selectedArticle"
      />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/components/layout/MainLayout';
import NavBar from '@/components/layout/NavBar';
import Sidebar from '@/components/admininstration/Sidebar';
import SubMenu from '@/components/layout/SubMenu';
import ConstitutionEdit from '@/components/admininstration/rules/constitution/ConstitutionEdit';

import { Tree, Draggable } from 'he-tree-vue';
import 'he-tree-vue/dist/he-tree-vue.css';
import axios from 'axios';
import ArticleCreate from '@/components/admininstration/rules/constitution/ArticleCreate';
import ArticleEdit from '@/components/admininstration/rules/constitution/ArticleEdit';
import ArticleDelete from '@/components/admininstration/rules/constitution/ArticleDelete';

export default {
  name: 'ConstitutionDetail',

  metaInfo: {
    title: 'Constitution Detail - Company | TUSS D+',
  },

  components: {
    MainLayout,
    Sidebar,
    NavBar,
    SubMenu,
    Tree: Tree.mixPlugins([Draggable]),
    ConstitutionEdit,
    ArticleCreate,
    ArticleEdit,
    ArticleDelete,
  },

  data() {
    return {
      rule: null,
      id: this.$route.params.id,
      dragActive: false,
      selectedArticleId: null,
      selectedArticle: null,
    };
  },

  mounted() {
    this.getContitutionDetail();
  },

  methods: {
    closeDeleteModal() {
      this.$bvModal.hide('rule-delete-modal');
    },

    deleteRule() {
      this.$bvModal.hide('rule-delete-modal');
      const payload = {
        organization: this.organization,
        rule_id: this.rule.rule.id,
      };
      const url = '/pages/company_builder/rules/detail/';

      axios.delete(url, { data: payload }).then(() => {
        this.$router.push({ name: 'company-rules' });
      });
    },

    getContitutionDetail() {
      const url = '/pages/company_builder/rules/detail/';

      axios.get(url, { params: { id: this.id } }).then((response) => {
        this.rule = response.data;
      });
    },

    revertTree() {
      this.dragActive = false;
      this.getContitutionDetail();
    },

    editTree() {
      this.dragActive = true;
    },

    closeEditModal() {
      this.$bvModal.hide('edit-constitution-modal');
    },

    ruleEditStatus() {
      this.$bvModal.show('edit-rule-status');
      this.getContitutionDetail();
    },

    addArticle(titleId) {
      this.selectedArticleId = 0;
      let titleIndex;
      let i;

      for (i = 0; i < this.rule.detail.length; i++) {
        if (this.rule.detail[i].id === titleId) {
          titleIndex = i + 1;
          break;
        }
      }

      for (i = titleIndex; i < this.rule.detail.length; i++) {
        if (this.rule.detail[i].is_title) {
          this.selectedArticleId = this.rule.detail[i - 1].sequence;
          break;
        }
      }

      if (this.selectedArticleId === 0) {
        this.selectedArticleId =
          this.rule.detail[this.rule.detail.length - 1].sequence;
      }

      this.$root.$emit('bv::toggle::collapse', 'article-create');
    },

    editArticle(article) {
      this.selectedArticle = article;
      this.$root.$emit('bv::toggle::collapse', 'article-edit');
    },

    deleteArticle(article) {
      this.selectedArticle = article;
      this.$bvModal.show('article-delete-modal');
    },

    saveConstitution() {
      this.$bvModal.hide('edit-constitution-modal');
      this.treeDraggable = false;

      const url = '/pages/company_builder/rules/structure/';

      axios.post(url, this.rule.detail).then(() => {
        this.revertTree();
      });
    },
  },
};
</script>
