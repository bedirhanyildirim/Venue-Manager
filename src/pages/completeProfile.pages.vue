<template>
<div id="completeProfile">
  <container display="flex">
    <div class="wrapper">
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
import container from '../components/container'
import completeProfileComponent from '../components/complete.completeProfile'
import { mapGetters } from 'vuex'
import { usersCollection } from '../firebase/index'
export default {
  name: "completeProfile.pages",
  components: { container, completeProfileComponent },
  store,
  router,
  data: function () {
    return {
      name: '',
      surname: '',
      mobile: '',
      email: ''
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
          console.log("Document data:", doc.data())
          this.$store.dispatch('setUserInfo', doc.data())
          router.push("/")
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!")
        }
      }).catch(function(error) {
        console.log("Error getting document:", error)
      })
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },
  methods: {
    resize: function () {
      let h = document.documentElement.clientHeight;
      let el = document.getElementsByClassName('wrapper')[0]
      if (h > (el.offsetHeight + (document.getElementById('header').offsetHeight) + (document.getElementById('footer').offsetHeight))) {
        let newHeight = h - (document.getElementById('header').offsetHeight) - (document.getElementById('footer').offsetHeight)
        el.style.height = newHeight + 'px'
      } else {
        el.style.height = ''
      }
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
      .forms {
      }
      .illustration {
        display: none;
      }
    }
  }
}
</style>