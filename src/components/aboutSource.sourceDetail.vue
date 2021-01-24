<template>
  <div id="aboutSource">
    <div class="container">
      <div class="images">
        <div class="col col-1">
          <div class="image-1"></div>
        </div>
        <div class="col col-2">
          <div class="image-2"></div>
          <div class="image-3"></div>
        </div>
      </div>
      <div class="details">
        <div class="header">
          <h2 class="title">{{ source.name }}</h2>
          <div class="capacity">
            <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z"/><path d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z"/><path d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z"/><path d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z"/></g></svg>
            {{ source.capacity }}
          </div>
        </div>
        <div class="content">
          <div class="desc">
            <p>{{ source.description }}</p>
          </div>
          <div class="form">
            <div class="row">
              <label class="input-name" for="date">Date</label>
              <input id="date" :value="date" @change="dateChange" type="date">
            </div>
            <div class="row">
              <label for="startingHour" class="input-name">Hours</label>
              <div class="range-hours">
                <div class="row">
                  <label for="startingHour" class="sub-input-name">From</label>
                  <select id="startingHour" class="hour" v-model="startingHour" name="startingHour">
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
                  </select>
                </div>
                <div class="row">
                  <label for="endingHour" class="sub-input-name">To</label>
                  <select id="endingHour" class="hour" v-model="endingHour" name="startingHour">
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
                  </select>
                </div>
                <div class="row">
                  <div class="button">
                    <button @click="add" :disabled="amItheOwner || !loggedIn">Book</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {activitiesCollection} from "@/firebase";
import router from "@/router";

export default {
  name: 'aboutSource.sourceDetail.vue',
  data: function () {
    return {
      endingHour: '',
      startingHour: '',
      date: new Date().toISOString().slice(0,10)
    }
  },
  props: {
    source: {
      type: Object,
      required: true
    },
    amItheOwner: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    dateChange: function (e) {
      this.date = e.target.value
    },
    add: function () {
      let descString = 'Booked by ' + this.getUserInfo.name + ' ' + this.getUserInfo.surname
      activitiesCollection.add({
        title: 'Reservation',
        date: this.date,
        description: descString,
        isValid: 'waiting',
        canceled: false,
        source: this.source,
        resMaker: this.getUserInfo,
        endingHour: this.endingHour,
        startingHour: this.startingHour
      }).then(function (res) {
        router.push('/my-reservations')
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'loggedIn'
    ])
  }
}
</script>
<style lang="scss" scoped>
#aboutSource {
  width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}
#aboutSource {
  .container {
    width: 100%;
  }
  .container {
    .images {
      width: 100%;
      height: 300px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      border-bottom: 1px solid #efefef;
    }
    .images {
      .col {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .col-1 {
        order: 1;
        width: calc(300px/9*16);
        height: 100%;
      }
      .col-2 {
        order: 2;
        height: 100%;
      }
      .col {
        .image-1 {
          width: 100%;
          height: 100%;
          background-color: #272E8A;
        }
        .image-2 {
          width: 100%;
          height: 100%;
          background-color: #2e39c4;
        }
        .image-3 {
          width: 100%;
          height: 100%;
          background-color: #303030;
        }
      }
    }
    .details {
      width: 100%;
      padding: 24px;
    }
    .details {
      .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .header {
        .title {
          color: #303030;
          text-align: left;
        }
        .capacity {
          display: flex;
          font-size: 18px;
          align-items: center;
          font-weight: bolder;
          flex-direction: row;
          justify-content: right;
        }
        .capacity {
          svg {
            fill: #303030;
            margin-right: 12px;
          }
        }
      }
      .content {
        margin-top: 20px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }
      .content {
        .desc {
          width: 100%;
          text-align: left;
          text-wrap: normal;
          margin-right: 48px;
        }
        .desc {
          p {
            color: #000000;
            font-size: 16px;
            font-weight: normal;
          }
        }
        .form {
          width: 100%;
          display: flex;
          max-width: 400px;
          align-items: baseline;
          flex-direction: column;
        }
        .form {
          .row {
            width: 100%;
            display: flex;
            align-items: baseline;
            flex-direction: column;
            justify-content: center;
          }
          .row:first-child {
            label {
              margin-top: 0;
            }
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
            .button {
              width: 100%;
              display: flex;
              margin-top: 24px;
              align-items: center;
              justify-content: flex-start;
            }
            button {
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
            button:hover:enabled {
              cursor: pointer;
              background-color: #2e39c4;
            }
            button:disabled {
              background-color: #303030;
            }
            button:hover:disabled {
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
}
</style>