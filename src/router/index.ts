import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/akDameDane",
      name: "akDameDane",
      component: () => import('@/views/akDameDane/index.vue')
    }
  ],
});

export default router;
