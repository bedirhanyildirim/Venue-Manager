<template>
<div id="sources">
  <div v-if="sources.length > 0" class="sources-info">
    <div class="row">
      <h3>Sources</h3>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 10 24" style="enable-background:new 0 0 10 24;" xml:space="preserve">
        <path d="M6,16H4c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-2C8,16.9,7.1,16,6,16z M6,20H4v-2h2V20z"/>
        <path d="M6,9H4c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-2C8,9.9,7.1,9,6,9z M6,13H4v-2h2V13z"/>
        <path d="M6,2H4C2.9,2,2,2.9,2,4v2c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2V4C8,2.9,7.1,2,6,2z M6,6H4V4h2V6z"/>
      </svg>
    </div>
    <div class="source-list">
      <div v-for="sour in sources" class="source" @click="goTo(sour.id)">
        <div class="imgandtitle">
          <img src="../assets/images/source-img.jpg" alt="">
          <h3>{{ sour.data.name }}</h3>
        </div>
        <div class="capacity">
          <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,14c2.764,0,5-2.238,5-5s-2.236-5-5-5S7,6.238,7,9S9.236,14,12,14z M12,6c1.654,0,3,1.346,3,3s-1.346,3-3,3   s-3-1.346-3-3S10.346,6,12,6z"/><path d="M20,15c1.381,0,2.5-1.117,2.5-2.5c0-1.381-1.119-2.5-2.5-2.5c-1.382,0-2.5,1.119-2.5,2.5C17.5,13.883,18.618,15,20,15z    M20,11c0.827,0,1.5,0.673,1.5,1.5S20.827,14,20,14s-1.5-0.673-1.5-1.5S19.173,11,20,11z"/><path d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.969C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.589,4,15.589c-2.188,0-3.5,1.091-3.5,2.183c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.09-0.04,0.18-0.04,0.27c0,1,2.405,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.021-0.255   c0.463,0.073,0.996,0.118,1.604,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z M4,17.863   c-1.309,0-2.068-0.207-2.417-0.354C1.822,17.104,2.586,16.589,4,16.589c1.107,0,1.837,0.351,2.208,0.706   c-0.084,0.114-0.169,0.227-0.235,0.344C5.521,17.758,4.865,17.863,4,17.863z M12,19c-2.163,0-3.501-0.312-4.184-0.561   C8.337,17.761,9.734,17,12,17c2.169,0,3.59,0.761,4.148,1.425C15.393,18.695,13.986,19,12,19z M20,17.863   c-0.914,0-1.546-0.103-1.973-0.213c-0.072-0.127-0.155-0.252-0.248-0.375C18.135,16.93,18.85,16.59,20,16.59   c1.324,0,2.141,0.501,2.404,0.911C22.014,17.664,21.199,17.863,20,17.863z"/><path d="M4,15c1.381,0,2.5-1.119,2.5-2.5C6.5,11.121,5.381,10,4,10c-1.382,0-2.5,1.121-2.5,2.5C1.5,13.881,2.618,15,4,15z M4,11   c0.827,0,1.5,0.673,1.5,1.5S4.827,14,4,14s-1.5-0.673-1.5-1.5S3.173,11,4,11z"/></g></svg>
          <h3>{{ sour.data.capacity }}</h3>
        </div>
      </div>
    </div>
    <div class="row button">
      <router-link to="/create-source" class="create-source-button">Create source</router-link>
    </div>
  </div>
  <div v-if="sources.length == 0" class="no-source">
    <h3>Add your company <span style="color: #272E8A; font-weight: bold">sources</span>,<br>Start to manage <span style="color: #272E8A; font-weight: 500">them</span>!</h3>
    <router-link to="/create-source" class="create-source-button">Create source</router-link>
  </div>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import { sourcesCollection } from '../firebase/index'
export default {
  name: 'sources.manageCompany',
  router,
  computed: {
    ...mapGetters([
      'getCompany'
    ])
  },
  data: function () {
    return {
      sources: []
    }
  },
  mounted() {
    sourcesCollection.where("company.name", "==", this.getCompany.name).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        snapshot.forEach(doc => {
          this.sources.push({id: doc.id, data: doc.data()})
        })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
  },
  methods: {
    goTo: function (id) {
      router.push('/source/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
#sources {
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
#sources {
  .sources-info {
    width: 100%;
  }
  .sources-info {
    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.button {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .create-source-button {
          color: #000000;
          font-size: 14px;
          margin-top: 16px;
          font-weight: 500;
          border-radius: 32px;
          padding: 11px 60px;
          background-color: #ffffff;
          transition: background-color 200ms ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .create-source-button:hover {
          background-color: #f7f7f7;
        }
      }

      h3 {
        color: #707070;
        font-size: 16px;
        text-align: left;
        font-weight: 500;
        line-height: initial;
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
    .source-list {
      margin: 20px 0 0 0;
    }
    .source-list {
      .source {
        width: 100%;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        transition: background-color 300ms ease;
      }
      .source:nth-child(even) {
        background-color: #fafafa;
      }
      .source:last-child {
        margin-bottom: 0;
      }
      .source:hover {
        cursor: pointer;
        background-color: #f7f7f7;

        .capacity {
          svg {
            fill: #000000;
          }
          h3 {
            color: #000000;
          }
        }
      }
      .source {
        .imgandtitle {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        .imgandtitle {
          img {
            width: auto;
            height: 60px;
            margin-right: 20px;
          }
          h3 {
            color: #000000;
            font-size: 16px;
            font-weight: 500;
          }
        }
        .capacity {
          display: flex;
          margin-right: 10px;
          flex-direction: row;
          align-items: center;
          transition: all 300ms ease;
        }
        .capacity {
          svg {
            fill: #505050;
            height: 24px;
            margin-right: 10px;
          }
          h3 {
            color: #505050;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .no-source {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h3 {
      color: #000000;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      font-weight: normal;
    }
    .create-source-button {
      color: #000000;
      font-size: 14px;
      margin-top: 16px;
      font-weight: 500;
      border-radius: 32px;
      padding: 11px 60px;
      background-color: #ffffff;
      transition: background-color 200ms ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .create-source-button:hover {
      background-color: #f7f7f7;
    }
  }
}
</style>