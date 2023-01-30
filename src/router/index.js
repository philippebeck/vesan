import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/AdminView";
import ArticleView from "../views/ArticleView";
import BlogView from "../views/BlogView";
import ContactView from "../views/ContactView";
import ErrorView from "../views/ErrorView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import PostView from "../views/PostView";
import ShopView from "../views/ShopView";

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
    component: ShopView,
    alias: ["/articles"]
  },
  {
    path: "/article/:id",
    name: "article",
    component: ArticleView,
    alias: ["/shop/:id"]
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView,
    alias: ["/posts"]
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostView,
    alias: ["/blog/:id"]
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    alias: ["/message"]
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    alias: ["/connection"]
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
