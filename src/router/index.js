import Vue from 'vue'
import Router from 'vue-router'
import BsStyle from '@/components/bsStyle/bsStyle'
import BsHome from '@/components/bsHome/bsHome'
import BsBackground from '@/components/bsBackground/bsBackground'

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
      name: 'BsStyle',
      component: BsStyle,
      children: [{
        path: '/css/background',
        component: BsBackground
      }]
    }
  ]
})
