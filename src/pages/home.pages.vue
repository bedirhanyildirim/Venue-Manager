<template>
<div id="home">
  <container display="flex" justify-content="left" flex-direction="column">
    <div class="content">
      <DatePicker></DatePicker>
      <mySources style="margin-top: 40px"></mySources>
      <Sources></Sources>
    </div>
  </container>
</div>
</template>

<script>
import container from '../components/container'
import Sources from '../components/sources.home'
import DatePicker from '../components/datepicket.home'
import mySources from '../components/mySources.home'

export default {
  name: 'Home',
  components: { container, DatePicker, Sources, mySources }
}
</script>

<style lang="scss" scoped>
#home {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#home {
  .content {
    width: 100%;
    display: flex;
    margin: 40px 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
}
</style>