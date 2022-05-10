<template>
  <span>今天我感觉：</span>
  <div class="mood">
    <el-radio-group v-model="radio" size="large">
      <el-radio-button label="0" />
      <el-radio-button label="1" />
      <el-radio-button label="2" />
      <el-radio-button label="3" />
      <el-radio-button label="4" />
    </el-radio-group>
  </div>
  <el-input
    v-model="input"
    class="w-50 m-2"
    size="large"
    placeholder="请输入主题"
  />
  <div ref="editor"></div>

  <el-button type="primary" @click="syncHTML">发布</el-button>
  <!-- {{ write }} -->
  <!-- <div :innerHTML='content.html'></div> -->
</template>

<script>
import  useStore  from '../pinia/index.js'
import { onMounted, onBeforeUnmount, ref } from "vue";
import WangEditor from "wangeditor";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  name: "app",
  setup() {
    const store =useStore();
    const axios = require("axios");
    const input = ref("");
    const radio = ref("");
    const editor = ref();
    const router = useRouter();
    // const content = reactive({
    //     html: '',
    //     text: '',
    // });
    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {
          console.log("change");
        },
      });
      instance.create();
    });
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    const write = ref();
    function postwrite() {
      return axios.post("/api/disease/communication/instwrite", {
        titlepc: input.value,
        contentpc: write.value,
      });
    }

    function getselmood() {
      return axios.get("/api/disease/feel/selmood?mood=" + radio.value);
    }
   
    const syncHTML = () => {
      if (radio.value != "" && input.value != "") {
        // content.html = instance.txt.html();
        write.value = instance.txt.html();
        axios
          .all([postwrite(), getselmood()])
          .then(function (response) {
            // 处理成功情况
            console.log(response);
            if (response[0].data.code == 200 && response[1].data.code == 200 && store.Userislogin==200) {
              ElMessage({
                showClose: true,
                message: "发布成功",
                type: "success",
              });
              input.value="";
              write.value="";
              radio.value="";
             
              router.push("./t");
              
            }
            else{
              ElMessage({
              showClose: true,
              message: "发布失败，可能未登录",
              type: "error",
            });
            
            }
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error);
          })
          .then(function () {
            // 总是会执行
          });
      } else {
        ElMessage({
          showClose: true,
          message: "请输入今天感觉状态与标题",
          type: "warning",
        });
      }
    };
    return {
      syncHTML,
      editor,
      // content,
      write,
      radio,
      input,
    };
  },
};
</script>
<style scoped>
</style>