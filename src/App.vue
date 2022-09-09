<script setup lang="ts">
import { RouterView } from "vue-router";

import PlaygroundListVue from "./components/PlaygroundList.vue";
</script>

<template>
  <header>MyPlayGround</header>
  <PlaygroundListVue />
  <div class="playground_box">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  margin: 0 auto;
}
header {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
</style>
