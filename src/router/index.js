import Vue from 'vue'
import Router from 'vue-router'
import DdaCircle from '@/components/DdaCircle'
import BresenCircle from '@/components/BresenCircle'
import Ellipse from '@/components/Ellipse'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/e',
    name: 'Ellipse',
    component: Ellipse,
    props: {
      canvasColor: 'hsl(217, 71%, 53%)'
    }
  },
  {
    path: '/cb',
    name: 'BresenCircle',
    component: BresenCircle,
    props: {
      canvasColor: 'hsl(217, 71%, 53%)'
    }
  },
  {
    path: '/cdda',
    name: 'DdaCircle',
    component: DdaCircle,
    props: {
      canvasColor: 'hsl(217, 71%, 53%)'
    }
  },
  {
    path: '/',
    name: 'DdaCircle',
    component: DdaCircle,
    props: {
      canvasColor: 'hsl(217, 71%, 53%)'
    }
  }
  ]
})
