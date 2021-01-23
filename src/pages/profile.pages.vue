<template>
<div id="profile">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">My profile</h1>
    <div class="content">
      <div class="left">
        <AboutMe></AboutMe>
      </div>
      <div class="right">
        <AboutCompany></AboutCompany>
      </div>
    </div>
  </container>
</div>
</template>

<script>
import container from '../components/container'
import AboutMe from '../components/aboutme.profile'
import AboutCompany from '../components/aboutcompany.profile'

export default {
  name: 'profile.pages',
  components: { container, AboutMe, AboutCompany }
}
</script>

<style lang="scss" scoped>
#profile {
  display: flex;
  align-items: center;
  justify-content: center;
}
#profile {
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
    align-items: flex-start;
    justify-content: space-between;
  }
  .content {
    .left {
      margin-right: 40px;
    }

    .right {
      width: 100%;
    }
  }
}
@media screen and (max-width: 768px) {
  #profile {
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