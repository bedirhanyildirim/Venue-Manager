<template>
<div id="calendar">
  <div class="toolbar">
    <div class="buttons">
      <button class="backward" @click="prevMonth">
        <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.414,5.586c-0.78-0.781-2.048-0.781-2.828,0L5.171,12l6.415,6.414C11.976,18.805,12.488,19,13,19  s1.024-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828L10.829,12l3.585-3.586C15.195,7.633,15.195,6.367,14.414,5.586z"/></svg>
      </button>
      <button class="forward" @click="nextMonth">
        <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M8.586,5.586c-0.781,0.781-0.781,2.047,0,2.828L12.171,12l-3.585,3.586c-0.781,0.781-0.781,2.047,0,2.828  C8.976,18.805,9.488,19,10,19s1.024-0.195,1.414-0.586L17.829,12l-6.415-6.414C10.634,4.805,9.366,4.805,8.586,5.586z"/></svg>
      </button>
    </div>
    <div class="month">
      <p>{{ this.monthNames[this.getMonth] }} {{ this.getYear }}</p>
    </div>
    <div class="today">
      <button @click="makeItToday">
        <p>Today</p>
      </button>
    </div>
  </div>
  <div class="content">
    <div class="name-of-days" v-if="daysNameFull">
      <div class="name weekday">Monday</div>
      <div class="name weekday">Tuesday</div>
      <div class="name weekday">Wednesday</div>
      <div class="name weekday">Thursday</div>
      <div class="name weekday">Friday</div>
      <div class="name weekend">Saturday</div>
      <div class="name weekend">Sunday</div>
    </div>
    <div class="name-of-days" v-if="!daysNameFull">
      <div class="name weekday">Mon</div>
      <div class="name weekday">Tue</div>
      <div class="name weekday">Wed</div>
      <div class="name weekday">Thu</div>
      <div class="name weekday">Fri</div>
      <div class="name weekend">Sat</div>
      <div class="name weekend">Sun</div>
    </div>
    <div id="days" class="days" v-on:click="setSelectedDate">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'calendar.vue',
  props: {
    date: {
      type: Date,
      required: false,
      default: function () { return new Date() }
    },
    events: {
      type: Array,
      required: false,
      default: function () { return [] }
    },
    daysNameFull: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: function () {
    return {
      dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      dayNamesShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      shownDate: this.date || new Date(),
      selectedDate: null
    }
  },
  watch: {
    shownDate () {
      this.drawCalendar()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawCalendar()
    })
  },
  created() {
  },
  computed: {
    getToday () {
      return this.shownDate.getDate()
    },
    getMonth () {
      return this.shownDate.getMonth()
    },
    getYear () {
      return this.shownDate.getFullYear()
    },
    getCountOfWeeks () {
      return this.getFullWeeksStartAndEndInMonth(this.getMonth, this.getYear).length
    },
    getMonthAsArray () {
      return this.getFullWeeksStartAndEndInMonth(this.getMonth, this.getYear)
    },
    getNumberOfDays () {
      return new Date(this.getYear, this.getMonth+1, 0).getDate()
    },
    isTodayWeekend () {
      let tempDate = new Date(this.getYear, this.getMonth, this.getToday)
      return this.shownDate.getDay() % 7 == 6 || this.shownDate.getDay() % 7 == 0
    },
    getSelectedDate () {
      return this.selectedDate
    }
  },
  methods: {
    prevMonth: function () {
      this.shownDate = new Date(this.shownDate.getFullYear(), this.shownDate.getMonth() - 1, 1)
    },
    nextMonth: function () {
      this.shownDate = new Date(this.shownDate.getFullYear(), this.shownDate.getMonth() + 1, 1)
    },
    isToday (date) {
      if (date.getYear() == this.date.getYear() && date.getMonth() == this.date.getMonth() && date.getDate() == this.date.getDate()) {
        return true
      }
      return false
    },
    makeItToday: function () {
      this.shownDate = new Date()
    },
    getNumberOfDaysInMonth: function (month, year) {
      return new Date(year, month+1, 0).getDate()
    },
    isWeekend : function (date) {
      return date.getDay() % 7 == 6 || date.getDay() % 7 == 0
    },
    getFullWeeksStartAndEndInMonth: function (month, year) {
      let weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate()

      let start = 1
      let end
      if (firstDate.getDay() === 1) {
        end = 7
      } else if (firstDate.getDay() === 0) {
        let preMonthEndDay = new Date(year, month, 0)
        start = preMonthEndDay.getDate() - 6 + 1
        end = 1
      } else {
        let preMonthEndDay = new Date(year, month, 0)
        start = preMonthEndDay.getDate() + 1 - firstDate.getDay() + 1
        end = 7 - firstDate.getDay() + 1
        weeks.push({ start: start, end: end })
        start = end + 1
        end = end + 7
      }
      while (start <= numDays) {
        weeks.push({ start: start, end: end });
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays && start <= numDays) {
          end = end - numDays
          weeks.push({ start: start, end: end })
          break
        }
      }
      return weeks
    },
    drawCalendar: function () {
      const days = document.getElementById('days')
      let monthArray = this.getMonthAsArray
      let startingDate = null

      // clean Calendar
      days.innerHTML = ''

      // set the first day of calendar
      if (monthArray[0].start > 1) {
        startingDate = new Date(this.getYear, this.getMonth-1, monthArray[0].start)
      } else {
        startingDate = new Date(this.getYear, this.getMonth, monthArray[0].start)
      }
      // create each row
      for (let index in monthArray) {
        // create row
        days.insertAdjacentHTML('beforeend', '<div class="row"></div>')
        let daysRow = days.lastChild

        // create each days in a row
        for (let i = 0; i < 7; i++) {
          daysRow.insertAdjacentHTML('beforeend', '<div class="day ' + (this.isWeekend(startingDate) ? 'weekend' : '')  + ' '+  (this.isToday(startingDate) ? 'today' : '') +'"><div class="box" ref="' + startingDate.getDate() + '.' + startingDate.getMonth() + '.' + startingDate.getFullYear() + '"><span class="number">' + startingDate.getDate() + '</span></div></div>')
          startingDate.setDate(startingDate.getDate()+1)
        }
      }
      this.drawEvents()
    },
    setSelectedDate: function (e) {
      let selectedBox = e.target
      while (!selectedBox.classList.contains('box')) {
        selectedBox = selectedBox.parentNode
      }

      if (selectedBox != null) {
        let y = selectedBox.getAttribute('ref').split('.')[2]
        let m = selectedBox.getAttribute('ref').split('.')[1]
        let d = selectedBox.getAttribute('ref').split('.')[0]
        this.selectedDate = new Date(y, m, d)
        this.$emit('selectedDate', this.selectedDate)
      }
    },
    drawEvents: function () {
      if (this.events.length > 0) {
        const days = document.getElementById('days')
        const boxes = days.getElementsByClassName('box')

        for (let b of boxes) {
          let countOfEvents = 0
          let eventsOfDate = []
          for (let e of this.events) {
            let y = e.data.date.split('-')[0]
            let m = Number(e.data.date.split('-')[1]) - 1
            let d = e.data.date.split('-')[2]
            let date = new Date(y, m, d)
            let formatedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()

            if (b.getAttribute('ref') === formatedDate) {
              countOfEvents += 1
              eventsOfDate.push(e)
            }
          }
          if (countOfEvents > 0) {
            b.insertAdjacentHTML('beforeend', '<div class="events"></div>')
            let eventsDiv = b.getElementsByClassName('events')[0]
            let countOfEventsElement = '<div class="countOfEvents"><div class="count">' + countOfEvents + '</div></div>'
            eventsDiv.insertAdjacentHTML('beforeend', countOfEventsElement)
            for (let ev of eventsOfDate) {
              let htmlString = '<div class="event"><div class="status"></div><div class="time">' + ev.data.startingHour + ':00</div><div class="title">' + ev.data.title + '</div></div>'
              eventsDiv.insertAdjacentHTML('beforeend', htmlString)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#calendar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
}
#calendar {
  .toolbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .toolbar {
    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .buttons {
      button {
        height: auto;
        border: none;
        padding: 4px;
        display: flex;
        outline: none;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        background-color: #272e8a;
      }
      button:hover {
        background-color: #2e39c4;
      }
      .backward {
        border-radius: 8px 0 0 8px;
      }
      .forward {
        border-radius: 0 8px 8px 0;
      }
      button {
        svg {
          width: 20px;
          height: 20px;
          fill: #ffffff;
        }
      }
    }
    .month {
      margin: 0;
      padding: 0;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .month {
      p {
        color: #000000;
        font-weight: 500;
        text-align: center;
        line-height: initial;
      }
    }
    .today {
      height: 28px;
    }
    .today {
      button {
        margin: 0;
        padding: 0 11px;
        width: 100%;
        border: none;
        height: 100%;
        display: flex;
        outline: none;
        cursor: pointer;
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        background-color: #272e8a;
        transition: background-color 200ms ease
      }
      button:hover {
        background-color: #2e39c4;
      }
      button {
        p {
          font-size: 12px;
          color: #ffffff;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
  .content {
    width: 100%;
  }
  .content {
    .name-of-days {
      width: 100%;
      display: grid;
      overflow: hidden;
      margin-top: 16px;
      align-items: center;
      border-radius: 8px 8px 0 0;
      grid-template-columns: repeat(7, 1fr);
    }
    .name-of-days {
      .name {
        height: auto;
        padding: 8px 0;
        cursor: pointer;
        background-color: #f7f7f7;
        transition: color 200ms ease;
      }
      .name {
        &.weekday {
          color: #000000;
          font-weight: 500;
        }
        &.weekend {
          color: #272e8a;
          font-weight: 700;
        }
        &:hover {
          color: #2e39c4;
        }
      }
    }
    .days {
      background-color: #ffffff;
    }
    .days {
      .row {
        display: grid;
        border-left: 1px solid #f7f7f7;
        border-right: 1px solid #f7f7f7;
        grid-template-columns: repeat(7, 1fr);
      }
      .row {
        .day {
          width: 100%;
          padding-top: 100%;
          position: relative;
        }
        .day {
          .box {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 4px;
            color: #000000;
            font-size: 14px;
            cursor: pointer;
            overflow: hidden;
            font-weight: 500;
            position: absolute;
            text-align: center;
            transition: all 200ms ease;
            border-right: 1px solid #f7f7f7;
            border-bottom: 1px solid #f7f7f7;
          }
          .box {
            .number {
              width: 100%;
              color: #707070;
              display: block;
            }
            .events {
              width: 100%;
              display: flex;
              margin-top: 4px;
              text-align: left;
              white-space: nowrap;
              flex-direction: column;
            }
            .events {
              .countOfEvents {
                display: none;
              }
              .event {
                width: 100%;
                display: flex;
                overflow: hidden;
                align-items: center;
                flex-direction: row;
              }
              .event {
                .status {
                  padding: 4px;
                  display: block;
                  margin-left: 4px;
                  border-radius: 100%;
                  background: #2e39c4;
                }
                .time {
                  margin: 0 4px;
                  color: #505050;
                  font-size: 12px;
                }
                .title {
                  color: #303030;
                  font-size: 12px;
                  font-weight: 500;
                }
              }
              .event:hover {
                border-radius: 4px;
                background-color: #f7f7f7;
              }
            }
          }
        }
        .day.today {
          .box .number {
            color: #2e39c4;
            font-weight: 900;
          }
        }
        .day.today:hover {
          .box .number {
            color: #272e8a;
          }
        }
        .day:last-child {
          .box {
            border-right: unset;
          }
        }
        .day:hover {
          .box {
            .number{
              color: #303030;
            }
          }
        }
      }
      .row:last-child {
        .day {
          span {
            border-bottom: unset;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #calendar {
    .content {
      width: 100%;
    }
    .content {
      .days {
        background-color: #ffffff;
      }
      .days {
        .row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
        }
        .row {
          .day {
            width: 100%;
            padding-top: 100%;
            position: relative;
          }
          .day {
            .number {
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              color: #000000;
              font-size: 14px;
              font-weight: 500;
              position: absolute;
              text-align: center;
              align-items: center;
              justify-content: center;
            }
            .box {
              .events {
                margin-top: 16px
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #calendar {
    .content {
      .days {
        .row {
          .day {
            .box {
              .events {
                margin-top: 0;
                height: 100%;
              }
              .events {
                .countOfEvents {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .countOfEvents {
                  .count {
                    color: #000000;
                    display: flex;
                    font-size: 16px;
                    font-weight: bold;
                    align-items: center;
                  }
                  .count:before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    display: block;
                    margin-right: 4px;
                    border-radius: 50%;
                    background-color: #272E8A;
                  }
                }
                .event {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>