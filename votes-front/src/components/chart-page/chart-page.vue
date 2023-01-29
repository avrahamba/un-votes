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
  <div class="chart-page">
    <chart-cmp v-for="filterDescrition in filterDescritionList" :filterDescrition="filterDescrition" />
  </div>
</template>


<style>
.chart-page{
  padding: 70px 50px 20px;
}
</style>