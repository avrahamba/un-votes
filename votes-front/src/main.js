import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { messages } from "./services/translate";
import "./style.css";
import App from "./App.vue";

import { router } from "./routes";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faLinkedin, faAt)



// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
});

const local = localStorage.getItem("local");
var userLang = navigator.language || navigator.userLanguage;
const i18n = createI18n({
  locale:
    local || (userLang === "he" || userLang === "en" ? userLang : "") || "en",
  fallbackLocale: "en",
  messages,
});

createApp(App).use(vuetify).use(i18n).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
