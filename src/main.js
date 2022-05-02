import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import page from './assets/page'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vue3videoPlay from 'vue3-video-play' // 引入视频插件
// import App from './App.vue'

import VueParticles from 'vue-particles'  //引入粒子组件


import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'

import { createPinia } from 'pinia'


createApp(App).use(router).use(createPinia()).use(page).use(vue3videoPlay).use(VueParticles).use(ElementPlus).mount('#app')

