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
      <calendar :days-name-full="false" @selectedDate="onClickCalendar" :events="activities"></calendar>
    </div>
    <div class="row" v-if="selectedDayActivities">
      <daily-view :events="this.selectedDayActivities" :date="this.date" starting-hour="09" ending-hour="17"></daily-view>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { activitiesCollection } from '../firebase/index'
import calendar from '@/public_components/calendar'
import dailyView from '@/components/dailyActivities.sourceSchedule'
export default {
  name: 'sourceSchedule.manageSource.vue',
  components: { calendar, dailyView },
  data: function () {
    return {
      sourceId: '',
      activities: [],
      date: '',
      searched: false,
      selectedDayActivities: []
    }
  },
  beforeMount() {
    let date = new Date()
    let dd = String(date.getDate()).padStart(2, '0')
    let mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = date.getFullYear()
    this.date = yyyy + '-' + mm + '-' + dd

    this.sourceId = this.$route.params.id
    activitiesCollection.where('source.id', '==', this.sourceId)
      .where('source.company.owner.uid', '==', this.getUserInfo.uid).get()
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
  watch: {
    date: function (val) {
      this.getActivitiesForDate(val)
    }
  },
  methods: {
    onClickCalendar: function (value) {
      let dd = String(value.getDate()).padStart(2, '0')
      let mm = String(value.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = value.getFullYear()

      this.date = yyyy + '-' + mm + '-' + dd
      //console.log(this.date)
    },
    getActivitiesForDate(date) {
      this.selectedDayActivities = []
      activitiesCollection.where('source.id', '==', this.sourceId)
        .where('date', '==', date)
        .where('source.company.owner.uid', '==', this.getUserInfo.uid).get()
        .then(snapshot => {
          this.searched = true
          if (snapshot.empty) {
            //console.log('There is no activity')
            return
          }
          snapshot.forEach(doc => {
            this.selectedDayActivities.push({
              id: doc.id,
              data: doc.data()
            })
          })
        })
        .catch(err => {
          console.log('Some error occurred: ' + err)
        })
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