<template>
  <div ref="myChart" id="myChart">
  </div>
  {{selday}}
</template>
<script>
import * as echarts from "echarts";
import { ref} from "vue";

export default {


mounted(){  
  let myCharts=echarts.init(this.$refs.myChart); 
  let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
     axisLabel: {
              show: false, //隐藏刻度值
            },
 // plitNumber: 2,横线数
  // 刻度间隔 interval: 333, 
     
  },
  series: [
    {
      data: [20,40, 80, 60, 20, 40, 20],
      type: 'line'
    }
  ]
};
myCharts.setOption(option);
},
  setup(){

  var day =new Date().getDay();
  const selday = ref();

  console.log(day);
  switch(day){
 case 0:
    selday.value="周日";
    break;
 case 1:
    selday.value="周一";
    break;
  case 2:
    selday.value="周二";
    break;
  case 3:
    selday.value="周三";
    break;
  case 4:
    selday.value="周四";
    break;
  case 5:
    selday.value="周五";
    break;
  default:
    selday.value="周六";
   }
   console.log(selday);

 
  return{
    day,
    selday
    
  }},
  
};
</script>
<style >
#myChart{
  width: 500px;
  height: 500px;
  border: 1px solid red ;
}
</style>