import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import {messages} from './services/translate'
import './style.css'
import App from './App.vue'

import {router} from './routes'

// document.title = 'הצבאות באו"ם בעניין ישראל'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})

const i18n = createI18n({
    locale: 'he',
    fallbackLocale: 'en',
    messages
  })

createApp(App)
  .use(vuetify)
  .use(i18n)
  .use(router)
  .mount('#app')
