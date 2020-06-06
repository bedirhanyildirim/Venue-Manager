<template>
<div id="membership">
    <container display="flex" align-items="center" justify-content="center">
        <div class="content">
            <h3 class="logo">Kaynak Yönetim Sistemi</h3>
            <h5 class="welcome">Hoşgeldin</h5>
            a
        </div>
    </container>
</div>
</template>

<script>
import container from '../components/container'
export default {
    name: "Membership",
    components: { container }
}
</script>

<style lang="scss">
#header {
    display: none!important;
}
#footer {
    display: none!important;
}
#membership {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
.container {
     .content {
         padding: 50px 0;
         transition: opacity 1s ease-out;
     }
     .content {
         .logo {
             font-size: 24px;
             text-align: center;
             margin-bottom: 20px;
         }
         .welcome {
             font-size: 18px;
             text-align: center;
             margin-bottom: 30px;
             font-weight: normal;
         }
     }
 }
</style>