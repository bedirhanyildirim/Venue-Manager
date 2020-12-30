<template>
<div id="sourceform">
  <div class="company-form">
    <div class="row">
      <label class="input-name" for="name">Name</label>
      <input id="name" v-model="name" name="name" type="text"/>
    </div>
    <div class="row">
      <label class="input-name" for="description" style="margin-top: 10px;">Description</label>
      <textarea id="description" v-model="description" name="description" rows="4 " type="text"></textarea>
    </div>
    <div class="row">
      <label class="input-name" for="capacity">Capacity</label>
      <input id="capacity" v-model="capacity" name="phone" type="text"/>
    </div>
    <div class="row">
      <label class="input-name" style="margin-bottom: 16px">Schedule</label>
      <!--FullCalendar :events="events" :options="options"/-->
      <calendar :date="new Date()" :events="events" @selectedDate="onClickCalendar"></calendar>
    </div>
    <div class="row">
      <label class="input-name" for="date">Date</label>
      <input id="date" :value="date" disabled name="date" type="date">
    </div>
    <div class="row">
      <label for="startingHour" class="input-name">Working hours</label>
      <div class="rangehours">
        <div class="row">
          <label for="startingHour" class="sub-input-name">From</label>
          <select id="startingHour" class="hour" v-model="startingHour" name="startingHour">
            <option value="06">06:00</option>
            <option value="07">07:00</option>
            <option value="08">08:00</option>
            <option value="09">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
          </select>
        </div>
        <div class="row">
          <label for="endingHour" class="sub-input-name">To</label>
          <select id="endingHour" class="hour" v-model="endingHour" name="startingHour">
            <option value="06">06:00</option>
            <option value="07">07:00</option>
            <option value="08">08:00</option>
            <option value="09">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <a href="javascript:;" @click="ekle">Add</a>
    </div>
    <div class="row">
      <div class="sharedUsage">
        <input id="sharedUsage" v-model="sharedUsage" type="checkbox">
        <svg @click="toggle" v-if="sharedUsage" baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.972,6.251c-0.967-0.538-2.185-0.188-2.72,0.777l-3.713,6.682l-2.125-2.125c-0.781-0.781-2.047-0.781-2.828,0  c-0.781,0.781-0.781,2.047,0,2.828l4,4C9.964,18.792,10.474,19,11,19c0.092,0,0.185-0.006,0.277-0.02  c0.621-0.087,1.166-0.46,1.471-1.009l5-9C18.285,8.005,17.937,6.788,16.972,6.251z"/></svg>
        <label for="sharedUsage">Share with community.</label>
      </div>
      <div class="button">
        <button @click="fill">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import {mapGetters} from 'vuex'
