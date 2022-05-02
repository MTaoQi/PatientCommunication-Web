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
      <h3>{{info.typ}}</h3>
      <h4>什么是{{info.typ}}？</h4>
      <p>{{info.des}}</p>
      <h4>常见用途</h4>
      <p>{{info.effect}}</p>
        <h4>副作用</h4>
      <p>{{info.side}}</p>
    </div>
  </div>
</div>

</template>
<script  setup>
import {  useRoute , useRouter} from "vue-router";
import { ref } from "vue";
import { ArrowLeft } from '@element-plus/icons-vue'
const route =useRoute();
const word = route.query.word;
const axios = require("axios");
const info = ref();
const router = useRouter();
// 向给定ID的用户发起请求
   axios.get('/api/disease/treatdetail/Search?keyword='+word)
  .then(function (response) {
    // 处理成功情况
    console.log(response);

    if(response.data.code==200){
      info.value=response.data.data;
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
  router.push('/treat');
}
function go(){
  router.push('/treat');
}

</script>
<style scoped>
</style>