import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import page from './assets/page'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vue3videoPlay from 'vue3-video-play' 
// import App from './App.vue'


import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'





createApp(App).use(router).use(page).use(vue3videoPlay).use(ElementPlus).mount('#app')

