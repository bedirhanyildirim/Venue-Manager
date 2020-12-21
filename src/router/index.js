import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import Home from '../pages/home.pages.vue'
import Membership from '../pages/membership.pages'
import CompleteProfile from '../pages/completeProfile.pages'
import Profile from '../pages/profile.pages'
import CreateCompany from '../pages/createCompany.pages'
import CreateSource from '../pages/createSource.pages'
import SourceDetail from '../pages/sourceDetail.pages'
import ReservationDetail from '../pages/reservationDetail.pages'
import MyReservations from '../pages/myReservations.pages'
import ManageCompany from '../pages/manageCompany.pages'
import ManageSource from '../pages/manageSource.pages'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Venue'
    }
  },
  {
    path: '/membership/:id?',
    name: 'Membership',
    component: Membership,
    meta: {
      title: 'Membership',
      requiresAuth: false
    },
    props: (route) => ({ id: route.params.id || 'sigunup' })
  },
  {
    path: '/complete-profile',
    name: 'CompleteProfile',
    component: CompleteProfile,
    meta: {
      title: 'Complete your profile',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'My profile',
      requiresAuth: true
    }
  },
  {
    path: '/create-company',
    name: 'CreateCompany',
    component: CreateCompany,
    meta: {
      title: 'Create company',
      requiresAuth: true
    }
  },
  {
    path: '/create-source',
    name: 'CreateSource',
    component: CreateSource,
    meta: {
      title: 'Create source',
      requiresAuth: true
    }
  },
  {
    path: '/source/:id',
    name: 'SourceDetail',
    component: SourceDetail,
    meta: {
      title: 'Source detail',
      requiresAuth: false
    }
  },
  {
    path: '/reservation/:id',
    name: 'ReservationDetail',
    component: ReservationDetail,
    meta: {
      title: 'Reservation detail',
      requiresAuth: true
    }
  },
  {
    path: '/my-reservations',
    name: 'MyReservations',
    component: MyReservations,
    meta: {
      title: 'My reservations',
      requiresAuth: true
    }
  },
  {
    path: '/company',
    name: 'Company',
    component: ManageCompany,
    meta: {
      title: 'Manage company',
      requiresAuth: true
    }
  },
  {
    path: '/my-source/:id',
    name: 'MySourceDetail',
    component: ManageSource,
    meta: {
      title: 'Manage source',
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
