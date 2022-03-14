import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import registo from '../views/registo.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Forgotpwd from '../components/Forgotpwd.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/registo',
    name: 'registo',
    component: registo
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/Forgotpwd',
    name: 'Forgotpwd',
    component: Forgotpwd
  }


  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
