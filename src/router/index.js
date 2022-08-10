import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Loading from '../components/LoadingSpinner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Loading',
    name: 'Loading',
    component: () => import( '../components/LoadingSpinner.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
