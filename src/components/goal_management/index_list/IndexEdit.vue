<template>
  <div>
    <b-sidebar
      id="goal-index-edit"
      title="Edit index"
      right
      shadow
      backdrop
      lazy
      class="sidebar-md"
    >
      <div class="p-4">
        <b-form>
          <b-row>
            <b-col lg="3">
              <b-form-group label="Index ID">
                <b-form-input
                  v-model="indexId"
                  type="text"
                  spellcheck="false"
                ></b-form-input>
                <span v-if="!$v.indexId.required" class="text-danger">
                  Index ID is required
                </span>
              </b-form-group>
            </b-col>

            <b-col lg="9">
              <b-form-group label="Index Name">
                <b-form-input
                  v-model="indexName"
                  type="text"
                  spellcheck="false"
                ></b-form-input>
                <span v-if="!this.$v.indexName.required" class="text-danger">
                  Index Name is required
                </span>
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <b-form-group label="Description">
                <b-form-textarea
                  v-model="description"
                  rows="2"
                  spellcheck="false"
                ></b-form-textarea>
                <span v-if="!$v.description.required" class="text-danger">
                  Description is required
                </span>
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <b-form-group
                label="Measuring Unit"
                description="Example: $, ₮, year, ..."
              >
                <b-form-input
                  v-model="unit"
                  type="text"
                  spellcheck="false"
                ></b-form-input>
                <span v-if="!$v.unit.required" class="text-danger">
                  Measuring Unit is required
                </span>
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <b-form-group label="Index calculation equation">
                <b-form-input
                  v-model="equation"
                  type="text"
                  spellcheck="false"
                ></b-form-input>
                <span v-if="!$v.equation.required" class="text-danger">
                  Index type is required
                </span>
              </b-form-group>
            </b-col>

            <b-col lg="12">
              <div v-if="childIndices">
                <div
                  v-for="(childIndex, index) in childIndices"
                  :key="index"
                  class="goal-child-index"
                >
                  <div class="flex-shrink-1">
                    <h4 class="text-primary">{{ index + 1 }}</h4>
                  </div>

                  <div class="flex-grow-1">
                    <div class="px-2">
                      <b-form-group label="Type">
                        <b-form-select
                          v-model="childIndex.child_index"
                          :options="indexes"
                          :name="`childIndices[${index}][child_index]`"
                          :state="!!childIndex.child_index"
                          value-field="id"
                          text-field="name"
                        ></b-form-select>
                      </b-form-group>

                      <b-form-group label="Type">
                        <b-form-select
                          v-model="childIndex.index_type"
                          :options="indexTypeList"
                          :name="`childIndices[${index}][index_type]`"
                          :state="!!childIndex.index_type"
                        ></b-form-select>
                      </b-form-group>
                    </div>
                  </div>

                  <div class="flex-shrink-1">
                    <div class="goal-child-index-remove">
                      <Fa
                        :icon="['fas', 'trash']"
                        @click="removeChildIndex(childIndex.generate_id)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <b-button
                variant="secondary"
                block
                @click="addChildIndex"
                class="mt-4"
              >
                <Fa :icon="['fas', 'plus']" />
                Add child index
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <template #footer>
        <div class="m-4">
          <b-button
            type="submit"
            variant="deep-blue"
            size="lg"
            block
            @click="saveIndex"
          >
            Save
          </b-button>
        </div>
      </template>
    </b-sidebar>

    <b-modal id="edit-index-modal" centered>
      <h4 class="text-center">Index edited</h4>
      <template #modal-footer="{ ok }">
        <div class="w-100 d-flex justify-content-center">
          <b-button variant="deep-blue" class="pr-5 pl-5 mb-3" @click="ok()">
            OK
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'IndexEdit',

  props: {
    indexes: {
      type: Array,
    },
    selectedIndex: {
      type: Object,
    },
  },

  data() {
    return {
      indexId: null,
      indexName: null,
      description: null,
      unit: null,
      equation: null,
      indexTypeList: this.$store.getters.company.index_type_deep_categories,
      childIndices: [],
      IndicesNumber: 0,
      removeChildId: [],
    };
  },

  watch: {
    selectedIndex() {
      this.loadIndex();
    },
  },

  validations: {
    indexId: { required },
    indexName: { required },
    description: { required },
    unit: { required },
    equation: { required },
  },

  methods: {
    loadIndex() {
      this.indexId = this.selectedIndex.short_name;
      this.indexName = this.selectedIndex.name;
      this.description = this.selectedIndex.description;
      this.unit = this.selectedIndex.measure_unit;
      this.equation = this.selectedIndex.equation;
      this.childIndices = [];
      this.removeChildId = [];

      if (this.selectedIndex.childs.length > 0) {
        for (const childIndex of this.selectedIndex.childs) {
          this.IndicesNumber += 1;
          const id = this.IndicesNumber;

          this.childIndices.push({
            generate_id: id,
            id: childIndex.id,
            index_type: childIndex.index_type,
            child_index: childIndex.child_index,
          });
        }
      }
    },

    removeChildIndex(removeId) {
      for (let i = 0; i < this.childIndices.length; i++) {
        if (this.childIndices[i].generate_id === removeId) {
          if (this.childIndices[i].id) {
            this.removeChildId.push(this.childIndices[i].id);
          }

          this.childIndices.splice(i, 1);
        }
      }
    },

    addChildIndex() {
      this.IndicesNumber += 1;
      const id = this.IndicesNumber;

      this.childIndices.push({
        generate_id: id,
        child_index: '',
        index_type: '',
      });
    },

    saveIndex() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        //child index validation
        for (const variable of this.childIndices) {
          if (!variable.child_index || !variable.index_type) {
            return;
          }
        }

        const company = this.$store.getters.activeCompany;

        const payload = {
          organization: company,
          short_name: this.indexId,
          name: this.indexName,
          description: this.description,
          measure_unit: this.unit,
          equation: this.equation,
          child_indexes: this.childIndices,
        };

        if (this.removeChildId.length > 0) {
          payload.remove_child_indexes = this.removeChildId;
        }

        const url = `pages/goal/update_goal_index/${this.selectedIndex.id}/`;

        axios.post(url, payload).then(() => {
          this.$root.$emit('bv::toggle::collapse', 'goal-index-edit');
          this.$bvModal.show('edit-index-modal');
          this.$emit('reload', true);

          this.indexId = null;
          this.indexName = null;
          this.description = null;
          this.unit = null;
          this.childIndices = [];
          this.removeChildId = [];
        });
      }
    },
  },
};
</script>
