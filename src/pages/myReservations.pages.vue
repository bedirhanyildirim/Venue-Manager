<template>
<div id="myReservations">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">My reservations</h1>
    <div class="content">
      <reservations :activities="activities"></reservations>
    </div>
  </container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import container from '../components/container'
import { activitiesCollection } from '../firebase/index'
import reservations from '../components/reservations.myResevations'

export default {
  name: 'myReservations.pages',
  components: { container, reservations },
  data: function () {
    return {
      activities: []
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  mounted() {
    activitiesCollection.where("resMaker.uid", "==", this.getUserInfo.uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return
      }
      snapshot.forEach(doc => {
        //if (doc.data().resMaker.uid == doc.data().source.company.owner.uid) {
        this.activities.push({id: doc.id, data: doc.data()})
        //console.log(doc.data())
        //}
      })
    })
    .catch(err => {
      console.log(err)
      console.log(err.code)
    })
  }
}
</script>

<style lang="scss" scoped>
#myReservations {
  display: flex;
  align-items: center;
  justify-content: center;
}
#myReservations {
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
    flex-direction: column;
    align-items: flex-start;
    justify-content: normal;
  }
}
</style>