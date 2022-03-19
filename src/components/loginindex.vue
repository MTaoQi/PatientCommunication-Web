<template>
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
          <el-menu-item index="1">主页</el-menu-item>
          <el-sub-menu index="2">
            <template #title> 我的健康</template>
            <el-menu-item index="2-1">每日</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title> 学习</template>
            <el-sub-menu index="3-1">
              <template #title>类型</template>
              <el-menu-item index="3-1-1">item one</el-menu-item>
              <el-menu-item index="3-1-2">item two</el-menu-item>
              <el-menu-item index="3-1-3">item three</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3-2">治疗</el-menu-item>
            <el-menu-item index="3-3">症状</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>交流</template>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="col-sm-4 col-lg-4">
        <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="Select"
          :suffix-icon="Search"
        ></el-input>
      </div>
      <div class="col-sm-2 col-lg-2">
        <el-button type="warning" @click="exit">退出</el-button>
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
        <el-icon color="#FEE019" :size="30"><circle-plus-filled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script  setup>
import * as echarts from "echarts";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Search, CirclePlusFilled } from "@element-plus/icons-vue";
import { useRouter} from "vue-router";
const router = useRouter();
const activeIndex = ref("1");
/// 声明定义一下echart
let echart = echarts;

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  echart.dispose;
});

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById("myEcharts"));
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
      },
    },
    series: [
      {
        data: [20, 40, 80, 60, 20, 40, 20],
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
var day = new Date().getDay();
const week = [0, 1, 2, 3, 4, 5, 6];
const showWeek = computed(() => {
  let index = week.indexOf(day);
  const newweek = [];
  for (let i = 0; i < week.length; i++) {
    index -= 1;
    if (index === -1) index = 6;
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
const exit=(()=>{
  router.push("../views/");
})
//   return { initChart };
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

@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0;
  }
  .col-sm-10.col-lg-10 {
    padding: 0;
  }
}
</style>
