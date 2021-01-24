<template>
<div id="sources">
  <h2 class="title">Places to work</h2>
  <p class="sub-title">Explore some of the best-reviewed places in the Turkey</p>
  <div class="list" v-if="sources.length > 0">
    <div class="el" v-for="el in sources" @click="goToDetail(el.id)">
      <div class="image">
        <img src="../assets/images/source-img-16x9.jpg" :alt="el.data.name">
      </div>
      <div class="title">
        <h5>{{ el.data.name }}</h5>
      </div>
      <div class="specs">
        <h6><svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z"/><path d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z"/><path d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z"/><path d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z"/></g></svg> {{ el.data.capacity }}</h6>
        <h6>{{ el.data.company.region }}, {{ el.data.company.city }}</h6>
      </div>
      <div class="desc">
        <h6>{{ el.data.description }}</h6>
      </div>
    </div>
  </div>
  <div v-else class="error">
    <h3>Kaynak bulunamadı.</h3>
  </div>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import { sourcesCollection } from '../firebase/index'

export default {
  name: 'sources.home',
  router,
  data: function () {
    return {
      sources: []
    }
  },
  mounted() {
    sourcesCollection.where("sharedUsage", "==", true).limit(10).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return
        }
        snapshot.forEach(doc => {
          if (doc.data().company.owner.uid != this.getUserInfo.uid) {
            this.sources.push({id: doc.id, data: doc.data()})
          }
        })
      })
      .catch(err => {
        console.log(err)
        console.log(err.code)
      })
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
  },
  methods: {
    goToDetail: function (id) {
      router.push('/source/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
#sources {
  width: 100%;
  display: flex;
  margin-top: 40px;
  align-items: baseline;
  justify-content: left;
  flex-direction: column;
}
#sources {
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
    margin-top: 24px;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
  }
  .list {
    .el {
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
      .specs {
        width: 100%;
        display: flex;
        margin-top: 4px;
        margin-left: 4px;
        text-wrap: normal;
        align-items: center;
        justify-content: left;
      }
      .specs {
        h6 {
          display: flex;
          align-items: center;
          color: #303030;
          font-size: 10px;
          line-height: 18px;
          text-align: left;
          font-weight: bold;
          margin-right: 12px;
        }
        h6 {
          svg {
            width: 16px;
            height: 16px;
            fill: #303030;
            margin-right: 6px;
          }
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
}
</style>