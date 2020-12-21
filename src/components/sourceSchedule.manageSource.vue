<template>
<div id="sourceSchedule">
  <div class="loading" v-if="!this.searched">
    Loading..
  </div>
  <div class="content" v-else>
    <div class="row">
      <h3 class="title">Schedule</h3>
    </div>
    <div class="row">
      <calendar :days-name-full="false" @selectedDate="onClickCalendar"></calendar>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { activitiesCollection } from '../firebase/index'
import calendar from '@/public_components/calendar'
export default {
  name: 'sourceSchedule.manageSource.vue',
  components: { calendar },
  data: function () {
    return {
      sourceId: '',
      activities: [],
      date: new Date(),
      searched: false
    }
  },
  beforeMount() {
    this.sourceId = this.$route.params.id
    activitiesCollection.where('source.company.owner.id', '==', this.getUserInfo.uid)
      .where('canceled', "==", false).get()
      .then(snapshot => {
        this.searched = true
        if (snapshot.empty) {
          //console.log('There is no activity')
          return
        }
        snapshot.forEach(doc => {
          this.activities.push({
            id: doc.id,
            data: doc.data()
          })
        })
      })
      .catch(err => {
        console.log('Some error occurred: ' + err)
      })
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getCompany'
    ])
  },
  methods: {
    onClickCalendar: function (value) {
      let dd = String(value.getDate()).padStart(2, '0')
      let mm = String(value.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = value.getFullYear()

      this.date = yyyy + '-' + mm + '-' + dd
      console.log(this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
#sourceSchedule {
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
#sourceSchedule {
  .loading {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .content {
    .row {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: baseline;
      flex-direction: column;
      justify-content: center;
    }
    .row {
      .title {
        color: #000000;
        font-size: 14px;
        text-align: left;
        font-weight: 700;
        white-space: nowrap;
      }
    }
    .row:first-child {
      label {
        margin-top: 0;
      }
    }
    .row:last-child {
      margin-bottom: 0;
    }
  }
}
</style>