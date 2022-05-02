<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-lg-12">
        <h1>404错误</h1>
        <img :src="img" alt="404错误" style="width:100%"/>
          <router-link to="/"><el-button type="warning">返回首页</el-button></router-link>
          
      </div>
    </div>
  </div>
</template>
<script  setup>
const img = "http://img.lazymxh.cn/images/patient/404.jpg";
</script>
<style scoped>

</style>