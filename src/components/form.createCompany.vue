<template>
<div id="companyform">
    <div class="company-info">
        <h4>Şirket Bilgileri</h4>
        <div class="company-form">
            <div class="row">
                <label for="name" class="input-name">Şirket Adı:</label>
                <input id="name" type="text" v-model="name" name="name"/>
            </div>
            <div class="row" style="align-items: start;">
                <label for="address" class="input-name" style="margin-top: 10px;">Adres:</label>
                <textarea id="address" type="text" v-model="address" name="address" rows="4 "></textarea>
            </div>
            <div class="row">
                <label for="phone" class="input-name">Telefon No:</label>
                <input id="phone" type="text" v-model="phone" name="phone"/>
            </div>
            <div class="row">
                <label for="workingDays" class="input-name">Çalışma Günleri:</label>
                <select id="workingDays" v-model="workingDays" name="workingDays">
                    <option value="weekdays">Hafta İçi</option>
                    <option value="weekdaysandsaturday">Hafta İçi + Cumartesi</option>
                    <option value="everyday">Hergün</option>
                </select>
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
import { companiesCollection } from '../firebase/index'
export default {
    name: "form.createCompany",
    router,
    data: function () {
        return {
            name: '',
            address: '',
            phone: '',
            workingDays: 'weekdays',
            startingHour: '08',
            endingHour: '17'
        }
    },
    methods: {
        fill: function () {
            companiesCollection.doc(this.getUserInfo.uid).set({
                name: this.name,
                address: this.address,
                phone: this.phone,
                workingDays: this.workingDays,
                startingHour: this.startingHour,
                endingHour: this.endingHour,
                owner: this.getUserInfo
            }).then(function (res) {
                router.push('/profile')
            }).catch(function (error) {
                console.log(error)
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
#companyform {
    width: 608px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #dddddd;
}
#companyform {
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
                .rangehours {
                    width: 394px;
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
            }
        }
    }
}
</style>