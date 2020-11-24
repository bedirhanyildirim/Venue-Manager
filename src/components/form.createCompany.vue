<template>
<div id="companyform">
  <div class="company-form">
    <div class="row">
      <label for="name" class="input-name">Company name</label>
      <input id="name" type="text" v-model="name" name="name"/>
    </div>
    <div class="row" style="align-items: start;">
      <label for="address" class="input-name" style="margin-top: 10px;">Address</label>
      <textarea id="address" type="text" v-model="address" name="address" rows="4 "></textarea>
    </div>
    <div class="row" style="align-items: start;">
      <label for="region" class="input-name" style="margin-top: 10px;">City</label>
      <input id="region" type="text" v-model="region" name="region"/>
    </div>
    <div class="row" style="align-items: start;">
      <label for="city" class="input-name" style="margin-top: 10px;">Province</label>
      <input id="city" type="text" v-model="city" name="city"/>
    </div>
    <div class="row">
      <label for="phone" class="input-name">Phone number</label>
      <!--input id="phone" type="text" v-model="phone" name="phone"/-->
      <the-mask id="phone" v-model="phone" name="phone" mask="0### ### ## ##" value="" type="tel" masked placeholder="0XXX XXX XX XX"></the-mask>
    </div>
    <div class="row">
      <label for="workingDays" class="input-name">Working days</label>
      <select id="workingDays" v-model="workingDays" name="workingDays">
        <option value="weekdays">Weekdays</option>
        <option value="weekdaysandsaturday">Weekdays + Saturday</option>
        <option value="everyday">Everyday</option>
      </select>
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
    <div class="row" style="justify-content: flex-end; margin-bottom: 0;">
      <button class="button" @click="fill">Create</button>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import { companiesCollection } from '../firebase/index'
import { TheMask } from 'vue-the-mask'
export default {
  name: "form.createCompany",
  router,
  components: { TheMask },
  data: function () {
    return {
      name: '',
      address: '',
      city: '',
      region: '',
      phone: '',
      workingDays: 'weekdays',
      startingHour: '08',
      endingHour: '17'
    }
  },
  methods: {
    fill: function () {
      companiesCollection.doc(this.getUserInfo.uid).set({
        name: this.name,
        address: this.address,
        city: this.city,
        region: this.region,
        phone: this.phone,
        workingDays: this.workingDays,
        startingHour: this.startingHour,
        endingHour: this.endingHour,
        owner: this.getUserInfo
      }).then(function (res) {
        router.push('/profile')
      }).catch(function (error) {
        console.log(error)
      })
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
#companyform {
  width: 100%;
  display: flex;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
#companyform {
  .company-form {
    width: 100%;
    display: flex;
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
      .button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      button {
        height: 40px;
        border: none;
        outline: none;
        color: #ffffff;
        display: block;
        cursor: pointer;
        font-size: 14px;
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
    }
  }
}
@media screen and (min-width: 425px) and (max-width: 768px) {
  #companyform {
    .row {
      .googleButton {
      }
      .input-name {
      }
      input {
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #companyform {
    .row {
      input {
        width: 250px;
        min-width: unset;
        max-width: unset;
        box-sizing: border-box;
      }
      .button {
        width: 250px;
        min-width: unset;
        max-width: unset;
      }
    }
  }
}
</style>