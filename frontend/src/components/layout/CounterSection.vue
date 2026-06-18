<template>
  <section
    ref="counterSection"
    id="counter"
    class="py-24 bg-gradient-to-br from-[#2B1810] via-[#3E2723] to-[#5D4037] text-white overflow-hidden"
  >
    <div class="container mx-auto px-6 lg:px-20">
      <div class="grid md:grid-cols-3 gap-8">

        <div
          v-for="(item, index) in counters"
          :key="item.labelEn"
          class="group backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-xl transition-all duration-700 hover:-translate-y-3 hover:scale-105 hover:bg-white/10"
          :class="
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          "
          :style="{ transitionDelay: `${index * 250}ms` }"
        >
          <!-- Icon -->
          <div
            class="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4A373]/20 flex items-center justify-center"
          >
            <Icon
              :icon="item.icon"
              class="text-5xl text-[#D4A373] group-hover:scale-110 transition duration-500"
            />
          </div>

          <!-- Counter -->
          <h3 class="text-5xl font-extrabold text-[#F5D7A1] mb-3">
            <Vue3Autocounter
              v-if="visible"
              :startAmount="0"
              :endAmount="item.value"
              :duration="4"
              separator=""
              :autoinit="true"
            />
          </h3>

          <!-- Label -->
          <p class="text-lg text-gray-300 tracking-wide">
            {{ language === 'en' ? item.labelEn : item.labelAm }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vue3Autocounter from 'vue3-autocounter'
import { Icon } from '@iconify/vue'

const language = ref('en')
const visible = ref(false)
const counterSection = ref(null)

onMounted(() => {
  const savedLanguage = localStorage.getItem('language')

  if (savedLanguage) {
    language.value = savedLanguage
  }

  window.addEventListener('language-change', (e) => {
    language.value = e.detail
  })

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    {
      threshold: 0.6
    }
  )

  if (counterSection.value) {
    observer.observe(counterSection.value)
  }
})

const counters = [
  {
    value: 10,
    labelEn: 'Countries',
    labelAm: 'አገሮች',
    icon: 'mdi:earth'
  },
  {
    value: 500,
    labelEn: 'Tons Exported',
    labelAm: 'ቶን የተላከ',
    icon: 'mdi:package-variant'
  },
  {
    value: 100,
    labelEn: 'Ethiopian Origin %',
    labelAm: 'የኢትዮጵያ ምርት %',
    icon: 'mdi:coffee'
  }
]
</script>

<style scoped>
#counter {
  position: relative;
}

#counter::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  background: rgba(212, 163, 115, 0.15);
  border-radius: 50%;
  filter: blur(100px);
}

#counter::after {
  content: "";
  position: absolute;
  width: 350px;
  height: 350px;
  bottom: -100px;
  right: -100px;
  background: rgba(245, 215, 161, 0.1);
  border-radius: 50%;
  filter: blur(100px);
}
</style>