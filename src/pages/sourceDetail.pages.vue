<template>
<div id="sourceDetail">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">Source detail</h1>
    <div class="content">
      <div class="left">
        <aboutCompany :company="this.source.company"></aboutCompany>
      </div>
      <div class="right">
        <aboutSource :source="this.source" :am-ithe-owner="this.amItheOwner"></aboutSource>
      </div>
    </div>
  </container>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import container from '../components/container'
import aboutSource from '../components/aboutSource.sourceDetail'
import aboutCompany from '../components/aboutCompany.sourceDetail'
import { sourcesCollection, activitiesCollection } from '../firebase/index'
export default {
  name: 'sourceDetail.pages',
  router,
  components: { container, aboutCompany, aboutSource },
  data: function () {
    return {
      sourceId: '',
      source: {
        company: {
          owner: {
            uid: ''
          }
        }
      },
      amItheOwner: false
    }
  },
  created() {
    this.sourceId = this.$route.params.id
    sourcesCollection.doc(this.sourceId).get()
      .then(doc => {
        if (doc.exists) {
          this.source = doc.data()
          this.source.id = this.sourceId
          if (this.source.company.owner.uid == this.getUserInfo.uid) {
            this.amItheOwner = true
          }
        } else {
          router.push('/')
        }
      }).catch(function(error) {
        console.log(error)
        console.log(error.code)
      })
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'loggedIn'
    ])
  },
  methods: {
    fill: function () {
      console.log('clicked')
      activitiesCollection.add({
        date: this.date,
        isValid: 'waiting',
        canceled: false,
        source: this.source,
        resMaker: this.getUserInfo,
        endingHour: this.endingHour,
        startingHour: this.startingHour
      }).then(function (res) {
        console.log('başarılı')
        router.push('/')
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#sourceDetail {
  display: flex;
  align-items: center;
  justify-content: center;
}
#sourceDetail {
  .welcome {
    width: 100%;
    color: #000000;
    font-size: 24px;
    text-align: left;
    font-weight: 700;
    margin: 32px 0 24px;
    font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  }
  .content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .content {
    .left {
      margin-right: 40px;
    }

    .right {
      width: 100%;
    }
  }




  .images {
    width: 100%;
    display: flex;
    margin-top: 25px;
    flex-direction: row;
    justify-content: space-between;
  }
  .images {
    .big {
      width: 708px;
    }
    .small {
      width: 260px;
      display: flex;
      flex-direction: column;
    }
    .small {
      img {
        margin: 0;
        padding: 0;
        width: 260px;
      }
    }
  }
  .sourceInfos {
    width: 100%;
    display: flex;
    margin-top: 25px;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
  .sourceInfos {
    .aboutSource {
      width: 666px;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid #dddddd;
    }
    .aboutSource {
      .header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .header {
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        .capacity {
          display: flex;
          margin-right: 10px;
          flex-direction: row;
          align-items: center;
        }
        .capacity {
          img {
            height: 24px;
            margin-right: 10px;
          }
          h4 {
            color: #707070;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
      .content {
        width: 100%;
      }
      .content {
        .descriptionTitle {
          width: 100%;
          color: #707070;
          display: block;
          font-size: 14px;
          text-align: left;
          margin: 20px 0 10px ;
          font-weight: normal;
        }
        .description {
          width: 100%;
          color: #555555;
          display: block;
          font-size: 16px;
          text-align: left;
          font-weight: normal;
          margin-bottom: 20px;
        }
        .reservation {
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: 40px;
          flex-direction: column;
        }
        .reservation {
          .row {
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            align-items: center;
            justify-content: space-between;
          }
          .row {
            .input-name {
              color: #707070;
              font-size: 16px;
              white-space: nowrap;
              font-weight: normal;
              display: inline-block;
            }
            #date {
              font-family: "Segoe UI";
              font-size: 14px;
              width: 330px;
              padding: 10px 15px;
              border-radius: 5px;
              display: inline-block;
              border: 1px solid #e5e5e5;
            }
            .rangehours {
              width: 360px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .rangehours {
              span {
                width: 10px;
                border-bottom: 2px solid #707070;
              }
              .hour {
                width: 100%;
                cursor: pointer;
                font-size: 14px;
                max-width: 150px;
                padding: 10px 6px;
                border-radius: 5px;
                display: inline-block;
                border: 1px solid #e5e5e5;
              }
            }
            .button {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .button {
              button {
                border: none;
                color: #ffffff;
                display: block;
                font-size: 14px;
                box-shadow: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: normal;
                white-space: nowrap;
                background-color: #272E8A;
              }
              button:hover:enabled {
                cursor: pointer;
              }
              button:disabled {
                background-color: #707070;
              }
              a {
                border: none;
                color: #ffffff;
                display: block;
                font-size: 14px;
                box-shadow: none;
                padding: 10px 46px;
                border-radius: 5px;
                font-weight: normal;
                white-space: nowrap;
                background-color: #272E8A;
              }
            }
          }
        }
      }
    }
    .aboutOwner {
      width: 218px;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid #dddddd;
    }
    .aboutOwner {
      .contactTitle {
        width: 100%;
        color: #707070;
        display: block;
        font-size: 14px;
        text-align: left;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .ownerNameSurname {
        width: 100%;
        color: #555555;
        display: block;
        font-size: 16px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .ownerPhone {
        width: 100%;
        color: #555555;
        display: block;
        font-size: 16px;
        text-align: left;
        font-weight: normal;
        margin-bottom: 10px;
      }
      .address {
        width: 100%;
        color: #555555;
        display: block;
        font-size: 16px;
        text-align: left;
        margin-bottom: 10px;
      }
      .youAreOwner {
        width: 100%;
        color: #551527;
        display: block;
        font-size: 14px;
        text-align: left;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #profile {
    .container {
      .content {
        flex-direction: column;
      }
      .content {
        .left {
          margin: 0;
          width: 100%;
        }
        .right {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>