import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '../views/CategoryView.vue';
import PostView from '../views/PostView.vue';

const routes = [
  { path: '/', 
    name: 'home', 
    component: HomeView },
  
  {
    path: '/category/:parent/:child?',
    name: 'category',
    component:CategoryView
    },
  { 
    path: '/post/:path*',
    name: 'post',
    component: PostView 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;