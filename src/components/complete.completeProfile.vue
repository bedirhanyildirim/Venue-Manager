<template>
<div id="complete">
    <div class="row">
        <label for="username" class="input-name">Kullanıcı Adı:</label>
        <input id="username" type="text" v-model="username" name="username" disabled/>
    </div>
    <div class="row">
        <label for="email" class="input-name">Email:</label>
        <input id="email" type="text" v-model="email" name="email" disabled/>
    </div>
    <div class="row">
        <label for="name" class="input-name">Ad:</label>
        <input id="name" type="text" v-model="name" name="name"/>
    </div>
    <div class="row">
        <label for="surname" class="input-name">Soyad:</label>
        <input id="surname" type="text" v-model="surname" name="surname"/>
    </div>
    <div class="row">
        <label for="mobile" class="input-name">Telefon No:</label>
        <input id="mobile" type="text" v-model="mobile" name="mobile"/>
    </div>
    <div class="row" style="justify-content: center; margin-bottom: 0;">
        <div class="button">
            <button @click="fill">Kaydet</button>
        </div>
    </div>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
import { usersCollection } from '../firebase/index'
export default {
    name: "complete.completeProfile",
    store,
    router,
    data: function () {
        return {
            name: '',
            surname: '',
            mobile: '',
            email: '',
            username: ''
        }
    },
    computed: {
        ...mapGetters([
            'getUser',
            'loggedIn'
        ])
    },
    created () {
        this.email = this.getUser.email
        this.username = this.email.split('@')[0]
    },
    methods: {
        fill: function () {
            usersCollection.doc(this.getUser.uid).set({
                uid: this.getUser.uid,
                email: this.getUser.email,
                username: this.username,
                name: this.name,
                surname: this.surname,
                mobile: this.mobile
            }).then(res => {
                console.log("Başarılı: " + res)
                this.$store.dispatch('setUserInfo', {
                    uid: this.getUser.uid,
                    email: this.getUser.email,
                    username: this.username,
                    name: this.name,
                    surname: this.surname,
                    mobile: this.mobile
                })
                router.push("/")
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#complete {
    padding: 30px;
    border-radius: 5px;
    animation: fadeIn 1s;
    background-color: #fafafa;
    border: 1px solid #e5e5e5;
    -webkit-animation: fadeIn 1s;
}
#complete {
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .input-name {
        color: #707070;
        font-size: 16px;
        margin-right: 10px;
        font-weight: normal;
        display: inline-block;
    }
    input {
        width: 250px;
        font-size: 14px;
        padding: 10px 6px;
        border-radius: 5px;
        display: inline-block;
        border: 1px solid #e5e5e5;
    }
    input:focus {
        box-shadow: 0px 0px 3px 0px rgba(0,70,128,.75);
    }
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .button {
        button {
            width: 100%;
            color: #ffffff;
            display: block;
            font-size: 14px;
            box-shadow: none;
            padding: 10px 40px;
            border-radius: 5px;
            font-weight: normal;
            border: 1px solid #e5e5e5;
            background-color: #004680;
        }
        button:hover:enabled {
            cursor: pointer;
        }
    }
}
@-webkit-keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>