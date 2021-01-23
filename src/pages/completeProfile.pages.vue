<template>
<div id="completeProfile">
  <container display="flex">
    <div class="wrapper" v-if="missingField && query">
      <div class="form">
        <h3 class="welcome">Welcome to Venue</h3>
        <h5 class="message">Complete your profile</h5>
        <complete-profile-component></complete-profile-component>
      </div>
      <div class="illustration">
        <img class="login-illustration" src="../assets/illustrations/login.jpg" alt="">
      </div>
    </div>
  </container>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import container from '../components/container'
import { usersCollection } from '../firebase/index'
import completeProfileComponent from '../components/complete.completeProfile'
export default {
  name: 'completeProfile.pages',
  components: { container, completeProfileComponent },
  store,
  router,
  data: function () {
    return {
      query: false,
      missingField: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  created () {
    // if exists
    usersCollection.doc(this.getUser.uid).get()
      .then(doc => {
        if (doc.exists) {
          this.missingField = false
          this.$store.dispatch('setUserInfo', doc.data())
          router.push('/')
        } else {
          // doc.data() will be undefined in this case
          this.missingField = true
        }
        this.query = true
      }).catch(function(error) {
        console.log('Error getting document:', error)
      })
    this.query = true
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
    .form {
    }
    .form {
      .welcome {
        color: #000000;
        font-size: 24px;
        text-align: left;
        font-weight: 700;
        margin-bottom: 16px;
        font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      }
      .message {
        color: #707070;
        font-size: 18px;
        text-align: left;
        font-weight: normal;
        margin-bottom: 30px;
        font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      }
    }
    .illustration {
      overflow: hidden;
      max-width: 400px;
    }
    .illustration {
      .login-illustration {
        width: 100%;
      }
    }
  }
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
      .form {
        width: 100%;
        padding: 20px;
      }
      .illustration {
        display: none;
      }
    }
  }
}
</style>