<template>
<div id="sources">
    <h4>Kaynaklar <router-link to="/create-source">(yeni ekle)</router-link></h4>
    <div v-if="sources.length == 0" class="error">
        <h3>Kaynak bulunamadı.</h3>
    </div>
    <div v-if="sources.length > 0" v-for="sour in sources" class="source">
        <div class="imgandtitle">
            <img src="../assets/images/source-img.jpg" alt="">
            <h2>{{ sour.data.name }}</h2>
        </div>
        <div class="capacity">
            <img src="../assets/icons/capacity.png" alt="">
            <h4>{{ sour.data.capacity }}</h4>
        </div>
    </div>
</div>
</template>

<script>
import { sourcesCollection } from '../firebase/index'
export default {
    name: "sources.profile",
    props: {
        company: {
            type: Object,
            required: false,
            default: {}
        }
    },
    data: function () {
        return {
            sources: []
        }
    },
    mounted() {
        sourcesCollection.where("company.name", "==", this.company.name).get()
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
    }

}
</script>

<style lang="scss" scoped>
#sources {
    width: 100%;
    display: flex;
    text-align: left;
    align-items: end;
    flex-direction: column;
    justify-content: flex-start;
}
#sources {
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