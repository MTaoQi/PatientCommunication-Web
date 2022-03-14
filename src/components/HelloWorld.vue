<template>
  <div>
    <vue3VideoPlay v-bind="options" />
  </div>

  
</template>

<script  setup>
import "vue3-video-play/dist/style.css";

import { reactive} from "vue";

const options = reactive({
  width: "500px", //播放器高度
  height: "260px", //播放器高度
  color: "#409eff", //主题色
  // currentTime: 60,
  // speed: false, //关闭进度条拖动
  title: "", //视频名称
  src: "http://img.lazymxh.cn/video/taoqi.mp4", //视频源
});

</script>


<style scoped>
</style>
