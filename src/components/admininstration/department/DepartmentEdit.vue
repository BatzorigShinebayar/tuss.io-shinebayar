<template>
  <b-sidebar
    id="edit-department"
    title="Edit Department"
    class="sidebar-md"
    right
    shadow
    backdrop
    lazy
    @shown="viewDepartment"
  >
    <div class="p-4">
      <b-form>
        <b-form-group label="Department Short Name" label-for="edit-stage-code">
          <b-form-input
            id="edit-stage-code"
            v-model="shortName"
            type="text"
          ></b-form-input>
          <span v-if="!this.$v.shortName.required" class="text-danger">
            Department short name is required
          </span>
        </b-form-group>

        <b-form-group label="Department Full Name" label-for="edit-stage-name">
          <b-form-textarea
            id="edit-stage-name"
            v-model="name"
            rows="4"
          ></b-form-textarea>
          <span v-if="!this.$v.name.required" class="text-danger">
            Department full name is required
          </span>
        </b-form-group>

        <b-form-group
          class="mb-4"
          label="Deparment Manager"
          label-for="set-department-manager"
        >
          <DepartmentManager @manager="getManager" :default="manager" />
          <span v-if="!this.$v.manager.required" class="text-danger">
            Department manager must be selected
          </span>
        </b-form-group>

        <b-form-group label="Department Picture" label-for="input-1">
          <b-form-file
            v-model="image_name"
            placeholder="Choose a image file"
            drop-placeholder="Drop file here..."
            @change="onFileSelect"
          ></b-form-file>
        </b-form-group>

        <VueCropper
          v-show="selectedFile"
          ref="cropper"
          :src="selectedFile"
          alt="Source Image"
          :aspect-ratio="1"
        ></VueCropper>
      </b-form>
    </div>
    <template #footer>
      <div class="m-3 p-2">
        <b-button
          type="submit"
          variant="deep-blue"
          block
          size="lg"
          @click="saveDepartment"
        >
          Save
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';
import DepartmentManager from '@/components/admininstration/department/DepartmentManager';

export default {
  name: 'DepartmentEdit',

  props: {
    department: {
      type: Number,
    },
  },

  data() {
    return {
      manager: null,
      name: null,
      shortName: null,
      mime_type: null,
      selectedFile: null,
      image_name: null,
      departmentId: null,
    };
  },

  validations: {
    manager: { required },
    name: { required },
    shortName: { required },
  },

  components: {
    DepartmentManager,
    VueCropper,
  },

  methods: {
    viewDepartment() {
      for (const department of this.$store.getters.company.department) {
        if (department.id === this.department) {
          this.manager = department.manager__id;
          this.name = department.name;
          this.shortName = department.short_name;
          this.departmentId = department.id;
          break;
        }
      }
    },

    getManager(value) {
      this.manager = value;
    },

    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;

      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          this.$refs.cropper.replace(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, Image not supported');
      }
    },

    saveDepartment() {
      this.formSubmit = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const url = '/pages/company_builder/department/';

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        if (this.selectedFile) {
          this.$refs.cropper
            .getCroppedCanvas({ width: 200, height: 200 })
            .toBlob((blob) => {
              let formData = new FormData();
              formData.append('id', this.departmentId);
              formData.append('manager', this.manager);
              formData.append('name', this.name);
              formData.append('short_name', this.shortName);
              formData.append('picture', blob, `${this.shortName}.jpg`);

              axios.put(url, formData, config).then(() => {
                this.$root.$emit('bv::toggle::collapse', 'edit-department');
                this.$emit('reload', true);
              });
            });
        } else {
          let formData = new FormData();
          formData.append('id', this.departmentId);
          formData.append('manager', this.manager);
          formData.append('name', this.name);
          formData.append('short_name', this.shortName);

          axios.put(url, formData, config).then(() => {
            this.$root.$emit('bv::toggle::collapse', 'edit-department');
            this.$emit('reload', true);
          });
        }
      }
    },
  },
};
</script>
