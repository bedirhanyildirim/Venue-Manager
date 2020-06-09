<template>
<div id="profile">
    <Container display="flex" justify-content="left" flex-direction="column">
        <p class="section"><span class="section-name">Profilim</span><span class="section-cizgi"></span></p>
        <div class="content">
            <AboutMe></AboutMe>
        </div>
    </Container>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import Container from "../components/container";
import AboutMe from '../components/aboutme.profile'
export default {
    name: "profile.pages",
    components: { Container, AboutMe },
    store,
    router,
    computed: {
        ...mapGetters([
            'getUser',
            'getUserInfo'
        ])
    }
}
</script>

<style lang="scss" scoped>
#profile {
    display: flex;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
}
#profile {
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
        align-items: flex-start;
    }
    .content {

    }
}
</style>