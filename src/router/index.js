import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import MainContainer from "../components/MainContainer.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/Main',
    name: 'Main',
    component: MainContainer
  }
]

const router = new VueRouter({
  routes
})

export default router
