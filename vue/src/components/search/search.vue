<template>
    <div class="calendar__search">
        <input type="text" class="calendar__search-input" placeholder="Найти событие" v-model="search" v-on:keyup="filter">
        <button class="btn btn-outline-info calendar__search-submit"><font-awesome-icon icon="search" /> </button>
        <div class="calendar__search-list" v-show="filtredEvents">
            <div class="calendar__search-item" v-for="event in filtredEvents" @click="searchEvent(event.date)">
                <p class="search-item__name">{{event.title}}</p>
                <p class="search-item__date">{{custumizeDate(event.date)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        props: ['dateFormat'],
        created(){
            this.events = this.$store.getters.getEvents;
        },
        data(){
            return{
                title: 'Header',
                events: [],
                search: '',
                filtredEvents: ''
            }
        },
        computed:{

        },

        methods:{
            custumizeDate(date){
                return this.$moment(date, this.dateFormat).format("DD MMMM")
            },
            filter(){
                if(this.search){
                    this.filtredEvents = this.events.filter((event) => {
                        return event.title.toLowerCase().match(this.search.toLowerCase());
                    })
                }else{
                    this.filtredEvents = '';
                }

            },
            searchEvent(date){
                this.$emit('search', {
                    date: date
                });
                this.search ='';
                this.filtredEvents = '';
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "search"
</style>