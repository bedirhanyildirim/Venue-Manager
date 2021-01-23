<template>
  <div id="app">
    <header-theme></header-theme>
    <router-view/>
    <footer-theme></footer-theme>
  </div>
</template>

<script>
import HeaderTheme from './themes/header.theme'
import FooterTheme from './themes/footer.theme'
export default {
  name: 'App',
  components: { HeaderTheme, FooterTheme }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
