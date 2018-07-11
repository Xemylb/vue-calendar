<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12" v-for="event in events"> {{event}}</div>
        </div>
        <button class="btn btn-danger" v-on:click='getPrevMonth()'>Назад</button>
        {{month}}
        <button class="btn btn-success" v-on:click='getNextMonth()'>Вперед</button>
        <p>{{days}}</p>
        <h2></h2>
        <h2>{{year}}</h2>
        <h2>{{prevDays}}</h2>
        <h2>{{currentDate}}</h2>
        <div class="calendar">
            <div v-for="day in daysNames" class="calendar__day">
                {{day}}
            </div>
            <calendar-day v-for="day in days" v-bind:dayData="day"  :key="day.key"></calendar-day>
        </div>
    </div>

</template>

<script>
    import App from '../app'
    import moment from 'moment'
    import 'moment/locale/ru'
    import calendarDay from './day'


    export default {
        name: 'HelloWorld',
        created(){
            this.$store.dispatch('getEvents');
            this.events = this.$store.getters.getEvents;
        },
        mounted() {

            this.$moment.locale("RU");
            let now = new Date;
            this.currentDate = moment(now);
            this.getCalendar(this.currentDate);
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                daysNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
                prevDays: [],
                currentDate: '',
                dateFormat: 'DD-MM-YYYY',
                days: [],
                month: '',
                year: '',
                events: ''
            }
        },
        methods: {

            getPrevMonth() {
                this.currentDate = moment(this.currentDate).subtract(1, 'month');
                this.getCalendar(this.currentDate);
            },
            getNextMonth() {
                this.currentDate = moment(this.currentDate).add(1, 'month');
                this.getCalendar(this.currentDate);
            },
            getCalendar(date) {
                let daysArr = [];
                let timeDate;
                let key = 0;
                do {
                    let day = {
                        key: '' ,
                        date: false,
                        prevDay: false,
                        events: []
                    };
                    if (!timeDate) {
                        timeDate = moment(date).startOf('month');
                    } else {
                        timeDate = moment(timeDate).add(1, 'd');
                    }
                    day.date = timeDate.format(this.dateFormat);
                    day.key = key;
                    daysArr.push(day);
                    key++;
                }
                while (moment(timeDate).format('DD') !== moment(date).endOf('month').format('DD'));
                this.month = moment(date).format('MMMM');
                this.year = moment(date).format('Y');
                this.getPrevDays(date, daysArr, key);
            },
            getPrevDays(date,daysArr, key) {
                let timeDate;
                do {
                    let day = {
                        key: '',
                        date: '',
                        prevDay: true,
                        events: []
                    };
                    if (!timeDate) {
                        timeDate = moment(date).startOf('month').subtract(1, 'd');
                    } else {
                        timeDate = moment(timeDate).subtract(1, 'd');
                    }
                    day.date = timeDate.format(this.dateFormat);
                    day.key = timeDate.format('d');
                    day.key = key;
                    daysArr.unshift(day);
                    key++;
                }
                while (timeDate.day() !== 1);
                this.days = daysArr;
            }
        },
        components: {App, moment, calendarDay, },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
    body
        background-color: red

        h1
            color: green

        .calendar
            display: flex
            align-items: stretch
            align-content: center
            justify-content: flex-start
            flex-wrap: wrap

        .calendar__day
            flex-basis: 14%
            background-color: grey
            border: 1px solid red
            height: 100px

        .calendar__day_prev
            background-color: antiquewhite
</style>
