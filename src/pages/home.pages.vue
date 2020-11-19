<template>
<div id="home">
    <container display="flex" justify-content="left" flex-direction="column">
        <p class="section"><span class="section-name">Kaynak Listesi</span><span class="section-cizgi"></span></p>
        <div class="content">
            <!--DatePicker></--DatePicker-->
            <!--Sources></Sources-->
        </div>
    </container>
</div>
</template>

<script>
import container from '../components/container'
import DatePicker from '../components/datepicket.home'
import Sources from '../components/sources.home'
export default {
  name: 'Home',
  components: { container, DatePicker, Sources }
}
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
}
#home {
  .section {
      width: 100%;
      display: flex;
      text-align: left;
      align-items: center;
  }
  .section {
      .section-name {
          color: #707070;
          font-size: 14px;
          white-space: nowrap;
      }
      .section-cizgi {
          width: 100%;
          margin-left: 25px;
          border-bottom: 1px solid #dddddd;
      }
  }
  .content {
      width: 100%;
      display: flex;
      margin-top: 20px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
  }
  .content {

  }
}
</style>