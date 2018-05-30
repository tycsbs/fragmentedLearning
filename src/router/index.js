import Vue from 'vue'
import Router from 'vue-router'
import Background from '@/components/bsBackground/Background'
import BsHome from '@/components/bsHome/bsHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BsHome',
      component: BsHome
    },
    {
      path: '/css',
      name: 'Background',
      component: Background
    }
  ]
})
