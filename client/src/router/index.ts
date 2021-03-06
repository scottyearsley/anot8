import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import Preview from '../views/Preview.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/api'
  }
]

const router = new VueRouter({
  routes
})

export default router
