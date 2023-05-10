import { createRouter, createWebHistory } from "vue-router"

import ArticleView from "@/views/ArticleView"
import BasketView from "@/views/BasketView"
import BlogView from "@/views/BlogView"
import ContactView from "@/views/ContactView"
import ErrorView from "@/views/ErrorView"
import GalleryView from "@/views/GalleryView"
import HomeView from "@/views/HomeView"
import ImageView from "@/views/ImageView"
import LegalView from "@/views/LegalView"
import LinkView from "@/views/LinkView"
import LoginView from "@/views/LoginView"
import ProductView from "@/views/ProductView"
import ShopView from "@/views/ShopView"

const AdminEditor = () => import("@/views/AdminEditor")
const ArticleEditor = () => import("@/views/ArticleEditor")
const ProductEditor = () => import("@/views/ProductEditor")
const ProfileEditor = () => import("@/views/ProfileEditor")

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
    path: "/galleries",
    name: "gallery",
    component: GalleryView,
    alias: ["/images"]
  },
  {
    path: "/gallery/:id",
    name: "image",
    component: ImageView,
    alias: ["/images/:id"]
  },
  {
    path: "/links",
    name: "link",
    component: LinkView,
    alias: ["/link"]
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
