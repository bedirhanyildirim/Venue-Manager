<template>
<div id="datepicker">
    <div class="date">
        <label for="date">Tarih:</label>
        <input type="date" id="date" name="date" :value="date" @input="setDate($event.target.valueAsDate)">
    </div>
    <div class="hours">
        <label for="startingHour">Saat:</label>
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
        <select id="endingHour" class="hour" v-model="endingHour" name="endingHour">
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
    <div class="button">
        <button @click="find">Ara</button>
    </div>
</div>
</template>

<script>
export default {
    name: "datepicket.home",
    data: function () {
        return {
            date: '',
            startingHour: '09',
            endingHour: '17'
        }
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
        find: function () {
            console.log('buldun')
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
#datepicker {
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    justify-content: space-between;
}
#datepicker {
    .date {

    }
    .date {
        label {
            color: #707070;
            font-size: 16px;
            margin-right: 20px;
            font-weight: normal;
        }
        input {
            font-family: "Segoe UI";
            font-size: 14px;
            max-width: 380px;
            padding: 10px 6px;
            border-radius: 5px;
            display: inline-block;
            border: 1px solid #e5e5e5;
        }
    }
    .hours {
        width: 340px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .hours {
        label {
            color: #707070;
            font-size: 16px;
            margin-right: 20px;
            font-weight: normal;
        }
        .hour {
            width: 120px;
            cursor: pointer;
            font-size: 14px;
            max-width: 170px;
            padding: 10px 6px;
            border-radius: 5px;
            display: inline-block;
            border: 1px solid #e5e5e5;
        }
        span {
            width: 10px;
            border-bottom: 2px solid #707070;
        }
    }
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .button {
        button {
            width: 120px;
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
</style>