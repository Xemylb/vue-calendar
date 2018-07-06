<template>
    <div class="container">
        <button class="btn btn-danger" v-on:click= 'getPrevMonth()'>Назад</button>
        {{month}}
        <button class="btn btn-success" v-on:click = 'getNextMonth()'>Вперед</button>
        <h2>{{days}}</h2>
        <h2></h2>
        <h2>{{year}}</h2>
        <h2>{{prevDays}}</h2>
        <h2>{{currentDate}}</h2>
        <div class="calendar">
            <div v-for="day in daysNames" class="calendar__day calendar__day">
                {{day}}
            </div>
            <div v-for="n in prevDays" class="calendar__day calendar__day_prev">
                {{n}}
            </div>
            <div v-for="day in days" class="calendar__day">
                {{day}}
            </div>
        </div>
    </div>

</template>

<script>
    import App from '../app'
    import moment from 'moment'
    import 'moment/locale/ru'

    export default {
        name: 'HelloWorld',
        mounted() {
            this.$moment.locale("RU");
            let now = new Date;
            this.getCalendar(now);
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                daysNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
                prevDays: [],
                currentDate: '',
                days: [],
                month: '',
                year: '',
                events: [
                    {
                        date: '06-07-2018',
                        name: 'Event1',
                        text: 'Event texl lorem text lorem',
                        time: '15:00'
                    },
                    {
                        date: '06-07-2018',
                        name: 'Event1',
                        text: 'Event texl lorem text lorem',
                        time: '18:00'
                    },
                    {
                        date: '09-07-2018',
                        name: 'Event1',
                        text: 'Event texl lorem text lorem',
                        time: '15:00'
                    },
                    {
                        date: '15-07-2018',
                        name: 'Event1',
                        text: 'Event texl lorem text lorem',
                        time: '15:00'
                    }
                ]
            }
        },
        methods: {
            getPrevMonth() {
                this.currentDate = moment(this.currentDate).subtract(1, 'months');
                this.getCalendar(this.currentDate);
            },
            getNextMonth() {
                this.currentDate = moment(this.currentDate).add(1, 'months');
                this.getCalendar(this.currentDate);
            },
            getDate(date) {
                return moment(date).format('DD-MM-YYYY')
                //return moment(date,'DD-MM-YYYY').add('2', 'M');
            },
            getCalendar(date){
                this.currentDate = this.getDate(date);
                this.days = [];
                let day;
                do{
                    if (!day) {
                         day = moment(this.currentDate).startOf('month');
                    } else {
                        day = moment(day).add(1, 'd');
                    }
                    this.days.push(this.getDate(day));
                }
                while(moment(day).format('DD') !==  moment(this.currentDate).endOf('month').format('DD'));

                this.month = moment(this.currentDate).format('MMMM');
                this.year = moment(this.currentDate).format('Y');
                this.getPrevDays()
            },
            getPrevDays() {
                this.prevDays = [];
                var testDay;
                do {
                    if (!testDay) {
                        testDay = moment(this.currentDate).startOf('month').subtract(1, 'd');
                    } else {
                        testDay = moment(testDay).subtract(1, 'd');
                    }
                    this.prevDays.unshift(moment(testDay).format('DD'));
                }
                while (testDay.day() !== 1);
            }
        },
        components: {App, moment},
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
