<template>
    <div id="header">
        <container display="flex" align-items="center" justify-content="space-between">
            <div class="logo">
                <router-link to="/">Kaynak Yönetim Sistemi</router-link>
            </div>
            <div class="content">
                <div class="nav">
                    <router-link v-if="!loggedIn" to="/membership">Üye Ol / Giriş Yap</router-link>
                    <span v-if="getUserInfo">Hoşgeldin, {{ getUserInfo.name }}</span>
                    <a v-if="loggedIn" href="javascript:;" @click="logout">Çıkış Yap</a>
                </div>
            </div>
        </container>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import Container from "../components/container";
export default {
    name: "header.theme.vue",
    store,
    router,
    components: {Container},
    computed: {
        ...mapGetters([
            'getUser',
            'getUserInfo',
            'loggedIn'
        ])
    },
    methods: {
        logout: function () {
            firebase.auth().signOut().catch(function (err) {
                console.log(err)
            }).then(_ => {
                this.$store.dispatch('logOut')
                router.push('/membership');
            })
        }
    }
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