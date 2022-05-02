<template>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin: 16px">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">交流</el-breadcrumb-item>
    <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
  </el-breadcrumb>

  <div class="jumbotron">
    <img
      src="http://img.lazymxh.cn/images/patient/mk.png"
      alt=""
      style="width: 100%; height: 150px"
    />
    <p>{{ name }}</p>
  </div>
  <div class="container">
    <div style="display: flex; flex-direction: row-reverse; margin: 10px;justify-content: space-between;">
       <div class="an">
     <el-button type="primary" plain v-show="checkrname()" @click="sumnum()">查看网站数据</el-button>
      <el-button type="primary" plain @click="drawer = true"
        >发布新内容</el-button
      >
     
         </div>
      <div class="an">
      <el-button type="primary" plain @click="manage()">管理模块</el-button>
       <el-button type="primary" plain v-show="checkrname()" @click="sel()">查看违规帖子</el-button>
       </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-lg-12">
        <table border="0" style="width: 100%">
          <tr>
            <th>内容</th>
            <th>发布时间</th>
            <th>回复</th>
            <th>点赞</th>
            <th>举报</th>
          </tr>
          <tr v-for="item in list" :key="item.id" v-show="n()">
                    
            <td>
              <tr>
                {{
                  item.tit
                }}
              </tr>
              <tr>
                {{
                  item.con
                }}
              </tr>
            </td>
            <td>{{ item.time }}</td>
            <td class="iconfont icon-pinglun"></td>
            <td class="iconfont icon-dianzan">{{ item.nums }}</td>{{isjb(item.id)}}
            <td class="iconfont icon-jubao" @click="cha(item.id)" :id="`jb${item.id}`"></td>

          </tr>

        </table>
         
  <el-dialog v-model="dialogFormVisible" title="举报">
    <span>内容</span>
      <el-input v-model="jb" placeholder="请输入内容" type="textarea" style="margin:20px 0"/>
       <el-button type="warning" plain @click="jbput(tep)">提交</el-button>
  </el-dialog>

        <el-empty :image-size="200" description="尚未发布" v-show="b()" />
      </div>
    </div>
  </div>

  <el-drawer v-model="drawer" direction="ttb" title="发布新内容" size="80%">
    <span>标题</span>
    <el-input v-model="input1" placeholder="请输入标题" />
    <div style="margin: 20px 0" />
    <el-input
      v-model="input2"
      maxlength="100"
      placeholder="请输入内容"
      show-word-limit
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 6 }"
    />
    <div style="margin: 20px 0" />
    <el-button type="warning" plain @click="put()">发布</el-button>
  </el-drawer>
  
</template>
<script  setup>
import { useRoute , useRouter} from "vue-router";
import { onMounted, ref } from "vue";
import "../assets/font/iconfont.css";
import { ElMessage } from 'element-plus'
const input1 = ref("");
const input2 = ref("");
const jb = ref("");
const route = useRoute();
const router = useRouter();
const name = route.query.name;
const axios = require("axios");
const list = ref([]);
const drawer = ref(false);
const dialogFormVisible = ref(false);
const tep = ref();
function cha(id) {
  dialogFormVisible.value = true;
 tep.value=id;
}
onMounted(() => {
  getBbs();
});
function getBbs() {
  // 向给定ID的用户发起请求
  axios
    .get("/api/disease/connected/sel?mname=" + name)
    .then(function (response) {
      // 处理成功情况
      console.log(response);
      list.value = response.data.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
}
function put(){
  if(input1.value!="" && input2.value!=""){
  axios.post('/api/disease/connected/ist', {
    tit: input1.value,
    con: input2.value,
    mname: name
  })
  .then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      getBbs();
      input1.value = "";
      input2.value = "";
      drawer.value = false;
      ElMessage({
        message: '发布成功',
        type: 'success',
      });
    }
        else{
       ElMessage({
        message: '发布失败',
        type: 'warning',
      });
    }

  })
  .catch(function (error) {
    console.log(error);
  });
  }
  else{
    ElMessage({
      message: '请输入主题与内容',
      type: 'warning',
    });
  }
}

function n() {
  if (list.value.length == 0) {
    return false;
  } else {
    return true;
  }
}
function b() {
  if (list.value.length == 0) {
    return true;
  } else {
    return false;
  }
}
//举报
function jbput(conid){
  axios.post('/api/disease/report/ist', {
    conid: conid,
    text: jb.value
  })
  .then(function (response) {
    console.log(response);
    if(response.data.code == 200){
      ElMessage({
        message: '提交成功',
        type: 'success',
      });
      jb.value = "";
      dialogFormVisible.value = false;
    }
    else{
       ElMessage({
        message: '已提交',
        type: 'warning',
      });
    }
    isjb(conid);

  })
  .catch(function (error) {
    console.log(error);
  });
}
//是否举报
function isjb(id){

// 向给定ID的用户发起请求
axios.get('/api/disease/report/exi?userid='+sessionStorage.getItem("userid")+'&conid='+id)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    if(response.data.code==200){
      document.getElementById(`jb${id}`).style.color="rgb(19, 198, 174)";
    }
    else{
      document.getElementById(`jb${id}`).style.color="black";
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
const rolename =ref();
function checkrname(){
  // 向给定ID的用户发起请求
axios.get('/api/disease/role/sel?userid='+sessionStorage.getItem("userid"))
  .then(function (response) {
    // 处理成功情况
    if(response.data.code==200){   
      if(response.data.data == "admin"){
      rolename.value=true;
      }
      else{
        rolename.value=false;
      }
    }
    else{
      rolename.value=false;
    }

  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
 
  });
  // 因axios返回值是异步操作，获取返回值时，请求操作还未完成，就已经执行了赋值，导致结果位undefined。
   return rolename.value;
}
//查看违规
function sel(){
router.push("./violations");
}
//查看网站数量
function sumnum(){
router.push("./num");
}
//管理模块
function manage(){
router.push("./manage");
}

 console.log(checkrname())
</script>
<style scoped>
.jumbotron p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  font-size: 25px;
  color: #fff;
  letter-spacing: 5px;
  font-weight: bold;
}
.jumbotron {
  position: relative;
}
td,
th {
  padding: 10px;
}
@media only screen and (max-width: 768px) {
  .jumbotron p {
    font-size: 20px;
    letter-spacing: 2px;
  }
  .an{
    display: flex;
    flex-flow: column;
    align-items: flex-end;
  }
}
</style>