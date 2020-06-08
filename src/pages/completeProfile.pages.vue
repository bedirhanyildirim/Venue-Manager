<template>
<div id="completeProfile">
    <container display="flex">
        <div class="content">
            <h3 class="logo">Kaynak Yönetim Sistemi</h3>
            <h5 class="welcome">Profil Bilgilerini Tamamla</h5>
            <complete-profile-component></complete-profile-component>
        </div>
    </container>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import container from '../components/container'
import completeProfileComponent from '../components/complete.completeProfile'
import { mapGetters } from 'vuex'
import { usersCollection } from '../firebase/index'
export default {
    name: "completeProfile.pages",
    components: { container, completeProfileComponent },
    store,
    router,
    data: function () {
        return {
            name: '',
            surname: '',
            mobile: '',
            email: ''
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    created () {
        // if exists
        usersCollection.doc(this.getUser.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data())
                router.push("/")
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!")
            }
        }).catch(function(error) {
            console.log("Error getting document:", error)
        })
    }
}
</script>

<style lang="scss" scoped>
#completeProfile {
    display: flex;
    height: calc(100vh - 96px);
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