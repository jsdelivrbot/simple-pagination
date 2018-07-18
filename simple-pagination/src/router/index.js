import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import infiniteScroll from '@/components/infiniteScroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/infinite',
      name: 'infinite-scroll',
      component: infiniteScroll
    }
  ]
})
