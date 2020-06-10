<template>
<div id="home">
    <container display="flex" justify-content="left">
        <h1>Welcome!</h1>
    </container>
</div>
</template>

<script>
// @ is an alias to /src
import container from '../components/container'
export default {
  name: 'Home',
  components: { container }
}
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
}
</style>