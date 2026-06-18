<template>
  <section class="min-h-screen bg-[#120A08] text-white py-20 px-6">
    <div class="max-w-7xl mx-auto">

```
  <h1 class="text-5xl font-bold text-center text-[#FDEB9E] mb-12">
    Global Export Products
  </h1>

  <div v-if="loading" class="text-center text-xl">
    Loading products...
  </div>

  <div
    v-else
    class="grid md:grid-cols-3 gap-8"
  >
    <div
      v-for="product in exportProducts"
      :key="product.id"
      class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
    >
      <h2 class="text-2xl font-bold text-[#FDEB9E] mb-3">
        {{ product.name }}
      </h2>

      <p class="text-gray-300 mb-4">
        {{ product.description }}
      </p>

      <div class="space-y-2">
        <p>
          <span class="font-semibold">Price:</span>
          {{ product.price }} ETB
        </p>

        <p>
          <span class="font-semibold">Stock:</span>
          {{ product.stock }}
        </p>
      </div>

      <button
        class="mt-5 px-5 py-3 rounded-xl bg-[#D4A373] text-black font-bold"
      >
        Order Now
      </button>
    </div>
  </div>

</div>
```

  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getProducts } from '../services/productService'

const products = ref([])
const loading = ref(true)

const exportProducts = computed(() =>
  products.value.filter(
    product => product.category === 'Global Export'
  )
)

onMounted(async () => {
  try {
    products.value = await getProducts()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>
