import { createRouter, createWebHistory } from 'vue-router'

import GlobalExportView from '../views/GlobalExportView.vue'
import LocalMarketView from '../views/LocalMarketView.vue'
import PremiumQualityView from '../views/PremiumQualityView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import OrderView from '../views/OrderView.vue'
import ProductView from '../views/ProductView.vue'
import TrackOrderView from '../views/TrackOrderView.vue' 
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    component: {
      template: '<div></div>'
    }
  },
  {
    path: '/global-export',
    component: GlobalExportView,
  },
  {
    path: '/local-market',
    component: LocalMarketView,
  },
  {
    path: '/premium-quality',
    component: PremiumQualityView,
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboardView,
  },
  {
    path: '/products',
    component: ProductView,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },
  {
    path: '/track',
    name: 'track',
    component: TrackOrderView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  }
]

const router = createRouter({
  history: createWebHistory('/my-project-vue3/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const adminToken = localStorage.getItem('admin_token')
  const userToken = localStorage.getItem('user_token')

  console.log('Route guard - Path:', to.path)
  console.log('adminToken:', adminToken)
  console.log('userToken:', userToken)

  // Admin routes - ONLY admin_token works
  if (to.path === '/admin/dashboard' && !adminToken) {
    console.log('Redirecting to /login - no admin token')
    next('/login')
  } 
  // User routes - need user_token
  else if ((to.path === '/order' || to.path === '/track') && !userToken) {
    console.log('Redirecting to /login - no user token')
    next('/login')
  } 
  // Login page - always accessible
  else if (to.path === '/login') {
    next()
  } 
  // Everything else - accessible to everyone
  else {
    next()
  }
})

export default router