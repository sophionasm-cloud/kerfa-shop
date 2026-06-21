<template>
  <section
    id="contact"
    class="relative min-h-screen px-6 md:px-10 pt-24 pb-28 overflow-hidden
    bg-gradient-to-br from-[#050403] via-[#0F0B08] to-[#120C08]"
  >

    <div class="absolute inset-0">
      <div class="absolute top-10 left-10 w-[600px] h-[600px] bg-[#D4A373]/10 blur-[160px] rounded-full"></div>
      <div class="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#1B5E20]/10 blur-[180px] rounded-full"></div>
    </div>

    <div class="relative z-10 text-center mb-16">
      <h2 class="text-5xl md:text-7xl font-extrabold text-[#FDEB9E]">
        {{ locale === 'en' ? 'Investor Headquarters' : 'የኢንቨስተር ማዕከል' }}
      </h2>

      <p class="mt-6 max-w-3xl mx-auto text-[#D6C7A1] text-lg">
        {{
          locale === 'en'
            ? 'Direct access to KERFA leadership for partnerships, investments, and global coffee export operations.'
            : 'ለትብብር እና ኢንቨስትመንት ቀጥታ ግንኙነት።'
        }}
      </p>
    </div>

    <div class="relative z-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">

      <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
        <div class="text-4xl mb-2">📈</div>
        <h3 class="text-[#FDEB9E] font-bold">
          {{ locale === 'en' ? 'Growth Ready' : 'ለእድገት ዝግጁ' }}
        </h3>
        <p class="text-[#D6C7A1] text-sm mt-2">Scalable export infrastructure</p>
      </div>

      <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
        <div class="text-4xl mb-2">🌍</div>
        <h3 class="text-[#FDEB9E] font-bold">
          {{ locale === 'en' ? 'Global Reach' : 'ዓለም አቀፍ ተደራሽነት' }}
        </h3>
        <p class="text-[#D6C7A1] text-sm mt-2">Multi-market export channels</p>
      </div>

      <div class="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
        <div class="text-4xl mb-2">💰</div>
        <h3 class="text-[#FDEB9E] font-bold">
          {{ locale === 'en' ? 'High Value Trade' : 'ከፍተኛ ዋጋ ንግድ' }}
        </h3>
        <p class="text-[#D6C7A1] text-sm mt-2">Premium Ethiopian coffee exports</p>
      </div>

    </div>

    <div class="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

      <div class="space-y-6">

        <div class="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          <p class="text-[#D4A373] text-sm">PHONE</p>
          <p class="text-[#FDEB9E] text-lg font-bold">0978901893</p>
        </div>

        <div class="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          <p class="text-[#D4A373] text-sm">EMAIL</p>
          <p class="text-[#FDEB9E] text-lg font-bold break-all">sophoniasmelaku@gmail.com</p>
        </div>

        <div class="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          <p class="text-[#D4A373] text-sm">LOCATION</p>
          <p class="text-[#FDEB9E] text-lg font-bold">Dire Dawa, Ethiopia</p>
        </div>

      </div>

      <div class="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

        <h3 class="text-2xl font-bold text-[#FDEB9E] mb-6">
          {{ locale === 'en' ? 'Start Partnership Request' : 'የትብብር ጥያቄ ጀምር' }}
        </h3>

        <form @submit.prevent="handleFormSubmit" class="space-y-4">
          
          <input
            v-model="formData.full_name"
            type="text"
            :placeholder="locale === 'en' ? 'Full Name' : 'ሙሉ ስም'"
            class="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-[#D4A373] transition"
            required
          />

          <input
            v-model="formData.email"
            type="email"
            :placeholder="locale === 'en' ? 'Email Address' : 'ኢሜል'"
            class="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-[#D4A373] transition"
            required
          />

          <textarea
            v-model="formData.message"
            rows="4"
            :placeholder="locale === 'en' ? 'Investment or Partnership Message' : 'የትብብር መልዕክት'"
            class="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-[#D4A373] transition"
            required
          ></textarea>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 rounded-xl font-bold
            bg-gradient-to-r from-[#D4A373] to-[#FDEB9E]
            text-black hover:scale-105 transition disabled:opacity-50 disabled:scale-100"
          >
            {{ isSubmitting ? (locale === 'en' ? 'Sending...' : 'በመልክት ላይ...') : (locale === 'en' ? 'Send Request' : 'ላክ') }}
          </button>
        </form>

        <div v-if="feedbackMessage" :class="['mt-4 p-3 rounded-xl text-sm text-center font-semibold', isSuccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30']">
          {{ feedbackMessage }}
        </div>

      </div>

    </div>

    <div class="relative z-10 text-center mt-20">
      <h3 class="text-3xl font-bold text-[#FDEB9E] mb-3">
        {{ locale === 'en'
          ? 'KERFA is Ready for Global Expansion'
          : 'KERFA ለዓለም አቀፍ ስፋት ዝግጁ ነው' }}
      </h3>

      <p class="text-[#D6C7A1] max-w-2xl mx-auto">
        {{ locale === 'en'
          ? 'We are open to investors, distributors, and long-term strategic partners in the global coffee market.'
          : 'ለኢንቨስተሮች እና ለትብብር ክፍት ነን።' }}
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { locale } = useI18n()

// Form Data binding schema matching Laravel backend validations
const formData = ref({
  full_name: '',
  email: '',
  subject: 'Investor/Partnership Inquiry', // Auto set subject context for DB consistency
  message: ''
})

const isSubmitting = ref(false)
const feedbackMessage = ref('')
const isSuccess = ref(false)

const handleFormSubmit = async () => {
  isSubmitting.value = true
  feedbackMessage.value = ''
  isSuccess.value = false
  
  try {
    // API transmission over to the backend pipeline
    const response = await axios.post('/api/contact', formData.value)
    
    isSuccess.value = true
    feedbackMessage.value = response.data.message // Uses the success text set in Laravel response
    
    // Clear inputs on successful write operations
    formData.value = {
      full_name: '',
      email: '',
      subject: 'Investor/Partnership Inquiry',
      message: ''
    }
  } catch (error) {
    console.error('Inquiry delivery failed:', error)
    isSuccess.value = false
    feedbackMessage.value = locale.value === 'en' 
      ? 'Transmission failed. Please check your network and try again.' 
      : 'መልዕክቱን መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።'
  } finally {
    isSubmitting.value = false
  }
}
</script>