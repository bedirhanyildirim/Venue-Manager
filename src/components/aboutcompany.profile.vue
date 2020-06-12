<template>
<div id="aboutcompany">
    <div class="company-info">
        <h4>Şirket Bilgileri</h4>
        <div v-if="!isThereCompany" class="no-company">
            <h2>Kaynak Yönetimi ve Paylaşımı İçin Şirket Oluşturun!</h2>
            <router-link to="/create-company" class="create-company-button">Şirket Oluştur</router-link>
        </div>
        <div v-if="isThereCompany" class="company">
            <img src="../assets/images/company-img.png" alt="company logo">
            <div class="infos">
                <h3>{{ company.name }}</h3>
                <h4>{{ company.address }}</h4>
            </div>
        </div>
        <Sources v-if="isThereCompany" :company="this.company"></Sources>
        <Activities v-if="isThereCompany" :company="this.company"></Activities>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { companiesCollection } from '../firebase/index'
import Sources from '../components/sources.profile'
import Activities from '../components/activities.profile'
export default {
    name: "aboutcompany.profile",
    components: { Sources, Activities },
    data: function () {
        return {
            isThereCompany: false,
            company: {}
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfo'
        ])
    },
    mounted() {
        // if exists
        companiesCollection.doc(this.getUserInfo.uid).get()
            .then(doc => {
                if (doc.exists) {
                    this.company = doc.data()
                    this.isThereCompany = true
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!")
                    this.isThereCompany = false
                }
            }).catch(function(error) {
                console.log("Error getting document:", error)
            })
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
        .no-company, .company {
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
            width: 100%;
            display: flex;
            text-align: left;
            align-items: end;
            flex-direction: row;
            justify-content: flex-start;
        }
        .company {
            img {
                width: 120px;
                height: 120px;
                margin-right: 20px;
            }
            .infos {
                margin-top: 15px;
            }
            .infos {
                h3 {
                    color: #000000;
                    font-size: 18px;
                    font-weight: normal;
                    margin-bottom: 10px;
                }
                h4 {
                    color: #505050;
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>