import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/AdminView";
import ArticleView from "../views/ArticleView";
import BasketView from "../views/BasketView";
import BlogView from "../views/BlogView";
import ContactView from "../views/ContactView";
import ErrorView from "../views/ErrorView";
import HomeView from "../views/HomeView";
import LegalView from "../views/LegalView";
import LinkView from "../views/LinkView";
import LoginView from "../views/LoginView";
import ProductView from "../views/ProductView";
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
    alias: ["/products"]
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
    alias: ["/shop/:id"]
  },
  {
    path: "/basket",
    name: "basket",
    component: BasketView,
    alias: ["/cart"]
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView,
    alias: ["/articles"]
  },
  {
    path: "/article/:id",
    name: "article",
    component: ArticleView,
    alias: ["/blog/:id"]
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    alias: ["/message"]
  },
  {
    path: "/link",
    name: "link",
    component: LinkView,
    alias: ["/links"]
  },
  {
    path: "/legal",
    name: "legal",
    component: LegalView,
    alias: ["/notice"]
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
