<template>
  <div id="header">
    <container display="flex" align-items="center" justify-content="space-between" min-height="auto">
      <div class="logo">
        <router-link to="/"><img src="../assets/images/Venue.png" alt="Venue Manager"></router-link>
      </div>
      <div class="content">
        <div class="nav">
          <h3 v-if="!loggedIn" class="becomeHost"><router-link to="/membership/signup">Become a host</router-link></h3>
          <h3 v-if="loggedIn && !hasCompany" class="becomeHost"><router-link to="/create-company">Create your company</router-link></h3>
          <h3 v-if="loggedIn && hasCompany" class="becomeHost"><router-link to="/company">Manage your company</router-link></h3>
          <dropdown></dropdown>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import Container from '../components/container'
import Dropdown from '../components/dropdown.header'

export default {
  name: "header.theme.vue",
  store,
  router,
  components: {Container, Dropdown},
  computed: {
    ...mapGetters([
      'getUser',
      'getUserInfo',
      'loggedIn',
      'hasCompany'
    ])
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().catch(function (err) {
        console.log(err)
      }).then(_ => {
        this.$store.dispatch('logOut')
        router.push('/membership');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  height: 80px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  box-sizing: border-box;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.1);
  -webkit-box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.1);
}

#header {
  .logo {
    height: 32px;
    box-sizing: border-box;
  }

  .logo {
    a {
      margin: 0;
      padding: 0;
      height: 100%;
      box-sizing: border-box;
    }
    img{
      margin: 0;
      padding: 0;
      height: 100%;
      box-sizing: border-box;
    }
  }
  .content {

  }
  .content {
    .nav {
      display: flex;
      width: fit-content;
      align-items: center;
      justify-content: center;
    }

    .nav {
      .becomeHost a {
        color: #000000;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        margin-right: 10px;
        padding: 11px 15px;
        border-radius: 32px;
        transition: background-color 200ms ease-in-out;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      .becomeHost a {
        &:hover {
          color: #000000;
          background-color: #f7f7f7;
        }
        &:focus {
          color: #000000;
        }
        &.router-link-exact-active {
          color: #000000;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .becomeHost {
    display: none;
  }
}
</style>