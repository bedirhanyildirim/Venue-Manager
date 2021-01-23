<template>
<div id="companyform">
  <div class="company-form">
    <div class="row">
      <label for="name" class="input-name">Company name</label>
      <input id="name" type="text" v-model="name" name="name"/>
    </div>
    <div class="row">
      <label for="city" class="input-name" style="margin-top: 10px;">City</label>
      <select id="city" class="city" name="city" v-model="city" >
        <option v-for="item in this.cityList" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="row">
      <label for="province" class="input-name" style="margin-top: 10px;">Province</label>
      <select id="province" class="province" name="province" v-model="province">
        <option v-for="item in Object.keys(this.provinces)" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="row">
      <label for="neighborhood" class="input-name" style="margin-top: 10px;">Neighborhood</label>
      <select id="neighborhood" class="neighborhood" name="neighborhood" v-model="neighborhood">
        <option v-for="(value, name) in this.neighborhoods" :value="name">{{ name }}</option>
      </select>
    </div>
    <div class="row">
      <label for="postalcode" class="input-name">Postal code</label>
      <input id="postalcode" type="text" v-model="postalcode" name="postalcode" disabled/>
    </div>
    <div class="row">
      <label for="address" class="input-name" style="margin-top: 10px;">Address</label>
      <textarea id="address" type="text" v-model="address" name="address" rows="4 "></textarea>
    </div>
    <div class="row">
      <label for="phone" class="input-name">Phone number</label>
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
import store from '../store'
import router from '../router'
import Cities from '@/services'
import { mapGetters } from 'vuex'
import { TheMask } from 'vue-the-mask'
import { companiesCollection } from '../firebase/index'

export default {
  name: 'form.createCompany',
  store,
  router,
  components: { TheMask },
  data: function () {
    return {
      name: '',
      city: '',
      phone: '',
      address: '',
      province: '',
      postalcode: '',
      neighborhood: '',
      endingHour: '17',
      startingHour: '08',
      workingDays: 'weekdays',
      cityList: Cities.cities,
      provinces: [],
      neighborhoods: []
    }
  },
  methods: {
    fill: function () {
      let company = {
        name: this.name,
        city: this.city,
        phone: this.phone,
        address: this.address,
        province: this.province,
        postalcode: this.postalcode,
        endingHour: this.endingHour,
        workingDays: this.workingDays,
        neighborhood: this.neighborhood,
        startingHour: this.startingHour,
        owner: this.getUserInfo
      }
      let backup = this
      companiesCollection.doc(this.getUserInfo.uid).set(company)
      .then(function (res) {
        backup.$store.dispatch('setCompany', company)
        router.push('/profile')
      }).catch(function (error) {
        console.log(error)
        console.log(error.code)
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ]),
    getProvinces () {
      if ( this.city !== '' ) {
        switch (this.city) {
          case "Istanbul":
            this.provinces = Cities.Istanbul
            break
          case "Ankara":
            this.provinces = Cities.Ankara
            break
          case "Adana":
            this.provinces = Cities.Adana
            break
          case "Bursa":
            this.provinces = Cities.Bursa
            break
          case "Gaziantep":
            this.provinces = Cities.Gaziantep
            break
          case "Izmir":
            this.provinces = Cities.Izmir
            break
          case "Konya":
            this.provinces = Cities.Konya
            break
          default:
            this.provinces = ''
        }
      }
    },
    getNeighborhood () {
      if (this.province !== '') {
        this.neighborhoods = this.provinces[this.province]
      }
    },
    setPostalcode () {
      if (this.neighborhood !== '') {
        this.postalcode = this.neighborhoods[this.neighborhood].postcode
      }
    }
  },
  mounted() {
    document.getElementById('city').addEventListener('change', (e) => {
      this.neighborhood = ''
      this.postalcode = ''
      this.getProvinces
    })
    document.getElementById('province').addEventListener('change', (e) => {
      this.postalcode= ''
      this.getNeighborhood
    })
    document.getElementById('neighborhood').addEventListener('change', (e) => {
      this.setPostalcode
    })
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
    .company-form {
      .row {
        width: 100%;
      }
      .row {
        input {
          width: 100%;
          min-width: unset;
          max-width: unset;
        }
        textarea {
          width: 100%;
          min-width: unset;
          max-width: unset;
        }
        .button {
          width: 100%;
          min-width: unset;
          max-width: unset;
        }
        select {
          width: 100%;
          min-width: unset;
          max-width: unset;
        }
        #startingHour, #endingHour {
          width: 100%;
          min-width: unset;
          max-width: unset;
        }
      }
    }
  }
}
</style>