import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment-timezone'

/*CalendarApi*/
import '../components/google-auth/api.js';
const CLIENT_ID = '460760836805-h6kbhuu5e67i74q06f5dcls6iqk5t0mq.apps.googleusercontent.com';
const SECRET= 'RPwOzkz7YpSFj8yannZIxBzT';
const API_KEY = 'AIzaSyBr2nuXusTent3NfhXBIeTk15YP6i0WvoA';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const googleApi = gapi;


Vue.use(Vuex);

const events = new Vuex.Store({
    state: {
        events: [],
        googleAuth: false
    },
    getters: {
        getEvents(state) {
            return state.events;
        },
    },
    mutations: {
        getEvents(state) {
            axios.post('http://localhost:3001/getEvents').then(response => {
                response.data.map((event) => {state.events.push(event);})
            });
        },
        getGoogleEvents(state){
            googleApi.client.calendar.events.list({
                'calendarId': 'primary',
                // 'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 100,
                'orderBy': 'startTime'
            }).then(response => {
                response.result.items.map((item)=>{
                    let event = {
                        id: '',
                        text: '',
                        title: '',
                        date: '',
                        google: true
                    };
                    event.id = item.id;
                    event.title = item.summary;
                    if(item.description){
                        event.text = item.description;
                    }
                    event.date = item.start.date;
                    state.events.push(event);
                });
            });
            state.googleAuth = true;
            return state.events;
        },
        addEvent(state, payload) {
            if(state.googleAuth){
                let data = {
                    'summary': payload.title,
                    'description': payload.text,
                    'start': {
                        'date': payload.date,
                        'timeZone': 'UTC+03:00'
                    },
                    'end': {
                        'date': payload.date,
                        'timeZone': 'UTC+03:00'
                    },
                };
                let request = googleApi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': data
                });
                request.execute((event)=> {
                    payload.id = event.id;
                    payload.google = true;
                    state.events.push(payload);
                    console.log(state.events);
                })
            }else{
                axios.post('http://localhost:3001/createEvent', qs.stringify(payload)).then(response => {
                    response.data.id = response.data._id;
                    state.events.push(response.data);
                });
            }


        },
        editEvent(state, payload) {
            if(payload.google){
                let data = {
                    'summary': payload.title,
                    'description': payload.text,
                    'start': {
                        'date': payload.date,
                        'timeZone': 'UTC+03:00'
                    },
                    'end': {
                        'date': payload.date,
                        'timeZone': 'UTC+03:00'
                    },
                };
                let request = googleApi.client.calendar.events.patch({
                    'calendarId': 'primary',
                    'eventId': payload.id,
                    'resource': data
                });
                request.execute((_)=> {
                    state.events.find(function (elem) {
                        if (elem.id === payload.id) {
                            elem.date = payload.date;
                            elem.title = payload.title;
                            elem.text = payload.text;
                        }
                    })
                })
            }else{
                axios.put('http://localhost:3001/editEvent', qs.stringify(payload)).then(response => {
                    state.events.find(function (elem) {
                        if (elem.id === response.data.id) {
                            elem.date = payload.date;
                            elem.title = payload.title;
                            elem.text = payload.text;
                        }
                    })
                });
            }

        },
        delete(state, id) {
            let google = false;

            state.events.map((elem) =>{
                if(elem.id === id){
                    if(elem.google){
                        google = true;
                    }
                }
            });

            if(google){
                let request = googleApi.client.calendar.events.delete({
                    'calendarId': 'primary',
                    'eventId': id
                });
                request.execute((_)=> {
                    let i = state.events.map(elem => elem.id).indexOf(id);
                    state.events.splice(i, 1);
                })
            }else{
                axios.post('http://localhost:3001/deleteEvent', qs.stringify({id:id})).then(response => {
                    if(response.data.answer){
                        let i = state.events.map(elem => elem.id).indexOf(id);
                        state.events.splice(i, 1);
                    }
                });
            }


        }
    },
    actions: {
        getEvents(context, events) {
            context.commit('getEvents', events);
        },
        getGoogleEvents(context, events) {
            context.commit('getGoogleEvents', events);
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