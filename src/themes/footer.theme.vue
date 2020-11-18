<template>
  <div id="footer">
    <container display="flex" align-items="center" justify-content="center">
      <h5>Developed by <a href="http://bedirhanyildirim.com" target="_blank">Bedirhan Yıldırım</a></h5>
    </container>
  </div>
</template>

<script>
import Container from "@/components/container";
export default {
  name: 'footer.theme.vue',
  components: {Container}
}
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;

  -webkit-box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
  box-shadow: 0px -1px 12px 0px rgba(0,0,0,0.1);
}

#footer {
  h5 {
    padding: 8px 0;
    font-size: 14px;
    font-weight: normal;
  }
  a {
    color: #004680;
    font-weight: bold;
  }
}
</style>
