<template>
<div id="aboutCompany">
  <div class="company-logo">
    <img src="../assets/images/company-img.png" height="256" width="256" alt="company logo">
  </div>
  <div class="infos">
    <div class="row company-name">
      <h3>{{ getCompany.name }}</h3>
    </div>
    <div class="row working-hours">
      <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M16,13c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1s0.45,1,1,1h3C15.55,14,16,13.55,16,13z"/></g><g><path d="M12,6c3.859,0,7,3.141,7,7s-3.141,7-7,7s-7-3.141-7-7S8.141,6,12,6 M12,4c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9   S16.971,4,12,4z"/></g><g><path d="M13,10c0-0.55-0.45-1-1-1s-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V10z"/></g><g><path d="M12,8c2.757,0,5,2.243,5,5s-2.243,5-5,5s-5-2.243-5-5S9.243,8,12,8 M12,7c-3.312,0-6,2.686-6,6c0,3.312,2.688,6,6,6   s6-2.688,6-6C18,9.686,15.312,7,12,7z"/></g></svg>
      <h3>{{ getCompany.startingHour }}:00 - {{ getCompany.endingHour }}:00 ({{ getCompany.workingDays }})</h3>
    </div>
    <div class="row phone">
      <svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"><path d="M19.502,3.672l-1.795-1.793C17.141,1.312,16.387,1,15.586,1s-1.555,0.312-2.121,0.879l-1.586,1.586   c-1.17,1.17-1.17,3.072,0,4.242l1.379,1.379l-4.172,4.172l-1.379-1.379C7.141,11.312,6.387,11,5.586,11s-1.555,0.312-2.121,0.879   l-1.586,1.586c-1.17,1.17-1.17,3.072,0,4.242L3.673,19.5c0.465,0.465,1.796,1.545,4.116,1.545c2.764,0,5.694-1.529,8.711-4.545   C22.745,10.254,21.325,5.498,19.502,3.672z M13.293,4.879l1.586-1.586C15.074,3.098,15.33,3,15.586,3s0.512,0.098,0.707,0.293   l1.083,1.082l-3.001,3l-1.082-1.082C12.902,5.902,12.902,5.27,13.293,4.879z M3.293,16.293c-0.391-0.391-0.391-1.023,0-1.414   l1.586-1.586C5.074,13.098,5.33,13,5.586,13s0.512,0.098,0.707,0.293l1.082,1.082l-2.999,3L3.293,16.293z M15.086,15.086   c-3.083,3.082-5.551,3.959-7.297,3.959c-1.349,0-2.267-0.523-2.702-0.959c-0.004-0.004,2.995-3.004,2.995-3.004l0.297,0.297   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.586-5.586c0.391-0.391,0.391-1.023,0-1.414l-0.297-0.297l3.001-3   C19.086,6.086,20.55,9.621,15.086,15.086z"/></g></svg>
      <h3>{{ getCompany.phone }}</h3>
    </div>
    <div class="row company-address">
      <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,5c1.609,0,3.12,0.614,4.254,1.73C17.38,7.837,18,9.309,18,10.87s-0.62,3.03-1.745,4.139L12,19.193l-4.254-4.186   c-1.125-1.107-1.745-2.576-1.745-4.139s0.62-3.032,1.745-4.141C8.881,5.614,10.393,5,12,5 M12,3C9.953,3,7.904,3.768,6.343,5.305   c-3.124,3.074-3.124,8.057,0,11.131L12,21.999l5.657-5.565c3.124-3.072,3.124-8.056,0-11.129C16.096,3.768,14.048,3,12,3z"/></g><g><path d="M12,8.499c0.668,0,1.296,0.26,1.768,0.731c0.976,0.976,0.976,2.562,0,3.537c-0.473,0.472-1.1,0.731-1.768,0.731   s-1.295-0.26-1.768-0.731c-0.976-0.976-0.976-2.562,0-3.537C10.705,8.759,11.333,8.499,12,8.499 M12,7.499   c-0.896,0-1.792,0.342-2.475,1.024c-1.367,1.367-1.367,3.584,0,4.951c0.684,0.684,1.578,1.024,2.475,1.024s1.792-0.342,2.475-1.024   c1.366-1.367,1.366-3.584,0-4.951C13.792,7.84,12.896,7.499,12,7.499z"/></g></svg>
      <h3>{{ getCompany.address }} {{ capitalizeFirstLetter(getCompany.neighborhood) }} {{ capitalizeFirstLetter(getCompany.province) }}  {{getCompany.postalcode}} {{ getCompany.city }}, Turkey</h3>
    </div>
    <div class="row edit">
      <router-link to="/">Edit company</router-link>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'aboutCompany.manageCompany.vue',
  computed: {
    ...mapGetters([
      'getCompany'
    ])
  },
  methods: {
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
}
</script>

<style lang="scss" scoped>
#aboutCompany {
  width: 100%;
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
#aboutCompany {
  .company-logo {
    width: 300px;
    height: 300px;
  }
  .company-logo {
    img {
      object-fit: cover;
      width: 100% !important;
      height: 100% !important;
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
      width: 100%;
      margin: 8px 0;
      display: flex;
      justify-content: left;
      align-items: flex-start;
    }
    .row {
      h3 {
        width: 100%;
        color: #707070;
        font-size: 14px;
        text-align: left;
        font-weight: normal;
        display: inline-block;
      }
      svg {
        width: 24px;
        height: auto;
        fill: #707070;
        margin-right: 4px;
        transition: fill 200ms ease;
      }
      &.company-name {
        h3 {
          color: #000000;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
      }
      &.edit {
        width: 100%;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        margin-top: 20px;
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
</style>