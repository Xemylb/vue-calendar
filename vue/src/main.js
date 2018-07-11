// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment-timezone'
import BootstrapVue from 'bootstrap-vue'
import events from './store/index'

Vue.use(BootstrapVue);


Object.defineProperty(Vue.prototype, '$moment', {get(){return this.$root.moment}});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    data:{
      moment
    },
    store: events,
  components: { App},
  template: '<App/>'
});
