import { createRouter, createWebHistory } from "vue-router"

const routes = [
  // ! MAIN
  {
    path: "/",
    name: "home",
    component: () => import("@/views/main/HomeView"),
    alias: ["/home"]
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/main/ContactView"),
    alias: ["/message"]
  },
  {
    path: "/legal",
    name: "legal",
    component: () => import("@/views/main/LegalView"),
    alias: ["/notice"]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/main/LoginView"),
    alias: ["/signin"]
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/main/ProfileView"),
    alias: ["/account"],
    meta: { requiresAuth: true }
  },
  // ! DATA
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/data/ArticleView"),
    alias: ["/blog/:id"]
  },
  {
    path: "/basket",
    name: "basket",
    component: () => import("@/views/data/BasketView"),
    alias: ["/cart"]
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/data/BlogView"),
    alias: ["/articles"]
  },
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
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/data/ProductView"),
    alias: ["/shop/:id"]
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("@/views/data/ShopView"),
    alias: ["/products"]
  },
  // Error
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("@/views/main/ErrorView")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
