<template>
<div class="navmobile" >
  <!--移动端 menu菜单 -->
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#FFD700"
      active-text-color="#fff"
      @select="handleSelect"
    >

    <el-sub-menu index="1">
        <template #title><span class="iconfont icon-zhankai1"></span></template>
        <el-input
          v-model="input1"
         @change="handleChange(input1)"
          placeholder="请输入疾病名称"
          :suffix-icon="Search"
        />
             <router-link to="/loginindex"><el-menu-item index="1-1"><span>主页</span></el-menu-item></router-link> 
           <el-sub-menu index="1-2">
            <template #title>我的健康</template>
          <router-link to="/dayme"><el-menu-item index="1-2-1">每日更新</el-menu-item></router-link>
           </el-sub-menu>
          <el-sub-menu index="1-3">
            <template #title>学习</template>
              <router-link to="/kind" append><el-menu-item index="1-3-1">类型</el-menu-item></router-link>
              <router-link to="/treat" append><el-menu-item index="1-3-2">治疗</el-menu-item></router-link>
            <router-link to="/symptoms" append><el-menu-item index="1-3-3">症状</el-menu-item></router-link>
          </el-sub-menu>
         <el-sub-menu index="1-4">
          <template #title>交流</template>
         <div v-for="item in ubbs" :key="item.id">
           <el-menu-item index="4-item.id" @click="goubbs(item.name)">{{item.name}}</el-menu-item>
            </div>
        </el-sub-menu>
     </el-sub-menu>
    <div class="logo"><img alt="logo" src="../assets/logo.png" style="width:4rem"/></div>
    
 <el-button type="warning" @click="exit" style="margin:0.7rem">退出</el-button>

  </el-menu>


</div>
  <div class="container lognav">
    <div class="row">
      <div class="col-sm-6 col-lg-6">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <img
            alt="logo"
            src="../assets/logo.png"
            style="width: 10%; margin: 0 4rem"
          />
           <router-link to="/loginindex"><el-menu-item index="1">主页</el-menu-item></router-link>
          <el-sub-menu index="2">
            <template #title> 我的健康</template>
           <router-link to="/dayme"><el-menu-item index="2-1">每日更新</el-menu-item></router-link> 
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>学习</template>
            <router-link to="/kind" append><el-menu-item index="3-1">类型</el-menu-item></router-link>
          <!-- <router-link to="/kind" append>
          <el-sub-menu index="3-1">
              <template #title>类型</template>
              <router-link to="/error"><el-menu-item index="3-1-1">item one</el-menu-item></router-link>
              <el-menu-item index="3-1-2">item two</el-menu-item>
              <el-menu-item index="3-1-3">item three</el-menu-item>
            </el-sub-menu>
            </router-link> -->
           <router-link to="/treat" append><el-menu-item index="3-2">治疗</el-menu-item></router-link>
           <router-link to="/symptoms" append><el-menu-item index="3-3">症状</el-menu-item></router-link> 
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>交流</template>
            <!-- <el-menu-item index="4-1">item one</el-menu-item>-->
            <div v-for="item in ubbs" :key="item.id">
           <el-menu-item index="4-item.id" @click="goubbs(item.name)">{{item.name}}</el-menu-item>
            </div>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="col-sm-4 col-lg-4">
        <el-input
          v-model="input1"
           @change="handleChange(input1)"
          placeholder="请输入疾病名称"
          :suffix-icon="Search"
           style="width:70%"
        ></el-input>
      </div>
      <div class="col-sm-2 col-lg-2">
        <el-button type="warning" @click="exit">退出</el-button>
      </div>
    </div>
  </div>
  
  <div class="container">
    <div class="row">
<div v-for="item in finfo" :key="item.id" class="col-sm-12 col-lg-12" style="text-align:center;margin:10px 0">
  {{ item.province }}
  {{ item.city }}
  {{ item.weather  }}
  {{ item.temperature }}℃
  {{ selday }}
  {{ item.reporttime }}
  <!-- 数据发布时间 -->
