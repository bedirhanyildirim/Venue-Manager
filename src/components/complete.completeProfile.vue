<template>
<div id="complete">
  <div class="row">
    <label for="username" class="input-name">Username</label>
    <input id="username" type="text" v-model="username" name="username" disabled/>
  </div>
  <div class="row">
    <label for="email" class="input-name">Email Address</label>
    <input id="email" type="text" v-model="email" name="email" disabled/>
  </div>
  <div class="row">
    <label for="name" class="input-name">Name</label>
    <input id="name" type="text" v-model="name" name="name"/>
  </div>
  <div class="row">
    <label for="surname" class="input-name">Surname</label>
    <input id="surname" type="text" v-model="surname" name="surname"/>
  </div>
  <div class="row">
    <label for="mobile" class="input-name">Phone Number</label>
    <!--input id="mobile" type="tel" v-model="mobile" name="mobile"/-->
    <the-mask id="mobile" v-model="mobile" name="mobile" mask="0### ### ## ##" value="" type="tel" masked placeholder="05XX XXX XX XX"></the-mask>
  </div>
  <div class="row">
    <label for="province" class="input-name">Province</label>
    <input id="province" type="text" v-model="province" name="province"/>
  </div>
  <div class="row" style="justify-content: center; margin-bottom: 0;">
    <button class="button" @click="fill">Save</button>
  </div>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import {TheMask} from 'vue-the-mask'
import { usersCollection } from '../firebase/index'
export default {
  name: "complete.completeProfile",
  store,
  router,
  components: { TheMask },
  data: function () {
    return {
      name: '',
      surname: '',
      mobile: '',
      email: '',
      username: '',
      province: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'loggedIn',
      'getUserInfo'
    ])
  },
  created () {
    this.email = this.getUser.email
    this.username = this.email.split('@')[0]
  },
  methods: {
    fill: function () {
      usersCollection.doc(this.getUser.uid).set({
        uid: this.getUser.uid,
        email: this.getUser.email,
        username: this.username,
        name: this.name,
        surname: this.surname,
        mobile: this.mobile,
        province: this.province
      }).then(res => {
        console.log("Başarılı: " + res)
        this.$store.dispatch('setUserInfo', {
          uid: this.getUser.uid,
          email: this.getUser.email,
          username: this.username,
          name: this.name,
          surname: this.surname,
          mobile: this.mobile,
          province: this.province
        })
        router.push("/")
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#complete {
  .row {
    display: flex;
    margin-bottom: 20px;
    align-items: baseline;
    flex-direction: column;
    justify-content: center;
  }
  .row {
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
      min-width: 400px;
      appearance: none;
      font-weight: 400;
      line-height: 24px;
      padding: 10px 16px;
      border-radius: 8px;
      display: inline-block;
      box-sizing: border-box;
      background-color: #f3f3f4;
      transition: all 200ms ease;
      border: 1px solid transparent;
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
    input:disabled {
      cursor: not-allowed;
      background-color: #f7f7f7;
    }
    input:disabled:hover {
      box-shadow: none;
      border-color: #f7f7f7;
      background-color: #f7f7f7;
    }
    input:disabled:focus {
      border: none!important;
      box-shadow: none!important;
      background-color: #f7f7f7!important;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
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
}
@media screen and (min-width: 425px) and (max-width: 768px) {
  #complete {
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
  #complete {
    .row {
      input {
        width: 250px;
        min-width: unset;
        max-width: unset;
        box-sizing: border-box;
      }
      .button {
        width: 250px;
        min-width: unset;
        max-width: unset;
      }
    }
  }
}
</style>