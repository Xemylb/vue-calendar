<template>
    <div class="calendar__day" v-bind:class="{ calendar__day_prev: prevDay}" @click.self="show('create')">
         <div class="calendar__day-num">{{dateDay}}</div>
        <div class="calendar__day-event"  v-for="event in events" @click="show('edit', event)">
            {{event.title}}
        </div>
        <event-modal v-bind:modal-data="modalData" v-if="showModal" @close="close" @addEvent="addEvent" @editEvent="editEvent" @deleteEvent="deleteEvent"></event-modal>
    </div>

</template>

<script>
    import eventModal from '../event-modal/event-modal'
    export default {
        name: "calendarDay",
        props: ['dayData'],
        components: {
            eventModal
        },
        created(){
            //console.log(this.dayData);
        },
        mounted(){
            this.getTestData();
            this.dateDay = this.$moment(this.date, 'DD-MM-YYYY').format('DD')
        },
        updated(){
        },
        data() {
            return {
                modalData: {
                    eventType: 'create',
                    dayData: {
                        id:'',
                        title: '',
                        text: '',
                    },
                    date: this.dayData.date
                },
                showModal: false,
                date: this.dayData.date,
                dateDay: '',
                prevDay: this.dayData.prevDay,
                events: ''
            }},
        methods: {
            getTestData(){
                let events = this.$store.getters.getEvents;
                let dayDate = this.date;
                this.events = events.filter(function (item) {
                    if(item.date == dayDate){
                        return item
                    }
                });
            },
            addEvent(data){
                let date = this.date;
                let event = {
                    id: 0,
                    date: date,
                    title: data.title,
                    text: data.text,
                    time: '15:00'
                };
                this.$store.dispatch('addID');
                event.id = this.$store.getters.getID;
                this.$store.dispatch('addEvent', event);
                this.events.push(event);
            },
            editEvent(data){
                let date = this.date;
                let event = {
                    id: data.id,
                    date: date,
                    title: data.title,
                    text: data.text,
                    time: '15:00'
                };
                this.$store.dispatch('editEvent', event);
                this.events.find(function (elem) {
                    if(elem.id === event.id){
                        elem.title = event.title;
                        elem.text = event.text;
                    }
                });
            },
            deleteEvent(id){
                this.$store.dispatch('deleteEvent', id);
                this.events.find((elem, i) => {
                    if(elem.id === id){
                        this.events.splice(i,1);
                    }
                })
            },
            show (eventType, data) {
                this.modalData.eventType = eventType;
                if(data){
                    this.modalData.dayData.id = data.id;
                    this.modalData.dayData.title = data.title;
                    this.modalData.dayData.text = data.text;
                }else{
                    this.modalData.dayData.id = '';
                    this.modalData.dayData.title = '';
                    this.modalData.dayData.text = '';
                }
               this.showModal = true;
            },
            close () {
                this.showModal = false
            }

        }
    }
</script>

<style lang="sass" scoped>
    @import "day"
</style>