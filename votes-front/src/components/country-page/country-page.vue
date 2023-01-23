<script>
import { countryDataFn, countryList } from "../../services/data-service";
import vSelect from "vue-select";
import cardVote from "./card-vote.vue";
export default {
  components: {
    vSelect,
    cardVote,
  },
  beforeMount() {
    this.countryList = countryList.map((key) => ({
      label: this.$t(key),
      key,
    }));
    this.selectedCountry = this.countryList[0];
  },
  data() {
    return {
      countryData: [],
      selectedCountry: null,
      countryList: [],
    };
  },
  watch: {
    selectedCountry() {
      this.countryData = countryDataFn(this.selectedCountry.key);
    },
  },
};
</script>

<template>
  <div class="country-page">
    <v-select v-model="selectedCountry" :options="countryList" />
    <div v-if="countryData">
      <h2>{{ selectedCountry.label }}</h2>
      <div class="vote-list">
        <card-vote v-for="vote in countryData" :vote="vote" />
      </div>
      <!-- {{ countryData }} -->
    </div>
  </div>
</template>

<style scoped>
.country-page{
  background-color: #8ecdf8;
  padding: 0 50px;
}
.vote-list{
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  gap: 20px;
}
</style>
