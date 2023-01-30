import { createRouter, createWebHistory } from "vue-router";

import countryList from "./components/country-list-page/country-list-page.vue";
import chartPage from "./components/chart-page/chart-page.vue";
import countryPage from "./components/country-page/country-page.vue";
import about from './components/about.vue'

const BASE = '/un-votes/'

const options = {
  history: createWebHistory(),
  routes: [
    { path: BASE + "/", name: "Home", component: countryList , meta: { title: 'About - MyApp' }},
    { path: BASE + "/charts", name: "Charts", component: chartPage },
    { path: BASE + "/countriy/:id", name: "Countriy", component: countryPage },
    { path: BASE + "/about", name: "About", component: about },
  ],
};

export const router = createRouter(options);
