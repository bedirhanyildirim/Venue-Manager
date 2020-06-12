<template>
<div id="reservations">
    <div v-if="activities.length == 0" class="error">
        <h3>Rezervasyon bulunamadı.</h3>
    </div>
    <div v-if="activities.length > 0" v-for="act in activities" id="sources">
        <div class="source">
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
                <h3>{{ act.data.source.company.region }} / {{ act.data.source.company.city }}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "reservations.myResevations",
    props: {
        activities: {
            required: true,
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="scss" scoped>
#reservations {
    width: 100%;
}
#reservations {
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
}
</style>