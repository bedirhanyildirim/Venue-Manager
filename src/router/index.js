import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import Home from '../pages/home.pages.vue'
import Membership from '../pages/membership.pages'
import CompleteProfile from '../pages/completeProfile.pages'

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
  },
  {
    path: '/complete-profile',
    name: 'CompleteProfile',
    component: CompleteProfile,
    meta: {
      title: 'Profilini Tamamla',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  next()
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!Store.getters.loggedIn) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
