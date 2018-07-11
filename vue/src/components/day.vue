<template>
    <div class="calendar__day" v-bind:class="{ calendar__day_prev: prevDay}" >
        {{date}}
        <div class="btn btn-success btn-xs" @click="show">+</div>
        <div v-if="events">
            <p  v-for="event in events">
                {{event.name}}
            </p>
        </div>
        <p style="color: red" v-else>
            нет событий
        </p>
            <event-modal v-bind:modalName="date" v-if="showModal" @close="show"></event-modal>
    </div>

</template>

<script>
    import eventModal from  './event-modal'
    export default {
        name: "calendarDay",
        props: ['dayData'],
        components: {
            eventModal
        },
        created(){
            this.getTestData()
        },
        data() {
            return {
                showModal: false,
                date: this.dayData.date,
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
                })
            },
            addEvent(date){
                let event = {
                    date: date,
                    name: 'New Event',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                };
                this.$store.dispatch('addEvent', event);
                this.events.push(event);
            },
            show () {
               this.showModal = !this.showModal;
            },

        }
    }
</script>

<style lang="sass" scoped>
    .calendar__day
        overflow: hidden
        position: relative
</style>