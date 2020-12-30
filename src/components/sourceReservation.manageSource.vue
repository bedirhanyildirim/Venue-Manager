<template>
<div id="sourceReservation">
  <div v-if="!this.searched" class="loading">
    Loading..
  </div>
  <div v-else class="content">
    <div class="row" style="flex-direction: row; justify-content: space-between; align-items: center">
      <h3 class="title">Activities</h3>
      <svg @click="createEventToggle" class="new" baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18,10h-4V6c0-1.104-0.896-2-2-2s-2,0.896-2,2l0.071,4H6c-1.104,0-2,0.896-2,2s0.896,2,2,2l4.071-0.071L10,18  c0,1.104,0.896,2,2,2s2-0.896,2-2v-4.071L18,14c1.104,0,2-0.896,2-2S19.104,10,18,10z"/></svg>
    </div>
    <div v-if="this.activities.length == 0" class="row">
      <div class="no-content">
        No activity.
      </div>
    </div>
  </div>
</div>
  <modal-create-activity v-if="newEventModal" :source-object="this.sourceObject" @away="createEventToggle"></modal-create-activity>
</template>

<script>
import { mapGetters } from 'vuex'
import { activitiesCollection } from '@/firebase'
import modalCreateActivity from './modal.createActivity.sourceReservation'
export default {
  name: 'sourceReservation.manageSource.vue',
  components: { modalCreateActivity },
  data: function () {
    return {
      sourceId: '',
      activities: [],
      searched: false,
      newEventModal: false
    }
  },
  props: {
    sourceObject: {
      type: Object,
      required: true
    }
  },
  beforeMount() {
    this.sourceId = this.$route.params.id
    activitiesCollection.where('source.id', '==', this.sourceId)
      .where('source.company.owner.uid', '==', this.getUserInfo.uid).get()
      .then(snapshot => {
        this.searched = true
        if (snapshot.empty) {
          console.log('There is no activity')
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
    data(){
      this.sourceObject
    },
    ...mapGetters([
      'getUserInfo',
      'getCompany'
    ])
  },
  methods: {
    createEventToggle: function () {
      this.newEventModal = !this.newEventModal
      if (this.newEventModal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#sourceReservation {
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
#sourceReservation {
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
      .new {
        fill: #272e8a;
        cursor: pointer;
        transition: fill 200ms ease;

        &:hover {
          fill: #2e39c4;
        }
      }
      .no-content {
        width: 100%;
        color: #505050;
        font-size: 14px;
        text-align: left;
        font-style: italic;
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