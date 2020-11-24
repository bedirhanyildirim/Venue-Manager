<template>
<div id="aboutcompany">
  <div v-if="isThereCompany" class="company-info">
    <div class="row">
      <h3>About company</h3>
      <!--router-link to="/">Edit company</router-link-->
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 10 24" style="enable-background:new 0 0 10 24;" xml:space="preserve">
        <path d="M6,16H4c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-2C8,16.9,7.1,16,6,16z M6,20H4v-2h2V20z"/>
        <path d="M6,9H4c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-2C8,9.9,7.1,9,6,9z M6,13H4v-2h2V13z"/>
        <path d="M6,2H4C2.9,2,2,2.9,2,4v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2V4C8,2.9,7.1,2,6,2z M6,6H4V4h2V6z"/>
      </svg>
    </div>
    <div class="company">
      <img src="../assets/images/company-img.png" alt="company logo">
      <div class="infos">
        <div class="row company-name">
          <h3>{{ company.name }}</h3>
        </div>
        <div class="row working-hours">
          <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M16,13c0-0.55-0.45-1-1-1h-3c-0.55,0-1,0.45-1,1s0.45,1,1,1h3C15.55,14,16,13.55,16,13z"/></g><g><path d="M12,6c3.859,0,7,3.141,7,7s-3.141,7-7,7s-7-3.141-7-7S8.141,6,12,6 M12,4c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9   S16.971,4,12,4z"/></g><g><path d="M13,10c0-0.55-0.45-1-1-1s-1,0.45-1,1v3c0,0.55,0.45,1,1,1s1-0.45,1-1V10z"/></g><g><path d="M12,8c2.757,0,5,2.243,5,5s-2.243,5-5,5s-5-2.243-5-5S9.243,8,12,8 M12,7c-3.312,0-6,2.686-6,6c0,3.312,2.688,6,6,6   s6-2.688,6-6C18,9.686,15.312,7,12,7z"/></g></svg>
          <h3>{{ company.startingHour }}:00 - {{ company.endingHour }}:00 ({{ company.workingDays }})</h3>
        </div>
        <div class="row phone">
          <svg baseProfile="tiny" height="24px" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Layer_1"><path d="M19.502,3.672l-1.795-1.793C17.141,1.312,16.387,1,15.586,1s-1.555,0.312-2.121,0.879l-1.586,1.586   c-1.17,1.17-1.17,3.072,0,4.242l1.379,1.379l-4.172,4.172l-1.379-1.379C7.141,11.312,6.387,11,5.586,11s-1.555,0.312-2.121,0.879   l-1.586,1.586c-1.17,1.17-1.17,3.072,0,4.242L3.673,19.5c0.465,0.465,1.796,1.545,4.116,1.545c2.764,0,5.694-1.529,8.711-4.545   C22.745,10.254,21.325,5.498,19.502,3.672z M13.293,4.879l1.586-1.586C15.074,3.098,15.33,3,15.586,3s0.512,0.098,0.707,0.293   l1.083,1.082l-3.001,3l-1.082-1.082C12.902,5.902,12.902,5.27,13.293,4.879z M3.293,16.293c-0.391-0.391-0.391-1.023,0-1.414   l1.586-1.586C5.074,13.098,5.33,13,5.586,13s0.512,0.098,0.707,0.293l1.082,1.082l-2.999,3L3.293,16.293z M15.086,15.086   c-3.083,3.082-5.551,3.959-7.297,3.959c-1.349,0-2.267-0.523-2.702-0.959c-0.004-0.004,2.995-3.004,2.995-3.004l0.297,0.297   c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l5.586-5.586c0.391-0.391,0.391-1.023,0-1.414l-0.297-0.297l3.001-3   C19.086,6.086,20.55,9.621,15.086,15.086z"/></g></svg>
          <h3>{{ company.phone }}</h3>
        </div>
        <div class="row company-address">
          <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,5c1.609,0,3.12,0.614,4.254,1.73C17.38,7.837,18,9.309,18,10.87s-0.62,3.03-1.745,4.139L12,19.193l-4.254-4.186   c-1.125-1.107-1.745-2.576-1.745-4.139s0.62-3.032,1.745-4.141C8.881,5.614,10.393,5,12,5 M12,3C9.953,3,7.904,3.768,6.343,5.305   c-3.124,3.074-3.124,8.057,0,11.131L12,21.999l5.657-5.565c3.124-3.072,3.124-8.056,0-11.129C16.096,3.768,14.048,3,12,3z"/></g><g><path d="M12,8.499c0.668,0,1.296,0.26,1.768,0.731c0.976,0.976,0.976,2.562,0,3.537c-0.473,0.472-1.1,0.731-1.768,0.731   s-1.295-0.26-1.768-0.731c-0.976-0.976-0.976-2.562,0-3.537C10.705,8.759,11.333,8.499,12,8.499 M12,7.499   c-0.896,0-1.792,0.342-2.475,1.024c-1.367,1.367-1.367,3.584,0,4.951c0.684,0.684,1.578,1.024,2.475,1.024s1.792-0.342,2.475-1.024   c1.366-1.367,1.366-3.584,0-4.951C13.792,7.84,12.896,7.499,12,7.499z"/></g></svg>
          <h3>{{ company.address }} - {{ company.city }}, Turkey</h3>
        </div>
      </div>
    </div>
    <!--Sources v-if="isThereCompany" :company="this.company"></Sources-->
    <!--Activities v-if="isThereCompany" :company="this.company"></Activities-->
  </div>
  <div v-if="!isThereCompany" class="no-company">
    <h3>Create your <span style="color: #272E8A; font-weight: 500">company</span> profile,<br>Start to manage your <span style="color: #272E8A; font-weight: bold">business</span>!</h3>
    <router-link to="/create-company" class="create-company-button">Create company</router-link>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { companiesCollection } from '../firebase/index'
