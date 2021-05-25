<template>
  <div></div>
</template>

<script>
export default {
  name: 'Index',
  fetch({ redirect }) {
    redirect(301, '/stake-holder-management/ver2/management');
  },
  head() {
    return {
      title: 'Хүний нөөц | ТУС Д+',
    };
  },
};
</script>
