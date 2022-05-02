<template>
<el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="sob()">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/treat'}">治疗</el-breadcrumb-item>
     <el-breadcrumb-item>{{info.typ}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="lsob()">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">学习</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/treat'}">治疗</el-breadcrumb-item>
     <el-breadcrumb-item>{{info.typ}}</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
    <div class="jumbotron">
      <p>{{ info.typ }}治疗报告</p>
      <h5>什么是{{ info.typ }}？</h5>
      <span style="font-weight: bold">类别：</span>
      <span>{{ store.name }}</span>
      <p>{{ info.des }}</p>
    </div>
    <div class="row">
      <div class="col-sm-6 col-lg-6">
        <hr class="modular-treatment-big-hr" />
        <h3 style="font-weight: bold">常见用途</h3>
        <div v-for="(v, i) in liste" :key="i">
          {{ v.text }}
        </div>
      </div>
      <div class="col-sm-6 col-lg-6">
        <hr class="modular-treatment-big-hr" />
        <h3 style="font-weight: bold">副作用</h3>
           <div v-for="(v, i) in lists" :key="i">
          {{ v.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script  setup>
import useStore from "../pinia/index.js";
import { ref } from "vue";
const store = useStore();
const info = ref();
const liste = ref([]);
const lists = ref([])
const axios = require("axios");
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
axios
  .get("/api/disease/treatdetail/selTreatdetail?typ=" + store.text)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    info.value = response.data.data;
    response.data.data.effect.split("，").map((item, index) => {
      liste.value[index] = {
        id: index,
        text: item,
      };
    });
    response.data.data.side.split("，").map((item, index) => {
      lists.value[index] = {
        id: index,
        text: item,
      };
    });
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
.modular-treatment-big-hr {
  height: 6px;
  width: 165px;
  background-color: #bebebe;
}
</style>