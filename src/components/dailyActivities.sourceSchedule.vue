<template>
<div id="dailyView">
  <div class="header">
    <div class="date">
      <h4>Daily View <i style="font-weight: normal">({{ this.currentDate.getDate() }} {{ this.monthNames[this.currentDate.getMonth()] }} {{ this.currentDate.getFullYear() }})</i></h4>
    </div>
  </div>
  <div class="content">
    <div v-if="this.events.length == 0" class="no-content">
      There isn't event this day.
    </div>
    <div v-else class="dailyView" :style="gridStyle">
      <div class="hours" v-for="hour in workingHoursArray">
        {{ hour }}:00
      </div>
      <div class="activity" v-for="ev in events" :style="{gridRow: `hour-${ev.data.startingHour} / hour-${ev.data.endingHour}`, gridColumn: 'track-1'}">
        {{ ev.data.title }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'dailyActivities.sourceSchedule.vue',
  props: {
    events: {
      type: Array,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    startingHour: {
      type: String,
      required: true
    },
    endingHour: {
      type: String,
      required: true
    }
  },
  data: function (){
    return {
      dateObject: new Date(),
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    }
  },
  mounted() {
  },
  computed: {
    currentDate: function () {
      let d = this.date.split('-')[2]
      let m = this.date.split('-')[1]-1
      let y = this.date.split('-')[0]
      return new Date(y, m, d)
    },
    workingHoursArray: function () {
      let ar = []
      let iter = Number(this.startingHour)
      let last = Number(this.endingHour)
      for (iter; iter <= last; iter++) {
        ar.push(iter < 10 ? ('0' + iter) : iter.toString())
      }
      return ar
    },
    gridStyle: function () {
      let rowTemplate= ''
      for (let i of this.workingHoursArray) {
        rowTemplate += '[hour-' + i + '] 1fr '
      }
      return {
        "grid-template-rows": rowTemplate
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#dailyView {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#dailyView {
  .header {

  }
  .content {
    width: 100%;
    display: flex;
    margin-top: 16px;
  }
  .content {
    .no-content {
      text-align: left;
      font-style: italic;
    }
    .dailyView {
      width: 100%;
      padding: 16px;
      display: grid;
      align-items: stretch;
      justify-items: stretch;
      grid-template-columns:
        [hours] 4em
        [track-1-start] 1fr
        [track-1-end track-2-start] 1fr
        [track-2-end track-3-start] 1fr
        [track-3-end track-4-start] 1fr
        [track-4-end];
      border-top: 1px solid #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
    }
    .dailyView {
      .hours {
        display: flex;
        padding: 16px;
        grid-column: hours;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
        background-color: #fafafa;
        border-top: 1px solid #e7e7e7;
      }
      .hours:first-child {
        border-top: none;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .hours:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .activity {
        height: 100%;
        padding: 4px;
        display: flex;
        color: #ffffff;
        margin: 4px 16px;
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        background-color: #2e39c4;
      }
    }
  }
}
</style>