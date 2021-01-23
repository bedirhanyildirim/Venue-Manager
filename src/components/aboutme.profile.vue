<template>
<div id="aboutme">
  <div class="profile-photo">
    <img :src="this.getProfilePhoto"/>
  </div>
  <div class="infos">
    <div class="row name-surname">
      <h3>{{getUserInfo.name}} {{getUserInfo.surname}}</h3>
    </div>
    <div class="row country">
      <svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"><path d="M12,2c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9S16.971,2,12,2z M12,8c0-0.553,0.447-1,1-1s1,0.447,1,1v3   c-0.552,0-1,0.448-1,1s0.448,1,1,1c0.553,0,1-0.448,1-1h1v-2l1,1l-1,1c0,3,0,3-2,4c0-1-1-1-3-1v-2l-2-2V9c-1,0-1,1-1,1L7.439,9.439   L5.787,7.788C6.954,5.541,9.299,4,12,4c0.688,0,1.353,0.104,1.981,0.29C13.895,5.185,13.402,6,12.5,6c-1,0-1.5,1-1.5,2s0,3,0,3   S12,11,12,8z M12,18c-3.859,0-7-3.14-7-7c0-0.776,0.133-1.521,0.367-2.219l1.926,1.926l1,1L10,13.414V15c0,0.552,0.447,1,1,1   c0.779,0,1.651,0,2.006,0.091c0.038,0.301,0.209,0.582,0.468,0.742c0.168,0.104,0.36,0.16,0.552,0.16   c0.145,0,0.289-0.032,0.422-0.098c2.348-1.174,2.539-1.644,2.552-4.479l0.708-0.708c0.391-0.391,0.391-1.023,0-1.414l-1-1   C16.516,9.102,16.26,9,16,9c-0.129,0-0.259,0.025-0.383,0.076C15.244,9.231,15,9.596,15,10V8c0-0.689-0.351-1.298-0.883-1.658   c0.421-0.411,0.712-0.995,0.826-1.685C17.335,5.772,19,8.192,19,11C19,14.86,15.859,18,12,18z"/></g></svg>
      <h3>{{ getUserInfo.province }}, Turkey</h3>
    </div>
    <div class="row email">
      <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19,7H5C3.896,7,3,7.896,3,9v9c0,1.104,0.896,2,2,2h14c1.104,0,2-0.896,2-2V9C21,7.896,20.104,7,19,7z M9.316,14.316  l1.602,1.4c0.305,0.266,0.691,0.398,1.082,0.398s0.777-0.133,1.082-0.398l1.602-1.4l-0.037,0.037l3.646,3.646H5.707l3.646-3.646  L9.316,14.316z M5,17.293V10.54l3.602,3.151L5,17.293z M15.398,13.691L19,10.54v6.75L15.398,13.691z M19,9v0.21l-6.576,5.754  c-0.227,0.198-0.621,0.198-0.848,0L5,9.21V9H19z"/></svg>
      <h3>{{getUserInfo.email}}</h3>
    </div>
    <div class="row phone">
      <svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"><path d="M19.502,3.672l-1.795-1.793C17.141,1.312,16.387,1,15.586,1s-1.555,0.312-2.121,0.879l-1.586,1.586   c-1.17,1.17-1.17,3.072,0,4.242l1.379,1.379l-4.172,4.172l-1.379-1.379C7.141,11.312,6.387,11,5.586,11s-1.555,0.312-2.121,0.879   l-1.586,1.586c-1.17,1.17-1.17,3.072,0,4.242L3.673,19.5c0.465,0.465,1.796,1.545,4.116,1.545c2.764,0,5.694-1.529,8.711-4.545   C22.745,10.254,21.325,5.498,19.502,3.672z M13.293,4.879l1.586-1.586C15.074,3.098,15.33,3,15.586,3s0.512,0.098,0.707,0.293   l1.083,1.082l-3.001,3l-1.082-1.082C12.902,5.902,12.902,5.27,13.293,4.879z M3.293,16.293c-0.391-0.391-0.391-1.023,0-1.414   l1.586-1.586C5.074,13.098,5.33,13,5.586,13s0.512,0.098,0.707,0.293l1.082,1.082l-2.999,3L3.293,16.293z M15.086,15.086   c-3.083,3.082-5.551,3.959-7.297,3.959c-1.349,0-2.267-0.523-2.702-0.959c-0.004-0.004,2.995-3.004,2.995-3.004l0.297,0.297   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.586-5.586c0.391-0.391,0.391-1.023,0-1.414l-0.297-0.297l3.001-3   C19.086,6.086,20.55,9.621,15.086,15.086z"/></g></svg>
      <h3>{{getUserInfo.mobile}}</h3>
    </div>
    <div class="row edit">
      <router-link to="/">Edit profile</router-link>
    </div>
  </div>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import defaultPp from '../assets/images/default-pp.jpg'

export default {
  name: 'aboutme.profile',
  store,
  router,
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    getProfilePhoto () {
      if (this.getUserInfo.profilePhoto) {
        return this.getUserInfo.profilePhoto
      } else {
        return defaultPp
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#aboutme {
  width: 300px;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;

  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}
#aboutme {
  .profile-photo {
  }
  .profile-photo {
    img {
      width: 100%;
      border-bottom: 1px solid #efefef;
    }
  }
  .infos {
    width: 250px;
    text-align: left;
    margin: 32px 0 16px;
    font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  }
  .infos {
    .row {
      display: flex;
      margin: 8px 0;
      align-items: center;
      justify-content: left;
    }
    .row {
      &.name-surname {
        h3 {
          color: #000000;
          font-size: 24px;
          font-weight: 700;
        }
      }
      &.username {
        svg {
          fill: #505050;
          height: 20px;
          width: auto;
        }
        h3 {
          color: #505050;
          font-size: 14px;
          font-weight: 700;
        }
      }
      &.email, &.phone, &.country {
        svg {
          width: auto;
          height: 20px;
          fill: #707070;
          margin-right: 4px;
        }
        h3 {
          color: #707070;
          font-size: 14px;
          font-weight: normal;
        }
      }
      &.country {
        margin-top: 28px;
      }
      &.edit {
        width: 100%;
        cursor: pointer;
        margin-top: 20px;
        font-size: 14px;
        font-weight: 500;
        padding: 11px 15px;
        border-radius: 32px;
        background-color: #f7f7f7;
        transition: background-color 200ms ease-in-out;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        & a {
          width: 100%;
          color: #000000;
          text-align: center;
        }

        &:hover{
          color: #000000;
          background-color: #efefef;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) and (min-width: 425px) {
  #aboutme {
    margin: 0;
    padding: 0;
    width: 100%;
    flex-direction: row;
    justify-content: left;
  }
  #aboutme {
    .profile-photo {
      margin: 0;
      padding: 0;
      width: auto;
      height: 100%;
    }
    .profile-photo {
      img {
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
      }
    }
    .infos {
      margin: 0 0 0 16px;
    }
    .infos {
      .row {
        width: fit-content;
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #aboutme {
    width: 100%;
    flex-direction: column;
  }
  #aboutme {
    .infos {
      margin-top: 16px;
    }
    .row.edit {
        margin-bottom: 24px;
    }
  }
}
</style>