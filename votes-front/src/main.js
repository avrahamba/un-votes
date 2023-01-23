import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import {messages} from './services/translate'
import './style.css'
import App from './App.vue'
const i18n = createI18n({
    locale: 'he',
    fallbackLocale: 'en',
    messages
  })

const app = createApp(App)
app.use(i18n)
app.mount('#app')