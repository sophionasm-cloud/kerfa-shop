import router from './router'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'

import 'aos/dist/aos.css'
import AOS from 'aos'

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    servicesTitle: 'Our Premium Services',
    orderButton: 'Place Order',
  },
  am: {
    servicesTitle: 'የእኛ ከፍተኛ አገልግሎቶች',
    orderButton: 'ትዕዛዝ ያድርጉ',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

// ✅ Automatically detect the correct API URL for production and local
// This will work on your live server AND your local machine
axios.defaults.baseURL = window.location.origin.includes('localhost') 
  ? 'http://127.0.0.1:8000' 
  : window.location.origin;

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

app.config.globalProperties.$axios = axios
window.axios = axios 

app.component('Icon', Icon)
app.use(i18n)
app.use(router)

app.mount('#app')

AOS.init({
  duration: 1400,
  easing: 'ease-out-cubic',
  once: true,
  mirror: false,
  offset: 80,
  delay: 100,
})