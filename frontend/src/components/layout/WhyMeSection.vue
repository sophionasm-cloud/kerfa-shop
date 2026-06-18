<!-- src/components/layout/WhyMeSection.vue -->

<template>
  <section
    id="whyme"
    class="relative min-h-screen px-6 md:px-10 pt-24 pb-28 overflow-hidden
    bg-gradient-to-br from-[#070606] via-[#120D0A] to-[#1A120D]"
  >

    <!-- BACKGROUND LUXURY LIGHTS -->
    <div class="absolute top-10 left-10 w-[500px] h-[500px] bg-[#D4A373]/10 blur-[140px] rounded-full"></div>
    <div class="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#1B5E20]/10 blur-[140px] rounded-full"></div>

    <!-- FLOATING ELEMENTS -->
    <div class="absolute top-24 left-16 text-4xl opacity-10 animate-bounce">☕</div>
    <div class="absolute top-40 right-20 text-3xl opacity-10 animate-pulse">🌍</div>
    <div class="absolute bottom-28 left-1/3 text-5xl opacity-10 animate-bounce">🫘</div>

    <!-- HEADER -->
    <div class="relative z-10 text-center mb-20">
      <h2 class="text-5xl md:text-7xl font-extrabold text-[#FDEB9E] tracking-tight">
        {{ locale === 'en' ? 'Why KERFA Wins' : 'ለምን ቀረፋ ያሸንፋል' }}
      </h2>

      <p class="mt-6 max-w-3xl mx-auto text-[#D6C7A1] text-lg opacity-90">
        {{
          locale === 'en'
            ? 'We combine Ethiopian heritage, export-grade systems, and global market strategy into one scalable coffee brand.'
            : 'ኢትዮጵያዊ ታሪክ + ዓለም ገበያ + ከፍተኛ የንግድ ስርዓት።'
        }}
      </p>
    </div>

    <!-- MAIN SPLIT LAYOUT -->
    <div class="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

      <!-- LEFT: STORY BLOCK -->
      <div class="space-y-10">

        <div
          v-for="item in story"
          :key="item.title.en"
          class="group p-6 border-l-2 border-[#D4A373] pl-6 hover:pl-10 transition-all duration-500"
        >

          <div class="flex items-center gap-4 mb-2">
            <span class="text-3xl">{{ item.icon }}</span>
            <h3 class="text-2xl font-bold text-[#FDEB9E]">
              {{ item.title[locale] }}
            </h3>
          </div>

          <p class="text-[#D6C7A1] leading-relaxed">
            {{ item.description[locale] }}
          </p>

        </div>

      </div>

      <!-- RIGHT: PERFORMANCE / TRUST METRICS -->
      <div class="space-y-6">

        <div
          v-for="m in metrics"
          :key="m.label.en"
          class="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
          hover:bg-white/10 transition-all duration-500"
        >

          <div class="flex justify-between items-center mb-2">

            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ m.icon }}</span>
              <span class="text-[#FDEB9E] font-semibold">
                {{ m.label[locale] }}
              </span>
            </div>

            <span class="text-[#D4A373] font-bold text-lg">
              {{ m.value }}
            </span>

          </div>

          <!-- animated bar -->
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-[#D4A373] to-[#FDEB9E] transition-all duration-1000"
              :style="{ width: m.progress + '%' }"
            ></div>
          </div>

        </div>

      </div>
    </div>

    <!-- bottom fade -->
    <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070606] to-transparent"></div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const story = [
  {
    icon: '🌍',
    title: { en: 'Global Export Positioning', am: 'ዓለም አቀፍ አቀማመጥ' },
    description: {
      en: 'We strategically position Ethiopian coffee in high-value international markets with consistent demand.',
      am: 'የኢትዮጵያ ቡናን በከፍተኛ ዋጋ ገበያ እናቀርባለን።',
    },
  },
  {
    icon: '🏆',
    title: { en: 'Export Grade Consistency', am: 'የኤክስፖርት ጥራት' },
    description: {
      en: 'Strict selection and processing ensures world-class coffee quality every shipment.',
      am: 'በእያንዳንዱ ልክ የዓለም ደረጃ ጥራት እናረጋግጣለን።',
    },
  },
  {
    icon: '🤝',
    title: { en: 'Farmer Network Power', am: 'የአርሶ አደር መረብ' },
    description: {
      en: 'We work directly with farmers to ensure sustainability and fair value distribution.',
      am: 'ከአርሶ አደሮች ጋር በቀጥታ እንሰራለን።',
    },
  },
]

const metrics = [
  { icon: '📈', label: { en: 'Market Demand', am: 'የገበያ ፍላጎት' }, value: 'Very High', progress: 95 },
  { icon: '💰', label: { en: 'Profit Potential', am: 'ትርፋማነት' }, value: 'Strong', progress: 92 },
  { icon: '🌍', label: { en: 'Global Reach', am: 'ዓለም አቀፍ' }, value: 'Expanding', progress: 88 },
  { icon: '⚙️', label: { en: 'Operational Strength', am: 'የስራ ኃይል' }, value: 'Stable', progress: 90 },
]
</script>