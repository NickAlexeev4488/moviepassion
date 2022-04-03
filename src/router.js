import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/Home.vue";
import NewReview from "./components/NewReview.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/newreview",
    component: NewReview,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
