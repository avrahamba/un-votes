<script>
import { countriesStatus } from "../../services/data-service";

export default {
  data() {
    return {
      countryList: countriesStatus().map((c) => ({
        ...c,
        type:
          c.bad > c.good && c.bad > c.neutral
            ? 0
            : c.good > c.bad && c.good > c.neutral
            ? 2
            : 1,
      })),
      classType: ["card-bed", "card-neutral", "card-good"],
      sortBySoport: true
    };
  },
  computed: {
    countryListSorted() {
      const sortFn = (a, b) => {
        if (!a.bad && !a.neutral) return -1;
        if (!b.bad && !b.neutral) return 1;
        if (!a.good && !a.neutral) return 1;
        if (!b.good && !b.neutral) return -1;
        if (!a.good && !b.good)
          return a.neutral / a.bad > b.neutral / b.bad ? -1 : 1;
        if (!a.bad && !b.bad)
          return a.good / a.neutral > b.good / b.neutral ? -1 : 1;
        if (!a.good && b.good) return 1;
        if (a.good && !b.good) return -1;
        if (!a.bad && b.bad) return -1;
        if (a.bad && !b.bad) return 1;
        return a.good / a.bad > b.good / b.bad ? -1 : 1;
      };
      if (this.sortBySoport) return this.countryList.sort(sortFn);
      else
        return this.countryList.sort((a, b) =>
          this.$t(a.name) > this.$t(b.name) ? 1 : -1
        );
    },
    sortBtnText(){
      return this.sortBySoport ? 'Sort by thousand byte' : 'Sort by support for Israel'
    }
  },
  methods:{
    setSort(){
      this.sortBySoport = !this.sortBySoport
    }
  }
};
</script>

<template>
  <div class="page">
    <h1>{{ $t("List of countries") }}</h1>
    <button class="sort-btn" @click="setSort">{{ $t(sortBtnText) }}</button>
    <div class="country-list">
      <router-link
        v-for="country of countryListSorted"
        :key="country.name"
        :to="`/un-votes/countriy/${country.name}`"
      >
        <v-card :class="classType[country.type]">
          <v-card-item>
            <v-card-title>
              {{ $t(country.name) }}
            </v-card-title>
            <div>{{ $t("Pro Israel Votes") }}: {{ country.good }}</div>
            <div>{{ $t("Neutral votes") }}: {{ country.neutral }}</div>
            <div>{{ $t("Anti-Israel votes") }}: {{ country.bad }}</div>
          </v-card-item>
        </v-card>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.country-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.sort-btn{
margin-bottom: 20px;
padding: 15px;
background-color: #fff;
border-radius: 4px;
box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}
</style>
