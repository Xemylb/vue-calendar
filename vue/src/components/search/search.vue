<template>
    <div class="search">
        <input type="text" class="search__input" placeholder="Найти событие" v-model="search" v-on:keyup="filter">
        <button class="btn btn_blue-outline search__submit"><font-awesome-icon icon="search" /> </button>
        <vue-scrollbar classes="search__scrollbar" v-show="filtredEvents">
            <div class="search__list">
                <div class="search__item" v-for="event in filtredEvents" @click="searchEvent(event.date)">
                    <p class="search__item-name">{{event.title}}</p>
                    <p class="search__item-date">{{customizeDate(event.date)}}</p>
                </div>
            </div>
        </vue-scrollbar>
    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar';
    import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'
    export default {
        name: "search",
        props: {
            dateFormat: String
        },
        components:{VueScrollbar},
        created(){
            this.uploadEvents()
        },
        data(){
            return{
                events: [],
                search: '',
                filtredEvents: ''
            }
        },
        methods:{
            customizeDate(date){
                return this.$moment(date, this.dateFormat).format("DD MMMM")
            },
            filter(){
                if(this.search){
                    this.filtredEvents = this.events.filter((event) => {
                        if(event.title){
                            return event.title.toLowerCase().match(this.search.toLowerCase());
                        }

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
            },
            uploadEvents(){
                this.events = this.$store.getters.getEvents;
            }
        }
    }
</script>

<style lang="sass">
@import "search"
</style>