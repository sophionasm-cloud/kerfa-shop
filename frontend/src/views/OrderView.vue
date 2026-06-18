<template>
  <div class="min-h-screen bg-[#120A08] text-white flex justify-center items-center p-10">

    <div class="w-full max-w-2xl bg-white/5 p-8 rounded-3xl">

      <h1 class="text-4xl font-bold text-[#FDEB9E] mb-8">
        Place Your Order
      </h1>

      <form @submit.prevent="submitOrder" class="space-y-4">

        <input
          v-model="order.customer_name"
          placeholder="Full Name"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          required
        />

        <input
          v-model="order.phone"
          placeholder="Phone Number"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          required
        />

        <input
          v-model="order.address"
          placeholder="Delivery Address"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          required
        />

        <div>
          <label class="block text-xs text-white/50 mb-1 ml-1">Product Selected</label>
          <input
            v-model="order.product_name"
            placeholder="Product Name"
            disabled
            class="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white/60 cursor-not-allowed"
          />
        </div>

        <div>
          <label class="block text-xs text-white/50 mb-1 ml-1">Quantity</label>
          <input
            v-model="order.quantity"
            type="number"
            min="1"
            @input="updateTotalPrice"
            placeholder="Quantity"
            class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
            required
          />
        </div>

        <div>
          <label class="block text-xs text-white/50 mb-1 ml-1">Total Price (ETB)</label>
          <input
            v-model="order.total_price"
            type="number"
            disabled
            placeholder="Total Price"
            class="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-[#FDEB9E] font-bold cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-[#D4A373] text-black font-bold rounded-xl hover:bg-[#c29263] transition"
        >
          Place Order
        </button>

      </form>

      <p v-if="message" class="mt-6 font-medium text-center" :class="message.includes('success') ? 'text-green-400' : 'text-red-400'">
        {{ message }}
      </p>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCart } from '../cartStore'

const message = ref('')
const { cart } = useCart()

const order = ref({
  customer_name: '',
  phone: '',
  address: '',
  product_name: '',
  quantity: 1,
  total_price: 0,
})

let unitPrice = 0

onMounted(() => {
  if (cart.value && cart.value.length > 0) {
    const selectedProduct = cart.value[cart.value.length - 1]
    if (selectedProduct) {
      order.value.product_name = selectedProduct.name || ''
      order.value.quantity = selectedProduct.quantity || 1
      unitPrice = parseFloat(selectedProduct.price) || 0
      order.value.total_price = unitPrice * order.value.quantity
    }
  }
})

const updateTotalPrice = () => {
  if (order.value.quantity < 1) order.value.quantity = 1
  order.value.total_price = unitPrice * order.value.quantity
}

const submitOrder = async () => {
  try {
    const token = localStorage.getItem('user_token')
    
    if (!token) {
      message.value = 'Please login first!'
      return
    }

    const response = await axios.post('/api/orders', {
      customer_name: order.value.customer_name,
      phone: order.value.phone,
      address: order.value.address,
      product_name: order.value.product_name,
      quantity: order.value.quantity,
      total_price: order.value.total_price,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log('Order response:', response.data)
    message.value = 'Order placed successfully! ☕'

    order.value = {
      customer_name: '',
      phone: '',
      address: '',
      product_name: '',
      quantity: 1,
      total_price: 0,
    }
    unitPrice = 0

  } catch (error) {
    console.error('Order error:', error.response?.data || error.message)
    message.value = error.response?.data?.message || 'Failed to place order!'
  }
}
</script>