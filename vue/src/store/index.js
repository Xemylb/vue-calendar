import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const events = new Vuex.Store({
    state:{
        events:[]
    },
    getters:{
       getEvents(state){
           return state.events
       }
    },
    mutations:{
        getEvents(state){
            state.events = [{
                date: '04-07-2018',
                name: 'Event1',
                text: 'Event texl lorem text lorem',
                time: '15:00'
            },
                {
                    date: '06-07-2018',
                    name: 'Event2',
                    text: 'Event texl lorem text lorem',
                    time: '18:00'
                },
                {
                    date: '09-07-2018',
                    name: 'Event3',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                },
                {
                    date: '15-07-2018',
                    name: 'Event4',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                }]
        },
        addEvent(state,payload){
            state.events.push(payload)
        }
    },
    actions:{
        getEvents(context, events){
            context.commit('getEvents', events);

        },
        addEvent(context, event){
            context.commit('addEvent', event);
        }
    }

});
export default events;