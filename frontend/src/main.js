import router from './router'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'

// ✅ Import AOS globally
import 'aos/dist/aos.css'
import AOS from 'aos'

// ✅ Import Vue i18n
import { createI18n } from 'vue-i18n'

// Simple i18n setup
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

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://127.0.0.1:8000' 
    : 'https://app-45694296-daec-4264-9167-45a65f5e680e.cleverapps.io'; 

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Make axios globally available
app.config.globalProperties.$axios = axios
window.axios = axios // For use in components

// Register Iconify globally
app.component('Icon', Icon)

// Use i18n and router
app.use(i18n)
app.use(router)

app.mount('#app')

// ✅ Initialize AOS after mounting
AOS.init({
  duration: 1400,
  easing: 'ease-out-cubic',
  once: true,
  mirror: false,
  offset: 80,
  delay: 100,
})