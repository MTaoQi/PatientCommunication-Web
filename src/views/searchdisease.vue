<template>
 <el-page-header :icon="ArrowLeft" content="detail" title="返回" @click="go"/>
<!-- 当没有所搜内容时会显示的提示页面 -->
  <div class="container" v-if="!info">
  <div class="row">
    <div class="col-sm-12 col-lg-12">
      <el-empty>
    <el-button type="warning" @click="ret">没有数据点击返回</el-button>
     </el-empty>
    </div>
  </div>
</div>
<!-- 搜索页面 -->
<div class="container" v-else>
  <div class="row">
    <div class="col-sm-12 col-lg-12">
      <h3>{{info.minkind}}</h3>
      <h4>什么是{{info.minkind}}？</h4>
      <p>{{info.describes}}</p>
      <h4>常见症状</h4>
        <p>{{info.symptom}}</p>
        <h4>采取的治疗</h4>
      <p>{{info.treat}}</p>
           <h4>采取的类型</h4>
      <p>{{info.treattype}}</p>
    </div>
  </div>
</div>

</template>
<script  setup>
import { useRoute ,useRouter } from "vue-router";
import { ref } from "vue";
import { ArrowLeft } from '@element-plus/icons-vue'
const route = useRoute();
const router = useRouter();
const keywordDis = route.query.keywordDis;
const axios = require('axios');
const info = ref();
function go(){
  router.push('/')
}

// 向给定ID的用户发起请求
axios.get('/api/disease/kinddetail/searchDisease?keywordDis='+keywordDis)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    if(response.data.code==200){
      info.value=response.data.data;
    }
     if(response.data.data.treat==""){
      response.data.data.treat="尚未收集让我们一起构建此内容";
    }
    if(response.data.data.treattype==""){
        response.data.data.treattype="尚未收集让我们一起构建此内容";
    }
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
function ret(){
  router.push('/');
}
</script>
<style scoped>
</style>