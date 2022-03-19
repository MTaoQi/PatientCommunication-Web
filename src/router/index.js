import {
  createRouter,
  createWebHistory
} from 'vue-router'
import index from '../views/index.vue'
import registo from '../views/registo.vue'
import loginindex from '../components/loginindex.vue'
import Forgotpwd from '../components/Forgotpwd.vue'
import test from '../components/test.vue'

//导入进度条nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 简单配置
//NProgress.inc(0.6)随机增长进度条，注意，这个方法永远不会让进度条达到100%。
//NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })



const routes = [{
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
    path: '/loginindex',
    name: 'loginindex',
    component: loginindex
  },
  {
    path: '/Forgotpwd',
    name: 'Forgotpwd',
    component: Forgotpwd
  },
  {
    path: '/test',
    name: 'test',
    component: test
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



// 离开当前路由前
router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.set(0.2);
  next()
})

// 进度条结束
router.afterEach(() => {
  NProgress.done()
})
export default router