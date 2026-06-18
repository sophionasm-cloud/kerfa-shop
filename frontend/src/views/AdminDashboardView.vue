<template>
  <div class="min-h-screen bg-[#120A08] text-white p-10 overflow-y-auto">

    <h1 class="text-5xl font-bold text-[#FDEB9E] mb-10">
      Kerfa Admin Dashboard
    </h1>
     <!-- Premium Statistics Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

  <!-- Products -->
  <div
    class="bg-gradient-to-br from-[#D4A373]/20 to-[#FDEB9E]/10
    backdrop-blur-lg border border-[#D4A373]/20
    rounded-3xl p-6 hover:scale-105 transition duration-300"
  >
    <p class="text-white/60 text-sm uppercase tracking-wider">
      Products
    </p>

    <h2 class="text-4xl font-bold text-[#FDEB9E] mt-3">
      {{ totalProducts }}
    </h2>

    <p class="text-white/50 mt-2">
      Total products available
    </p>
  </div>

  <!-- Orders -->
  <div
    class="bg-gradient-to-br from-blue-500/20 to-blue-300/10
    backdrop-blur-lg border border-blue-500/20
    rounded-3xl p-6 hover:scale-105 transition duration-300"
  >
    <p class="text-white/60 text-sm uppercase tracking-wider">
      Orders
    </p>

    <h2 class="text-4xl font-bold text-blue-300 mt-3">
      {{ orders.length }}
    </h2>

    <p class="text-white/50 mt-2">
      Total customer orders
    </p>
  </div>

  <!-- Pending -->
  <div
    class="bg-gradient-to-br from-yellow-500/20 to-yellow-300/10
    backdrop-blur-lg border border-yellow-500/20
    rounded-3xl p-6 hover:scale-105 transition duration-300"
  >
    <p class="text-white/60 text-sm uppercase tracking-wider">
      Pending
    </p>

    <h2 class="text-4xl font-bold text-yellow-300 mt-3">
      {{ pendingOrders }}
    </h2>

    <p class="text-white/50 mt-2">
      Waiting for approval
    </p>
  </div>

  <!-- Completed -->
  <div
    class="bg-gradient-to-br from-green-500/20 to-green-300/10
    backdrop-blur-lg border border-green-500/20
    rounded-3xl p-6 hover:scale-105 transition duration-300"
  >
    <p class="text-white/60 text-sm uppercase tracking-wider">
      Completed
    </p>

    <h2 class="text-4xl font-bold text-green-300 mt-3">
      {{ completedOrders }}
    </h2>

    <p class="text-white/50 mt-2">
      Successfully delivered
    </p>
  </div>

</div>
    <!-- Add / Edit Product -->
    <div class="bg-white/5 p-8 rounded-3xl mb-10">
      <h2 class="text-3xl font-bold mb-6">
        {{ editingId ? 'Edit Product' : 'Add Product' }}
      </h2>

     <form @submit.prevent="addProduct" class="space-y-4">
        <input
          v-model="product.name"
          placeholder="Product Name"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
        />

        <div class="w-full">
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="w-full p-3 rounded-xl bg-black/20 border border-white/10 text-white"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            class="mt-3 w-32 h-32 object-cover rounded-xl border border-[#D4A373]/30"
          />
        </div>

        <textarea
          v-model="product.description"
          placeholder="Description"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
        ></textarea>

        <input
          v-model="product.price"
          type="number"
          placeholder="Price"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
        />

        <input
          v-model="product.category"
          placeholder="Category"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
        />

     

        <input
          v-model="product.stock"
          type="number"
          placeholder="Stock"
          class="w-full p-3 rounded-xl bg-black/20 border border-white/10"
        />

        <div class="flex gap-3">
          <button
            type="submit"
            class="px-6 py-3 bg-[#D4A373] text-black font-bold rounded-xl"
          >
            {{ editingId ? 'Update Product' : 'Add Product' }}
          </button>

          <button
            v-if="editingId"
            type="button"
            @click="cancelEdit"
            class="px-6 py-3 bg-white/10 text-white font-bold rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>

      <p v-if="message" class="mt-4 text-green-400">{{ message }}</p>
    </div>

    <!-- Product List -->
    <div class="bg-white/5 p-6 rounded-3xl mb-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold">Product List</h2>
        <span class="text-[#FDEB9E] font-semibold">Total: {{ totalProducts }}</span>
      </div>

      <table class="w-full">
        <thead>
          <tr class="border-b border-white/10">
            <th class="text-left pb-3">Name</th>
            <th class="text-left pb-3">Category</th>
            <th class="text-left pb-3">Price</th>
            <th class="text-left pb-3">Stock</th>
            <th class="text-left pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in products"
            :key="item.id"
            class="border-b border-white/5"
          >
            <td class="py-3">{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.price }} ETB</td>
            <td>{{ item.stock }}</td>
            <td class="space-x-2 py-2">
              <button
                @click="editProduct(item)"
                class="bg-yellow-500 px-4 py-2 rounded-xl text-black font-medium"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(item.id)"
                class="bg-red-600 px-4 py-2 rounded-xl font-medium"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="products.length === 0">
            <td colspan="5" class="py-6 text-center text-white/40">No products found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Orders -->
    <div class="bg-white/5 p-6 rounded-3xl">
      <h2 class="text-3xl font-bold mb-6">Orders</h2>

      <table class="w-full">
        <thead>
          <tr class="border-b border-white/10">
            <th class="text-left pb-3">Customer</th>
            <th class="text-left pb-3">Product</th>
            <th class="text-left pb-3">Quantity</th>
            <th class="text-left pb-3">Total</th>
            <th class="text-left pb-3">Status</th>
            <th class="text-left pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-white/5"
          >
            <td class="py-3">{{ order.customer_name }}</td>
            <td>{{ order.product_name }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.total_price }} ETB</td>
            <td>{{ order.status }}</td>
            <td class="space-x-2 py-2">
              <button
                @click="updateOrderStatus(order.id)"
                class="bg-green-600 px-4 py-2 rounded-xl font-medium"
              >
                Update
              </button>
              <button
                @click="deleteOrder(order.id)"
                class="bg-red-600 px-4 py-2 rounded-xl font-medium"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="orders.length === 0">
            <td colspan="6" class="py-6 text-center text-white/40">No orders found</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { getProducts, createProduct, updateProduct, deleteProduct as deleteProductService } from '../services/productService'

