import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: ['/home']
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      alias: ['/message']
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/LegalView.vue'),
      alias: ['/notice']
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      alias: ['/signin']
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      alias: ['/account'],
      meta: { requiresAuth: true }
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      alias: ['/blog/:id']
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue'),
      alias: ['/cart']
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      alias: ['/articles']
    },
    {
      path: '/galleries',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
      alias: ['/images']
    },
    {
      path: '/gallery/:id',
      name: 'image',
      component: () => import('../views/ImageView.vue'),
      alias: ['/images/:id']
    },
    {
      path: '/links',
      name: 'link',
      component: () => import('../views/LinkView.vue'),
      alias: ['/link']
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
      alias: ['/projects']
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      alias: ['/shop/:id']
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      alias: ['/products']
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

export default router
