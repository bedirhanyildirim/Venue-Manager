<template>
<div id="reservations">
  <div v-if="activities.length > 0"  class="sources-info">
    <div class="row">
      <h3>My reservations</h3>
    </div>
    <div class="source-list">
      <div class="source" v-for="act in activities" @click="goTo(act.id)">
        <div class="imgandtitle">
          <img src="../assets/images/source-img.jpg" alt="">
          <h3>{{ act.data.source.name }} </h3>
          <h5 v-if="act.data.isValid == 'waiting'" style="color: blue; margin-right: 50px;"> (Pending)</h5>
          <h5 v-if="act.data.isValid == 'accepted'" style="color: green; margin-right: 50px;"> (Accepted)</h5>
          <h5 v-if="act.data.isValid == 'rejected'" style="color: red; margin-right: 50px;"> (Rejected)</h5>
        </div>
        <div class="capacity">
          <svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,14c1.381,0,2.631-0.56,3.536-1.465C16.44,11.631,17,10.381,17,9s-0.56-2.631-1.464-3.535C14.631,4.56,13.381,4,12,4   S9.369,4.56,8.464,5.465C7.56,6.369,7,7.619,7,9s0.56,2.631,1.464,3.535C9.369,13.44,10.619,14,12,14z"/><path d="M20,15c0.69,0,1.315-0.279,1.768-0.731c0.453-0.452,0.732-1.077,0.732-1.769c0-0.69-0.279-1.315-0.732-1.768   C21.315,10.279,20.69,10,20,10c-0.691,0-1.316,0.279-1.769,0.732C17.779,11.185,17.5,11.81,17.5,12.5   c0,0.691,0.279,1.316,0.731,1.769S19.309,15,20,15z"/><path d="M20,15.59c-1.331,0-2.332,0.406-2.917,0.968C15.968,15.641,14.205,15,12,15c-2.266,0-3.995,0.648-5.092,1.564   C6.312,15.999,5.3,15.59,4,15.59c-2.188,0-3.5,1.09-3.5,2.182c0,0.545,1.312,1.092,3.5,1.092c0.604,0,1.146-0.051,1.623-0.133   c-0.01,0.091-0.04,0.18-0.04,0.27c0,1,2.406,2,6.417,2c3.762,0,6.417-1,6.417-2c0-0.085-0.011-0.17-0.02-0.255   c0.463,0.073,0.995,0.118,1.603,0.118c2.051,0,3.5-0.547,3.5-1.092C23.5,16.68,22.127,15.59,20,15.59z"/><path d="M4,15c0.69,0,1.315-0.279,1.768-0.732C6.221,13.815,6.5,13.19,6.5,12.5c0-0.689-0.279-1.314-0.732-1.768   C5.315,10.28,4.69,10,4,10c-0.691,0-1.316,0.28-1.769,0.732C1.779,11.186,1.5,11.811,1.5,12.5c0,0.69,0.279,1.315,0.731,1.768   C2.684,14.721,3.309,15,4,15z"/></g></svg>
          <h4>{{ act.data.source.capacity }}</h4>
          <h3>{{ act.data.source.company.region }} / {{ act.data.source.company.city }}</h3>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="error">
    <h3>There is no reservation.</h3>
  </div>
</div>
</template>
<script>
import router from '../router'

export default {
  name: 'reservations.myResevations',
  router,
  props: {
    activities: {
      required: true,
      type: Array,
      default: []
    }
  },
  methods: {
    goTo: function (activityId) {
      router.push('/reservation/' + activityId)
    }
  }
}
</script>

<style lang="scss" scoped>
#reservations {
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
#reservations {
  .sources-info {
    width: 100%;
  }
  .sources-info {
    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .row {
      h3 {
        color: #707070;
        font-size: 16px;
        text-align: left;
        font-weight: 500;
        line-height: initial;
        display: inline-block;
      }
    }
    .source-list {
      margin: 20px 0 0 0;
    }
    .source-list {
      .source {
        width: 100%;
        padding: 8px;
        display: flex;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        transition: background-color 300ms ease;
      }
      .source:nth-child(even) {
        background-color: #fafafa;
      }
      .source:last-child {
        margin-bottom: 0;
      }
      .source:hover {
        cursor: pointer;
        background-color: #f7f7f7;

        .capacity {
          svg {
            fill: #000000;
          }
          h3 {
            color: #000000;
          }
        }
      }
      .source {
        .imgandtitle {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        .imgandtitle {
          img {
            width: auto;
            height: 60px;
            margin-right: 20px;
          }
          h3 {
            color: #000000;
            font-size: 16px;
            font-weight: 500;
          }
        }
        .capacity {
          display: flex;
          margin-right: 10px;
          flex-direction: row;
          align-items: center;
          transition: all 300ms ease;
        }
        .capacity {
          svg {
            width: auto;
            height: 24px;
            fill: #505050;
            margin-right: 10px;
          }
          h4 {
            color: #505050;
            font-size: 18px;
            font-weight: bold;
          }
          h3 {
            color: #505050;
            font-size: 16px;
            margin-left: 20px;
            font-weight: normal;
          }
        }
      }
    }
  }
  .error {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h3 {
      color: #000000;
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      font-weight: normal;
    }
  }
}
</style>