<template>
<div id="myReservations">
    <container display="flex" justify-content="left" flex-direction="column">
        <p class="section"><span class="section-name">Reservasyonlarım</span><span class="section-cizgi"></span></p>
        <div class="content">
            <reservations :activities="activities"></reservations>
        </div>
    </container>
</div>
</template>

<script>
import container from '../components/container'
import reservations from '../components/reservations.myResevations'
import { activitiesCollection } from '../firebase/index'
import { mapGetters } from 'vuex'
export default {
    name: "myReservations.pages",
    components: { container, reservations },
    data: function () {
        return {
            activities: []
        }
    },
    computed: {
        ...mapGetters([
            'getUserInfo'
        ])
    },
    mounted() {
        activitiesCollection.where("resMaker.uid", "==", this.getUserInfo.uid).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }

                snapshot.forEach(doc => {
                    console.log(doc.data())
                    this.activities.push({id: doc.id, data: doc.data()})
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    }
}
</script>

<style lang="scss" scoped>
#myReservations {
    display: flex;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
}
#myReservations {
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
    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }
    .content {

    }
}
</style>