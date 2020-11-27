import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    _user: JSON.parse(localStorage.getItem('__user')) || '',
    _user_info : JSON.parse(localStorage.getItem('__user_info')) || '',
    _company: JSON.parse(localStorage.getItem('__company_info')) || ''
  },
  getters: {
    getUser (state) {
      return state._user
    },
    getUserInfo (state) {
      return state._user_info
    },
    loggedIn (state) {
      return (state._user !== null && state._user !== '')
    },
    getCompany (state) {
      return state._company
    },
    hasCompany (state) {
      return (state._company !== null && state._company !== '')
    }
  },
  mutations: {
    setUser (state, userData) {
      if (userData !== null && userData !== '') {
        localStorage.setItem('__user', JSON.stringify(userData))
      }
      if (localStorage.getItem('__user') && localStorage.getItem('__user') !== '') {
        const stringData = localStorage.getItem('__user') || ''
        const data = JSON.parse(stringData)
        state._user = data
      }
    },
    setUserInfo (state, infoData) {
      if (infoData !== null && infoData !== '') {
        localStorage.setItem('__user_info', JSON.stringify(infoData))
      }
      if (localStorage.getItem('__user_info') && localStorage.getItem('__user_info') !== '') {
        const stringInfoData = localStorage.getItem('__user_info') || ''
        const info = JSON.parse(stringInfoData)
        state._user_info = info
      }
    },
    logOut (state) {
      state._user = null
      localStorage.removeItem('__user')
      state._user_info = null
      localStorage.removeItem('__user_info')
      localStorage.removeItem('__company_info')
    },
    setCompany (state, infoCompany) {
      if (infoCompany !== null && infoCompany !== '') {
        localStorage.setItem('__company_info', JSON.stringify(infoCompany))
      }
      if (localStorage.getItem('__company_info') && localStorage.getItem('__company_info') !== '') {
        const stringInfoCompany = localStorage.getItem('__company_info') || ''
        state._user_info = JSON.parse(stringInfoCompany)
      }
    }
  },
  actions: {
    setUser ({ commit }, userData) {
      commit('setUser', userData)
    },
    setUserInfo ({ commit }, infoData) {
      commit('setUserInfo', infoData)
    },
    logOut ({ commit }) {
      commit('logOut')
    },
    setCompany ({ commit }, companyData) {
      commit('setCompany', companyData)
    }
  },
  modules: {
  }
})
