<template>
<div id="aboutcompany">
    <div class="company-info">
        <h4>Şirket Bilgileri</h4>
        <div v-if="!isThereCompany" class="no-company">
            <h2>Kaynak Yönetimi ve Paylaşımı İçin Şirket Oluşturun!</h2>
            <router-link to="/create-company" class="create-company-button">Şirket Oluştur</router-link>
        </div>
        <div v-if="isThereCompany" class="company">
            şirket var
        </div>
    </div>
</div>
</template>

<script>
import store from '../store'
import router from '../router'
import { mapGetters } from 'vuex'
export default {
    name: "aboutcompany.profile",
    store,
    router,
    data: function () {
        return {
            isThereCompany: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfo'
        ])
    }
}
</script>

<style lang="scss" scoped>
#aboutcompany {
    width: 608px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #dddddd;
}
#aboutcompany {
    .company-info {
        width: 100%;
    }
    .company-info {
        h4 {
            color: #707070;
            display: block;
            font-size: 14px;
            text-align: left;
            font-weight: normal;
        }
        .no-company {
            margin: 20px 0;
        }
        .no-company {
            h2 {
                color: #000000;
                font-size: 18px;
                font-weight: normal;
                margin-bottom: 30px;
            }
            .create-company-button {
                color: #ffffff;
                border-radius: 5px;
                padding: 10px 60px;
                background-color: #272E8A;
            }
        }
        .company {

        }
    }
}
</style>