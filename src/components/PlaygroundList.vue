<template>
  <div class="playground_list">
    <RouterLink class="list_item" active-class="active" to="/"
      >MainPage</RouterLink
    >
    <RouterLink
      class="list_item"
      active-class="active"
      v-for="(i, index) in routerList"
      :key="index"
      :to="{ path: i.path }"
    >
      {{ i.name }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { RouterLink } from "vue-router";
export default {
  name: "PlaygroundList",
  components: {
    RouterLink,
  },
  setup() {
    return {
      routerList: router.options.routes,
    };
  },
};
</script>

<style scoped lang="scss">
.playground_list {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  align-items: center;
  align-content: center;
  .list_item {
    margin: 0 10px;
    color: blue;
    cursor: pointer;

    &.active {
      color: purple;
    }
  }
}
</style>
