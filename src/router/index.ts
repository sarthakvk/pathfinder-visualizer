import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PathFinder from '../views/PathFinder.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: PathFinder
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
