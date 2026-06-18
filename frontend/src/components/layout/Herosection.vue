<template>
  <section
    class="relative min-h-screen overflow-hidden bg-gradient-to-br
    from-[#2B1810] via-[#3E2723] to-[#5D4037]
    text-white flex items-center"
  >
    <div class="container mx-auto px-6 lg:px-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- LEFT CONTENT -->
        <div class="space-y-8 opacity-0 animate-[fadeUp_1s_ease_forwards]">
          <span class="inline-block px-4 py-2 rounded-full bg-[#D4A373]/20 text-[#F5D7A1]">
            ☕ Ethiopian Coffee Export & Import
          </span>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <template v-if="language === 'en'">
              Welcome to <span class="text-[#D4A373]">KERFA SHOP</span>
            </template>
            <template v-else>
              ወደ <span class="text-[#D4A373]">ቀረፋ ሱቅ</span> እንኳን በደህና መጡ
            </template>
          </h1>

          <p class="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
            {{
              language === "en"
                ? "Connecting Ethiopian farmers with global markets through premium coffee exports, quality sourcing, and trusted international trade."
                : "የኢትዮጵያ ቡናን ወደ ዓለም ገበያ በማድረስ ከፍተኛ ጥራት ያለው ምርት እና ታማኝ የንግድ አገልግሎት እናቀርባለን።"
            }}
          </p>

          <div class="flex flex-wrap gap-4">
      <button
  @click="goToProducts"
  class="px-8 py-4 rounded-xl bg-[#D4A373] text-black font-semibold hover:scale-105 transition duration-300"
>
  {{ language === "en" ? "Explore Products" : "ምርቶችን ይመልከቱ" }}
</button>
            <button class="px-8 py-4 rounded-xl border border-[#D4A373] hover:bg-[#D4A373] hover:text-black transition duration-300">
              {{ language === "en" ? "Contact Us" : "ያግኙን" }}
            </button>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="relative flex justify-center opacity-0 animate-[fadeUp_1.4s_ease_forwards]">
          <img :src="coffeeHero" alt="Coffee Export" class="relative w-full max-w-lg hover:scale-105 transition duration-500" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import coffeeHero from "../../assets/image/coffee-hero.png";

const language = ref('en')
const router = useRouter()

const goToProducts = () => {
  router.push('/products')
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('language')

  if (savedLanguage) {
    language.value = savedLanguage
  }

  window.addEventListener('language-change', (e) => {
    language.value = e.detail
  })
})
</script>

<style>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
