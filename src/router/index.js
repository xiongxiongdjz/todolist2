import Vue from 'vue'
import VueRouter from 'vue-router'

import Todolist from '@/components/todolist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Todolist
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
