<template>
    <div class="google-auth">
            <button v-if='!authorized' @click="handleAuthClick" class="btn google-auth__btn google-auth__btn-login btn_red-outline"><img class="img-fluid google-auth__btn-img" src="../../assets/img/google.png" alt=""><span class="google-auth__btn-text">Войти</span></button>
            <button v-if='authorized' class="btn google-auth__btn google-auth__btn-disconnect btn_red-outline"><span class="google-auth__btn-text">{{email}}</span> <font-awesome-icon icon="sign-out-alt"/> </button>
    </div>
</template>


<script>
    import './api.js';
    const CLIENT_ID = '460760836805-h6kbhuu5e67i74q06f5dcls6iqk5t0mq.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBr2nuXusTent3NfhXBIeTk15YP6i0WvoA';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    const SCOPES = 'https://www.googleapis.com/auth/calendar';
    export default {
        name: "index",
        data() {
            return {
                items: undefined,
                api: undefined,
                authorized: false,
                email: ''
            }
        },

        mounted() {
            this.api = gapi;
            this.handleClientLoad();
        },

        methods: {
            handleClientLoad() {
                this.api.load('client:auth2', this.initClient);
            },
            initClient() {
                let vm = this;
                vm.api.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }).then(_ => {
                    // Listen for sign-in state changes.
                    vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
                });
            },


            handleAuthClick() {
                let vm = this;
                Promise.resolve(this.api.auth2.getAuthInstance().signIn())
                    .then(response => {
                        vm.email = response.w3.U3;
                        this.authorized = true;
                        this.getData();
            });
            },


            // handleSignoutClick(event) {
            //     Promise.resolve(this.api.auth2.getAuthInstance().signOut())
            //         .then(_ => {
            //             this.authorized = false;
            //         });
            // },
            getData() {
                this.$store.dispatch('getGoogleEvents')
            },
    }};
</script>

<style lang="sass" scoped>
    @import "main"
</style>