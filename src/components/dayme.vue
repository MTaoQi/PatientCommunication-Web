<template>
   <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px"> 
    <el-breadcrumb-item :to="{ path: '/loginindex' }">我的健康</el-breadcrumb-item>
    <el-breadcrumb-item>每日更新</el-breadcrumb-item>
  </el-breadcrumb>
 
  <div class="container pp">
  <div class="jumbotron">
    <h3>我的更新</h3>
  </div>
  <div class="row">
    <div class="col-sm-12 col-lg-12" v-for="item in list" :key="item.id" style="border-top: 0.5px solid #ccc;padding: 10px 0;">
      <h6>{{item.username}}</h6>
      <span>{{item.time}}</span>
      <p>{{item.titlepc}}</p>
      <p>{{item.contentpc}}</p>
      <div class="bot">
          <span class="iconfont icon-dianzan">{{item.numlike}}</span>
          <span class="iconfont icon-shoucang">{{item.numcollection}}</span>{{plnum(item.id)}}
          <span class="iconfont icon-pinglun" :id="`pl${item.id}`"></span>
      </div>
    </div>
  </div>
</div>
</template>
<script  setup>
import { ref } from 'vue';
import "../assets/font/iconfont.css";
const axios = require('axios');
const list = ref([]);
const num = ref();

// 向给定ID的用户发起请求 患者所有的更新
axios.get('/api/disease/communication/usel?userid='+sessionStorage.getItem('userid'))
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    list.value=response.data.data;
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });




function plnum(communicationid){
  // 向给定ID的用户发起请求
axios.get('/api/disease/comments/numcomment?communicationid='+communicationid)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    num.value=response.data.data;
     document.getElementById('pl'+communicationid).innerHTML=num.value;

  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
  
  }
</script>
<style scoped>
.bot{
    display: flex;
    flex-direction: row-reverse;
}
.bot span{
    margin: 0 10px;
}
/* https://img.lazymxh.cn/images/patient/splash_peep.png */
.pp{
  background: url("https://img.lazymxh.cn/images/patient/splash_peep.png") no-repeat 100% 30%;
}
.container{
  width: 100%;
  min-height: 600px;

}
</style>