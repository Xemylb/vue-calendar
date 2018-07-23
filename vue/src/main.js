// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment-timezone'
import BootstrapVue from 'bootstrap-vue'
import VueParticles from 'vue-particles'
import Vue2TouchEvents from 'vue2-touch-events'
import events from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faAngleLeft, faAngleRight, faPlus, faCaretUp, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue);
Vue.use(VueParticles);
Vue.use(Vue2TouchEvents);

library.add(faSearch, faAngleLeft, faAngleRight, faPlus, faCaretUp, faSignOutAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

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
  components: {App},
  template: '<App/>'
});
