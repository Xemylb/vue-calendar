<template>
    <div class="container calendar">
        <div class="calendar__header">
            <div class="calendar__control">
                <button class="btn btn_blue-outline calendar__control-btn" v-on:click='getPrevMonth()'><font-awesome-icon icon="angle-left" /></button>
                <div class="calendar__month-name">{{month}} {{year}}</div>
                <button class="btn btn_blue-outline calendar__control-btn" v-on:click='getNextMonth()'><font-awesome-icon icon="angle-right" /></button>
                <div class="btn_purple-outline btn calendar__btn-now" @click="getCalendar(now)">Текущая дата</div>
            </div>
            <div class="calendar__search">
                <search v-bind:dateFormat="dateFormat" @search="searchEvent"></search>
            </div>
        </div>
        <div class="calendar__month">
            <div v-for="day in daysNames" class="calendar__day calendar__day-header">
                {{day}}
            </div>
            <calendar-day v-for="day in days" v-bind:day-data="day"  :key="day.key + day.date"></calendar-day>
        </div>
    </div>

</template>

<script>
    import App from '../../App'
    import moment from 'moment'
    import 'moment/locale/ru'
    import calendarDay from '../day/day'
    import search from '../search/search'

    export default {
        name: 'Calendar',
        created(){
            this.$store.dispatch('getEvents');
            this.events = this.$store.getters.getEvents;
        },
        mounted() {
            this.$moment.locale("RU");
            this.now = new Date;
            this.currentDate = moment(this.now);
            this.getCalendar(this.currentDate);
        },
        data() {
            return {
                daysNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
                prevDays: [],
                currentDate: '',
                dateFormat: 'DD-MM-YYYY',
                days: [],
                month: '',
                year: '',
                events: '',
                now:'',
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
                    daysArr.push(day);
                }
                while (moment(timeDate).format('DD') !== moment(date).endOf('month').format('DD'));
                this.month = moment(date).format('MMMM');
                this.year = moment(date).format('Y');
                this.getPrevDays(date, daysArr);
            },
            getPrevDays(date,daysArr) {
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
                    daysArr.unshift(day);
                }
                while (timeDate.day() !== 1);

                this.days = this.addKeys(daysArr);
            },
            addKeys(daysArr){
                daysArr.forEach(function (item, i) {
                    item.key = i;
                });
                return daysArr;
            },
            searchEvent(data){
                let decodeDate = this.$moment(data.date, this.dateFormat);
                this.getCalendar(decodeDate)
            }
        },
        components: {App, moment, calendarDay, search},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
   @import "calendar"
</style>
