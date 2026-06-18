<template>
  <div class="min-h-screen bg-[#120A08] text-white flex justify-center items-center p-10">
    <div class="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10">
      
      <div class="flex justify-around mb-8 border-b border-white/10 pb-4">
        <button 
          @click="isSignUp = false" 
          :class="!isSignUp ? 'text-[#FDEB9E] font-bold border-b-2 border-[#FDEB9E]' : 'text-white/60'"
          class="pb-2 text-lg transition"
        >
          Sign In
        </button>
        <button 
          @click="isSignUp = true" 
          :class="isSignUp ? 'text-[#FDEB9E] font-bold border-b-2 border-[#FDEB9E]' : 'text-white/60'"
          class="pb-2 text-lg transition"
        >
          Sign Up
        </button>
      </div>

      <h2 class="text-2xl font-bold text-[#FDEB9E] text-center mb-6">
        {{ isSignUp ? 'Create your Coffee Account' : 'Welcome Back!' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="isSignUp">
          <input
            v-model="form.name"
            type="text"
            placeholder="Full Name"
            class="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#D4A373]"
            required
          />
        </div>

        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email Address"
            class="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#D4A373]"
            required
          />
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-[#D4A373]"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 mt-4 bg-[#D4A373] text-black font-bold rounded-xl hover:bg-[#c29263] transition"
        >
          {{ isSignUp ? 'Register Account' : 'Login' }}
        </button>
      </form>

      <p v-if="feedbackMessage" class="mt-4 text-center text-sm font-medium" :class="isError ? 'text-red-400' : 'text-green-400'">
        {{ feedbackMessage }}
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSignUp = ref(false)
const feedbackMessage = ref('')
const isError = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  feedbackMessage.value = ''
  isError.value = false

  try {
    const response = await axios.post('/api/login', {
      email: form.email,
      password: form.password
    })

    console.log('Admin login response:', response.data)

    if (response.data.token) {
      // ✅ FIXED - Save as admin_token
      localStorage.setItem('admin_token', response.data.token)
      localStorage.setItem('admin_user', JSON.stringify(response.data.user))
      feedbackMessage.value = 'Admin logged in successfully! ☕'
      router.push('/admin/dashboard')
    } else {
      feedbackMessage.value = 'No token received'
      isError.value = true
    }
  } catch (error) {
    isError.value = true
    console.error('Admin Login Error:', error)
    feedbackMessage.value = error.response?.data?.message || 'Authentication failed!'
  }
}
</script>