<script>
import chartCmp from "./chart-cmp.vue";

import {filterDescritionList} from '../../services/data-service'


export default {
  components: {
    chartCmp,
  },
  data() {
    return {
      filterDescritionList
    };
  },
  methods: {
    selectHandler(e) {
      this.filterDescrition = e;
    },
  },
};
</script>

<template>
  <div class="page">
    <h1>גרפים מסכמים</h1>
    <chart-cmp v-for="filterDescrition in filterDescritionList" :filterDescrition="filterDescrition" />
  </div>
</template>
