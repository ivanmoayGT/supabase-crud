import { createRouter, createWebHistory } from 'vue-router'
import CrudApp from '../components/CrudApp.vue' // Assuming CrudApp is a main view
import VisitDetail from '../components/VisitDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home', // Or 'CrudApp' if you prefer
    component: CrudApp,
  },
  {
    path: '/visit-detail',
    name: 'VisitDetail',
    component: VisitDetail,
  },
  // Add other routes here
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use history mode
  routes,
})

export default router
