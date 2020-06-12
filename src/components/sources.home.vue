<template>
<div class="wrapper">
    <div v-if="sources.length == 0" class="error">
        <h3>Kaynak bulunamadı.</h3>
    </div>
    <div v-if="sources.length > 0" v-for="sour in sources" id="sources" @click="goToDetail(sour.id)">
        <div class="source">
            <div class="imgandtitle">
                <img src="../assets/images/source-img.jpg" alt="">
                <h2>{{ sour.data.name }}</h2>
            </div>
            <div class="capacity">
                <img src="../assets/icons/capacity.png" alt="">
                <h4>{{ sour.data.capacity }}</h4>
                <h3>{{ sour.data.company.region }} / {{ sour.data.company.city }}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import router from '../router'
import { sourcesCollection } from '../firebase/index'
export default {
    name: "sources.home",
    router,
    data: function () {
        return {
            sources: []
        }
    },
    mounted() {
        sourcesCollection.where("sharedUsage", "==", true).limit(10).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.')
                    return
                }

                snapshot.forEach(doc => {
                    this.sources.push({id: doc.id, data: doc.data()})
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    },
    methods: {
        goToDetail: function (id) {
            router.push('/source/' + id)
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
}
#sources {
    padding: 10px;
    display: flex;
    margin-top: 25px;
    align-items: center;
    flex-direction: row;
    width: calc(100% - 20px);
    background-color: #ffffff;
    border: 1px solid #dddddd;
    justify-content: space-between;
}
#sources:hover {
    cursor: pointer;
}
#sources {
    .source {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
            h3 {
                color: #707070;
                font-size: 18px;
                margin-left: 20px;
                font-weight: normal;
                font-family: "Segoe UI";
            }
        }
    }
}
.error {
    h3{
        padding: 20px;
        color: #000000;
        font-size: 16px;
        font-weight: normal;
    }
}
</style>