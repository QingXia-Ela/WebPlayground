<script lang="ts">
import { reactive, ref } from "vue";
import CanvasVue from "./canvas.vue";

export default {
  name: "akDamedane",
  components: { CanvasVue },
  setup() {
    let inputData = reactive({
        ROW: 50,
        COL: 50,
        SPACING: 10,
        THICKNESS: 100,
        DRAG: 0.9,
        EASE: 0.95,
        adsorbentMode: false,
      }),
      canvasData = ref(JSON.parse(JSON.stringify(inputData)));
    let showTipMark = ref(false);

    const syncData = () => {
      canvasData.value = JSON.parse(JSON.stringify(inputData));
      showTipMark.value = false;
    };
    const showTip = () => {
      showTipMark.value = true;
    };

    return {
      inputData,
      syncData,
      canvasData,
      showTip,
      showTipMark,
    };
  },
};
</script>

<template>
  <div class="damedane_wrapper">
    <div class="options_box">
      <div v-for="(i, index) in inputData" :key="index">
        {{ index }}
        <input
          :type="typeof i == 'boolean' ? 'checkbox' : 'text'"
          v-model.number="inputData[index]"
          @change="showTip"
          :placeholder="index"
        />
      </div>
      <button @click="syncData">update</button>
      <div class="tip" v-show="showTipMark">
        data change! click update to see new canvas
      </div>
    </div>
    <CanvasVue :inputData="canvasData" />
  </div>
</template>

<style lang="scss" scoped>
.damedane_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .options_box {
    display: flex;
    flex-flow: column nowrap;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    div {
      color: #fff;
      input {
        text-align: center;
        font-size: 16px;
        margin: 10px;
      }
    }
  }
}
</style>
