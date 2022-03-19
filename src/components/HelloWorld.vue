<script setup >
import { computed, ref } from 'vue';

const week = [7, 1, 2, 3, 4, 5, 6];

const num = ref(1);
function changeNum() {
  num.value += 1;
  if (num.value === 8) {
    num.value = 1;
  }
}
const showWeek = computed(() => {
  let index = week.indexOf(num.value);
 const newweek=[];
  for (let i = 0; i < week.length; i++) {
    index -= 1;
    if (index === -1) index = 6;
   newweek.push( week[index]);
  }
  return newweek;
});

</script>

<template>
  <!-- <div>{{ num }}</div> -->
  <button @click="changeNum">num+1</button>
  <p>{{ showWeek }}</p>
</template>

<style scoped></style>
