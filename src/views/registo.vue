
<template>


  <!-- Form -->
  <el-button type="text" @click="dialogFormVisible = true"
    >open a Form nested Dialog</el-button
  >

  <el-dialog v-model="dialogFormVisible" width="50%">
    <img src="../assets/login2.png" alt="" style="width:50%" >
    <el-form :model="form"  style="width:70%;margin:0 auto;">
      <el-form-item >
        <el-input  placeholder="Email" v-model="form.name" autocomplete="off"  :prefix-icon="Message" ></el-input>
      </el-form-item>
      <el-form-item >
            <el-input placeholder="Password" v-model="form.region" autocomplete="off" :prefix-icon="Lock" ></el-input>
      </el-form-item>
        <div class="checkbox">
    <el-checkbox v-model="checked" label="记住密码" ></el-checkbox>
     <span style="color:#409EFF; display: flex; align-items: center;">忘记密码？</span>
         </div>
         <el-button type="warning" style="width:100%;margin:20px 0">登录</el-button>
    </el-form>
  </el-dialog>


  
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Message, Lock } from '@element-plus/icons-vue';



const dialogFormVisible = ref(false);
// const formLabelWidth = '140px'
const checked = ref(false);
const form = reactive({
  name: '',
  region: '',
  // date1: '',
  // date2: '',
  // delivery: false,
  // type: [],
  // resource: '',
  // desc: '',
});
</script>
<style scoped>
.checkbox{
  display: flex;
 
  justify-content: space-between;
  margin: 0 auto;



}

</style>>
  
