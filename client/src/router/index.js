import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article')
  },
  {
    path: '/article/:id',
    name: 'ArticleId',
    component: () => import('../views/ArticleId')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message')
  },
  {
    path: '/userc',
    name: 'UserC',
    component: () => import('../views/UserC')
  },
  {
    path: '/adminc',
    name: 'AdminC',
    component: () => import('../views/AdminC')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
