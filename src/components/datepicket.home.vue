<template>
<div id="datepicker">
  <div class="container">
    <div class="col city">
      <select id="city" class="city" name="city" v-model="city">
        <option value="" disabled selected>City</option>
        <option v-for="item in this.cityList" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="col province">
      <select id="province" class="province" name="province" v-model="province">
        <option value="" selected>All</option>
        <option v-for="item in Object.keys(this.provinces)" :value="item">{{ item }}</option>
      </select>
    </div>
    <!--div class="col date">
      <input type="date" id="date" name="date" :value="date" @input="setDate($event.target.valueAsDate)">
    </div-->
    <div class="col capacity">
      <input type="number" v-model="capacity" name="capacity" id="capacity" placeholder="Capacity" max="10000" @change="checkCapacity">
    </div>
    <div class="col button">
      <router-link
          :to="{ path: '/result',
                query: {
                  criterias: {
                    date: this.date,
                    city: this.city,
                    capacity: this.capacity,
                    province: this.province
                  }
                }}"
      >Search</router-link>
    </div>
  </div>
</div>
</template>
<script>
import Cities from '@/services'
export default {
  name: 'datepicket.home',
  data: function () {
      return {
        date: '',
        city: '',
        capacity: '',
        province: '',
        provinces: [],
        cityList: Cities.cities,
      }
  },
  computed: {
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
    }
  },
  mounted() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    this.date = today

    document.getElementById('city').addEventListener('change', (e) => {
      this.neighborhood = ''
      this.getProvinces
    })
  },
  methods: {
    find: function () {
      console.log('buldun')
    },
    setDate: function (newDate) {
      let today = newDate
      let dd = String(today.getDate()).padStart(2, '0')
      let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      let yyyy = today.getFullYear()

      today = yyyy + '-' + mm + '-' + dd
      this.date = today
    },
    checkCapacity: function (e) {
      if (e.target.value > 10000) {
        e.target.value = 10000
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#datepicker {
  width: 100%;
  padding: 20px;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
  justify-content: center;

  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}
#datepicker {
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .container {
    .col {
      width: 100%;
      padding: 0 12px;
    }
    .col {
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
      a {
        width: 100%;
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
      a:hover {
        cursor: pointer;
        background-color: #2e39c4;
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #datepicker {
    .container {
      flex-direction: column;
      .col {
        margin: 8px 0;
      }
    }
  }
}
</style>