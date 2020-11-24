<template>
  <div class="dropdown" v-on-clickaway="away">
    <div class="display" @click="toggleShow">
      <span v-if="!loggedIn || !getUserInfo">Log in</span>
      <span v-if="loggedIn && !!getUserInfo">{{getUserInfo.name}}</span>
      <img src="../assets/icons/user-icon.png" alt="">
    </div>
    <div class="dropdownMenu" v-if="showMenu">
      <div class="modal"></div>
      <div class="content" @click="itemClicked" v-on-clickaway="away">
        <router-link v-if="!loggedIn" to="/membership/signup"><span class="item" style="font-weight: bold">Sign up</span></router-link>
        <router-link v-if="!loggedIn" to="/membership/login"><span class="item">Log in</span></router-link>
        <router-link v-if="loggedIn" to="/profile"><span class="item">Profile</span></router-link>
        <router-link v-if="loggedIn" to="/my-reservations"><span class="item">My reservations</span></router-link>
        <a v-if="loggedIn" href="javascript:;" @click="logout"><span class="item">Log out</span></a>
        <span class="divider"></span>
        <router-link to="/membership/signup"><span class="item">Host your office</span></router-link>
        <router-link to="/membership/signup"><span class="item">Manage your company</span></router-link>
        <router-link to="/"><span class="item">Help</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'
import router from "@/router"
import store from "@/store"
import firebase from "firebase/app"
import 'firebase/auth'
export default {
  name: "dropdown.header.vue",
  store,
  router,
  mixins: [ clickaway ],
  data: function () {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getUserInfo',
      'loggedIn'
    ])
  },
  methods: {
    toggleShow: function () {
      this.showMenu = !this.showMenu
      if (this.showMenu) {
        document.body.style.position = 'fixed'
      } else {
        document.body.style.position = ''
      }
    },
    itemClicked: function () {
      this.toggleShow();
    },
    away: function () {
      this.showMenu = false
      document.body.style.position = ''
    },
    logout: function () {
      firebase.auth().signOut().catch(function (err) {
        console.log(err)
      }).then(_ => {
        this.$store.dispatch('logOut')
        router.push('/membership/login');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
}
.dropdown {
  .display {
    display: flex;
    align-items: center;
    border-radius: 32px;
    box-sizing: border-box;
    justify-content: center;
    border: 1px solid #dddddd;
    transition: box-shadow 300ms ease-in-out;
  }
  .display {
    span {
      color: #000000;
      font-size: 14px;
      margin-left: 16px;
      margin-right: 8px;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    img {
      width: 28px;
      margin: 6px;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.18);
      -moz-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.18);
      -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.18);
    }
  }
  .dropdownMenu {
    right: 0;
    display: block;
    margin-top: 16px;
    position: absolute;
    border-radius: 16px;
    background-color: #ffffff;

    box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.16);
    -webkit-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.16);
  }
  .dropdownMenu {
    .modal {
      display: none;
    }
    .content{
      margin: 14px 0;
      display: flex;
      font-size: 14px;
      text-align: left;
      flex-direction: column;
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .content{
      .item {
        height: 40px;
        width: 240px;
        display: flex;
        color: #000000;
        padding-left: 16px;
        align-items: center;
        transition: background-color 200ms ease-in-out;
      }
      .item:hover {
        cursor: pointer;
        background-color: #f7f7f7;
      }
      .divider {
        border-bottom: 1px solid #dddddd;
        margin: 8px 0;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .dropdown {
    position: unset;
  }
  .dropdown {
    .display {
    }
    .dropdownMenu {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      position: absolute;
      background-color: transparent;
    }
    .dropdownMenu {
      .modal {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        z-index: 1;
        display: block;
        position: absolute;
        background-color: rgba(0,0,0, .5);
      }
      .content {
        top: 50%;
        right: 0;
        left: 50%;
        bottom: 0;
        z-index: 2;
        padding: 14px 0;
        position: absolute;
        border-radius: 16px;
        height: fit-content;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.25);
        -webkit-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.25);
      }
      .content {
        a {
        }
        a {
          .item {
            width: 100%;
            height: 60px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 425px){
  .dropdown {
    .dropdownMenu {
      .content {
        width: fit-content;
      }
      .content {
        a {
          width: fit-content;
        }
        a {
          .item {
            width: 250px;
          }
        }
      }
    }
  }
}
</style>