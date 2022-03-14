<template>
<div class="box">
  <el-steps :active="active" finish-status="success" align-center>
    <el-step title="确认账号"></el-step>
    <el-step title="验证身份"></el-step>
    <el-step title="修改密码"></el-step>
  </el-steps>
  <div  :class="[Active1?'y':'n']">
         <el-input v-model="input1"  placeholder="请输入邮箱"/>
          <el-button style="margin-top: 12px" @click="next1" :disabled="but1">确定</el-button>
  </div>
    <div  :class="[Active2?'y':'n']">
         <el-input v-model="input1"  disabled placeholder=""/>
          <el-input v-model="input2"   placeholder="请输入验证码"/>
          <el-button @click="getCountdown" :disabled="totalTime <60">{{content}}</el-button>
         <el-button style="margin-top: 12px" @click="next2" :disabled="but2">确定</el-button>
        
  </div>
    <div  :class="[Active3?'y':'n']">
       <el-input v-model="input3"   placeholder="请输入密码"/>
        <el-input v-model="input33"   placeholder="确认密码"/>
       <el-button style="margin-top: 12px" @click="next3" :disabled="but3">确定</el-button>

    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
const active = ref(0);
const router = useRouter();
const but1 = ref(false);
const but2 = ref(false);
const but3 = ref(false);
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input33 = ref('');
const axios = require('axios');
const next1 = () => {
  axios.post('/api/disease/user/forgotpwdSelect', {
    "email": input1.value
 
  })
  .then(function (response) {
    console.log(response);
    if(response.data.exist==1){
      active.value++;
      Active1.value=!Active1.value;
     Active2.value=!Active2.value;

    }
    else{
       ElMessage({
        showClose: true,
        message: '邮箱不存在',
        type: 'error',
        })
    }
  })
  .catch(function (error) {
    console.log(error);
  });

};
 onMounted (()=>{ 
   if(input1.value!=""){
    but1.value=!but1.value;
    }
   
     if(input2.value!=""){
    but2.value=!but2.value;
    }
    else if(input3.value!="" && input33.value!=""){
      but3.value=!but3.value;
    }
    
   }
    );
const next2 =()=>{
  // if(content == totalTime.value + 's后重新发送'){
    if(totalTime.value <60 ){
            // let code = sessionStorage.getItem("c") ;
            //  let usercode =input2.value;

          if(sessionStorage.getItem("c") ==input2.value){
            active.value++;
            Active2.value=!Active2.value;
            Active3.value=!Active3.value;

          }
          else{
              ElMessage({
              showClose: true,
              message: '验证码错误',
              type: 'warning',
              })
          }
      
  }
  else{
     ElMessage({
    showClose: true,
    message: '验证码失效',
    type: 'warning',
  })
  }
};

const next3 = () =>{
  if(input3.value != "" && input33.value != ""){
    axios.post('/api/disease/user/forgotpwdUpdate', {
    "email": input1.value,
    "password": input3.value
    })
  .then(function (response) {
    console.log(response);
    if(response.data.success==1){
         ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      });
      router.push("../views/");
    }
  
  })
  .catch(function (error) {
    console.log(error);
  });
  }
    else{
       ElMessage({
    showClose: true,
    message: '密码不一致',
    type: 'error',
  })
    }

};

const Active1 = ref(true);
const Active2 = ref(false);
const Active3 = ref(false);
const  totalTime = ref(60);
const  content = ref("发送验证码");
const  getCountdown=()=> {

   axios.get('/api/disease/user/sendEmail?email='+input1.value )
  .then(function (response) {
    console.log(response);          
    sessionStorage.setItem("c",response.data);
 
  })
  .catch(function (error) {
    console.log(error);
  })
   .then(function () {
    // 总是会执行
       //定时器
     let clock =  window.setInterval(() => {
                content.value = totalTime.value + 's后重新发送';
                totalTime.value --;
                if(totalTime.value < 0){
                    totalTime.value = 60;
                    content.value = "重新发送验证码";
                    window.clearInterval(clock);
                }
            }, 1000);

  });
         
        };
</script>
<style scoped>
.y{
  display: block;
  width: 70%;
  margin: 0 auto;
}
.n{
  display: none;
  width: 70%;
   margin: 0 auto;
}
.box{
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 100%;
}
.el-steps.el-steps--horizontal{
margin-bottom: 20%;
}
</style>