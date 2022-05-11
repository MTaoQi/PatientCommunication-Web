<template>
  <!--顶部菜单 -->
  <div class="container topnav">
    <div class="menu row" style="background-color: #545c64">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <!-- 菜单 -->
      <div class="col-sm-6 col-lg-6">
        <el-menu
          :default-active="activeIndex1"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <img alt="logo" src="../assets/logo.png" />
          <router-link to="/" append><el-menu-item index="1">关于</el-menu-item></router-link> 
          <router-link to="../components/kind" append><el-menu-item index="2">类型</el-menu-item></router-link>
         <router-link to="../components/treat" append> <el-menu-item index="3">治疗</el-menu-item></router-link>
         <router-link to="../components/symptoms"><el-menu-item index="4">症状</el-menu-item></router-link> 
        </el-menu>
      </div>
      <!-- 搜索框 -->
      <div class="col-sm-4 col-lg-4">
        <el-input
          v-model="input1"
          @change="handleChange(input1)"
          placeholder="请输入疾病名称"
          :suffix-icon="Search"
          style="width:70%"
        ></el-input>
        <!-- <span class="iconfont icon-sousuo"></span> -->
      </div>
      <!-- 登录注册 -->
      <div class="col-sm-2 col-lg-2">
        <!-- 登录 -->
        <el-button color="#827e73" plain @click="dialogFormVisible = true"
          >登录</el-button
        >
        <el-dialog v-model="dialogFormVisible" width="50%">
          <img
            src="../assets/login2.png"
            alt=""
            style="width: 40%; height: 40%; display: flex; margin: 0 auto"
          />
          <el-form :model="form" style="width: 70%; margin: 0 auto">
            <el-form-item>
              <el-input
                id="unique"
                placeholder="Email"
                v-model="form.email"
                autocomplete="off"
                :prefix-icon="Message"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                id="pwd"
                placeholder="Password"
                v-model="form.password"
                autocomplete="off"
                :prefix-icon="Lock"
                type="password"
              ></el-input>
            </el-form-item>
            <div class="checkbox">
              <el-checkbox
                v-model="checked"
                label="记住密码"
                @change="save"
              ></el-checkbox>
              <span
                style="color: #409eff; display: flex; align-items: center"
                @click="forgotpwd"
                >忘记密码？</span
              >
            </div>
             <el-checkbox
                v-model="checked2"
                label="管理员身份"
              ></el-checkbox>
            <el-button
              type="warning"
              style="width: 100%; margin: 20px 0"
              @click="login"
              >登录</el-button
            >
          </el-form>
        </el-dialog>
        <!-- 注册 第一次-->
        <el-button
          color="#FFD700"
          style="color: black"
          @click="zhucedialogpc = true"
          >注册</el-button
        >
        <el-dialog v-model="zhucedialogpc" width="70%">
          <div style="display: flex; justify-content: space-around">
            <div
              class="zcleft"
              style="
                width: 50%;
                background: url(http://img.lazymxh.cn/images/patient/sanjiaojin.jpg)
                  no-repeat;
                background-size: 100% 100%;
              "
            ></div>
            <div class="zcright" style="width: 50%">
              <span style="display: block; text-align: center"
                >希望，这就是它开始的地方</span
              >
              <el-form
                :model="formzc"
                style="width: 70%; margin: 0 auto"
                @validate="validate"
              >
                <el-form-item>
                  <div style="display: flex; flex-flow: column">
                    <el-radio v-model="formzc.identity" label="0" @change="none"
                      >患者</el-radio
                    >
                    <!-- 1 -->
                    <el-radio
                      v-model="formzc.identity"
                      label="1"
                      @change="block"
                      >照顾者</el-radio
                    >
                  </div>
                </el-form-item>
                <el-form-item
                  prop="email"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮箱',
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: '请输入正确邮箱',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input
                    placeholder="Email"
                    v-model="formzc.email"
                    autocomplete="off"
                    :prefix-icon="Message"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="username"
                  :rules="{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur',
                  }"
                >
                  <el-input
                    placeholder="Username"
                    v-model="formzc.username"
                    autocomplete="off"
                    :prefix-icon="User"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="password"
                  :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '请输入6位以上密码', trigger: 'blur' },
                  ]"
                >
                  <el-input
                    placeholder="Password"
                    v-model="formzc.password"
                    autocomplete="off"
                    :prefix-icon="Lock"
                    type="password"
                  ></el-input>
                </el-form-item>
                <p
                  :class="[isActive ? 'y' : 'n']"
                  style="text-align: left; margin: 0"
                >
                  （可选）
                </p>
                <el-form-item>
                  <el-input
                    placeholder="Symptoms"
                    v-model="formzc.symptoms"
                    autocomplete="off"
                    :prefix-icon="QuestionFilled"
                  ></el-input>
                </el-form-item>
                <el-button
                  type="warning"
                  style="width: 100%; margin: 20px 0"
                  @click="reg"
                  >注册</el-button
                >
              </el-form>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <!-- row -->
  </div>
  <!-- container -->

  <!-- 手机端 -->

  <div class="mobile-menu">
    <!-- 菜单 -->
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
            <router-link to="/" append> <el-menu-item index="1-1">关于</el-menu-item></router-link>
        <router-link to="../components/kind" append>  <el-menu-item index="1-2">类型</el-menu-item></router-link>
            <router-link to="../components/treat" append>   <el-menu-item index="1-3">治疗</el-menu-item></router-link>
                <router-link to="../components/symptoms"> <el-menu-item index="1-4">症状</el-menu-item></router-link>
        <el-row style="display:flex;justify-content:center">
          <!-- 下拉登录 -->
          <el-button
            color="#827e73"
            plain
            @click="dialogFormVisible1 = true"
            round
            style="margin:0 10px;"
            >登录</el-button
          >
          <el-dialog v-model="dialogFormVisible1" width="80%">
            <img
              src="../assets/login2.png"
              alt=""
              style="width: 60%; margin: 0 auto; display: flex"
            />
            <el-form :model="form" style="width: 80%; margin: 0 auto">
              <el-form-item>
                <el-input
                  id="unique"
                  placeholder="Email"
                  v-model="form.email"
                  autocomplete="off"
                  :prefix-icon="Message"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  id="pwd"
                  placeholder="Password"
                  v-model="form.password"
                  autocomplete="off"
                  :prefix-icon="Lock"
                  type="password"
                ></el-input>
              </el-form-item>
              <div class="checkbox">
                <el-checkbox
                  v-model="checked"
                  label="记住密码"
                  @change="save"
                ></el-checkbox>
                <span
                  style="color: #409eff; display: flex; align-items: center"
                  @click="forgotpwd"
                  >忘记密码？</span
                >
              </div>
              <el-checkbox
                v-model="checked2"
                label="管理员身份"
              ></el-checkbox>
              <el-button
                type="warning"
                style="width: 100%; margin: 20px 0"
                @click="login"
                >登录</el-button
              >
            </el-form>
          </el-dialog>
          <!-- 下拉注册 第二次-->
          <el-button
            color="#FFD700"
            style="color: black;margin:0 10px;"
            @click="zhucedialogpc1 = true"
            round
            >注册</el-button
          >
          <el-dialog v-model="zhucedialogpc1" width="80%">
            <span style="margin: 0 auto">希望，这就是它开始的地方</span>
            <el-form
              :model="formzc"
              style="width: 70%; margin: 0 auto"
              @validate="validate"
            >
              <el-form-item>
                <div style="display: flex; flex-flow: column">
                  <el-radio v-model="formzc.identity" label="0" @change="none"
                    >患者</el-radio
                  >
                  <el-radio v-model="formzc.identity" label="1" @change="block"
                    >照顾者</el-radio
                  >
                </div>
              </el-form-item>
              <el-form-item
                prop="email"
                :rules="[
                  {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur',
                  },
                  {
                    type: 'email',
                    message: '请输入正确邮箱',
                    trigger: ['blur', 'change'],
                  },
                ]"
              >
                <el-input
                  placeholder="Email"
                  v-model="formzc.email"
                  autocomplete="off"
                  :prefix-icon="Message"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="username"
                :rules="{
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur',
                }"
              >
                <el-input
                  placeholder="Username"
                  v-model="formzc.username"
                  autocomplete="off"
                  :prefix-icon="User"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, message: '请输入6位以上密码', trigger: 'blur' },
                ]"
              >
                <el-input
                  placeholder="Password"
                  v-model="formzc.password"
                  autocomplete="off"
                  :prefix-icon="Lock"
                  type="password"
                ></el-input>
              </el-form-item>
              <p
                :class="[isActive ? 'y' : 'n']"
                style="text-align: left; margin: 0"
              >
                （可选）
              </p>
              <el-form-item>
                <el-input
                  placeholder="Symptoms"
                  v-model="formzc.symptoms"
                  autocomplete="off"
                  :prefix-icon="QuestionFilled"
                ></el-input>
              </el-form-item>
              <el-button
                type="warning"
                style="width: 100%; margin: 20px 0"
                @click="reg"
                >注册</el-button
              >
            </el-form>
          </el-dialog>
        </el-row>
      </el-sub-menu>
      <!-- 中间图标 -->
      <div class="logo"><img alt="logo" src="../assets/logo.png" /></div>
      <!-- 右边注册 第三次-->
      <el-row>
        <el-button
          color="#FFD700"
          style="color: black"
          @click="zhucedialogpc1 = true"
          >注册</el-button
        >
        <el-dialog v-model="zhucedialogpc1" width="80%">
          <span style="margin: 0 auto">希望，这就是它开始的地方</span>
          <el-form
            :model="formzc"
            style="width: 70%; margin: 0 auto"
            @validate="validate"
          >
            <el-form-item>
              <div style="display: flex; flex-flow: column">
                <el-radio v-model="formzc.identity" label="0" @change="none"
                  >患者</el-radio
                >
                <el-radio v-model="formzc.identity" label="1" @change="block"
                  >照顾者</el-radio
                >
              </div>
            </el-form-item>
            <el-form-item
              prop="email"
              :rules="[
                {
                  required: true,
                  message: '请输入邮箱',
                  trigger: 'blur',
                },
                {
                  type: 'email',
                  message: '请输入正确邮箱',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                placeholder="Email"
                v-model="formzc.email"
                autocomplete="off"
                :prefix-icon="Message"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="username"
              :rules="{
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
              }"
            >
              <el-input
                placeholder="Username"
                v-model="formzc.username"
                autocomplete="off"
                :prefix-icon="User"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, message: '请输入6位以上密码', trigger: 'blur' },
              ]"
            >
              <el-input
                placeholder="Password"
                v-model="formzc.password"
                autocomplete="off"
                :prefix-icon="Lock"
                type="password"
              ></el-input>
            </el-form-item>
            <p
              :class="[isActive ? 'y' : 'n']"
              style="text-align: left; margin: 0"
            >
              （可选）
            </p>
            <el-form-item>
              <el-input
                placeholder="Symptoms"
                v-model="formzc.symptoms"
                autocomplete="off"
                :prefix-icon="QuestionFilled"
              ></el-input>
            </el-form-item>
            <el-button
              type="warning"
              style="width: 100%; margin: 20px 0"
              @click="reg"
              >注册</el-button
            >
          </el-form>
        </el-dialog>
      </el-row>
    </el-menu>
  </div>
  <!-- 手机 web 内容 -->

  <!-- 轮播图 -->
  <div class="lunbotu">
    <el-carousel indicator-position="outside" height="150px">
      <el-carousel-item v-for="(v, i) in list" :key="i">
        <img :src="pic + v.src" alt="" style="width: 100%; height: 150px" />
        <!-- <img :src="`${pic}${v.src}`" alt=""> -->
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- 视频 -->
  <!-- <div :class="[isvideo ? 'isv' : 'nov']">
    <div style="display: flex; justify-content: center">
      <vue3VideoPlay v-bind="options" />
    </div>
  </div> -->
  <div class="container">
    <!-- 与同行联系 -->
    <div class="title0">
      <h5>与同行联系</h5>
      <p>在这里你不是独自一人</p>
      <div class="bottom">
        <el-button
          type="button"
          class="btn btn-warning btn-sm"
          @click="dialogvideo = true"
        >
          认识淘气
        </el-button>

        <el-dialog v-model="dialogvideo" width="80%"
          ><vue3VideoPlay v-bind="options"
        /></el-dialog>
        <img
          src="http://img.lazymxh.cn/images/patient/tao.jpg"
          alt=""
          style="
            width: 25px;
            height: 25px;
            margin-left: 20px;
            margin-right: 10px;
            border-radius: 0.5rem;
          "
        />
        <span>patient成员</span>
      </div>
    </div>

    <el-divider content-position="left" border-style="dashed"
      >少一分疼痛</el-divider
    >
    <!-- 一起学习 -->
    <div class="title1">
      <h5>一起学习</h5>
      <p>从那些最了解您的病情的人那里获得建议和支持</p>
    </div>
    <div class="row">
      <div
        class="col-sm-4 col-lg-4"
        v-for="(v, i) in about1"
        :key="i"
        style="display: flex; flex-flow: column"
      >
        <img :src="pic + v.pic1" alt="" />
        <span>{{ v.title1 }}</span>
        <span>{{ v.content1 }}</span>
      </div>
    </div>
    <el-divider content-position="right" border-style="dashed"
      >多一分希望</el-divider
    >
    <div class="title1">
      <h5>掌控全局</h5>
      <p>实时跟踪和监控您自己的个人健康数据。</p>
    </div>
    <div class="row">
      <div
        class="col-sm-4 col-lg-4"
        v-for="(v, i) in about2"
        :key="i"
        style="display: flex; flex-flow: column"
      >
        <img :src="pic + v.pic2" alt="" />
        <span>{{ v.title2 }}</span>
        <span>{{ v.content2 }}</span>
      </div>
    </div>
  </div>

  
   <div class="beian" style="margin-top:60px;font-size:12px;display: flex;
    flex-flow: column;
    align-items: center;background-color: #282a2c99;padding:20px 0;">
    <img src="https://img.shields.io/badge/%C2%A92022-%E6%82%A3%E8%80%85%E4%BA%A4%E6%B5%81-%23FFD700" alt="">
    <div style="margin-top:10px;">
    <a target="_blank" href="https://beian.miit.gov.cn" rel="nofollow"><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#FFFFFF;">冀ICP备2021028836号-1</p></a>
    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13040602000259" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../assets/备案图标.png" style="float:left;margin-left:10px;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#FFFFFF;">冀公网安备 13040602000259号</p></a>
    </div>
  </div> 

 
