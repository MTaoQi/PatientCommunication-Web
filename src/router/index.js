import {
  createRouter,
  createWebHistory
} from 'vue-router'
import index from '../views/index.vue'
import searchdisease from '../views/searchdisease.vue'
import loginindex from '../components/loginindex.vue'
import Forgotpwd from '../components/Forgotpwd.vue'
import mood from '../components/mood.vue'
import t from '../components/t.vue'
import communication from '../components/communication.vue'
import kind from '../components/kind.vue'
import kinddetail from '../components/kinddetail.vue'
import treat from '../components/treat.vue'
import treatdetail from "../components/treatdetail.vue"
import search from '../components/search.vue'
import symptoms from '../components/symptoms.vue'
import bbs from '../components/bbs.vue'
import violations from '../components/violations.vue'
import num from '../components/num.vue'
import manage from '../components/manage.vue'
import dayme from '../components/dayme.vue'
import error from "../components/error.vue"


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
    path: '/searchdisease',
    name: 'searchdisease',
    component: searchdisease
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
    path: '/mood',
    name: 'mood',
    component: mood
  },
  {
    path: '/t',
    name: 't',
    component: t
  }, 
  {
    path: '/communication',
    name: 'communication',
    component: communication
  },
  {
    path: '/kind',
    name: 'kind',
    component: kind
  },
  {
    path: '/kinddetail/:name',
    name: 'kinddetail',
    component: kinddetail
  },
  {
    path: '/treat',
    name: 'treat',
    component: treat
  },
  {
    path: '/treatdetail',
    name: 'treatdetail',
    component: treatdetail
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/symptoms',
    name: 'symptoms',
    component: symptoms
  },
  {
    path: '/bbs',
    name: 'bbs',
    component: bbs
  },
  {
    path: '/violations',
    name: 'violations',
    component: violations
  },
  {
    path: '/num',
    name: 'num',
    component: num
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage
  },
  {
    path: '/dayme',
    name: 'dayme',
    component: dayme
  },
  {
    path: '/error',
    name:"error",
    component: error,
    alias:"/cuowu"  //别名 
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/error',//重定向 
  },   
 
   
   
   
   
   

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