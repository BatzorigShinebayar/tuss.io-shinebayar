<template>
  <th v-if="isHeader" class="vuetable-th-component-checkbox">
    <input
      type="checkbox"
      :checked="isAllItemsInCurrentPageSelected()"
      @change="toggleAllCheckbox($event)"
    />
  </th>
  <td v-else class="vuetable-td-component-checkbox">
    <input
      type="checkbox"
      :checked="isSelected(rowData)"
      @change="toggleCheckbox(rowData, $event)"
    />
  </td>
</template>

<script>
import VuetableFieldCheckboxMixin from 'vuetable-2/src/components/VuetableFieldCheckboxMixin';

export default {
  name: 'Checkbox',

  mixins: [VuetableFieldCheckboxMixin],
};
</script>
