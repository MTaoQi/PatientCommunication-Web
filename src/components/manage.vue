<template>
 <el-breadcrumb :separator-icon="ArrowRight" style="margin: 16px">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">交流</el-breadcrumb-item>
    <el-breadcrumb-item>模块管理</el-breadcrumb-item>
  </el-breadcrumb>

<div class="container">
  <div class="jumbotron">
    <h3>管理我的模块</h3>
  </div>
 
  <div class="row">
    <div class="col-sm-12 col-lg-12" style="border: 1px solid #ccc;border-radius:.5rem;margin-bottom:25px;">
      <h5>我的模块</h5>
      <div v-for="item in ubbslist" :key="item.id">
     <div v-if="help(item.name)"  style="display: flex;
  justify-content: space-between;padding:12px 0;border-top: 0.5px solid lightgrey;">
       <span> {{ item.name }}</span> 
       <span> {{ item.brief }}</span>
      <el-button type="primary" plain @click="delubbs(item.id)" :id="`del${item.id}`">离开</el-button>
      </div>
      </div>
     
    </div>
    
  </div>
    <div class="row">
    <div class="col-sm-12 col-lg-12" style="border: 1px solid #ccc;border-radius:.5rem;">
      <h5>其他模块</h5>
       <div v-for="item in bbslist" :key="item.id" style="display: flex;
  justify-content: space-between;padding:12px 0;border-top: 0.5px solid lightgrey;">
      <span> {{ item.name }}</span> 
       <span>  {{ item.brief }}</span>
        <el-button type="primary" plain @click="joinbbs(item.id)" :id="`join${item.id}`">加入</el-button>
      </div>
    </div>
    
  </div>
</div>
</template>
<script  setup>
import { ref } from 'vue';
const axios = require('axios');
const bbslist = ref([]);
const ubbslist = ref([]);
function getbbs(){
  return axios.get("/api/disease/bbs/sel?userid="+sessionStorage.getItem("userid"));
}
function getubbs(){
  return axios.get("/api/disease/ubbs/sel?userid="+sessionStorage.getItem("userid"));
}
// 向给定ID的用户发起请求
axios
.all([getbbs(),getubbs()])
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    bbslist.value=response[0].data.data;
    ubbslist.value=response[1].data.data;
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
  function delubbs(id){
    axios.get("/api/disease/ubbs/del?id="+id)
    .then(function (response) {
      // 处理成功情况
      console.log(response);
      if(response.data.code==200){
        // getubbs();
        document.getElementById(`del${id}`).innerHTML="已离开";
      }
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
  }
  function joinbbs(id){
    axios.get("/api/disease/bbs/del?id="+id)
    .then(function (response) {
      // 处理成功情况
      console.log(response);
      if(response.data.code==200){
        // getubbs();
        document.getElementById(`join${id}`).innerHTML="已加入";
      }
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
  }
function help(name){
  if(name=="使用Patient communication的帮助"){
    return false;
  }
  else{
    return true;
  }

}
</script>
<style scoped>


</style>