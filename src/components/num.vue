<template>
 <el-breadcrumb :separator-icon="ArrowRight" style="margin: 16px">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">交流</el-breadcrumb-item>
    <el-breadcrumb-item>网站数据</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="container">
  <div class="jumbotron">
    <h3>查看网站数据</h3>
    <p>少一分疼痛，多一分希望</p> 
  </div>
  <div class="row">
    <div class="col-sm-12 col-lg-12" style="display: flex;
    justify-content: space-between;">
        <div class="r1">
      <h5>用户总数</h5>
      <p>{{info1}}</p>
        </div>
        <div class="r2">
      <h5>举报总数</h5>
      <p>{{info2}}</p>
      </div>
      <div class="r3">
      <h5>类型主类总数</h5>
      <p>{{info3}}</p>
      </div>
      <div class="r4">
      <h5>治疗主类总数</h5>
      <p>{{info4}}</p>
      </div>
         <div class="r5">
      <h5>照顾者总数</h5>
      <p>{{info5}}</p>
      </div>
    </div>
  </div>
</div>
</template>
<script  setup>
const axios = require('axios');
import { ref } from 'vue';
const info1 = ref();
const info2 = ref();
const info3 = ref();
const info4 = ref();
const info5 = ref();
function getUsernum(){
 return axios.get("/api/disease/user/num");
}
function getReportnum(){
 return axios.get("/api/disease/report/num");
}
function getKindnum(){
 return axios.get("/api/disease/kind/num");
}
function getTreatnum(){
 return axios.get("/api/disease/treat/num");
}
function getCare(){
  return axios.get("/api/disease/user/care");
}
// 向给定ID的用户发起请求
axios.all([getUsernum(),getReportnum(),getKindnum(),getTreatnum(),getCare()])
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    info1.value=response[0].data.data;
    info2.value=response[1].data.data;
    info3.value=response[2].data.data;
    info4.value=response[3].data.data;
    info5.value=response[4].data.data;
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
/* .container{
 

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-size: cover;
  background-image: url('https://img.lazymxh.cn/images/patient/data.png');

} */
</style>