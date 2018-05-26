import Vue from 'vue'
import Router from 'vue-router'
import DdaCircle from '@/components/DdaCircle'
import BresenCircle from '@/components/BresenCircle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BresenCircle',
      component: BresenCircle
    },
    {
      path: '/a',
      name: 'DdaCircle',
      component: DdaCircle
    }
  ]
})
