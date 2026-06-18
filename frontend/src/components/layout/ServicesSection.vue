
<template>
  <section
    id="services"
    class="relative min-h-screen overflow-hidden px-6 md:px-10 pt-24 pb-24
    bg-gradient-to-br from-[#120A08] via-[#1F120D] to-[#2B1810]"
    @mousemove="handleMouseMove"
  >
    <!-- Mouse Glow -->
    <div
      class="pointer-events-none absolute w-72 h-72 rounded-full blur-3xl opacity-40 transition-transform duration-150"
      :style="{
        transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        background: 'radial-gradient(circle, #D4A373 0%, transparent 70%)'
      }"
    ></div>

    <!-- Floating Beans -->
    <div
      v-for="n in 25"
      :key="'bean' + n"
      class="absolute text-xl opacity-10 animate-float"
      :style="randomStyle(n)"
    >
      🫘
    </div>

    <!-- Steam -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="steam"></div>
      <div class="steam delay-1"></div>
      <div class="steam delay-2"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10 text-center mb-16">
      <h2 class="text-5xl md:text-6xl font-extrabold text-[#FDEB9E] animate-fadeIn">
        {{ locale === 'en'
          ? 'Our Premium Services'
          : 'የእኛ ከፍተኛ አገልግሎቶች'
        }}
      </h2>

      <p class="mt-6 max-w-3xl mx-auto text-[#F5E6CA] text-lg opacity-80">
        {{
          locale === 'en'
            ? 'Experience Ethiopian coffee reimagined with global luxury standards.'
            : 'የኢትዮጵያ ቡና በዓለም ደረጃ የተቀየረ ልምድ።'
        }}
      </p>
    </div>

    <!-- Cards -->
    <div class="relative z-10 grid md:grid-cols-3 gap-10">

      <div
        v-for="service in services"
        :key="service.title.en"
        class="group relative p-8 rounded-3xl
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-2xl
        transition-all duration-500
        hover:scale-110 hover:-translate-y-4"
      >
        <!-- Shine -->
        <div class="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div class="shine"></div>
        </div>

        <!-- Icon -->
        <div class="text-5xl mb-6 animate-bounce">
          {{ service.icon }}
        </div>

        <!-- Title -->
        <h3 class="text-2xl font-bold text-[#FDEB9E] mb-4">
          {{ service.title[locale] }}
        </h3>

        <!-- Description -->
        <p class="text-[#F5E6CA] leading-relaxed opacity-90">
          {{ service.description[locale] }}
        </p>

        <!-- Button -->
 <button
  @click="testClick"
  class="relative z-50 mt-6 px-6 py-3 rounded-xl font-semibold
  bg-gradient-to-r from-[#D4A373] to-[#FDEB9E]
  text-[#1A0F0A]"
>
  Place Order
</button>
      </div>

    </div>

    <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#120A08] to-transparent"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()

const mouse = ref({ x: 0, y: 0 })

const handleMouseMove = (e) => {
  mouse.value.x = e.clientX - 150
  mouse.value.y = e.clientY - 150
}
const testClick = () => {
  console.log('BUTTON CLICKED')
  router.push('/order')
}

const randomStyle = () => ({
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%',
  animationDuration: 3 + Math.random() * 5 + 's',
  fontSize: 10 + Math.random() * 20 + 'px',
})

const services = [
  {
    icon: '🌍',
    title: {
      en: 'Global Export',
      am: 'ዓለም አቀፍ ላክ'
    },
    description: {
      en: 'Luxury-grade Ethiopian coffee delivered worldwide.',
      am: 'የኢትዮጵያ ቡና በዓለም ደረጃ ይደርሳል።'
    }
  },
  {
    icon: '☕',
    title: {
      en: 'Local Market',
      am: 'አካባቢ ገበያ'
    },
    description: {
      en: 'Serving Ethiopia with premium coffee experiences.',
      am: 'በኢትዮጵያ የፕሪሚየም ቡና ልምድ።'
    }
  },
  {
    icon: '🫘',
    title: {
      en: 'Premium Quality',
      am: 'ከፍተኛ ጥራት'
    },
    description: {
      en: 'Hand-selected beans with elite roasting standards.',
      am: 'በጥንቃቄ የተመረጡ ከፍተኛ ጥራት ቡና።'
    }
  }
]
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s infinite ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.shine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 50%;
  height: 300%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.15),
    transparent
  );
  transform: rotate(25deg);
  animation: shineMove 4s infinite;
}

@keyframes shineMove {
  0% { left: -100%; }
  100% { left: 200%; }
}

.steam {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 2px;
  height: 100px;
  background: rgba(255,255,255,0.05);
  animation: steamUp 6s infinite;
}

.delay-1 {
  left: 40%;
  animation-delay: 2s;
}

.delay-2 {
  left: 60%;
  animation-delay: 4s;
}

@keyframes steamUp {
  0% {
    transform: translateY(0) scaleX(1);
    opacity: 0;
  }

  50% {
    opacity: 0.3;
  }

  100% {
    transform: translateY(-200px) scaleX(2);
    opacity: 0;
  }
}
</style>
```
