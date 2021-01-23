<template>
    <div class="container" :style="style">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'container',
  props: {
    display: {
      type: String,
      required: true,
      default: 'flex'
    },
    alignItems: {
      type: String,
      required: false,
      default: 'center'
    },
    justifyContent: {
      type: String,
      required: false,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'transparent'
    },
    flexDirection: {
      type: String,
      required: false,
      default: 'row'
    },
    minHeight: {
      type: String,
      required: false,
      default: 'calc(100vh - (115px))'
    }
  },
  computed: {
    style () {
      return {
        display: this.display,
        minHeight: this.minHeight,
        alignItems: this.alignItems,
        flexDirection: this.flexDirection,
        justifyContent: this.justifyContent,
        backgroundColor: this.backgroundColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 1440px) {
  .container {
    max-width: 1600px;
  }
}
@media screen and (min-width: 1024px) {
  .container {
    padding: 0 80px!important;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 0 40px!important;
  }
}
@media screen and (min-width: 425px) and (max-width: 768px) {
  .container {
    padding: 0 24px!important;
  }
}
@media screen and (max-width: 425px){
  .container {
    padding: 0 8px!important;
  }
}
</style>
