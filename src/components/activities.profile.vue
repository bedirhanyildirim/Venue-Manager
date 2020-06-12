<template>
<div id="activities">
    <h4>Rezervasyonlar</h4>
    <div v-if="activities.length == 0" class="error">
        <h3>Rezervasyon bulunamadı.</h3>
    </div>
    <div v-if="activities.length > 0" v-for="act in activities" class="source" @click="goTo(act.data.source.id, act.id)">
        <div class="imgandtitle">
            <img src="../assets/images/source-img.jpg" alt="">
            <h2>{{ act.data.source.name }}</h2>
        </div>
        <div class="capacity">
            <h5 v-if="act.data.isValid == 'waiting'" style="color: blue; margin-right: 50px;">Onay Bekliyor</h5>
            <h5 v-if="act.data.isValid == 'accepted'" style="color: green; margin-right: 50px;">Onaylandı</h5>
            <h5 v-if="act.data.isValid == 'rejected'" style="color: red; margin-right: 50px;">Onaylanmadı</h5>
            <img src="../assets/icons/capacity.png" alt="">
            <h4>{{ act.data.source.capacity }}</h4>
        </div>
    </div>
</div>
</template>

<script>
import router from '../router'
import { activitiesCollection } from '../firebase/index'
export default {
    name: "activities.profile",
    router,
    props: {
        company: {
            type: Object,
            required: false,
            default: {}
        }
    },
    data: function () {
        return {
            activities: []
        }
    },
    mounted() {
        activitiesCollection.where("source.company.name", "==", this.company.name)
            .where("canceled", "==", false).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }

                snapshot.forEach(doc => {
                    this.activities.push({id: doc.id, data: doc.data()})
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    },
    methods: {
        goTo: function (sourceId, activityId) {
            router.push('/source/' + sourceId + '/res/' + activityId)
        }
    }
}
</script>

<style lang="scss" scoped>
#activities {
    width: 100%;
    display: flex;
    text-align: left;
    margin-top: 25px;
    align-items: end;
    flex-direction: column;
    justify-content: flex-start;
}
#activities {
    h4 {
        color: #707070;
        display: block;
        font-size: 14px;
        text-align: left;
        font-weight: normal;
    }
    .source {
        width: calc(100% - 20px);
        display: flex;
        padding: 10px;
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        background-color: #fafafa;
        border: 1px solid #dadbdd;
        justify-content: space-between;
    }
    .source:hover {
        cursor: pointer;
    }
    .error {
        h3{
            padding: 20px;
            color: #000000;
            font-size: 16px;
            font-weight: normal;
        }
    }
    .source {
        .imgandtitle {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .imgandtitle {
            img {
                width: 106px;
                height: 80px;
                margin-right: 20px;
            }
            h2 {
                color: #707070;
                font-size: 16px;
                font-weight: normal;
            }
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
}
</style>