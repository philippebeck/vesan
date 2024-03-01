import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView"),
    alias: ["/home"]
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactView"),
    alias: ["/message"]
  },
  {
    path: "/legal",
    name: "legal",
    component: () => import("@/views/LegalView"),
    alias: ["/notice"]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView"),
    alias: ["/signin"]
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView"),
    alias: ["/account"],
    meta: { requiresAuth: true }
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => import("@/views/ArticleView"),
    alias: ["/blog/:id"]
  },
  {
    path: "/basket",
    name: "basket",
    component: () => import("@/views/BasketView"),
    alias: ["/cart"]
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/BlogView"),
    alias: ["/articles"]
  },
  {
    path: "/galleries",
    name: "gallery",
    component: () => import("@/views/GalleryView"),
    alias: ["/images"]
  },
  {
    path: "/gallery/:id",
    name: "image",
    component: () => import("@/views/ImageView"),
    alias: ["/images/:id"]
  },
  {
    path: "/links",
    name: "link",
    component: () => import("@/views/LinkView"),
    alias: ["/link"]
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("@/views/PortfolioView"),
    alias: ["/projects"]
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/ProductView"),
    alias: ["/shop/:id"]
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("@/views/ShopView"),
    alias: ["/products"]
  },
  // Error
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("@/views/ErrorView")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
