<script>
import selecterCmp from "./selecter-cmp.vue";
import chartCmp from "./chart-cmp.vue";
import "vue-select/dist/vue-select.css";
import { ref } from "vue";
const filterDescrition = ref("");

export default {
  components: {
    selecterCmp,
    chartCmp,
  },
  data() {
    return {
      filterDescrition: "",
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
  <selecter-cmp @select="selectHandler" />
  <chart-cmp :filterDescrition="filterDescrition" />
</template>