import {companiesCollection, sourcesCollection, activitiesCollection} from '../firebase/index'
import calendar from '@/public_components/calendar'
export default {
  name: "form.createSource",
  router,
  components: { calendar},
  data: function () {
    return {
      name: '',
      description: '',
      capacity: '',
      sharedUsage: false,
      company: {},
      date: '',
      startingHour: '',
      endingHour: '',
      events: [],
      sourceId: ''
    }
  },
  mounted() {
  },
  created() {
    // if exists
    companiesCollection.doc(this.getUserInfo.uid).get()
      .then(doc => {
        if (doc.exists) {
          this.company = doc.data()
        }
      }).catch(function (error) {
        console.log("Error getting document:", error)
      })
  },
  methods: {
    fill: function () {
      let events = this.events
      let userInfo = this.getUserInfo
      let sourceObject = {
        name: this.name,
        description: this.description,
        capacity: this.capacity,
        sharedUsage: this.sharedUsage,
        company: this.company
      }
      let startingHour = this.startingHour
      let endingHour = this.endingHour
      sourcesCollection.doc(this.sourceId).set(sourceObject)
        .then(function (res) {
          events.forEach(ev => {
            console.log(ev)
            activitiesCollection.add({
              source: sourceObject,
              resMaker: userInfo,
              canceled: false,
              date: ev.start,
              isValid: 'accepted',
              startingHour: startingHour,
              endingHour: endingHour
            }).then(function (ress) {
              console.log(ress)
              router.push('/profile')
            }).catch(function (errorr) {
              console.log(errorr)
            })
          })
          //
          //router.push('/profile')
        }).catch(function (error) {
          console.log(error)
        })
    },
    ekle: function () {
      this.events.push({
        start: this.date,
        end: this.date,
        startingHour: this.startingHour,
        endingHour: this.endingHour
      })
    },
    toggle: function () {
      this.sharedUsage = !this.sharedUsage
    },
    onClickCalendar: function (value) {
      let dd = String(value.getDate()).padStart(2, '0')
      let mm = String(value.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = value.getFullYear()

      this.date = yyyy + '-' + mm + '-' + dd
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import url("https://unpkg.com/primevue/resources/themes/saga-blue/theme.css");
@import url("https://unpkg.com/primevue/resources/primevue.min.css");
@import url("https://unpkg.com/primeicons/primeicons.css");

#sourceform {
  width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}

#sourceform {
  .company-form {
    width: 100%;
    display: flex;
    padding: 24px;
    max-width: 600px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .company-form {
    .row {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: baseline;
      flex-direction: column;
      justify-content: center;
    }

    .row {
      .input-name {
        color: #000000;
        display: block;
        font-size: 16px;
        font-weight: 700;
        margin: 14px 0 4px;
      }
      .sub-input-name {
        color: #666666;
        display: block;
        font-size: 14px;
        font-weight: 700;
        margin: 8px 0 4px 16px;
      }
      input {
        width: 100%;
        height: 40px;
        outline: none;
        color: #000000;
        font-size: 14px;
        min-width: 400px;
        appearance: none;
        font-weight: 400;
        line-height: 24px;
        padding: 10px 16px;
        border-radius: 8px;
        display: inline-block;
        box-sizing: border-box;
        background-color: #f3f3f4;
        transition: all 200ms ease;
        border: 1px solid transparent;
      }
      input:hover {
        background-color: #ffffff;
        border-color: rgba(0,0,0,0.1);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      input:focus {
        background-color: #ffffff;
        border-color: rgba(39,46,138,0.4);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      textarea {
        width: 100%;
        resize: none;
        outline: none;
        color: #000000;
        font-size: 14px;
        min-width: 400px;
        appearance: none;
        font-weight: 400;
        line-height: 24px;
        padding: 10px 16px;
        border-radius: 8px;
        display: inline-block;
        box-sizing: border-box;
        background-color: #f3f3f4;
        transition: all 200ms ease;
        border: 1px solid transparent;
      }
      textarea:hover {
        background-color: #ffffff;
        border-color: rgba(0,0,0,0.1);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      textarea:focus {
        background-color: #ffffff;
        border-color: rgba(39,46,138,0.4);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      select {
        cursor: pointer;
        width: 100%;
        height: 40px;
        outline: none;
        color: #000000;
        font-size: 14px;
        min-width: 400px;
        appearance: none;
        font-weight: 400;
        padding: 10px 16px;
        border-radius: 8px;
        display: inline-block;
        box-sizing: border-box;
        background-color: #f3f3f4;
        transition: all 200ms ease;
        border: 1px solid transparent;
      }
      select:hover {
        background-color: #ffffff;
        border-color: rgba(0,0,0,0.1);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      select:focus {
        background-color: #ffffff;
        border-color: rgba(39,46,138,0.4);
        box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
      }
      .rangehours {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .rangehours {
        .hour {
          width: 100%;
          height: 40px;
          outline: none;
          color: #000000;
          cursor: pointer;
          font-size: 14px;
          min-width: 400px;
          appearance: none;
          font-weight: 400;
          padding: 10px 16px;
          border-radius: 8px;
          display: inline-block;
          box-sizing: border-box;
          background-color: #f3f3f4;
          transition: all 200ms ease;
          border: 1px solid transparent;
        }
        .hour:hover {
          background-color: #ffffff;
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
        }
        .hour:focus {
          background-color: #ffffff;
          border-color: rgba(39,46,138,0.4);
          box-shadow: 0 0 0 4px rgba(0,18,255,0.1);
        }
      }
      .sharedUsage {
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: flex-start;
      }
      .sharedUsage {
        input {
          padding: 0;
          width: 24px;
          height: 24px;
          min-width: unset;
          margin-right: 16px;
          display: inline-block;
        }
        input:checked {
          background-color: #272e8a;
        }
        input:hover {
          svg {

          }
        }
        svg {
          fill: #ffffff;
          position: absolute;
        }
        label {
          color: #707070;
          font-size: 14px;
          font-weight: normal;
          white-space: nowrap;
          display: inline-block;
        }
      }
      .button {
        width: 100%;
        display: flex;
        margin-top: 24px;

        align-items: center;
        justify-content: flex-start;
      }
      button {
        height: 40px;
        border: none;
        outline: none;
        color: #ffffff;
        display: block;
        cursor: pointer;
        font-size: 14px;
        min-width: 100px;
        max-width: 200px;
        box-shadow: none;
        appearance: none;
        line-height: 20px;
        position: relative;
        padding: 10px 16px;
        text-align: center;
        border-radius: 8px;
        font-weight: normal;
        text-decoration: none;
        box-sizing: border-box;
        background-color: #272E8A;
        transition: all 200ms ease;
      }
      button:hover:enabled {
        cursor: pointer;
        background-color: #2e39c4;
      }
      .fc.fc-ltr.fc-unthemed {
        width: 100%;
        min-width: unset;
        max-width: unset;
      }
    }
    .row:last-child {
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 768px) {
  .company-form {
    max-width: unset !important;
  }
}
</style>