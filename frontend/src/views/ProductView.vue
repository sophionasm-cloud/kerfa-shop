<template>
  <div class="min-h-screen bg-[#120A08] text-white px-8 py-20">
    <h1 class="text-5xl font-bold text-center text-[#FDEB9E] mb-12">
      Our Coffee Collection
    </h1>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white/5 backdrop-blur-lg p-6 rounded-3xl border border-white/10 hover:scale-105 transition"
      >
       :src="product.image ? axios.defaults.baseURL + '/' + product.image : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'"

        <h2 class="text-2xl font-bold text-[#FDEB9E]">
          {{ product.name }}
        </h2>

        <p class="text-white/70 mt-2">
          {{ product.description }}
        </p>

        <p class="mt-4 text-xl font-bold">
          {{ product.price }} ETB
        </p>

        <button
          @click="goToOrder(product)"
          class="mt-6 w-full py-3 bg-[#D4A373] text-black font-bold rounded-xl"
        >
          Order Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
// 1. Import your cart tracker function
import { useCart } from '../cartStore' // 👈 Adjust the dots if cartStore.js is in a different folder

const router = useRouter()
const products = ref([])

// 2. Extract the addToCart function so we can use it below
const { addToCart } = useCart()

const loadProducts = async () => {
  try {
    const response = await axios.get('/api/products')  
    products.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// 3. Update this function to save the product first, then redirect!
const goToOrder = (product) => {
  addToCart(product)  // 👈 This saves the coffee to our global cart!
  router.push('/order') // 👈 This moves them to the checkout page!
}
// Inside your ProductView.vue, modify your orderNow function:
const orderNow = () => {
  if (!localStorage.getItem('user_token')) {
    alert('Please sign in to place an order!')
    router.push('/login')
  } else {
    router.push('/order')
  }
}

onMounted(() => {
  loadProducts()
})
</script>