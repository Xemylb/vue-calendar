<template>
    <div class="calendar__day" v-bind:class="{ calendar__day_prev: prevDay}" @click.self="show('create')">
         <div class="calendar__day-num">{{dateDay}}</div>
        <div class="calendar__day-event"  v-for="event in dayEvents" @click="show('edit', event)">
            {{event.title}}
        </div>
        <event-modal v-bind:modal-data="modalData" v-if="showModal" @close="close" @addEvent="addEvent" @editEvent="editEvent" @deleteEvent="deleteEvent"></event-modal>
    </div>

</template>

<script>
    import eventModal from '../event-modal/event-modal'
    export default {
        name: "calendarDay",
        props: ['dayData', 'dateFormat'],
        components: {
            eventModal
        },
        created(){
            this.getData();
        },
        mounted(){
            this.getData();
            this.dateDay = this.$moment(this.date, 'DD-MM-YYYY').format('DD')
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
                    date: this.dayData.date,
                    dateFormat: this.dateFormat
                },
                showModal: false,
                date: this.dayData.date,
                dateDay: '',
                prevDay: this.dayData.prevDay,
                events: '',
            }},
        computed: {
            dayEvents(){
                return this.events.filter((event)=>{
                    if(event.date === this.date){
                        return event
                    }
                })
            }
        },
        methods: {
            getData(){
                this.events = this.$store.getters.getEvents;
            },
            addEvent(data){
                let date = this.date;
                let event = {
                    date: date,
                    title: data.title,
                    text: data.text,
                };
                this.$store.dispatch('addEvent', event)
            },
            editEvent(data){
                let date = this.date;
                let event = {
                    id: data.id,
                    date: date,
                    title: data.title,
                    text: data.text,
                };
                this.$store.dispatch('editEvent', event);
            },
            deleteEvent(id){
                this.$store.dispatch('deleteEvent', id);
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