<template>
<div id="modal">
  <div class="modal" v-on-clickaway="away">
    <div class="container">
      <div class="header">
        <h4>Activity Details</h4>
      </div>
      <div class="content">
        <div class="row">
          <label for="title" class="input-name">Title</label>
          <input type="text" id="title" name="title" v-model="title"/>
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
        <div class="row">
          <label class="input-name">Reservation Owner</label>
          <div class="user">
            <div class="name">
              {{ resMaker.name }} {{ resMaker.surname }} <i v-if="isMyActivity">(me)</i>
            </div>
            <div class="email">
              {{ resMaker.email }}
            </div>
            <div class="mobile">
              {{ resMaker.mobile }}
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="row">
          <div class="button">
            <button v-if="isMyActivity" @click="add" class="save">Save</button>
            <button v-if="!isMyActivity && !isValid" @click="accept" class="validate">Accept</button>
            <button v-if="!isMyActivity && !isValid" @click="reject" class="reject">Reject</button>
            <button v-if="isValid" @click="cancel" class="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import { mixin as clickAway } from 'vue-clickaway'
import {activitiesCollection} from "@/firebase";
import router from "@/router";

export default {
  name: 'modal.activityDetail.manageSource.vue',
  props: {
    activityObject: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      title: this.activityObject.data.title,
      description: this.activityObject.data.description,
      date: this.activityObject.data.date,
      startingHour: this.activityObject.data.startingHour,
      endingHour: this.activityObject.data.endingHour,
      resMaker: this.activityObject.data.resMaker
    }
  },
  mixins: [ clickAway ],
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getCompany'
    ]),
    isMyActivity () {
      if (this.resMaker.uid == this.getUserInfo.uid) {
        return true
      }
      return false
    },
    isValid() {
      return this.activityObject.data.isValid == 'accepted' ? true : false
    },
    isCanceled() {
      return this.activityObject.isCanceled
    }
  },
  created() {
  },
  methods: {
    away: function () {
      this.$emit('away', false)
    },
    dateChange: function (e) {
      this.date = e.target.value
    },
    add: function () {
      let upAct = {
        title: this.title,
        description: this.description,
        date: this.date,
        endingHour: this.endingHour,
        startingHour: this.startingHour
      }
      activitiesCollection.doc(this.activityObject.id).update(upAct)
      .catch(err => {console.log(err)})
      .then(res => {location.reload()})
    },
    cancel: function () {
      activitiesCollection.doc(this.activityObject.id).update({ canceled: true })
      .catch(err => {console.log(err)})
      .then(res => {location.reload()})
    },
    accept: function () {
      activitiesCollection.doc(this.activityObject.id).update({ isValid: 'accepted' })
      .catch(err => {console.log(err)})
      .then(res => {location.reload()})
    },
    reject: function () {
      activitiesCollection.doc(this.activityObject.id).update({ isValid: 'rejected' })
      .catch(err => {console.log(err)})
      .then(res => {location.reload()})
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
          .user {
            width: 100%;
            display: flex;
            margin-left: 16px;
            align-items: baseline;
            flex-direction: column;
          }
          .user {
            .name {
              margin-top: 4px;
              font-weight: 500;
            }
            .email, .mobile {
              font-size: 14px;
              font-style: italic;
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
          .save {
            margin-right: 12px;
          }
          .cancel {
            background-color: #8a2727;
            &:hover {
              background-color: #c42e2e!important;
            }
          }
          .reject {
            margin-right: 12px;
            background-color: #8a5227;
            &:hover {
              background-color: #c49a2e !important;
            }
          }
          .validate {
            margin-right: 12px;
            background-color: #318a27;
            &:hover {
              background-color: #33c42e !important;
            }
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