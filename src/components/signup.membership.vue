<template>
<div id="signup">
    <div class="row">
        <label for="signup-email" class="input-name">Email:</label>
        <input id="signup-email" type="text" v-model="email" name="email"/>
    </div>
    <div class="row">
        <label for="password" class="input-name">Şifre:</label>
        <input id="password" type="password" v-model="password" name="password"/>
    </div>
    <div class="row" style="justify-content: center">
        <div class="button">
            <button @click="signup">Üye Ol</button>
        </div>
    </div>
    <div class="divider"></div>
    <div class="signin">
        <span>Zaten üye misin?</span>
        <a href="javascript:;" @click="signin">Giriş Yap</a>
    </div>
</div>
</template>

<script>
export default {
    name: "singup.membership",
    data: function () {
        return {
            email: '',
            password: ''
        }
    },
    mounted: function () {
        document.querySelector('input[name=email]').focus()
    },
    methods: {
        signup: function () {
            console.log("click")
        },
        signin: function () {
            this.$emit('goToSignin')
        }
    }
}
</script>

<style lang="scss" scoped>
.divider {
    margin: 20px 0;
    border-bottom: 2px dashed #e5e5e5;
}
#signup {
    padding: 30px;
    border-radius: 5px;
    animation: fadeIn 1s;
    background-color: #fafafa;
    border: 1px solid #e5e5e5;
    -webkit-animation: fadeIn 1s;
}
#signup {
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
    span {
        display: block;
        font-size: 14px;
    }
    .signin {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .signin {
        span {
            color: #000000;
            font-size: 14px;
            margin-right: 10px;
        }
        a {
            color: #004680;
            font-weight: bold;
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