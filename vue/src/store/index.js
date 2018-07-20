import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
/* eslint-disable */
Vue.use(Vuex);

const events = new Vuex.Store({
    state: {
        events: [],
    },
    getters: {
        getEvents(state) {
            return state.events;
        }
    },
    mutations: {
        getEvents(state) {
            axios.post('http://localhost:3001/getEvents').then(response => {
                response.data.map((event) => {state.events.push(event);})
            });
        },
        addEvent(state, payload) {
            axios.post('http://localhost:3001/createEvent', qs.stringify(payload)).then(response => {
                response.data.id = response.data._id;
                state.events.push(response.data);
            });

        },
        editEvent(state, payload) {
            console.log(payload);
            axios.put('http://localhost:3001/editEvent', qs.stringify(payload)).then(response => {
                state.events.find(function (elem) {
                    if (elem.id === response.data.id) {
                        elem.date = payload.date;
                        elem.title = payload.title;
                        elem.text = payload.text;
                    }
                })
            });
        },
        delete(state, id) {
            axios.post('http://localhost:3001/deleteEvent', qs.stringify({id:id})).then(response => {
                if(response.data.answer){
                    let i = state.events.map(elem => elem.id).indexOf(id);
                    state.events.splice(i, 1);
                }
            });

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