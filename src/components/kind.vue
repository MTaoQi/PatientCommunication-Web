<template>
 
   <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="sob()"> 
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>类型</el-breadcrumb-item>
  </el-breadcrumb>

   <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="lsob()"> 
    <el-breadcrumb-item :to="{ path: '/loginindex' }">学习</el-breadcrumb-item>
    <el-breadcrumb-item>类型</el-breadcrumb-item>
  </el-breadcrumb>
  

  <div class="container">
  <div class="jumbotron">
      <h2>类型</h2>
    <h4>患者交流的疾病类型</h4>
    <p>多种情况来看看他们。。。</p> 
  </div>
  <div class="row">
    <div v-for="(v,i) in kindlist" :key="i" class="col-sm-4 col-lg-4">
      <div class="type" style="margin:16px">
      <h5>{{v.maxkind}}</h5>
      <span @click="selminkind(v.minkind1)">{{v.minkind1}}</span>
      <span @click="selminkind(v.minkind2)">{{v.minkind2}}</span>
      <span @click="selminkind(v.minkind3)">{{v.minkind3}}</span>
      <span @click="selminkind(v.minkind4)">{{v.minkind4}}</span>
      <span @click="selminkind(v.minkind5)">{{v.minkind5}}</span>
      <span @click="selminkind(v.minkind6)">{{v.minkind6}}</span>
      </div>
    </div>
   
    
  </div>
</div>


</template>
<script  setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useStore from "../pinia/index.js";
const store = useStore();
const axios = require('axios');
const kindlist =ref([]);
const router = useRouter();
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
axios.get('/api/disease/kind/selkind')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
     kindlist.value = response.data.data;
})
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
  function selminkind(row){
   router.push("/kinddetail/"+row)
  }
</script>
<style scoped>
.type span{
  margin-right: 10px;
  color: #0663CC;
}
</style>