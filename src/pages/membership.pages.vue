<template>
<div id="membership">
  <container display="flex" align-items="center" justify-content="space-between" :min-height-active="true">
    <div class="wrapper">
      <div class="forms">
        <h1 class="welcome">Start to work with Venue</h1>
        <signup v-if="currentPage==='signup'" v-on:goToSignin="openLogin"></signup>
        <login v-if="currentPage==='login'" v-on:goToSignup="openSignup"></login>
      </div>
      <div class="illustration">
        <img class="login-illustration" v-if="currentPage==='login'" src="../assets/illustrations/login.jpg" alt="">
        <img class="signup-illustration" v-if="currentPage==='signup'" src="../assets/illustrations/signup.jpg" alt="">
      </div>
    </div>
  </container>
</div>
</template>

<script>
import router from '@/router'
import container from '../components/container'
import login from '../components/login.membership'
import signup from '../components/signup.membership'
import { mapGetters } from 'vuex';

export default {
  name: 'Membership',
  router,
  components: { login, container, signup },
  data: function () {
    return {
      currentPage: this.$route.params.id || 'signup'
    }
  },
  watch: {
    $route() {
      this.currentPage = this.$route.params.id
    }
  },
  methods: {
    openLogin: function () {
      this.currentPage = 'login'
    },
    openSignup: function () {
      this.currentPage = 'signup'
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn'
    ])
  },
  created () {
    if (this.loggedIn) {
      router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .wrapper {
    width: 100%;
    display: flex;
    padding: 50px 0;
    align-items: center;
    justify-content: space-evenly;
  }
  .wrapper {
    .forms {
      transition: opacity 1s ease-out;
    }
    .forms {
      .welcome {
        color: #000000;
        font-size: 24px;
        text-align: left;
        font-weight: 700;
        margin-bottom: 30px;
        font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      }
    }
    .illustration {
      overflow: hidden;
      max-width: 400px;
      transition: opacity 1s ease-out;
    }
    .illustration {
      .login-illustration {
        width: 100%;
        animation: fadeIn 1s;
        -webkit-animation: fadeIn 1s;
      }
      .signup-illustration {
        width: 100%;
        animation: fadeIn 1s;
        -webkit-animation: fadeIn 1s;
      }
    }
  }
 }
@-webkit-keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media screen and (max-width: 768px) {
  .container {
    .wrapper {
      display: flex;
      padding: 24px 0;
      align-items: center;
      justify-content: center;
    }
    .wrapper {
      .forms {
      }
      .illustration {
        display: none;
      }
    }
  }
}
</style>