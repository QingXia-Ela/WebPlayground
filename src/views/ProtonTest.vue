<template>
  <div class="proton_test">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import Proton from "proton-engine";
export default {
  name: "ProtonTest",
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    // const canvasRef = ref(null);
    onMounted(() => {
      const canvas = canvasRef.value;
      // 初始化canvas
      const proton = new Proton();
      const emitter = new Proton.Emitter();

      //set Rate
      emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);

      //add Initialize
      emitter.addInitialize(new Proton.Radius(1, 12));
      emitter.addInitialize(new Proton.Life(2, 4));
      emitter.addInitialize(
        new Proton.Velocity(3, Proton.getSpan(0, 360), "polar")
      );

      //add Behaviour
      emitter.addBehaviour(new Proton.Color("ff0000", "random"));
      emitter.addBehaviour(new Proton.Alpha(1, 0));

      //add emitter to the proton
      proton.addEmitter(emitter);

      // add canvas renderer
      if (canvas) {
        //set emitter position
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
        emitter.emit(5);
        const renderer = new Proton.CanvasRenderer(canvas);
        proton.addRenderer(renderer);
      }
    });
    return {
      canvasRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.proton_test {
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
