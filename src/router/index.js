import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView";
import ShopView from "../views/ShopView";
import BlogView from "../views/BlogView";
import ContactView from "../views/ContactView";
import LoginView from "../views/LoginView";
import AdminView from "../views/AdminView";
import ErrorView from "../views/ErrorView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    alias: ["/home"]
  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
