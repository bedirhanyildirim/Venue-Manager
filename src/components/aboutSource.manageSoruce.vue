<template>
<div id="aboutSource">
  <div class="loading" v-if="!this.sourceObject.name">
    Loading..
  </div>
  <div class="aboutSource" v-else>
    <div class="row">
      <label class="input-name" for="name">Source name</label>
      <input id="name" :value="this.sourceObject.name" name="name" type="text"/>
    </div>
    <div class="row">
      <label class="input-name" for="description" style="margin-top: 10px;">Description</label>
      <textarea id="description" :value="this.sourceObject.description" name="address" rows="4 " type="text"></textarea>
    </div>
    <div class="row">
      <label class="input-name" for="capacity">Capacity</label>
      <input id="capacity" :value="this.sourceObject.capacity" name="phone" type="text"/>
    </div>
    <div class="row">
      <div class="sharedUsage" for="sharedUsage">
        <input id="sharedUsage" :checked="this.sourceObject.sharedUsage" type="checkbox">
        <svg @click="toggle" v-if="this.sourceObject.sharedUsage" baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.972,6.251c-0.967-0.538-2.185-0.188-2.72,0.777l-3.713,6.682l-2.125-2.125c-0.781-0.781-2.047-0.781-2.828,0  c-0.781,0.781-0.781,2.047,0,2.828l4,4C9.964,18.792,10.474,19,11,19c0.092,0,0.185-0.006,0.277-0.02  c0.621-0.087,1.166-0.46,1.471-1.009l5-9C18.285,8.005,17.937,6.788,16.972,6.251z"/></svg>
        <label for="sharedUsage">Shared usage <i>(will seen on homepage)</i></label>
      </div>
    </div>
    <div class="row">
      <div class="button">
        <button>Save</button>
      </div>
    </div>
    <div class="row">
      <label class="input-name" for="photos">Photos</label>
      <input id="photos" name="photos" type="file" multiple/>
      <label for="photos">Choose photos</label>
    </div>
  </div>
</div>
</template>

<script>
import { sourcesCollection } from "@/firebase";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  name: 'aboutSource.manageSoruce',
  data: function () {
    return {
      sourceId: '',
      sourceObject: {}
    }
  },
  beforeMount() {
    this.sourceId = this.$route.params.id
    sourcesCollection.doc(this.sourceId).get()
        .then(doc => {
          if (doc.exists) {
            this.sourceObject = doc.data()
            this.sourceObject.id = this.sourceId
            //console.log(this.sourceObject)
            if (this.sourceObject.company.owner.uid == this.getUserInfo.uid) {
              this.amItheOwner = true
            } else {
              router.push('/')
            }
          } else {
            console.log('There is not a such a doc!')
          }
        }).catch(function(error) {
          console.log('Error getting document:', error)
        })
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    toggle: function () {
      this.sourceObject.sharedUsage = this.sourceObject.sharedUsage
      document.getElementById("sharedUsage").checked = !document.getElementById("sharedUsage").checked
    }
  }
}
</script>

<style lang="scss" scoped>
#aboutSource {
  width: 100%;
  padding: 20px;
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.18);
}
#aboutSource {
  .loading {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .aboutSource {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .aboutSource {
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
        font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
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
      [type="file"] {
        border: 0;
        padding: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
        white-space: nowrap;
        clip: rect(0, 0, 0, 0);
        position: absolute !important;

        + label {
          // File upload button styles
          height: 40px;
          outline: none;
          display: block;
          color: #2e39c4;
          cursor: pointer;
          font-weight: 500;
          min-width: 100px;
          max-width: 200px;
          box-shadow: none;
          appearance: none;
          line-height: 20px;
          padding: 10px 16px;
          text-align: center;
          border-radius: 8px;
          transition: all 0.3s;
          background-color: #ffffff;
          border: 1px solid #2e39c4;
        }

        &:focus + label,
        + label:hover {
          // File upload hover state button styles
          color: #ffffff;
          background-color: #2e39c4;
        }

        &:focus + label {
          // File upload focus state button styles
        }
      }
      .button {
        width: 100%;
        display: flex;
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
    }
    .row:first-child {
      label {
        margin-top: 0;
      }
    }
    .row:last-child {
      margin-bottom: 0;
    }
  }
}
</style>