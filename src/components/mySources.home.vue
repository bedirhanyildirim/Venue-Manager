<template>
  <div id="mySources">
    <h2 class="title">My Sources</h2>
    <p class="sub-title">Manage your sources of your company</p>
    <div class="list" v-if="sources.length > 0">
      <div class="el" v-for="el in sources" @click="goToSource(el.id)">
        <div class="image">
          <img src="../assets/images/source-img-16x9.jpg" :alt="el.data.name" />
        </div>
        <div class="title">
          <h5>{{ el.data.name }}</h5>
        </div>
        <div class="desc">
          <h6>{{ el.data.description }}</h6>
        </div>
      </div>
    </div>
    <div class="error" v-if="loggedIn && sources.length == 0">
      <h3>You dont have any source</h3>
    </div>
    <div class="error" v-if="!loggedIn">
      <router-link to="/membership/signup">Click here to sing up!</router-link>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import router from '@/router'
import { mapGetters } from 'vuex'
import { sourcesCollection } from '@/firebase'

export default {
  name: 'mySources.home.vue',
  store,
  router,
  data: function () {
    return {
      sources: [],
      noSource: false
    }
  },
  created() {
    if (this.loggedIn) {
      sourcesCollection.where("company.owner.uid", "==", this.getUserInfo.uid).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.')
          this.noSource = true
          return
        }
        snapshot.forEach(doc => {
          this.sources.push({id: doc.id, data: doc.data()})
        })
      })
      .catch(err => {
        console.log(err)
        console.log(err.code)
      })
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
      'getUserInfo'
    ])
  },
  methods: {
    goToSource: function (sourceId) {
      router.push('/my-source/'+sourceId)
    }
  }
}
</script>
<style lang="scss" scoped>
#mySources {
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;
}
#mySources {
  .title {
    width: 100%;
    text-align: left;
    margin-bottom: 12px;
    font-size: 24px;
  }
  .sub-title {
    width: 100%;
    text-align: left;
    font-weight: 300;
    font-size: 16px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin-top: 12px;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
  }
  .list {
    .el {
      margin-top: 12px;
      width: 180px;
      cursor: pointer;
      overflow: hidden;
      margin-right: 24px;
    }
    .el {
      .image {
        width: fit-content;
        height: fit-content;
      }
      .image {
        img {
          width: 100%;
          display: block;
          cursor: pointer;
          border-radius: 8px;
          transition: opacity 100ms ease;
        }
        img:hover {
          opacity: .8;
        }
      }
      .title {
        width: 100%;
        margin-top: 16px;
        text-wrap: normal;
        margin-bottom: 0px;
      }
      .title {
        h5 {
          color: #000000;
          font-size: 16px;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          max-height: 17px;
          line-height: 16px;
          font-weight: normal;
          display: inline-block;
          text-overflow: ellipsis;
          transition: all 100ms ease;
        }
        h5::after {
          content: '';
          width: 0px;
          height: 1px;
          display: block;
          background: black;
          transition: 300ms;
        }
        h5:hover::after {
          width: 100%;
        }
      }
      .desc {
        width: 100%;
        padding: 4px;
      }
      .desc {
        h6 {
          width: 100%;
          color: #303030;
          font-size: 12px;
          overflow: hidden;
          text-align: left;
          max-height: 50px;
          line-height: 18px;
          font-weight: lighter;
          text-overflow: ellipsis;
        }
      }
    }
    .el:last-child {
      margin-right: 0;
    }
  }
  .error {
    width: 100%;
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    a {
      color: #272E8A;
      font-size: 16px;
      text-align: left;
      line-height: 16px;
      font-weight: bold;
    }
  }
}
</style>