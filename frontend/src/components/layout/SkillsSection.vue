<!-- src/components/layout/SkillsSection.vue -->

<template>
  <section
    id="skills"
    class="relative min-h-screen px-6 md:px-10 pt-24 pb-24 overflow-hidden
    bg-gradient-to-br from-[#0B0A08] via-[#15100C] to-[#1F140E]"
  >
    <!-- background glow -->
    <div class="absolute top-10 left-10 w-[500px] h-[500px] bg-[#1B5E20]/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4A373]/10 blur-[120px] rounded-full"></div>

    <!-- HEADER -->
    <div class="relative z-10 text-center mb-16">
      <h2 class="text-5xl md:text-6xl font-extrabold text-[#FDEB9E]">
        {{ locale === 'en' ? 'Investment Highlights' : 'የኢንቨስትመንት ጥንካሬዎች' }}
      </h2>

      <p class="mt-6 max-w-3xl mx-auto text-[#D6C7A1] text-lg opacity-90">
        {{
          locale === 'en'
            ? 'A scalable Ethiopian coffee export company built for global demand, sustainable growth, and long-term profitability.'
            : 'ለዓለም ገበያ የተዘጋጀ የሚያድግ የቡና ኤክስፖርት ኩባንያ።'
        }}
      </p>
    </div>

    <!-- METRICS DASHBOARD -->
    <div class="relative z-10 grid md:grid-cols-4 gap-6 mb-20">

      <div
        v-for="m in metrics"
        :key="m.label.en"
        class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition"
      >
        <div class="text-3xl mb-2">{{ m.icon }}</div>

        <div class="text-3xl font-bold text-[#FDEB9E]">
          {{ m.value }}
        </div>

        <div class="text-sm text-[#D6C7A1] mt-2">
          {{ m.label[locale] }}
        </div>
      </div>
    </div>

    <!-- STRATEGIC STRENGTHS -->
    <div class="relative z-10 max-w-5xl mx-auto space-y-10">

      <div
        v-for="s in strengths"
        :key="s.title.en"
        class="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition"
      >

        <div class="flex items-start justify-between gap-6">

          <!-- icon -->
          <div class="text-4xl">{{ s.icon }}</div>

          <!-- content -->
          <div class="flex-1">
            <h3 class="text-xl font-bold text-[#FDEB9E] mb-2">
              {{ s.title[locale] }}
            </h3>

            <p class="text-[#D6C7A1] leading-relaxed">
              {{ s.description[locale] }}
            </p>

            <!-- progress bar -->
            <div class="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-[#D4A373] to-[#FDEB9E] transition-all duration-1000"
                :style="{ width: s.strength + '%' }"
              ></div>
            </div>
          </div>

          <!-- percentage -->
          <div class="text-[#D4A373] font-bold text-lg">
            {{ s.strength }}%
          </div>

        </div>
      </div>
    </div>

    <!-- bottom fade -->
    <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0B0A08] to-transparent"></div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const metrics = [
  { icon: '🌍', value: '12+', label: { en: 'Export Countries', am: 'የላክ አገሮች' } },
  { icon: '☕', value: '50T+', label: { en: 'Annual Coffee Volume', am: 'ዓመታዊ መጠን' } },
  { icon: '🤝', value: '1K+', label: { en: 'Farmer Partners', am: 'አርሶ አደሮች' } },
  { icon: '💰', value: 'High', label: { en: 'Profit Margin Model', am: 'ትርፋማ ሞዴል' } },
]

const strengths = [
  {
    icon: '🚀',
    title: { en: 'Scalable Export Infrastructure', am: 'የሚያድግ የላክ መሠረት' },
    strength: 95,
    description: {
      en: 'Built to expand into global markets with high demand efficiency.',
      am: 'ለዓለም ገበያ በቀላሉ የሚስፋፋ መሠረት።',
    },
  },
  {
    icon: '📈',
    title: { en: 'Strong Market Demand', am: 'ከፍተኛ የገበያ ፍላጎት' },
    strength: 92,
    description: {
      en: 'Ethiopian coffee remains one of the highest-value global commodities.',
      am: 'የኢትዮጵያ ቡና በዓለም ከፍተኛ ዋጋ ያለው ምርት ነው።',
    },
  },
  {
    icon: '🏆',
    title: { en: 'Premium Quality Control', am: 'ከፍተኛ ጥራት ቁጥጥር' },
    strength: 98,
    description: {
      en: 'Strict selection ensures export-grade consistency and brand trust.',
      am: 'የኤክስፖርት ደረጃ ጥራት ማረጋገጫ።',
    },
  },
]
</script>