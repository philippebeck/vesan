import { createRouter, createWebHistory } from "vue-router"

import AdminEditor from "@/views/private/AdminEditor"
import ArticleEditor from "@/views/private/ArticleEditor"
import ArticleView from "@/views/public/ArticleView"
import BasketView from "@/views/public/BasketView"
import BlogView from "@/views/public/BlogView"
import ContactView from "@/views/public/ContactView"
import ErrorView from "@/views/public/ErrorView"
import HomeView from "@/views/public/HomeView"
import LegalView from "@/views/public/LegalView"
import LinkView from "@/views/public/LinkView"
import LoginView from "@/views/public/LoginView"
import ProductEditor from "@/views/private/ProductEditor"
import ProductView from "@/views/public/ProductView"
import ProfileEditor from "@/views/private/ProfileEditor"
import ShopView from "@/views/public/ShopView"

const routes = [
  // Public
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
    path: "/basket",
    name: "basket",
    component: BasketView,
    alias: ["/cart"]
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
  // Private
  {
    path: "/profile",
    name: "profile",
    component: ProfileEditor,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminEditor,
    meta: { requiresAuth: true }
  },
  {
    path: "/article/edit/:id",
    name: "articleEditor",
    component: ArticleEditor,
    meta: { requiresAuth: true }
  },
  {
    path: "/product/edit/:id",
    name: "productEditor",
    component: ProductEditor,
    meta: { requiresAuth: true }
  },
  // Error
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
