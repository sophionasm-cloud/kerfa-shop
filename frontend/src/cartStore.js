import { ref, computed } from 'vue'

// Global reactive state
const cart = ref([])

export function useCart() {
  // Add item to cart or increase quantity if it's already there
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  // Remove item completely
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
  }

  // Clear cart entirely after ordering
  const clearCart = () => {
    cart.value = []
  }

  // Automatically calculates total price in ETB
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  // Total count of individual items
  const cartCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount
  }
}