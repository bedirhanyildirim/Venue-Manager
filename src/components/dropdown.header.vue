<template>
  <div class="dropdown" v-on-clickaway="away">
    <div class="display" @click="toggleShow">
      <span>Log in</span>
      <img src="../assets/icons/user-icon.png" alt="">
    </div>
    <div class="dropdown" v-if="showMenu">
      <div class="content" @click="itemClicked">
        <router-link to="/membership"><span class="item" style="font-weight: bold">Sign up</span></router-link>
        <span class="item">Log in</span>
        <span class="divider"></span>
        <span class="item">Host your office</span>
        <span class="item">Host an experience</span>
        <span class="item">Help</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: "dropdown.header.vue",
  mixins: [ clickaway ],
  data: function () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleShow: function () {
      this.showMenu = !this.showMenu;
    },
    itemClicked: function () {
      this.toggleShow();
    },
    away: function () {
      this.showMenu = false
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
  .dropdown {
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
  .dropdown {
    .content{
      margin: 8px 0;
      display: flex;
      text-align: left;
      font-size: 14px;
      flex-direction: column;
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
</style>