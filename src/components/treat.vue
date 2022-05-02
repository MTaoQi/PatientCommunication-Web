<template>
 <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="sob()">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>治疗</el-breadcrumb-item>
  </el-breadcrumb>
   <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="lsob()">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">学习</el-breadcrumb-item>
    <el-breadcrumb-item>治疗</el-breadcrumb-item>
  </el-breadcrumb>

 <div class="container">
  <div class="jumbotron">
    <h2>治疗</h2>
    <p style="font-weight:bold;">搜索</p>
<el-input v-model="input" @change="sel(input)" placeholder="请输入关键词" style="width:50%"/>
<h5 style="font-weight:bold;">治疗报告</h5>
<span>点击查看患者对常见用途及其副作用的看法</span>
  </div>
  <div class="row">
    <div class="col-sm-4 col-lg-4"  v-for="(item,index) in list" :key="index" style="display:flex;flex-flow: column; border: 2px dashed lightblue;">
      <h3>{{item.name}}</h3>
   <div v-for="(v,i) in sl[index]" :key="i">
    <!-- <div v-for="(b,k) in v" :key="k"> -->
     <p @click="td(v.text,item.name)">{{ v.text }}</p> 
    <!-- </div> -->
  </div>
    </div> 
  </div>
</div>

</template>
<script  setup>
import { ref } from 'vue';
import  pinia  from '../pinia';
import { useRouter } from 'vue-router'
const store = pinia();
const router = useRouter();
const input = ref('');
const axios = require('axios');
const list  = ref([]);
const sl =ref([]);
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
axios.get('/api/disease/treat/selTreat')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    list.value=response.data.data;
    for(var i=0;i<list.value.length;i++){
     
    console.log(list.value[3].type);
    sl.value[i]= list.value[i].type.split("，").map((item,index)=>{
        return {
          id:index,
          text:item
        };
      });

    }

  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
  function td(text,name){
    store.setText(text);
    store.setName(name);
   router.push("./treatdetail")
  }

  function sel(input){
    router.push({
      path:'/search',
      query:{
         word:input
      }
    })
}
</script>
<style scoped>


</style>