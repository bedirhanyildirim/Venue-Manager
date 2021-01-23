<template>
<div id="company">
  <container display="flex" justify-content="left" flex-direction="column">
    <h1 class="welcome">My company</h1>
    <div class="content">
      <div class="left">
        <aboutCompany></aboutCompany>
      </div>
      <div class="right">
        <sourcesCompany></sourcesCompany>
      </div>
    </div>
  </container>
</div>
</template>

<script>
import aboutCompany from "@/components/aboutCompany.manageCompany";
import sourcesCompany from "@/components/sources.manageCompany";
import container from "@/components/container";
export default {
  name: "manageCompany.pages",
  components: { container, aboutCompany, sourcesCompany }
}
</script>

<style lang="scss" scoped>
#company {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px - 35px);
}
#company {
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
      min-width: 300px;
      margin-right: 40px;
    }

    .right {
      width: 100%;
    }
  }
}
@media screen and (max-width: 768px) {
  #company {
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