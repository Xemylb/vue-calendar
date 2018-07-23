<template>
    <div class="container calendar">
        <div class="calendar__header">
            <div class="calendar__control">
                <button class="btn btn_blue-outline calendar__control-btn mb-xs-15" v-on:click='getPrevMonth'>
                    <font-awesome-icon icon="angle-left"/>
                </button>
                <div class="calendar__month-name mb-xs-15">{{month}} {{year}}</div>
                <button class="btn btn_blue-outline calendar__control-btn mb-xs-15" v-on:click='getNextMonth'>
                    <font-awesome-icon icon="angle-right"/>
                </button>
                <div class="btn_purple-outline btn calendar__btn-now" @click="getTodayDate">Текущая дата</div>
                <fast-create v-bind:dateFormat="dateFormat"></fast-create>
                <google-auth></google-auth>
            </div>
            <div class="calendar__search">
                <search v-bind:date-format="dateFormat" @search="searchEvent"></search>
            </div>
        </div>
        <div class="calendar__month">
            <div class="calendar__month-header">
                <div v-for="day in daysNames" class="calendar__day-name">
                    {{day}}
                </div>
            </div>
            <div class="calendar__month-list" v-touch:swipe.left="getNextMonth" v-touch:swipe.right="getPrevMonth">
                <calendar-day v-for="day in days" v-bind:day-data="day" v-bind:date-format="dateFormat" v-bind:now="now" :key="day.key + day.date"></calendar-day>
            </div>
        </div>
    </div>

</template>

<script>
    import App from '../../App'
    import moment from 'moment'
    import 'moment/locale/ru'
    import calendarDay from '../day/day'
    import search from '../search/search'
    import googleAuth from '../google-auth/index'
    import fastCreate from '../fast-create/fast-create'
    import maskedInput from 'vue-masked-input'

    export default {
        name: 'Calendar',
        components: {App, moment, calendarDay, search, maskedInput, fastCreate, googleAuth},
        created() {
            this.$store.dispatch('getEvents');
        },
        mounted() {
            this.$moment.locale("RU");
            this.now = new Date;
            this.activeDate = this.now;
            this.getCalendar();
        },
        data() {
            return {
                daysNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
                prevDays: [],
                activeDate: '',
                dateFormat: 'YYYY-MM-DD',
                days: [],
                month: '',
                year: '',
                now: '',
            }
        },
        methods: {
            getPrevMonth() {
                this.activeDate = moment(this.activeDate).subtract(1, 'month');
                this.getCalendar();
            },
            getNextMonth() {
                this.activeDate = moment(this.activeDate).add(1, 'month');
                this.getCalendar();
            },
            getCalendar() {
                let daysArr = [];
                let timeDate;
                do {
                    let day = {
                        key: '',
                        date: false,
                        prevDay: false,
                        events: []
                    };
                    if (!timeDate) {
                        timeDate = moment(this.activeDate).startOf('month');
                    } else {
                        timeDate = moment(timeDate).add(1, 'd');
                    }
                    day.date = timeDate.format(this.dateFormat);
                    daysArr.push(day);
                }
                while (moment(timeDate).format('DD') !== moment(this.activeDate).endOf('month').format('DD'));
                this.month = moment(this.activeDate).format('MMMM');
                this.year = moment(this.activeDate).format('Y');
                this.getPrevDays( daysArr);
            },
            getPrevDays(daysArr) {
                let timeDate;
                do {
                    let day = {
                        key: '',
                        date: '',
                        prevDay: true,
                        events: []
                    };
                    if (!timeDate) {
                        timeDate = moment(this.activeDate).startOf('month').subtract(1, 'd');
                    } else {
                        timeDate = moment(timeDate).subtract(1, 'd');
                    }
                    day.date = timeDate.format(this.dateFormat);
                    daysArr.unshift(day);
                }
                while (timeDate.day() !== 1);

                this.days = this.addKeys(daysArr);
            },
            addKeys(daysArr) {
                daysArr.forEach(function (item, i) {
                    item.key = i;
                });
                return daysArr;
            },
            searchEvent(data) {
                this.activeDate = this.$moment(data.date, this.dateFormat);
                this.getCalendar()
            },
            getTodayDate(){
                this.activeDate = this.now;
                this.getCalendar();
            }

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
    @import "calendar"
</style>
