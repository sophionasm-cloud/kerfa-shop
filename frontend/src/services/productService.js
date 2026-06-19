import axios from 'axios'

// Use proxy URL, not full URL
const API_URL = 'https://app-45694296-daec-4264-9167-45a65f5e680e.cleverapps.io/api/products'
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const createProduct = async (formData) => {
  try {
    const token = localStorage.getItem('admin_token')
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const updateProduct = async (id, formData) => {
  try {
    const token = localStorage.getItem('admin_token')
    const response = await axios.post(`${API_URL}/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('admin_token')
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}