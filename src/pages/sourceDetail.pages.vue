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
}
@media screen and (max-width: 768px) {
  #sourceDetail {
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