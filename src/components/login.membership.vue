<template>
<div id="login">
  <div class="row">
    <div class="googleButton" @click="signupWithGoogle">
      Log in with Google
    </div>
  </div>
  <hr class="orDivider"/>
  <div class="row">
    <label for="signin-email" class="input-name">Username or Email Address</label>
    <input id="signin-email" type="text" v-model="email" name="email"/>
  </div>
  <div class="row">
    <label for="password" class="input-name">Password</label>
    <input id="password" type="password" v-model="password" name="password"/>
  </div>
  <div class="row" style="justify-content: center">
      <button class="button" @click="login">Log in</button>
  </div>
  <div class="signup">
    <span>Don't you have an account?</span>
    <router-link to="/membership/signup">Sign up</router-link>
  </div>
</div>
</template>

<script>
import 'firebase/auth'
import store from '../store'
import router from '../router'
import firebase from 'firebase/app'
import { companiesCollection } from '../firebase/index'
export default {
  name: 'login.membership',
  store,
  router,
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  mounted: function () {
    document.querySelector('input[name=email]').focus()
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(err => {
          console.log(err)
          console.log(err.code)
        })
        .then(res => {
          if (res) {
            this.$store.dispatch('setUser', res.user)
            companiesCollection.doc(res.user.uid).get()
              .then(doc => {
                if (doc.exists) {
                  this.$store.dispatch('setCompany', doc.data())
                }
              })
            router.push('/complete-profile')
          }
        })
    },
    signup: function () {
      this.$emit('goToSignup')
    },
    signupWithGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().languageCode = 'en'
      firebase.auth().signInWithPopup(provider)
          .then((result) => {
            this.$store.dispatch('setUser', result.user)
            router.push('/complete-profile')
          }).catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orDivider {
  padding: 0;
  border: none;
  color: #6e6d7a;
  margin-top: 30px;
  margin-bottom: 0;
  overflow: visible;
  text-align: center;
  border-top: 1px solid #e0e0e0;

  &:after {
    top: -10px;
    content: 'Or';
    padding: 0 16px;
    background: #fff;
    position: relative;
    display: inline-block;
    font: normal 14px/14px "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
}
#login {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}
#login {
  .row {
    display: flex;
    margin-bottom: 20px;
    align-items: baseline;
    flex-direction: column;
    justify-content: center;
  }
  .row {
    .googleButton {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 14px;
      min-width: 400px;
      font-weight: 500;
      padding: 10px 16px;
      line-height: 20px;
      text-align: center;
      border-radius: 8px;
      text-decoration: none;
      box-sizing: border-box;
      background-color: #4285f4;
      font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .input-name {
      color: #000000;
      display: block;
      font-size: 16px;
      font-weight: 700;
      margin: 14px 0 4px;
    }
    input {
      width: 100%;
      height: 40px;
      outline: none;
      color: #000000;
      font-size: 14px;
      appearance: none;
      font-weight: 400;
      line-height: 24px;
      padding: 10px 16px;
      border-radius: 8px;
      display: inline-block;
      box-sizing: border-box;
      background-color: #f3f3f4;
      border: 1px solid transparent;
      transition: all 200ms ease;
    }
    input:hover {
      background-color: #ffffff;
      border-color: rgba(0,0,0,0.1);
      box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
    }
    input:focus {
      background-color: #ffffff;
      border-color: rgba(39,46,138,0.4);
      box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
    }
    button {
      height: 40px;
      border: none;
      outline: none;
      color: #ffffff;
      display: block;
      cursor: pointer;
      font-size: 14px;
      max-width: 200px;
      box-shadow: none;
      appearance: none;
      line-height: 20px;
      position: relative;
      padding: 10px 16px;
      text-align: center;
      border-radius: 8px;
      font-weight: normal;
      text-decoration: none;
      box-sizing: border-box;
      background-color: #272E8A;
      transition: all 200ms ease;
    }
    button:hover:enabled {
      cursor: pointer;
      background-color: #2e39c4;
    }
    .button {
      width: 100%;
    }
  }
  .signup {
    display: flex;
    margin-top: 30px;
    align-items: center;
    justify-content: left;
  }
  .signup {
    span {
      color: #000000;
      font-size: 14px;
      margin-right: 10px;
    }
    a {
      color: #272E8A;
      font-weight: bold;
      &:hover {
        color: #2e39c4;
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
@media screen and (min-width: 425px) and (max-width: 768px) {
  #login {
    .row {
      .googleButton {
      }
      .input-name {
      }
      input {
      }
      .button {
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #login {
    .row {
      .googleButton {
        width: 100%;
        min-width: unset;
        max-width: unset;
      }
      .input-name {
      }
      input {
        width: 100%;
        min-width: unset;
        max-width: unset;
        box-sizing: border-box;
      }
      .button {
        width: 100%;
        min-width: unset;
        max-width: unset;
      }
    }
  }
}
</style>