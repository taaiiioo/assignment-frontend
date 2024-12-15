import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;