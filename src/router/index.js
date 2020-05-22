import Vue from 'vue'
import VueRouter from 'vue-router'

import Todolist from '@/components/todolist'
import Todolist2 from '@/components/todolist2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Todolist
  },
  {
    path: '/todolist2',
    component: Todolist2
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