</template>

<script >
// import HelloWorld from '@/components/HelloWorld.vue'
import pinia from '../pinia';
import "vue3-video-play/dist/style.css";
import { ref, reactive, onMounted } from "vue";
import "../assets/font/iconfont.css";
import {
  Message,
  Lock,
  Search,
  User,
  QuestionFilled,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElNotification, ElMessage } from "element-plus";

export default {
  name: "index",
  components: {
    // HelloWorld
  },
  setup() {
    const store = pinia();
    const emailisTrue = ref();
    const unameisTrue = ref();
    const pwdisTrue = ref();
    function validate(prop, isValid, message) {
      console.log(message);
      switch (prop) {
        case "email":
          emailisTrue.value = isValid;
          break;
        case "username":
          unameisTrue.value = isValid;
          break;
        case "password":
          pwdisTrue.value = isValid;
          break;
        default:
          break;
      }
    }
    //video视频
    const options = reactive({
      width: "100%", //播放器高度
      height: "100%", //播放器高度
      color: "#409eff", //主题色
      // currentTime: 60,
      // speed: false, //关闭进度条拖动
      title: "", //视频名称
      src: "http://img.lazymxh.cn/video/taoqi.mp4", //视频源
    });
    const dialogvideo = ref(false);
    // const video = () => {
    //   isvideo.value = !isvideo.value;
    // };
    const activeIndex1 = ref("1");
    const input1 = ref("");
    const dialogFormVisible = ref(false);
    const dialogFormVisible1 = ref(false);
    const zhucedialogpc = ref(false);
    const zhucedialogpc1 = ref(false);
    const router = useRouter();
    const checked = ref(false);
    const checked2 = ref(false);
    const form = reactive({
      email: "",
      password: "",
    });
    // const info = ref();
    const list = ref([]);
    const about1 = ref();
    const about2 = ref();
    const pic = ref("http://img.lazymxh.cn");
    const axios = require("axios");
    const login = () => {
      axios
        .post("/api/disease/user/login", form)
        .then(function (response) {
          console.log(response);
          if (response.data.code == 200) {
            if(checked2.value==true && response.data.data[0].roleid!=1){
              ElNotification({
              title: "登录失败",
              message: "没有管理员权限",
              type: "error",
            });     

            }else{
            ElNotification({
              title: "欢迎登录",
              message: "登录成功",
              type: "success",
            });
           sessionStorage.setItem("userid", response.data.data[0].userid);
            store.setUserislogin(response.data.code);
            if (checked.value == true) {
              sessionStorage.setItem("user", form.email);
              sessionStorage.setItem("password", form.password);
              console.log(form.email);
              console.log(form.password);
            } else {
              sessionStorage.setItem("user", "");
              sessionStorage.setItem("password", "");
            }
            router.push("../components/loginindex");}
          } else {
            ElNotification({
              title: "登录失败",
              message: "用户名或密码错误",
              type: "error",
            });         
          store.setUserislogin(response.data.code);
            sessionStorage.setItem("user", "");
            sessionStorage.setItem("password", "");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    //  const save=()=>{

    //  if(checked.value==true){

    //  console.log(1);
    //  sessionStorage.setItem("k1",form.email);
    //  sessionStorage.setItem("k2",form.password);
    //    console.log(form.email);
    //    console.log(form.password);
    //  }
    //  else{
    //       sessionStorage.setItem("k1","");
    //    sessionStorage.setItem("k2","");
    //  }
    //  };
    onMounted(() => {
      //  sessionStorage.clear();
      if (
        sessionStorage.getItem("user") &&
        sessionStorage.getItem("password")
      ) {
        form.email = sessionStorage.getItem("user");
        form.password = sessionStorage.getItem("password");
        checked.value = !checked.value;
      }

      function getCarousel() {
        return axios.get("/api/disease/carousel/pic");
      }

      function getAbout1() {
        return axios.get("/api/disease/about1/getTextpic1");
      }
      function getAbout2() {
        return axios.get("/api/disease/about2/getTextpic2");
      }

      // 向给定ID的用户发起请求  //获取轮播图
      axios
        .all([getCarousel(), getAbout1(), getAbout2()])
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          list.value = response[0].data.data;
          about1.value = response[1].data.data;
          about2.value = response[2].data.data;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    });

    const formzc = reactive({
      username: "",
      password: "",
      email: "",
      identity: "0",
      symptoms: "",
    });

    //默认显示
    const isActive = ref(false);
    const none = () => {
      isActive.value = !isActive.value;
    };
    const block = () => {
      isActive.value = !isActive.value;
    };
    const infozc = ref();
    const reg = () => {
      // 如果从后台传的数据为空的话就是null，如果直接在页面上获取而没有经过后台，数据为空那么为“”
      if (formzc.identity == 1 && formzc.symptoms == "") {
        ElMessage({
          showClose: true,
          message: "请输入一个症状",
          center: true,
          type: "error",
        });
      } else {
        if (emailisTrue.value && unameisTrue.value && pwdisTrue.value) {
          axios
            .post("/api/disease/user/registe", formzc)
            .then(function (response) {
              console.log(response);

              infozc.value = response.data.code;
              console.log(formzc.symptoms);
              console.log(infozc.value);
              if (infozc.value == 200) {
              
                ElMessage({
                  showClose: true,
                  // message: "注册成功，已登录",
                    message: "注册成功",
                  center: true,
                  type: "success",
                });
                
                // router.push("../components/loginindex");
                
              } else {
                ElMessage({
                  showClose: true,
                  message: "用户名或邮箱已存在",
                  center: true,
                  type: "warning",
                });
              }
            })

            .catch(function (error) {
              console.log(error);
            });
        } else {
          ElMessage({
            showClose: true,
            message: "信息为空或有误,请重新输入！",
            center: true,
            type: "warning",
          });
        }
      }
    };
    const forgotpwd = () => {
      router.push("../components/Forgotpwd");
    };

    function handleChange(input1){
      router.push({
        path: "/searchdisease",
        query: {
          keywordDis: input1,
        },
      });
     
    }
    

    return {
      activeIndex1,
      input1,
    
      dialogFormVisible,
      checked,
      checked2,
      form,
      Message,
      Lock,
      Search,
      login,
      // save,
      dialogFormVisible1,
      zhucedialogpc,
      formzc,
      User,
      QuestionFilled,
      zhucedialogpc1,
      isActive,
      none,
      block,
      reg,
      forgotpwd,
      pic,
      list,
      options,
      dialogvideo,
      validate,
      about1,
      about2,
      handleChange
    };
  },
};
</script>
<style>

.router-link-active {
  text-decoration: none;
}
a{
text-decoration: none!important;
}
.y {
  display: none;
}
.n {
  display: block;
}

.meun {
  width: 100%;
}
.menu img {
  width: 4.5rem;
  height: 3.6rem;
  margin: 0 4rem;
}
/*搜索框 */
/* .w-50 {
  width: 20rem !important;
} */

.mobile-menu {
  display: none;
}

.el-menu--horizontal {
  justify-content: center;
  border-bottom: none;
}
.checkbox {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
/* .container {
  margin: 0 !important;
  padding: 0 !important;
  min-width: 100%;
} */
.topnav {
  margin: 0 !important;
  padding: 0 !important;
  min-width: 100%;
}
.row {
  margin: 0 !important;
}
.col-sm-6,
.col-lg-6,
.col-sm-4,
.col-lg-4,
.col-sm-2,
.col-lg-2 {
  padding: 0;
}
.col-lg-4,
.col-sm-4,
.col-sm-2,
.col-lg-2 {
  display: flex;
  align-items: center;
}
.col-sm-2,
.col-lg-2 {
  justify-content: space-evenly;
}
/* .col-sm-12,
.col-lg-12 {
  padding: 0 !important;
  margin-bottom: 10px;
} */
.title0,
.title1 {
  text-align: center;
}

@media only screen and (max-width: 1200px) {
}

@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 768px) {
  .topnav {
    display: none;
  }
  .menu {
    display: none;
  }

  .el-icon.el-sub-menu__icon-arrow svg {
    display: none !important;
  }

  .mobile-menu {
    display: block;
    width: 100%;
  }
  .mobile-menu img {
    width: 4rem;
  }
  .el-menu.el-menu--horizontal.el-menu-demo {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .mobile-menu .el-row {
    margin: 0.7rem;
  }
  /* 下拉 */

  /* .el-menu--collapse .el-menu .el-submenu,
  .el-menu--popup {
    width: 100% !important;
  } */

  div.el-popper.is-pure.is-light {
    width: 100% !important;
    left: 0 !important;
    top: 58px !important;
  }
  .el-menu--horizontal {
    width: 100% !important;
  }
  ul.el-menu.el-menu--popup.el-menu--popup-bottom-start {
    min-width: 100% !important;
  }
  /* video */
  #refPlayerWrap {
    width: 100%;
  }
   

}
</style>