<template>
<div id="manageSource">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">Manage source</h1>
    <div class="content">
      <div class="left">
        <aboutSource :source-object="this.sourceObject"></aboutSource>
        <sourceReservation :source-object="this.sourceObject" style="margin-top: 16px"></sourceReservation>
      </div>
      <div class="right">
        <sourceSchedule></sourceSchedule>
      </div>
    </div>
  </container>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import container from '@/components/container'
import { sourcesCollection } from '../firebase/index'
import aboutSource from '@/components/aboutSource.manageSoruce'
import sourceSchedule from '@/components/sourceSchedule.manageSource'
import sourceReservation from '@/components/sourceReservation.manageSource'
export default {
  name: 'manageSource.pages',
  router,
  data: function () {
    return {
      sourceId: '',
      sourceObject: {},
      amItheOwner: false
    }
  },
  components: { container, aboutSource, sourceSchedule, sourceReservation },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  beforeMount() {
    this.sourceId = this.$route.params.id
    sourcesCollection.doc(this.sourceId).get()
      .then(doc => {
        if (doc.exists) {
          this.sourceObject = doc.data()
          this.sourceObject.id = this.sourceId
          if (this.sourceObject.company.owner.uid == this.getUserInfo.uid) {
            this.amItheOwner = true
          } else {
            router.push('/')
          }
        }
      }).catch(function(error) {
        console.log(error)
        console.log(error.code)
      })
  }
}
</script>

<style lang="scss" scoped>
#manageSource {
  display: flex;
  align-items: center;
  justify-content: center;
}
#manageSource {
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
    .left, .right {
      width: 100%;
    }
    .left {
      margin-right: 16px;
      max-width: 400px;
    }
  }
}
@media screen and (max-width: 1024px) {
  #manageSource {
    .container {
      .content {
        flex-direction: column;
      }
      .content {
        .left {
          margin: 0;
          width: 100%;
          display: flex;
          max-width: unset;
          min-width: unset;
          flex-direction: row;
          align-items: baseline;
        }
        .left {
          #aboutSource {
            margin-right: 20px;
          }
        }
        .right {
          width: 100%;
          min-width: unset;
          max-width: unset;
          margin-top: 20px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #manageSource {
    .container {
      .content {
        .left {
          flex-direction: column;
        }
        .left {
          #aboutSource {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>