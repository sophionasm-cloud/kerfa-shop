<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/20">
    <div class="flex items-center justify-between px-6 py-5 lg:px-12">
      <div class="flex items-center gap-2 text-white text-2xl font-bold cursor-pointer">
        <span class="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
        ቀረፋ
      </div>

      <button class="md:hidden text-white text-3xl" @click="toggleMenu">
        <Icon :icon="isMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'" />
      </button>

      <nav
        :class="[
          'fixed md:static top-0 left-0 w-full h-screen md:h-auto md:w-auto',
          'flex items-center justify-center md:justify-end',
          'bg-gradient-to-br from-[#2B1810] via-[#3E2723] to-[#5D4037] md:bg-transparent transition-all duration-300',
          isMenuOpen ? 'flex' : 'hidden md:flex'
        ]"
      >
        <div class="flex flex-col md:flex-row items-center gap-10 md:gap-8">
          
          <ul class="flex flex-col md:flex-row gap-10 md:gap-8">
            <li v-for="item in currentMenu" :key="item.name">
              <a :href="item.href" @click.prevent="scrollToSection(item.href)" class="text-lg md:text-sm font-medium text-white hover:text-[#D4A373] transition">
                {{ item.name }}
              </a>
            </li>
          </ul>

          <div class="flex flex-col md:flex-row items-center gap-4">
            
            <template v-if="!isLoggedIn">
              <!-- Single Login/Register button for everyone -->
              <router-link to="/login" class="text-white hover:text-[#D4A373] font-semibold transition">Login / Register</router-link>
            </template>

            <template v-else>
              <!-- User is logged in -->
              <router-link to="/products" class="text-white hover:text-[#D4A373] font-semibold transition">Products</router-link>
              <router-link to="/order" class="text-white hover:text-[#D4A373] font-semibold transition">Order</router-link>
              <router-link to="/track" class="text-white hover:text-[#D4A373] font-semibold transition">Track</router-link>
              
              <!-- Show Admin Dashboard only if user is admin -->
              <router-link v-if="isAdmin" to="/admin/dashboard" class="text-[#FDEB9E] hover:text-[#D4A373] font-semibold transition">Dashboard</router-link>
              
              <button @click="logout" class="text-red-400 hover:text-red-300 font-semibold transition">Logout</button>
            </template>

            <button @click="toggleLanguage" class="text-white hover:text-[#D4A373] font-semibold transition">
              {{ locale === 'en' ? 'አማ' : 'EN' }}
            </button>
          </div>

        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const router = useRouter()
const isMenuOpen = ref(false)
const isLoggedIn = ref(false)
const isAdmin = ref(false)

// Check if user is logged in and if admin
const checkAuth = () => {
  const token = localStorage.getItem('user_token')
  const user = localStorage.getItem('user')
  
  if (token) {
    isLoggedIn.value = true
    if (user) {
      try {
        const userData = JSON.parse(user)
        isAdmin.value = userData.is_admin === 1
      } catch {
        isAdmin.value = false
      }
    }
  } else {
    isLoggedIn.value = false
    isAdmin.value = false
  }
}

onMounted(() => {
  checkAuth()
  // Listen for storage changes (if user logs in/out in another tab)
  window.addEventListener('storage', checkAuth)
})

// Also check when route changes
watch(() => router.currentRoute.value, () => {
  checkAuth()
})

const logout = () => {
  localStorage.removeItem('user_token')
  localStorage.removeItem('user')
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  isLoggedIn.value = false
  isAdmin.value = false
  router.push('/')
}

/* MENU */
const menuItems = {
  en: [{ name: 'Services', href: '#services' }, { name: 'Skills', href: '#skills' }, { name: 'Why Us', href: '#whyme' }, { name: 'Projects', href: '#projects' }, { name: 'Contact', href: '#contact' }],
  am: [{ name: 'አገልግሎቶች', href: '#services' }, { name: 'ችሎታዎች', href: '#skills' }, { name: 'ለምን እኛ?', href: '#whyme' }, { name: 'ፕሮጀክቶች', href: '#projects' }, { name: 'አግኙን', href: '#contact' }]
}

const currentMenu = computed(() => menuItems[locale.value])
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'am' : 'en'
  localStorage.setItem('language', locale.value)
  window.dispatchEvent(new CustomEvent('language-change', { detail: locale.value }))
}

const scrollToSection = (href) => {
  isMenuOpen.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>