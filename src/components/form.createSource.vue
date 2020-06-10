<template>
<div id="sourceform">
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
import { companiesCollection, sourcesCollection } from '../firebase/index'
export default {
    name: "form.createSource",
    router,
    data: function () {
        return {
            name: '',
            description: '',
            capacity: '',
            sharedUsage: false,
            company: {}
        }
    },
    created() {
        // if exists
        companiesCollection.doc(this.getUserInfo.uid).get()
            .then(doc => {
                if (doc.exists) {
                    console.log("Company data:", doc.data())
                    this.company = doc.data()
                }
            }).catch(function(error) {
            console.log("Error getting document:", error)
        })
    },
    methods: {
        fill: function () {
            sourcesCollection.add({
                name: this.name,
                description: this.description,
                capacity: this.capacity,
                sharedUsage: this.sharedUsage,
                company: this.company
            }).then(function (res) {
                console.log('Başarılı ' + res)
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
            }
        }
    }
}
</style>