import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.pages.vue'
import Membership from '../pages/membership.pages'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/membership',
    name: 'Membership',
    component: Membership
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
