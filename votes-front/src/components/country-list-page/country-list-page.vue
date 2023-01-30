<script>
import { countriesStatus } from "../../services/data-service";

const countryObject = countriesStatus();

export default {
  data() {
    return {
      countryList: countriesStatus()
        .sort((a, b) => (this.$t(a.name) > this.$t(b.name) ? 1 : -1))
        .map((c) => ({
          ...c,
          text: this.$t(c.name),
          type:
            c.bad > c.good && c.bad > c.neutral
              ? 0
              : c.good > c.bad && c.good > c.neutral
              ? 2
              : 1,
        })),
      classType: ["card-bed", "card-neutral", "card-good"],
    };
  },
};
</script>

<template>
  <div class="country-list-page">
    <div class="country-list">
      <router-link
        v-for="country of countryList"
        :key="country.name"
        :to="`/un-votes/countriy/${country.name}`"
      >
        <v-card :class="classType[country.type]">
          <v-card-item>
            <v-card-title>
              {{ country.text }}
            </v-card-title>
            <div class="count-votes-good">
              הצבעות בעד ישראל: {{ country.good }}
            </div>
            <div class="count-votes-neutral">
              הצבעות נטרליות: {{ country.neutral }}
            </div>
            <div class="count-votes-bad">
              הצבעות נגד ישראל: {{ country.bad }}
            </div>
          </v-card-item>
        </v-card>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.country-list-page {
  background-color: #8ecdf8;
  padding: 70px 50px 20px;
}
.country-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
</style>
