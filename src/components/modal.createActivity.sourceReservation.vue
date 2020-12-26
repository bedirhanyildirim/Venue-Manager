<template>
<div id="modal">
  <div class="modal" v-on-clickaway="away">
    hi
  </div>
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'modal.createActivity.sourceReservation',
  mixins: [ clickaway ],
  methods: {
    away: function () {
      this.$emit('away', false)
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
    padding: 20px;
    color: #000000;
    width: 500px;
    min-width: 300px;
    border-radius: 8px;
    position: relative;
    background-color: #ffffff;
  }
}
</style>