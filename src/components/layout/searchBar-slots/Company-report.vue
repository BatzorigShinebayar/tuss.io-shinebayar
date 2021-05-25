<script>
export default {
  name: 'Ach',
  data() {
    return {
      icon: '',
    };
  },
};
</script>
<template>
  <div>
    <div>
      <div v-for="index in 5" id="element" :key="index" class="border-bottom">
        <div class="d-flex">
          <p id="title">
            P-1-1-{{ index }}-SADD Санхүүгийн журмын СЖ-13 маягтын дагуу
            компанийн мөнгөн ...
          </p>
          <i class="bx bx-dots-vertical-rounded"></i>
        </div>
        <p id="body">Шийдэл дижиталжуулах алгоритм</p>
        <div id="bottom" class="row flex-space-between">
          <div>
            <i class="bx bx-calendar font-size-16 align-middle"></i
            ><span id="date">2020.08.13</span>
            <img
              src="https://tusd.tuss.io/static/img/home-carouse`l.png`"
              class="avatar-xs"
              alt
            />
          </div>
          <button type="button" class="mr-2 btn button">In Progress</button>
        </div>
      </div>
    </div>
  </div>
</template>
