<template>
 <el-breadcrumb :separator-icon="ArrowRight" style="margin: 16px">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">交流</el-breadcrumb-item>
    <el-breadcrumb-item>违规帖子</el-breadcrumb-item>
  </el-breadcrumb>


  <div class="container">
  <div class="row">
    <div class="col-sm-12 col-lg-12">
         <table border="0" style="width: 100%">
             <tr>
            <th>用户id</th>
            <th>帖子id</th>
            <th>用户邮箱</th>
            <th>举报内容</th>
            <th>举报时间</th>
            <th>处理</th>
          </tr>
           <tr v-for="item in list" :key="item.id">
           <td>{{ item.userid }}</td> 
           <td>{{ item.conid }}</td> 
           <td>{{ item.email }}</td> 
           <td>{{ item.text }}</td> 
           <td>{{ item.time }}</td> 
           <el-button type="success" plain @click="del(item.conid)" :id="`del${item.conid}`">{{d}}</el-button>
          </tr>
        </table>
   
    </div>
  </div>
</div>
</template>
<script  setup>
import { onMounted, ref } from "vue";
import { ElMessage } from 'element-plus';
const axios = require('axios');
const list = ref([]);
const d = ref("删除");
onMounted(()=>{
sel();
})
function sel(){
    // 向给定ID的用户发起请求
axios.get('/api/disease/report/sel')
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

}

function del(id){
    // 向给定ID的用户发起请求
axios.get('/api/disease/connected/del?id='+id)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    if(response.data.code==200){
        ElMessage({
    message: '删除成功',
    type: 'success',
  })
    }
    else{
  ElMessage.error('删除失败');
    }
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
    // sel();
    document.getElementById(`del${id}`).innerHTML="已处理";

  });
}
</script>
<style scoped>
td,th{
    padding: 10px;
}
td{
     /* td 内容溢出自动换行 */
    word-wrap:break-word;word-break:break-all;
}



</style>