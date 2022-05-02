
<template>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="sob()">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>症状</el-breadcrumb-item>
  </el-breadcrumb>
<el-breadcrumb :separator-icon="ArrowRight" style="margin:16px" v-show="lsob()">
    <el-breadcrumb-item :to="{ path: '/loginindex' }">学习</el-breadcrumb-item>
    <el-breadcrumb-item>症状</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
  <div class="jumbotron">
    <h2>症状</h2>
    <p>像您一样的患者学习</p> 
  </div>
  <div class="row">
    <div ref="main" style="width: 100%; height: 400px" class="col-sm-12 col-lg-12">
  
    </div>
  
  </div>
</div>
 
</template>
<script  setup>

import { ref, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
import useStore from "../pinia/index.js";
const store = useStore();
const axios = require('axios');
const list = ref([]);
const x = ref([]);
const y = ref([]);
const main = ref(); // 使用ref创建虚拟DOM引用，使用时用main.value
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
onMounted(
  () => {
    // init()
    sym()
    
  }
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '查看最常报告的症状'
    },
    tooltip: {},
    legend: {
      data: ['数量']
    },
    xAxis: {
      axisLabel: {
          show: false, // 不显示坐标轴上的文字
    },
    splitLine:{
         show:false // 不显示网格线
    },
    },
    yAxis: {  data: x.value,
     axisLine: {show:false},//轴线不显示
                    axisTick: {show:false},//
              gird:{
                // left: '3%',
                //     right: '4%',
                //     bottom: '3%',
                    containLabel: true
              },
      
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: y.value,
        
        
 itemStyle: {
            normal: {
              label: {
                show: true,		// 开启显示
                distance: 20,     // 条柱之间的距离
                position: 'right',	// 在上方top在右侧right显示
                textStyle: {	    // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              },
              color:'rgb(19, 198, 174)',
            //   color: function(params) {
            //     // build a color map as your need.
            //     var colorList = [
            //       '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
            //       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
            //       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
            //     ];
            //     return colorList[params.dataIndex]
            //   },
            }
          },
           barWidth : 30,//柱图宽度
      },
     

    
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
function sym(){
  axios.get('/api/disease/kinddetail/num').then(res => {
    list.value = res.data.data;
    //只是遍历前五个
    for(let i = 0;i<5;i++){
      x.value.push(list.value[i].symname)
      y.value.push(list.value[i].num)
    }
    // list.value.forEach(item => {
    //   x.value.push(item.name);
    //   y.value.push(item.count);
    // })
    x.value.reverse();
    y.value.reverse();
    console.log(x.value);
    console.log(y.value);
    init()
  })
}



 
</script>
<style scoped>
canvas{
  width:100% !important;
}
</style>