import Vue from 'vue'
import Router from 'vue-router'
import frontPage from '@/components/calendar/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'frontPage',
      component: frontPage
    }
  ]
})
