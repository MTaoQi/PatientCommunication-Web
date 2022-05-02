<template>
  <div class="container pl">
    <div class="row">
      <div
        class="col-sm-12 col-lg-12"
        style="border: 1px solid black; border-radius: 1rem"
      >
        <p>{{ info.username }}</p>
        <h5>{{ info.titlepc }}</h5>
        <span>{{ info.contentpc }}</span>
        <div style="display: flex; justify-content: space-between">
          <span>有益：{{ info.numlike }}</span>
          <span>支持：{{ info.numcollection }}</span>
          <span>{{ info.time }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <sapn style="margin: 16px">评论</sapn>
      <el-divider />
      <div class="col-sm-12 col-lg-12" v-for="(v, i) in list" :key="i">
        <div class="row">
          <p class="col-sm-10 col-lg-10">{{ v.username }}</p>
          <el-dropdown class="col-sm-2 col-lg-2" v-show="bos(v.userid,info.userid)">
            <el-icon><more-filled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="delcomm(v.replyid)">
                  删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="row">
          <span class="col-sm-8 col-lg-8">{{ v.replycom }}</span>
          <span class="col-sm-4 col-lg-4">{{ v.time }}</span>
        </div>
        <el-divider />
      </div>
    </div>
  </div>
</template>
<script  setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { MoreFilled } from "@element-plus/icons-vue";
const axios = require("axios");
const route = useRoute();
const id = route.query.id;
const info = ref();
const list = ref([]);
function bos(userid,uid){
  if(userid ==  sessionStorage.getItem("userid") || uid == sessionStorage.getItem("userid")){
    return true;
  }else{
    return false;
  }
}
function delcomm(replyid) {
  // 向给定ID的用户发起请求
  axios
    .get("/api/disease/comments/delcomment?replyid=" + replyid)
    .then(function (response) {
      // 处理成功情况
      console.log(response);
      if (response.data.code == 200) {
        ElMessage({
         message: '删除成功',
    grouping: true,
    type: 'success',
        });
      }
      // 向给定ID的用户发起请求
      axios
        .get("/api/disease/comments/selcomment?communicationid=" + id)
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
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
}

//查询交流内容
function getSelidwrite() {
  return axios.get("/api/disease/communication/selidwrite?id=" + id);
}
//查询评论
function getSelcomment() {
  return axios.get("/api/disease/comments/selcomment?communicationid=" + id);
}

axios
  .all([getSelidwrite(), getSelcomment()])
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    info.value = response[0].data.data;
    list.value = response[1].data.data;
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
.pl {
  background: url(http://img.lazymxh.cn/images/patient/sanjiaojin.jpg) no-repeat
    center center;
  width: 100%;
  height: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size: cover;
  font-weight: bold;
  background-attachment: fixed;
}

@media only screen and (max-width: 768px) {
  .col-sm-10.col-lg-10{
    width: 80%;
  }
  .col-sm-2.col-lg-2{
    width: 20%;
  }
}

</style>