</div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-lg-10">
        <div class="echarts-box">
          <div id="myEcharts" :style="{ width: '100%', height: '300px' }"></div>
        </div>
      </div>
      <div class="col-sm-2 col-lg-2">
        <el-icon color="#FEE019" :size="30" @click="put = true"
          ><circle-plus-filled
        /></el-icon>
      </div>
    </div>
  </div>
  <el-drawer v-model="put" :with-header="false" direction="ttb" size="80%">
    <mood></mood>
    <el-button @click="cancelForm">取消</el-button>
  </el-drawer>
  <div class="container">
    <div class="row">
      <div
        v-for="(v, i) in list"
        :key="i"
        class="col-sm-12 col-lg-12"
        style="border: 1px solid #ccc; border-radius: 1rem; margin-bottom: 12px"
      >
        <div style="display: flex; justify-content: space-between">
          <p>{{ v.username }}</p>
          <!-- 点击菜单项后会触发事件 -->
          <el-dropdown @command="handleCommand" v-show="sorb(v.userid)">
            <button style="border: 0; background: #fff">
              <el-icon><more-filled /></el-icon>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-button style="border: 0" @click="alt(v.id)">
                  编辑
                </el-button>
                <el-dropdown-item :command="`d${v.id}`">删除</el-dropdown-item>
              </el-dropdown-menu>
                <!-- <el-drawer
                  v-model="dra"
                  title="编辑内容"
                  :with-header="false"
                  direction="btt"
                  size="50%"
                >
                  <el-form :model="FormEdit">
                    <el-form-item label="标题">
                      <el-input
                        v-model="FormEdit.tit"
                        type="textarea"
                        autosize
                        placeholder="请输入标题"
                      />
                    </el-form-item>
                    <el-form-item label="内容">
                      <el-input
                        v-model="FormEdit.con"
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        placeholder="请输入内容"
                      />
                    </el-form-item>
                  </el-form>
                  <el-button type="warning" @click="upd(v.id)">
                    修改
                  </el-button>
                  <el-button @click="CancelFromEdit">取消</el-button>
                </el-drawer> -->
            </template>
            
          </el-dropdown>
        </div>
            
       
        <p style="font-weight: bold; margin: 0">{{ v.titlepc }}</p>
        <!-- <p>{{ v.contentpc }}</p> -->
        <p v-html="v.contentpc"></p>
        <div style="display: flex; justify-content: space-between">
          <div>
            <button style="border: 0; background: #fff" @click="like(v.id, i)">
              <span class="iconfont icon-dianzan" :id="`like${v.id}`"></span
              >{{ islike(v.id) }}</button
            >{{ v.numlike }}有益
            <button
              style="border: 0; background: #fff"
              @click="shoucang(v.id, i)"
            >
              <span
                class="iconfont icon-shoucang"
                :id="`shoucang${v.id}`"
              ></span
              >{{ isshoucang(v.id) }}</button
            >{{v.numcollection}}支持
            <button style="border: 0; background: #fff" @click="rec(v.id)">
              <span class="iconfont icon-pinglun"></span>回复
            </button>
            <span @click="jump(v.id)">
              <i class="iconfont icon-chakan1" style="color:rgb(19, 198, 174)"></i>查看
            </span>
          </div>
          <span>{{ v.time }}</span>
        </div>
       <div  :id="`rec${v.id}`"  style="display:none">
         <input type="text" :id="`ipt${v.id}`" v-model="reply">
             <el-button type="warning" :disabled="send" @click="replycom(v.id)" >发送</el-button>
       </div>       
      </div>
       <el-drawer
                  v-model="dra"
                  title="编辑内容"
                  :with-header="false"
                  direction="btt"
                  size="50%"
                >
                  <el-form :model="FormEdit">
                    <el-form-item label="标题">
                      <el-input
                        v-model="FormEdit.tit"
                        type="textarea"
                        autosize
                        placeholder="请输入标题"
                      />
                    </el-form-item>
                    <el-form-item label="内容">
                      <el-input
                        v-model="FormEdit.con"
                        type="textarea"
                        :autosize="{ minRows: 2 }"
                        placeholder="请输入内容"
                      />
                    </el-form-item>
                  </el-form>
                  <el-button type="warning" @click="upd(t)">
                    修改
                  </el-button>
                  <el-button @click="CancelFromEdit">取消</el-button>
                </el-drawer>
    </div>
  </div>

 
  <!-- {{ listArray }} -->
</template>

