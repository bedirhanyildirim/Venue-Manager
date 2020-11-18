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
            required: false
        }
    },
    computed: {
        style () {
            return {
                display: this.display,
                alignItems: this.alignItems,
                flexDirection: this.flexDirection,
                justifyContent: this.justifyContent,
                backgroundColor: this.backgroundColor
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
@media screen and (min-width: 1128px) {
  .container {
    padding: 0 80px!important;
  }
}
@media screen and (min-width: 950px) and (max-width: 1128px) {
  .container {
    padding: 0 40px!important;
  }
}
@media screen and (min-width: 744px) and (max-width: 950px) {
  .container {
    padding: 0 40px!important;
  }
}
@media screen and (min-width: 375px) and (max-width: 744px) {
  .container {
    padding: 0 24px!important;
  }
}
</style>
