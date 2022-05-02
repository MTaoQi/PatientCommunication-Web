<template>
<!--  
  <div id="nav"> -->
    <!-- <router-link to="/"></router-link>  -->
    <!-- <router-link to="/about">About</router-link> -->
  <!-- </div> -->

<div class="bg">
    <router-view/> 
  <vue-particles
        color="#88d1fd"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="edge"
        :particleSize="4"
        linesColor="#1e1e1e"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="bg-particles"
      >
      </vue-particles>
  </div>
<div class="footer">
    <div class="gotop" v-show="gotop" @click="toTop">Top</div>
</div>

</template>

<script setup>
import { onMounted , ref } from "vue-demi";

const gotop = ref(false);
onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      // this.gotop = true;
      gotop.value = true;
    } else {
      // this.gotop = false;
      gotop.value = false;
    }
  });
});
//回顶部
const toTop = () => {
  window.scrollTo(0, 0);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.bg-particles{
  /* position: absolute; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}


.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  /* background: white; */
  background: #aadefd;
  color: #000000;
}
</style>
