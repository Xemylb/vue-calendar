<template>
    <div class="day" v-bind:class="{ day_prev: prevDay, day_current: isCurrentDay}" @click.self="show('create')">
         <div class="day__num">{{dateDay}}</div>
        <div class="day__event"  v-for="event in dayEvents" @click="show('edit', event)">
            {{event.title}}
        </div>
        <event-modal v-bind:modal-data="modalData" v-if="showModal" @close="close" @addEvent="addEvent" @editEvent="editEvent" @deleteEvent="deleteEvent"></event-modal>
    </div>

</template>

<script>
    import eventModal from '../event-modal/event-modal'
    export default {
        name: "calendarDay",
        props: ['dayData', 'dateFormat', 'now'],
        components: {
            eventModal
        },
        created(){
            this.getData();
        },
        mounted(){
            this.getData();
            this.dateDay = this.$moment(this.date, this.dateFormat).format('DD');
            if(this.$moment(this.now).format(this.dateFormat) === this.date){
                this.isCurrentDay = true;
            }
        },
        data() {
            return {
                modalData: {
                    eventType: 'create',
                    dayData: {
                        id:'',
                        title: '',
                        text: '',
                        google: ''
                    },
                    date: this.dayData.date,
                    dateFormat: this.dateFormat
                },
                showModal: false,
                date: this.dayData.date,
                dateDay: '',
                prevDay: this.dayData.prevDay,
                events: '',
                isCurrentDay: false
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
                this.modalData.dayData.id = '';
                this.modalData.dayData.title = '';
                this.modalData.dayData.text = '';
                this.modalData.dayData.google = '';
                if(data){
                    this.modalData.dayData.id = data.id;
                    this.modalData.dayData.title = data.title;
                    this.modalData.dayData.google = data.google;
                    this.modalData.dayData.text = data.text;
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