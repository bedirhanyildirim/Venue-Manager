<template>
<div id="sourceform" style="margin-bottom: 50px">
    <div class="company-info">
        <h4>Kaynak Ekle</h4>
        <div class="company-form">
            <div class="row">
                <label for="name" class="input-name">Kaynak Adı:</label>
                <input id="name" type="text" v-model="name" name="name"/>
            </div>
            <div class="row" style="align-items: start;">
                <label for="description" class="input-name" style="margin-top: 10px;">Açıklama:</label>
                <textarea id="description" type="text" v-model="description" name="address" rows="4 "></textarea>
            </div>
            <div class="row">
                <label for="capacity" class="input-name">Kişi Sayısı:</label>
                <input id="capacity" type="text" v-model="capacity" name="phone"/>
            </div>
            <label style="width: 100%;
                            text-align: left;
                            display: block;
                            margin: 40px 0 20px;
                            color: #707070;
                            font-size: 16px;
                            white-space: nowrap;
                            font-weight: normal;">Program:</label>
            <div class="row">
                <FullCalendar :events="events" :options="options" style="height: 600px;"/>
            </div>
            <div class="row">
                <label for="date" class="input-name">Tarih:</label>
                <input type="date" id="date" name="date" :value="date" disabled>
            </div>
            <div class="row">
                <label for="startingHour" class="input-name">Aktivite Saatleri:</label>
                <div class="rangehours">
                    <select id="startingHour" class="hour" v-model="startingHour" name="startingHour">
                        <option value="06">06:00</option>
                        <option value="07">07:00</option>
                        <option value="08">08:00</option>
                        <option value="09">09:00</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                        <option value="19">19:00</option>
                        <option value="20">20:00</option>
                        <option value="21">21:00</option>
                        <option value="22">22:00</option>
                    </select>
                    <span></span>
                    <select id="endingHour" class="hour" v-model="endingHour" name="startingHour">
                        <option value="06">06:00</option>
                        <option value="07">07:00</option>
                        <option value="08">08:00</option>
                        <option value="09">09:00</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
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
            <div class="row" style="justify-content: flex-end; margin-right: 70px">
                <a href="javascript:;" @click="ekle">Ekle</a>
            </div>
            <div class="row" style="justify-content: space-between; margin-bottom: 0;">
                <div class="sharedUsage">
                    <input type="checkbox" id="sharedUsage" v-model="sharedUsage">
                    <label for="sharedUsage">Ortak paylaşıma uygundur.</label>
                </div>
                <div class="button">
                    <button @click="fill">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import router from '../router'
import { mapGetters } from 'vuex'
import { companiesCollection, sourcesCollection, activitiesCollection } from '../firebase/index'
import FullCalendar from 'primevue/fullcalendar'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
export default {
    name: "form.createSource",
    router,
    components: { FullCalendar },
    data: function () {
        return {
            name: '',
            description: '',
            capacity: '',
            sharedUsage: false,
            company: {},
            date: '',
            startingHour: '',
            endingHour: '',
            options: {
                plugins:[dayGridPlugin, interactionPlugin],
                // amaç, veri modeli, 5 - 6 slyat, temel işlevler, başlık, danışman ismi,
                defaultDate: this.date,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: false,
                dateClick: (e) =>  {
                    //handle date click
                    console.log(e.dateStr)
                    this.date = e.dateStr
                }
            },
            events: [],
            sourceId: ''
        }
    },
    mounted() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
        let yyyy = today.getFullYear()

        this.sourceId = today.getTime().toString()

        today = yyyy + '-' + mm + '-' + dd
        this.date = today
    },
    created() {
        // if exists
        companiesCollection.doc(this.getUserInfo.uid).get()
            .then(doc => {
                if (doc.exists) {
                    this.company = doc.data()
                }
            }).catch(function(error) {
            console.log("Error getting document:", error)
        })
    },
    methods: {
        fill: function () {
            let events = this.events
            let userInfo = this.getUserInfo
            let sourceObject = {
                name: this.name,
                description: this.description,
                capacity: this.capacity,
                sharedUsage: this.sharedUsage,
                company: this.company
            }
            let startingHour = this.startingHour
            let endingHour = this.endingHour
            sourcesCollection.doc(this.sourceId).set(sourceObject)
                .then(function (res) {
                    events.forEach(ev => {
                        console.log(ev)
                        activitiesCollection.add({
                            source: sourceObject,
                            resMaker: userInfo,
                            canceled: false,
                            date: ev.start,
                            isValid: 'accepted',
                            startingHour: startingHour,
                            endingHour: endingHour
                        }).then(function (ress) {
                            console.log(ress)
                            router.push('/profile')
                        }).catch(function (errorr) {
                            console.log(errorr)
                        })
                    })
                    //
                    //router.push('/profile')
                }).catch(function (error) {
                    console.log(error)
                })
        },
        ekle: function () {
            this.events.push({
                start: this.date,
                end: this.date,
                startingHour: this.startingHour,
                endingHour: this.endingHour
            })
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
#sourceform {
    width: 608px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #dddddd;
}
#sourceform {
    .company-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .company-info {
        h4 {
            color: #707070;
            display: block;
            font-size: 14px;
            text-align: left;
            font-weight: normal;
        }
        .company-form {
            width: 100%;
            margin-top: 20px;
        }
        .company-form {
            .row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            .row {
                .input-name {
                    color: #707070;
                    font-size: 16px;
                    white-space: nowrap;
                    font-weight: normal;
                    display: inline-block;
                }
                input {
                    width: 100%;
                    font-size: 14px;
                    max-width: 380px;
                    padding: 10px 6px;
                    border-radius: 5px;
                    display: inline-block;
                    border: 1px solid #e5e5e5;
                }
                input:focus {
                    box-shadow: 0px 0px 3px 0px rgba(0,70,128,.75);
                }
                textarea {
                    width: 100%;
                    resize: none;
                    outline: none;
                    font-size: 14px;
                    max-width: 380px;
                    padding: 10px 6px;
                    border-radius: 5px;
                    display: inline-block;
                    border: 1px solid #e5e5e5;
                }
                textarea:focus {
                    box-shadow: 0px 0px 3px 0px rgba(0,70,128,.75);
                }
                select {
                    width: 100%;
                    cursor: pointer;
                    font-size: 14px;
                    max-width: 394px;
                    padding: 10px 6px;
                    border-radius: 5px;
                    display: inline-block;
                    border: 1px solid #e5e5e5;
                }
                select:focus {
                    box-shadow: 0px 0px 3px 0px rgba(0,70,128,.75);
                }
                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .button {
                    button {
                        width: 170px;
                        border: none;
                        color: #ffffff;
                        display: block;
                        font-size: 14px;
                        box-shadow: none;
                        padding: 10px 40px;
                        border-radius: 5px;
                        font-weight: normal;
                        background-color: #272E8A;
                    }
                    button:hover:enabled {
                        cursor: pointer;
                    }
                }
                .sharedUsage {
                    width: 100%;
                    display: flex;
                    margin-left: 5px;
                    align-items: center;
                    justify-content: flex-start;
                }
                .sharedUsage {
                    input {
                        width: auto;
                        margin-right: 10px;
                        display: inline-block;
                    }
                    label {
                        color: #707070;
                        font-size: 14px;
                        font-weight: normal;
                        white-space: nowrap;
                        display: inline-block;
                    }
                }
                .rangehours {
                    width: 380px;
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
                        max-width: 170px;
                        padding: 10px 6px;
                        border-radius: 5px;
                        display: inline-block;
                        border: 1px solid #e5e5e5;
                    }
                }
            }
        }
    }
}
</style>