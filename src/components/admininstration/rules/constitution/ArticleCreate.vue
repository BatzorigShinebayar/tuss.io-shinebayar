<template>
  <b-sidebar
    id="article-create"
    title="Create new article"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @hidden="resetForm"
  >
    <div class="p-4">
      <ContentHeader>
        <template #text>
          <h4 class="font-weight-bold mb-3">Invite your colleagues!</h4>
          <p>
            Please input required information below to invite your colleague to
            TUS D+ Platform, where you can work as an amazing team. :)
          </p>
        </template>
        <template #image>
          <img
            src="@/assets/images/administration/add-employee.svg"
            class="content-header-image"
            alt=""
          />
        </template>
      </ContentHeader>
      <b-form>
        <b-form-group label="Rule type">
          <b-form-radio-group
            v-model="is_title"
            :options="ruleTypes"
            class="tus-radio-btn"
          >
          </b-form-radio-group>
        </b-form-group>

        <div v-if="is_title">
          <b-form-group label="Code">
            <b-form-input v-model="code" type="text"></b-form-input>
            <span v-if="!$v.code.required && formSubmit" class="text-danger">
              Code is required
            </span>
          </b-form-group>

          <b-form-group label="Title">
            <b-form-input v-model="name" type="text"></b-form-input>
            <span v-if="!$v.name.required && formSubmit" class="text-danger">
              Title is required
            </span>
          </b-form-group>
        </div>

        <div v-else>
          <b-form-group label="Constitution code">
            <b-form-input v-model="code" type="text"></b-form-input>
            <span v-if="!$v.code.required && formSubmit" class="text-danger">
              Constitution article is required
            </span>
          </b-form-group>

          <b-form-group label="Constitution article">
            <b-form-textarea
              v-model="name"
              spellcheck="false"
            ></b-form-textarea>
            <span v-if="!$v.name.required && formSubmit" class="text-danger">
              Constitution article is required
            </span>
          </b-form-group>
        </div>
      </b-form>
    </div>
    <template #footer>
      <div class="m-3 p-2">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="createRule"
          >Create
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import ContentHeader from '@/components/admininstration/ContentHeader';
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'ArticleCreate',

  components: { ContentHeader },

  props: {
    article: {
      type: Number,
      default() {
        return 1;
      },
    },
  },

  data() {
    return {
      formSubmit: false,
      is_title: true,
      ruleTypes: [
        { text: 'Title', value: true },
        { text: 'Article', value: false },
      ],
      parentId: null,
      code: null,
      name: null,
      sequence: 1,
    };
  },

  validations: {
    code: { required },
    name: { required },
  },

  methods: {
    resetForm() {
      this.formSubmit = false;
      this.is_title = true;
      this.code = null;
      this.name = null;
    },

    createRule() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let article = this.article;

        if (!article) {
          article = 1;
        }

        const payload = {
          rule_id: this.$route.params.id,
          parent_id: this.parentId,
          code: this.code,
          name: this.name,
          is_title: this.is_title,
          sequence: article,
        };

        const url = '/pages/company_builder/rules/article/';

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'article-create');
          this.$emit('reload', true);
        });
      }
    },
  },
};
</script>
