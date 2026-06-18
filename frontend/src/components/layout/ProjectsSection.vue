<!-- src/components/layout/ProjectsSection.vue -->

<template>
  <section
    id="projects"
    class="relative min-h-screen px-6 md:px-10 pt-24 pb-28 overflow-hidden
    bg-gradient-to-br from-[#050404] via-[#0F0B08] to-[#1A120D]"
  >

    <!-- GLOBAL ATMOSPHERE -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-[500px] h-[500px] bg-[#D4A373]/10 blur-[150px] rounded-full"></div>
      <div class="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#1B5E20]/10 blur-[160px] rounded-full"></div>
    </div>

    <!-- FLOATING ICONS -->
    <div class="absolute top-24 left-12 text-4xl opacity-10 animate-bounce">🌍</div>
    <div class="absolute top-52 right-20 text-3xl opacity-10 animate-pulse">🚢</div>
    <div class="absolute bottom-24 left-1/3 text-5xl opacity-10 animate-bounce">☕</div>

    <!-- HEADER -->
    <div class="relative z-10 text-center mb-20">
      <h2 class="text-6xl md:text-7xl font-extrabold text-[#FDEB9E]">
        {{ locale === 'en' ? 'Global Operations' : 'ዓለም አቀፍ ስራዎች' }}
      </h2>

      <p class="mt-6 max-w-3xl mx-auto text-[#D6C7A1] text-lg">
        {{
          locale === 'en'
            ? 'Real export operations connecting Ethiopian coffee farmers to international markets through structured logistics, quality control, and global distribution.'
            : 'ኢትዮጵያ ቡናን ከዓለም ገበያ ጋር የሚያገናኝ የተደራጀ የላክ ስርዓት።'
        }}
      </p>
    </div>

    <!-- GLOBAL STATUS BAR -->
    <div class="relative z-10 max-w-5xl mx-auto mb-16 grid md:grid-cols-3 gap-6">

      <div
        v-for="m in stats"
        :key="m.label.en"
        class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center"
      >
        <div class="text-3xl mb-2">{{ m.icon }}</div>
        <div class="text-2xl font-bold text-[#FDEB9E]">{{ m.value }}</div>
        <div class="text-sm text-[#D6C7A1]">
          {{ m.label[locale] }}
        </div>
      </div>

    </div>

    <!-- OPERATION LINES -->
    <div class="relative z-10 max-w-6xl mx-auto space-y-8">

      <div
        v-for="p in projects"
        :key="p.title.en"
        class="group relative p-8 rounded-3xl
        bg-white/5 border border-white/10 backdrop-blur-xl
        hover:bg-white/10 transition-all duration-500"
      >

        <!-- glow line -->
        <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#D4A373] to-[#FDEB9E] rounded-full"></div>

        <div class="flex items-start gap-6">

          <!-- ICON -->
          <div class="text-5xl">{{ p.icon }}</div>

          <!-- CONTENT -->
          <div class="flex-1">

            <h3 class="text-2xl font-bold text-[#FDEB9E] mb-2">
              {{ p.title[locale] }}
            </h3>

            <div class="text-sm text-[#D4A373] mb-3">
              🌍 {{ p.route }}
            </div>

            <p class="text-[#D6C7A1] leading-relaxed">
              {{ p.description[locale] }}
            </p>

            <!-- STATUS -->
            <div class="mt-5 inline-block px-4 py-2 text-sm rounded-full
            bg-[#D4A373]/10 border border-[#D4A373]/20 text-[#FDEB9E]">
              {{ p.status[locale] }}
            </div>

          </div>

        </div>
      </div>

    </div>

    <!-- bottom fade -->
    <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050404] to-transparent"></div>

  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const stats = [
  {
    icon: '🌍',
    value: '12+',
    label: {
      en: 'Export Countries',
      am: 'የላክ አገሮች'
    }
  },
  {
    icon: '🚢',
    value: 'Active',
    label: {
      en: 'Shipping Routes',
      am: 'የመጓጓዣ መንገዶች'
    }
  },
  {
    icon: '💰',
    value: 'High',
    label: {
      en: 'Trade Value',
      am: 'ከፍተኛ ንግድ ዋጋ'
    }
  },
]

const projects = [
  {
    icon: '🚢',
    title: {
      en: 'Ethiopian Coffee Export Corridor',
      am: 'የኢትዮጵያ ቡና የላክ መስመር'
    },
    route: 'Ethiopia → Europe',
    description: {
      en: 'Premium Ethiopian coffee shipped directly to high-value European buyers through structured logistics and controlled quality systems.',
      am: 'ከኢትዮጵያ ወደ አውሮፓ የሚላክ ከፍተኛ ጥራት ቡና።'
    },
    status: {
      en: 'Active International Trade',
      am: 'ንቁ ዓለም አቀፍ ንግድ'
    }
  },
  {
    icon: '🌍',
    title: {
      en: 'Global Distribution Network',
      am: 'ዓለም አቀፍ ስርጭት አውታረ መረብ'
    },
    route: 'Middle East / USA / Europe',
    description: {
      en: 'Long-term supply chains connecting Ethiopian producers with international coffee distributors and wholesale markets.',
      am: 'የኢትዮጵያ አርሶ አደሮችን ከዓለም ገበያ ጋር የሚያገናኝ ስርዓት።'
    },
    status: {
      en: 'Expanding Network',
      am: 'እየተስፋፋ ያለ አውታረ መረብ'
    }
  },
  {
    icon: '☕',
    title: {
      en: 'Highland Coffee Sourcing System',
      am: 'የተራራ ቡና ምንጭ ስርዓት'
    },
    route: 'Ethiopian Highlands',
    description: {
      en: 'Direct sourcing from Ethiopian highlands ensuring premium export-grade beans and full traceability.',
      am: 'ከኢትዮጵያ ተራራ ቡና ቀጥታ ምንጭ።'
    },
    status: {
      en: 'Quality Controlled Supply',
      am: 'በጥራት የተቆጣጠረ ምርት'
    }
  }
]
</script>