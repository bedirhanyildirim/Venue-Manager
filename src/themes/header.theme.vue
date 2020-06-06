<template>
    <div id="header">
        <container display="flex" align-items="center" justify-content="space-between">
            <div class="logo">
                <router-link to="/">Kaynak Yönetim Sistemi</router-link>
            </div>
            <div class="content">
                <div class="nav">
                    <router-link to="/membership">Üye Ol / Giriş Yap</router-link>
                </div>
            </div>
        </container>
    </div>
</template>

<script>
import Container from "../components/container";
export default {
    name: "header.theme.vue",
    components: {Container}
}
</script>

<style lang="scss" scoped>
#header {
    display: flex;
    padding: 5px 0;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
}

#header {
    .logo {
        padding: 15px 0;
        font-size: 20px;
        font-weight: bold;
    }
    .logo {
        a {
            color: #272E8A;
        }
    }
    .content {

    }
    .content {
        .nav {
        }

        .nav a {
            color: #303030;
            font-weight: bold;
            margin-left: 15px;
        }

        .nav a.router-link-exact-active {
            color: #272E8A;
        }
    }
}
</style>