import Sources from '../components/sources.profile'
import Activities from '../components/activities.profile'
export default {
  name: "aboutcompany.profile",
  components: { Sources, Activities },
  data: function () {
    return {
      isThereCompany: false,
      company: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  mounted() {
    // if exists
    companiesCollection.doc(this.getUserInfo.uid).get()
      .then(doc => {
        if (doc.exists) {
          this.company = doc.data()
          // true
          this.isThereCompany = false
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!")
          this.isThereCompany = false
        }
      }).catch(function(error) {
        console.log("Error getting document:", error)
      })
  }
}
</script>

<style lang="scss" scoped>
#aboutcompany {
  width: 100%;
  padding: 20px;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}
#aboutcompany {
  .company-info {
    width: 100%;
  }
  .company-info {
    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        color: #707070;
        font-size: 16px;
        text-align: left;
        font-weight: 500;
        display: inline-block;
      }
      svg {
        width: auto;
        height: 20px;
        fill: #505050;
        cursor: pointer;
        padding: 0 8px;
        transition: fill 200ms ease;
      }
      svg:hover {
        fill: #000000;
      }
    }
    .company {
      margin: 20px 0 0 0;
    }
    .company {
      width: 100%;
      display: flex;
      text-align: left;
      align-items: end;
      flex-direction: row;
      justify-content: flex-start;
    }
    .company {
      img {
        width: 120px;
        height: 120px;
        margin-right: 20px;
      }
      .infos {
        margin-top: 4px;
      }
      .infos {
        .row {
          width: 100%;
          margin: 4px 0;
          display: flex;
          align-items: center;
          justify-content: left;
        }
        .row:first-child {
          margin-top: 0;
        }
        .row:last-child {
          margin-bottom: 0;
        }
        .row {
          svg {
            padding: 0;
            width: auto;
            cursor: auto;
            height: 20px;
            fill: #505050;
            margin-right: 4px;
          }
          h3 {
            color: #505050;
            font-size: 14px;
            font-weight: normal;
          }
          &.company-name {
            margin-bottom: 10px;

            h3 {
              color: #000000;
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .no-company {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h3 {
      color: #000000;
      font-size: 20px;
      text-align: center;
      font-weight: normal;
      line-height: 24px;
    }
    .create-company-button {
      color: #000000;
      font-size: 14px;
      margin-top: 24px;
      font-weight: 500;
      border-radius: 32px;
      padding: 11px 60px;
      background-color: #ffffff;
      transition: background-color 200ms ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .create-company-button:hover {
      background-color: #f7f7f7;
    }
  }
}
</style>