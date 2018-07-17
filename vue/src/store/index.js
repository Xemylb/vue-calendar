import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const events = new Vuex.Store({
    state:{
        events:[],
        lastID: 6
    },
    getters:{
       getEvents(state){
           return state.events
       },
       getID(state){
           return state.lastID
       }
    },
    mutations:{
        getEvents(state){
            state.events = [{
                id: 0,
                date: '04-07-2018',
                title: 'Придаться грустным воспоминаниям',
                text: 'Event texl lorem text lorem',
                time: '15:00'
            },
                {
                    id: 1,
                    date: '06-07-2018',
                    title: 'Накормить радужного пони в подвале',
                    text: 'Event texl lorem text lorem',
                    time: '18:00'
                },
                {
                    id: 2,
                    date: '09-07-2018',
                    title: 'Протрезветь до работы',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                },
                {
                    id: 3,
                    date: '25-06-2018',
                    title: 'Махнуть медавухи',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                },
                {
                    id: 4,
                    date: '01-08-2018',
                    title: 'Хлебнуть каньяку',
                    text: 'Event texl lorem text lorem',
                    time: '15:00'
                },
                {
                    id: 5,
                    date: '14-06-2018',
                    title: 'Выпить пивка',
                    text: 'Выпить пивка с друзяшками',
                    time: '15:00'
                },
                {
                    id: 6,
                    date: '14-12-2019',
                    title: 'Выпить в будущем',
                    text: 'Выпить пивка с друзяшками',
                    time: '15:00'
                }]
        },
        addEvent(state,payload){
             state.events.push(payload);
        },
        editEvent(state,payload){
            state.events.find(function (elem) {
                if(elem.id === payload.id){
                    elem.date = payload.date;
                    elem.title = payload.title;
                    elem.text = payload.text;
                }
            })
        },
        addID(state){
            state.lastID = ++state.lastID;
            return state.lastID;
        }
    },
    actions:{
        getEvents(context, events){
            context.commit('getEvents', events);

        },
        addEvent(context, event){
            context.commit('addEvent', event);
        },
        editEvent(context, event){
            context.commit('editEvent', event);
        },
        addID(context){
           context.commit('addID');
        }
    }

});
export default events;