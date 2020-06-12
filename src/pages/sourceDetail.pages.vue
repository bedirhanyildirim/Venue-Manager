<template>
<div id="sourceDetail">
    <Container display="flex" justify-content="left" flex-direction="column">
        <p class="section"><span class="section-name">Kaynak Detay</span><span class="section-cizgi"></span></p>
        <div class="images">
            <img class="big" src="../assets/images/source-img-16x9.jpg"/>
            <div class="small">
                <img class="small" src="../assets/images/source-img-4x3.jpg" />
                <img class="small" src="../assets/images/source-img-4x3.jpg" style="margin-top: 8px;" />
            </div>
        </div>
        <div class="sourceInfos">
            <div class="aboutSource">
                <div class="header">
                    <h2 class="title">{{ source.name }}</h2>
                    <div class="capacity">
                        <img src="../assets/icons/capacity.png" alt="">
                        <h4>{{ source.capacity }}</h4>
                    </div>
                </div>
                <div class="content">
                    <span class="descriptionTitle">Açıklama</span>
                    <span class="description">{{ source.description }}</span>
                    <div class="reservation">
                        <div class="row">
                            <label for="date" class="input-name">Tarih:</label>
                            <input type="date" id="date" name="date" :value="date" @input="setDate($event.target.valueAsDate)">
                        </div>
                        <div class="row">
                            <label for="startingHour" class="input-name">Çalışma Saatleri:</label>
                            <div class="rangehours">
                                <select id="startingHour" class="hour" v-model="startingHour" name="startingHour">
                                    <option value="06">06:00</option>
                                    <option value="07">07:00</option>
                                    <option value="08">08:00</option>
                                    <option value="09">09:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                </select>
                                <span></span>
                                <select id="endingHour" class="hour" v-model="endingHour" name="startingHour">
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" style="justify-content: flex-end; margin-bottom: 0;">
                            <div class="button">
                                <button v-if="loggedIn" @click="fill" id="rezyap">Rezervasyon Yap</button>
                                <router-link v-if="!loggedIn" to="/membership">Giriş Yap</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aboutOwner">
                <span class="contactTitle">İletişim</span>
                <span class="ownerNameSurname">{{ source.company.owner.name }} {{ source.company.owner.surname }}</span>
                <span class="ownerPhone">{{ source.company.phone }}</span>
                <span class="contactTitle" style="margin-top: 20px;">Adres</span>
                <span class="address">{{ source.company.address }}</span>
                <span v-if="amItheOwner" class="youAreOwner">Mekanın sahibi sensin.</span>
            </div>
        </div>
    </Container>
</div>
</template>

<script>
import router from '../router'
import Container from "../components/container"
import { sourcesCollection, activitiesCollection } from '../firebase/index'
import { mapGetters } from 'vuex'
export default {
    name: "sourceDetail.pages",
    router,
    components: { Container },
    data: function () {
        return {
            sourceId: '',
            source: {
                company: {
                    owner: {}
                }
            },
            date: '',
            startingHour: '09',
            endingHour: '17',
            amItheOwner: false
        }
    },
    created() {
        this.sourceId = this.$route.params.id

        sourcesCollection.doc(this.sourceId).get()
            .then(doc => {
                if (doc.exists) {
                    this.source = doc.data()
                    this.source.id = this.sourceId
                    if (this.source.company.owner.uid == this.getUserInfo.uid) {
                        this.amItheOwner = true
                        document.getElementById("rezyap").disabled = true;
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!")
                    router.push('/')
                }
            }).catch(function(error) {
                console.log("Error getting document:", error)
                router.push('/')
            })
    },
    computed: {
        ...mapGetters([
            'getUserInfo',
            'loggedIn'
        ])
    },
    mounted() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        let yyyy = today.getFullYear()

        today = yyyy + '-' + mm + '-' + dd
        this.date = today
    },
    methods: {
        fill: function () {
            console.log('clicked')
            activitiesCollection.add({
                date: this.date,
                isValid: 'waiting',
                source: this.source,
                resMaker: this.getUserInfo,
                endingHour: this.endingHour,
                startingHour: this.startingHour
            }).then(function (res) {
                console.log('başarılı')
                router.push('/')
            }).catch(function (error) {
                console.log(error)
            })
        },
        setDate: function (newDate) {
            let today = newDate;
            let dd = String(today.getDate()).padStart(2, '0')
            let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
            let yyyy = today.getFullYear()

            today = yyyy + '-' + mm + '-' + dd
            this.date = today
        }
    }
}
</script>

