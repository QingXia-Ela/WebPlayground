<template>
  <div class="damedane" ref="damedaneRef">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, onUpdated } from "vue";
import type inputDataProps from "./declare";
export default {
  name: "CanvasDamedane",
  props: ["inputData"],
  setup(props: { inputData: inputDataProps }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const damedaneRef = ref<HTMLElement | null>(null);

    interface defineParticle {
      vx: number;
      vy: number;
      x: number;
      y: number;
      ox: number;
      oy: number;
    }

    let particle: defineParticle = {
      /** 步进长度 x */
      vx: 0,
      /** 步进长度 y */
      vy: 0,
      /** 渲染位置 x */
      x: 0,
      /** 渲染位置 y */
      y: 0,
      /** 初始位置 x */
      ox: 0,
      /** 初始位置 y */
      oy: 0,
    };

    let animationFrameId = ref(0);

    const renderCanvas = () => {
      cancelAnimationFrame(animationFrameId.value);
      let particleList: defineParticle[] = [];
      if (canvasRef.value && damedaneRef.value) {
        // canvas 元素
        // 行列以及需要的变量
        const { inputData } = props;

        let { ROW, COL, SPACING, THICKNESS, DRAG, EASE, adsorbentMode } =
          inputData;
        THICKNESS = Math.pow(THICKNESS, 2);

        let NUM_PARTICLES = ROW * COL,
          canvas = canvasRef.value;

        let w = 0,
          h = 0,
          mx = -300,
          my = -300;

        const ctx = canvas.getContext("2d");

        // 设置 canvas 长宽
        w = canvas.width = COL * SPACING;
        h = canvas.height = ROW * SPACING;

        // 粒子推入数组
        for (let i = 0; i < NUM_PARTICLES; i++) {
          let newPoint = Object.create(particle);
          newPoint.x = newPoint.ox = SPACING * (i % COL);
          newPoint.y = newPoint.oy = SPACING * Math.floor(i / COL);

          particleList.push(newPoint);
        }

        // 鼠标进入 container 事件
        canvas.addEventListener("mousemove", (e) => {
          const cRect = canvas.getBoundingClientRect();
          mx = e.clientX - cRect.left;
          my = e.clientY - cRect.top;
        });

        // 动画执行
        const renderCanvas = () => {
          for (let i = 0; i < particleList.length; i++) {
            let p = particleList[i];

            let t = 0;

            // 吸附模式
            if (adsorbentMode) {
              let dx1 = mx - p.ox,
                dy1 = my - p.oy,
                dx2 = mx - p.x,
                dy2 = my - p.y;
              /** d1 代表鼠标相对粒子原始位置 */
              let d1 = dx1 * dx1 + dy1 * dy1;

              // 点当前位置距离鼠标位置的值，越高就代表越靠近，为 1 时代表刚好处在边缘位置，小于 1 代表不在鼠标圆范围内
              let f1 = THICKNESS / d1;

              // 点在鼠标范围内，需要发生偏移
              if (d1 < THICKNESS) {
                if (f1 > 2.5) f1 = 8;
              }

              t = Math.atan2(dy2, dx2);
              p.vx += f1 * Math.cos(t);
              p.vy += f1 * Math.sin(t);

              // 通过常量参数控制逼近速度
              p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
              p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
            }
            // 排斥模式
            else {
              let dx = mx - p.x,
                dy = my - p.y;

              let d = dx * dx + dy * dy;
              // 点当前位置距离鼠标位置的值，越高就代表越靠近，为 1 时代表刚好处在边缘位置，小于 1 代表不在鼠标圆范围内
              let f = THICKNESS / d;

              // 防止圆点飞太远
              f = f > 7 ? 7 : f;
              t = Math.atan2(dy, dx);
              p.vx += f * Math.cos(t);
              p.vy += f * Math.sin(t);
              // 通过常量参数控制逼近速度
              p.x -= (p.vx *= DRAG) - (p.ox - p.x) * EASE;
              p.y -= (p.vy *= DRAG) - (p.oy - p.y) * EASE;
            }
          }

          // 渲染
          ctx?.clearRect(0, 0, w, h);
          for (let i = 0; i < particleList.length; i++) {
            let p = particleList[i];
            if (ctx) {
              ctx.beginPath();
              ctx.arc(p.x + 2, p.y + 2, 1.8, 0, 360);
              ctx.fillStyle = "#aaa";
              ctx.fill();
              ctx.closePath();
            }
          }

          animationFrameId.value = requestAnimationFrame(renderCanvas);
        };

        renderCanvas();
      }
    };
    onMounted(() => {
      renderCanvas();
    });
    onUpdated(() => {
      console.log("damedane update data");
      renderCanvas();
    });
    return {
      canvasRef,
      damedaneRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.damedane {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  canvas {
    width: 500px;
    height: 500px;
    background-color: #111;
  }
}
</style>