<script setup>
import {  useRouter } from "vue-router";
import useStore from "../pinia/index.js";
import "../assets/font/iconfont.css";
import mood from "./mood.vue";
import * as echarts from "echarts";
import { ref, onUnmounted, onMounted, computed, reactive } from "vue";
import { Search, CirclePlusFilled, MoreFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
function sorb(userid){
  if(userid ==  sessionStorage.getItem("userid")){
    return true;
  }else{
    return false;
  }
}
const reply = ref("");
const dra = ref(false);
const t = ref();
function alt(rr){
  dra.value = true;
  t.value = rr;
}
// const sty = reactive({color:""});
// const styy= reactive({color:"red"});
const uname = ref();
const input1 = ref("");
function handleChange(input1){
      router.push({
        path: "../views/searchdisease",
        query: {
          keywordDis: input1,
        },
      });
     
    }

  const ubbs = ref([]);
  

// const jump=(row)=>{
// router.push("/communication/"+row);
// };
function jump (row){
  router.push({
    name: "communication",
    query: {
      id: row
    }
  });
}
function goubbs (row){
  router.push({
    name: "bbs",
    query: {
      name: row
    }
  });
}
const store = useStore();
const cancelForm = () => {
  put.value = false;
};

const router = useRouter();
const activeIndex = ref("1");
const state = ref();
const charArray = ref();
const tep = ref();
const listArray = ref([]);
const axios = require("axios");
const put = ref(false);
const list = ref([]);
const FormEdit = reactive({
  tit: "",
  con: "",
});
const finfo = ref([]);
//天气
function Weather(){
  // 210200 大连城市代码 实况天气 base   预报all
// https://restapi.amap.com/v3/weather/weatherInfo?key=fb4abcf900ce27d4defd75dfec1d0e11&city=130400&extensions=all
  // 向给定ID的用户发起请求
axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=fb4abcf900ce27d4defd75dfec1d0e11&city=130400&extensions=base')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    if(response.data.status==1){
    finfo.value=response.data.lives;
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

function CancelFromEdit(){
  dra.value=false;
}
const send =computed(()=>{
  if (reply.value != "") {
        return false;
      }
      return true;//input为空 true 禁用
})
// const sty =reactive({color:"black"});
const like = (id, i) => {
  if (store.Userislogin == 200) {
    // 向给定ID的用户发起请求  用户点赞
    const rest = ref();
    axios
      .get(
        "/api/disease/like/istlike?communicationid=" +
          id +
          "&userid=" +
          sessionStorage.getItem("userid")
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        rest.value = response.data;
        // show();
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行

        list.value[i].numlike = rest.value.data;
        islike(id);
      });
  }
};
function islike(cid) {
  if (store.Userislogin == 200) {
    // 向给定ID的用户发起请求  用户是否点赞
    axios
      .get("/api/disease/like/islike?communicationid=" + cid)
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        var c = response.data.data;
        const span = document.getElementById(`like${cid}`);
        if (c == "yes") {
          // sty.color="red";
          // c="no";
          //  sty.color="red"
          span.style.color = "rgb(19, 198, 174)";
        } else {
          // sty.color="";
          // c="yes";
          //  sty.color=""
          span.style.color = "black";
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
}

const shoucang = (id, i) => {
  if (store.Userislogin == 200) {
    const sc = ref();
    // 向给定ID的用户发起请求 用户收藏
    axios
      .get(
        "/api/disease/collection/iscollection?userid=" +
          sessionStorage.getItem("userid") +
          "&communicationid=" +
          id
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        sc.value = response.data.data;

        // show();
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
    
        list.value[i].numcollection = sc.value;
        isshoucang(id);
      });
  }
};
function isshoucang(isc) {
  if (store.Userislogin == 200) {
    // 向给定ID的用户发起请求  用户是否点赞
    axios
      .get(
        "/api/disease/collection/istcollection?userid=" +
          sessionStorage.getItem("userid") +
          "&communicationid=" +
          isc
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        var c = response.data.data;
        const span = document.getElementById(`shoucang${isc}`);
        if (c == "yes") {
          // sty.color="red";
          // c="no";
          //  sty.color="red"
          span.style.color = "rgb(19, 198, 174)";
        } else {
          // sty.color="";
          // c="yes";
          //  sty.color=""
          span.style.color = "black";
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
}
function handleCommand(command) {
  if (command.slice(0, 1) == "d") {
    const delid = ref();
    delid.value = command.replace("d", "").trim();
    delcontent(delid.value);
  }
}
function delcontent(delid) {
  if (store.Userislogin == 200) {
    // 向给定ID的用户发起请求
    axios
      .get("/api/disease/communication/delwrite?id=" + delid)
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        if (response.data.code == 200) {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
        }
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
        show();
      });
  }
}
function upd(updid) {
   if (store.Userislogin == 200) {
  axios
    .post("/api/disease/communication/updwrite", {
      titlepc: FormEdit.tit,
      contentpc: FormEdit.con,
      id: updid,
    })
    .then(function (response) {
      console.log(response);
       ElMessage({
            message: "修改成功",
            type: "success",
          });
          show();
           dra.value=false;
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   else{
    ElMessage({
            message: "请先登录",
            type: "error",
          });
   }
}
function rec(recid){
 const p =document.getElementById(`rec${recid}`);
 if(p.style.display=="none"){
  p.style.display="inline-block";
 }
 else{p.style.display="none"}
}
function getUname(userid){
// 向给定ID的用户发起请求
axios.get('/api/disease/user/getUname?userid='+userid)
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    uname.value = response.data.data;
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
}

// date格式转成yy-MM-dd HH:mm:ss
function DateToStr(dd) {
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
  var h = dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours();
  var n = dd.getMinutes() <10 ? '0' + dd.getMinutes() : dd.getMinutes();
  var s = dd.getSeconds() <10 ? '0' + dd.getSeconds() : dd.getSeconds();
  return y + '-' + m + '-' + d + ' ' + h + ':' + n + ':' + s;
}
//评论
function replycom(rid){
   var t = DateToStr(new Date());
  axios.post('/api/disease/comments/istcomment', {
    communicationid: rid,
    userid: sessionStorage.getItem("userid"),
    username:uname.value,
    replycom: reply.value,
    time: t,
  })
  .then(function (response) {
    console.log(response);
    if(response.data.code==200){
    ElMessage({
            message: "评论成功",
            type: "success",
          });
          reply.value="";
          rec(rid);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
 }

/// 声明定义一下echart
let echart = echarts;
let chart = null;
// 基础配置一下Echarts
function initChart(listArray) {
  // let chart = echart.init(document.getElementById("myEcharts"));
   chart = echart.init(document.getElementById("myEcharts"));
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {
      type: "category",
      data: lastweek,
    },
    tooltip: {
      trigger: "axis",
    }, //触发类型；轴触发
    yAxis: {
      type: "value",
      axisLabel: {
        show: false, //隐藏刻度值
        splitNumber: 4, //横线数量
      },
    },
    series: [
      {

        data: listArray,
        type: "line",
        // smooth: true
      },
    ],
  });
  window.onresize = function () {
    //自适应大小
    chart.resize();
  };
}
function show() {
  axios
    .get("/api/disease/communication/selwrite")
    .then(function (response) {
      console.log(response);
      list.value = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

onMounted(() => {
  // initChart();
  // 向给定ID的用户发起请求
  function getselmood() {
    return axios.get("/api/disease/feel/selmood");
  }
  function getshow() {
    return axios.get("/api/disease/communication/selwrite");
  }
  axios
    .all([getselmood(), getshow()])
    .then(function (response) {
      // 处理成功情况
      console.log(response);

      state.value = response[0].data.data.publicationState;
       list.value = response[1].data.data;
      charArray.value = state.value.split(",");
      for (let i = 0; i < charArray.value.length; i++) {
        tep.value = charArray.value[i].split("=");
        listArray.value.push(parseInt(tep.value[1]));
        //  charlist.value.push(charArray.value[i].split("=")[1].strip());
      }
      initChart(listArray.value);
      // let chart = echart.init(document.getElementById("myEcharts"));
      // chart.setOption({
      //   series: [
      //     {
      //       data: listArray.value,
      //       type: "line",
      //       // smooth: true
      //     },
      //   ],
      // });

      // list.value = response[1].data.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
     getUname(sessionStorage.getItem("userid"));
     Weather();
});

// onUnmounted(() => {
//   echart.dispose;
// });
// 示例申明，onUnmounted生命周期里，对资源进行释放。
onUnmounted(() => {
  // echart.dispose(chart);
  if(!chart){
    return
  }
  chart.dispose();
  chart = null;
});

var day = new Date().getDay();
const week = [0, 1, 2, 3, 4, 5, 6];
const showWeek = computed(() => {
  let index = week.indexOf(day);
  const newweek = [];
  for (let i = 0; i < week.length; i++) {
    index -= 1;
    if (index == -1) index = 6;
    newweek.push(week[index]);
  }
  return newweek;
});
const selday = ref();
const lastweek = [];

for (let i = 0; i < showWeek.value.length; i++) {
  switch (showWeek.value[i]) {
    case 0:
      selday.value = "周日";
      break;
    case 1:
      selday.value = "周一";
      break;
    case 2:
      selday.value = "周二";
      break;
    case 3:
      selday.value = "周三";
      break;
    case 4:
      selday.value = "周四";
      break;
    case 5:
      selday.value = "周五";
      break;
    default:
      selday.value = "周六";
  }
  lastweek.push(selday.value);
}
const exit = () => {
  router.push("../views/");
};
//   return { initChart };





// 向给定ID的用户发起请求
axios.get('/api/disease/ubbs/sel?userid='+sessionStorage.getItem("userid")) 
  .then(function (response) {
    // 处理成功情况
    console.log(response);
    ubbs.value=response.data.data;
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
.lognav {
  margin: 0;
  padding: 0;
  max-width: 100%;
  background-color: #545c64;
}
.row {
  width: 100%;
}
.col-sm-6.col-lg-6,
.col-sm-4.col-lg-4,
.col-sm-2.col-lg-2 {
  padding: 0;
}
.col-sm-4.col-lg-4 {
  display: flex;
  justify-content: center;
}
.navmobile{
  display: none;
}
@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
    /* padding: 0; */
  }
  .col-sm-10.col-lg-10 {
    padding: 0;
  }
  .lognav {
    display: none;
  }
  .navmobile{
    display: block;
  }
}
</style>