<style lang="scss" scoped>
#sourceDetail {
    display: flex;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
}
#sourceDetail {
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
            white-space: nowrap;
        }
        .section-cizgi {
            width: 100%;
            margin-left: 25px;
            border-bottom: 1px solid #dddddd;
        }
    }
    .images {
        width: 100%;
        display: flex;
        margin-top: 25px;
        flex-direction: row;
        justify-content: space-between;
    }
    .images {
        .big {
            width: 708px;
        }
        .small {
            width: 260px;
            display: flex;
            flex-direction: column;
        }
        .small {
            img {
                margin: 0;
                padding: 0;
                width: 260px;
            }
        }
    }
    .sourceInfos {
        width: 100%;
        display: flex;
        margin-top: 25px;
        align-items: start;
        flex-direction: row;
        justify-content: space-between;
    }
    .sourceInfos {
        .aboutSource {
            width: 666px;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            background-color: #ffffff;
            border: 1px solid #dddddd;
        }
        .aboutSource {
            .header {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .header {
                .title {
                    font-size: 24px;
                    font-weight: bold;
                }
                .capacity {
                    display: flex;
                    margin-right: 10px;
                    flex-direction: row;
                    align-items: center;
                }
                .capacity {
                    img {
                        height: 24px;
                        margin-right: 10px;
                    }
                    h4 {
                        color: #707070;
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }
            .content {
                width: 100%;
            }
            .content {
                .descriptionTitle {
                    width: 100%;
                    color: #707070;
                    display: block;
                    font-size: 14px;
                    text-align: left;
                    margin: 20px 0 10px ;
                    font-weight: normal;
                }
                .description {
                    width: 100%;
                    color: #555555;
                    display: block;
                    font-size: 16px;
                    text-align: left;
                    font-weight: normal;
                    margin-bottom: 20px;
                }
                .reservation {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin-top: 40px;
                    flex-direction: column;
                }
                .reservation {
                    .row {
                        width: 100%;
                        display: flex;
                        margin-bottom: 20px;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .row {
                        .input-name {
                            color: #707070;
                            font-size: 16px;
                            white-space: nowrap;
                            font-weight: normal;
                            display: inline-block;
                        }
                        #date {
                            font-family: "Segoe UI";
                            font-size: 14px;
                            width: 330px;
                            padding: 10px 15px;
                            border-radius: 5px;
                            display: inline-block;
                            border: 1px solid #e5e5e5;
                        }
                        .rangehours {
                            width: 360px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                        .rangehours {
                            span {
                                width: 10px;
                                border-bottom: 2px solid #707070;
                            }
                            .hour {
                                width: 100%;
                                cursor: pointer;
                                font-size: 14px;
                                max-width: 150px;
                                padding: 10px 6px;
                                border-radius: 5px;
                                display: inline-block;
                                border: 1px solid #e5e5e5;
                            }
                        }
                        .button {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .button {
                            button {
                                border: none;
                                color: #ffffff;
                                display: block;
                                font-size: 14px;
                                box-shadow: none;
                                padding: 10px 20px;
                                border-radius: 5px;
                                font-weight: normal;
                                white-space: nowrap;
                                background-color: #272E8A;
                            }
                            button:hover:enabled {
                                cursor: pointer;
                            }
                            button:disabled {
                                background-color: #707070;
                            }
                            a {
                                border: none;
                                color: #ffffff;
                                display: block;
                                font-size: 14px;
                                box-shadow: none;
                                padding: 10px 46px;
                                border-radius: 5px;
                                font-weight: normal;
                                white-space: nowrap;
                                background-color: #272E8A;
                            }
                        }
                    }
                }
            }
        }
        .aboutOwner {
            width: 218px;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            background-color: #ffffff;
            border: 1px solid #dddddd;
        }
        .aboutOwner {
            .contactTitle {
                width: 100%;
                color: #707070;
                display: block;
                font-size: 14px;
                text-align: left;
                font-weight: normal;
                margin-bottom: 10px;
            }
            .ownerNameSurname {
                width: 100%;
                color: #555555;
                display: block;
                font-size: 16px;
                text-align: left;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .ownerPhone {
                width: 100%;
                color: #555555;
                display: block;
                font-size: 16px;
                text-align: left;
                font-weight: normal;
                margin-bottom: 10px;
            }
            .address {
                width: 100%;
                color: #555555;
                display: block;
                font-size: 16px;
                text-align: left;
                margin-bottom: 10px;
            }
            .youAreOwner {
                width: 100%;
                color: #551527;
                display: block;
                font-size: 14px;
                text-align: left;
            }
        }
    }
}
</style>