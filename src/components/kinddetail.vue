<template>
<el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="sob()">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/kind'}">类型</el-breadcrumb-item>
     <el-breadcrumb-item>{{info.minkind}}</el-breadcrumb-item>
  </el-breadcrumb>
<el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="lsob()">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">学习</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/kind'}">类型</el-breadcrumb-item>
     <el-breadcrumb-item>{{info.minkind}}</el-breadcrumb-item>
  </el-breadcrumb>

<div class="container">
  <div class="jumbotron">
    <h4>{{info.minkind}}</h4>
  </div>
  <div class="row">
    <div class="col-sm-12 col-lg-12">
      <h5 style="font-weight:bold;">什么是{{info.minkind}}？</h5>
      <p>{{info.describes}}</p>
      <h5 style="font-weight:bold;">{{info.minkind}}患者报告的常见症状</h5>
      <p>{{info.symptom}}</p>
      <h5 style="font-weight:bold;">人们采取的{{info.minkind}}的治疗</h5>
      <p>{{info.treat}}</p>
      <h5 style="font-weight:bold;">人们采取的{{info.minkind}}的类型</h5>
      <p>{{info.treattype}}</p>
    </div>
  </div>
</div>
<div class="container" style="margin-top:20px;">
  <div class="row">
     <div class="col-sm-12 col-lg-12">
    <img src="http://img.lazymxh.cn/images/patient/zrkf.png" alt="" style="width:100%;">
     </div>
  </div>

</div>
</template>
<script  setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import useStore from "../pinia/index.js";
const store = useStore();
const route =useRoute();
const name = route.params.name;
const axios = require('axios');
const info = ref();

const sob=(()=>{
  if(store.Userislogin==500){
  return true;
}
else{
  return false;
}
});
const lsob=(()=>{
  if(store.Userislogin==200){
  return true;
}
else{
  return false;
}
});

// 向给定ID的用户发起请求
axios.get('/api/disease/kinddetail/selKindDetail?minkind='+name)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    info.value=response.data.data;
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
</script>
<style scoped>

</style>