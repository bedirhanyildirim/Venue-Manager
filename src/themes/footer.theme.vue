<template>
  <div id="footer">
    <container display="flex" align-items="center" justify-content="center" min-height="auto">
      <h5>Developed by <a href="http://bedirhanyildirim.com" target="_blank">Bedirhan YILDIRIM</a></h5>
    </container>
  </div>
</template>

<script>
import Container from "@/components/container";
export default {
  name: 'footer.theme.vue',
  components: { Container }
}
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;

  box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
  -webkit-box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
}
#footer {
  h5 {
    padding: 8px 0;
    font-size: 14px;
    font-weight: normal;
  }
  a {
    color: #272E8A;
    font-weight: bold;
  }
}
</style>
