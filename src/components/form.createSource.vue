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
      <input id="capacity" v-model="capacity" name="phone" type="number"/>
    </div>
    <div class="row">
      <div class="sharedUsage">
        <input id="sharedUsage" v-model="sharedUsage" type="checkbox">
        <svg @click="toggle" v-if="sharedUsage" baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.972,6.251c-0.967-0.538-2.185-0.188-2.72,0.777l-3.713,6.682l-2.125-2.125c-0.781-0.781-2.047-0.781-2.828,0  c-0.781,0.781-0.781,2.047,0,2.828l4,4C9.964,18.792,10.474,19,11,19c0.092,0,0.185-0.006,0.277-0.02  c0.621-0.087,1.166-0.46,1.471-1.009l5-9C18.285,8.005,17.937,6.788,16.972,6.251z"/></svg>
        <label for="sharedUsage">Shared usage <i>(Display in the homepage)</i></label>
      </div>
      <div class="button">
        <button @click="fill">Create</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import {mapGetters} from 'vuex'
import { sourcesCollection, companiesCollection } from '../firebase/index'
export default {
  name: 'form.createSource',
  router,
  data: function () {
    return {
      name: '',
      date: '',
      company: {},
      capacity: '',
      sourceId: '',
      description: '',
      sharedUsage: false
    }
  },
  mounted() {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth()
    let d = date.getDate()
    this.date = (d+'.'+(m+1)+'.'+y)
  },
  created() {
    companiesCollection.doc(this.getUserInfo.uid).get()
      .then(doc => {
        if (doc.exists) {
          this.company = doc.data()
          this.company.id = doc.id
        }
      }).catch(function (error) {
        console.log(error)
        console.log(error.code)
      })
  },
  methods: {
    fill: function () {
      let sourceObject = {
        name: this.name,
        date: this.date,
        company: this.company,
        capacity: this.capacity,
        description: this.description,
        sharedUsage: this.sharedUsage
      }
      sourcesCollection.doc().set(sourceObject)
        .then(function (res) {
          router.push('/company')
        }).catch(function (error) {
          console.log(error)
          console.log(error.code)
        })
    },
    toggle: function () {
      this.sharedUsage = !this.sharedUsage
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
        max-width: 400px;
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
        max-width: 400px;
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
        max-width: 400px;
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
  #sourceform {
    .company-form {
      max-width: unset !important;
    }
    .company-form {
      .row {

      }
      .row {
        input, textarea {
          width: 100%;
          max-width: unset;
          min-width: unset;
        }
      }
    }
  }
}
</style>