import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable */
Vue.use(Vuex);

const events = new Vuex.Store({
    state: {
        events: [],
        lastID: 6
    },
    getters: {
        getEvents(state) {
            return state.events
        },
        getID(state) {
            return state.lastID
        }
    },
    mutations: {
        getEvents(state) {
            state.events = [
                {
                    id: 0,
                    date: '04-07-2018',
                    title: 'Придаться грустным воспоминаниям',
                    text: '',
                },
                {
                    id: 1,
                    date: '06-07-2018',
                    title: 'Накормить радужного пони в подвале',
                    text: 'Event texl lorem text lorem',
                },
                {
                    id: 2,
                    date: '09-07-2018',
                    title: 'Протрезветь до работы',
                    text: 'Event texl lorem text lorem',
                },
                {
                    id: 3,
                    date: '25-06-2018',
                    title: 'Махнуть медавухи',
                    text: 'Event texl lorem text lorem',
                },
                {
                    id: 4,
                    date: '01-08-2018',
                    title: 'Хлебнуть каньяку',
                    text: 'Event texl lorem text lorem',
                },
                {
                    id: 5,
                    date: '14-06-2018',
                    title: 'Выпить пивка',
                    text: 'Выпить пивка с друзяшками',
                },
                {
                    id: 6,
                    date: '14-12-2019',
                    title: 'Выпить в будущем',
                    text: 'Выпить пивка с друзяшками',
                }]
        },
        addEvent(state, payload) {
            payload.id = state.lastID = ++state.lastID;
            state.events.push(payload);
        },
        editEvent(state, payload) {
            state.events.find(function (elem) {
                if (elem.id === payload.id) {
                    elem.date = payload.date;
                    elem.title = payload.title;
                    elem.text = payload.text;
                }
            })
        },
        delete(state, id) {
            let i = state.events.map(elem => elem.id).indexOf(id);
            state.events.splice(i, 1);
        }
    },
    actions: {
        getEvents(context, events) {
            context.commit('getEvents', events);
        },
        addEvent(context, event) {
            context.commit('addEvent', event);
        },
        editEvent(context, event) {
            context.commit('editEvent', event);
        },
        deleteEvent(context, id) {
            context.commit('delete', id);
        }
    }
});
export default events;