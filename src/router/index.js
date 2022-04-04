import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/edit/:action/:id?",
    name: "edit",
    props: true,
    // lazy-load
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/EditView.vue"),
  },
  {
    path: "/tech",
    name: "tech",
    // lazy-load
    component: () =>
      import(/* webpackChunkName: "tech" */ "../views/TechView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link-class",
});

export default router;
