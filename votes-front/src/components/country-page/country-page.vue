<script>
import { countryDataFn } from "../../services/data-service";
export default {
  beforeMount() {
    const {id} = this.$route.params
    this.selectedCountry = { key: id, label: this.$t(id) }
    this.countryData = countryDataFn(this.selectedCountry.key).map((v) => ({
      ...v,
      type: v.last === "B" ? 0 : v.last === "G" ? 2 : 1,
    }))
    .sort((a,b)=>(a.lastDate > b.lastDate ? -1 : 1));
    window.scrollTo(0, 0);
  },
  data() {
    return {
      countryData: [],
      selectedCountry: null,
      countryList: [],
      classType: ["card-bed", "card-neutral", "card-good"],
      textLastType:['הצביעה נגד ישראל','נמנעה','הצביעה בעד ישראל']
    };
  },
};
</script>

<template>
  <div class="page">
    <div v-if="countryData">
      <h1>{{ selectedCountry.label }}</h1>
      <div class="vote-list">
        <v-card
          v-for="vote in countryData"
          class="vote"
          :class="classType[vote.type]"
        >          <v-card-item>

        <div class="descrition">
          {{ $t(vote.descrition) }}
        </div>
          <div class="good">הצבעות בעד ישראל: {{ vote.countG }}</div>
          <div class="noutral">הצבעות נטרליות: {{ vote.countA }}</div>
          <div class="good">הצבעות נגד ישראל: {{ vote.countB }}</div>
          <div class="good">תאריך הצבעה אחרונה: {{ vote.lastDate }}</div>
          <div class="good">בהצבעה האחרונה המדינה {{ textLastType[vote.type] }}</div>
        </v-card-item>  
        </v-card>

      </div>
    </div>
  </div>
</template>

<style scoped>
.vote-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.descrition{
  font-size: 18px;
line-height: 24px;
font-weight: 700;
}
</style>
