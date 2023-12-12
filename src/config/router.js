import { createRouter, createWebHistory } from "vue-router"

const routes = [
  // Base
  {
    path: "/",
    name: "home",
    component: () => import("@/views/base/HomeView"),
    alias: ["/home"]
  },
  {
    path: "/legal",
    name: "legal",
    component: () => import("@/views/base/LegalView"),
    alias: ["/notice"]
  },
  // Com
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/com/BlogView"),
    alias: ["/articles"]
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/com/ArticleView"),
    alias: ["/blog/:id"]
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/com/ContactView"),
    alias: ["/message"]
  },
  // Data
  {
    path: "/galleries",
    name: "gallery",
    component: () => import("@/views/data/GalleryView"),
    alias: ["/images"]
  },
  {
    path: "/gallery/:id",
    name: "image",
    component: () => import("@/views/data/ImageView"),
    alias: ["/images/:id"]
  },
  {
    path: "/links",
    name: "link",
    component: () => import("@/views/data/LinkView"),
    alias: ["/link"]
  },
  // Shop
  {
    path: "/shop",
    name: "shop",
    component: () => import("@/views/shop/ShopView"),
    alias: ["/products"]
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/shop/ProductView"),
    alias: ["/shop/:id"]
  },
  {
    path: "/basket",
    name: "basket",
    component: () => import("@/views/shop/BasketView"),
    alias: ["/cart"]
  },
  // Admin
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/AdminView"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/admin/LoginView"),
    alias: ["/connection"]
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/admin/ProfileView"),
    meta: { requiresAuth: true }
  },
  // Error
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("@/views/base/ErrorView")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
