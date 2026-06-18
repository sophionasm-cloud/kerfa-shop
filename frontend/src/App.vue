<template>
  <div v-if="route.path === '/'"
       class="bg-[#0B0A08] text-white h-screen overflow-y-scroll snap-y snap-mandatory">

```
<Navbar />

<section id="home" class="snap-start">
  <Herosection />
</section>

<section id="counter" class="snap-start">
  <CounterSection />
</section>

<section id="services" class="snap-start">
  <ServicesSection />
</section>

<section id="products" class="snap-start">
  <ProductSection />
</section>

<section id="skills" class="snap-start">
  <SkillsSection />
</section>

<section id="whyme" class="snap-start">
  <WhyMeSection />
</section>

<section id="projects" class="snap-start">
  <ProjectsSection />
</section>

<section id="contact" class="snap-start">
  <ContactSection />
</section>


  </div>

  <router-view v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'

import Navbar from './components/layout/Navbar.vue'
import Herosection from './components/layout/Herosection.vue'
import CounterSection from './components/layout/CounterSection.vue'
import ServicesSection from './components/layout/ServicesSection.vue'
import SkillsSection from './components/layout/SkillsSection.vue'
import WhyMeSection from './components/layout/WhyMeSection.vue'
import ProjectsSection from './components/layout/ProjectsSection.vue'
import ContactSection from './components/layout/ContactSection.vue'
import ProductSection from './components/layout/ProductSection.vue'

const route = useRoute()
</script>
