<template>
  <div class="min-h-screen bg-[#120A08] text-white flex flex-col items-center p-10 py-20">
    <div class="w-full max-w-3xl bg-white/5 p-8 rounded-3xl border border-white/10">
      
      <h1 class="text-4xl font-bold text-[#FDEB9E] mb-2 text-center">📦 My Orders</h1>
      <p class="text-white/60 text-center mb-8">Track your live coffee preparation and delivery status.</p>

      <div v-if="!isLoggedIn" class="text-center py-12">
        <p class="text-white/70 mb-6">You need to be signed in to track your orders.</p>
        <router-link to="/login" class="px-6 py-3 bg-[#D4A373] text-black font-bold rounded-xl transition hover:bg-[#c29263]">
          Sign In to Account
        </router-link>
      </div>

      <div v-else-if="userOrders.length === 0" class="text-center py-12 text-white/50">
        <p class="mb-4">You haven't ordered any coffee yet! ☕</p>
        <router-link to="/" class="text-[#D4A373] underline font-semibold">View Collection</router-link>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="order in userOrders" 
          :key="order.id" 
          class="p-5 rounded-2xl bg-black/30 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
        >
          <div>
            <span class="text-xs text-[#D4A373] font-mono uppercase tracking-wider block mb-1">Order #{{ order.id }}</span>
            <h4 class="text-xl font-bold text-white">{{ order.product_name }}</h4>
            <p class="text-sm text-white/60">Quantity: {{ order.quantity }} | Total: {{ order.total_price }} ETB</p>
            <p class="text-xs text-white/40 mt-2">Placed: {{ new Date(order.created_at).toLocaleString() }}</p>
          </div>
          
          <div :class="getStatusClass(order.status)" class="px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-center self-start sm:self-center">
            ● {{ order.status }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isLoggedIn = ref(false)
const userOrders = ref([])

onMounted(async () => {
  // Check if user token exists in browser local storage
  const token = localStorage.getItem('user_token')
  if (token) {
    isLoggedIn.value = true
    try {
      // Fetch data using bearer token security authentication 
      const response = await axios.get('http://127.0.0.1:8000/api/orders/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      userOrders.value = response.data
    } catch (error) {
      console.error('Failed to pull order logs:', error)
    }
  }
})

// Visual pill colors for dashboard updates
const getStatusClass = (status) => {
  if (status === 'Pending') return 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
  if (status === 'Approved') return 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
  if (status === 'Completed') return 'bg-green-500/20 text-green-400 border border-green-500/20'
  return 'bg-white/10 text-white/70'
}
</script>