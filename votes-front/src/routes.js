import { createRouter, createWebHistory } from "vue-router";

import countryList from "./components/country-list-page/country-list-page.vue";
import chartPage from "./components/chart-page/chart-page.vue";
import countryPage from "./components/country-page/country-page.vue";

const options = {
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: countryList },
    { path: "/charts", name: "Charts", component: chartPage },
    { path: "/countriy/:id", name: "Countriy", component: countryPage },
  ],
};

export const router = createRouter(options);
