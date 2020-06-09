<template>
<div id="aboutme">
    <div class="profile-photo">
        <img src="../assets/images/pp-img.jpg"/>
    </div>
    <div class="infos">
        <h3 class="name-surname">{{getUserInfo.name}} {{getUserInfo.surname}}</h3>
        <h3 class="username">@{{getUserInfo.username}}</h3>
        <h3 class="email">{{getUserInfo.email}}</h3>
        <h3 class="phone">{{getUserInfo.mobile}}</h3>
    </div>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
export default {
    name: "aboutme.profile",
    store,
    router,
    computed: {
        ...mapGetters([
            'getUserInfo'
        ])
    }
}
</script>

<style lang="scss" scoped>
#aboutme {
    width: 298px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #dddddd;
}
#aboutme {
    .profile-photo {

    }
    .profile-photo {
        img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }
    }
    .infos {
        margin-top: 20px;
    }
    .infos {
        .name-surname {
            font-size: 18px;
            font-weight: 700;
        }
        .username, .email, .phone {
            color: #707070;
            font-size: 14px;
            margin-top: 10px;
            font-weight: normal;
        }
    }
}
</style>