const totalProducts = ref(0)
const products = ref([])
const orders = ref([])

const pendingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'Pending').length
})

const completedOrders = computed(() => {
  return orders.value.filter(order => order.status === 'Completed').length
})

const message = ref('')
const editingId = ref(null)
const imageFile = ref(null)
const imagePreview = ref(null)

const product = ref({
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  stock: '',
  featured: 1,
})

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const resetProduct = () => {
  product.value = {
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    featured: 1,
  }
  imageFile.value = null
  imagePreview.value = null
}

const loadProducts = async () => {
  try {
    const data = await getProducts()
    products.value = data
    totalProducts.value = data.length
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

const loadOrders = async () => {
  const token = localStorage.getItem('admin_token')
  try {
    const response = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    orders.value = response.data
  } catch (error) {
    console.error("Error loading orders:", error)
  }
}

const addProduct = async () => {
  try {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      message.value = 'Please login as admin first'
      return
    }

    const formData = new FormData()
    formData.append('name', product.value.name ?? '')
    formData.append('description', product.value.description ?? '')
    formData.append('price', product.value.price ?? '')
    formData.append('category', product.value.category ?? '')
    formData.append('stock', product.value.stock ?? '')
    formData.append('featured', product.value.featured ?? 0)

    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (editingId.value) {
      await updateProduct(editingId.value, formData)
      message.value = 'Product updated successfully!'
      editingId.value = null
    } else {
      await createProduct(formData)
      message.value = 'Product added successfully!'
    }

    resetProduct()
    await loadProducts()
    setTimeout(() => (message.value = ''), 3000)
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    message.value = error.response?.data?.message || 'Operation failed'
  }
}

const editProduct = (item) => {
  editingId.value = item.id
  product.value = { ...item }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  editingId.value = null
  resetProduct()
}

const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await deleteProductService(id)
    await loadProducts()
  } catch (error) {
    console.error(error)
  }
}

const updateOrderStatus = async (id) => {
  try {
    const token = localStorage.getItem('admin_token')
    await axios.put(`/api/orders/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await loadOrders()
  } catch (error) {
    console.error(error)
  }
}

const deleteOrder = async (id) => {
  if (!confirm('Are you sure you want to delete this order?')) return
  try {
    const token = localStorage.getItem('admin_token')
    await axios.delete(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await loadOrders()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadProducts()
  loadOrders()
})
</script>