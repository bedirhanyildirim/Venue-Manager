<template>
<div id="modal">
  <div class="modal" v-on-clickaway="away">
    <div class="container">
      <div class="header">
        <h4>New activity</h4>
      </div>
      <div class="content">
        <div class="row">
          <label class="input-name" for="title">Title</label>
          <input id="title" v-model="title" name="title" type="text"/>
        </div>
        <div class="row">
          <label class="input-name" for="description" style="margin-top: 10px;">Description</label>
          <textarea id="description" v-model="description" name="description" rows="2" type="text"></textarea>
        </div>
        <div class="row">
          <label class="input-name" for="date">Date</label>
          <input id="date" :value="date" @change="dateChange" name="date" type="date">
        </div>
        <div class="row">
          <label for="startingHour" class="input-name">Hours</label>
          <div class="range-hours">
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
      </div>
      <div class="footer">
        <div class="row">
          <div class="button">
            <button @click="add">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from '@/router'
import { mapGetters } from 'vuex'
import { activitiesCollection } from '@/firebase'
import { mixin as clickAway } from 'vue-clickaway'

export default {
  name: 'modal.createActivity.sourceReservation',
  props: {
    sourceObject: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      title: '',
      description: '',
      date: new Date().toISOString().slice(0,10),
      startingHour: '',
      endingHour: ''
    }
  },
  mixins: [ clickAway ],
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getCompany'
    ])
  },
  methods: {
    away: function () {
      this.$emit('away', false)
    },
    add: function () {
      activitiesCollection.add({
        title: this.title,
        description: this.description,
        source: this.sourceObject,
        resMaker: this.getUserInfo,
        canceled: false,
        date: this.date,
        isValid: 'accepted',
        startingHour: this.startingHour,
        endingHour: this.endingHour
      }).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
      this.away()
    },
    dateChange: function (e) {
      this.date = e.target.value
    }
  },
  beforeMount() {
    document.body.style.position = 'fixed'
  }
}
</script>

<style lang="scss" scoped>
#modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .72);
}
#modal {
  .modal {
    width: 500px;
    display: flex;
    min-width: 300px;
    position: relative;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    box-shadow: 0 0 4px 0 rgba(0,0,0,0.18);
    -moz-box-shadow: 0 0 4px 0 rgba(0,0,0,0.18);
    -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,0.18);
  }
  .modal {
    .container {
      width: 100%;
      padding: 16px;
      color: #000000;
    }
    .container {
      .header {
        width: 100%;
        display: block;
        font-size: 24px;
        padding: 8px 4px;
        text-align: left;
        margin-bottom: 8px;
      }
      .content {
        width: 100%;
      }
      .content {
        .row {
          width: 100%;
          display: flex;
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
          .range-hours {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .range-hours {
            .hour {
              width: 100%;
              height: 40px;
              outline: none;
              color: #000000;
              cursor: pointer;
              font-size: 14px;
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
        }
        .row:last-child {
          margin-bottom: 0;
        }
      }
      .footer {
        .row {
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
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #modal {
    .modal {
      width: 100%;
      margin: 0 20px;
      min-width: unset;
      max-width: unset;
    }
  }
}
</style>