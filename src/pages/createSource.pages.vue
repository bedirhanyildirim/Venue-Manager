<template>
<div id="createSources">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">Create source</h1>
    <div class="content">
      <div class="left">
        <aboutCompany></aboutCompany>
      </div>
      <div class="right">
        <createSource></createSource>
      </div>
    </div>
  </container>
</div>
</template>

<script>
import container from '../components/container'
import createSource from '../components/form.createSource'
import aboutCompany from '@/components/aboutCompany.manageCompany'
export default {
  name: 'createSource.pages',
  components: { container, createSource, aboutCompany }
}
</script>

<style lang="scss" scoped>
#createSources {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px - 35px);
}
#createSources {
  .welcome {
    width: 100%;
    color: #000000;
    font-size: 24px;
    text-align: left;
    font-weight: 700;
    margin: 32px 0 24px;
    font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  }
  .content {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;
    justify-content: space-between;
  }
  .content {
    .left {
      min-width: 300px;
      margin-right: 40px;
    }

    .right {
      width: 100%;
    }
  }
}
@media screen and (max-width: 768px) {
  #createSources {
    .container {
      .content {
        flex-direction: column;
      }
      .content {
        .left {
          margin: 0;
          width: 100%;
        }
        .right {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>